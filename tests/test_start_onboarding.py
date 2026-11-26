"""Automated tests for the /api/start company-onboarding workflow.

These tests exercise the real FastAPI router with a real (isolated) SQLite
database and the real ``trade.start_onboarding`` state machine.  No storage is
re-implemented here: persistence is only *inspected* to prove the invariants
(versioning, isolation, credential separation, no auto-started tasks).
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))


@pytest.fixture
def start_env(monkeypatch, tmp_path):
    """Fresh DB with two active companies and a bare app exposing /api/start."""
    monkeypatch.setenv("TRADE_HOME", str(tmp_path))
    monkeypatch.setenv("HERMES_HOME", str(tmp_path / "hermes"))

    from fastapi import FastAPI
    from fastapi.testclient import TestClient

    from trade import database as db
    from trade.api import start as start_api

    db.init_db()

    company_ids = []
    conn = db.get_connection()
    try:
        for idx in range(2):
            slug = f"start-test-{idx}"
            cur = conn.execute(
                "INSERT INTO companies (name, slug, is_active) VALUES (?, ?, 1)",
                (f"Start Company {idx}", slug),
            )
            cid = int(cur.lastrowid)
            conn.execute(
                "INSERT INTO trade_companies (company_id, data_dir, is_active) "
                "VALUES (?, ?, 1)",
                (cid, str(tmp_path / f"company-{cid}")),
            )
            company_ids.append(cid)
        conn.commit()
    finally:
        conn.close()

    app = FastAPI()
    app.include_router(start_api.router)
    return TestClient(app), company_ids, db, tmp_path


def _h(cid: int) -> dict[str, str]:
    return {"X-Company-ID": str(cid)}


def _row(db, cid: int) -> dict:
    conn = db.get_connection()
    try:
        r = conn.execute(
            "SELECT * FROM start_profiles WHERE company_id = ?", (cid,)
        ).fetchone()
        return dict(r) if r else {}
    finally:
        conn.close()


def _json(value, default):
    if isinstance(value, (dict, list)):
        return value
    try:
        return json.loads(value) if value else default
    except (TypeError, ValueError):
        return default


def _version(db, cid: int) -> int:
    return int(_row(db, cid).get("version") or 0)


def _status(db, cid: int) -> str:
    return str(_row(db, cid).get("status") or "")


def _credentials(db, cid: int):
    return _json(_row(db, cid).get("credentials"), [])


def _question_field(question) -> str:
    if not isinstance(question, dict):
        return ""
    for key in ("field", "key", "name", "id", "slug"):
        value = question.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()
    return ""


def _start_and_answer_all(client, cid: int, *, markets_value: str = "undecided") -> None:
    assert client.post("/api/start/start", headers=_h(cid)).status_code == 200
    for _ in range(30):
        state = client.get("/api/start/state", headers=_h(cid)).json()
        question = state.get("question")
        if not question:
            return
        field = _question_field(question)
        assert field, f"Question without a usable field name: {question}"
        value = {
            "basics.name": "Answer Co",
            "basics.country": "Egypt",
            "basics.activity": "Manufacturing",
            "products": "Industrial valves",
        }.get(field, markets_value)
        response = client.post(
            "/api/start/answer",
            headers=_h(cid),
            json={"field": field, "value": value},
        )
        assert response.status_code == 200, response.text


def _stage_changes(client, cid: int):
    """Stage a harmless rename; accept any of the plausible change shapes."""
    candidates = [
        {"basics": {"name": "Staged Name"}},
        {"basics.name": "Staged Name"},
        {"name": "Staged Name"},
    ]
    for changes in candidates:
        response = client.post(
            "/api/start/edit/stage", headers=_h(cid), json={"changes": changes}
        )
        if response.status_code == 200:
            return response.json()
        assert response.status_code == 400, response.text
    pytest.fail(f"None of the change shapes could be staged for company {cid}")


# ── Tests ─────────────────────────────────────────────────────────────────────


def test_new_company_draft_and_resumable_answers(start_env):
    client, ids, db, _ = start_env
    cid = ids[0]

    before = client.get("/api/start/state", headers=_h(cid))
    assert before.status_code == 200
    assert before.json()["company"]["id"] == cid
    assert before.json()["profile"] is None

    started = client.post("/api/start/start", headers=_h(cid))
    assert started.status_code == 200, started.text
    assert started.json()["question"]
    assert _status(db, cid) == "draft"

    from trade import start_onboarding as start

    basic_fields = ["basics." + name for name in start.BASIC_FIELDS]
    first_field = basic_fields[0]
    response = client.post(
        "/api/start/answer",
        headers=_h(cid),
        json={"field": first_field, "value": "Resumable Co"},
    )
    assert response.status_code == 200, response.text
    basics = _json(_row(db, cid).get("basics"), {})
    assert "Resumable Co" in json.dumps(basics, ensure_ascii=False)

    # A subsequent request (simulating a browser reload) still sees the answer.
    resumed = client.get("/api/start/state", headers=_h(cid))
    assert resumed.status_code == 200
    assert "Resumable Co" in json.dumps(resumed.json()["profile"], ensure_ascii=False)

    if len(basic_fields) > 1:
        second = client.post(
            "/api/start/answer",
            headers=_h(cid),
            json={"field": basic_fields[1], "value": "Egypt"},
        )
        assert second.status_code == 200, second.text
        basics = _json(_row(db, cid).get("basics"), {})
        assert "Egypt" in json.dumps(basics, ensure_ascii=False)
        assert "Resumable Co" in json.dumps(basics, ensure_ascii=False)


def test_skipped_answer(start_env):
    client, ids, db, _ = start_env
    cid = ids[0]
    assert client.post("/api/start/start", headers=_h(cid)).status_code == 200

    question = client.get("/api/start/state", headers=_h(cid)).json()["question"]
    field = _question_field(question) or "country"
    # No "value" key at all: skip must be valid on its own.
    response = client.post(
        "/api/start/answer", headers=_h(cid), json={"field": field, "skip": True}
    )
    assert response.status_code == 200, response.text
    skipped = _json(_row(db, cid).get("skipped"), [])
    assert field in skipped


def test_undecided_market(start_env):
    client, ids, db, _ = start_env
    cid = ids[0]
    assert client.post("/api/start/start", headers=_h(cid)).status_code == 200
    _start_and_answer_all(client, cid, markets_value="undecided")
    assert client.post(
        "/api/start/confirm", headers=_h(cid), json={"approve": True}
    ).status_code == 200

    response = client.get("/api/start/next-action", headers=_h(cid))
    assert response.status_code == 200, response.text
    body = response.json()
    assert isinstance(body.get("task_exists"), bool)

    kind = " ".join(
        str(body.get(key, ""))
        for key in ("kind", "type", "action", "task", "task_id", "id", "next_action")
    ).lower()
    if "market" in kind and "selection" in kind:
        assert body.get("task_exists") is False
        assert "chat prompt" in body.get("note", "")


def test_missing_company_header_is_422(start_env):
    client, ids, db, _ = start_env
    for path in ("/api/start/state", "/api/start/reusable", "/api/start/next-action"):
        response = client.get(path)
        assert response.status_code == 422, f"{path}: {response.text}"
        assert "X-Company-ID" in response.text

    response = client.post("/api/start/start", json={})
    assert response.status_code == 422, response.text


def test_confirm_requires_explicit_approval(start_env):
    client, ids, db, _ = start_env
    cid = ids[0]
    assert client.post("/api/start/start", headers=_h(cid)).status_code == 200

    missing = client.post("/api/start/confirm", headers=_h(cid), json={})
    assert missing.status_code == 400, missing.text
    false_value = client.post(
        "/api/start/confirm", headers=_h(cid), json={"approve": False}
    )
    assert false_value.status_code == 400, false_value.text
    assert _status(db, cid) == "draft"

    approved = client.post(
        "/api/start/confirm", headers=_h(cid), json={"approve": True}
    )
    assert approved.status_code == 200, approved.text
    assert _status(db, cid) == "confirmed"
    assert set(("profile", "review", "next_action")).issubset(approved.json())


def test_stage_edit_cancel_preserves_profile(start_env):
    client, ids, db, _ = start_env
    cid = ids[0]
    assert client.post("/api/start/start", headers=_h(cid)).status_code == 200
    assert client.post(
        "/api/start/confirm", headers=_h(cid), json={"approve": True}
    ).status_code == 200

    before = _row(db, cid)
    staged = _stage_changes(client, cid)
    assert staged.get("token")
    assert staged.get("profile_unchanged") is True
    assert _row(db, cid) == before

    cancelled = client.post(
        "/api/start/edit/cancel", headers=_h(cid), json={"token": staged["token"]}
    )
    assert cancelled.status_code == 200, cancelled.text
    assert cancelled.json()["cancelled"] is True
    assert _row(db, cid) == before
    assert cancelled.json()["profile"]


def test_stage_edit_apply_changes_version(start_env):
    client, ids, db, _ = start_env
    cid = ids[0]
    assert client.post("/api/start/start", headers=_h(cid)).status_code == 200
    assert client.post(
        "/api/start/confirm", headers=_h(cid), json={"approve": True}
    ).status_code == 200

    base_version = _version(db, cid)
    staged = _stage_changes(client, cid)
    assert staged.get("base_version") in (None, base_version)

    applied = client.post(
        "/api/start/edit/apply", headers=_h(cid), json={"token": staged["token"]}
    )
    assert applied.status_code == 200, applied.text
    assert set(("profile", "next_action")).issubset(applied.json())
    assert _version(db, cid) > base_version
    assert "Staged Name" in json.dumps(_row(db, cid), ensure_ascii=False)


def test_two_companies_are_isolated(start_env):
    client, ids, db, _ = start_env
    a, b = ids
    assert client.post("/api/start/start", headers=_h(a)).status_code == 200
    assert client.post("/api/start/start", headers=_h(b)).status_code == 200

    from trade import start_onboarding as start

    field = "basics." + start.BASIC_FIELDS[0]
    assert client.post(
        "/api/start/answer", headers=_h(a), json={"field": field, "value": "SECRET-A"}
    ).status_code == 200

    state_b = client.get("/api/start/state", headers=_h(b))
    assert state_b.status_code == 200
    assert "SECRET-A" not in state_b.text
    assert "SECRET-A" not in json.dumps(_row(db, b), ensure_ascii=False)
    assert "SECRET-A" in json.dumps(_row(db, a), ensure_ascii=False)

    reusable_b = client.get("/api/start/reusable", headers=_h(b))
    assert reusable_b.status_code == 400  # still a draft, not company A's data


def test_shipment_document_does_not_alter_credentials(start_env):
    client, ids, db, _ = start_env
    cid = ids[0]
    assert client.post("/api/start/start", headers=_h(cid)).status_code == 200
    assert client.post(
        "/api/start/credential",
        headers=_h(cid),
        json={"claim": "ISO 9001 certified since 2018"},
    ).status_code == 200
    credentials_before = _credentials(db, cid)
    assert credentials_before

    response = client.post(
        "/api/start/shipment-document",
        headers=_h(cid),
        json={
            "shipment_ref": "SHP-2026-001",
            "doc_type": "bill_of_lading",
            "file_name": "bl.pdf",
            "note": "Original copy",
        },
    )
    assert response.status_code == 200, response.text
    assert response.json()["profile_credentials_unchanged"] is True
    assert response.json()["document"]
    assert _credentials(db, cid) == credentials_before

    conn = db.get_connection()
    try:
        count = conn.execute(
            "SELECT COUNT(*) FROM start_shipment_documents "
            "WHERE company_id = ? AND shipment_ref = ?",
            (cid, "SHP-2026-001"),
        ).fetchone()[0]
    finally:
        conn.close()
    assert count == 1


def test_next_action_does_not_start_a_task(start_env):
    client, ids, db, tmp_path = start_env
    cid = ids[0]

    def counts():
        conn = db.get_connection()
        try:
            return {
                "todos": conn.execute("SELECT COUNT(*) FROM todos").fetchone()[0],
                "cron_job_companies": conn.execute(
                    "SELECT COUNT(*) FROM cron_job_companies"
                ).fetchone()[0],
            }
        finally:
            conn.close()

    before = counts()
    _start_and_answer_all(client, cid, markets_value="Germany")
    assert client.post(
        "/api/start/confirm", headers=_h(cid), json={"approve": True}
    ).status_code == 200
    for _ in range(3):
        response = client.get("/api/start/next-action", headers=_h(cid))
        assert response.status_code == 200, response.text
        assert isinstance(response.json().get("task_exists"), bool)
    # The suggested customer-dev template exists but must NOT be started.
    assert client.get("/api/start/next-action", headers=_h(cid)).json()["task_exists"] is True
    assert counts() == before
    assert list((tmp_path / "hermes").glob("cron*")) == []


def test_reusable_rejects_draft(start_env):
    client, ids, db, _ = start_env
    cid = ids[0]

    draft = client.get("/api/start/reusable", headers=_h(cid))
    assert draft.status_code == 400, draft.text

    assert client.post("/api/start/start", headers=_h(cid)).status_code == 200
    assert client.get("/api/start/reusable", headers=_h(cid)).status_code == 400
    assert client.post(
        "/api/start/confirm", headers=_h(cid), json={"approve": True}
    ).status_code == 200

    confirmed = client.get("/api/start/reusable", headers=_h(cid))
    assert confirmed.status_code == 200, confirmed.text
    assert "draft data is never reusable" in confirmed.json()["note"]


def test_details_require_reason_and_known_key(start_env):
    client, ids, db, _ = start_env
    cid = ids[0]
    assert client.post("/api/start/start", headers=_h(cid)).status_code == 200

    from trade import start_onboarding as start

    key = list(start.DETAIL_KEYS)[0]
    missing_reason = client.post(
        "/api/start/details", headers=_h(cid), json={"key": key, "value": "x"}
    )
    assert missing_reason.status_code == 400, missing_reason.text

    unknown = client.post(
        "/api/start/details",
        headers=_h(cid),
        json={"key": "not-a-detail", "value": "x", "reason": "needed"},
    )
    assert unknown.status_code == 400, unknown.text

    good = client.post(
        "/api/start/details",
        headers=_h(cid),
        json={"key": key, "value": "x", "reason": "Needed for quotation"},
    )
    assert good.status_code == 200, good.text
    assert good.json()["detail"] == key
    assert good.json()["reason"] == "Needed for quotation"
