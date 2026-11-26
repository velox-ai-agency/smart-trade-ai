"""定制版更新通道的守卫测试。

覆盖 2026-11-26 的安全改造：
  - TRADE_UPDATE_DISABLED 关闭一键更新（定制版在确认自己的更新源前先关掉）
  - TRADE_UPDATE_REMOTE / TRADE_UPDATE_BRANCH / TRADE_REPO_URL 可配置，
    不再写死上游 origin
  - 工作区有未提交改动时拒绝更新（不再自动 stash 后 checkout 到远端）
  - update_skills() 默认从本地安装同步，不访问上游 raw 地址
"""

from __future__ import annotations

import importlib
import os
import subprocess
from pathlib import Path

import pytest

_ENV_KEYS = (
    "TRADE_UPDATE_DISABLED",
    "TRADE_UPDATE_ALLOW_DIRTY",
    "TRADE_UPDATE_REMOTE",
    "TRADE_UPDATE_BRANCH",
    "TRADE_REPO_URL",
    "TRADE_SKILLS_RAW_BASE",
)


@pytest.fixture(autouse=True)
def _restore_update_module():
    """用例改过的环境变量与模块常量必须在结束后还原。

    update.py 的配置是 import 时读取的，所以每个用例都要 reload；
    不还原就会把「关闭更新」之类的状态泄漏给后面的用例。
    """
    saved = {k: os.environ.get(k) for k in _ENV_KEYS}
    yield
    for key, value in saved.items():
        if value is None:
            os.environ.pop(key, None)
        else:
            os.environ[key] = value
    importlib.reload(importlib.import_module("trade.post_install.update"))


def _reload_update():
    return importlib.reload(importlib.import_module("trade.post_install.update"))


def _init_repo(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)
    subprocess.run(["git", "init", "-q", str(path)], check=True)


class TestUpdateDisabled:
    def test_update_trade_refuses_when_disabled(self):
        os.environ["TRADE_UPDATE_DISABLED"] = "1"
        upd = _reload_update()

        result = upd.update_trade()

        assert result["ok"] is False
        assert "updates disabled" in result["errors"]

    def test_preview_refuses_when_disabled(self):
        os.environ["TRADE_UPDATE_DISABLED"] = "1"
        upd = _reload_update()

        result = upd.preview_update_target()

        assert result["ok"] is False
        assert "disabled" in result["error"].lower()


class TestChannelConfig:
    def test_remote_and_branch_are_configurable(self, monkeypatch):
        monkeypatch.setenv("TRADE_UPDATE_REMOTE", "myfork")
        monkeypatch.setenv("TRADE_UPDATE_BRANCH", "release")
        monkeypatch.setenv("TRADE_REPO_URL", "https://example.test/r.git")

        upd = _reload_update()

        assert upd._UPDATE_REMOTE == "myfork"
        assert upd._UPDATE_BRANCH == "release"
        assert upd._REPO_URL == "https://example.test/r.git"

    def test_channel_env_file_is_loaded(self, tmp_path, monkeypatch):
        """~/.trade/update-channel.env 让定制在每次启动后依然生效。"""
        monkeypatch.setenv("TRADE_HOME", str(tmp_path))
        (tmp_path / "update-channel.env").write_text(
            "# custom channel\nTRADE_UPDATE_REMOTE=fork\nTRADE_UPDATE_BRANCH=ar-main\n",
            encoding="utf-8",
        )
        for key in ("TRADE_UPDATE_REMOTE", "TRADE_UPDATE_BRANCH"):
            monkeypatch.delenv(key, raising=False)

        upd = _reload_update()

        assert upd._UPDATE_REMOTE == "fork"
        assert upd._UPDATE_BRANCH == "ar-main"

    def test_real_env_wins_over_channel_file(self, tmp_path, monkeypatch):
        monkeypatch.setenv("TRADE_HOME", str(tmp_path))
        (tmp_path / "update-channel.env").write_text(
            "TRADE_UPDATE_BRANCH=from-file\n", encoding="utf-8"
        )
        monkeypatch.setenv("TRADE_UPDATE_BRANCH", "from-shell")

        upd = _reload_update()

        assert upd._UPDATE_BRANCH == "from-shell"


class TestDirtyTreeGuard:
    def test_update_refuses_dirty_tree_without_stashing(self, tmp_path, monkeypatch):
        home = tmp_path
        repo = home / "foreign-trade-assistant"
        _init_repo(repo)
        (repo / "local-work.txt").write_text("uncommitted customization", encoding="utf-8")

        upd = _reload_update()
        monkeypatch.setattr(upd, "_get_trade_home", lambda: home)
        monkeypatch.setattr(
            upd, "_sync_to_update_branch",
            lambda *a, **k: pytest.fail("工作区脏时不得开始 fetch/checkout"),
        )

        result = upd.update_trade()

        assert result["ok"] is False
        assert "working tree dirty" in result["errors"]
        assert "git stash" in " ".join(result["messages"])

    def test_allow_dirty_flag_skips_the_guard(self, tmp_path, monkeypatch):
        home = tmp_path
        repo = home / "foreign-trade-assistant"
        _init_repo(repo)
        (repo / "local-work.txt").write_text("wip", encoding="utf-8")

        monkeypatch.setenv("TRADE_UPDATE_ALLOW_DIRTY", "1")
        upd = _reload_update()
        monkeypatch.setattr(upd, "_get_trade_home", lambda: home)
        # 让流程在「解析远端」处停下，证明已经越过了脏工作区守卫
        monkeypatch.setattr(upd, "_remote_main_sha_ex", lambda _d: (None, "stop-here"))

        result = upd.update_trade()

        assert result["ok"] is False
        assert "working tree dirty" not in result["errors"]
        assert "stop-here" in result["error"]

    def test_clean_tree_is_not_blocked(self, tmp_path):
        repo = tmp_path / "foreign-trade-assistant"
        _init_repo(repo)

        upd = _reload_update()

        assert upd._working_tree_dirty(repo) is False

    def test_non_git_directory_is_not_treated_as_dirty(self, tmp_path):
        upd = _reload_update()

        assert upd._working_tree_dirty(tmp_path) is False


class TestSkillsUpdateSource:
    def test_default_mode_syncs_locally_without_network(self, monkeypatch):
        from trade.post_install import skills as skills_mod

        os.environ.pop("TRADE_SKILLS_RAW_BASE", None)
        calls: list[str] = []
        monkeypatch.setattr(skills_mod, "install_skills", lambda: calls.append("local"))

        def _no_network(*_a, **_k):
            raise AssertionError("默认模式不得访问网络")

        monkeypatch.setattr(skills_mod.urllib.request, "urlopen", _no_network)

        skills_mod.update_skills()

        assert calls == ["local"]


class TestUnpushedCommitsGuard:
    """`checkout -B` 不得把本地未推送的提交从分支上抹掉。"""

    @staticmethod
    def _commit(repo: Path, message: str) -> str:
        subprocess.run(
            ["git", "-C", str(repo), "-c", "user.name=t", "-c", "user.email=t@t",
             "commit", "--allow-empty", "-q", "-m", message],
            check=True,
        )
        return subprocess.run(
            ["git", "-C", str(repo), "rev-parse", "HEAD"],
            capture_output=True, text=True, check=True,
        ).stdout.strip()

    def test_counts_local_only_commits(self, tmp_path):
        upd = _reload_update()
        repo = tmp_path / "repo"
        _init_repo(repo)
        first = self._commit(repo, "first")
        self._commit(repo, "second")

        assert upd._unpushed_commits_count(repo, first) == 1
        head = self._commit(repo, "third")
        assert upd._unpushed_commits_count(repo, head) == 0

    def test_sync_refuses_to_rewind_unpushed_commits(self, tmp_path, monkeypatch):
        upd = _reload_update()
        repo = tmp_path / "repo"
        _init_repo(repo)

        ok = subprocess.CompletedProcess([], 0, "", "")
        monkeypatch.setattr(upd.subprocess, "run", lambda *a, **k: ok)
        monkeypatch.setattr(upd, "_unpushed_commits_count", lambda _d, _s: 2)

        with pytest.raises(upd.UnpushedLocalCommits):
            upd._sync_to_update_branch(repo, "a" * 40)

    def test_update_reports_unpushed_commits_clearly(self, tmp_path, monkeypatch):
        home = tmp_path
        repo = home / "foreign-trade-assistant"
        _init_repo(repo)  # clean tree, so the dirty guard does not fire

        upd = _reload_update()
        monkeypatch.setattr(upd, "_get_trade_home", lambda: home)
        monkeypatch.setattr(upd, "_remote_main_sha_ex", lambda _d: ("a" * 40, ""))
        monkeypatch.setattr(
            upd, "_sync_to_update_branch",
            lambda *_a, **_k: (_ for _ in ()).throw(
                upd.UnpushedLocalCommits("本地有 2 个提交未推送")
            ),
        )
        monkeypatch.setattr(
            "trade.bootstrap.check_native_architecture", lambda: True
        )

        result = upd.update_trade()

        assert result["ok"] is False
        assert result["errors"] == ["unpushed local commits"]
        assert "push" in " ".join(result["messages"]).lower()
