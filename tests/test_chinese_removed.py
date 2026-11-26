"""守卫：中文已从产品中移除（2026-11-26 决定）。

产品只保留 English + Arabic。这个测试防止后续合入上游代码时把中文界面、
中文默认语言或中文回复策略带回来。
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def _read(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def test_language_selector_offers_english_and_arabic_only():
    html = _read("static/trade_chat.html")
    assert 'value="zh"' not in html
    assert '<option value="en"' in html
    assert '<option value="ar"' in html


def test_i18n_has_no_chinese_dictionary():
    i18n = _read("static/js/i18n.js")
    assert "\n    zh: {" not in i18n
    assert "I18N.zh" not in i18n


def test_translation_falls_back_to_english():
    i18n = _read("static/js/i18n.js")
    # t() 的兜底必须是英文；不能再用已删除的 zh 字典
    assert "(I18N.en && I18N.en[key])" in i18n
    # langText 的「非阿语」分支直接返回英文（zh 只作为 AR_TERMS 的查找键）
    assert "return currentLang === 'en' ? en : zh;" not in i18n


def test_stored_chinese_preference_migrates_to_english():
    i18n = _read("static/js/i18n.js")
    assert "if (currentLang !== 'ar' && currentLang !== 'en') currentLang = 'en';" in i18n


def test_backend_default_ui_language_is_english():
    models = _read("trade/api/models.py")
    assert 'Field("zh"' not in models
    assert 'Field("en"' in models


def test_ui_language_wins_over_chinese_input():
    """界面语言（en/ar）永远优先：「zh」不再由界面提供。"""
    from trade.prompt import detect_reply_language

    assert detect_reply_language("帮我找一下德国的阀门客户", fallback="en") == "en"
    assert detect_reply_language("帮我找一下德国的阀门客户", fallback="ar") == "ar"
    assert detect_reply_language("find valve customers") == "en"
    assert detect_reply_language("مرحبا") == "ar"


def test_prompt_default_policy_is_english_and_has_no_chinese():
    from trade.prompt import LANGUAGE_POLICY_BLOCK

    assert not any("\u4e00" <= ch <= "\u9fff" for ch in LANGUAGE_POLICY_BLOCK)
