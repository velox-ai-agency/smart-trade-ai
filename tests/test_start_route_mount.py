"""「Start」引导面板必须挂在 /api/start/* 上。

前端 static/js/start.js 与 tests_js/start-onboarding.test.js 都用 `/api/start/...`。
如果 start 路由被并进挂在 `/api/trade` 的父路由，实际路径会变成
`/api/trade/api/start/state`，页面上每个按钮都是 404「Not Found」——
2026-11-26 用户实测就是这个症状。
"""

from __future__ import annotations


def _paths(monkeypatch, tmp_path):
    monkeypatch.setenv("TRADE_HOME", str(tmp_path / "trade"))
    monkeypatch.setenv("HERMES_HOME", str(tmp_path / "hermes"))
    from trade.app import create_app

    return set(create_app().openapi()["paths"])


def test_start_routes_are_served_at_top_level(monkeypatch, tmp_path):
    paths = _paths(monkeypatch, tmp_path)
    for suffix in (
        "/state",
        "/start",
        "/answer",
        "/confirm",
        "/details",
        "/credential",
        "/shipment-document",
        "/edit/stage",
        "/edit/apply",
        "/edit/cancel",
        "/reusable",
        "/next-action",
    ):
        assert f"/api/start{suffix}" in paths, f"缺少 /api/start{suffix}"


def test_start_routes_are_not_nested_under_trade(monkeypatch, tmp_path):
    nested = [p for p in _paths(monkeypatch, tmp_path) if p.startswith("/api/trade/api/")]
    assert nested == [], f"/api/trade/api/* 是双重前缀，前端调不到：{nested}"


def test_frontend_base_matches(monkeypatch, tmp_path):
    from pathlib import Path

    src = (Path(__file__).resolve().parent.parent / "static" / "js" / "start.js").read_text(
        encoding="utf-8"
    )
    assert "var BASE = '/api/start';" in src
