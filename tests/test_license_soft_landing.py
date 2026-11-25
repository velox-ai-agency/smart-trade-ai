"""无许可证门禁：状态/激活接口、应用启动与写入门禁的行为验证。"""

from pathlib import Path

from trade.api.license import ActivateRequest, license_activate, license_status


def test_status_endpoint_reports_active():
    s = license_status(cid=1)
    assert s["status"] == "active"
    assert s["activated"] is True
    assert s["read_only"] is False
    assert s["request_code"] == ""
    assert s["days_remaining"] >= 36500
    assert "license_file_error" not in s


def test_activate_endpoint_always_ok():
    result = license_activate(ActivateRequest(code="garbage"))
    assert result["ok"] is True
    assert result["activated"] is True
    assert result["error"] == ""


def test_app_has_no_read_only_middleware():
    root = Path(__file__).resolve().parent.parent
    src = (root / "trade" / "app.py").read_text(encoding="utf-8")
    assert "_license_read_only_guard" not in src
    assert "_check_license" not in src


def test_frontend_has_no_activation_ui():
    root = Path(__file__).resolve().parent.parent
    html = (root / "static" / "trade_chat.html").read_text(encoding="utf-8")
    assert "license-bar" not in html
    api_js = (root / "static" / "js" / "api.js").read_text(encoding="utf-8")
    for removed in ("showActivateModal", "showLicenseExpired", "doActivate"):
        assert removed not in api_js
