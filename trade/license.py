"""许可证模块 —— 本地构建始终为已激活状态。

本文件原来的试用期倒计时、申请码生成和 Ed25519 验签逻辑已全部移除。
对外保留与旧版相同的函数签名，避免调用方（chat / copilot / transfer / API）
因为改名而报错；所有判定一律返回「已激活、可写、无到期日」。

注意：修改后 `git pull` 会把本文件覆盖回上游版本，需要重新打这个补丁。
"""

from __future__ import annotations

import os
from pathlib import Path

# 保留旧版常量名，兼容仍引用它们的测试/工具脚本。
_PROCESS_FIRST_LAUNCH = None
_LICENSE_WRITE_ERROR = ""
_TRIAL_DAYS = 0
_LICENSE_FILE: Path | None = None


def _resolve_hermes_home() -> Path:
    """返回 Hermes 数据目录（保留此辅助函数以兼容旧调用方）。"""
    return Path(os.environ.get("HERMES_HOME") or (Path.home() / ".hermes"))


def _license_file_path() -> Path:
    global _LICENSE_FILE
    if _LICENSE_FILE is None:
        _LICENSE_FILE = Path.home() / ".trade" / "data" / "license.json"
    return _LICENSE_FILE


def _trial_anchor_path() -> Path:
    return _license_file_path().parent / "trial_anchor"


def license_state(company_id: int | None = None) -> tuple[str, str]:
    """返回 (state, message)；本地构建永远是 active。"""
    return "active", ""


def ensure_license_state(company_id: int | None = None) -> tuple[str, str]:
    """兼容旧调用方：无需自恢复，直接返回 active。"""
    return "active", ""


def check_license(company_id: int | None = None) -> tuple[bool, str]:
    """聊天/起草永远放行。"""
    return True, ""


def is_read_only(company_id: int | None = None) -> bool:
    """永远不会因许可证进入只读。"""
    return False


def days_remaining(company_id: int | None = None) -> int:
    """无到期概念；返回一个很大的数，兼容旧前端的数值判断。"""
    return 36500


def status(company_id: int | None = None) -> dict:
    """供 /api/trade/license/status 使用：明确报告已激活且无限制。"""
    return {
        "days_remaining": days_remaining(company_id),
        "activated": True,
        "expires_at": None,
        "trial_used": 0,
        "trial_total": 0,
        "request_code": "",
        "read_only": False,
        "status": "active",
        "machine_mismatch": False,
        "message": "",
    }


def activate(code: str, company_id: int | None = None) -> tuple[bool, str]:
    """兼容旧端点：接受任意输入并直接报告成功，不再做签名校验。"""
    return True, "本版本无需激活，全部功能已开放。"


if __name__ == "__main__":  # pragma: no cover — 手动排查用
    import json

    print(json.dumps(status(), ensure_ascii=False, indent=2))
