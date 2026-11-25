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
