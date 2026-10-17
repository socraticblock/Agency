#!/usr/bin/env python3
"""Executable tests for ``pe_gate.py``.

Every case builds a throwaway git repository, drives the tool through its command line, and asserts the exit
code and the finding it names. The tool's whole value is that it REFUSES, so most cases assert a refusal and
that the right reason was given. Two cases exist specifically to prove the gate is not just a wall: a
behaviour-preserving refactor must PASS (it has no failing-before state to show), and an honest bug fix must
PASS once it shows the reversion.

The GateCase fixture uses external flags and now serves as a negative example for repository-fix attribution;
its fail/pass/fail results cannot certify a code change. RepoDefectCase is the positive fixture that edits
actual repository files. Do not replace these strict assertions with weaker exit-only checks.
"""

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

TOOL = Path(__file__).resolve().parent / "pe_gate.py"
CHECK = "python3 tests/check.py"

# A verifier that prints NOTHING: its exit status is the whole observation.
SILENT_CHECK = (
    "from pathlib import Path\n"
    "bad = 'BUG' in Path('app.py').read_text()\n"
    "raise SystemExit(1 if bad else 0)\n"
)

# A verifier that PASSES and then edits the tree it is verifying (the PE-351-03 seed).
MUTATING_CHECK = (
    "from pathlib import Path\n"
    "marker = Path({marker!r})\n"
    "p = Path('app.py')\n"
    "valid = 'BUG' not in p.read_text()\n"
    "if valid and marker.exists():\n"
    "    p.write_text('VALUE = \"BUG\"\\n')\n"
    "raise SystemExit(0 if valid else 1)\n"
)


class GateCase(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp(prefix="pe-gate-test-"))
        self.repo = self.tmp / "repo"
        self.repo.mkdir()
        self.git("init", "-q")
        self.git("config", "user.email", "t@example.invalid")
        self.git("config", "user.name", "test")
        (self.repo / "app.py").write_text("VALUE = 1  # the defect\n", encoding="utf-8")
        (self.repo / "tests").mkdir()
        (self.repo / "tests" / "check.py").write_text(
            "import os, pathlib, sys\n"
            "fixed = pathlib.Path(os.environ['PE_FIXED']).exists()\n"
            "defect = pathlib.Path(os.environ['PE_DEFECT']).exists()\n"
            "print('fixed' if fixed else 'not fixed', 'defect' if defect else 'no defect')\n"
            "sys.exit(0 if (fixed and not defect) else 1)\n", encoding="utf-8")
        self.fixed = self.tmp / "FIXED"
        self.defect = self.tmp / "DEFECT"
        os.environ["PE_FIXED"] = str(self.fixed)
        os.environ["PE_DEFECT"] = str(self.defect)
        self.git("add", "-A")
        self.git("commit", "-q", "-m", "base")

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    # --- helpers ------------------------------------------------------------------------------------
    def git(self, *args) -> str:
        p = subprocess.run(["git", *args], cwd=str(self.repo), capture_output=True, text=True)
        self.assertEqual(p.returncode, 0, f"git {args} failed: {p.stderr}")
        return p.stdout.strip()

    def gate(self, *args) -> tuple[int, str]:
        p = subprocess.run([sys.executable, str(TOOL), *args], cwd=str(self.repo),
                           capture_output=True, text=True)
        return p.returncode, p.stdout + p.stderr

    def start(self, change_class="bugfix", extra=()):
        return self.gate("baseline", "--change-class", change_class, "--authorised", "app.py,tests/*", *extra)

    def phases(self, phases, kind="capability", label="bug"):
        for phase in phases:
            if kind == "equivalence":      # behaviour is preserved: the check is green on both sides
                self.fixed.write_text("1\n"); self.defect.unlink(missing_ok=True)
            elif phase == "before":
                self.defect.write_text("1\n"); self.fixed.unlink(missing_ok=True)
            elif phase == "after":
                self.fixed.write_text("1\n"); self.defect.unlink(missing_ok=True)
            elif phase == "reverted":
                self.defect.write_text("1\n")
            self.gate("falsify", "--label", label, "--kind", kind, "--cmd", CHECK, "--phase", phase)

    def end_fixed(self):
        """Leave the tree exactly as the after phase recorded it: the fix present, the defect gone."""
        self.fixed.write_text("1\n"); self.defect.unlink(missing_ok=True)

    def answer_dod(self):
        for item in ("dod.1", "dod.2", "dod.3", "dod.4", "dod.5", "dod.6"):
            self.gate("dod", "--item", item, "--answer", "answered with evidence")

    # --- the gate must be able to pass --------------------------------------------------------------
    def test_external_only_bugfix_is_not_certified(self):
        self.start()
        self.phases(["before", "after", "reverted"])
        # the working tree must end in the fixed state for scope/record purposes
        self.fixed.write_text("1\n"); self.defect.unlink(missing_ok=True)
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.candidate-not-attributable", out)

    def test_a_behaviour_preserving_refactor_passes_green_on_green(self):
        """The universal red/green rule was wrong: a refactor has no failing-before state to show."""
        self.start(change_class="refactor")
        self.phases(["before", "after"], kind="equivalence", label="suite")
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 0, out)

    # --- bugfix: the reversion is what proves the test detects the defect ---------------------------
    def test_a_bugfix_without_a_reversion_is_refused(self):
        """v3.5.2: a missing phase is reported as `gate.phase-missing` rather than as a class-specific id.

        One mechanism now covers every class, so the same omission cannot be satisfied in one class by a default
        exit code while another class refuses it.
        """
        self.start()
        self.phases(["before", "after"])
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.phase-missing", out)

    def test_a_bugfix_whose_before_run_already_passed_is_refused(self):
        """No defect was ever demonstrated: the check was green before the change as well."""
        self.start()
        self.fixed.write_text("1\n"); self.defect.unlink(missing_ok=True)
        for phase in ("before", "after", "reverted"):
            self.gate("falsify", "--label", "bug", "--cmd", CHECK, "--phase", phase)
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.evidence-not-demonstrated", out)

    def test_a_vacuous_reversion_is_refused(self):
        self.start()
        self.phases(["before"])
        # after and reverted both green: the check does not depend on the defect at all
        for phase in ("after", "reverted"):
            self.fixed.write_text("1\n"); self.defect.unlink(missing_ok=True)
            self.gate("falsify", "--label", "bug", "--cmd", CHECK, "--phase", phase)
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.reversion-not-detected", out)

    # --- editing the test into agreement ------------------------------------------------------------
    def test_editing_the_verification_input_between_phases_is_refused(self):
        self.start()
        self.phases(["before"])
        (self.repo / "tests" / "check.py").write_text(
            "import sys\nprint('always green now')\nsys.exit(0)\n", encoding="utf-8")
        self.fixed.write_text("1\n"); self.defect.unlink(missing_ok=True)
        self.gate("falsify", "--label", "bug", "--cmd", CHECK, "--phase", "after")
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.verification-inputs-changed", out)

    # --- the other classes -------------------------------------------------------------------------
    def test_new_behaviour_needs_a_rejection_case_too(self):
        self.start(change_class="new-behaviour")
        self.phases(["before", "after"], kind="capability", label="capability")
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.evidence-missing", out)

    def test_external_only_security_change_is_not_certified(self):
        self.start(change_class="security")
        self.phases(["before", "after"], kind="rejection", label="exploit")
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.candidate-not-attributable", out)

    # --- the invariants that hold for every class ----------------------------------------------------
    def test_scope_outside_the_authorised_set_is_refused(self):
        self.start(); self.phases(["before", "after", "reverted"])
        (self.repo / "unrelated.py").write_text("sneaky = True\n", encoding="utf-8")
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.scope-outside-authority", out)

    def test_a_diff_over_budget_without_a_recorded_reason_is_refused(self):
        self.start(extra=("--budget", "files=0,lines=0")); self.phases(["before", "after", "reverted"])
        (self.repo / "app.py").write_text("VALUE = 2  # fixed\n", encoding="utf-8")
        self.answer_dod()
        self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.budget-exceeded", out)

    def test_a_recorded_budget_reason_allows_the_larger_diff(self):
        # Isolate the budget exception from bugfix attribution: green/green refactor
        # with an actual repository edit between phases.
        self.start(change_class="refactor", extra=("--budget", "files=0,lines=0",
                                                  "--budget-note", "documented budget exception"))
        self.phases(["before"], kind="equivalence", label="suite")
        (self.repo / "app.py").write_text("VALUE = 2  # documented refactor\n")
        self.phases(["after"], kind="equivalence", label="suite")
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 0, out)

    def test_a_stale_record_is_refused(self):
        self.start(); self.phases(["before", "after", "reverted"]); self.end_fixed()
        self.answer_dod(); self.gate("record")
        self.gate("dod", "--item", "dod.1", "--answer", "changed after the record was written")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.record-stale", out)

    def test_unanswered_definition_of_done_is_refused(self):
        self.start(); self.phases(["before", "after", "reverted"]); self.end_fixed(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.dod-unanswered", out)

    def test_a_missing_baseline_is_refused(self):
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.baseline-missing", out)

    def test_the_gate_leaves_no_residue_in_the_working_tree(self):
        """The first version wrote `.pe-gate/` into the repository and forced a `.gitignore` edit; a judge then
        counted that residue against the change. The record now lives under git's own directory."""
        self.start(change_class="refactor")
        self.phases(["before", "after"], kind="equivalence", label="suite")
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 0, out)
        self.assertEqual(self.git("status", "--porcelain"), "", "the gate left residue in the working tree")
        state = subprocess.run([sys.executable, str(TOOL), "status"], cwd=str(self.repo),
                               capture_output=True, text=True).stdout
        self.assertIn("pe-gate", state)

    def test_a_workspace_without_version_control_is_refused(self):
        outside = self.tmp / "plain"; outside.mkdir()
        p = subprocess.run([sys.executable, str(TOOL), "baseline", "--change-class", "bugfix",
                            "--authorised", "x"], cwd=str(outside), capture_output=True, text=True)
        self.assertEqual(p.returncode, 2, p.stdout + p.stderr)
        self.assertIn("gate.no-vcs", p.stdout + p.stderr)

    def test_a_no_vcs_claim_is_recorded_and_a_false_one_is_refused(self):
        """Without version control the doctrine asks for a CLAIM; the gate must be able to store it, and must
        refuse the same claim inside a repository where it would be a lie."""
        outside = self.tmp / "plain2"; outside.mkdir()
        p = subprocess.run([sys.executable, str(TOOL), "baseline", "--change-class", "docs",
                            "--authorised", "notes.md", "--no-vcs-claim", "ls -a showed no .git"],
                           cwd=str(outside), capture_output=True, text=True)
        self.assertEqual(p.returncode, 0, p.stdout + p.stderr)
        self.assertIn("baseline-recorded-unverifiable", p.stdout)
        # no repository here, so the gate falls back to an in-directory record
        state = json.loads((outside / ".pe-gate" / "baseline.json").read_text(encoding="utf-8"))
        self.assertEqual(state["no_vcs_claim"], "ls -a showed no .git")
        inside, out = self.gate("baseline", "--change-class", "docs", "--authorised", "app.py",
                                "--no-vcs-claim", "there is no git here")
        self.assertEqual(inside, 2, out)
        self.assertIn("gate.no-vcs-claim-in-repository", out)

    def test_a_modified_tracked_file_is_named_correctly(self):
        """Adversarial review found the tool reporting `_tracked.txt` for a modified `z_tracked.txt`: the whole
        porcelain blob was stripped, eating the first line's leading status space and then a character of the path.
        An honest developer editing a tracked file was refused with the name of a file that does not exist."""
        (self.repo / "z_tracked.txt").write_text("one\n", encoding="utf-8")
        self.git("add", "-A"); self.git("commit", "-q", "-m", "add a tracked file")
        (self.repo / "z_tracked.txt").write_text("two\n", encoding="utf-8")
        self.start(extra=())  # authorises app.py and tests/*, not z_tracked.txt
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        reported = set(re.findall(r"gate\.scope-outside-authority: (\S+) changed", out))
        self.assertEqual(reported, {"z_tracked.txt"}, out)

    def test_a_committed_change_is_still_audited(self):
        self.start()
        (self.repo / "sneaky.py").write_text("committed = True\n", encoding="utf-8")
        self.git("add", "-A"); self.git("commit", "-q", "-m", "commit the unauthorised change")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.committed-since-baseline", out)

    def test_a_fix_reverted_after_the_evidence_was_recorded_is_refused(self):
        self.start(); self.phases(["before", "after", "reverted"])
        self.end_fixed(); self.answer_dod(); self.gate("record")
        self.defect.write_text("1\n")           # external-only toggles cannot certify a repository fix
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        # Fail preflight before executing an untrusted stored command: this
        # fixture never changed the candidate, so attribution itself is false.
        self.assertIn("gate.candidate-not-attributable", out)

    def test_a_blanket_scope_is_refused(self):
        code, out = self.gate("baseline", "--change-class", "bugfix", "--authorised", "*")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.scope-blanket", out)

    def test_a_legacy_in_tree_record_directory_is_reported_as_residue(self):
        self.start(); self.phases(["before", "after", "reverted"]); self.end_fixed()
        self.answer_dod(); self.gate("record")
        (self.repo / ".pe-gate").mkdir()
        (self.repo / ".pe-gate" / "notes.md").write_text("a private note\n", encoding="utf-8")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.state-in-tree", out)

    def test_an_empty_authorised_scope_is_a_usage_error(self):
        code, out = self.gate("baseline", "--change-class", "bugfix", "--authorised", " ")
        self.assertEqual(code, 3, out)
        self.assertIn("gate.scope-unspecified", out)

    def test_install_hook_writes_an_executable_refusing_hook(self):
        """v3.5.1 contract: the hook lands where GIT reads it and points at this gate's resolved path.

        The previous contract wrote `.githooks/pre-commit` — a directory git ignores unless `core.hooksPath`
        says otherwise — with a body of `exec python3 scripts/pe_gate.py check`, a path that only resolves if
        the gate were vendored into the repository. Measured consequence: `git commit` succeeded while `check`
        refused, and the hook itself exited 2 for "file not found" — the same code a refusal uses.
        """
        code, out = self.gate("install-hook")
        self.assertEqual(code, 0, out)
        hook = Path(self.git("rev-parse", "--absolute-git-dir")) / "hooks" / "pre-commit"
        self.assertTrue(hook.is_file(), f"the hook is not where git reads it: {out}")
        self.assertTrue(os.access(hook, os.X_OK), "hook is not executable")
        body = hook.read_text(encoding="utf-8")
        self.assertIn("pe_gate.py", body)
        self.assertIn(str(TOOL), body, "the hook must name this gate's resolved path")

    def test_the_stored_baseline_records_class_scope_and_budget(self):
        self.start(change_class="security", extra=("--budget", "files=2,lines=40"))
        gd = subprocess.run(["git", "rev-parse", "--absolute-git-dir"], cwd=str(self.repo),
                            capture_output=True, text=True).stdout.strip()
        state = json.loads((Path(gd) / "pe-gate" / "baseline.json").read_text(encoding="utf-8"))
        self.assertEqual(state["change_class"], "security")
        self.assertEqual(state["authorised"], ["app.py", "tests/*"])
        self.assertEqual(state["budget"], {"files": 2, "lines": 40})
        self.assertEqual(state["revision"], self.git("rev-parse", "HEAD"))


class RepoDefectCase(unittest.TestCase):
    """A fixture whose DEFECT LIVES IN THE REPOSITORY, as it does in real work.

    The original fixture kept its fixed/defect flags OUTSIDE the repository, so every phase ran against
    byte-identical content: no case could observe candidate binding at all, and the historical-after bypass
    (record `after` while the tree is still broken, then fix it afterwards) was invisible to this suite.
    Each case below names the finding it guards.
    """

    def setUp(self):
        self.build_repo()
        self.start()

    def build_repo(self):
        """A fresh repository, optionally re-created mid-test for the class/kind matrix."""
        if getattr(self, "tmp", None) is not None:
            shutil.rmtree(self.tmp, ignore_errors=True)
        self.tmp = Path(tempfile.mkdtemp(prefix="pe-gate-repo-"))
        self.repo = self.tmp / "repo"
        self.repo.mkdir()
        self.git("init", "-q")
        self.git("config", "user.email", "t@example.invalid")
        self.git("config", "user.name", "test")
        self.break_it()
        (self.repo / "check.py").write_text(SILENT_CHECK, encoding="utf-8")
        self.git("add", "-A")
        self.git("commit", "-q", "-m", "base with the defect")

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    # --- helpers ------------------------------------------------------------------------------------
    def git(self, *args) -> str:
        p = subprocess.run(["git", *args], cwd=str(self.repo), capture_output=True, text=True)
        self.assertEqual(p.returncode, 0, f"git {args} failed: {p.stderr}")
        return p.stdout.strip()

    def gate(self, *args) -> tuple[int, str]:
        p = subprocess.run([sys.executable, str(TOOL), *args], cwd=str(self.repo),
                           capture_output=True, text=True)
        return p.returncode, p.stdout + p.stderr

    def start(self, change_class="bugfix", extra=()):
        return self.gate("baseline", "--change-class", change_class, "--authorised", "app.py", *extra)

    def break_it(self):
        (self.repo / "app.py").write_text('VALUE = "BUG"\n', encoding="utf-8")

    def fix_it(self):
        (self.repo / "app.py").write_text('VALUE = "fixed"\n', encoding="utf-8")

    def phase(self, phase, kind="capability", label="bug", cmd="python3 check.py", extra=()):
        return self.gate("falsify", "--label", label, "--kind", kind, "--cmd", cmd, "--phase", phase, *extra)

    def answer_dod(self):
        for item in ("dod.1", "dod.2", "dod.3", "dod.4", "dod.5", "dod.6"):
            self.gate("dod", "--item", item, "--answer", "answered with evidence")

    def honest_bugfix(self, label="bug"):
        """before (broken) -> after (fixed) -> reverted (broken) -> leave the tree fixed."""
        self.break_it();  self.phase("before", label=label)
        self.fix_it();    self.phase("after", label=label)
        self.break_it();  self.phase("reverted", label=label)
        self.fix_it()

    def state_file(self, name: str) -> Path:
        return Path(self.git("rev-parse", "--absolute-git-dir")) / "pe-gate" / name

    # --- the release-blocking bypass -----------------------------------------------------------------
    def test_the_recorded_after_phase_must_have_passed(self):
        """before=1, after=1, reverted=1 passed the v3.5 gate once the tree was fixed afterwards.

        The class-checked `before` and `reverted` outcomes but never the recorded `after` outcome; the green
        re-run at check time re-executes the CURRENT tree, which is not the recorded phase.
        """
        self.break_it(); self.phase("before")
        self.phase("after")            # the tree is still broken: this after phase never passed
        self.phase("reverted")
        self.fix_it()                  # the live re-run at check time now succeeds
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.evidence-still-failing", out)

    def test_a_real_security_change_passes(self):
        # A real repository candidate transition, not a toggle in /tmp.
        self.build_repo(); self.start(change_class="security")
        self.break_it(); self.phase("before",kind="rejection",label="exploit")
        self.fix_it(); self.phase("after",kind="rejection",label="exploit")
        self.answer_dod(); self.gate("record")
        code,out=self.gate("check")
        self.assertEqual(code,0,out)

    def test_a_real_new_behaviour_passes(self):
        self.build_repo(); self.start(change_class="new-behaviour")
        for label,kind in (("feature","capability"),("rejects","rejection")):
            self.break_it(); self.phase("before",kind=kind,label=label)
            self.fix_it(); self.phase("after",kind=kind,label=label)
        self.answer_dod(); self.gate("record")
        code,out=self.gate("check")
        self.assertEqual(code,0,out)

    def test_a_silent_verifier_passes(self):
        """The removed `gate.identical-output` rule refused an honest fail/pass/fail whose verifier printed
        nothing. check.py here prints nothing at all: an exit status is an observable result."""
        self.honest_bugfix()
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 0, out)
        self.assertIn("PASS", out)

    # --- candidate binding ---------------------------------------------------------------------------
    def test_modifying_the_candidate_after_verification_is_refused(self):
        self.honest_bugfix()
        self.answer_dod(); self.gate("record")
        (self.repo / "app.py").write_text('VALUE = "fixed"\n# an edit nobody re-verified\n', encoding="utf-8")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.candidate-changed", out)

    def test_phases_recorded_out_of_order_are_refused(self):
        self.fix_it();   self.phase("after")     # recorded first
        self.break_it(); self.phase("before")    # recorded second
        self.phase("reverted")
        self.fix_it()
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.phases-out-of-order", out)

    def test_legacy_records_cannot_establish_their_order(self):
        """Fallback path: without sequence numbers and with equal timestamps, the order is unverifiable --
        not assumed. Wall-clock stamps are metadata, because a clock can step backwards."""
        self.honest_bugfix()
        self.answer_dod(); self.gate("record")
        path = self.state_file("falsify.json")
        state = json.loads(path.read_text(encoding="utf-8"))
        for run in state["bug"]["runs"].values():
            run.pop("seq", None)
            run["at"] = "2026-01-01T00:00:00+00:00"
        path.write_text(json.dumps(state), encoding="utf-8")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.state-invalid", out)

    # --- verification inputs -------------------------------------------------------------------------
    def test_a_root_level_verifier_edited_between_phases_is_refused(self):
        """Editing an out-of-scope oracle must refuse BEFORE running after.

        Older gates recorded `after` and only later detected a changed oracle
        digest; strict preflight now has the stronger refusal boundary.
        """
        self.break_it(); self.phase("before")
        (self.repo / "check.py").write_text("import sys\nsys.exit(0)\n", encoding="utf-8")
        self.fix_it()
        code, out = self.phase("after")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.scope-outside-authority", out)
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.scope-outside-authority", out)

    def test_a_root_level_verifier_edited_after_verification_is_refused(self):
        self.honest_bugfix()
        self.answer_dod(); self.gate("record")
        (self.repo / "check.py").write_text("import sys\nsys.exit(0)\n", encoding="utf-8")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.verification-inputs-stale", out)

    def test_a_declared_verification_input_that_does_not_exist_is_refused(self):
        code, out = self.gate("baseline", "--change-class", "bugfix", "--authorised", "app.py",
                              "--input", "fixtures/nope.json")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.input-missing", out)

    def test_a_declared_verification_input_that_cannot_be_read_is_refused(self):
        """An unreadable input must not degrade into a quietly smaller input set."""
        secret = self.repo / "fixtures"
        secret.mkdir()
        unreadable = secret / "inputs.json"
        unreadable.write_text('{"x": 1}\n', encoding="utf-8")
        self.git("add", "-A"); self.git("commit", "-q", "-m", "fixture")
        unreadable.chmod(0o000)
        self.addCleanup(lambda: unreadable.chmod(0o644) if unreadable.exists() else None)
        if os.access(unreadable, os.R_OK):       # running as root: the case cannot be staged
            self.skipTest("cannot make a file unreadable as this user")
        code, out = self.gate("baseline", "--change-class", "bugfix", "--authorised", "app.py",
                              "--input", "fixtures/inputs.json")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.input-unreadable", out)

    def test_editing_the_stored_evidence_invalidates_the_record(self):
        """A forged record: after an honest PASS, flip a recorded exit by hand.

        The completion record embeds a digest of the stored state, so tampering with the evidence makes the
        record stale -- and the live re-run of the command is a second, independent route to the same refusal.
        """
        self.honest_bugfix()
        self.answer_dod(); self.gate("record")
        self.assertEqual(self.gate("check")[0], 0)
        path = self.state_file("falsify.json")
        state = json.loads(path.read_text(encoding="utf-8"))
        state["bug"]["runs"]["before"]["exit"] = 0        # claim the defect was already fixed before the change
        path.write_text(json.dumps(state), encoding="utf-8")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.record-stale", out)

    def test_a_declared_verification_input_is_bound_into_the_evidence(self):
        """A declared fixture is content-bound, so editing it after the evidence was collected is refused."""
        fixtures = self.repo / "fixtures"
        fixtures.mkdir()
        expected = fixtures / "expected.json"
        expected.write_text('{"value": "fixed"}\n', encoding="utf-8")
        self.git("add", "-A"); self.git("commit", "-q", "-m", "add a fixture")
        self.start(extra=("--input", "fixtures/expected.json"))
        self.honest_bugfix()
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 0, out)
        expected.write_text('{"value": "anything the test likes"}\n', encoding="utf-8")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.verification-inputs-stale", out)

    # --- execution limits ----------------------------------------------------------------------------
    def test_a_timed_out_command_is_not_a_detected_defect(self):
        self.start(extra=("--timeout", "1"))
        self.break_it()
        for phase in ("before", "after", "reverted"):
            code, out = self.gate("falsify", "--label", "slow", "--cmd", "sleep 30", "--phase", phase)
            self.assertEqual(code, 0, out)
            self.assertIn("exit=timeout", out)
        self.honest_bugfix()
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.timeout-not-falsification", out)

    # --- v3.5.2: the three independently reported bypasses ------------------------------------------
    CLASS_PHASES = (
        ("bugfix", "capability", ("before", "after", "reverted")),
        ("new-behaviour", "capability", ("before", "after")),
        ("new-behaviour", "rejection", ("before", "after")),
        ("refactor", "equivalence", ("before", "after")),
        ("docs", "equivalence", ("before", "after")),
        ("performance", "equivalence", ("before", "after")),
        ("security", "rejection", ("before", "after")),
    )

    def test_no_class_accepts_a_missing_required_phase(self):
        """The INVARIANT behind PE-351-01, tested across the whole state machine rather than one exploit.

        For every class and every evidence label it owes, each required phase is omitted in turn and the gate
        must refuse. The previous defect was a per-branch default exit code, so a fix aimed only at the reported
        class would have left the same hole one branch over; this walks all of them.
        """
        for change_class, kind, needed in self.CLASS_PHASES:
            for omitted in needed:
                with self.subTest(change_class=change_class, kind=kind, omitted=omitted):
                    self.build_repo()
                    self.start(change_class=change_class)
                    for phase in needed:
                        if phase == omitted:
                            continue
                        if phase == "after":
                            self.fix_it()
                        else:
                            self.break_it()
                        self.phase(phase, kind=kind, label="evidence")
                    self.answer_dod(); self.gate("record")
                    code, out = self.gate("check")
                    self.assertEqual(code, 2, f"{change_class}/{kind} recorded without {omitted}: {out}")
                    self.assertIn("gate.phase-missing", out)

    def test_a_security_change_without_a_before_phase_is_refused(self):
        """PE-351-01 seed: only an `after` was recorded.

        The branch read `r.get("before", {}).get("exit", 1)`, so the absence inherited a default of 1 -- which
        read as "the prohibited action was demonstrated" -- and the gate returned PASS for a security change with
        no before phase at all.
        """
        self.start(change_class="security")
        self.fix_it()                      # the simulated vulnerability is already gone
        self.phase("after", kind="rejection", label="exploit")
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.phase-missing", out)

    def test_a_new_behaviour_rejection_without_a_before_phase_is_refused(self):
        """The same default applied to every `rejection` label, so the fix is checked class by class."""
        self.start(change_class="new-behaviour")
        self.break_it(); self.phase("before", label="capability")
        self.fix_it();   self.phase("after", label="capability")
        self.phase("after", kind="rejection", label="rejects")
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.phase-missing", out)

    def test_a_reversion_recorded_before_the_fix_is_refused(self):
        """PE-351-02 seed: reverted, then before, then after.

        Ordering was enforced for before < after only, so this was certified even though no post-fix reversion
        ever happened: the "reversion" ran before the fix existed.
        """
        self.break_it(); self.phase("reverted")
        self.phase("before")
        self.fix_it();   self.phase("after")
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.phases-out-of-order", out)

    def test_a_verifier_that_mutates_the_candidate_is_refused(self):
        """PE-351-03 seed: a time-of-check/time-of-use hole.

        Candidate and input fingerprints were taken BEFORE the live re-runs and never after them, so a verifier
        that rewrote the implementation while `check` ran returned PASS, exit 0, `diff=0 file(s)` -- leaving the
        deliverable broken and certified.
        """
        marker = self.tmp / "trigger"
        (self.repo / "check.py").write_text(MUTATING_CHECK.format(marker=str(marker)), encoding="utf-8")
        self.git("add", "-A"); self.git("commit", "-q", "-m", "the verifier under test")
        self.start()
        self.honest_bugfix()
        self.answer_dod(); self.gate("record")
        self.assertEqual(self.gate("check")[0], 0)       # honest until the marker exists
        marker.touch()                                    # the verifier now breaks the tree as it certifies it
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.post-check-mutation", out)
        self.assertIn("BUG", (self.repo / "app.py").read_text(encoding="utf-8"),
                      "the probe's own premise: the run really did break the tree")

    def test_a_benchmark_without_a_reported_spread_is_refused(self):
        """--repeats is the agent's own count; with no spread, the stability claim cannot be checked at all."""
        self.start(change_class="performance")
        code, out = self._performance_phases(120.0, 98.0, spread=False)
        self.assertEqual(code, 2, out)
        self.assertIn("gate.evidence-missing", out)

    # --- performance evidence ------------------------------------------------------------------------
    def _performance_phases(self, before_value, after_value, spread=True):
        self.fix_it()
        for phase in ("before", "after"):
            self.phase(phase, kind="equivalence", label="suite")
        common = ("--metric", "p95_ms", "--unit", "ms", "--direction", "lower", "--tolerance", "1.0",
                  "--repeats", "3")
        spread_args = ("--spread", "0.4") if spread else ()
        self.phase("before", kind="benchmark", label="bench",
                   extra=common + spread_args + ("--value", str(before_value)))
        self.phase("after", kind="benchmark", label="bench",
                   extra=common + spread_args + ("--value", str(after_value)))
        self.answer_dod(); self.gate("record")
        return self.gate("check")

    def test_a_performance_label_without_measurements_is_refused(self):
        self.start(change_class="performance")
        self.fix_it()
        for phase in ("before", "after"):
            self.phase(phase, kind="equivalence", label="suite")
            self.phase(phase, kind="benchmark", label="bench")
        self.answer_dod(); self.gate("record")
        code, out = self.gate("check")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.evidence-missing", out)

    def test_a_measured_performance_improvement_passes(self):
        self.start(change_class="performance")
        code, out = self._performance_phases(120.0, 98.0)
        self.assertEqual(code, 0, out)

    def test_a_performance_claim_inside_the_tolerance_is_refused(self):
        self.start(change_class="performance")
        code, out = self._performance_phases(120.0, 119.5)
        self.assertEqual(code, 2, out)
        self.assertIn("gate.benchmark-no-improvement", out)

    # --- the hook, as git actually uses it -----------------------------------------------------------
    def test_an_installed_hook_blocks_a_real_commit_while_the_gate_refuses(self):
        code, out = self.gate("install-hook")
        self.assertEqual(code, 0, out)
        hook = Path(self.git("rev-parse", "--absolute-git-dir")) / "hooks" / "pre-commit"
        self.assertTrue(hook.is_file(), out)
        self.assertTrue(os.access(hook, os.X_OK), "hook is not executable")
        self.assertIn(str(TOOL), hook.read_text(encoding="utf-8"))
        self.fix_it()
        self.git("add", "-A")
        p = subprocess.run(["git", "commit", "-m", "should be blocked"], cwd=str(self.repo),
                           capture_output=True, text=True)
        self.assertNotEqual(p.returncode, 0, f"the commit was accepted: {p.stdout}{p.stderr}")
        self.assertIn("REFUSED", p.stdout + p.stderr)

    def test_hook_installation_leaves_someone_elses_hook_alone(self):
        hooks = Path(self.git("rev-parse", "--absolute-git-dir")) / "hooks"
        hooks.mkdir(parents=True, exist_ok=True)
        foreign = hooks / "pre-commit"
        foreign.write_text("#!/bin/sh\necho mine\n", encoding="utf-8")
        code, out = self.gate("install-hook")
        self.assertEqual(code, 2, out)
        self.assertIn("gate.hook-exists", out)
        self.assertIn("echo mine", foreign.read_text(encoding="utf-8"))
        code, out = self.gate("install-hook", "--force")
        self.assertEqual(code, 0, out)
        self.assertNotIn("echo mine", foreign.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main(verbosity=2)
