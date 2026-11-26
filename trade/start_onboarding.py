"""Start onboarding — storage + state machine for the 'Start' company workflow.

All data is tenant-scoped by ``company_id`` and stored in SQLite through
``trade.database.get_connection`` / ``begin_immediate``. Public functions only
return JSON-serializable dicts (or None), so the HTTP layer can serialise them
directly.

State machine (per company)::

    (no row) --ensure_draft/answer--> draft --confirm--> confirmed
                                                  |            |
                                            stage_edit    stage_edit
                                                  |            |
                                             cancel_edit   apply_edit
                                                              |
                                                          confirmed (version+1)

Design rules:
  * Answers are saved one at a time (incremental / resumable draft).
  * ``skipped`` stores canonical field names; skipped fields never get an
    invented value.
  * A full snapshot is written to history on confirm and on every applied edit.
  * Shipment documents (certificate of origin / invoice / packing list /
    bill of lading) are NEVER credentials and live in their own table.
"""

from __future__ import annotations

import copy
import json
import re
import uuid
from datetime import datetime

from trade.database import begin_immediate, get_connection

# ── Public vocabulary ──────────────────────────────────────────────────────

BASIC_FIELDS = ["name", "country", "activity"]
PRODUCT_FIELDS = ["products"]
MARKET_FIELDS = ["markets"]
DETAIL_KEYS = [
    "specifications",
    "moq",
    "capacity",
    "lead_times",
    "pricing",
    "payment_terms",
    "shipping_terms",
    "buyer_preferences",
    "previous_markets",
    "correspondence_preferences",
    "signature",
]

# Short English explanations the API returns so the UI can explain why an
# optional detail is worth answering.
REASON_BY_KEY = {
    "specifications": "Detailed specs let us match buyer requirements accurately.",
    "moq": "Minimum order quantity sets realistic quotation ranges.",
    "capacity": "Production capacity supports realistic volume commitments.",
    "lead_times": "Lead times must be known before promising delivery dates.",
    "pricing": "A pricing basis avoids under-quoting and inconsistent offers.",
    "payment_terms": "Payment terms shape cash flow and contract risk.",
    "shipping_terms": "Shipping/Incoterms terms define delivery responsibilities.",
    "buyer_preferences": "Buyer preferences make targeting and outreach more relevant.",
    "previous_markets": "Past markets show proven demand and usable references.",
    "correspondence_preferences": "Response style and language preferences improve communication.",
    "signature": "An approved signature keeps outgoing messages consistent.",
}

_VALID_FIELDS = (
    {"basics.%s" % k for k in BASIC_FIELDS}
    | set(PRODUCT_FIELDS)
    | set(MARKET_FIELDS)
    | {"details.%s" % k for k in DETAIL_KEYS}
)

_FIELD_ORDER = ["basics.name", "basics.country", "basics.activity", "products", "markets"]

_QUESTION_PROMPTS = {
    "basics.name": "What is your company's registered name?",
    "basics.country": "Which country is your company based in?",
    "basics.activity": "What is your company's main business activity?",
    "products": "Which products do you mainly export? Please list them.",
    "markets": "Which markets or countries do you sell to? Type 'undecided' if not decided yet.",
}

_LABELS = {
    "basics.name": "Company name",
    "basics.country": "Country",
    "basics.activity": "Business activity",
}

_UNDECIDED_MARKERS = {"undecided", "非决定", "غير محدد"}
_VALID_MARKET_STATUS = ("undecided", "defined", "missing")

_SHIPMENT_DOC_TYPES = ("certificate_of_origin", "invoice", "packing_list", "bill_of_lading")
_SHIPMENT_DOC_PHRASES = (
    "certificate of origin",
    "invoice",
    "packing list",
    "bill of lading",
)
_SHIPMENT_DOC_HINT = (
    "Shipment documents (certificate of origin, invoice, packing list, "
    "bill of lading) are not credentials. Use record_shipment_document("
    "company_id, shipment_ref, doc_type, file_name, note) with doc_type in "
    "certificate_of_origin|invoice|packing_list|bill_of_lading instead."
)

_BASIC_ALIASES = {
    "name": "basics.name",
    "country": "basics.country",
    "activity": "basics.activity",
}


def _canonical_field(field) -> str:
    """Accept bare basic names as aliases for their canonical basics.<key> form."""
    text = str(field or "").strip()
    return _BASIC_ALIASES.get(text, text)


def _canonical_doc_type(doc_type) -> str:
    """Normalise hyphen/space doc types to the four canonical store values."""
    norm = re.sub(r"[^a-z0-9]+", "_", str(doc_type or "").strip().lower()).strip("_")
    if norm not in _SHIPMENT_DOC_TYPES:
        raise ValueError(
            "doc_type must be one of %s" % "|".join(_SHIPMENT_DOC_TYPES)
        )
    return norm


def _normalize_changes(changes: dict) -> dict:
    """Flatten nested/bare change shapes to canonical field keys."""
    out = {}
    for key, value in changes.items():
        field = _canonical_field(key)
        if field == "basics" and isinstance(value, dict):
            for sub_key, sub_value in value.items():
                out["basics.%s" % sub_key] = sub_value
        elif field == "details" and isinstance(value, dict):
            for sub_key, sub_value in value.items():
                out["details.%s" % sub_key] = sub_value
        else:
            out[field] = value
    return out


# ── Compact, malformed-JSON-tolerant helpers ──────────────────────────────


def _jload(text, default):
    """Parse a JSON TEXT column; return a fresh *default* on NULL/empty/corrupt data.

    Malformed JSON is tolerated on purpose: a hand-edited or partially written
    row must never make the whole onboarding screen crash.
    """
    if not isinstance(text, str) or not text.strip():
        return copy.deepcopy(default)
    try:
        return json.loads(text)
    except (TypeError, ValueError):
        return copy.deepcopy(default)


def _jdump(value) -> str:
    """Serialise a value to compact JSON (ensure_ascii=False for readability)."""
    return json.dumps(value, ensure_ascii=False, sort_keys=True)


def _as_dict(value) -> dict:
    """Coerce a parsed value to dict, silently replacing wrong-shaped data."""
    return value if isinstance(value, dict) else {}


def _as_list(value) -> list:
    """Coerce a parsed value to list, silently replacing wrong-shaped data."""
    return value if isinstance(value, list) else []


def _now_text() -> str:
    """Local timestamp string matching SQLite's datetime('now','localtime')."""
    return datetime.now().isoformat(sep=" ", timespec="seconds")


def _empty_profile(company_id: int) -> dict:
    """In-memory shape used when a company has no start_profiles row yet."""
    return {
        "company_id": company_id,
        "status": "draft",
        "basics": {},
        "products": [],
        "markets": {},
        "details": {},
        "credentials": [],
        "skipped": [],
        "version": 0,
        "created_at": "",
        "updated_at": "",
        "confirmed_at": "",
    }


def _row_to_profile(row) -> dict | None:
    """Convert a start_profiles sqlite3.Row to a typed, JSON-safe dict."""
    if row is None:
        return None
    return {
        "company_id": row["company_id"],
        "status": row["status"],
        "basics": _as_dict(_jload(row["basics"], {})),
        "products": _as_list(_jload(row["products"], [])),
        "markets": _as_dict(_jload(row["markets"], {})),
        "details": _as_dict(_jload(row["details"], {})),
        "credentials": _as_list(_jload(row["credentials"], [])),
        "skipped": _as_list(_jload(row["skipped"], [])),
        "version": int(row["version"]),
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
        "confirmed_at": row["confirmed_at"],
    }


def _snapshot(profile: dict) -> str:
    """Full immutable snapshot string written to start_profile_history."""
    return _jdump(profile)


def _insert_history(conn, company_id: int, version: int, profile: dict, note: str) -> None:
    """Write (or replace) one history snapshot for a company/version."""
    conn.execute(
        "INSERT OR REPLACE INTO start_profile_history "
        "(company_id, version, snapshot, note) VALUES (?, ?, ?, ?)",
        (company_id, int(version), _snapshot(profile), note),
    )


def _ensure_row(conn, company_id: int):
    """INSERT OR IGNORE a draft row for this company, then return its row.

    The caller MUST already hold a write transaction. company_id is the PK and
    a FK to companies(id), so a foreign company can never be created here and
    an existing row is never overwritten.
    """
    conn.execute(
        "INSERT OR IGNORE INTO start_profiles (company_id) VALUES (?)",
        (company_id,),
    )
    return conn.execute(
        "SELECT * FROM start_profiles WHERE company_id = ?", (company_id,)
    ).fetchone()


def _write_profile(conn, company_id: int, profile: dict) -> None:
    """Persist all mutable JSON columns + version of *profile* (no status change)."""
    conn.execute(
        "UPDATE start_profiles SET basics=?, products=?, markets=?, details=?, "
        "credentials=?, skipped=?, version=?, "
        "updated_at=datetime('now','localtime') WHERE company_id=?",
        (
            _jdump(profile["basics"]),
            _jdump(profile["products"]),
            _jdump(profile["markets"]),
            _jdump(profile["details"]),
            _jdump(profile["credentials"]),
            _jdump(profile["skipped"]),
            int(profile["version"]),
            company_id,
        ),
    )


# ── Field normalisation ────────────────────────────────────────────────────


def _normalize_markets(value) -> dict:
    """Normalise markets input to {'status', 'values', 'raw'}.

    Accepts a string (including the undecided markers), a list/tuple or a dict.
    A dict that already carries a recognised status is preserved; any other
    dict is treated as generic market information.
    """
    raw = value
    if isinstance(value, dict):
        status = value.get("status")
        if status in _VALID_MARKET_STATUS:
            values = [str(v) for v in _as_list(value.get("values", [])) if str(v).strip()]
            return {
                "status": status,
                "values": values,
                "raw": value.get("raw", value),
            }
        values: list = []
        for item in value.values():
            if isinstance(item, (list, tuple)):
                values.extend(str(x) for x in item if str(x).strip())
            elif str(item).strip():
                values.append(str(item))
        return {
            "status": "defined" if values else "missing",
            "values": values,
            "raw": raw,
        }
    if isinstance(value, (list, tuple)):
        values = [str(x) for x in value if str(x).strip()]
        return {
            "status": "defined" if values else "missing",
            "values": values,
            "raw": list(value),
        }
    text = "" if value is None else str(value)
    stripped = text.strip()
    if stripped.lower() in {"undecided"} or stripped in _UNDECIDED_MARKERS:
        return {"status": "undecided", "values": [], "raw": raw}
    values = [stripped] if stripped else []
    return {
        "status": "defined" if values else "missing",
        "values": values,
        "raw": raw,
    }


def _apply_field(profile: dict, field: str, value) -> None:
    """Apply one canonical field to an in-memory profile (no validation here)."""
    if field.startswith("basics."):
        key = field.split(".", 1)[1]
        profile["basics"][key] = "" if value is None else str(value)
    elif field == "products":
        if isinstance(value, list):
            profile["products"] = list(value)
        elif isinstance(value, dict):
            profile["products"] = [value]
        else:
            text = "" if value is None else str(value)
            profile["products"] = [text] if text.strip() else []
    elif field == "markets":
        profile["markets"] = _normalize_markets(value)
    elif field.startswith("details."):
        key = field.split(".", 1)[1]
        profile["details"][key] = value
    else:
        raise ValueError("Unknown field: %s" % field)


def _clear_field(profile: dict, field: str) -> None:
    """Remove any stored value for *field* so a skipped field stays empty."""
    if field.startswith("basics."):
        profile["basics"].pop(field.split(".", 1)[1], None)
    elif field == "products":
        profile["products"] = []
    elif field == "markets":
        profile["markets"] = {}
    elif field.startswith("details."):
        profile["details"].pop(field.split(".", 1)[1], None)


def _has_value(profile: dict, field: str) -> bool:
    """Whether a canonical field has a real (non-placeholder) answer."""
    if field.startswith("basics."):
        value = profile["basics"].get(field.split(".", 1)[1], "")
        return bool(str(value).strip())
    if field == "products":
        return bool(profile["products"])
    if field == "markets":
        markets = profile["markets"]
        return bool(markets) and markets.get("status") in ("defined", "undecided")
    if field.startswith("details."):
        return field.split(".", 1)[1] in profile["details"]
    return False


def _before_value(profile: dict, field: str):
    """Current value of a canonical field, used in edit summaries."""
    if field.startswith("basics."):
        return profile["basics"].get(field.split(".", 1)[1], "")
    if field == "products":
        return profile["products"]
    if field == "markets":
        return profile["markets"]
    if field.startswith("details."):
        return profile["details"].get(field.split(".", 1)[1], "")
    return ""


def _short(value, limit: int = 80) -> str:
    """Short, single-line representation for human-readable edit summaries."""
    text = str(value).replace("\n", " ")
    return text if len(text) <= limit else text[: limit - 3] + "..."


def _looks_like_shipment_document(text: str) -> bool:
    """Detect file names for shipment docs that must not become credentials."""
    norm = re.sub(r"[^a-z0-9\u4e00-\u9fff]+", " ", str(text).lower())
    return any(phrase in norm for phrase in _SHIPMENT_DOC_PHRASES)


# ── Public API ─────────────────────────────────────────────────────────────


def get_profile(company_id: int) -> dict | None:
    """Return the company's Start profile or None if it has none.

    Never falls back to another company's row — reads are always keyed by the
    exact company_id supplied.
    """
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT * FROM start_profiles WHERE company_id = ?", (company_id,)
        ).fetchone()
        return _row_to_profile(row)
    finally:
        conn.close()


def ensure_draft(company_id: int) -> dict:
    """Create (if absent) and return a draft profile for *this* company only."""
    conn = get_connection()
    try:
        begin_immediate(conn)
        row = _ensure_row(conn, company_id)
        conn.commit()
        return _row_to_profile(row)
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def answer(company_id: int, field: str, value, skip: bool = False) -> dict:
    """Record one answer (or a skip) and save immediately — resumable draft.

    *field* must be one of basics.name / basics.country / basics.activity /
    products / markets / details.<DETAIL_KEY> (bare ``name`` / ``country`` /
    ``activity`` are accepted as aliases), otherwise ValueError is raised.

    When *skip* is True the canonical field name is appended to ``skipped`` and
    no value is stored (nothing is invented). Markets input is normalised to
    {'status': 'undecided'|'defined'|'missing', 'values': [...], 'raw': ...}.
    """
    field = _canonical_field(field)
    if field not in _VALID_FIELDS:
        raise ValueError("Unknown field: %s" % field)
    conn = get_connection()
    try:
        begin_immediate(conn)
        profile = _row_to_profile(_ensure_row(conn, company_id))
        skipped = profile["skipped"]
        if skip:
            if field not in skipped:
                skipped.append(field)
            _clear_field(profile, field)
        else:
            _apply_field(profile, field, value)
            if field in skipped:
                skipped.remove(field)
        _write_profile(conn, company_id, profile)
        conn.commit()
        return get_profile(company_id)
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def next_question(company_id: int) -> dict | None:
    """Return the next single focused question, or None when all five are handled.

    A field is handled once it has a real answer OR was skipped. Order is
    name, country, activity, products, markets (English prompts by default).
    """
    profile = get_profile(company_id) or _empty_profile(company_id)
    for field in _FIELD_ORDER:
        if _has_value(profile, field) or field in profile["skipped"]:
            continue
        return {
            "field": field,
            "prompt": _QUESTION_PROMPTS[field],
            "skipped": field in profile["skipped"],
        }
    return None


def summary(company_id: int) -> dict:
    """Brief basics-only review (never includes optional details)."""
    profile = get_profile(company_id) or _empty_profile(company_id)
    skipped = profile["skipped"]
    items = []
    for field in ("basics.name", "basics.country", "basics.activity"):
        key = field.split(".", 1)[1]
        value = profile["basics"].get(key, "")
        is_skipped = field in skipped
        items.append(
            {
                "field": field,
                "label": _LABELS[field],
                "value": "" if is_skipped else value,
                "missing": (not str(value).strip()) and not is_skipped,
                "skipped": is_skipped,
            }
        )
    return {
        "items": items,
        "markets": profile["markets"],
        "products": profile["products"],
    }


def confirm(company_id: int, approve: bool = True) -> dict:
    """Confirm a profile: snapshot current + new versions, then mark confirmed.

    Raises ValueError unless *approve* is exactly True. Answered data is never
    erased: only status, version, confirmed_at and updated_at change.
    """
    if approve is not True:
        raise ValueError("approve must be True")
    conn = get_connection()
    try:
        begin_immediate(conn)
        profile = _row_to_profile(_ensure_row(conn, company_id))

        # Full snapshot of the version being confirmed.
        _insert_history(conn, company_id, profile["version"], profile, "confirmed")

        profile["version"] = int(profile["version"]) + 1
        profile["status"] = "confirmed"
        _write_profile(conn, company_id, profile)
        conn.execute(
            "UPDATE start_profiles SET status='confirmed', "
            "confirmed_at=datetime('now','localtime') WHERE company_id=?",
            (company_id,),
        )

        new_row = conn.execute(
            "SELECT * FROM start_profiles WHERE company_id = ?", (company_id,)
        ).fetchone()
        new_profile = _row_to_profile(new_row)
        # Full snapshot of the newly approved version.
        _insert_history(conn, company_id, new_profile["version"], new_profile, "approved")
        conn.commit()
        return new_profile
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def stage_edit(company_id: int, changes: dict) -> dict:
    """Stage changes to a confirmed profile WITHOUT mutating that profile.

    Returns {'token', 'summary', 'base_version'}. The summary lists each changed
    canonical field with truncated before/after values.
    """
    if not isinstance(changes, dict):
        raise ValueError("changes must be a dict")
    changes = _normalize_changes(changes)
    unknown = [k for k in changes if k not in _VALID_FIELDS]
    if unknown:
        raise ValueError("Unknown field(s): %s" % ", ".join(unknown))

    conn = get_connection()
    try:
        begin_immediate(conn)
        row = conn.execute(
            "SELECT * FROM start_profiles WHERE company_id = ?", (company_id,)
        ).fetchone()
        profile = _row_to_profile(row)
        if profile is None or profile["status"] != "confirmed":
            raise ValueError("Only confirmed profiles can be edited")

        token = uuid.uuid4().hex
        base_version = int(profile["version"])
        parts = [
            "%s: %s -> %s"
            % (field, _short(_before_value(profile, field)), _short(changes[field]))
            for field in changes
        ]
        text = "; ".join(parts)
        conn.execute(
            "INSERT INTO start_edit_staging "
            "(company_id, token, base_version, proposed, summary) VALUES (?, ?, ?, ?, ?)",
            (company_id, token, base_version, _jdump(changes), text),
        )
        conn.commit()
        return {"token": token, "summary": text, "base_version": base_version}
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def apply_edit(company_id: int, token: str) -> dict:
    """Apply a staged edit atomically and return the updated profile.

    Raises ValueError('stale') when the staging row is missing for this company
    or its base_version no longer matches the profile version. The last
    confirmed version stays intact until this call succeeds.
    """
    conn = get_connection()
    try:
        begin_immediate(conn)
        stage = conn.execute(
            "SELECT * FROM start_edit_staging WHERE company_id = ? AND token = ?",
            (company_id, token),
        ).fetchone()
        if stage is None:
            raise ValueError("stale")
        profile = _row_to_profile(
            conn.execute(
                "SELECT * FROM start_profiles WHERE company_id = ?", (company_id,)
            ).fetchone()
        )
        if profile is None:
            raise ValueError("stale")
        if int(stage["base_version"]) != int(profile["version"]):
            raise ValueError("stale")

        # Preserve the base snapshot if a previous operation did not write it.
        has_base = conn.execute(
            "SELECT 1 FROM start_profile_history WHERE company_id = ? AND version = ?",
            (company_id, stage["base_version"]),
        ).fetchone()
        if not has_base:
            _insert_history(conn, company_id, stage["base_version"], profile, "edit base")

        changes = _as_dict(_jload(stage["proposed"], {}))
        for field, value in changes.items():
            if field in _VALID_FIELDS:
                _apply_field(profile, field, value)

        new_version = int(profile["version"]) + 1
        profile["version"] = new_version
        _write_profile(conn, company_id, profile)
        new_profile = _row_to_profile(
            conn.execute(
                "SELECT * FROM start_profiles WHERE company_id = ?", (company_id,)
            ).fetchone()
        )
        _insert_history(conn, company_id, new_version, new_profile, "edit applied")
        conn.execute(
            "DELETE FROM start_edit_staging WHERE company_id = ? AND token = ?",
            (company_id, token),
        )
        conn.commit()
        return new_profile
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def cancel_edit(company_id: int, token: str) -> dict:
    """Discard a staged edit only — the profile is never touched."""
    conn = get_connection()
    try:
        begin_immediate(conn)
        conn.execute(
            "DELETE FROM start_edit_staging WHERE company_id = ? AND token = ?",
            (company_id, token),
        )
        conn.commit()
        return {"cancelled": True}
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def record_credential(company_id: int, claim: str) -> dict:
    """Append an unverified, user-provided claim to the profile's credentials.

    Refuses shipment-document file names (certificate of origin / invoice /
    packing list / bill of lading) with a ValueError describing the correct
    ``record_shipment_document`` handling.
    """
    text = "" if claim is None else str(claim).strip()
    if _looks_like_shipment_document(text):
        raise ValueError(_SHIPMENT_DOC_HINT)
    conn = get_connection()
    try:
        begin_immediate(conn)
        profile = _row_to_profile(_ensure_row(conn, company_id))
        profile["credentials"].append(
            {
                "claim": text,
                "origin": "user-provided, unverified",
                "created_at": _now_text(),
            }
        )
        _write_profile(conn, company_id, profile)
        conn.commit()
        return get_profile(company_id)
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def record_shipment_document(
    company_id: int,
    shipment_ref: str,
    doc_type: str,
    file_name: str = "",
    note: str = "",
) -> dict:
    """Insert one shipment document — never a credential.

    Only doc_type in certificate_of_origin|invoice|packing_list|bill_of_lading
    is accepted. Asserts that the credentials array is unchanged.
    """
    doc_type = _canonical_doc_type(doc_type)
    conn = get_connection()
    try:
        begin_immediate(conn)
        before_row = conn.execute(
            "SELECT credentials FROM start_profiles WHERE company_id = ?", (company_id,)
        ).fetchone()
        before_creds = _jload(before_row["credentials"], []) if before_row else []

        cur = conn.execute(
            "INSERT INTO start_shipment_documents "
            "(company_id, shipment_ref, doc_type, file_name, note) "
            "VALUES (?, ?, ?, ?, ?)",
            (
                company_id,
                "" if shipment_ref is None else str(shipment_ref),
                doc_type,
                "" if file_name is None else str(file_name),
                "" if note is None else str(note),
            ),
        )
        new_id = int(cur.lastrowid)

        after_row = conn.execute(
            "SELECT credentials FROM start_profiles WHERE company_id = ?", (company_id,)
        ).fetchone()
        after_creds = _jload(after_row["credentials"], []) if after_row else []
        assert after_creds == before_creds, (
            "credentials must not change when recording a shipment document"
        )

        row = conn.execute(
            "SELECT * FROM start_shipment_documents WHERE id = ?", (new_id,)
        ).fetchone()
        conn.commit()
        return dict(row)
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def reusable_facts(company_id: int) -> dict:
    """Return ONLY confirmed, reusable data; draft data is never returned.

    Raises ValueError unless the profile exists and is confirmed.
    """
    profile = get_profile(company_id)
    if profile is None or profile["status"] != "confirmed":
        raise ValueError("Only confirmed profiles expose reusable facts")
    return {
        "company_id": profile["company_id"],
        "basics": profile["basics"],
        "products": profile["products"],
        "markets": profile["markets"],
        "details": profile["details"],
        "credentials": profile["credentials"],
        "version": profile["version"],
    }


def next_action(company_id: int) -> dict:
    """Suggest the next step for a confirmed profile; never starts a task.

    Defined markets -> customer-development task; undecided markets ->
    market-selection research chat; otherwise a no-suggestion placeholder.
    Drafts (and companies without a profile) simply have no suggestion yet —
    their answers are not reusable, so no task/chat is offered from them.
    """
    profile = get_profile(company_id)
    if profile is None or profile["status"] != "confirmed":
        return {
            "kind": "none",
            "label": "No suggestion yet",
            "reason": "Basics still missing.",
        }
    status = profile["markets"].get("status")
    if status == "defined":
        return {
            "kind": "task",
            "id": "customer-dev",
            "label": "Customer Development (buyer research)",
            "reason": "Defined market: buyer research can use confirmed products and markets.",
        }
    if status == "undecided":
        return {
            "kind": "chat",
            "id": "market-selection",
            "label": "Market selection research",
            "skill": "b2b-market-analysis",
            "reason": "Market undecided: compare candidate markets before buyer research.",
        }
    return {
        "kind": "none",
        "label": "No suggestion yet",
        "reason": "Basics still missing.",
    }
