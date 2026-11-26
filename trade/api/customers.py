"""
Trade AI Assistant — 客户管理 API 路由。

端点：
  GET    /customers                              — 列出当前公司的客户（附订单数/总额/最近联系）
  POST   /customers                              — 创建客户
  GET    /customers/template                     — 下载 CSV 导入模板
  POST   /customers/bulk                         — 批量导入（CSV 文件上传）
  GET    /customers/{customer_id}                 — 获取客户详情
  GET    /customers/{customer_id}/overview        — CRM 卡片墙聚合
  PUT    /customers/{customer_id}                 — 更新客户
  DELETE /customers/{customer_id}                 — 删除客户
  POST   /customers/{customer_id}/libraries/{id}  — 关联文档库
  DELETE /customers/{customer_id}/libraries/{id}  — 取消关联
  GET    /customers/{customer_id}/libraries       — 列出关联的文档库

注意：/customers/template 和 /customers/bulk 必须在 /customers/{customer_id}
之前注册，否则 FastAPI 会把 "template" 当作 customer_id 解析导致 422。
"""

from __future__ import annotations

import csv
import io
import json
import re
import unicodedata
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, Query, Response, UploadFile
from fastapi.responses import FileResponse, JSONResponse

from trade import customer as customer_module
from trade import mailbox_store
from trade.api.deps import require_company
from trade.api.models import CustomerCreate, CustomerUpdate, FollowUpCreate

router = APIRouter(tags=["customers"])


# ── 客户 CRUD ──────────────────────────────────────────────────────────────

@router.get("/customers")
def list_customers(
    response: Response,
    cid: int = Depends(require_company),
    page: int | None = Query(None, ge=1, description="页码（1 起）；不传则全量"),
    limit: int = Query(50, ge=1, le=200, description="每页条数，仅 page 有值时生效"),
):
    """列出当前公司的客户。

    未传 page 时返回全量数组（现有前端行为不变）；传了 page 才切页，
    并在响应头写 X-Total-Count。
    """
    items, total = customer_module.list_by_company_page(
        cid, page=page, limit=limit,
    )
    response.headers["X-Total-Count"] = str(total)
    return items


@router.get("/customers/summary")
def customers_summary(cid: int = Depends(require_company)):
    """公司级客户列表顶栏汇总。

    必须声明在 /customers/{customer_id} 之前，否则 summary 会被当成 id → 422。
    """
    return customer_module.get_company_summary(cid)


@router.post("/customers")
def create_customer(
    payload: CustomerCreate,
    cid: int = Depends(require_company),
):
    """创建新客户（归属于当前公司）。"""
    res = customer_module.create(
        payload.name, payload.contact, payload.note, company_id=cid,
        country=payload.country, city=payload.city, tier=payload.tier,
        linkedin_url=payload.linkedin_url,
        company_website=payload.company_website, social_media=payload.social_media,
        title=payload.title, email=payload.email, backup_email=payload.backup_email,
        phone=payload.phone, whatsapp=payload.whatsapp,
        wechat=payload.wechat, source=payload.source,
        buyer_type=payload.buyer_type, follow_up_note=payload.follow_up_note,
        main_category=payload.main_category, match_score=payload.match_score,
        function=payload.function, responsibility=payload.responsibility,
        stage=payload.stage,
        next_follow_up_date=payload.next_follow_up_date,
        is_starred=payload.is_starred,
    )
    # 严格去重模式（TRADE_DEDUP_MODE=block）命中重复客户时返回 409 Conflict
    if isinstance(res, dict) and res.get("error") == "duplicate":
        return JSONResponse(status_code=409, content=res)
    return res


# ── CSV 列名 → customer 字段映射（批量导入）──────────────────────────────
# 必须定义在路由装饰器之前

_CSV_FIELD_MAP = {
    "name": "name",
    "contact": "contact",
    "title": "title",
    "country": "country",
    "city": "city",
    "email": "email",
    "phone": "phone",
    "whatsapp": "whatsapp",
    "wechat": "wechat",
    "linkedin_url": "linkedin_url",
    "company_website": "company_website",
    "tier": "tier",
    "buyer_type": "buyer_type",
    "main_category": "main_category",
    "match_score": "match_score",
    "note": "note",
}

# 表头别名：真实 Excel 导出的列名千奇百怪（大小写、空格、括号、阿拉伯语），
# 只认 `name` 一个写法会直接报「没有有效数据」。这里把常见写法都收进来，
# 比较前统一过 _norm_header()。
_CSV_HEADER_ALIASES: dict[str, tuple[str, ...]] = {
    "name": (
        "name", "customer_name", "company_name", "company", "customer", "client",
        "full_name", "account", "اسم", "الاسم", "اسم_الشركة", "الشركة",
        "اسم_العميل", "العميل",
    ),
    "contact": (
        "contact", "contact_person", "contact_name", "person", "attention",
        "جهة_الاتصال", "الشخص_المسؤول", "مسؤول_التواصل", "اسم_جهة_الاتصال",
    ),
    "title": ("title", "job_title", "position", "role", "المسمى_الوظيفي", "الوظيفة", "المنصب"),
    "country": ("country", "nation", "الدولة", "البلد"),
    "city": ("city", "town", "المدينة", "المحافظة"),
    "email": ("email", "e_mail", "mail", "email_address", "البريد_الإلكتروني", "الايميل", "البريد"),
    "phone": ("phone", "tel", "telephone", "mobile", "phone_number", "الهاتف", "الجوال", "الموبايل", "رقم_الهاتف"),
    "whatsapp": ("whatsapp", "wa", "واتساب", "واتس_اب"),
    "wechat": ("wechat", "weixin", "ويتشات", "وي_تشات"),
    "linkedin_url": ("linkedin_url", "linkedin", "linked_in", "لينكدإن", "لينكدان"),
    "company_website": ("company_website", "website", "url", "site", "web", "الموقع", "الموقع_الإلكتروني"),
    "tier": ("tier", "grade", "rating", "التصنيف", "الفئة"),
    "buyer_type": ("buyer_type", "type", "customer_type", "نوع_المشتري", "النوع"),
    "main_category": ("main_category", "category", "industry", "sector", "الفئة_الرئيسية", "القطاع"),
    "match_score": ("match_score", "score", "match", "التقييم", "الدرجة"),
    "note": ("note", "notes", "remark", "remarks", "comment", "ملاحظات", "ملاحظة"),
}


def _norm_header(raw: object) -> str:
    """归一化表头：去 BOM/引号、去括号注释、去阿拉伯语附加符号、统一分隔。"""
    s = unicodedata.normalize("NFKC", str(raw or ""))
    s = s.replace("\ufeff", "").strip().strip('"').strip("'")
    s = re.sub(r"[\u064b-\u065f\u0670\u0640]", "", s)  # 变音符号 + tatweel
    s = re.sub(r"[\(（\[【].*?[\)）\]】]", "", s)       # 去掉 "(optional)" 之类
    s = s.lower()
    s = re.sub(r"[\s\-\./\\]+", "_", s)
    s = re.sub(r"_+", "_", s).strip("_")
    return s


_ALIAS_TO_FIELD: dict[str, str] = {}
for _field, _aliases in _CSV_HEADER_ALIASES.items():
    _ALIAS_TO_FIELD[_field] = _field
    for _alias in _aliases:
        _ALIAS_TO_FIELD[_norm_header(_alias)] = _field


def _decode_csv_bytes(content: bytes) -> str:
    """按 BOM / 编码顺序解码。Excel 在阿拉伯语 Windows 下常存成 cp1256。"""
    if content[:4] == b"PK\x03\x04":
        raise HTTPException(
            status_code=400,
            detail="This is an Excel workbook (.xlsx), not a CSV. In Excel use \"Save As → CSV UTF-8 (Comma delimited)\" and import again.",
        )
    if content.lstrip()[:1] == b"<":
        raise HTTPException(
            status_code=400,
            detail="This is a web/HTML table, not a CSV. In Excel use \"Save As → CSV UTF-8 (Comma delimited)\" and import again.",
        )
    if content[:2] in (b"\xff\xfe", b"\xfe\xff"):
        return content.decode("utf-16")
    for encoding in ("utf-8-sig", "cp1256"):
        try:
            return content.decode(encoding)
        except UnicodeDecodeError:
            continue
    raise HTTPException(status_code=400, detail="File is not UTF-8 encoded. In Excel use \"Save As → CSV UTF-8 (Comma delimited)\" and import again.")


def _sniff_delimiter(text: str) -> str:
    """Excel 会按系统区域写出 , 或 ;（阿拉伯语/欧洲区域多用 ;）。"""
    if text.lstrip().lower().startswith("sep="):
        return text.lstrip()[4:5] or ","
    sample = "\n".join(text.splitlines()[:5])
    try:
        return csv.Sniffer().sniff(sample, delimiters=",;\t|").delimiter
    except csv.Error:
        pass
    counts = {d: sample.count(d) for d in ",;\t|"}
    best = max(counts, key=lambda d: counts[d])
    return best if counts[best] else ","


def _strip_sep_line(text: str) -> str:
    return re.sub(r"^\ufeff?\s*sep=.*?\r?\n", "", text, count=1, flags=re.IGNORECASE)


def parse_customer_csv(content: bytes) -> tuple[list[dict], list[str]]:
    """把 CSV 字节解析成客户字典列表（纯函数，便于测试）。

    返回 (customers, raw_headers)。没有有效行时抛 400，并在 detail 里带上
    实际识别到的表头 —— 用户才知道该改哪一列。
    """
    text = _strip_sep_line(_decode_csv_bytes(content))
    if not text.strip():
        raise HTTPException(status_code=400, detail="CSV is empty or has no header row")

    delimiter = _sniff_delimiter(text)
    try:
        reader = csv.DictReader(io.StringIO(text), delimiter=delimiter)
        raw_headers = [str(h) for h in (reader.fieldnames or [])]
        if not raw_headers:
            raise HTTPException(status_code=400, detail="CSV is empty or has no header row")
    except csv.Error:
        raise HTTPException(status_code=400, detail="Failed to parse the CSV format")

    col_map = {}
    for raw_header in raw_headers:
        field = _ALIAS_TO_FIELD.get(_norm_header(raw_header))
        if field and field not in col_map.values():
            col_map[raw_header] = field

    customers = []
    for row in reader:
        cust = {}
        for csv_col, internal_key in col_map.items():
            value = row.get(csv_col)
            if isinstance(value, str) and value.strip():
                cust[internal_key] = value.strip()
        if not cust.get("name"):
            continue
        if "match_score" in cust:
            try:
                cust["match_score"] = int(cust["match_score"])
            except (ValueError, TypeError):
                cust["match_score"] = 0
        customers.append(cust)

    if not customers:
        seen = ", ".join(h.strip() for h in raw_headers[:12] if h.strip())
        if "name" in col_map.values():
            hint = "the \"name\" column exists but is empty in every row"
        else:
            hint = f"detected headers: {seen or '(none)'}"
        raise HTTPException(
            status_code=400,
            detail=f"No valid rows found. The CSV needs a \"name\" column; {hint}",
        )
    return customers, raw_headers


def _find_static_dir() -> Path:
    """查找静态文件目录，与 app.py 保持一致的查找逻辑。"""
    import os as _os
    import sys as _sys

    if getattr(_sys, "frozen", False) and hasattr(_sys, "_MEIPASS"):
        return Path(_sys._MEIPASS) / "static"
    # 运行时目录
    trade_home = _os.environ.get("TRADE_HOME", "").strip()
    if not trade_home:
        if _os.name == "nt":
            _local = _os.environ.get("LOCALAPPDATA", str(Path.home() / "AppData" / "Local"))
            trade_home = str(Path(_local) / "trade")
        else:
            trade_home = str(Path.home() / ".trade")
    runtime_static = Path(trade_home) / "foreign-trade-assistant" / "static"
    if runtime_static.is_dir():
        return runtime_static
    # 开发目录
    return Path(__file__).resolve().parent.parent.parent / "static"


# ── 模板下载 + 批量导入（必须在 {customer_id} 路由之前注册）─────────────

@router.get("/customers/template")
def download_customer_template():
    """下载 CSV 客户导入模板。"""
    template_path = _find_static_dir() / "trade-customer-template.csv"
    if not template_path.is_file():
        raise HTTPException(status_code=404, detail="Template not found")
    return FileResponse(
        str(template_path),
        media_type="text/csv",
        filename="trade-customer-template.csv",
    )


@router.get("/customers/export")
def export_customers(cid: int = Depends(require_company)):
    """Export all customers of the current company as a UTF-8 CSV.

    Reuses the import template's column order so exported files can be
    re-imported without editing. Extra fields live in extra1/extra2 JSON.
    """
    items = customer_module.list_by_company(cid)
    out = io.StringIO()
    writer = csv.DictWriter(out, fieldnames=list(_CSV_FIELD_MAP.keys()), extrasaction="ignore")
    writer.writeheader()
    for c in items:
        try:
            ex1 = json.loads(c.get("extra1") or "{}") or {}
        except (ValueError, TypeError):
            ex1 = {}
        try:
            ex2 = json.loads(c.get("extra2") or "{}") or {}
        except (ValueError, TypeError):
            ex2 = {}
        row = {"name": c.get("name", ""), "contact": c.get("contact", ""), "note": c.get("note", "")}
        for k in ("country", "city", "tier", "linkedin_url", "company_website",
                  "buyer_type", "main_category", "match_score"):
            row[k] = ex1.get(k, "")
        for k in ("title", "email", "phone", "whatsapp", "wechat"):
            row[k] = ex2.get(k, "")
        writer.writerow(row)
    # BOM keeps Excel from mangling non-ASCII customer names.
    return Response(
        content="\ufeff" + out.getvalue(),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": 'attachment; filename="customers.csv"'},
    )


@router.post("/customers/bulk")
async def bulk_import_customers(
    file: UploadFile,
    cid: int = Depends(require_company),
):
    """CSV 批量导入客户。

    接收 CSV 文件（UTF-8 编码），按表头列名映射到客户字段。
    跳过空名称行和重名行，返回导入统计。
    """
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Please upload a .csv file")

    # 预检文件大小，拒绝超大 CSV 防止内存耗尽
    _MAX_CSV_BYTES = 10 * 1024 * 1024  # 10MB
    f_size = getattr(file, "size", None)
    if f_size is not None and f_size > _MAX_CSV_BYTES:
        raise HTTPException(status_code=413, detail="CSV file too large (limit 10MB)")

    content = await file.read()
    # 分块上传时 `file.size` 可能为 None，预检会被绕过 —— 读完后必须再量一次
    # 实际字节数（审计 P2-26）。
    if len(content) > _MAX_CSV_BYTES:
        raise HTTPException(status_code=413, detail="CSV file too large (limit 10MB)")
    customers, _headers = parse_customer_csv(content)

    result = customer_module.bulk_save(company_id=cid, customers=customers)
    return result


@router.get("/customers/duplicates")
def get_customer_duplicates(cid: int = Depends(require_company)):
    """查找当前公司内可能的重复客户（按 email / website 匹配）。"""
    return customer_module.find_duplicates(cid)


@router.get("/customers/search")
def search_customers(
    q: str,
    limit: int = 20,
    cid: int = Depends(require_company),
):
    """按语义搜索客户（向量优先，不可用/无命中时自动降级关键词）。

    注意必须声明在 `/customers/{customer_id}` 之前 —— 否则 "search" 会被
    当成 customer_id 去转 int。
    """
    from trade.database import get_connection
    from trade.vec_search import search_customers as _search

    query = (q or "").strip()
    if not query:
        return []
    conn = get_connection()
    try:
        hits = _search(conn, query, company_id=cid, top_k=max(1, min(limit, 100)))
        if not hits:
            return []
        # 一次取回所有命中客户（一条 IN 查询）——原先逐个 get()，
        # top_k=100 就是 101 个连接（2026-10-22 审计 P2）
        found = customer_module.get_by_ids(
            [h["customer_id"] for h in hits], company_id=cid,
        )
        out = []
        for h in hits:
            cust = found.get(h["customer_id"])
            if cust:
                # 用独立字段承载检索得分（0.41~1.0 的浮点），**不能写进 match_score** ——
                # 那是业务评级（int 0-5，前端是 0-5 输入框），覆盖后前端 parseInt("0.87")
                # 会得到 0，用户一保存就把真实评分清零（2026-10-21 审计发现）。
                cust["search_score"] = h.get("score")
                out.append(cust)
        return out
    finally:
        conn.close()


# ── 客户详情 / 更新 / 删除（{customer_id} 通配路由必须在字面路由之后）─

@router.get("/customers/{customer_id}")
def get_customer(
    customer_id: int,
    cid: int = Depends(require_company),
):
    """获取客户详情（必须属于当前公司）。"""
    cust = customer_module.get(customer_id, company_id=cid)
    if not cust:
        raise HTTPException(status_code=404, detail="Customer not found")
    return cust


@router.get("/customers/{customer_id}/emails")
def list_customer_emails_api(
    customer_id: int,
    cid: int = Depends(require_company),
    limit: int = 50,
):
    """客户关联邮件列表（须属于当前公司）。"""
    cust = customer_module.get(customer_id, company_id=cid)
    if not cust:
        raise HTTPException(status_code=404, detail="Customer not found")
    lim = min(max(limit, 1), 50)
    return mailbox_store.list_customer_emails(cid, customer_id, lim)


@router.get("/customers/{customer_id}/overview")
def get_customer_overview(
    customer_id: int,
    cid: int = Depends(require_company),
):
    """CRM 卡片墙聚合：统计、人物/订单/邮件/重要对话、时间线。"""
    overview = customer_module.get_overview(customer_id, company_id=cid)
    if not overview:
        raise HTTPException(status_code=404, detail="Customer not found")
    return overview


@router.get("/customers/{customer_id}/timeline")
def get_customer_timeline(
    customer_id: int,
    cid: int = Depends(require_company),
    days: int = Query(60, ge=1, le=365, description="时间窗口天数"),
):
    """客户互动时间线（订单/邮件/对话/今日应回复）。"""
    items = customer_module.get_timeline(customer_id, company_id=cid, days=days)
    if items is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return items


def _normalize_tags_or_400(raw) -> list[str]:
    """路由层校验 tags：400 + 中文字符串；按 Unicode 码点计长。"""
    if not isinstance(raw, list):
        raise HTTPException(status_code=400, detail="Tags must be an array of strings")
    cleaned: list[str] = []
    seen_lower: set[str] = set()
    for item in raw:
        if not isinstance(item, str):
            raise HTTPException(status_code=400, detail="Every tag must be a string")
        s = item.strip()
        if not s:
            continue
        if len(s) > 20:
            raise HTTPException(status_code=400, detail="A tag is limited to 20 characters")
        key = s.lower()
        if key in seen_lower:
            continue
        seen_lower.add(key)
        cleaned.append(s)
    if len(cleaned) > 20:
        raise HTTPException(status_code=400, detail="At most 20 tags")
    return cleaned


@router.put("/customers/{customer_id}")
def update_customer(
    customer_id: int,
    payload: CustomerUpdate,
    cid: int = Depends(require_company),
):
    """更新客户字段（必须属于当前公司）。"""
    kwargs = payload.model_dump(exclude_none=True)
    # tags 显式传入（含空数组）才校验；None 表示不改
    if "tags" in kwargs:
        kwargs["tags"] = _normalize_tags_or_400(kwargs["tags"])
    result = customer_module.update(customer_id, company_id=cid, **kwargs)
    if not result:
        raise HTTPException(status_code=404, detail="Customer not found")
    return result


@router.post("/customers/{customer_id}/follow-up")
def record_follow_up(
    customer_id: int,
    payload: FollowUpCreate,
    cid: int = Depends(require_company),
):
    """逾期跟进处理：更新下次跟进日或标记不再跟进，并记一条跟进事件。"""
    try:
        result = customer_module.record_follow_up(
            customer_id,
            company_id=cid,
            next_follow_up_date=payload.next_follow_up_date,
            note=payload.note,
            resolved=payload.resolved,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    if not result:
        raise HTTPException(status_code=404, detail="Customer not found")
    return result


@router.delete("/customers/{customer_id}")
def delete_customer(
    customer_id: int,
    cid: int = Depends(require_company),
):
    """删除客户（必须属于当前公司）。"""
    if not customer_module.delete(customer_id, company_id=cid):
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"ok": True}


# ── 客户 ↔ 文档库关联 ────────────────────────────────────────────────────

@router.post("/customers/{customer_id}/libraries/{library_id}")
def link_library_to_customer(
    customer_id: int,
    library_id: int,
    cid: int = Depends(require_company),
):
    """将文档库关联到客户（两者必须属于同一公司）。"""
    try:
        customer_module.link_library(customer_id, library_id, company_id=cid)
        return {"ok": True}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.delete("/customers/{customer_id}/libraries/{library_id}")
def unlink_library_from_customer(
    customer_id: int,
    library_id: int,
    cid: int = Depends(require_company),
):
    """取消文档库与客户的关联。"""
    try:
        if not customer_module.unlink_library(customer_id, library_id, company_id=cid):
            raise HTTPException(status_code=404, detail="Link not found")
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"ok": True}


@router.get("/customers/{customer_id}/libraries")
def get_customer_libraries(
    customer_id: int,
    cid: int = Depends(require_company),
):
    """列出客户关联的所有文档库。"""
    return customer_module.get_libraries(customer_id, company_id=cid)
