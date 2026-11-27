"""OSINT tool cards shown in the web UI must follow the selected UI language."""
from trade.osint.ui_l10n import localize_for_ui


def test_progress_message_localized():
    assert localize_for_ui("正在分析问题...", "en") == "Analyzing the question..."
    assert localize_for_ui("正在分析问题...", "ar") == "جاري تحليل السؤال..."


def test_tool_args_and_keys_localized():
    payload = {
        "field": "成立年份",
        "source_name": "机器判定层 job 11 + crt.sh",
        "known_facts": {"LinkedIn 公司页": ["1,000 关注者"]},
    }
    en = localize_for_ui(payload, "en")
    ar = localize_for_ui(payload, "ar")
    assert "成立年份" not in repr(en)
    assert "关注者" not in repr(en)
    assert "机器判定层" not in repr(en)
    assert en["field"] == "Founding year"
    assert "صفحة الشركة" in repr(ar["known_facts"])
    assert "متابعون" in repr(ar)


def test_sanitize_strips_residual_cjk_for_non_chinese_ui():
    from trade.osint.ui_l10n import sanitize_for_ui
    payload = {"text": "No match 未命中 90,348 records", "items": [" feeds 饲料 ", "ok"]}
    ar = sanitize_for_ui(payload, "ar")
    assert "未命中" not in repr(ar)
    assert "饲料" not in repr(ar)
    assert sanitize_for_ui(payload, "zh") == payload


def test_other_languages_are_untouched():
    payload = {"field": "成立年份"}
    assert localize_for_ui(payload, "zh") == payload


def test_osint_job_event_payload_is_localized_for_ui():
    from trade.osint.ui_l10n import sanitize_for_ui

    payload = {
        "title": "背调进行中",
        "source": "WHOIS 域名情报",
        "status": "采集中",
        "name": "搜索文件",
    }
    en = sanitize_for_ui(payload, "en")
    ar = sanitize_for_ui(payload, "ar")
    for localized in (en, ar):
        assert not any("\u4e00" <= ch <= "\u9fff" for ch in repr(localized))
    assert "WHOIS" in en["source"]
    assert "Backg" in en["title"]


def test_all_orchestrator_source_labels_localized_en_ar():
    """2026-11-27 用户实测：背调面板来源标签仍显示中文（欧盟 VIES/州登记…）。

    根因有二：SSE 端点用 sanitize（撕字）而非 localize（翻译）；前端 SSE
    请求根本不带 lang。此测试钉住：编排器的全部来源/层标签在 EN/AR
    字典中都有译文，事件 payload 翻译后不含 CJK。
    """
    from trade.osint.orchestrator import _PROGRESS_LABELS
    from trade.osint.ui_l10n import localize_for_ui, sanitize_for_ui

    for key, label in _PROGRESS_LABELS.items():
        for lang in ("en", "ar"):
            out = sanitize_for_ui(localize_for_ui(label, lang), lang)
            assert not any("\u4e00" <= ch <= "\u9fff" for ch in out), (
                f"label {label!r} not localized for {lang}: {out!r}"
            )
            assert out.strip(), f"label {label!r} empty for {lang}"


def test_source_event_payload_translated_not_stripped():
    from trade.osint.ui_l10n import sanitize_for_ui

    payload = {
        "event": "source_done",
        "source": "us_states",
        "label": "美国州公司登记",
        "status": "miss",
        "ms": 8800,
    }
    en = sanitize_for_ui(localize_for_ui(payload, "en"), "en")
    assert en["label"] == "US state company registrations"
    ar = sanitize_for_ui(localize_for_ui(payload, "ar"), "ar")
    assert ar["label"] == "تسجيلات الشركات في ولايات الولايات المتحدة"
