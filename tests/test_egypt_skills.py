"""Egypt packs are active, routable skills — not hidden scaffolding."""

from __future__ import annotations

from collections import defaultdict

from trade.skill_registry import _BLOCKED_SKILLS, _SKILLS
from trade.skill_router import match_skill

EXPECTED = {
    "b2b-egypt-pack": ["egypt pack", "egypt market", "egyptian company"],
    "egypt-export-sources": [
        "egypt export sources",
        "GOEIC",
        "Nafeza",
        "CargoX",
        "Central Bank of Egypt",
    ],
}


def test_egypt_skills_registered_and_routable():
    active = {s["name"]: s for s in _SKILLS if s["name"] not in _BLOCKED_SKILLS}
    owners: dict[str, list[str]] = defaultdict(list)
    for name, skill in active.items():
        for trigger in skill.get("triggers", []):
            owners[trigger.strip().lower()].append(name)

    for name, triggers in EXPECTED.items():
        assert name in active, f"{name} not registered"
        for trigger in triggers:
            assert len(owners[trigger.lower()]) == 1, f"trigger conflict: {trigger}"
            hit = match_skill(trigger)
            assert hit and hit["name"] == name, f"{trigger!r} routed to {hit and hit['name']}"


def test_egypt_skills_have_unique_triggers():
    active = [s for s in _SKILLS if s["name"] not in _BLOCKED_SKILLS]
    owners: dict[str, list[str]] = defaultdict(list)
    for skill in active:
        for trigger in skill.get("triggers", []):
            owners[trigger.strip().lower()].append(skill["name"])
    conflicts = {t: names for t, names in owners.items() if len(names) > 1}
    assert not conflicts, f"cross-skill trigger conflicts: {conflicts}"
