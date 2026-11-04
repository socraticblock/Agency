**Status:** CURRENT for 3.4.0-rc.1 — an adversarial review OF this revision, run on the assembled candidate.
Its findings drove the edits recorded in `CHANGES-V3.4-RC1.md`; the claim it refutes (that every core rule had
been made transcript-checkable) is corrected there rather than here.

# R1 — Operability review: pragmatic-engineering 3.4.0-rc.1

**Brief:** `v3.4/R1.md` — attack the doctrine's OPERABILITY, not its prose.
**Candidate:** `/home/socraticblock/hermes-workspace/pragmatic-engineering/v3.4/build`
  - tree sha256 `d2223a547c5f046cfc2a0a60057d0ea6a0aa39ef9cf7d74bb4f5ce5d1a4b41e5`
  - `SKILL.md` sha256 `c57613ac0c3af0e7dac094289c9082e10ba95e8299b81adb4c0a8da422c199f2` (9,083 bytes / 133 lines)
**Predecessor for comparison:** `v3.4/base/SKILL.md` (7,341 bytes) and `v3.4/build/CHANGES-V3.4-RC1.md`.
**Read in full:** `SKILL.md`; all 17 files under `references/` (incl. the 8 `references/modes/` files); `evals/v3.4-operational-evals.md`; `CHANGES-V3.4-RC1.md`; `INDEX.md`; `assets/*.md` (4 files); `scripts/*.py` skimmed for what they gate.
**Date of review:** 2026-10-15. **No writes inside `build/`** — all mutation, if any, went to `/tmp/r1-review`.

**Criterion used throughout.** A rule is *transcript-checkable* iff a reviewer who was not present can decide
compliance from the transcript + workspace alone, without re-doing the work. Two ways to fail:
  - **class A — no artefact required**: nothing must appear, so the reviewer has nothing to check;
  - **class B — artefact required, content unfalsifiable**: presence is checkable, compliance is not, because
    the rule's own terms ("material", "where practical", "in proportion", "what you touch", "adequately",
    "pays for it") are self-assessed by the agent whose compliance is in question.
Ties score as NOT checkable. This is the adversarial reading; the candidate's own preamble invites it
(`SKILL.md` L22-24: "Each rule is written so a reviewer who was not present can tell compliance from
non-compliance from the transcript and the workspace").
**Granularity.** One rule = one directive statement a compliant agent must satisfy: bullet/numbered items in
`references/` (script-censused), requirements in `SKILL.md` (its four obligations are counted as units *plus*
the four independent sub-requirements inside them — see 1.1/1.2). Enumerations ("unit and scale; valid range;
…"), permission lists, pure question prompts and routing-table lines are excluded from the directive count
where they are the *content* of the directive above them; where excluded, it is said so explicitly.

## 1. Rules a reviewer still cannot tell compliance from non-compliance

### 1.1 SKILL.md — 11 of 43 assessed rule statements

The change record claims "every rule in `SKILL.md` rewritten so compliance is checkable from a transcript".
That claim does not hold for 11 statements (7 bullet rules + 4 obligation sub-requirements). Each is quoted,
with the operational form it still lacks.

1. `"List material assumptions as checked / unchecked, and state the risk of acting on any unchecked one."` (L51)
   — lacks: a completeness test. Nobody else can name the load-bearing assumption that was omitted, so an
   empty or partial list is indistinguishable from a complete one. Class B.
2. `"Start from the cheapest check that could falsify the hypothesis at hand, and record why each broader check was included or skipped."` (L55-56)
   — lacks: any falsifiable definition of "cheapest". Worse operationally: the artefact demanded is a
   justification of the checks that *were* run, so the record grows with broader work and stays silent about
   the cheaper check that was never conceived. Class B.
3. `"State the boundary semantics of what you touch: units, ranges, precision, encoding and normalisation, missing values, resource limits."` (L64-65)
   — lacks: scope and an applicability test. "What you touch" is the agent's own partition; a transcript
   stating two of six categories reads identically to one that stated all six where they apply. Class B.
4. `"Update durable documentation when a contract, behaviour, configuration or operating procedure changes, and check the doc surfaces against the code diff…"` (L68-69)
   — lacks: a definition of "durable documentation"/"doc surfaces", and any required artefact — the check
   itself is never recorded, so nothing distinguishes "checked and updated" from "never considered it".
   Class A.
5. `"Broaden verification in proportion to blast radius and the cost of being wrong, and test behaviour at the narrowest useful level."` (L77-78)
   — lacks: an absolute floor and any record. "In proportion" justifies any breadth including none, and the
   routed file forbids the only obvious floor (`references/testing.md`: "Do not encode a universal numeric
   test-pyramid ratio"). Class A.
6. `"Stop when the outcome is met and adequately verified: RECORD the level, the results…"` (L85)
   — lacks: the threshold for "adequately". The record is mandatory once the agent decides to stop; nothing in
   the rule lets a reviewer say the stop decision was premature. Class A. (Also contradicts `self-review.md`'s
   stop check — see 3.2.)
7. Definition-of-done item `"…failure, security, compatibility, migration and rollback concerns were considered where relevant, documentation and configuration remain truthful…"` (L130-131)
   — lacks: a record of the consideration ("considered" is unobservable), and any doc-diff anchor for
   "remain truthful". Class A.
8. Obligation 1, `"name the files and behaviours this task authorises"` (L29-30)
   — lacks: an operational form for *behaviours* (only files are checkable) and any form for a non-Git
   workspace: the revision requirement is stated as `Git: git status --short, git rev-parse HEAD`. In a
   Mercurial/SVN/jj checkout the obligation is unevaluable, not failed. Class B.
9. Obligation 2, `"For new behaviour, name the observation that would show it wrong, and make it where practical."` (L33-34)
   — lacks: a test for "practical". The escape hatch is one word wide and the branching (fix vs new behaviour)
   is chosen by the same agent being assessed. Class B.
10. Obligation 3, `"A claim never outranks its evidence."` (L39)
    — lacks: any oracle for ranking claims against evidence. It also has no home in the routed form:
    `references/self-review.md`'s "Completion record (evidence-bearing)" block lists five items and **omits
    the evidence level that this obligation requires** (see 3.2). Class A.
11. Evidence ladder, `"E3 — Integrated execution: relevant components exercised together in a controlled runtime"` / `"E4 — Target-environment: verified in the intended deployment/runtime environment"` (L92-97)
    — lacks: a boundary between E2/E3 and E3/E4. Because L83 requires every claim to carry a level, the seam
    is operative: a local docker-compose run can be tagged E4 and no transcript refutes the tag. Class B.

Near-miss, **not** counted (reader may add it): the second clause of L106, `"…then read only what the task
needs"` — its first clause (`RECORD the files you load`) is checkable, so the unit counts as checkable.

### 1.2 The four recorded obligations: what is still missing inside them

| Obligation | What a reviewer can now check | What is still missing |
|---|---|---|
| Baseline | that a status line + revision string exists in the transcript before the first write; that status was re-run before finalising | the baseline is not bound to the workspace that is edited; no requirement that it be command output rather than paraphrase; "behaviours" has no form; non-Git form absent; the exception clause ("named as an exception") needs no justification |
| Falsifier | that a check was run before and after, with both outcomes recorded; that an unrunnable check is declared unverified | that the pre-change run was on the **pre-change tree** (no revision string is attached to either run); that the check that failed is the check that passed; that the pre-change failure was the claimed one (not an unrelated red) |
| Completion record | that five items appear; that "implementation complete" and "verified correct" are two sentences | that "not verified" is non-empty when it should be (the record may say "none" while the DoD items were never reached); that "verified correct" is scoped to the checks actually run; the routed written form `assets/handoff-template.md` has no field for the baseline revision or the changed-file list at all |
| Procedure compliance | that no compliance claim is made for an unloaded procedure; that the loaded-file list exists | that a loaded procedure was *applied* — the obligation's own bar is "unless you loaded it in this task"; and the trigger table ("Load these when their trigger applies") is unenforceable because the trigger evaluation itself is never required in the record |

### 1.3 Reference and mode files — per-file census

Rule units were censused by script (top-level bullets + numbered items; plus paragraph-level directives, minus
"Use when…" scope headers). "Directives" = assessed rules; "checkable" = the named exceptions in 1.4;
"not" = the count that answers this review's question. See §4 for the exact commands.

| file | directives | checkable | not transcript-checkable |
|---|---|---|---|
| `SKILL.md` | 43 | 32 | **11** |
| `references/pragmatic-principles.md` | 101 | 1 | 100 |
| `references/workspace-safety.md` | 40 | 11 | 29 |
| `references/boundary-correctness.md` | 28 | 4 | 24 |
| `references/self-review.md` | 31 | 8 | 23 |
| `references/modes/automation.md` | 23 | 1 | 22 |
| `references/modes/architect.md` | 23 | 2 | 21 |
| `references/testing.md` | 31 | 13 | 18 |
| `references/reliability.md` | 16 | 0 | 16 |
| `references/modes/build.md` | 19 | 3 | 16 |
| `references/modes/debug.md` | 20 | 4 | 16 |
| `references/authority-boundaries.md` | 31 | 16 | 15 |
| `references/repository-truth.md` | 18 | 6 | 12 |
| `references/modes/review.md` | 17 | 5 | 12 |
| `references/modes/security.md` | 11 | 0 | 11 |
| `references/modes/performance.md` | 15 | 5 | 10 |
| `references/decision-policy.md` | 8 | 2 | 6 |
| `references/modes/refactor.md` | 10 | 4 | 6 |
| **total** | **485** | **117** | **368** |

Representative uncheckable forms, quoted (<25 words each), one per file group:
- `reliability.md`: `"Prefer, as appropriate: a transaction; an atomic replace/write; an idempotent operation;"`
  — lacks: what makes one appropriate; a reviewer cannot tell a wrong choice from a discretionary one.
- `boundary-correctness.md`: `"For important values define, as applicable: unit and scale; valid range; signed/unsigned behavior;"`
  — lacks: which values are "important" and how "as applicable" is decided.
- `modes/automation.md`: `"After an action, obtain environmental evidence before deciding the next action."`
  — lacks: what counts as environmental evidence and any record of it per step.
- `modes/security.md`: `"Validate at trust boundaries."` / `"Minimize permissions and network reach."`
  — lacks: the boundary inventory and any per-boundary record, so omission is invisible.
- `pragmatic-principles.md` #7: `"Watch the whole system. Local optimization can damage the larger product."`
  — lacks: anything observable; it is an attitude, and the file says so ("should change agent behavior, not
  just decorate prompts") without saying how that is checked.

Two structural notes for this table:
- 100 of the 368 are the paraphrase list in `pragmatic-principles.md`, which the change record explicitly
  leaves untouched ("rewriting 100 principle statements is its own revision"); 114 more are the eight
  `references/modes/` files, whose audit "did not produce a usable artifact on two attempts" and whose later
  output "is NOT reflected in this revision". So ~58% of the total is deferred by the record itself, and 214
  of the 368 sit in files the revision knowingly did not rewrite. The number that is *not* deferred by any
  statement in the record is 154 (SKILL.md 11 + the nine non-mode reference files 143).
- Because the modes were never audited into the package, the census above for them is mine, not theirs; the
  audit's own numbers (45 flagged in `SKILL.md` + 4 files, 63 in 5 reference files = 108) are a subset at a
  different granularity and cannot be subtracted from mine.

### 1.4 The checkable exceptions (so the count is auditable)

Every rule I scored as transcript-checkable, by file — presence here is what makes the §1.3 count falsifiable:
- `SKILL.md` (32): outcome sentence repeated with deviation named (L46-47); pre-read file set named (L48-49);
  authoritative source named for generated/vendored files (L49-50); authorising instruction cited for every
  consequential action (L52-54); per-file scope account against the diff (L60-61); authoritative copy named
  before editing either copy (L61); retry/sleep/catch-all/fallback bounded and named (L66-67); verification
  artefact never weakened, and "say so" when expected behaviour legitimately changed (L73-74); pre-existing
  failure demonstrated on the pre-change revision (L75-76); claims tagged with a level, unlabelled = E0 (L83);
  DoD answered with evidence not "yes" (L84); level/results/deferred touches recorded at the stop check (L85);
  loaded files recorded (L106); the 9 routing lines (L108-119, checkable as "did you load the file for this
  trigger"); obligation 1 recorded status+revision before the first write; obligation 1 re-run status and
  stop-on-overlap before finalising; obligation 2 reproducer run before and after with both outcomes;
  obligation 2 unrunnable ⇒ unverified, never passing; obligation 3's five record items; obligation 4's
  no-claim-without-load bar; and the four obligation headers themselves.
- `workspace-safety.md` (11): baseline status+revision bullet; authorised files bullet; the "record in the
  transcript" lead-in; the do-not-write-through-a-changed-path rule; the seven git-safety prohibitions
  (`reset --hard`, destructive `clean`, force-checkout, dropping stashes, rewriting shared history, wholesale
  ours/theirs, discarding unrelated modifications); `re-check status before consequential writes`;
  `inspect task-relevant status/diff`; `ensure evidence was gathered against the final code state`; `state
  clearly if workspace concurrency prevented strong verification`; the "run migrations" entry of the
  command-side-effect checklist.
- `testing.md` (13): the Falsification paragraph; `add a failing test or durable reproducer`; `see the new
  check pass`; `run nearby existing checks`; the five Validate-the-verifier bullets; `determine whether the
  product contract intentionally changed`; `inspect the semantic difference`; `make the reason visible in the
  change`; `Do not delete assertions, broaden tolerances, skip tests, regenerate snapshots…`; restore
  environment state on failure; quarantine flakiness only with visibility and a plan.
- `self-review.md` (8): the five completion-record items (baseline revision, exact changed files, one testable
  sentence, commands with observed results, deliberately-not-verified) — note the *evidence level* is not
  among them; `verification performed and evidence level` in the Handoff list; the two-distinct-claims rule;
  the E0–E5 self-question.
- `repository-truth.md` (6): verify generator/version/configuration; review the generated diff; determine
  whether snapshot behaviour intentionally changed; inspect the semantic diff; review lockfile changes for
  unexpected transitive movement; never mass-update expected output to go green.
- `authority-boundaries.md` (16): the 14 consequential-action entries (observable actions), plus
  `Never print secrets to prove they exist` and `Do not write credentials into source, prompts, logs…`.
- `decision-policy.md` (2): `Record unrelated debt rather than silently expanding the task`; the Procedure
  compliance paragraph.
- `boundary-correctness.md` (4): check overflow/underflow/divide-by-zero/narrowing; make unit conversions
  explicit and test boundary values; test missing/malformed/conflicting configuration values; restore
  process-global state that tests mutate.
- `modes/` (24): architect `Record why the decision exists`, `Test representative old and new data paths`;
  automation `human approval boundary…`; build `add or update behaviour-focused tests`, `run focused
  verification first`; debug `capture the exact symptom`, `reproduce reliably`, `verify the fix plus
  neighboring behavior`, the prohibited-shortcuts list; performance `define the metric`, `capture a comparable
  baseline`, `profile the bottleneck`, `re-run correctness checks`, `document deliberate non-obvious
  optimization`; refactor `define the structural problem`, `establish behavioral evidence`, `add
  characterization tests`, `run focused checks`; review's five finding-quality fields.
- `pragmatic-principles.md` (1): #91 `Explain known failures and separate caused, pre-existing, and unknown
  failures` — checkable only because it duplicates the completion-record rule; the other 99 principles have no
  such hook.

## 2. The four recorded obligations: cheapest way to satisfy while doing the wrong thing

### 2.1 Baseline

**Cheapest false satisfaction (four routes, any one suffices).**
(a) Take the baseline in a different repository than the one you edit — or in a copy of it. The rule says
"Before the first write to a version-controlled workspace", never *that* workspace; `cd /tmp/r1-review/build
&& git status --short && git rev-parse HEAD` produces a perfect, truthful baseline line for work done
elsewhere, and the transcript reads compliant.
(b) Use the standing self-exemption: decide the target is not "a version-controlled workspace" (an untracked
subdirectory, `/tmp`, a scratch path, a nested clean repo) and the obligation never fires. No line is missing,
so nothing looks wrong.
(c) Write the authorised-scope line loosely — "the files needed to fix the reported bug" — so any file touched
later falls inside it by construction.
(d) Use the rule's own escape: `SKILL.md` L60-61 makes any changed file compliant if it is "reverted or named
as an exception". No justification is required, so an out-of-scope refactor becomes compliant with one word.
**What would close it.** (i) Bind the baseline to the workspace root: the record must name the path and the
command line as typed, and the command must be run there (copy-paste output, not a paraphrase — the revision
requires the record but never says the *output*, which is what a reviewer can verify). (ii) Give the reviewer
the mechanical test: `changed files (git diff --stat) ⊆ authorised ∪ exceptions`. (iii) Require each exception
to name the authorised outcome it serves, and to be reverted when it serves none. (iv) When there is no
version control, require that to be recorded as a claim with the check that showed it.

### 2.2 Falsifier

**Cheapest false satisfaction.**
(a) Run *some* red before and *some* green after. The rule binds "a reproducer or failing behavioural test"
to "the same check" after the change, but nothing requires the pre-change observation to name the assertion
that flipped, nor to be tied to a revision — so an unrelated suite failure, a typo'd path, or a red test in a
different package pays for the whole obligation.
(b) Choose the weaker branch: the rule's two branches are chosen by the agent. A fix re-labelled "new
behaviour" needs only one sentence (`name the observation that would show it wrong`) and then `make it where
practical` licenses omitting the check entirely — while the eval set's stricter reading (case 6: "a test that
passes on the old code is not a falsifier") lives in `evals/`, not in the rule text.
(c) Write a regression test after the fix and call it the reproducer: the transcript shows a new test that
passes, which is what `references/testing.md`'s regression workflow steps 2 and 4 actually require.
**What would close it.** (i) Attach the revision (or the `git stash`/checkout state) to *each* run, so the
pre-change observation is provably on the pre-change tree — the baseline obligation already teaches this form;
(ii) require the record to quote the failing assertion or the expected-vs-actual that flipped; (iii) require
the identical command string before and after; (iv) make the "where practical" branch name the blocker *and*
the command that was attempted — the rule already knows how to handle a check that cannot run ("say so and
call the result unverified"), so this is one clause away from being closed.

### 2.3 Completion record

**Cheapest false satisfaction.** The obligation is a form, and every field can be filled honestly and empty:
`git rev-parse HEAD` output for the baseline, `git status --short` for the file list, a paraphrase of the
request as the one testable sentence, the green test run as the commands, `E2` as the level, and
"not verified: none" for the last field. Nothing requires the not-verified list to be non-empty, and nothing
cross-checks it against the Definition of done's "where relevant" items — so a record that contains no
information and no false statement satisfies the obligation fully, while the actual verification was a
compile. Secondary cheat: follow the doctrine's own written form, `assets/handoff-template.md`, which has
`## Verification / - Evidence level / - Checks run / - Result` but **no field for the baseline revision, no
field for the exact changed files, and no "implementation complete" vs "verified correct" split** — the agent
that uses the prescribed template is put in breach by the template.
**What would close it.** (i) Derive the not-verified list from named applicability questions rather than
leaving it open ("for each DoD item: answer, or state that it does not apply, and why"); (ii) forbid an
unscoped "verified correct" — require it scoped to the named checks and the level ("verified correct for X, by
check Y, at level Z"), which is exactly the form `assets/handoff-template.md` almost has; (iii) add baseline
revision, changed files and the two-claims split to that template; (iv) require the changed-file list to be
command output.

### 2.4 Procedure compliance

**Cheapest false satisfaction (two ways, and they are the interesting pair).**
(a) Silence. The obligation is a prohibition, so it is satisfied by never mentioning a procedure at all. An
agent that loads nothing, cites nothing and claims nothing is fully compliant — while ignoring every
reference file — because the trigger table ("Load these when their trigger applies") is never required to be
evaluated *in the record*. Absence is invisible.
(b) The bar is loading, not applying. The rule's own words: `"Never claim that you loaded, followed or
complied with a routed procedure … unless you loaded it in this task."` A single `cat references/testing.md`
(or one line in the loaded-files list) licenses "followed the falsification procedure", whether or not a
single falsifier was established.
**What would close it.** (i) Split the claims: `loaded` and `applied` are different statements; an *applied*
claim must name the file, the rule, and the decision it changed. (ii) Require the loaded-files list, with one
line per trigger evaluated — "trigger X did not fire because Y" — turning an unobservable omission into a
decision that must appear (the revision already requires the load record, so this is a field, not a new
obligation). (iii) Ordering check: no "followed N" where N was loaded after the decision it supposedly
governed.

## 3. Contradictions

### 3.1 Rule vs rule inside SKILL.md

- **Precedence vs the recorded obligations.** L19-20: `"where a specialist procedure conflicts, follow it and
  keep the invariant where you can"`. The four obligations are stated absolutely ("RECORD", "Never claim") and
  no clause subordinates them. Where a routed file both conflicts and is silent about baselines, the
  precedence rule orders the agent to follow the file; the obligations say the record is mandatory. Both are
  in the same file, and neither is marked as the tiebreak. See 3.4 for the concrete instance.
- **The checkability promise vs two of its own rules.** L22-24 promises the reviewer can tell compliance from
  the transcript; L51 (material assumptions) and L64-65 ("what you touch") are scope-relative with no closure
  condition, so the promise is false for them by construction.
- **Stop rule vs self-review's stop rule** (also 3.2, listed here because the divergence is within the
  doctrine's stated completion path): L85 requires "adequately verified" before stopping; `self-review.md`'s
  "Stop check" requires only that the outcome be met and the remaining work aesthetic.

### 3.2 SKILL.md rule vs a file it routes to

- **Completion record's contents.** `SKILL.md` L36-39 requires the record to contain "the evidence level
  reached". `references/self-review.md`'s `### Completion record (evidence-bearing)` block lists five items —
  baseline revision, changed files, one testable sentence, commands with observed results, deliberately
  not verified — and no evidence level (`grep -n "evidence level" references/self-review.md` returns only L22
  and L50, neither inside that block). `SKILL.md` L119 and L133 route the completion record to that file. An
  agent that satisfies the file fails the rule.
- **Falsifier strength.** `SKILL.md` L32-35 requires, for new behaviour, that the falsifier be *made* "where
  practical"; `references/testing.md`'s `## Falsification` requires only that the refuting observation be named
  in the change record. The file that owns falsifier design is weaker than the rule it is supposed to own.
- **The prescribed written form cannot carry the obligation.** L119 routes "the written form" of a handoff to
  `assets/handoff-template.md`; that template has no baseline-revision field, no changed-file list, and no
  split between the two claims (see 2.3).
- **Soft vs mandatory baseline in the routed file.** `references/workspace-safety.md` still opens its
  "Before editing" list with the inherited `- Inspect relevant version-control status when available.` four
  lines above the new `Before the first write to a version-controlled workspace, record in the transcript:`.
  The file holds a conditional and an absolute form of the same rule; a reader who stops at the list satisfies
  the weaker one and the transcript looks compliant.

### 3.3 Routed file vs routed file

- **Two different priority orders, and the escalation path runs from the stricter to the looser.**
  `references/decision-policy.md` `## Priority order`: safety/legal → data integrity and correctness → **the
  user's actual requested outcome** → evidence and observability → simplicity → reversibility → changeability
  → performance → local conventions → elegance. `references/pragmatic-principles.md`, "Agent
  interpretation": safety → correctness → evidence → simplicity → reversibility → maintainability → speed —
  **the user's requested outcome is absent and evidence is promoted above where decision-policy puts it.**
  `SKILL.md` L118 routes to `pragmatic-principles.md` precisely when `decision-policy.md` does not resolve a
  conflict, so the escalation target re-ranks the conflict without one of the ranks.
- **Where repository authority sits.** `references/repository-truth.md`: `"Project-specific authoritative
  instructions … outrank generic preferences in this skill"`, and `SKILL.md` L18-20 puts repository/project
  rules second. `references/decision-policy.md` ranks "Consistency with local conventions" ninth — the two
  routed files disagree about the weight of repository rules in exactly the case the doctrine sends them to.

### 3.4 Structural: the precedence rule versus the eight mode files

`SKILL.md` routes the primary mode for the common task types (L108-110: behaviour/bug fix → `modes/build.md`,
review → `review.md`, structure-only → `refactor.md`, unclear defect → `debug.md`, architecture → `architect.md`)
and L19-20 tells the agent that where a specialist procedure conflicts, follow it. **None of the eight mode
files contains any of the four recorded obligations.** Evidence:

```
$ grep -rn -i "baseline|falsif|revision|completion record|not verified|load" references/modes/
references/modes/performance.md:5:1. Define the user-visible or system metric, unit, target, and workload.
references/modes/performance.md:6:2. Capture a comparable baseline.
references/modes/architect.md:32:… backfill load …
references/modes/debug.md:9:5. Form one or a few falsifiable hypotheses.
```

Four hits, none of them an obligation. `modes/build.md`'s nine steps go from "translate the request into
observable acceptance behavior" to "stop when acceptance behavior is achieved and evidence is sufficient"
without a pre-edit baseline, a pre-change failing observation, a completion record, or a loaded-file record.
So the cheapest fully-compliant path for a bug fix is: load `modes/build.md` (the file you were routed to),
follow its nine steps, stop — and the four obligations are never engaged, because their host files are reached
only by trigger (`self-review.md` only at "Final review or handoff", which an agent making a "small" change will
not claim). This is the same class of failure the revision was built to fix — the operative procedure for the
common case carries no recording hooks — and the change record already knows it and defers it ("the audit of
the eight `references/modes/` files … is NOT reflected in this revision"). The claim that does not survive is
the narrower one: that the doctrine now tells a reviewer whether *this* agent complied.

## 4. Evidence actually run

All commands run on a `/tmp` copy; nothing written inside `build/`.

```
$ cp -r .../v3.4/build /tmp/r1-review/build
$ cd /tmp/r1-review/build && python3 scripts/validate_skill.py
VALID
root=/tmp/r1-review/build
runtime_documents=22
runtime_references=21
markdown_files=42
total_files=45
exit=0
```
(The change record's recorded run of the same script reports `markdown_files=39`, `total_files=42` — the
package's own verification block no longer reproduces against the package as assembled. Stale-evidence
defect; it belongs to R2's machinery scope, noted here only because it is the reviewer's handle on the
`CHANGES` claims.)

Census commands (definitions of the §1.3 denominator, reproducible):
- rule units: top-level `- ` / `* ` / `N. ` lines per file → `references/` = 527; `SKILL.md` = 35 bullets + 4
  obligations.
- paragraph-level directives: non-list, non-heading blocks >6 words containing a directive keyword, minus
  `Use when…` scope headers → 84 in `references/`.
- class-B scan: units containing an unfalsifiable qualifier (`as applicable`, `where practical`, `appropriate`,
  `proportionate(ly)`, `where useful`, `where meaningful`) — all scored NOT checkable.
- `grep -rn -i "baseline|falsif|revision|completion record|not verified|load" references/modes/` → 4 hits
  (quoted in 3.4).
- `grep -n "evidence level" SKILL.md references/self-review.md` → `SKILL.md:38`, `SKILL.md:83`,
  `SKILL.md:131`, `self-review.md:22`, `self-review.md:50` — i.e. absent from the completion-record block
  (`self-review.md` L48-58).
- `grep -n -i "stop when|Stop check" SKILL.md references/self-review.md references/modes/build.md` → the two
  divergent stop rules quoted in 3.1/3.2.
- `cat assets/*.md` → the four templates; `handoff-template.md` inspected field by field for the completion
  record items (2.3).

**Not run / out of scope here:** the validator and holdout bypasses (R2), any network or browser action, any
behavioural trial of the doctrine against a live agent (no such harness exists; `INDEX.md` says so too).

## 5. Count of rules still not transcript-checkable

**368 of 485 assessed rule statements (76%) are still not transcript-checkable.**
Breakdown: `SKILL.md` **11**; the nine non-mode reference files **143**; the eight `references/modes/` files
**114**; `references/pragmatic-principles.md` **100**.
Of those 368, 214 sit in files the change record explicitly leaves un-rewritten (the 100-rule principle list
and the eight mode files); **154 are not deferred by any statement in the record** — the 11 in `SKILL.md`,
whose rewrite the record claims is complete, plus 143 in the reference files the revision did edit or audit.
Counted at the granularity stated in §4 (directive units; enumerations that are the content of a directive
above them excluded, class-B qualifiers included and scored as NOT checkable, ties resolved against the rule).
