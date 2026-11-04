# CHANGES — pragmatic-engineering 3.4.0-rc.1

**Status:** CURRENT for rc1 of 3.4.0. Supersedes `CORRECTIONS-V3.3-RC1.md` for the revision in this directory;
that file stays untouched as the record of the 3.3.0-rc.1 correction pass.

**What prompted this revision.** 3.3.0-rc.1 was reviewed by an external model (ChatGPT, temporary chat, through
the owner's own browser, 2026-10-15) against its own stated purpose. Its verdict was 5/10 with a specific
objection: almost every instruction permits discretionary interpretation, so an agent can comply rhetorically
without changing its behaviour. It named three missing obligations (a mandatory pre-edit baseline, a
falsification requirement for fixes, an evidence-bearing completion record) and a set of lines to delete as
noise. Sympathetic evidence came from our own harness: four leaf agents ended runs "completed" with no artifact
at all, and one control arm in the T1 pilot declared a failure pre-existing *from reading the code path* rather
than demonstrating it on the pre-change tree.

**Shape of the change:**
1. `SKILL.md` — every obligation restated so a reviewer who was not present can tell compliance from
   non-compliance by reading the transcript; the four new obligations added with references for depth.
2. `references/workspace-safety.md` — pre-edit baseline obligation.
3. `references/testing.md` — falsification obligation.
4. `references/self-review.md` — evidence-bearing completion record.
5. `references/decision-policy.md` — never claim a procedure you did not load.
6. `evals/v3.4-operational-evals.md` — new eval set for the four obligations.
7. Two lines the audit found unverifiable deleted, and the audits themselves shipped in the package.

**What this revision does NOT claim.** No behavioural evidence. The eval sets measure written decision-path
coverage against an authored rubric, not what a model does. The T1 pilot (one task, two arms) is a harness
proof, and its result is recorded beside this package, not as proof of this revision.

## Verification actually run (2026-10-15, on the assembled rc1)

- `scripts/validate_skill.py` → `VALID`, exit 0; `runtime_documents=22`, `runtime_references=21`,
  `markdown_files=41`, `total_files=44`.
- `scripts/regression_suite.py` → `14/14 regressions passed`, exit 0 (12 cases at assembly, plus the two added when the bypass below was fixed).
- `scripts/rc1_holdout.py` → `11/11 holdout cases passed`, exit 0 — **after one test was repaired**: the case
  `index_version_disagreement_is_reported` hard-coded `**Version:** 3.3.0-rc.1` in its mutation, so once this
  revision bumped the package version the mutation no longer changed anything and the case reported VALID (a
  false negative of the test, not a defect in the package: re-run by hand, `28/28` score unchanged). The
  mutation is now version-agnostic **and asserts that its own mutation landed** — a mutation harness that
  cannot tell "I changed nothing" from "the package passed" is the failure this revision is about. Same for
  the two expectations that named the superseded revision.
- Independent adversarial reviewers on the assembled revision — one on **operability**, one on the
  **machinery**. The operability review produced no artifact on its first attempt (the same leaf failure this
  package's own change record describes) and was re-run as a real agent session; its output is
  `verify/R1-operability.md` in the work area. The machinery review produced `verify/R2-mechanism.md`, and it
  found a real bypass, now fixed:
  - **Bypass (fixed).** The validator's route pattern matched only `` `references/x.md` ``. Written as
    `` `./references/testing.md` `` — a form a reader can click — the edge was not matched, so that document
    left the validated graph and a deliberately broken reference inside it still produced `VALID`, exit 0.
    The pattern now accepts the optional `./` prefix and a case-varied extension and normalises before
    resolving; two regressions (`dotted_route_form_keeps_target_reachable`,
    `uppercase_extension_route_is_checked`) cover it, and against the pre-fix validator they FAIL (12/14) while
    the fixed one passes 14/14 — so the cases have teeth rather than passing either way.
  - R2 also noted the holdout's `valid_anchored_link_passes` can pass vacuously (unlike the repaired
    version-disagreement case, it does not assert that its mutation landed). Left open and named here.
  - Documentation defects R2 found are corrected: this file's placeholders, and `INDEX.md`'s inherited
    "Diff V3.2 → rc1" paragraph, which is now labelled as describing 3.3.0-rc.1 rather than this directory.

## Deliberate deviations from the workstream proposals

- The four additions were placed where their markdown level requires, not literally "directly under the anchor
  heading": a `###` addition (workspace-safety, self-review) is appended at the END of its parent section so it
  does not push the existing prose under a new subsection, and a `##` addition (testing, decision-policy) is
  inserted immediately BEFORE the named anchor heading so the anchor section keeps its own body. The anchor
  files' existing text is otherwise unchanged.
- `SKILL.md` is 9.1 KB against 3.3.0-rc.1's 7.3 KB: it adds four obligations and removes the rules that could
  be satisfied rhetorically, which is a net increase. If this revision is ever pinned into every session, that
  cost should be re-measured against the margin of the eval results rather than assumed.

## Provenance

- **Tree identity.** A file cannot contain its own hash, so the installed tree's identity is recorded over
  every file except this change record: `sha256` of the sorted per-file digests =
  `4f8db5157c1cd394f110db5047d4343b3b95a905ce06fe60b135eb4451e353d6`. Gates re-run on the installed tree: validator `VALID` (22 runtime documents, 21 references,
  41 markdown files, 44 files), regression suite `14/14`, holdout `11/11`.
- Base: the live installed package, frozen as a byte copy before any edit — tree sha256
  `c816ae15343e3f56a28b5154efe25224b61f70393f22347230e9958d414e9837`, recorded in `BASE.md` of the work area.
  The installed tree after this revision is `edebdab3355c1367febbd13000a33217d9acc8775d3e3325b2876fd0f1b1ff11`. The 3.3.0-rc.1 release copy and its dist zip stay where they are.
- Reports in the live package that describe 3.3.0-rc.1 are HISTORICAL for this revision and are not edited.

## Audit findings — what this revision acted on, and what stays open

The revision is built on two independent ambiguity audits of the superseded revision (all three shipped in this
directory: `AUDIT-V3.4-RHETORIC-SKILL.md` 45 rules flagged, `AUDIT-V3.4-RHETORIC-REFERENCES.md` 63, and
`AUDIT-V3.4-RHETORIC-MODES.md` 96). Their structural finding is the reason this revision looks the way it does: the fix is not to
write new principles but to attach a *recording obligation* to the principles already there, and to reuse the
concrete sibling text the package already contains.

**Acted on:**

- every rule in `SKILL.md` rewritten so compliance is checkable from a transcript (the four recorded
  obligations, plus the recording hooks the audit asked for: the named pre-read file set, the assumption list,
  the cited authorising instruction, the per-file scope account, the doc-versus-diff check, the stop note);
- the audit's rule that a failure may only be called pre-existing by **demonstrating** it on the pre-change
  revision — now a library rule, and the one the T1 pilot independently produced;
- two DELETE verdicts applied: `decision-policy.md`'s "not a substitute for judgment" and
  `repository-truth.md`'s "do not select a dependency because it is fashionable" (a rule no reviewer can prove
  violated);
- the four additions from `w2-references/additions.md`, which also retire the flagged weakness in
  `workspace-safety.md`, `testing.md`, `self-review.md` and `decision-policy.md`.

**Deliberately open (not silently dropped):**

- the remaining ~60 flagged rules in the five reference files and the eight mode files are still phrased as
  principles. Rewriting them is a larger change than this revision, and the audits are shipped here so the work
  is scheduled from evidence rather than rediscovered;
- the audit of the eight `references/modes/` files did not produce a usable artifact on two leaf attempts; run
  as a real agent session it landed with **96 flagged rules** and ships here as
  `AUDIT-V3.4-RHETORIC-MODES.md`. None of its findings are folded into the doctrine in this revision — the mode
  files are unchanged;
- `references/pragmatic-principles.md` (the 1..100 list) is untouched: the numbering is an invariant the
  validator enforces, and rewriting 100 principle statements is its own revision with its own evals.
