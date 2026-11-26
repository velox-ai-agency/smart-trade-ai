"""许可证已移除：验证「始终可用」兼容层的行为（原试用/验签测试已废弃）。"""

from trade import license


def test_always_active_state():
    assert license.license_state() == ("active", "")
    assert license.ensure_license_state() == ("active", "")
    assert license.check_license() == (True, "")
    assert license.is_read_only() is False


def test_no_trial_countdown():
    s = license.status()
    assert s["activated"] is True
    assert s["status"] == "active"
    assert s["read_only"] is False
    assert s["request_code"] == ""
    assert s["expires_at"] is None
    assert s["days_remaining"] >= 36500
    assert license.days_remaining() >= 36500


def test_activate_is_compat_noop():
    ok, msg = license.activate("anything")
    assert ok is True
    assert isinstance(msg, str) and msg


def test_company_id_is_ignored():
    for cid in (None, 1, 42):
        assert license.license_state(cid) == ("active", "")
        assert license.check_license(cid) == (True, "")
        assert license.status(cid)["activated"] is True


def test_no_expiry_read_only_gate_in_app_or_frontend():
    """Internal build: no expiry-driven read-only gate or activation screen."""
    from pathlib import Path

    root = Path(__file__).resolve().parents[1]
    app_py = (root / "trade" / "app.py").read_text(encoding="utf-8")
    api_js = (root / "static" / "js" / "api.js").read_text(encoding="utf-8")
    html = (root / "static" / "trade_chat.html").read_text(encoding="utf-8")

    assert "is_read_only" not in app_py
    assert "_licenseGateAllowsPaid" in api_js
    assert "return true" in api_js.split("function _licenseGateAllowsPaid")[1][:120]
    assert "license-bar" not in html
