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
