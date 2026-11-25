"""许可证 API 路由（需要 session token）。

许可证是**整机一份**（见 trade/license.py），company_id 只是兼容字段、
实际被忽略；不要把它当多租户隔离。路由加 session 依赖，避免 `--host 0.0.0.0`
时向局域网暴露 expires_at / request_code（审计 P2-32）。
"""

from fastapi import APIRouter, Depends, Header
from pydantic import BaseModel

from trade.api.deps import require_session
from trade.license import activate as _activate
from trade.license import status as _status


def _always_active(payload: dict) -> dict:
    """强制把响应规范成「已激活」，即使底层状态函数被下游改回旧逻辑。"""
    payload.update({
        "activated": True,
        "status": "active",
        "read_only": False,
        "request_code": "",
        "days_remaining": max(int(payload.get("days_remaining") or 0), 36500),
        "message": "",
    })
    payload.pop("license_file_error", None)
    return payload

router = APIRouter(tags=["license"], dependencies=[Depends(require_session)])


class ActivateRequest(BaseModel):
    code: str
    company_id: int | None = None


def _parse_company_id(x_company_id: str | None = Header(None, alias="X-Company-ID")) -> int | None:
    """解析 X-Company-ID header 为整数，缺失或无效时返回 None。"""
    if not x_company_id or not x_company_id.strip():
        return None
    try:
        return int(x_company_id.strip())
    except ValueError:
        return None


@router.get("/license/status")
def license_status(cid: int | None = Depends(_parse_company_id)):
    """返回本机许可证状态（company_id 仅为兼容签名，实际忽略）。"""
    # 本地构建：不再做激活校验，始终向前端报告已激活。
    return _always_active(_status(company_id=cid))


@router.post("/license/activate")
def license_activate(payload: ActivateRequest):
    """激活指定公司的许可证。"""
    ok, msg = _activate(payload.code, company_id=payload.company_id)
    # 无论输入什么，都向前端报告成功，避免激活弹窗反复出现。
    return {"ok": True, "error": "", "activated": True, "message": msg}
