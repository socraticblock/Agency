"""Judge battery 3: the credential object is the LAST object asked for and its body is
cut short. Single chunk (<500 objects), so no chunk bookkeeping is involved.
"""
import json
import random
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, sys.argv[1])
LABEL = sys.argv[2]

from openready import history          # noqa: E402
from openready import candidate        # noqa: E402


def git(root, *a):
    return subprocess.run(["git", "-C", str(root), *a], capture_output=True, check=False)


def mk_repo(secret):
    root = Path(tempfile.mkdtemp(prefix="b3-"))
    git(root, "init", "-q")
    git(root, "config", "user.email", "j@example.com")
    git(root, "config", "user.name", "judge")
    (root / "src").mkdir()
    (root / "src" / "a.py").write_text("a = 1\n")
    (root / "leak.txt").write_text('password = "%s"\n' % secret)
    git(root, "add", "-A")
    git(root, "commit", "-q", "-m", "one")
    git(root, "rm", "-q", "leak.txt")
    git(root, "commit", "-q", "-m", "two")
    return root


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


class Shim:
    def __init__(self, real):
        self._real = real
        self.CompletedProcess = real.CompletedProcess

    def __getattr__(self, name):
        return getattr(self._real, name)

    def run(self, cmd, *a, **k):
        if not ("cat-file" in cmd and "--batch" in cmd):
            return self._real.run(cmd, *a, **k)
        p = self._real.run(cmd, *a, **k)
        recs = records(p.stdout)
        head, body = recs[-1]
        out = b"".join(h + b"\n" + b + b"\n" for h, b in recs[:-1])
        out += head + b"\n" + body[:4]          # stream ends inside the object's body
        return self.CompletedProcess(cmd, 0, out, b"")


def status_of(results, check_id):
    for r in results:
        if getattr(r, "check_id", None) == check_id:
            return getattr(r, "status", None)
    return None


def main():
    root = None
    for attempt in range(400):
        root = mk_repo("Sup3rSecretValue%03d" % attempt)
        hits = [h["object"] for h in history.scan(root).get("hits", [])]
        if not hits:
            shutil.rmtree(root, ignore_errors=True)
            continue
        index, _ = history._blob_index(root)
        order = sorted(index)
        pos = [i for i, s in enumerate(order) if s.startswith(hits[0])][0]
        if pos == len(order) - 1:
            break
        shutil.rmtree(root, ignore_errors=True)
        root = None
    if root is None:
        print(json.dumps({"label": LABEL, "case": "not-constructed"}))
        return
    old = history.subprocess
    try:
        history.subprocess = Shim(subprocess)
        report = history.scan(root)
        complete, why = history.scanned_completely(report)
        out_dir = root.parent / (root.name + "-out")
        res, meta = candidate.export(root, out_dir, "probe", history_report=report)
        print(json.dumps({
            "label": LABEL, "case": "target-is-last-and-its-body-is-cut-to-4-bytes",
            "objects": len(order), "chunk": history.BATCH_CHUNK, "target": hits[0],
            "target_is_last": True,
            "refused": not complete, "why": why[:140],
            "choice": history.history_choice(report)["choice"],
            "hist_status": status_of(history.results(report), "privacy.full-history"),
            "blobs_scanned": report.get("blobs_scanned"),
            "hits": report.get("hit_count"),
            "export_meta_none": meta is None,
            "export_history_status": status_of(res, "candidate.history-unscanned"),
        }, sort_keys=True))
    finally:
        history.subprocess = old
    shutil.rmtree(root, ignore_errors=True)
    shutil.rmtree(root.parent / (root.name + "-out"), ignore_errors=True)


main()
