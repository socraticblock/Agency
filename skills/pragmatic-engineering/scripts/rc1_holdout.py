#!/usr/bin/env python3
"""Post-correction holdout for rc1 — targeted at the *changed* behaviour.

This is a NEW holdout, written after the F1 validator rewrite and the F2/F3 provenance
work, to check for overfitting in the fix itself. It does not re-run the audit's 30-case
or 12-case suites; it attacks the fixed surfaces from new angles: invocation context,
missing/renamed provenance files, the reference forms inside templates, anchored routes,
non-file targets, and the invariant that validation never mutates the package.
"""

from pathlib import Path
import re
import hashlib
import shutil
import subprocess
import sys
import tempfile

PKG = Path(__file__).resolve().parents[1]
PY = sys.executable
results = []


def tree_hash(pkg: Path) -> str:
    h = hashlib.sha256()
    for p in sorted(pkg.rglob("*")):
        if p.is_file():
            h.update(p.relative_to(pkg).as_posix().encode())
            h.update(p.read_bytes())
    return h.hexdigest()


def run(pkg: Path, cwd=None):
    proc = subprocess.run([PY, str(pkg / "scripts" / "validate_skill.py")],
                          capture_output=True, text=True, cwd=str(cwd or pkg))
    first = proc.stdout.strip().splitlines()[0] if proc.stdout.strip() else ""
    return proc.returncode, first, proc.stdout + proc.stderr


def case(name, expect_valid, mutate=None, expect_text=None, from_copy=True):
    if from_copy:
        tmp = Path(tempfile.mkdtemp(prefix="pe-holdout-"))
        try:
            copy = tmp / "pkg"
            shutil.copytree(PKG, copy)
            if mutate:
                mutate(copy)
            code, first, out = run(copy)
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
    else:
        code, first, out = run(PKG)
    ok = first == ("VALID" if expect_valid else "INVALID")
    detail = first
    if ok and expect_text and expect_text not in out:
        ok, detail = False, f"{first} (missing expected text {expect_text!r})"
    if ok and not expect_valid and code == 0:
        ok, detail = False, "reported INVALID but exited 0"
    if ok and expect_valid and code != 0:
        ok, detail = False, "reported VALID but exited non-zero"
    results.append((name, ok, detail))


# --- 1. invocation context ----------------------------------------------------

def _noop(pkg):
    pass


tmpdir = Path(tempfile.mkdtemp(prefix="pe-cwd-"))
try:
    code, first, out = run(PKG, cwd=tmpdir)
    results.append(("validator_is_cwd_independent", first == "VALID" and code == 0,
                    f"{first} from cwd={tmpdir}"))
finally:
    shutil.rmtree(tmpdir, ignore_errors=True)

# --- 2. missing / broken provenance ------------------------------------------

case("missing_skill_md_is_reported_not_crashed", False,
     lambda p: (p / "SKILL.md").unlink(), expect_text="front matter")
case("missing_index_md_is_reported", False,
     lambda p: (p / "INDEX.md").unlink(), expect_text="missing required file: INDEX.md")


def disagree(pkg):
    # Version-agnostic: read the INDEX version line and move it, then verify the
    # mutation actually landed. A hard-coded version string made this case pass
    # VALID (a false negative) the moment the package version changed.
    p = pkg / "INDEX.md"
    text = p.read_text(encoding="utf-8")
    mutated = re.sub(r"(?m)^\*\*Version:\*\*\s*\S+", "**Version:** 9.9.9", text, count=1)
    if mutated == text:
        raise AssertionError("mutation did not land: INDEX.md has no **Version:** line")
    p.write_text(mutated, encoding="utf-8")


case("index_version_disagreement_is_reported", False, disagree,
     expect_text="version disagreement")

# --- 3. reference forms in places the fix did not previously reach ------------

def break_template_route(pkg):
    p = pkg / "assets" / "architecture-decision-template.md"
    p.write_text(p.read_text(encoding="utf-8") + "\nSee `references/ghost-template-doc.md`.\n",
                 encoding="utf-8")


case("broken_route_inside_reachable_template", False, break_template_route,
     expect_text="assets/architecture-decision-template.md")


def anchored_broken_route(pkg):
    p = pkg / "references" / "testing.md"
    p.write_text(p.read_text(encoding="utf-8") +
                 "\nSee `references/ghost.md#section` for detail.\n", encoding="utf-8")


case("anchored_route_broken_is_reported", False, anchored_broken_route,
     expect_text="references/ghost.md")


def link_to_directory(pkg):
    p = pkg / "references" / "testing.md"
    p.write_text(p.read_text(encoding="utf-8") + "\nSee [modes](./modes).\n", encoding="utf-8")


case("markdown_link_to_directory_is_reported", False, link_to_directory,
     expect_text="broken live markdown link")


def anchored_link_broken(pkg):
    p = pkg / "references" / "testing.md"
    p.write_text(p.read_text(encoding="utf-8") +
                 "\nSee [detail](./ghost-doc.md#heading).\n", encoding="utf-8")


case("anchored_markdown_link_broken_is_reported", False, anchored_link_broken,
     expect_text="broken live markdown link")


def valid_anchored_link(pkg):
    p = pkg / "references" / "testing.md"
    p.write_text(p.read_text(encoding="utf-8") +
                 "\nSee [principles](./pragmatic-principles.md#the-100-pragmatic-principles--agent-reference).\n",
                 encoding="utf-8")


case("valid_anchored_link_passes", True, valid_anchored_link)

# --- 4. provenance inventory ---------------------------------------------------

def reports_missing_status(pkg):
    names = ["INDEPENDENT-AUDIT-2026-10-07.md", "INDEPENDENT-HIDDEN-SUITE-RESULTS.md",
             "POST-PATCH-HOLDOUT-RESULTS.md", "V3.3-INDEPENDENT-PATCH-VERIFICATION.md",
             "V3.2-PATCH-VERIFICATION.md", "V3.1-PATCH-VERIFICATION.md",
             "V3.1-THIRD-WAVE-TEST-REPORT.md", "V3-HIDDEN-TEST-REPORT.md",
             "TEST-REPORT.md", "RESEARCH.md"]
    missing = [n for n in names if not (pkg / n).read_text(encoding="utf-8").startswith("> **Status:**")]
    if missing:
        raise AssertionError(f"reports without a Status line: {missing}")


try:
    reports_missing_status(PKG)
    results.append(("every_historical_report_has_status_line", True, ""))
except AssertionError as exc:
    results.append(("every_historical_report_has_status_line", False, str(exc)))

# --- 5. validation must not mutate the package ---------------------------------

before = tree_hash(PKG)
run(PKG)
after = tree_hash(PKG)
results.append(("validator_does_not_mutate_package", before == after,
                "tree hash changed" if before != after else ""))

# --- report --------------------------------------------------------------------

failed = [r for r in results if not r[1]]
for name, ok, detail in results:
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  [{detail}]" if detail and not ok else ""))
print(f"\n{len(results) - len(failed)}/{len(results)} holdout cases passed")
sys.exit(1 if failed else 0)
