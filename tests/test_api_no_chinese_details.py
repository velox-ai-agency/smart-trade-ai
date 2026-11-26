"""Level-2 Chinese removal guard (2026-11-26).

The web UI is English/Arabic only. Every user-facing string emitted by the
HTTP API — HTTPException details, JSON "message"/"error"/"hint" fields,
JSONResponse "detail" values — must be in English (Arabic localization for
known messages lives in static/js/i18n.js API_ERROR_L10N / AR_TERMS).

Chinese is allowed in:
  - comments and docstrings (internal notes),
  - keys of internal lookup tables (e.g. ui_l10n dictionaries),
  - trade/osint/ui_l10n.py itself (the translation database).

Any new CJK literal in an API-facing position fails this test, so the
"sanitize_for_ui strips CJK mid-word" bug class cannot come back through
the API layer.
"""

from __future__ import annotations

import ast
import re
from pathlib import Path

import pytest

TRADE_DIR = Path(__file__).resolve().parent.parent / "trade" / "api"
CJK = re.compile(r"[\u4e00-\u9fff\u3040-\u30ff]")

# JSON payload keys whose values reach the browser directly.
USER_FACING_KEYS = {"detail", "message", "error", "hint", "hint_en"}

# Known false positives that are deliberately allowed (internal keys/values
# that the UI translates before display, verified individually).
ALLOWED_LITERALS = {
    # ui_l10n lookup key — localize_for_ui() has en/ar entries for it.
    "正在分析问题...",
}


def _is_user_facing(node: ast.AST) -> bool:
    """True if the node is an HTTPException call (browser displays detail)."""
    fname = getattr(node.func, "id", getattr(node.func, "attr", "")) if isinstance(node, ast.Call) else ""
    return fname == "HTTPException"


def _strings_in_user_facing_positions(tree: ast.Module) -> list[str]:
    found: list[str] = []

    class V(ast.NodeVisitor):
        def visit_Call(self, node: ast.Call) -> None:
            # HTTPException(status_code=..., detail="...") — positional or kw.
            fname = getattr(node.func, "id", getattr(node.func, "attr", ""))
            if fname not in ("HTTPException", "JSONResponse"):
                self.generic_visit(node)
                return
            args = [k.value for k in node.keywords if k.arg and k.arg in ("detail", "content")]
            if fname == "HTTPException":
                args += list(node.args)
            for arg in args:
                if isinstance(arg, ast.Constant) and isinstance(arg.value, str):
                    found.append(arg.value)
                elif isinstance(arg, ast.JoinedStr) or isinstance(arg, ast.BinOp):
                    # f-strings / concatenation: collect the literal parts
                    for sub in ast.walk(arg):
                        if isinstance(sub, ast.Constant) and isinstance(sub.value, str):
                            found.append(sub.value)
                elif isinstance(arg, ast.Dict):
                    found.extend(self._dict_user_strings(arg))
            self.generic_visit(node)

        def _dict_user_strings(self, d: ast.Dict) -> list[str]:
            out = []
            for k, v in zip(d.keys, d.values):
                if k is None or v is None:
                    continue
                key = k.value if isinstance(k, ast.Constant) else None
                if key in USER_FACING_KEYS:
                    if isinstance(v, ast.Constant) and isinstance(v.value, str):
                        out.append(v.value)
                    elif isinstance(v, (ast.JoinedStr, ast.BinOp)):
                        for sub in ast.walk(v):
                            if isinstance(sub, ast.Constant) and isinstance(sub.value, str):
                                out.append(sub.value)
            return out

    V().visit(tree)
    return found


@pytest.mark.parametrize("path", sorted(TRADE_DIR.glob("*.py")), ids=lambda p: p.name)
def test_api_file_has_no_chinese_user_facing_strings(path: Path):
    tree = ast.parse(path.read_text(encoding="utf-8"))
    for s in _strings_in_user_facing_positions(tree):
        assert not CJK.search(s) or s in ALLOWED_LITERALS, (
            f"{path.name}: Chinese in user-facing API string: {s!r}"
        )
