#!/usr/bin/env python3
"""Executable regressions for the pragmatic-engineering package.

Every case runs the package's own validator against a throwaway copy of the package,
mutated in a temp directory. The artifact is never modified.

Covered: the four reference-form behaviours required of the validator (live backticked
route, live Markdown link, and both forms quoted only outside the runtime graph), graph
closure across reference forms, escape prevention, and the package invariants.
"""

from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

PKG = Path(__file__).resolve().parents[1]
VALIDATOR = "scripts/validate_skill.py"

results = []


def run_validator(pkg: Path):
    proc = subprocess.run(
        [sys.executable, str(pkg / VALIDATOR)],
        capture_output=True, text=True, cwd=str(pkg),
    )
    first = proc.stdout.strip().splitlines()[0] if proc.stdout.strip() else ""
    return proc.returncode, first, proc.stdout + proc.stderr


def check(name, expect_valid, mutate=None, expect_text=None):
    tmp = Path(tempfile.mkdtemp(prefix="pe-regression-"))
    try:
        copy = tmp / "pkg"
        shutil.copytree(PKG, copy)
        if mutate:
            mutate(copy)
        code, first, output = run_validator(copy)
        ok = (first == ("VALID" if expect_valid else "INVALID"))
        detail = first
        if ok and expect_text:
            ok = expect_text in output
            if not ok:
                detail = f"{first} (expected to mention {expect_text!r})"
        results.append((name, ok, detail))
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


# --- helpers used by the mutations -------------------------------------------

def break_route_in_skill(pkg):
    p = pkg / "SKILL.md"
    p.write_text(p.read_text(encoding="utf-8").replace(
        "references/testing.md", "references/testing-NOT-THERE.md", 1), encoding="utf-8")


def break_route_in_reference(pkg):
    p = pkg / "references" / "testing.md"
    p.write_text(p.read_text(encoding="utf-8") + "\nSee also `references/not-a-real-doc.md`.\n",
                 encoding="utf-8")


def break_link_in_skill(pkg):
    p = pkg / "SKILL.md"
    p.write_text(p.read_text(encoding="utf-8") +
                 "\nSee [runtime notes](references/runtime-notes-not-there.md).\n", encoding="utf-8")


def unreachable_broken_route(pkg):
    (pkg / "evals" / "zzz-note.md").write_text(
        "Example of an invalid route quoted in prose: `references/nope.md`.\n", encoding="utf-8")


def unreachable_broken_link(pkg):
    (pkg / "evals" / "zzz-note.md").write_text(
        "Example of an invalid link quoted in prose: [x](references/nope.md).\n", encoding="utf-8")


def link_closure(pkg):
    note = pkg / "MODE-NOTE.md"
    note.write_text("A newly reachable document with a broken route: `references/ghost.md`.\n",
                    encoding="utf-8")
    p = pkg / "SKILL.md"
    p.write_text(p.read_text(encoding="utf-8") + "\nSee [mode note](MODE-NOTE.md).\n", encoding="utf-8")


def anchored_route_broken(pkg):
    p = pkg / "references" / "testing.md"
    p.write_text(p.read_text(encoding="utf-8") +
                 "\nSee `references/ghost.md#section` for detail.\n", encoding="utf-8")


def escaping_route(pkg):
    p = pkg / "references" / "workspace-safety.md"
    p.write_text(p.read_text(encoding="utf-8") + "\nRoute: `references/../../outside.md`\n",
                 encoding="utf-8")


def escaping_link(pkg):
    p = pkg / "references" / "workspace-safety.md"
    p.write_text(p.read_text(encoding="utf-8") + "\nSee [outside](../../outside.md).\n",
                 encoding="utf-8")


def dotted_route_form_keeps_the_target_reachable(pkg):
    """`./references/testing.md` is a form a reader can click; before the fix it was not
    matched, so testing.md left the graph and a broken route inside it was never checked."""
    s = pkg / "SKILL.md"
    s.write_text(s.read_text(encoding="utf-8").replace(
        "`references/testing.md`", "`./references/testing.md`", 1), encoding="utf-8")
    break_route_in_reference(pkg)


def uppercase_extension_route_is_checked(pkg):
    s = pkg / "SKILL.md"
    s.write_text(s.read_text(encoding="utf-8") + "\nSee `references/GHOST.MD`.\n", encoding="utf-8")


# --- cases -------------------------------------------------------------------

check("package_is_valid", True)
check("live_route_broken", False, break_route_in_skill,
      expect_text="broken live routed reference in SKILL.md")
check("live_markdown_link_broken", False, break_link_in_skill,
      expect_text="broken live markdown link in SKILL.md")
check("route_broken_in_reachable_reference", False, break_route_in_reference,
      expect_text="references/testing.md")
check("unreachable_route_broken", True, unreachable_broken_route)
check("unreachable_markdown_link_broken", True, unreachable_broken_link)
check("link_closure_exposes_broken_reference", False, link_closure,
      expect_text="references/ghost.md")
check("anchored_route_broken", False, anchored_route_broken, expect_text="references/ghost.md")
check("escaping_route_rejected", False, escaping_route, expect_text="escapes skill root")
check("escaping_markdown_link_rejected", False, escaping_link, expect_text="escapes skill root")
check("dotted_route_form_keeps_target_reachable", False, dotted_route_form_keeps_the_target_reachable,
      expect_text="references/not-a-real-doc.md")
check("uppercase_extension_route_is_checked", False, uppercase_extension_route_is_checked,
      expect_text="references/GHOST.MD")

# Package invariants that do not need a mutated copy.
code, first, output = run_validator(PKG)
runtime = 0
for line in output.splitlines():
    if line.startswith("runtime_references="):
        runtime = int(line.split("=", 1)[1])
results.append(("runtime_graph_at_least_21_references", runtime >= 21, f"runtime_references={runtime}"))
results.append(("validator_version_index_agreement", code == 0, first))

failed = [r for r in results if not r[1]]
for name, ok, detail in results:
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  [{detail}]" if detail and not ok else ""))
print(f"\n{len(results) - len(failed)}/{len(results)} regressions passed")
sys.exit(1 if failed else 0)
