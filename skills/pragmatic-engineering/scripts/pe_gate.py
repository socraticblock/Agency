#!/usr/bin/env python3
"""``pe_gate`` -- make the recorded obligations of `pragmatic-engineering` mechanical.

The doctrine asks an agent to record a baseline, evidence that the change does what it claims, and a completion
record, and to keep the diff inside the scope it declared. Advice gets skipped under pressure; this refuses.

Two design rules came from adversarial review and are load-bearing:

1. **A red/green pair is not evidence that a test detects the defect.** An agent can add a stub test that fails
   because it does not exist yet and passes afterwards while fixing nothing. So a bug fix must also show the
   **reversion** phase: restore the defect and the SAME command must fail again. That is the closest a mechanical
   gate gets to a semantic oracle.
2. **Verification is class-specific.** A behaviour-preserving refactor, a documentation fix and a performance
   change have no failing-before state to show, and demanding one of them rewards inventing artificial failures.
   `baseline --change-class` records what kind of change this is, and the gate demands the evidence that kind
   actually has.

State lives under the Git directory (``<git-dir>/pe-gate``), outside the working tree, so the diff a reviewer
reads contains only your change. Where there is no version control the fallback is ``.pe-gate/`` at the
workspace root. Nothing leaves the machine; nothing is committed by this tool; no network call is made.

    baseline   --change-class CLASS --authorised PATHS [--budget files=N,lines=M] [--budget-note TEXT]
               [--input PATH]... [--timeout SECONDS]
    falsify    --label L --kind K --cmd C --phase before|after|reverted [--input PATH]...
               [--metric M --unit U --direction lower|higher --value V --tolerance T [--repeats N] [--spread S]]
    dod        --item ID (--answer TEXT | --na REASON)
    record     write the completion record from the stored artifacts
    check      the gate: exit 2 and name every unmet obligation (what a hook or CI runs)
    install-hook, status

This is an evidence-accounting tool: it records what a command did against a candidate, and refuses when the
obligations its class owes are missing or the evidence no longer describes the tree. It is NOT a semantic
oracle (a green run of a test that asserts the wrong thing still passes) and NOT a sandbox (commands run with
the caller's privileges, in the caller's environment). See references/authority-boundaries.md.

Each phase records a strictly increasing ``seq`` -- the ordering authority -- plus the wall-clock ``at`` as
metadata only, and a fingerprint of the candidate it was run against, so evidence collected against different
content is detectable as stale. A required phase that was never recorded is missing evidence and is never
replaced by a default exit code, and the recorded order must match the class's canonical order. The candidate is
re-bound after the live verification runs, because those runs execute agent-supplied commands: one that edits the
tree it is verifying cannot certify it.

Change classes and the evidence each one owes:

    bugfix          one `capability` label: before fails, after passes, reverted fails again
    new-behaviour   a `capability` label (fail -> pass) and a `rejection` label (fail -> pass)
    refactor        an `equivalence` label: before passes, after passes (behaviour preserved)
    performance     an `equivalence` label (green/green) plus a `benchmark` label carrying measurements
    security        a `rejection` label (fail -> pass): the prohibited action worked, then it did not
    docs            an `equivalence` label (green/green): the link/schema/build check

A `benchmark` label is self-reported evidence only when both phases carry the same ``--metric`` and ``--unit``,
a declared ``--direction``, a finite ``--value``, a shared positive ``--tolerance`` (smallest countable change),
at least two ``--repeats`` and a finite nonnegative ``--spread`` (range = max sample - min sample, in metric units).
A valid benchmark record is not a trusted measurement: a caller supplying ``--repeats`` does not prove a runner
executed that many repetitions. High-confidence claims require independently obtained raw samples.

Every class also owes: a recorded baseline, no change outside the authorised scope, no verification input edited
between the before and after runs, every Definition-of-done item answered, a record written after the last state
change, and a diff within budget (or a recorded reason it is not).

Exit codes: 0 all obligations met; 2 refused; 3 usage error.
"""

from __future__ import annotations

import argparse
import contextlib
import fcntl
import hashlib
import json
import math
import fnmatch
import posixpath
import os
import re
import selectors
import signal
import shlex
import stat
import subprocess
import sys
import tempfile
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import NamedTuple

STATE_DIR = ".pe-gate"
MAX_CAPTURE = 4000
MAX_OUTPUT_BYTES = 1024 * 1024  # maximum bytes emitted by one verifier (stdout and stderr combined)
CLASSES = ("bugfix", "new-behaviour", "refactor", "performance", "security", "docs")
KINDS = ("capability", "rejection", "equivalence", "benchmark")
PHASES = ("before", "after", "reverted")

DOD_ITEMS = [
    ("dod.1", "the requested outcome is satisfied and any deviation from the plain reading is stated"),
    ("dod.2", "the diff holds nothing you cannot account for, and concurrent work is intact"),
    ("dod.3", "verification ran without weakening it; failures separated into caused / demonstrated-pre-existing / unexplained"),
    ("dod.4", "the original failure was demonstrated beforehand, or that it could not be is stated"),
    ("dod.5", "failure, security, compatibility, migration and rollback concerns were considered where relevant"),
    ("dod.6", "documentation and configuration remain truthful against the diff, and the reported evidence level matches the claim"),
]

VERIFY_DIRS = ("tests", "test", "spec", "acceptance")

TIMEOUT_DEFAULT = 900        # a verification command that does not finish is inconclusive, never a pass
GIT_TIMEOUT = 120
# Git's per-repository performance/compatibility settings can conceal tracked
# mode changes and distinct case-sensitive untracked paths, or trust a stale
# fsmonitor cache. The supported audit is Linux + case-sensitive local FS.
# Use explicit config on every Git invocation, without modifying the repo.
GIT_AUDIT_ARGV = ("git", "-c", "core.filemode=true", "-c", "core.ignorecase=false",
                  "-c", "core.fsmonitor=false")
# Advisory flock locks are held by the kernel until the last inherited descriptor
# closes; there is no time-based lock stealing and no stale lock cleanup.
# This experimental implementation targets local Linux filesystem semantics only.

# A repo file the command names is treated as a verification input when its path looks like an oracle rather
# than the subject (`python3 tests/check.py` is an oracle; `python3 src/app.py` is the thing under change).
VERIFIER_NAME_RE = re.compile(
    r"(?:^|/)(?:tests?|specs?|acceptance)(?:/|$)|(?:test|spec|check|verify|assert|acceptance)", re.I)


def now() -> str:
    """Wall-clock stamp -- METADATA ONLY, never the ordering authority.

    A host clock can step backwards (WSL clock sync did exactly that during a suite run, producing
    `gate.phases-out-of-order` on an honest pair), and two phases recorded inside one second are
    indistinguishable at this resolution. Ordering is carried by the persisted `seq`.
    """
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class Result(NamedTuple):
    code: int | None          # None means command did not finish conclusively
    output: str               # bounded tail, never the complete unlimited output
    timed_out: bool = False
    spawn_error: bool = False
    output_limited: bool = False
    output_sha256: str | None = None  # full stream digest, only if fully observed
    output_bytes: int = 0


def run(cmd: str, cwd: Path, timeout: float | None = None, *, lease_fd: int | None = None) -> Result:
    """Execute an untrusted shell verifier with bounded stdout/stderr memory.

    A single combined pipe is drained incrementally; once output exceeds the
    byte budget, the process group is killed and the phase is INCONCLUSIVE.
    The pipe is never accumulated in full. Detached descendants can retain
    the pipe after the shell has exited: a bounded post-exit drain applies.

    This is NOT a sandbox or a host-enforced resource limit: detached children
    may continue independently, and the verifier has the caller's privileges.
    """
    limit = TIMEOUT_DEFAULT if timeout is None else timeout
    try:
        proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE,
                                stderr=subprocess.STDOUT, cwd=str(cwd),
                                start_new_session=True,
                                pass_fds=(lease_fd,) if lease_fd is not None else ())
    except OSError as exc:
        return Result(None, f"command could not be started: {exc}", spawn_error=True)
    assert proc.stdout is not None
    fd = proc.stdout.fileno()
    os.set_blocking(fd, False)
    tail = b""
    total = 0
    digest = hashlib.sha256()
    timed_out = False
    output_limited = False
    deadline = time.monotonic() + limit
    exited_at = None
    with selectors.DefaultSelector() as selector:
        selector.register(proc.stdout, selectors.EVENT_READ)
        try:
            while selector.get_map():
                now_clock = time.monotonic()
                if proc.poll() is not None and exited_at is None:
                    exited_at = now_clock
                if now_clock >= deadline or (exited_at is not None and now_clock - exited_at >= 1.0):
                    timed_out = True
                    break
                wait = min(0.1, deadline - now_clock)
                if exited_at is not None:
                    wait = min(wait, max(0.0, 1.0 - (now_clock - exited_at)))
                events = selector.select(wait)
                for key, _ in events:
                    try:
                        data = os.read(key.fd, 65536)
                    except BlockingIOError:
                        continue
                    if not data:
                        selector.unregister(key.fileobj)
                        break
                    total += len(data)
                    digest.update(data)
                    tail = (tail + data)[-MAX_CAPTURE:]
                    if total > MAX_OUTPUT_BYTES:
                        output_limited = True
                        break
                if output_limited:
                    break
        finally:
            if timed_out or output_limited:
                try:
                    os.killpg(proc.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
                except OSError:
                    proc.kill()
            selector.close()
            proc.stdout.close()
            try:
                proc.wait(timeout=1.0)
            except subprocess.TimeoutExpired:
                proc.kill()
                proc.wait(timeout=1.0)
    shown = tail.decode(errors="replace").strip()
    if output_limited:
        return Result(None, f"output exceeds {MAX_OUTPUT_BYTES} bytes; tail: {shown}",
                      output_limited=True, output_bytes=total)
    if timed_out:
        return Result(None, shown, timed_out=True, output_bytes=total)
    return Result(proc.returncode, shown, output_sha256=digest.hexdigest(), output_bytes=total)


def git(root: Path, args: str) -> Result:
    """Run internal Git commands as argv, never through a shell.

    Explicit file-mode auditing prevents an untrusted local core.filemode=false
    setting from suppressing unauthorized executable-bit modifications.
    """
    try:
        proc = subprocess.run([*GIT_AUDIT_ARGV, *shlex.split(args)],
                              cwd=str(root), capture_output=True, timeout=GIT_TIMEOUT)
    except (OSError, subprocess.TimeoutExpired) as exc:
        return Result(None, f"Git command unavailable: {exc}", spawn_error=True)
    return Result(proc.returncode, (proc.stdout + proc.stderr).decode(errors="replace").strip())


class WorkspaceIdentityError(ValueError):
    """The reported Git worktree does not match the checkout containing cwd."""


def _checkout_marker(start: Path) -> Path | None:
    """Find the nearest *physical* .git entry, independently of Git config.

    Normal checkouts have a `.git/` directory; linked worktrees and submodules
    have a `.git` file containing `gitdir: ...`. Walk parents so callers may
    invoke the gate from a subdirectory without silently changing workspace.
    """
    for directory in (start, *start.parents):
        marker = directory / ".git"
        if marker.is_dir() or marker.is_file():
            return directory
    return None


def _checkout_gitdir(root: Path) -> Path:
    """Resolve the checkout marker without consulting Git's worktree config."""
    marker = root / ".git"
    if marker.is_dir():
        return marker.resolve()
    if not marker.is_file():
        raise WorkspaceIdentityError(f"no .git checkout marker under {root}")
    try:
        # Git's normal linked-worktree marker is one line: gitdir: PATH.
        data = marker.read_bytes()
        if len(data) > 8192:
            raise ValueError(".git pointer exceeds the supported length")
        line = data.decode("utf-8").strip()
        if not line.startswith("gitdir: ") or "\n" in line or "\r" in line:
            raise ValueError("malformed .git gitdir pointer")
        target = Path(line[len("gitdir: "):])
        return (target if target.is_absolute() else root / target).resolve()
    except (OSError, UnicodeError, ValueError) as exc:
        raise WorkspaceIdentityError(f"cannot validate .git checkout pointer: {exc}") from exc


def workspace_root(start: Path) -> Path:
    """Bind the audit to the checkout containing cwd, never `core.worktree`.

    Git configuration can redirect `--show-toplevel` to an unrelated clean
    clone while commands execute in the original directory, yielding PASS for
    a different tree. Require both the Git worktree root and the Git directory
    to match independently discovered `.git` marker identity. This fails
    closed for unsupported marker-free or environment-redirected Git layouts.
    """
    origin = start.resolve()
    marker_root = _checkout_marker(origin)
    reported = git(origin, "rev-parse --show-toplevel")
    if marker_root is None:
        if reported.code == 0:
            raise WorkspaceIdentityError("Git reported a worktree but cwd has no enclosing .git checkout marker")
        return origin  # explicit NO-VCS workflow is handled by cmd_baseline
    if reported.code != 0 or not reported.output:
        raise WorkspaceIdentityError("a .git checkout marker exists, but Git cannot resolve its worktree")
    root = Path(reported.output).resolve()
    if root != marker_root:
        raise WorkspaceIdentityError(
            f"Git worktree {root} differs from cwd checkout {marker_root}; "
            "refusing a possibly redirected core.worktree/GIT_WORK_TREE audit")
    gitdir = git(origin, "rev-parse --absolute-git-dir")
    if gitdir.code != 0 or not gitdir.output:
        raise WorkspaceIdentityError("Git could not resolve its metadata directory")
    expected = _checkout_gitdir(marker_root)
    if Path(gitdir.output).resolve() != expected:
        raise WorkspaceIdentityError(
            f"Git metadata {Path(gitdir.output).resolve()} differs from checkout marker {expected}")
    return marker_root


def revision(root: Path) -> str:
    res = git(root, "rev-parse HEAD")
    return res.output.strip() if res.code == 0 else "NO-VCS"


def porcelain(root: Path, args: list[str] | None = None) -> tuple[int, str]:
    """Git status/diff with literal argument boundaries (no state-sourced shell code).

    Baseline revision is persisted and can be tampered with. Interpolating it
    into shell=True allowed `check` to execute commands from baseline.json.
    Never treat Git arguments read from recorded evidence as shell syntax.
    """
    argv = [*GIT_AUDIT_ARGV, *(args or ["status", "--porcelain"])]
    try:
        proc = subprocess.run(argv, capture_output=True, cwd=str(root),
                              timeout=GIT_TIMEOUT)
    except (subprocess.TimeoutExpired, OSError):
        return 1, ""
    return proc.returncode, proc.stdout.decode(errors="replace")


def phase_order(earlier: dict, later: dict) -> bool | None:
    """Is `earlier` recorded before `later`? True / False / None = cannot be established.

    The sequence number is the authority. A distinguishable pair of wall-clock stamps is a weaker fallback for
    records written before sequences existed; equal stamps establish nothing.
    """
    a, b = earlier.get("seq"), later.get("seq")
    if isinstance(a, int) and isinstance(b, int) and a != b:
        return a < b
    ta, tb = earlier.get("at"), later.get("at")
    if ta and tb and ta != tb:
        return ta < tb
    return None


def state_lock(root: Path, name: str, wait: float = 5.0):
    """Acquire an OS-managed advisory lock without unsafe expiry/unlink.

    The inode is never unlinked: removing a locked file allows split-brain
    locks on the replaced inode. File descriptors are explicitly closed by
    their callers. A process crash releases its descriptors automatically.

    The lock path is opened with O_NOFOLLOW and must resolve to a regular file.
    Following a symlink would let anything able to write the state directory
    point the lock at an inode it controls (creating a file outside the state
    directory), and swapping the path for a symlink mid-flight would let two
    writers hold locks on different inodes at once.
    """
    directory = state_dir(root)
    directory.mkdir(parents=True, exist_ok=True)
    lock = directory / name
    try:
        fd = os.open(str(lock), os.O_CREAT | os.O_RDWR | getattr(os, "O_NOFOLLOW", 0), 0o600)
    except OSError as exc:
        raise ValueError(f"lock path {lock} cannot be opened for locking: {exc}") from exc
    try:
        if not stat.S_ISREG(os.fstat(fd).st_mode):
            raise ValueError(f"lock path {lock} is not a regular file, so it is not a lock this gate will take")
        deadline = time.monotonic() + wait
        while True:
            try:
                fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
                return fd, lock
            except BlockingIOError:
                if time.monotonic() >= deadline:
                    raise TimeoutError(f"{lock} is held by another writer")
                time.sleep(min(0.025, max(0.0, deadline - time.monotonic())))
    except BaseException:
        os.close(fd)
        raise


class PhaseBusyError(ValueError):
    """A verifier for this label is already executing; no command was launched."""


@contextlib.contextmanager
def label_execution_lock(root: Path, label: str):
    """Refuse concurrent executions of ANY phase of a label before commands run.

    Acquiring this lock precedes the final duplicate-phase check. It is held
    through recording. The verifier inherits a copy of the lease descriptor,
    preserving protection when a parent is killed while its command runs.
    """
    safe_name = hashlib.sha256(label.encode("utf-8")).hexdigest()
    try:
        fd, _ = state_lock(root, f"phase-{safe_name}.lock", wait=0.0)
    except TimeoutError as exc:
        raise PhaseBusyError(f"label {label!r} has a running verification; {exc}") from exc
    try:
        yield fd
    finally:
        os.close(fd)


def next_seq(root: Path) -> int:
    """The next value of the strictly increasing evidence sequence."""
    fd, lock = state_lock(root, "seq.lock")
    try:
        state = load(root, "seq.json", {"next": 1})
        current = state.get("next") if isinstance(state, dict) else None
        if type(current) is not int or current < 1:
            raise ValueError("corrupt seq.json: refusing to reset chronology")
        number = current
        save(root, "seq.json", {"next": number + 1})
        return number
    finally:
        os.close(fd)


@contextlib.contextmanager
def evidence_lock(root: Path, name: str = "evidence.lock", wait: float = 60.0):
    """Serialize the read-modify-write of one evidence file, and RE-READ inside it.

    The sequence counter has its own lock; the evidence store needed the same one.
    Without it two agents sharing a repository each load the same `falsify.json`,
    each add their own record and each write the whole file back -- every process
    prints `ok ... recorded` and all but the last record is lost, so the gate
    reports success for evidence it erased. Callers must load their state file
    INSIDE this lock, never before it.
    """
    fd, lock = state_lock(root, name, wait)
    try:
        yield
    finally:
        os.close(fd)


KNOWN_STATE_FILES = ("baseline.json", "falsify.json", "dod.json", "record.md")


def _git_nul(root: Path, args: list[str]) -> tuple[int, list[str]]:
    """Read literal Git paths separated by NUL rather than quotePath/text lines.

    Git path values are arbitrary bytes on Unix, including newlines, quotes,
    tabs and leading dashes. Decoding with os.fsdecode preserves undecodable
    filenames via surrogateescape for subsequent filesystem operations.
    """
    try:
        proc = subprocess.run([*GIT_AUDIT_ARGV, *args], cwd=str(root), capture_output=True,
                              timeout=GIT_TIMEOUT)
    except (OSError, subprocess.TimeoutExpired):
        return 1, []
    if proc.returncode != 0:
        return proc.returncode, []
    return 0, [os.fsdecode(x) for x in proc.stdout.split(b"\0") if x]



def git_filter_visibility_problems(root: Path) -> list[str]:
    """Refuse Git content normalization that hides raw working-tree changes.

    Git status/diff compare canonicalized index bytes rather than necessarily
    comparing raw worktree bytes. A custom filter is one example, but Git's
    built-in `text`/`eol` normalization and `ident` expansion also conceal a
    literal file change after staging. Until a separate raw-byte audit exists,
    refuse tracked normalization attributes and core.autocrlf=true/input.
    The restriction can exclude Git LFS and common `* text=auto` repos.
    """
    problems: list[str] = []
    cfg = git(root, "config --get core.autocrlf")
    if cfg.code not in (0, 1):
        return ["Git core.autocrlf configuration cannot be audited"]
    if cfg.code == 0 and cfg.output.strip().lower() not in ("false", "no", "off", "0"):
        problems.append(f"core.autocrlf={cfg.output.strip()!r} can hide raw line-ending changes")
    code, tracked = _git_nul(root, ["ls-files", "-z", "--cached", "--"])
    if code != 0:
        return problems + ["cannot enumerate tracked files for Git content-conversion audit"]
    if not tracked:
        return problems
    attrs = ("filter", "text", "eol", "ident", "working-tree-encoding")
    payload = b"".join(os.fsencode(p) + b"\0" for p in tracked)
    try:
        proc = subprocess.run([*GIT_AUDIT_ARGV, "check-attr", "-z", "--stdin", *attrs],
                              cwd=str(root), input=payload, capture_output=True, timeout=GIT_TIMEOUT)
    except (OSError, subprocess.TimeoutExpired):
        return problems + ["Git content-conversion attribute audit failed"]
    if proc.returncode != 0:
        return problems + ["Git content-conversion attribute audit failed"]
    fields = proc.stdout.split(b"\0")
    if fields[-1:] == [b""]:
        fields.pop()
    if len(fields) != 3 * len(tracked) * len(attrs):
        return problems + ["Git content-conversion attribute audit returned malformed records"]
    for i in range(0, len(fields), 3):
        path, attr, value = fields[i:i+3]
        if os.fsdecode(attr) not in attrs or value not in (b"unspecified", b"unset"):
            if len(problems) < 25:
                problems.append(f"tracked path {os.fsdecode(path)!r} has active or unknown content conversion "
                                f"{os.fsdecode(attr)}={os.fsdecode(value)!r}")
    return problems


def raw_tracked_snapshot(root: Path) -> tuple[dict[str, str], list[str]]:
    """Independent worktree-byte inventory, not Git's normalized content view.

    Keys encode exact filename bytes as hex to preserve Unix surrogate-escaped
    names in JSON. Each digest includes file kind, mode and raw content. This
    does not follow Git filters, text normalization or index content hashes.
    """
    code, paths = _git_nul(root, ["ls-files", "--cached", "-z", "--"])
    if code != 0:
        return {}, ["cannot enumerate the tracked worktree for raw-byte audit"]
    if len(paths) != len(set(paths)):
        return {}, ["unmerged/duplicate Git index paths cannot be raw-audited"]
    values: dict[str, str] = {}
    errors: list[str] = []
    for rel in paths:
        key = os.fsencode(rel).hex()
        path = root / rel
        # A tracked deletion is a legitimate candidate state, not an error.
        if not path.exists() and not path.is_symlink():
            values[key] = "absent"
            continue
        if not path.resolve(strict=False).is_relative_to(root.resolve()):
            errors.append(f"tracked path {rel!r} escapes the worktree")
            continue
        digest = _hash_file(path)
        if digest is None:
            errors.append(f"tracked path {rel!r} is unreadable or not a regular file/symlink")
        else:
            values[key] = digest
    return values, errors


def raw_scope_delta(root: Path, base: dict) -> tuple[list[str], list[str]]:
    """Compare tracked filesystem bytes with the baseline, not the Git index.

    Unlike a status-based audit, this catches a clean filter, CRLF conversion,
    staged normalization, committed changes after baseline, and mode changes.
    Legacy baselines without a snapshot continue under the restricted Git
    attribute policy; they are never upgraded silently.
    """
    original = base.get("raw_tracked")
    if original is None:
        return [], []
    current, errors = raw_tracked_snapshot(root)
    if errors:
        return [], errors
    changed = []
    for key in set(original) | set(current):
        if original.get(key, "absent") != current.get(key, "absent"):
            try:
                rel = os.fsdecode(bytes.fromhex(key))
            except ValueError:
                return [], ["corrupt path key in raw tracked manifest"]
            changed.append(rel)
    return sorted(changed), []


def visibility_problems(root: Path, base: dict | None = None) -> list[str]:
    """Use byte snapshots for new baselines; restrict conversions for old ones."""
    index = git_index_visibility_problems(root)
    if base is not None and isinstance(base.get("raw_tracked"), dict):
        _, problems = raw_scope_delta(root, base)
        return index + problems
    return index + git_filter_visibility_problems(root)


def changed_paths(root: Path) -> list[str]:
    """Auditable literal paths from porcelain v1 -z, including both rename sides."""
    code, entries = _git_nul(root, ["status", "--porcelain=v1", "-z", "--untracked-files=all"])
    if code != 0:
        raise ValueError("git status --porcelain=v1 -z failed; changed paths are unknown")
    paths: set[str] = set()
    index = 0
    while index < len(entries):
        row = entries[index]
        index += 1
        if len(row) < 4 or row[2] != " ":
            # An undecodable record must not be silently ignored.
            raise ValueError("invalid Git porcelain -z status record")
        flags = row[:2]
        path = row[3:]
        if path.endswith("/"):
            path = path[:-1]
        if path:
            paths.add(path)
        if "R" in flags or "C" in flags:
            if index >= len(entries):
                raise ValueError("Git rename/copy status is missing its source path")
            origin = entries[index]
            index += 1
            paths.add(origin.rstrip("/"))
    return sorted(paths)


def git_index_visibility_problems(root: Path) -> list[str]:
    """Detect Git index hints that make status/diff an incomplete change audit.

    `--assume-unchanged` and `--skip-worktree` cause Git to omit real content
    changes from the porcelain/diff sources used by the gate. A normal tracked
    entry has the `H` prefix in `git ls-files -v -z`; assume-unchanged is
    lowercase and skip-worktree has the `S` prefix. Fail closed on any other
    prefix, including unexpected index states, rather than claiming all paths
    are visible. This deliberately refuses sparse checkouts for now.
    """
    code, entries = _git_nul(root, ["ls-files", "-v", "-z", "--"])
    if code != 0:
        return ["git ls-files -v -z could not audit tracked index flags"]
    problems = []
    for row in entries:
        if len(row) < 3 or row[1] != " ":
            return ["Git index flags contained a malformed path record"]
        if row[0] != "H":
            problems.append(f"{row[2:]!r}: Git index flag {row[0]!r} hides or complicates change detection")
    return problems


def diff_stats(root: Path) -> tuple[int, int]:
    """Count candidate paths and added lines using NUL-delimited Git output."""
    code, stats = _git_nul(root, ["diff", "--no-renames", "--numstat", "-z", "HEAD", "--"])
    if code != 0:
        raise ValueError("git diff --numstat -z failed")
    files = added = 0
    for rec in stats:
        fields = rec.split("\t", 2)
        if len(fields) != 3:
            raise ValueError("unexpected NUL-delimited Git numstat record")
        files += 1
        if fields[0].isdigit():
            added += int(fields[0])
    code, untracked = _git_nul(root, ["ls-files", "--others", "--exclude-standard", "-z", "--"])
    if code != 0:
        raise ValueError("git ls-files -z failed")
    files += len([p for p in untracked if p != STATE_DIR and not p.startswith(STATE_DIR + "/")])
    return files, added


def audited_diff_stats(root: Path, base: dict) -> tuple[int, int, int]:
    """Report all changed files while distinguishing Git-only line estimates.

    When a clean/smudge filter or EOL conversion conceals raw bytes, Git's
    numstat cannot accurately count added lines. A baseline budget explanation
    is required for those cases and the output explicitly labels the count.
    """
    files, git_added = diff_stats(root)
    visible = set(changed_paths(root))
    raw, problems = raw_scope_delta(root, base)
    if problems:
        raise ValueError(problems[0])
    concealed = set(raw) - visible
    return max(files, len(visible | set(raw))), git_added, len(concealed)


def _hash_file(path: Path) -> str | None:
    """Hash a file's observable content *and* filesystem identity.

    The original fingerprint followed symlinks and hashed target bytes only:
    a tracked symlink changed from `b` to `./b` remained indistinguishable.
    Executable-bit changes were also missing. Refuse FIFOs/devices/sockets
    rather than blocking a hashing read indefinitely, and stream regular files
    instead of loading arbitrarily large files entirely into memory.

    Concurrent uncooperative replacements are outside the local assurance
    boundary, but stat before and after reading catches common TOCTOU cases.
    """
    try:
        before = path.lstat()
        h = hashlib.sha256()
        if stat.S_ISLNK(before.st_mode):
            h.update(b"symlink\0")
            h.update(os.fsencode(os.readlink(path)))
            h.update(b"\0")
            # Bind target bytes as well as the literal link target. The caller
            # checks containment before this operation.
            target = path.stat()
            if not stat.S_ISREG(target.st_mode):
                return None
        elif stat.S_ISREG(before.st_mode):
            h.update(b"file\0")
        else:
            return None
        h.update(b"executable\0" if before.st_mode & 0o111 else b"nonexecutable\0")
        with path.open("rb") as src:
            while chunk := src.read(1024 * 1024):
                h.update(chunk)
        after = path.lstat()
        if (before.st_dev, before.st_ino, before.st_mode, before.st_size,
            before.st_mtime_ns, before.st_ctime_ns) != (after.st_dev, after.st_ino,
            after.st_mode, after.st_size, after.st_mtime_ns, after.st_ctime_ns):
            return None
        return h.hexdigest()
    except (OSError, ValueError):
        return None


def _hash_named_digest(hasher, rel: str, digest: str) -> None:
    """Hash literal filesystem name bytes (including surrogateescaped Unix names)."""
    hasher.update(os.fsencode(rel) + b"\0" + digest.encode("ascii") + b"\n")


def _command_verifiers(root: Path, cmd: str) -> set[str]:
    """Repo-relative files the command names that look like ORACLES rather than the subject.

    `python3 tests/check.py` uses an oracle; `python3 src/app.py` runs the thing under change. A root-level
    `check.py` used to be invisible to the digest entirely -- demonstrably, all three phases of a real bug fix
    recorded `tests_digest=none:0` while that file was the whole verification. Anything the heuristic misses
    can be declared with `--input`.
    """
    found: set[str] = set()
    for token in re.findall(r"[^\s\"'|;&()<>]+", cmd or ""):
        candidate = token.strip().lstrip("./")
        if not candidate or candidate.startswith("-"):
            continue
        path = root / candidate
        if path.is_file() and VERIFIER_NAME_RE.search(candidate):
            found.add(path.relative_to(root).as_posix())
    return found


def verification_inputs(root: Path, cmd: str, declared: list[str]) -> tuple[str, list[str]]:
    """Digest of the files verification depends on, plus the declared inputs that could not be read.

    The set is the repository's test directories, the oracle-looking files the command names, and explicitly
    declared `--input` paths. A declared input that is missing or unreadable is reported as a problem and the
    caller refuses -- an unreadable input must never degrade into a quietly smaller input set.
    """
    problems: list[str] = []
    rels: set[str] = set()
    for name in VERIFY_DIRS:
        base = root / name
        if base.is_dir():
            rels.update(p.relative_to(root).as_posix() for p in base.rglob("*") if p.is_file())
    rels |= _command_verifiers(root, cmd)
    for entry in declared:
        try:
            rel = normalize_input(root, entry)
        except ValueError as exc:
            problems.append(f"declared verification input {entry!r}: {exc}")
            continue
        path = root / rel
        if path.is_dir():
            rels.update(p.relative_to(root).as_posix() for p in path.rglob("*") if p.is_file())
        elif path.is_file():
            rels.add(rel)
        else:
            problems.append(f"declared verification input {rel!r} does not exist")
    h = hashlib.sha256()
    count = 0
    for rel in sorted(rels):
        if not (root / rel).resolve(strict=False).is_relative_to(root.resolve()):
            problems.append(f"verification input {rel!r} escapes the workspace")
            _hash_named_digest(h, rel, "outside-root")
            count += 1
            continue
        digest = _hash_file(root / rel)
        if digest is None:
            problems.append(f"verification input {rel!r} could not be read")
            _hash_named_digest(h, rel, "unreadable")
        else:
            _hash_named_digest(h, rel, digest)
        count += 1
    return (f"{h.hexdigest()}:{count}" if count else "none:0"), problems


def candidate_fingerprint(root: Path, scope: list[str], declared: list[str]) -> tuple[str, list[str]]:
    """Content identity of the candidate the evidence describes.

    HEAD alone cannot identify an uncommitted candidate: in a real bug fix all three phases recorded the SAME
    commit, so the revision field distinguished nothing. This covers tracked modifications (staged and
    unstaged), untracked files inside the authorised scope, and declared inputs, by content hash.

    A tree the gate cannot inspect is an error, never an empty set.
    """
    problems: list[str] = []
    rels: set[str] = set()
    code, changed = _git_nul(root, ["diff", "--no-renames", "--name-only", "-z", "HEAD", "--"])
    if code != 0:
        return "", ["`git diff --name-only -z` could not be read, so the candidate is unknown"]
    rels.update(changed)
    current_base = load(root, "baseline.json", None)
    if isinstance(current_base, dict) and "raw_tracked" in current_base:
        raw_changed, raw_errors = raw_scope_delta(root, current_base)
        if raw_errors:
            return "", raw_errors
        rels.update(raw_changed)
    code, untracked = _git_nul(root, ["ls-files", "--others", "--exclude-standard", "-z", "--"])
    if code != 0:
        return "", ["`git ls-files -z --others` could not be read, so the candidate is unknown"]
    rels.update(p for p in untracked if any(covers(e, p) for e in scope))
    rels.update(str(e).strip().lstrip("./") for e in declared if str(e).strip())
    h = hashlib.sha256()
    count = 0
    for rel in sorted(r for r in rels if r and r != STATE_DIR and not r.startswith(STATE_DIR + "/")):
        path = root / rel
        if not path.resolve(strict=False).is_relative_to(root.resolve()):
            problems.append(f"candidate file {rel!r} escapes the workspace")
            continue
        if path.is_dir():
            continue
        digest = _hash_file(path)
        if digest is None:
            if path.exists() or path.is_symlink():
                problems.append(f"candidate file {rel!r} exists but could not be read")
                _hash_named_digest(h, rel, "unreadable")
            else:
                _hash_named_digest(h, rel, "absent")   # a deletion is part of the candidate
        else:
            _hash_named_digest(h, rel, digest)
        count += 1
    return (f"{h.hexdigest()}:{count}" if count else "none:0"), problems


def state_dir(root: Path) -> Path:
    """Where the gate keeps its record. OUTSIDE the working tree, on purpose.

    The first version wrote `.pe-gate/` into the repository, which showed up in `git status` and forced the agent
    to edit `.gitignore` — residue that an independent judge then counted against the change it was meant to
    support. Git already owns a directory nothing else sees, so the record lives there, and the working tree stays
    exactly as the task left it. `git rev-parse --git-dir` is used rather than a literal `.git` because a linked
    worktree's `.git` is a file.
    """
    res = git(root, "rev-parse --absolute-git-dir")
    if res.code == 0 and res.output.strip():
        return Path(res.output.strip()) / "pe-gate"
    return root / STATE_DIR


def state_path(root: Path, name: str) -> Path:
    return state_dir(root) / name


def load(root: Path, name: str, default, expect: type = dict):
    """Load a state file, returning a WRONG-SHAPE marker rather than handing a list to `.items()`."""
    p = state_path(root, name)
    if not p.is_file():
        return default
    try:
        payload = json.loads(p.read_text(encoding="utf-8"), parse_constant=lambda c: (_ for _ in ()).throw(ValueError(f"nonfinite JSON constant {c}")))
    except (ValueError, OSError):
        return {"__unreadable__": f"{name} is not valid JSON"}
    if expect is not None and not isinstance(payload, expect):
        return {"__unreadable__": f"{name} is a {type(payload).__name__}, expected {expect.__name__}"}
    return payload


def atomic_state_write(root: Path, name: str, blob: bytes) -> None:
    """Durably publish bytes by replacing, never truncating, a live state file.

    A crash before the replace leaves the prior document untouched. Callers
    modifying shared state must hold the evidence lock through the transaction.
    """
    directory = state_dir(root)
    directory.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix=f".{name}.", suffix=".tmp", dir=directory)
    try:
        with os.fdopen(fd, "wb") as output:
            output.write(blob)
            output.flush()
            os.fsync(output.fileno())
        os.replace(tmp, state_path(root, name))
        dirfd = os.open(str(directory), os.O_RDONLY | getattr(os, "O_DIRECTORY", 0))
        try:
            os.fsync(dirfd)
        finally:
            os.close(dirfd)
    finally:
        Path(tmp).unlink(missing_ok=True)


def save(root: Path, name: str, payload) -> None:
    atomic_state_write(root, name, json.dumps(payload, indent=2, sort_keys=True,
                                              allow_nan=False).encode("utf-8"))


def normalize_scope(entry: str) -> str:
    """Reject root-wide scope aliases and path escapes (both CLI and persisted-state).

    A literal directory is a recursive prefix. A glob must have a *literal,
    non-root* directory prefix; wildcard components in the prefix are refused.
    """
    if not isinstance(entry, str) or not entry or entry != entry.strip():
        raise ValueError("scope must be a nonblank path without surrounding whitespace")
    if any(ord(c) < 32 or ord(c) == 127 for c in entry) or "\\" in entry:
        raise ValueError("scope contains control characters or unsupported path separators")
    if entry.startswith("/") or re.match(r"^[A-Za-z]:", entry):
        raise ValueError("scope cannot be an absolute path")
    # Reject any traversal, rather than allowing normalization to hide a parent hop.
    raw_parts = entry.split("/")
    if any(c == ".." or c == "" for c in raw_parts):
        raise ValueError("scope contains a parent hop or empty path component")
    while raw_parts and raw_parts[0] == ".":
        raw_parts.pop(0)
    if not raw_parts or any(c == "." for c in raw_parts):
        raise ValueError("scope is the repository root or contains a dot component")
    canonical = "/".join(raw_parts)
    if canonical in ("*", "**", "?", "?*"):
        raise ValueError("scope is a blanket wildcard")
    if any(c in "*?[]" for c in canonical):
        if len(raw_parts) < 2 or any(any(ch in c for ch in "*?[]") for c in raw_parts[:-1]):
            raise ValueError("a scope glob needs a literal, non-root directory prefix")
        if raw_parts[-1] in (".", ".."):
            raise ValueError("invalid glob tail")
    return canonical


def covers(entry: str, path: str) -> bool:
    try:
        entry = normalize_scope(entry)
        path = normalize_scope(path)
    except ValueError:
        return False
    if entry == path or (not any(c in "*?[]" for c in entry) and path.startswith(entry + "/")):
        return True
    if any(c in "*?[]" for c in entry):
        return fnmatch.fnmatchcase(path, entry)
    return False


def _scope_list(value, field: str, *, required: bool = False) -> list[str]:
    if not isinstance(value, list) or (required and not value):
        raise ValueError(f"{field} must be a {'nonempty ' if required else ''}list")
    result = [normalize_scope(v) for v in value]
    if len(set(result)) != len(result):
        raise ValueError(f"{field} has duplicate paths")
    return result


def normalize_input(root: Path, entry: str) -> str:
    """Allow only existing or planned in-repository relative file/dir inputs."""
    if not isinstance(entry, str) or not entry or entry != entry.strip():
        raise ValueError("input path must be a nonblank string")
    if entry.startswith("/") or re.match(r"^[A-Za-z]:", entry) or "\\" in entry:
        raise ValueError("input path cannot be absolute or use alternate separators")
    parts = entry.split("/")
    if ".." in parts or any(not x for x in parts):
        raise ValueError("input path has a traversal or empty component")
    parts = [p for p in parts if p != "."]
    if not parts or any(any(c in p for c in "*?[]") for p in parts):
        raise ValueError("input path must be a concrete in-repository path")
    rel = "/".join(parts)
    candidate = (root / rel).resolve(strict=False)
    if not candidate.is_relative_to(root.resolve()):
        raise ValueError("input path escapes repository root through a symlink")
    return rel


def _state_fail(error: str) -> list[tuple[str, str]]:
    return [("gate.state-invalid", error)]


def _valid_number(v) -> bool:
    return type(v) in (int, float) and math.isfinite(v)


def validate_measure(m: dict) -> None:
    if not isinstance(m, dict) or set(m) != set(MEASURE_KEYS):
        raise ValueError("benchmark requires all metric/unit/direction/value/tolerance/repeats/spread fields")
    if not all(isinstance(m[k], str) and m[k].strip() for k in ("metric", "unit")):
        raise ValueError("benchmark metric and unit must be nonempty strings")
    if m["direction"] not in ("lower", "higher"):
        raise ValueError("benchmark direction must be lower or higher")
    for k in ("value", "tolerance", "spread"):
        if not _valid_number(m[k]):
            raise ValueError(f"benchmark {k} must be a finite number")
    if m["tolerance"] <= 0 or m["spread"] < 0:
        raise ValueError("benchmark tolerance must be positive and spread nonnegative")
    if type(m["repeats"]) is not int or m["repeats"] < 2:
        raise ValueError("benchmark repeat count must be integer >= 2")


def _validate_run_record(label: str, phase: str, r: dict, kind: str) -> int:
    """Validate active and superseded phase records with identical obligations.

    Superseded records are an audit trail, not a proof of authority. If a stored
    historic observation has an invalid shape or sequence, the claim that the
    history was preserved cannot be accepted as valid state.
    """
    if not isinstance(r, dict):
        raise ValueError(f"falsify {label}/{phase}: malformed record")
    if type(r.get("seq")) is not int or r["seq"] <= 0:
        raise ValueError(f"falsify {label}/{phase}: invalid sequence")
    if type(r.get("timed_out")) is not bool or type(r.get("spawn_error")) is not bool:
        raise ValueError(f"falsify {label}/{phase}: invalid outcome flags")
    if r.get("exit") is not None and type(r["exit"]) is not int:
        raise ValueError(f"falsify {label}/{phase}: invalid exit")
    if "output_limited" in r and type(r["output_limited"]) is not bool:
        raise ValueError(f"falsify {label}/{phase}: invalid output_limited flag")
    if r.get("exit") is None and not (r["timed_out"] or r["spawn_error"] or r.get("output_limited", False)):
        raise ValueError(f"falsify {label}/{phase}: missing outcome")
    if not _valid_number(r.get("timeout")) or r["timeout"] <= 0:
        raise ValueError(f"falsify {label}/{phase}: invalid timeout")
    if any(not isinstance(r.get(k), str) or not r[k] for k in ("candidate", "tests_digest", "revision", "at")):
        raise ValueError(f"falsify {label}/{phase}: missing identity field")
    if not isinstance(r.get("candidate_problems"), list) or not isinstance(r.get("input_problems"), list):
        raise ValueError(f"falsify {label}/{phase}: invalid problem list")
    if "output_sha256" in r and (r["output_sha256"] is not None and (
            not isinstance(r["output_sha256"], str) or not re.fullmatch(r"[0-9a-f]{64}", r["output_sha256"]))):
        raise ValueError(f"falsify {label}/{phase}: invalid output digest")
    if "output_bytes" in r and (type(r["output_bytes"]) is not int or r["output_bytes"] < 0):
        raise ValueError(f"falsify {label}/{phase}: invalid byte count")
    if "measure" in r:
        validate_measure(r["measure"])
    elif kind == "benchmark":
        raise ValueError(f"falsify {label}/{phase}: benchmark metadata missing")
    return r["seq"]


def validate_state(root: Path, *, baseline=True, falsify=True, dod=True, seq=True) -> list[tuple[str, str]]:
    """Closed-world shape/field checks before evaluating or executing stored evidence."""
    try:
        if baseline:
            b = load(root, "baseline.json", None)
            if b is None:
                raise ValueError("baseline.json is missing")
            if not isinstance(b, dict) or "__unreadable__" in b:
                raise ValueError(f"baseline.json: {b.get('__unreadable__', 'invalid object') if isinstance(b,dict) else 'invalid type'}")
            required = ("root", "revision", "change_class", "authorised", "budget", "timeout", "inputs")
            if any(k not in b for k in required):
                raise ValueError("baseline.json missing required fields")
            if not isinstance(b["root"], str) or b["root"] != str(root) or not isinstance(b["revision"], str):
                raise ValueError("baseline root/revision is invalid")
            if b["revision"] != "NO-VCS" and not re.fullmatch(r"[0-9a-f]{40}|[0-9a-f]{64}", b["revision"]):
                raise ValueError("baseline revision must be a full Git object identifier")
            if b["change_class"] not in CLASSES:
                raise ValueError("baseline has unknown change class")
            _scope_list(b["authorised"], "authorised", required=True)
            _scope_list(b.get("exceptions", []), "exceptions")
            if not isinstance(b["budget"], dict) or set(b["budget"]) != {"files", "lines"}:
                raise ValueError("baseline budget has invalid shape")
            if any(type(b["budget"][k]) is not int or b["budget"][k] < 0 for k in ("files", "lines")):
                raise ValueError("baseline budget requires nonnegative integers")
            if not _valid_number(b["timeout"]) or b["timeout"] <= 0:
                raise ValueError("baseline timeout must be positive finite")
            if "raw_tracked" in b:
                raw = b["raw_tracked"]
                if (b.get("raw_audit_version") != 1 or not isinstance(raw, dict)
                        or any(not isinstance(key, str) or not re.fullmatch(r"(?:[0-9a-f]{2})+", key)
                               or not isinstance(value, str) or
                               (value != "absent" and not re.fullmatch(r"[0-9a-f]{64}", value))
                               for key, value in raw.items())):
                    raise ValueError("baseline raw tracked inventory is malformed")
            elif "raw_audit_version" in b:
                raise ValueError("baseline raw audit version has no manifest")
            if not isinstance(b["inputs"], list):
                raise ValueError("baseline inputs must be a list")
            for v in b["inputs"]:
                normalize_input(root, v)
        if falsify:
            f = load(root, "falsify.json", {})
            if not isinstance(f, dict) or "__unreadable__" in f:
                raise ValueError("falsify.json invalid JSON or wrong shape")
            all_seq = []
            for label, item in f.items():
                if not isinstance(label, str) or not label.strip() or not isinstance(item, dict):
                    raise ValueError("falsify label/entry invalid")
                if item.get("kind") not in KINDS or not isinstance(item.get("cmd"), str) or not item["cmd"].strip():
                    raise ValueError(f"falsify {label}: kind or command invalid")
                inputs = item.get("inputs", [])
                if not isinstance(inputs, list):
                    raise ValueError(f"falsify {label}: inputs invalid")
                for v in inputs:
                    normalize_input(root, v)
                runs = item.get("runs")
                if not isinstance(runs, dict) or any(key not in PHASES for key in runs):
                    raise ValueError(f"falsify {label}: unknown phase or malformed runs")
                for phase, r in runs.items():
                    all_seq.append(_validate_run_record(label, phase, r, item["kind"]))
                history = item.get("superseded", [])
                if not isinstance(history, list):
                    raise ValueError(f"falsify {label}: superseded history must be a list")
                historic_seq_by_phase: dict[str, int] = {}
                for historic in history:
                    if (not isinstance(historic, dict) or set(historic) != {"phase", "at", "replaced"}
                            or historic["phase"] not in PHASES or not isinstance(historic["at"], str)
                            or not historic["at"]):
                        raise ValueError(f"falsify {label}: malformed superseded history item")
                    phase = historic["phase"]
                    if phase not in runs:
                        raise ValueError(f"falsify {label}: superseded {phase} has no active successor")
                    prior_seq = _validate_run_record(label, phase, historic["replaced"], item["kind"])
                    if (prior_seq >= runs[phase]["seq"]
                            or (phase in historic_seq_by_phase and prior_seq <= historic_seq_by_phase[phase])):
                        raise ValueError(f"falsify {label}/{phase}: superseded records are out of order")
                    historic_seq_by_phase[phase] = prior_seq
                    all_seq.append(prior_seq)
            if len(all_seq) != len(set(all_seq)):
                raise ValueError("falsify has duplicate sequence values")
        if dod:
            d = load(root, "dod.json", {})
            if not isinstance(d, dict) or "__unreadable__" in d:
                raise ValueError("dod.json invalid JSON or wrong shape")
            valid = {k for k, _ in DOD_ITEMS}
            for k, v in d.items():
                if k not in valid or not isinstance(v, dict) or len(v) != 1:
                    raise ValueError(f"dod entry {k} has unknown key or malformed shape")
                key, value = next(iter(v.items()))
                if key not in ("answer", "na") or not isinstance(value, str) or not value.strip():
                    raise ValueError(f"dod entry {k} missing meaningful response")
        if seq:
            q = load(root, "seq.json", {"next": 1})
            if not isinstance(q, dict) or set(q) != {"next"} or type(q["next"]) is not int or q["next"] < 1:
                raise ValueError("seq.json invalid or corrupted")
            if falsify and all_seq and q["next"] <= max(all_seq):
                raise ValueError("seq.json does not advance beyond existing evidence (including superseded records)")
    except (ValueError, TypeError, KeyError) as e:
        return _state_fail(str(e))
    return []

def state_digest(root: Path) -> str:
    payload = json.dumps([load(root, "baseline.json", None), load(root, "falsify.json", {}),
                          load(root, "dod.json", {})], sort_keys=True)
    return hashlib.sha256(payload.encode()).hexdigest()


def parse_budget(text: str) -> dict:
    budget = {"files": 6, "lines": 250}
    if not text:
        return budget
    seen = set()
    for part in text.split(","):
        if part.count("=") != 1:
            raise ValueError("budget must be files=N,lines=M")
        k, v = (a.strip() for a in part.split("=", 1))
        if k not in budget or k in seen or not re.fullmatch(r"[0-9]+", v):
            raise ValueError(f"invalid/duplicate budget value {part!r}")
        budget[k] = int(v)
        seen.add(k)
    return budget


# --------------------------------------------------------------------------- commands


def cmd_baseline(args) -> int:
    root = workspace_root(Path.cwd())
    def commit_baseline(payload: dict) -> None:
        with evidence_lock(root):
            save(root, "baseline.json", payload)
    # The baseline status must use the same hardened Git visibility rules as
    # `check`; otherwise it can wrongly report an already-masked tree as clean.
    res = git(root, "status --short")
    code, status = res.code, res.output
    try:
        authorised = _scope_list([p.strip() for p in args.authorised.split(",") if p.strip()],
                                 "authorised", required=True)
    except ValueError as exc:
        if "nonempty list" in str(exc):
            print("USAGE  gate.scope-unspecified: name the files or directories this task authorises", file=sys.stderr)
            return 3
        error_id = "gate.scope-blanket" if "blanket" in str(exc) or "repository root" in str(exc) else "gate.scope-invalid"
        print(f"REFUSED  {error_id}: {exc}", file=sys.stderr)
        return 2
    try:
        budget = parse_budget(args.budget)
    except ValueError as exc:
        print(f"REFUSED  gate.budget-invalid: {exc}", file=sys.stderr)
        return 2
    if args.timeout < 0:
        print("REFUSED  gate.timeout-invalid: timeout must not be negative", file=sys.stderr)
        return 2
    if code != 0:
        if not args.no_vcs_claim:
            print("REFUSED  gate.no-vcs: this workspace is not under version control. The baseline obligation is then "
                  "a claim with the check that showed it — record it with --no-vcs-claim \"<the check that showed "
                  "it>\", which stores the claim and marks the run unverifiable at E1", file=sys.stderr)
            return 2
        commit_baseline({
            "root": str(root), "at": now(), "revision": "NO-VCS", "status_short": "",
            "authorised": authorised,
            "change_class": args.change_class, "budget": budget,
            "budget_note": args.budget_note or "", "note": args.note or "",
            "no_vcs_claim": args.no_vcs_claim, "timeout": args.timeout or TIMEOUT_DEFAULT,
            "inputs": [p.strip() for p in (args.input or []) if p.strip()],
        })
        print(f"ok  gate.baseline-recorded-unverifiable: class={args.change_class} no-vcs claim={args.no_vcs_claim!r}")
        print("note: without version control the gate cannot check scope or revision; the record says so")
        return 0
    if args.change_class not in CLASSES:
        print(f"USAGE  --change-class must be one of {', '.join(CLASSES)}", file=sys.stderr)
        return 3
    if args.no_vcs_claim and code == 0:
        print("REFUSED  gate.no-vcs-claim-in-repository: this workspace IS under version control, so a "
              "no-version-control claim is false; record a real baseline instead", file=sys.stderr)
        return 2
    try:
        declared = [normalize_input(root, p) for p in (args.input or [])]
    except ValueError as exc:
        print(f"REFUSED  gate.input-invalid: {exc}", file=sys.stderr)
        return 2
    for entry in declared:
        path = root / entry
        if not path.exists():
            print(f"REFUSED  gate.input-missing: declared verification input {entry!r} does not exist; the digest "
                  f"would otherwise silently cover less than the verification depends on", file=sys.stderr)
            return 2
        if path.is_file() and _hash_file(path) is None:
            print(f"REFUSED  gate.input-unreadable: declared verification input {entry!r} exists but cannot be "
                  f"read, so its content cannot be bound to the evidence", file=sys.stderr)
            return 2
    # Capture a raw-byte inventory before any verifier runs. This is the
    # independent reference for tracked changes Git may normalize away.
    raw_tracked, raw_errors = raw_tracked_snapshot(root)
    if raw_errors:
        print(f"REFUSED  gate.raw-audit-unavailable: {raw_errors[0]}", file=sys.stderr)
        return 2
    timeout = args.timeout or TIMEOUT_DEFAULT
    commit_baseline({
        "root": str(root), "at": now(), "revision": revision(root), "status_short": status,
        "authorised": authorised, "change_class": args.change_class,
        "budget": budget, "budget_note": args.budget_note or "",
        "note": args.note or "", "timeout": timeout, "inputs": declared,
        "raw_tracked": raw_tracked, "raw_audit_version": 1,
    })
    print(f"ok  gate.baseline-recorded: class={args.change_class} revision={revision(root)[:12]} "
          f"authorised={len(authorised)} entr(y|ies) budget={budget} timeout={timeout}s "
          f"declared_inputs={len(declared)}")
    print(f"--- git status --short as recorded ---\n{status or '(clean)'}")
    print(f"note: the record lives in {state_dir(root)} — outside the working tree, so the diff the reviewer "
          f"reads contains only your change")
    return 0


MEASURE_KEYS = ("metric", "unit", "direction", "value", "tolerance", "repeats", "spread")


def cmd_falsify(args) -> int:
    root = workspace_root(Path.cwd())
    base = load(root, "baseline.json", None)
    if base is None:
        print("REFUSED  gate.baseline-missing: record the baseline before a verification run", file=sys.stderr)
        return 2
    if not args.label.strip() or not args.cmd.strip():
        print("REFUSED  gate.evidence-label-invalid: label and command cannot be blank", file=sys.stderr)
        return 2
    invalid = validate_state(root)
    if invalid:
        print(f"REFUSED  {invalid[0][0]}: {invalid[0][1]}", file=sys.stderr)
        return 2
    timeout = args.timeout or base.get("timeout") or TIMEOUT_DEFAULT
    if not _valid_number(timeout) or timeout <= 0:
        print("REFUSED  gate.timeout-invalid", file=sys.stderr)
        return 2
    # Fail early on incomplete or malicious benchmark input: do not execute an unvalidated command.
    measure_preview = {k: getattr(args, k, None) for k in MEASURE_KEYS
                       if getattr(args, k, None) is not None}
    if args.kind == "benchmark":
        try:
            validate_measure(measure_preview)
        except ValueError as exc:
            print(f"REFUSED  gate.benchmark-invalid: {exc}", file=sys.stderr)
            return 2
    for extra in (args.input or []):
        try:
            rel = normalize_input(root, extra)
            if not (root / rel).exists():
                raise ValueError(f"declared verification input {rel!r} is missing")
        except ValueError as exc:
            print(f"REFUSED  gate.input-invalid: {exc}", file=sys.stderr)
            return 2
    with label_execution_lock(root, args.label) as phase_fd:
        invalid = validate_state(root)
        if invalid:
            print(f"REFUSED  {invalid[0][0]}: {invalid[0][1]}", file=sys.stderr)
            return 2
        fals = load(root, "falsify.json", {})
        old_entry = fals.get(args.label, {}) if isinstance(fals, dict) else {}
        if old_entry and (old_entry.get("cmd") != args.cmd or old_entry.get("kind") != args.kind):
            print(f"REFUSED  gate.recorded-label-mismatch: {args.label!r} changed command/kind", file=sys.stderr)
            return 2
        recorded_phase = old_entry.get("runs", {}).get(args.phase)
        if recorded_phase is not None and not args.replace_phase:
            print(f"REFUSED  gate.phase-already-recorded: {args.label!r} already has a recorded {args.phase} phase "
                  f"(seq {recorded_phase.get('seq')}); re-recording it replaces that evidence, so it is refused. "
                  f"Pass --replace-phase to supersede it deliberately (the replaced record is kept under `superseded`).",
                  file=sys.stderr)
            return 2
        # A lock conflict/known duplicate has priority over static scope
        # diagnostics; neither branch launches the verification command.
        # Duplicate-phase refusal takes precedence over a previously executed
        # command's external effects. Still refuse other known unsafe scope
        # conditions before starting any new command.
        raw_changed, raw_problems = raw_scope_delta(root, base)
        if raw_problems:
            print(f"REFUSED  gate.raw-audit-unavailable: {raw_problems[0]}", file=sys.stderr)
            return 2
        scope = list(base.get("authorised") or []) + list(base.get("exceptions") or [])
        if base.get("revision") != "NO-VCS":
            try:
                audited_paths = sorted(set(raw_changed) | set(changed_paths(root)))
            except ValueError as exc:
                print(f"REFUSED  gate.audit-failed: {exc}", file=sys.stderr)
                return 2
            for path in audited_paths:
                if not any(covers(rule, path) for rule in scope):
                    print(f"REFUSED  gate.scope-outside-authority: file {path!r} changed", file=sys.stderr)
                    return 2
        visibility = visibility_problems(root, base)
        if visibility:
            print(f"REFUSED  gate.git-audit-unverifiable: {visibility[0]}", file=sys.stderr)
            return 2
        result = run(args.cmd, root, timeout, lease_fd=phase_fd)
        # A verifier can itself edit .git/config. Rebind to the invocation
        # checkout before publishing an observation, not only on entry.
        try:
            if workspace_root(Path.cwd()) != root:
                raise WorkspaceIdentityError("verification changed the selected Git checkout")
        except WorkspaceIdentityError as exc:
            print(f"REFUSED  gate.workspace-identity-during-verifier: {exc}", file=sys.stderr)
            return 2
        post_visibility = visibility_problems(root, base)
        if post_visibility:
            print(f"REFUSED  gate.git-audit-changed-during-verifier: {post_visibility[0]}", file=sys.stderr)
            return 2
        # From here to the save, the evidence store is read and written under one lock. A load
        # taken before the lock describes a file another writer may already have replaced, and
        # saving that copy back is what silently discarded their record.
        with evidence_lock(root):
            invalid = validate_state(root)
            if invalid:
                print(f"REFUSED  {invalid[0][0]}: {invalid[0][1]}", file=sys.stderr)
                return 2
            if load(root, "baseline.json", None) != base:
                print("REFUSED  gate.baseline-changed-during-run: the baseline was modified while the verifier ran", file=sys.stderr)
                return 2
            fals = load(root, "falsify.json", {})
            if "__unreadable__" in fals:
                print(f"REFUSED  gate.state-unreadable: {fals['__unreadable__']}", file=sys.stderr)
                return 2
            entry = fals.setdefault(args.label, {"cmd": args.cmd, "kind": args.kind, "runs": {}, "inputs": []})
            if entry.get("kind") != args.kind:
                print(f"REFUSED  gate.kind-changed: label {args.label!r} changed evidence kind", file=sys.stderr)
                return 2
            if entry.get("cmd") != args.cmd:
                print(f"REFUSED  gate.command-changed: label {args.label!r} was first run as {entry['cmd']!r}; the "
                      f"identical command must be used in every phase", file=sys.stderr)
                return 2
            previous = entry["runs"].get(args.phase)
            if previous and not args.replace_phase:
                print(f"REFUSED  gate.phase-already-recorded: {args.label!r} {args.phase} was recorded while this run "
                      f"was executing (seq {previous.get('seq')}); pass --replace-phase to supersede it deliberately",
                      file=sys.stderr)
                return 2
            declared = [str(p) for p in (base.get("inputs") or [])]
            for extra in (args.input or []):
                if extra not in declared:
                    declared.append(extra)
                if extra not in entry["inputs"]:
                    entry["inputs"].append(extra)
            digest, problems = verification_inputs(root, args.cmd, declared)
            scope = list(base.get("authorised") or []) + list(base.get("exceptions") or [])
            candidate, candidate_problems = candidate_fingerprint(root, scope, declared)
            measure = {}
            for key in MEASURE_KEYS:
                value = getattr(args, key, None)
                if value is not None:
                    measure[key] = value
            record = {
                "exit": result.code, "timed_out": result.timed_out,
                "output_limited": result.output_limited,
                "spawn_error": result.spawn_error, "timeout": timeout,
                "revision": revision(root), "at": now(), "seq": next_seq(root),
                "tests_digest": digest, "input_problems": problems,
                "candidate": candidate, "candidate_problems": candidate_problems,
                "output_tail": result.output[-MAX_CAPTURE:],
                "output_sha256": result.output_sha256,
                "output_bytes": result.output_bytes,
            }
            if measure:
                record["measure"] = measure
            if previous:
                entry.setdefault("superseded", []).append({"phase": args.phase, "at": now(), "replaced": previous})
            entry["runs"][args.phase] = record
            save(root, "falsify.json", fals)
        shown = "timeout" if result.timed_out else "output-limit" if result.output_limited else str(result.code)
        print(f"ok  gate.falsify-{args.phase}-recorded: label={args.label} kind={entry['kind']} exit={shown} "
              f"seq={record['seq']} revision={record['revision'][:12]} "
              f"inputs={digest[:16]} candidate={candidate[:16] or '(unknown)'}")
        if result.output_limited:
            print("note: verifier exceeded bounded output budget; phase is inconclusive, not a detected failure")
        if result.spawn_error:
            print(f"note: the command did not run ({result.output[:120]}) — that is an inconclusive phase, not a failure")
        return 0


def cmd_dod(args) -> int:
    root = workspace_root(Path.cwd())
    known = dict(DOD_ITEMS)
    if args.item not in known:
        print(f"USAGE  unknown item {args.item!r}; expected one of {', '.join(known)}", file=sys.stderr)
        return 3
    if bool(args.answer) == bool(args.na):
        print("USAGE  give exactly one of --answer TEXT or --na REASON", file=sys.stderr)
        return 3
    invalid = validate_state(root)
    if invalid:
        print(f"REFUSED  {invalid[0][0]}: {invalid[0][1]}", file=sys.stderr)
        return 2
    # The dod answers are one evidence file with several writers, so the read and the
    # write happen under the evidence lock: answering item 3 must not erase item 4.
    with evidence_lock(root):
        dod = load(root, "dod.json", {})
        dod[args.item] = {"answer": args.answer} if args.answer else {"na": args.na}
        save(root, "dod.json", dod)
    print(f"ok  gate.dod-recorded: {args.item}")
    return 0


def cmd_record(args) -> int:
    root = workspace_root(Path.cwd())
    invalid = validate_state(root)
    if invalid:
        print(f"REFUSED  {invalid[0][0]}: {invalid[0][1]}", file=sys.stderr)
        return 2
    base = load(root, "baseline.json", None)
    fals = load(root, "falsify.json", {})
    dod = load(root, "dod.json", {})
    files, added, concealed = audited_diff_stats(root, base)
    lines = ["# Completion record (generated by pe_gate.py)", "",
             f"- change class: {base['change_class'] if base else 'MISSING'}",
             f"- baseline revision: {base['revision'] if base else 'MISSING'}",
             f"- workspace root: {base['root'] if base else 'MISSING'}",
             f"- authorised scope: {', '.join(base['authorised']) if base else 'MISSING'}",
             f"- diff: {files} file(s), {added} Git-visible added line(s)"
             + (f"; {concealed} raw-changed file(s) invisible to Git diff (line count not measurable)" if concealed else "")
             + (f" — budget justification: {base.get('budget_note')}" if base and base.get("budget_note") else ""),
             "", "## Evidence", ""]
    if not fals:
        lines += ["- none recorded: every claim below is unverified for want of a run", ""]
    for label, entry in sorted(fals.items()):
        for phase in PHASES:
            r = entry.get("runs", {}).get(phase)
            if r:
                lines.append(f"- {label} [{entry['kind']}/{phase}]: `{entry['cmd']}` -> exit {r['exit']} on "
                             f"{r['revision'][:12]} (tests_digest {r['tests_digest'][:16]})")
    lines += ["", "## Definition of done", ""]
    for item, text in DOD_ITEMS:
        rec = dod.get(item)
        if not rec:
            lines.append(f"- {item}: UNANSWERED — {text}")
        elif "na" in rec:
            lines.append(f"- {item}: not applicable — {rec['na']}")
        else:
            lines.append(f"- {item}: {rec['answer']}")
    lines += ["", f"state digest (integrity only, not authenticity): {state_digest(root)}", ""]
    out = state_path(root, "record.md")
    try:
        atomic_state_write(root, "record.md", ("\n".join(lines) + "\n").encode("utf-8"))
    except OSError as exc:
        print(f"REFUSED  gate.record-write-failed: {exc}", file=sys.stderr)
        return 2
    print(f"ok  gate.record-written: {out}")
    return 0


def class_findings(change_class: str, fals: dict, base: dict) -> list[tuple[str, str]]:
    """The evidence this class of change owes, and whether it is there."""
    found: list[tuple[str, str]] = []
    by_kind: dict[str, list[str]] = {}
    for label, entry in fals.items():
        by_kind.setdefault(entry.get("kind", "capability"), []).append(label)

    def phases(label):
        return fals.get(label, {}).get("runs", {})

    def need(kind, count=1):
        labels = by_kind.get(kind, [])
        if len(labels) < count:
            found.append(("gate.evidence-missing",
                          f"{change_class} needs {count} `{kind}` label(s); found {len(labels)}"))
        return labels

    def required(label, kind, needed):
        """Presence FIRST, exits second.

        Every branch used to read an exit code with a default — `.get("before", {}).get("exit", 1) == 0` — so a
        phase that was never recorded inherited a made-up outcome. For a rejection label the default (1) read as
        "the prohibited action was demonstrated", and a security change with no before phase at all was certified
        as PASS. A missing phase is missing evidence; it is never an exit code.
        """
        r = phases(label)
        absent = [p for p in needed if p not in r]
        if absent:
            found.append(("gate.phase-missing",
                          f"{label} ({kind}): no {'/'.join(absent)} phase recorded, so this {change_class} "
                          f"obligation cannot be judged — run the same command for {'/'.join(absent)}"))
            return None
        return r

    if change_class == "bugfix":
        for label in need("capability"):
            r = required(label, "capability", PHASES)
            if r is None:
                continue
            if r["before"]["exit"] == 0:
                found.append(("gate.evidence-not-demonstrated",
                              f"{label}: the pre-change run already passed, so no defect was demonstrated"))
            if r["after"]["exit"] != 0:
                found.append(("gate.evidence-still-failing",
                              f"{label}: the RECORDED after run exited {r['after']['exit']} — the fix was never "
                              f"shown to work against the candidate the evidence names. A green re-run at check "
                              f"time executes the CURRENT tree and cannot substitute for the recorded phase"))
            if r["reverted"]["exit"] == 0:
                found.append(("gate.reversion-not-detected",
                              f"{label}: with the defect restored the check still passed, so the test does not "
                              f"detect the defect it claims to"))
    elif change_class == "new-behaviour":
        for label in need("capability"):
            r = required(label, "capability", ("before", "after"))
            if r is None:
                continue
            if r["before"]["exit"] == 0:
                found.append(("gate.evidence-not-demonstrated",
                              f"{label}: the capability was already present before the change"))
            if r["after"]["exit"] != 0:
                found.append(("gate.evidence-still-failing", f"{label}: not passing after the change"))
        for label in need("rejection"):
            r = required(label, "rejection", ("before", "after"))
            if r is None:
                continue
            if r["before"]["exit"] == 0:
                found.append(("gate.rejection-not-demonstrated",
                              f"{label}: the rejected input was not accepted before the change, so nothing was "
                              f"being prevented"))
            if r["after"]["exit"] != 0:
                found.append(("gate.rejection-still-accepted", f"{label}: invalid input is still accepted"))
    elif change_class in ("refactor", "docs", "performance"):
        for label in need("equivalence"):
            r = required(label, "equivalence", ("before", "after"))
            if r is None:
                continue
            if r["before"]["exit"] != 0:
                found.append(("gate.equivalence-not-green",
                              f"{label}: a {change_class} must show behaviour preserved, so the before run of "
                              f"that check must pass"))
            if r["after"]["exit"] != 0:
                found.append(("gate.equivalence-not-green", f"{label}: the check does not pass after the change"))
        if change_class == "performance":
            for label in need("benchmark"):
                r = required(label, "benchmark", ("before", "after"))
                if r is None:
                    continue
                after_m = (r.get("after") or {}).get("measure")
                before_m = (r.get("before") or {}).get("measure")
                try:
                    validate_measure(before_m)
                    validate_measure(after_m)
                except ValueError as exc:
                    found.append(("gate.benchmark-invalid", f"{label}: {exc}"))
                    continue
                if any(before_m[k] != after_m[k] for k in ("metric", "unit", "direction", "tolerance")):
                    found.append(("gate.benchmark-incomparable",
                                  f"{label}: metric/unit/direction/tolerance conventions differ between phases"))
                    continue
                tolerance = after_m["tolerance"]
                # spread is a self-reported max-minus-min range of raw repeated observations.
                if max(before_m["spread"], after_m["spread"]) > tolerance:
                    found.append(("gate.benchmark-unstable",
                                  f"{label}: reported range exceeds the declared tolerance"))
                    continue
                before_value, after_value = before_m["value"], after_m["value"]
                gain = (before_value-after_value if after_m["direction"]=="lower"
                        else after_value-before_value)
                if not math.isfinite(gain) or gain <= tolerance:
                    found.append(("gate.benchmark-no-improvement",
                                  f"{label}: self-reported improvement {gain} does not exceed tolerance {tolerance}"))
    elif change_class == "security":
        # The verification command asserts the security property (exit 0 = the prohibited action is blocked).
        # Before the fix that property is violated, so the check must FAIL; if it already passed, nothing was
        # being prevented and the change is unproven.
        for label in need("rejection"):
            r = required(label, "rejection", ("before", "after"))
            if r is None:
                continue
            if r["before"]["exit"] == 0:
                found.append(("gate.rejection-not-demonstrated",
                              f"{label}: the property already held before the change, so nothing was being "
                              f"prevented and the fix is unproven"))
            if r["after"]["exit"] != 0:
                found.append(("gate.rejection-still-accepted", f"{label}: the prohibited action still succeeds"))

    if change_class in ("bugfix", "new-behaviour", "security"):
        for label, entry in fals.items():
            if entry.get("kind") not in (("capability", "rejection") if change_class == "new-behaviour"
                                          else (("capability",) if change_class == "bugfix" else ("rejection",))):
                continue
            runs = entry.get("runs", {})
            before, after, reverted = (runs.get(p) for p in ("before", "after", "reverted"))
            if before and after:
                if before.get("candidate") == after.get("candidate") or after.get("candidate") == "none:0":
                    found.append(("gate.candidate-not-attributable",
                                  f"{label}: no attributable repository candidate difference before/after; "
                                  "external-state-only command outcomes do not certify a code fix"))
            if change_class == "bugfix" and before and reverted:
                if before.get("candidate") != reverted.get("candidate"):
                    found.append(("gate.reversion-candidate-mismatch",
                                  f"{label}: reverted candidate does not restore the recorded before candidate"))
    for label, entry in fals.items():
        runs = entry.get("runs", {})
        seen = {r.get("tests_digest") for r in runs.values()}
        if len(seen) > 1:
            found.append(("gate.verification-inputs-changed",
                          f"{label}: the verification inputs differ between phases, so red-then-green proves "
                          f"nothing — write the failing test first, then leave it alone"))
        for phase, rec in runs.items():
            if rec.get("spawn_error") or rec.get("exit") is None or rec.get("exit") in (126, 127):
                found.append(("gate.command-not-executed", f"{label} [{phase}]: command failed to start or returned ambiguous shell status 126/127"))
            if rec.get("timed_out"):
                found.append(("gate.timeout-not-falsification",
                              f"{label} [{phase}]: the command hit the {rec.get('timeout')}s limit without "
                              f"finishing, so the observation is inconclusive — a timeout is not a detected defect"))
            for problem in rec.get("input_problems") or []:
                found.append(("gate.verification-input-unreadable", f"{label} [{phase}]: {problem}"))
            for problem in rec.get("candidate_problems") or []:
                found.append(("gate.candidate-unreadable", f"{label} [{phase}]: {problem}"))
    return found


def binding_findings(root: Path, base: dict, fals: dict, *, execute: bool = True) -> list[tuple[str, str]]:
    """Does the stored evidence still describe THIS tree and THIS candidate?

    Adversarial review found routes where it did not: (a) the change set was committed, so `git status` no longer
    shows it; (b) the fix was reverted after the `after` phase was recorded; (c) a phase pair was recorded in
    reverse order; (d) the two phases produced byte-identical output, which was treated as "not a flip".

    v3.5.1 changes (d) and adds (e). (d) refused honest silent verifiers: an exit status IS an observable result,
    so a verifier that prints nothing was told its evidence could not come from anything it observed -- which
    rewarded adding a `print()` over making the check stronger. The rule is gone; the exit outcomes and the
    bindings below carry the weight instead. (e) binds the recorded `after` to the CONTENT of the candidate it
    was run against, because a commit hash cannot identify uncommitted work.

    v3.5.2 adds (f) and (g). (f) checks the chronology of EVERY recorded phase in canonical order, not just
    before/after: a `reverted` phase recorded before the fix was ever verified says nothing about whether the fix
    works, and an out-of-order record was previously certified. (g) re-derives the candidate and input
    fingerprints AFTER the live verification runs, because those runs execute agent-supplied commands -- and a
    command that edits the tree it is verifying can return success while leaving the deliverable broken.
    """
    found: list[tuple[str, str]] = []
    base_rev = base.get("revision", "")
    if base_rev and base_rev != "NO-VCS":
        code, out = porcelain(root, ["diff", "--name-status", base_rev, "HEAD", "--"])
        if code != 0:
            found.append(("gate.audit-failed", f"cannot diff the baseline revision against HEAD: {out.strip()}"))
        elif out.strip():
            found.append(("gate.committed-since-baseline",
                          f"{len(out.splitlines())} path(s) were committed since the baseline ({base_rev[:12]}), so "
                          f"the worktree view no longer describes the change; the evidence is stale"))
    scope = list(base.get("authorised") or []) + list(base.get("exceptions") or [])
    default_timeout = base.get("timeout") or TIMEOUT_DEFAULT
    for label, entry in fals.items():
        runs = entry.get("runs", {})
        declared = [str(p) for p in (base.get("inputs") or [])] + [str(p) for p in (entry.get("inputs") or [])]
        after = runs.get("after")
        if after:
            current, problems = candidate_fingerprint(root, scope, declared)
            current_inputs, input_problems = verification_inputs(root, entry["cmd"], declared)
            if problems:
                found.append(("gate.candidate-unreadable",
                              f"{label}: {problems[0]} — an unreadable tree is not an unchanged one"))
            elif after.get("candidate") and current and current != after["candidate"]:
                found.append(("gate.candidate-changed",
                              f"{label}: the working tree is not the candidate the after phase verified against "
                              f"({after['candidate'][:16]} -> {current[:16]}), so the evidence is stale — re-record "
                              f"the phases against the candidate you are delivering"))
            for problem in input_problems:
                found.append(("gate.verification-input-unreadable", f"{label}: {problem}"))
            if (not input_problems and after.get("tests_digest")
                    and current_inputs != after["tests_digest"]):
                found.append(("gate.verification-inputs-stale",
                              f"{label}: the verification inputs changed after the after phase was recorded "
                              f"({after['tests_digest'][:16]} -> {current_inputs[:16]}) — evidence collected "
                              f"against the older verifier does not describe the one on disk now"))
        present = [phase for phase in PHASES if phase in runs]
        for earlier, later in zip(present, present[1:]):
            order = phase_order(runs[earlier], runs[later])
            if order is False:
                found.append(("gate.phases-out-of-order",
                              f"{label}: the {later} phase was recorded before the {earlier} phase; the recorded "
                              f"order is the evidence, and {earlier} -> {later} is the only order this class "
                              f"accepts"))
            elif order is None:
                found.append(("gate.phase-order-unverifiable",
                              f"{label}: the {earlier} and {later} phases carry the same sequence number and "
                              f"indistinguishable timestamps, so which ran first cannot be established"))

    if found or not execute:
        return found

    # Execute only after every candidate binding and chronology check is valid.
    for label, entry in fals.items():
        runs = entry.get("runs", {})
        after = runs.get("after")
        if after:
            # One execution per label, exactly as `falsify` guarantees. `check` re-runs the
            # recorded command, so two concurrent checks each launch it: the verifier's side
            # effects happen N times while both checks print PASS. The lease is the same one
            # `falsify` takes, so a check never re-runs a command another verification is
            # already running, and never runs alongside it.
            result = None
            try:
                with label_execution_lock(root, label) as lease_fd:
                    # The verifier must retain the lease if check's parent process
                    # is killed. Otherwise the next check can launch the same
                    # command while the orphaned verifier is still executing.
                    result = run(entry["cmd"], root, entry.get("timeout") or default_timeout,
                                 lease_fd=lease_fd)
            except PhaseBusyError as exc:
                found.append(("gate.phase-in-flight",
                              f"{label}: another verification for this label is running, so check did not re-run "
                              f"its command concurrently ({exc})"))
            if result is not None:
                if result.spawn_error or result.output_limited or result.code is None or result.code in (126, 127):
                    found.append(("gate.command-not-executed",
                                  f"{label}: the live verification could not be executed conclusively"))
                if result.timed_out:
                    found.append(("gate.timeout-not-falsification",
                                  f"{label}: re-running the recorded command at check time did not finish within "
                                  f"{entry.get('timeout') or default_timeout}s, so its evidence cannot be confirmed"))
                elif result.code != 0:
                    found.append(("gate.evidence-no-longer-holds",
                                  f"{label}: re-running the recorded command at check time now exits {result.code} — the "
                                  f"fix recorded as passing is not in this tree (output: {result.output.strip()[:120]})"))
    # Time-of-check/time-of-use. The live re-runs above execute agent-supplied commands, and a command can edit
    # the very tree it is verifying. Everything certified below must therefore be rebound AFTER those runs.
    for label, entry in fals.items():
        runs = entry.get("runs", {})
        after = runs.get("after")
        if not after:
            continue
        declared = [str(p) for p in (base.get("inputs") or [])] + [str(p) for p in (entry.get("inputs") or [])]
        post_candidate, post_problems = candidate_fingerprint(root, scope, declared)
        post_inputs, post_input_problems = verification_inputs(root, entry["cmd"], declared)
        if post_problems or post_input_problems:
            found.append(("gate.post-check-mutation",
                          f"{label}: the tree could not be re-read after the live verification ran "
                          f"({(post_problems + post_input_problems)[0]}), so the deliverable cannot be confirmed"))
        elif after.get("candidate") and post_candidate != after["candidate"]:
            found.append(("gate.post-check-mutation",
                          f"{label}: the candidate changed WHILE the live verification was running "
                          f"({after['candidate'][:16]} -> {post_candidate[:16]}) — a command that mutates the tree "
                          f"it verifies cannot certify it, and what is on disk now is not what was verified"))
        elif after.get("tests_digest") and post_inputs != after["tests_digest"]:
            found.append(("gate.post-check-mutation",
                          f"{label}: the verification inputs changed WHILE the live verification was running "
                          f"({after['tests_digest'][:16]} -> {post_inputs[:16]}), so the verdict describes a "
                          f"different verifier than the recorded one"))
    return found


def findings(root: Path) -> list[tuple[str, str]]:
    base = load(root, "baseline.json", None)
    if base is None:
        return [("gate.baseline-missing", "no baseline recorded: run `pe_gate.py baseline --change-class ... "
                                          "--authorised ...` before writing")]
    invalid = validate_state(root)
    if invalid:
        return invalid
    found: list[tuple[str, str]] = []
    if base.get("root") != str(root):
        found.append(("gate.baseline-other-workspace", f"the baseline names {base.get('root')}, not {root}"))
    fals = load(root, "falsify.json", {})
    if "__unreadable__" in fals:
        found.append(("gate.state-unreadable", fals["__unreadable__"]))
        fals = {}
    found += class_findings(base.get("change_class", "bugfix"), fals, base)

    code, _ = porcelain(root)
    if code != 0:
        found.append(("gate.audit-failed", "`git status` failed, so the changed-file set could not be read; an "
                                           "unreadable audit is not an empty one"))
    scope = list(base.get("authorised") or []) + [e for e in base.get("exceptions", []) if e]
    if "raw_tracked" not in base:
        for problem in git_filter_visibility_problems(root):
            found.append(("gate.git-filter-unverifiable", problem))
    raw_changed, raw_errors = raw_scope_delta(root, base)
    for problem in raw_errors:
        found.append(("gate.raw-audit-unavailable", problem))
    try:
        audited_paths = changed_paths(root)
    except ValueError as exc:
        found.append(("gate.audit-failed", f"Git changed-path audit is unavailable: {exc}"))
        audited_paths = []
    git_audited_paths = set(audited_paths)
    audited_paths = sorted(git_audited_paths | set(raw_changed))
    for path in audited_paths:
        if path == STATE_DIR or path.startswith(STATE_DIR + "/"):
            found.append(("gate.state-in-tree",
                          f"{path} is a legacy in-tree record directory; this gate writes its record under "
                          f"{state_dir(root)}, and this path is residue a reviewer will read as part of your change"))
            continue
        if not any(covers(entry, path) for entry in scope):
            found.append(("gate.scope-outside-authority",
                          f"{path} changed but is not in the authorised scope and is not a named exception"))
    # Git's line counts cannot quantify hidden-normalized byte changes.
    # A budget justification is required rather than reporting zero additions.
    hidden_raw_paths = set(raw_changed) - git_audited_paths if not raw_errors else set()
    if hidden_raw_paths and not base.get("budget_note"):
        found.append(("gate.raw-budget-unmeasured", "raw-byte changes invisible to Git diff cannot be accurately line-budgeted; record --budget-note at baseline"))
    try:
        files, added = diff_stats(root)
    except ValueError as exc:
        found.append(("gate.audit-failed", f"Git diff statistics are unavailable: {exc}"))
        files = added = 0
    budget = base.get("budget") or {"files": 6, "lines": 250}
    if (files > budget["files"] or added > budget["lines"]) and not base.get("budget_note"):
        found.append(("gate.budget-exceeded",
                      f"the diff is {files} file(s) / {added} added line(s) against a budget of "
                      f"{budget['files']} / {budget['lines']} and no reason was recorded at baseline"))

    dod = load(root, "dod.json", {})
    for item, text in DOD_ITEMS:
        if item not in dod:
            found.append(("gate.dod-unanswered", f"{item} unanswered: {text}"))
        elif "na" in dod[item] and not str(dod[item]["na"]).strip():
            found.append(("gate.dod-na-without-reason", f"{item}: not-applicable needs a reason"))
    record = state_path(root, "record.md")
    if not record.is_file():
        found.append(("gate.record-missing", "no completion record written: run `pe_gate.py record`"))
    else:
        try:
            record_body = record.read_text(encoding="utf-8", errors="replace")
        except OSError:
            found.append(("gate.record-unreadable", "completion record cannot be read"))
            record_body = ""
        m = re.search(r"state digest(?: \(integrity only, not authenticity\))?: ([0-9a-f]{64})",
                      record_body)
        if not m or m.group(1) != state_digest(root):
            found.append(("gate.record-stale", "the completion record was written before the state changed: "
                                               "regenerate it with `pe_gate.py record`"))
    # A REFUSED verdict already follows from static evidence. Do not run
    # agent-supplied shell commands simply to collect redundant diagnostics.
    # In particular, unsafe scope, stale completion records, and missing DoD
    # must never trigger verifier side effects during check.
    static_blockers = bool(found)
    binding = binding_findings(root, base, fals, execute=not static_blockers)
    found.extend(binding)
    if not static_blockers:
        # Live verification may create an *untracked, out-of-scope* file.
        # Candidate fingerprints include only untracked paths inside the
        # declared scope, so they cannot replace a second complete scope audit.
        # This audit runs even if a verifier itself failed.
        try:
            post_paths = changed_paths(root)
        except ValueError as exc:
            found.append(("gate.post-check-audit-failed", str(exc)))
            post_paths = []
        raw_post_paths, raw_post_errors = raw_scope_delta(root, base)
        for problem in raw_post_errors:
            found.append(("gate.post-check-raw-audit-failed", problem))
        git_post_paths = set(post_paths)
        post_paths = sorted(git_post_paths | set(raw_post_paths))
        for path in post_paths:
            if path == STATE_DIR or path.startswith(STATE_DIR + "/"):
                found.append(("gate.state-in-tree", f"verifier introduced legacy state path {path!r}"))
            elif not any(covers(entry, path) for entry in scope):
                found.append(("gate.scope-outside-authority", f"verifier left out-of-scope path {path!r}"))
        if set(raw_post_paths) - git_post_paths and not base.get("budget_note"):
            found.append(("gate.raw-budget-unmeasured", "post-check raw changes cannot be line-budgeted by Git"))
        try:
            post_files, post_added = diff_stats(root)
            if (post_files > budget["files"] or post_added > budget["lines"]) and not base.get("budget_note"):
                found.append(("gate.budget-exceeded", "verifier changed files/lines beyond the recorded budget"))
        except ValueError as exc:
            found.append(("gate.post-check-audit-failed", str(exc)))
    return found


def stored_state_fingerprint(root: Path) -> str:
    """Snapshot on-disk evidence identities for optimistic check isolation.

    Verification commands can take minutes; holding the evidence writer lock
    through the entire live rerun would deadlock legitimate nested workflows.
    Therefore detect interference and refuse, rather than claiming a stable
    PASS about a state that changed while check was inspecting it.
    """
    h = hashlib.sha256()
    for name in ("baseline.json", "falsify.json", "dod.json", "seq.json", "record.md"):
        path = state_path(root, name)
        h.update(name.encode("utf-8") + b"\x00")
        try:
            blob = path.read_bytes()
        except FileNotFoundError:
            blob = b"<absent>"
        h.update(len(blob).to_bytes(8, "big"))
        h.update(blob)
    return h.hexdigest()


def cmd_check(args) -> int:
    root = workspace_root(Path.cwd())
    base = load(root, "baseline.json", None)
    if isinstance(base, dict):
        invalid = validate_state(root)
        if invalid:
            print("REFUSED")
            for check_id, reason in invalid:
                print(f"- {check_id}: {reason}")
            return 2
    hidden = visibility_problems(root, base if isinstance(base, dict) else None)
    if hidden:
        # Do not launch side-effectful live verifiers when the index is already
        # known to conceal some tracked paths from scope and candidate audits.
        print("REFUSED")
        for problem in hidden[:12]:
            print(f"- gate.git-index-hidden: {problem}")
        if len(hidden) > 12:
            print(f"- gate.git-index-hidden: {len(hidden) - 12} additional affected paths")
        return 2
    initial = stored_state_fingerprint(root)
    found = findings(root)
    # A live verifier can itself change Git index visibility AFTER preflight.
    # Re-audit the index after the final verification before allowing PASS.
    post_hidden = visibility_problems(root, base)
    # Live `check` reruns shell commands. Those commands must not be able to
    # redirect subsequent Git audits by editing core.worktree mid-check.
    try:
        if workspace_root(Path.cwd()) != root:
            raise WorkspaceIdentityError("worktree changed during check")
    except WorkspaceIdentityError as exc:
        found.append(("gate.workspace-identity-during-check", str(exc)))
    for problem in post_hidden[:12]:
        found.append(("gate.git-index-hidden-during-check", problem))
    if len(post_hidden) > 12:
        found.append(("gate.git-index-hidden-during-check", f"{len(post_hidden) - 12} more affected tracked paths"))
    with evidence_lock(root):
        if stored_state_fingerprint(root) != initial:
            found.append(("gate.state-changed-during-check",
                          "evidence changed during live verification; rerun check against a stable record"))
    if not found:
        files, added, concealed = audited_diff_stats(root, base)
        print("PASS")
        print(f"root={root}")
        change_class = load(root, 'baseline.json', {}).get('change_class')
        print(f"change_class={change_class}")
        print("assurance=local_mechanical_evidence_only")
        if change_class == "performance":
            print("benchmark_assurance=agent_reported_not_independently_measured")
        print(f"revision={revision(root)}")
        print(f"diff={files} file(s),{added} Git-visible added line(s)")
        if concealed:
            print(f"raw_changed_invisible_to_git={concealed}; Git line count is incomplete")
        return 0
    print("REFUSED")
    for check_id, message in found:
        print(f"- {check_id}: {message}")
    return 2


def cmd_status(args) -> int:
    root = workspace_root(Path.cwd())
    print(f"root={root}")
    print(f"revision={revision(root)}")
    sd = state_dir(root)
    print("stored: " + (", ".join(sorted(p.name for p in sd.glob("*"))) if sd.is_dir() else "nothing"))
    print(f"changed_files={', '.join(changed_paths(root)) or '(none)'}")
    return cmd_check(args)


HOOK_TEMPLATE = """#!/bin/sh
# Installed by pe_gate.py -- refuses a commit while the recorded obligations are unmet.
#
# Developer assistance, NOT a security boundary: `git commit --no-verify` skips it, and an agent that can edit
# this hook can edit the gate too. Where bypassing matters, run `pe_gate.py check` in CI, which the
# implementing agent does not control.
exec {interpreter} {gate} check
"""

HOOK_MARKER = "# Installed by pe_gate.py"


def hooks_dir(root: Path) -> Path:
    """Where git will actually look for hooks: `core.hooksPath` if configured, else `<git-dir>/hooks`."""
    res = git(root, "config --get core.hooksPath")
    if res.code == 0 and res.output.strip():
        configured = Path(res.output.strip())
        return configured if configured.is_absolute() else (root / configured)
    res = git(root, "rev-parse --absolute-git-dir")
    if res.code == 0 and res.output.strip():
        return Path(res.output.strip()) / "hooks"
    return root / ".githooks"


def cmd_install_hook(args) -> int:
    """Write a hook git will actually run, pointing at THIS gate's absolute path.

    The previous version wrote `.githooks/pre-commit` -- a directory git ignores unless `core.hooksPath` says
    otherwise, and a body of `exec python3 scripts/pe_gate.py check`, a path that only resolves if the gate were
    vendored into the repository. Measured consequence: with `check` refusing (exit 2), `git commit` still
    succeeded, and the hook itself exited 2 for "file not found" -- the same code a refusal uses.
    """
    root = workspace_root(Path.cwd())
    target = (root / args.path) if args.path else (hooks_dir(root) / "pre-commit")
    gate = Path(__file__).resolve()
    if target.exists():
        existing = target.read_text(encoding="utf-8", errors="replace")
        if HOOK_MARKER not in existing and not args.force:
            print(f"REFUSED  gate.hook-exists: {target} already exists and was not written by this gate; the gate "
                  f"does not overwrite someone else's hook — merge it by hand, or re-run with --force to replace "
                  f"it", file=sys.stderr)
            return 2
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(HOOK_TEMPLATE.format(interpreter=shlex.quote(sys.executable),
                                           gate=shlex.quote(str(gate))), encoding="utf-8")
    os.chmod(target, 0o755)
    print(f"ok  gate.hook-installed: {target}")
    print(f"     interpreter={sys.executable} gate={gate}")
    active = hooks_dir(root)
    if active != target.parent:
        print(f"note: git reads hooks from {active}, so this hook will NOT run as installed — set "
              f"`git config core.hooksPath {target.parent.relative_to(root)}`, or pass `--path "
              f"{active.relative_to(root)}/pre-commit`")
    else:
        print("note: git will run this hook on commit; confirm it blocks a commit while `check` refuses")
    print("note: `git commit --no-verify` bypasses it. A local hook is developer assistance, not a security "
          "boundary — enforce the same check in CI where bypassing matters.")
    return 0


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="Mechanical gate for the pragmatic-engineering obligations.")
    sub = ap.add_subparsers(dest="command", required=True)

    b = sub.add_parser("baseline", help="record root, status, revision, change class and authorised scope")
    b.add_argument("--change-class", required=True, choices=CLASSES)
    b.add_argument("--authorised", required=True)
    b.add_argument("--budget", default="", help="files=N,lines=M (default 6,250)")
    b.add_argument("--budget-note", default="", help="why this diff is larger than the budget")
    b.add_argument("--note", default="")
    b.add_argument("--input", action="append", default=[],
                   help="a verification input outside the test directories (fixture, config, root-level "
                        "checker); repeatable, content-hashed into every phase")
    b.add_argument("--timeout", type=int, default=0,
                   help=f"seconds allowed per verification command (default {TIMEOUT_DEFAULT}); a timeout is "
                        f"inconclusive, never a detected defect")
    b.add_argument("--no-vcs-claim", default="",
                   help="for a workspace with no version control: the check that showed there is none")
    b.set_defaults(func=cmd_baseline)

    f = sub.add_parser("falsify", help="record one phase of one verification command")
    f.add_argument("--label", required=True)
    f.add_argument("--kind", default="capability", choices=KINDS)
    f.add_argument("--cmd", required=True)
    f.add_argument("--phase", required=True, choices=PHASES)
    f.add_argument("--replace-phase", action="store_true",
                   help="supersede an already-recorded phase for this label, deliberately: the replaced record is "
                        "kept under `superseded`. Without it, re-recording a phase is refused, because it would "
                        "erase the earlier evidence")
    f.add_argument("--input", action="append", default=[],
                   help="an additional verification input for this label; repeatable")
    f.add_argument("--timeout", type=int, default=0, help="override the baseline timeout for this command")
    f.add_argument("--metric", help="benchmark: what is measured, e.g. p95_ms")
    f.add_argument("--unit", help="benchmark: the metric's unit, e.g. ms")
    f.add_argument("--direction", choices=("lower", "higher"), help="benchmark: which way is better")
    f.add_argument("--value", type=float, help="benchmark: the measured value for this phase")
    f.add_argument("--tolerance", type=float,
                   help="benchmark: the smallest change in the metric's own unit that counts as an improvement")
    f.add_argument("--repeats", type=int, help="benchmark: how many times the measurement was taken")
    f.add_argument("--spread", type=float, help="benchmark: observed spread across the repeats")
    f.set_defaults(func=cmd_falsify)

    d = sub.add_parser("dod", help="answer one Definition-of-done item")
    d.add_argument("--item", required=True)
    d.add_argument("--answer")
    d.add_argument("--na")
    d.set_defaults(func=cmd_dod)

    r = sub.add_parser("record", help="write the completion record from the stored artifacts")
    r.set_defaults(func=cmd_record)

    c = sub.add_parser("check", help="exit 2 and name every unmet obligation")
    c.set_defaults(func=cmd_check)

    s = sub.add_parser("status", help="print what is stored, then run check")
    s.set_defaults(func=cmd_status)

    h = sub.add_parser("install-hook", help="write a pre-commit hook that runs check, where git will run it")
    h.add_argument("--path", default="",
                   help="explicit hook path (default: the dot path git actually reads — core.hooksPath if set, "
                        "else <git-dir>/hooks/pre-commit)")
    h.add_argument("--force", action="store_true",
                   help="replace a pre-commit hook this gate did not write (default: refuse and leave it alone)")
    h.set_defaults(func=cmd_install_hook)

    args = ap.parse_args(argv)
    try:
        return args.func(args)
    except PhaseBusyError as exc:
        print(f"REFUSED  gate.phase-in-flight: {exc}", file=sys.stderr)
        return 2
    except WorkspaceIdentityError as exc:
        print(f"REFUSED  gate.workspace-identity: {exc}", file=sys.stderr)
        return 2
    except (OSError, ValueError, TypeError, KeyError) as exc:
        print(f"REFUSED  gate.operation-failed: {type(exc).__name__}: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
