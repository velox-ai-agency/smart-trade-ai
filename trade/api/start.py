"""
Start onboarding API — company profile "Start" workflow.

All endpoints are scoped to an explicit company id resolved from the
``X-Company-ID`` header.  There is deliberately no default company: loading a
private profile without an explicit company selection is a privacy bug.

The business logic lives in :mod:`trade.start_onboarding`; this module only
translates it into HTTP and never re-implements storage.
"""

from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel, Field

from trade import company as company_module
from trade import start_onboarding as start
from trade.api.deps import require_company

router = APIRouter(prefix="/api/start", tags=["start"])

# Task templates registered in static/js/views.js.  Only these ids may be
# reported as an existing auto-startable task.  Kept as a small local constant
# (rather than reading the JS file at runtime) so the API has no static-asset
# dependency and stays importable in tests.
TASK_TEMPLATE_IDS = frozenset(
    {
        "morning-brief",
        "email-followup",
        "linkedin-add",
        "linkedin-engage",
        "linkedin-content",
        "platform-check",
        "customer-dev",
        "daily-summary",
        "weekly-report",
    }
)

_MARKET_SELECTION_NOTE = (
    "Market selection research is offered as a chat prompt, "
    "not an auto-started task."
)


def _require_company_header(
    x_company_id: str | None = Header(None, alias="X-Company-ID"),
) -> None:
    """Fail fast (422) when no company was selected.

    ``require_company`` below validates that the id is an integer and points at
    an active company.  This router-level dependency exists to guarantee the
    safe "ask before loading a private profile" behaviour with a 422 response
    carrying FastAPI's explicit "field required" message, instead of silently
    falling back to any default company.
    """
    if not x_company_id or not x_company_id.strip():
        raise HTTPException(
            status_code=422,
            detail="X-Company-ID header is required before loading a private profile.",
        )


# Router-level guard: applies to every /api/start/* endpoint.  Endpoint-level
# ``require_company`` still resolves and validates the concrete company id.
router.dependencies.append(Depends(_require_company_header))


# ── Request bodies ────────────────────────────────────────────────────────────


class StartAnswer(BaseModel):
    field: str
    value: Any = None
    skip: bool = False


class StartConfirm(BaseModel):
    # Default false: an absent/omitted body must never count as approval.
    approve: bool = False


class StartDetail(BaseModel):
    key: str
    value: str
    reason: str = ""


class StartCredential(BaseModel):
    claim: str


class StartShipmentDocument(BaseModel):
    shipment_ref: str
    doc_type: str
    file_name: str = ""
    note: str = ""


class StartStageEdit(BaseModel):
    changes: dict[str, Any]


class StartEditToken(BaseModel):
    token: str


# ── Helpers ───────────────────────────────────────────────────────────────────


def _company_brief(company_id: int) -> dict[str, Any]:
    """Return the minimal company identity for API responses.

    The Start API never exposes the full private company row here — just id and
    name, matching the documented contract.
    """
    name = ""
    try:
        row = company_module.get(company_id)
        if row and row.get("name"):
            name = str(row["name"])
    except Exception:  # pragma: no cover - defensive: name is cosmetic
        pass
    if not name:
        try:
            tc = company_module.get_trade_company(company_id)
            if tc and tc.get("name"):
                name = str(tc["name"])
        except Exception:  # pragma: no cover
            pass
    return {"id": company_id, "name": name}


def _call(fn, *args, **kwargs):
    """Call a backend function, mapping its ``ValueError`` to HTTP 400."""
    try:
        return fn(*args, **kwargs)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc) or "Invalid request.") from exc


def _next_question_or_none(company_id: int):
    """A missing/finished draft simply has no next question."""
    try:
        return start.next_question(company_id)
    except ValueError:
        return None


def _state_payload(company_id: int, *, with_question: bool = True) -> dict[str, Any]:
    profile = _call(start.get_profile, company_id)
    # No start_profiles row yet = onboarding has not begun.  next_question()
    # can formulate a question from an empty in-memory profile, so only ask it
    # once a draft actually exists (spec: question is None before /start).
    has_draft = profile is not None
    return {
        "company": _company_brief(company_id),
        "profile": profile or None,
        "question": (
            _next_question_or_none(company_id)
            if with_question and has_draft
            else None
        ),
    }


def _action_candidates(action: Any) -> list[str]:
    """Collect possible task/template kind identifiers from a next_action."""
    if not isinstance(action, dict):
        return [str(action)] if action is not None else []
    out: list[str] = []
    for key in ("kind", "type", "action", "task", "task_id", "template", "template_id", "id", "next"):
        value = action.get(key)
        if isinstance(value, str) and value.strip():
            out.append(value.strip())
    return out


# ── Endpoints ─────────────────────────────────────────────────────────────────


@router.get("/state")
def get_state(company: int = Depends(require_company)):
    company_id = company
    return _state_payload(company_id)


@router.post("/start")
def start_draft(company: int = Depends(require_company)):
    company_id = company
    _call(start.ensure_draft, company_id)
    payload = _state_payload(company_id)
    # ensure_draft must yield a question; never return a silent null here.
    if payload["question"] is None:
        payload["question"] = _call(start.next_question, company_id)
    return payload


@router.post("/answer")
def answer_question(payload: StartAnswer, company: int = Depends(require_company)):
    company_id = company
    field = (payload.field or "").strip()
    if not field:
        raise HTTPException(status_code=400, detail="field is required.")
    _call(start.answer, company_id, field, payload.value, skip=payload.skip)
    question = _next_question_or_none(company_id)
    return {
        "profile": _call(start.get_profile, company_id) or None,
        "question": question,
        "review": None if question else _call(start.summary, company_id),
    }


@router.post("/confirm")
def confirm_profile(payload: StartConfirm, company: int = Depends(require_company)):
    company_id = company
    # Explicit, unambiguous approval only.  {} / {"approve": false} / null are
    # all rejected — a stray click must never confirm a private profile.
    if payload.approve is not True:
        raise HTTPException(
            status_code=400,
            detail="Confirmation requires explicit approval: send {'approve': true}.",
        )
    _call(start.confirm, company_id, True)
    return {
        "profile": _call(start.get_profile, company_id) or None,
        "review": _call(start.summary, company_id),
        "next_action": _call(start.next_action, company_id),
    }


@router.post("/details")
def add_detail(payload: StartDetail, company: int = Depends(require_company)):
    company_id = company
    key = (payload.key or "").strip()
    reason = (payload.reason or "").strip()
    if not key:
        raise HTTPException(status_code=400, detail="key is required.")
    if not reason:
        raise HTTPException(
            status_code=400,
            detail="A non-empty reason is required to explain why this detail is needed.",
        )
    known = getattr(start, "DETAIL_KEYS", None)
    if known is not None and key not in known:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown detail key: {key}. Valid keys: {sorted(known)}.",
        )
    _call(start.answer, company_id, "details." + key, payload.value)
    return {
        "profile": _call(start.get_profile, company_id) or None,
        "detail": key,
        "reason": reason,
    }


@router.post("/credential")
def add_credential(payload: StartCredential, company: int = Depends(require_company)):
    company_id = company
    claim = (payload.claim or "").strip()
    if not claim:
        raise HTTPException(status_code=400, detail="claim is required.")
    credential = _call(start.record_credential, company_id, claim)
    return {"profile": _call(start.get_profile, company_id) or None, "credential": credential}


@router.post("/shipment-document")
def add_shipment_document(
    payload: StartShipmentDocument, company: int = Depends(require_company)
):
    company_id = company
    shipment_ref = (payload.shipment_ref or "").strip()
    doc_type = (payload.doc_type or "").strip()
    if not shipment_ref:
        raise HTTPException(status_code=400, detail="shipment_ref is required.")
    if not doc_type:
        raise HTTPException(status_code=400, detail="doc_type is required.")
    document = _call(
        start.record_shipment_document,
        company_id,
        shipment_ref,
        doc_type,
        payload.file_name or "",
        payload.note or "",
    )
    # Shipment evidence is stored separately; credentials are never mutated.
    return {"document": document, "profile_credentials_unchanged": True}


@router.post("/edit/stage")
def stage_edit(payload: StartStageEdit, company: int = Depends(require_company)):
    company_id = company
    if not isinstance(payload.changes, dict) or not payload.changes:
        raise HTTPException(status_code=400, detail="changes must be a non-empty object.")
    staged = _call(start.stage_edit, company_id, payload.changes)
    if not isinstance(staged, dict):
        staged = {"token": staged}
    token = staged.get("token")
    if not token:
        raise HTTPException(status_code=400, detail="Staging did not return an edit token.")
    return {
        "token": token,
        "summary": staged.get("summary"),
        "base_version": staged.get("base_version"),
        "profile_unchanged": True,
    }


@router.post("/edit/apply")
def apply_edit(payload: StartEditToken, company: int = Depends(require_company)):
    company_id = company
    token = (payload.token or "").strip()
    if not token:
        raise HTTPException(status_code=400, detail="token is required.")
    _call(start.apply_edit, company_id, token)
    return {
        "profile": _call(start.get_profile, company_id) or None,
        "next_action": _call(start.next_action, company_id),
    }


@router.post("/edit/cancel")
def cancel_edit(payload: StartEditToken, company: int = Depends(require_company)):
    company_id = company
    token = (payload.token or "").strip()
    if not token:
        raise HTTPException(status_code=400, detail="token is required.")
    _call(start.cancel_edit, company_id, token)
    return {"cancelled": True, "profile": _call(start.get_profile, company_id) or None}


@router.get("/reusable")
def reusable(company: int = Depends(require_company)):
    company_id = company
    return {
        "profile": _call(start.reusable_facts, company_id),
        "note": "Confirmed data only; draft data is never reusable.",
    }


@router.get("/next-action")
def next_action(company: int = Depends(require_company)):
    company_id = company
    action = _call(start.next_action, company_id)
    candidates = _action_candidates(action)
    result: dict[str, Any] = (
        dict(action) if isinstance(action, dict) else {"next_action": action}
    )
    result["task_exists"] = any(c in TASK_TEMPLATE_IDS for c in candidates)
    if any("market" in c.lower() and "selection" in c.lower() for c in candidates):
        result["note"] = _MARKET_SELECTION_NOTE
    return result
