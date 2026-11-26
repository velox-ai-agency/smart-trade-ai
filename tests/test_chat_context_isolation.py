"""Per-screen chat sessions: history and prompt memory must stay context-scoped."""
from __future__ import annotations

import sqlite3

import pytest


@pytest.fixture
def test_db(monkeypatch, tmp_path):
    db_path = tmp_path / "trade.db"
    import trade.database as _db
    monkeypatch.setattr(_db, "_get_db_path", lambda: db_path)
    from trade.database import SCHEMA_SQL, _add_spare_columns

    conn = sqlite3.connect(str(db_path))
    conn.executescript(SCHEMA_SQL)
    _add_spare_columns(conn)
    conn.commit()
    conn.close()
    return db_path


def _seed(db_path):
    conn = sqlite3.connect(str(db_path))
    conn.execute(
        "INSERT INTO companies (id, name, slug) VALUES (1, 'Co', 'co')"
    )
    rows = [
        ("q-daily", "daily", None),
        ("q-lead", "lead", 7),
        ("q-lead-other-lib", "lead", 8),
        ("q-legacy", "", None),
    ]
    for query, context, library_id in rows:
        conn.execute(
            "INSERT INTO conversations "
            "(company_id, customer_id, library_id, query, response, context) "
            "VALUES (1, NULL, ?, ?, 'answer', ?)",
            (library_id, query, context),
        )
    conn.commit()
    conn.close()


def test_get_recent_scopes_by_context(test_db):
    from trade import chat_memory
    _seed(test_db)
    rows = chat_memory.get_recent(1, limit=20, context="daily")
    assert [r["query"] for r in rows] == ["q-daily"]
    rows = chat_memory.get_recent(1, limit=20, context="lead")
    assert sorted(r["query"] for r in rows) == ["q-lead", "q-lead-other-lib"]


def test_list_by_context_excludes_legacy_empty_context(test_db):
    from trade import chat_memory
    _seed(test_db)
    rows = chat_memory.list_by_context(1, "daily")
    assert [r["query"] for r in rows] == ["q-daily"]
    # legacy rows remain reachable through the full History view
    assert any(
        r["query"] == "q-legacy"
        for r in chat_memory.list_by_company(1, limit=50)
    )


def test_list_by_context_applies_library_filter(test_db):
    from trade import chat_memory
    _seed(test_db)
    rows = chat_memory.list_by_context(1, "lead", library_id=7)
    assert [r["query"] for r in rows] == ["q-lead"]


def test_history_block_forwards_context_to_memory(monkeypatch):
    from trade import helpers
    captured = {}

    def fake_get_recent(company_id, limit=20, customer_id=None, context=None):
        captured["context"] = context
        return []

    monkeypatch.setattr(helpers._cm, "get_recent", fake_get_recent)
    helpers._get_history_block(1, 100, context="osint")
    assert captured["context"] == "osint"
