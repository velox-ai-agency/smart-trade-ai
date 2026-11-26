"""Process sub-step cards (guided workflow buttons).

Endpoint: GET /api/trade/processes/{context} returns the ordered steps for a
chat context. Config lives in trade/api/processes.py — single source of
truth. Clicking a step only prefills the chat input (see tests_js).
"""

from __future__ import annotations

import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from trade.api.processes import PROCESS_STEPS, get_process_steps  # noqa: E402


def _mk_client(monkeypatch, tmp_path):
    monkeypatch.setenv("TRADE_HOME", str(tmp_path))
    import trade.database as _db
    monkeypatch.setattr(_db, "_get_db_path", lambda: tmp_path / "trade.db")
    from trade.database import init_db
    init_db()

    from fastapi import FastAPI, Depends

    from trade.api import _enforce_company_binding
    from trade.api import deps
    from trade.api.processes import router as processes_router

    deps.set_session_token("t")
    from trade import company as company_module
    co = company_module.create(name="Velox", slug="velox")

    app = FastAPI()
    app.include_router(
        processes_router,
        dependencies=[Depends(deps.require_session), Depends(_enforce_company_binding)],
    )
    client = TestClient(app)
    deps.set_active_company("t", co["id"])
    return client, {
        "X-Hermes-Session-Token": "t",
        "X-Company-ID": str(co["id"]),
    }


def test_unknown_process_returns_empty_steps(monkeypatch, tmp_path):
    client, headers = _mk_client(monkeypatch, tmp_path)
    r = client.get("/api/trade/processes/nope", headers=headers)
    assert r.status_code == 200
    assert r.json()["steps"] == []


def test_lead_process_steps(monkeypatch, tmp_path):
    client, headers = _mk_client(monkeypatch, tmp_path)
    r = client.get("/api/trade/processes/lead", headers=headers)
    assert r.status_code == 200
    data = r.json()
    steps = data["steps"]
    assert len(steps) == 8
    nums = [s["n"] for s in steps]
    assert nums == sorted(nums) and nums[0] == 1
    # duplicate check sits directly before save_lead (user decision 2026-11-27)
    ids = [s["id"] for s in steps]
    assert ids.index("check_duplicates") == ids.index("save_lead") - 1
    # every step carries both languages and a prompt
    for s in steps:
        assert s["label_en"] and s["label_ar"]
        assert s["prompt_en"] and s["prompt_ar"]
        assert s["skill"], "step must name its target skill"


def test_prompts_carry_english_trigger_phrases(monkeypatch, tmp_path):
    """The prompt must route: it starts with / contains the skill's EN trigger
    phrase (SKILL_CMD_EN in chat.js), so sending it reaches the right skill."""
    trigger_words = {
        "b2b-market-analysis": "market analysis",
        "b2b-customs-data": "customs data",
        "b2b-email-intel": "email intel",
        "b2b-customer-mgmt": "customer management",
        "b2b-osint": "company background",
        "b2b-cold-outreach": "cold email",
        "b2b-sales-pipeline": "sales pipeline",
    }
    for proc in PROCESS_STEPS.values():
        for s in proc["steps"]:
            phrase = trigger_words.get(s["skill"])
            assert phrase, f"no EN trigger phrase mapped for {s['skill']}"
            assert phrase.lower() in s["prompt_en"].lower(), (
                f"step {s['id']} prompt does not contain its trigger phrase"
            )


def test_no_chinese_in_user_facing_labels():
    """UI is EN/AR only: labels, metas and prompts must be CJK-free.
    (Chinese dict keys / process ids stay allowed as internal ids.)"""
    import re

    cjk = re.compile(r"[\u4e00-\u9fff]")
    for pid, proc in PROCESS_STEPS.items():
        assert not cjk.search(proc["label_en"]) and not cjk.search(proc["label_ar"])
        for s in proc["steps"]:
            for key in ("en", "ar", "meta_en", "meta_ar", "prompt_en", "prompt_ar"):
                assert not cjk.search(s[key]), f"{pid}/{s['id']}.{key} contains CJK"


def test_step_numbers_are_sequential():
    for proc in PROCESS_STEPS.values():
        nums = [s["n"] for s in proc["steps"]]
        assert nums == list(range(1, len(nums) + 1))
