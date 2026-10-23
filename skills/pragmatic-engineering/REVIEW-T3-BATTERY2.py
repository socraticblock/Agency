"""Judge battery 2: production-shaped chunking (>500 objects) and a body cut short.

Usage: python3 battery2.py <srcdir> <label>
"""
import json
import random
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

SRC = sys.argv[1]
LABEL = sys.argv[2]
sys.path.insert(0, SRC)

from openready import history          # noqa: E402
from openready import candidate        # noqa: E402


def git(root, *args):
    return subprocess.run(["git", "-C", str(root), *args], capture_output=True, check=False)


def records(out):
    recs, off = [], 0
    while off < len(out):
        nl = out.find(b"\n", off)
        if nl == -1:
            recs.append((out[off:], b""))
            break
        head = out[off:nl]
        off = nl + 1
        parts = head.split()
        if len(parts) < 3 or parts[1] == "missing":
            recs.append((head, b""))
            continue
        size = int(parts[2])
        recs.append((head, out[off:off + size]))
        off += size + 1
    return recs


def rebuild(recs):
    return b"".join(h + b"\n" + b + b"\n" for h, b in recs)


class Shim:
    def __init__(self, real, transform):
        self._real = real
        self.CompletedProcess = real.CompletedProcess
        self.transform = transform
        self.calls = 0

    def __getattr__(self, name):
        return getattr(self._real, name)

    def run(self, cmd, *a, **k):
        if not ("cat-file" in cmd and "--batch" in cmd):
            return self._real.run(cmd, *a, **k)
        self.calls += 1
        p = self._real.run(cmd, *a, **k)
        return self.CompletedProcess(cmd, 0, self.transform(records(p.stdout)), b"")


def drop_first_chunk_record(target):
    """Exit 0, every emitted record well formed, one record simply missing."""
    def t(recs):
        return rebuild([r for r in recs if not r[0].startswith(target.encode())])
    return t


def cut_last_body(target):
    """The stream ends inside the target object's body: fewer bytes than declared."""
    def t(recs):
        head, body = recs[-1]
        cut = head + b"\n" + body[:max(1, len(body) // 3)]
        return rebuild(recs[:-1]) + cut
    return t


def status_of(results, check_id):
    for r in results:
        if getattr(r, "check_id", None) == check_id:
            return getattr(r, "status", None)
    return None


def probe(root, transform=None):
    old = history.subprocess
    try:
        if transform:
            history.subprocess = Shim(subprocess, transform)
        report = history.scan(root)
        complete, why = history.scanned_completely(report)
        out_dir = root.parent / (root.name + "-out")
        res, meta = candidate.export(root, out_dir, "probe", history_report=report)
        return {
            "refused": not complete,
            "why": why[:150],
            "choice": history.history_choice(report)["choice"],
            "hist_status": status_of(history.results(report), "privacy.full-history"),
            "blobs_scanned": report.get("blobs_scanned"),
            "blob_count": report.get("blob_count"),
            "hits": report.get("hit_count"),
            "read": report.get("objects_read"),
            "requested": report.get("objects_requested"),
            "export_meta_none": meta is None,
            "export_status": status_of(res, "candidate.history-unscanned"),
        }
    finally:
        history.subprocess = old


def emit(case, res, **extra):
    print(json.dumps({"label": LABEL, "case": case, **extra, **res}, sort_keys=True))


def big_repo(nfiles=600):
    root = Path(tempfile.mkdtemp(prefix="battery2-"))
    git(root, "init", "-q")
    git(root, "config", "user.email", "j@example.com")
    git(root, "config", "user.name", "judge")
    (root / "pad").mkdir()
    for i in range(nfiles):
        (root / "pad" / f"f{i}.txt").write_text(f"{i}-{random.getrandbits(64)}\n")
    (root / "pad" / "f0.txt").write_text('password = "Sup3rSecretValue123"\n')
    git(root, "add", "-A")
    git(root, "commit", "-q", "-m", "big")
    return root


def main():
    # ---- A/B: production chunking (BATCH_CHUNK = 500), 600+ objects -> 2 chunks
    root = big_repo()
    index, _ = history._blob_index(root)
    order = sorted(index)
    hits = [h["object"] for h in history.scan(root).get("hits", [])]
    target = hits[0]
    # recompute the target's position; it has to sit in chunk 1 (0..499) for the
    # shortfall to be maskable by a later chunk, and not be the very last position
    pos = [i for i, s in enumerate(order) if s.startswith(target)][0]
    emit("A-big-repo-healthy", probe(root),
         objects=len(order), chunk=history.BATCH_CHUNK, target_pos=pos)
    emit("B-big-repo-silent-short-first-chunk",
         probe(root, drop_first_chunk_record(target)),
         objects=len(order), target=target, target_pos=pos)
    shutil.rmtree(root.parent / (root.name + "-out"), ignore_errors=True)
    shutil.rmtree(root, ignore_errors=True)

    # ---- C: small repo, the stream ends inside the target object's body
    root = Path(tempfile.mkdtemp(prefix="battery2c-"))
    git(root, "init", "-q")
    git(root, "config", "user.email", "j@example.com")
    git(root, "config", "user.name", "judge")
    (root / "src").mkdir()
    (root / "src" / "a.py").write_text("a = 1\n")
    (root / "leak.txt").write_text('password = "Sup3rSecretValue123"\n')
    git(root, "add", "-A")
    git(root, "commit", "-q", "-m", "one")
    git(root, "rm", "-q", "leak.txt")
    git(root, "commit", "-q", "-m", "two")
    hits = [h["object"] for h in history.scan(root).get("hits", [])]
    target = hits[0]
    for attempt in range(20):
        index, _ = history._blob_index(root)
        order = sorted(index)
        pos = [i for i, s in enumerate(order) if s.startswith(target)][0]
        if pos == len(order) - 1:
            break
        (root / f"pad{attempt}.txt").write_text("pad %d\n" % random.getrandbits(64))
        git(root, "add", "-A")
        git(root, "commit", "-q", "-m", f"pad{attempt}")
    emit("C-stream-cut-inside-the-last-objects-body",
         probe(root, cut_last_body(target)),
         objects=len(order), target=target, target_is_last=(pos == len(order) - 1))
    shutil.rmtree(root.parent / (root.name + "-out"), ignore_errors=True)
    shutil.rmtree(root, ignore_errors=True)


main()
