**Status:** CURRENT for the revision it names in its section 0 (the round-2 candidate, which carried no gate);
the two defects it VERIFIED in the current tree — an unresolvable command path and an unreachable
non-version-control fallback — are fixed in this revision and recorded in `CHANGES-V3.4-RC1.md`.

**Status:** CURRENT for the revision identified in section 0 — the build snapshot this review counted. The artifact changed
under the reviewer at 16:13–16:15 on 2026-10-15; both identities are recorded in section 0 and both counts are given.

# R3 — Operability: how many rule statements a reviewer cannot check from a transcript

Answer to the question asked: **331 of 476 directive units (69.5%) in the counted revision cannot be settled from a
transcript and the workspace by a reviewer who was not present.** The predecessor revision measured 368 of 485 (75.9%).
The current build tree (drifted, see 0.3) is 328 of 475 (69.1%). Everything below is auditable per file.

## 0. Identity, scope and method (read this before the count)

### 0.1 What was counted

Revision counted — the package as it stood when this review began, which is the revision the prompt describes
(no `pe_gate.py`, obligations written as record prose):

| item | value |
|---|---|
| `SKILL.md` | sha256 `77e54f36dfcaa5346926ef1f70a2d084a190b0913c5ec0a766f31ac1f9d2dbc2` (10,734 bytes / 150 lines) |
| `references/` (17 files, incl. 8 `modes/`) | sha256 of the sorted per-file digests `5f363bf0af9c81ef90e26627f4dffcaed0bd48cb85f5c157e5d8df497276dcca` |
| copy used | `/tmp/pge34` (the package is read-only to me; all mutation ran in `/tmp`) |

Counted scope = **18 doctrine files**: `SKILL.md` + the 17 files under `references/`. This is the predecessor's scope
(`REVIEW-V3.4-OPERABILITY.md` §1.3), kept so the two numbers are comparable.

Deliberately **not** counted, and why: the 19 report/audit `.md` files at package root (provenance, not doctrine; the
snapshot holds 47 files in total — 20 at root including `SKILL.md`, 4 `assets/`, 3 `evals/`, 17 `references/`, 3 `scripts/`);
`evals/` (3 files — test cases, not rules the agent must follow, though they do encode requirements; see 7.2);
`assets/` (4 templates — fields, not directives); `scripts/` (code, not rule statements).

Excluded units, stated so a reader can re-add them: scope headers ("Use when …", "Use for …", "Use this when …",
"Use whenever …", "Use in addition …" — 9 occurrences, one each in `workspace-safety.md`, `boundary-correctness.md`,
`decision-policy.md`, `repository-truth.md`, `reliability.md`, `testing.md`, `self-review.md`, `modes/build.md`,
`modes/security.md`), pure
question-prompt lists (`modes/security.md`'s nine threat questions, `reliability.md`'s seven "Before finishing, ask"
questions), permission lists (`authority-boundaries.md`'s "Normally low-risk inside an authorized development
workspace"), and the identical four-obligation footer sentence repeated at the end of all eight mode files
(verified present in 8/8; counting it would add 8 checkable units and change no not-checkable count).

### 0.2 Counting method and the two judgement calls behind it

At directive-unit granularity, as instructed:

- a **unit** is a top-level bullet or numbered item that states a requirement of its own, or a non-list paragraph block
  over six words containing a directive verb;
- an enumeration that is the *content* of the directive above it is **not** separate units. I applied this to lists
  whose items are definitions, options, instances, categories or fields (`boundary-correctness.md`'s twelve value-semantics
  categories, `reliability.md`'s six atomicity options, `automation.md`'s eleven contract fields, the six evidence-level
  definitions, `review.md`'s five severity definitions);
- lists whose items each require an observable outcome stay as separate units (the git-safety prohibitions, the 14
  consequential-action entries, the failure-path checks in `testing.md`);
- a unit containing an unfalsifiable qualifier from the given set is scored NOT checkable **automatically**. I extended
  the set to the same qualifier in a different grammatical frame ("as late as practical", "if practical", "genuinely not
  practical") and, separately, scored judgement-loaded units ("in proportion", "material", "appropriate", "sufficient",
  "smallest", "cheapest", "meaningful") as NOT checkable. **Audited: 0 units scored checkable contain any listed
  qualifier** (section 6, command 5).

Checkability criterion (the prompt's definition, applied strictly, ties resolved against the rule): a unit is
**checkable** iff a reader with only the transcript and the workspace can settle it, which in practice meant one of —
a required artefact appears in the transcript; a command and its observed output appear; a named threshold, set or
set-relation can be computed; a named action's occurrence or absence is directly visible (a secret printed, an
assertion deleted, a history rewritten, a file outside the authorised scope); or a route's trigger and its load record
are both present. A unit is **not checkable** when compliance is a quality/quantity judgement, when the scope or trigger
is chosen by the agent being assessed, when it names an omission only a domain re-analysis would find, or when it
carries an unfalsifiable qualifier.

Granularity disclosure for comparability: the predecessor's per-file denominators differ from mine in both directions
(its `modes/automation.md` is 23 units where mine folds to 6; its `SKILL.md` is 43 where mine is 50 because I split the
four obligations into their eleven distinct requirements). Only the **ratio** is comparable, and section 1 gives an
alternative denominator (554/699, 79.3%) for the other reading, so a reader can see the range rather than trust one
number.

### 0.3 Drift: the artifact moved during this review (material, and it changes the answer for the current tree)

`v3.4/build` was modified at 16:13–16:15 while this review was running. `diff -rq` between my snapshot and the current
tree:

```
Files /tmp/pge34/SKILL.md and .../build/SKILL.md differ        (77e54f36… → 9a6756e0…, 150 → 162 lines)
Files /tmp/pge34/CHANGES-V3.4-RC1.md and .../build/CHANGES-V3.4-RC1.md differ
Only in .../build/scripts: pe_gate.py
Only in .../build/scripts: tests_pe_gate.py
Files /tmp/pge34/scripts/validate_skill.py and .../build/scripts/validate_skill.py differ
(references/, evals/, assets/ unchanged: diff -rq reports no differences)
```

What changed in the new `SKILL.md` (9a6756e0, 162 lines): the four obligations now *invoke a tool* —
`python3 scripts/pe_gate.py baseline|falsify|record|dod` — plus a new "## Make it mechanical" section; and three clauses
were dropped (the routed-file trigger/load record, "an exception serving none is reverted", "behaviours" in the
authorised-scope line, and "A claim never outranks its evidence"). Net effect on the count:

| revision | units | checkable | not checkable | not checkable % |
|---|---|---|---|---|
| counted here (`SKILL.md` 77e54f36) | 476 | 145 | **331** | 69.5% |
| current build (`SKILL.md` 9a6756e0) | 475 | 147 | **328** | 69.1% |
| predecessor (`REVIEW-V3.4-OPERABILITY.md` §1.3) | 485 | 117 | 368 | 75.9% |

The tool closes four `SKILL.md` units mechanically (the baseline, falsifier, record and DoD-field holes) but adds one
back ("where it cannot be made") and drops the trigger/load record, which was checkable. INFERRED for the non-SKILL
files in the drifted revision: `references/` is byte-identical, so their counts are unchanged.

The tree kept moving after that: at 16:25 `build/scripts/pe_gate.py` was 23,773 bytes (it was 16,223 at 16:13), so the
tool is still under edit. My `pe_gate.py` behaviour evidence (§5.2, 5.3, 5.5) binds to the copy I tested —
`/tmp/pge34b/scripts/pe_gate.py`, sha256 `1cf9849a689368318734a439804153bfa8ca10cade7bf9a55f53974a5b5e38da`. The
`SKILL.md` hash quoted for the current tree (`9a6756e0…`) was still current at 16:26. Any verdict here is valid only for
the hashes named in this section.

Also note, against the prompt's parenthetical: the *installed* copy is not `v3.4/build` but
`/home/socraticblock/.hermes/skills/shared/pragmatic-engineering/`, and its `SKILL.md` now matches the **drifted
build** (`9a6756e0`), with `references/` identical to both. So the installed skill is the newer revision, not the one
counted here.

## 1. Headline count and per-file breakdown

**331 of 476 units are not checkable from a transcript (69.5%).** 145 are checkable.

| file | units | checkable | **not checkable** | not-checkable % | predecessor's not-checkable* |
|---|---|---|---|---|---|
| `SKILL.md` | 50 | 35 | **15** | 30% | 11 |
| `references/pragmatic-principles.md` | 103 | 2 | **101** | 98% | 100 |
| `references/workspace-safety.md` | 37 | 22 | **15** | 41% | 29 |
| `references/self-review.md` | 33 | 11 | **22** | 67% | 23 |
| `references/testing.md` | 33 | 11 | **22** | 67% | 18 |
| `references/boundary-correctness.md` | 31 | 7 | **24** | 77% | 24 |
| `references/authority-boundaries.md` | 25 | 17 | **8** | 32% | 15 |
| `references/reliability.md` | 24 | 2 | **22** | 92% | 16 |
| `references/repository-truth.md` | 13 | 2 | **11** | 85% | 12 |
| `references/decision-policy.md` | 10 | 2 | **8** | 80% | 6 |
| `references/modes/architect.md` | 24 | 5 | **19** | 79% | 21 |
| `references/modes/build.md` | 15 | 5 | **10** | 67% | 16 |
| `references/modes/debug.md` | 20 | 6 | **14** | 70% | 16 |
| `references/modes/performance.md` | 15 | 8 | **7** | 47% | 10 |
| `references/modes/refactor.md` | 9 | 3 | **6** | 67% | 6 |
| `references/modes/review.md` | 18 | 5 | **13** | 72% | 12 |
| `references/modes/security.md` | 10 | 2 | **8** | 80% | 11 |
| `references/modes/automation.md` | 6 | 0 | **6** | 100% | 22 |
| **total** | **476** | **145** | **331** | **69.5%** | **368** |

\* predecessor's per-file not-checkable counts are from the shipped `REVIEW-V3.4-OPERABILITY.md` §1.3, which measured
the pre-edit revision (485 units). Its denominators per file are not reproducible under my fold rule, so per-file
deltas are indicative and only the totals are comparable.

Alternative denominator (maximally split reading — fragments, option lists and folded enumerations counted as units,
their verdicts inherited): **554 of 699 (79.3%)**. Under that reading the not-checkable count rises mostly in files whose
rules are property-shaped rather than record-shaped (`boundary-correctness.md` 24→77, `reliability.md` 22→42,
`automation.md` 6→23), which is the honest way to see the "how much of this doctrine is unverifiable" range: **69.5% to
79.3%**.

Not-checkable reasons, by count (a unit can carry several; tagged once, by the dominant one):

| tag | meaning | units |
|---|---|---|
| Nj | quality/quantity judgement ("in proportion", "smallest sound", "material", "cheapest", "meaningful", "adequate") | 258 |
| Nq | unfalsifiable qualifier (the given set, plus its grammatical variants) | 38 |
| Ns | scope or trigger chosen by the agent being assessed | 13 |
| Ni | intent or internal state ("be deliberate", "do not assume", "think") | 10 |
| Na | no artefact required at all (advice, thesis, unenforceable bar) | 6 |
| No | omission that only a domain re-analysis would find (missing validation, missing migration test) | 6 |

## 2. What makes the checkable ones checkable

145 units are checkable, through exactly five mechanisms:

| mechanism | count | what the reviewer reads | representative units |
|---|---|---|---|
| **A — a required artefact in the transcript** | 61 | a statement/record the rule names must be present, and it is enumerated or quotable | `SKILL.md` obligation 3's record fields; "state implementation-complete and verified-correct as two separate claims, scoped to *named check* at level E<n>"; "name the file and the step for an *applied* claim"; "For every consequential action … cite the instruction or policy that authorises it"; `self-review.md` completion-record fields; `modes/review.md`'s five finding fields |
| **B — an observable command with its output** | 18 | the command string and its printed result both appear | obligation 1's `git status --short` + `git rev-parse HEAD` in the edited workspace; obligation 2's identical command before/after with each revision; `workspace-safety.md`'s re-run status before finalising; `testing.md`'s falsification paragraph; `modes/performance.md`'s "Capture a comparable baseline" and "Re-run correctness checks" |
| **C — a named threshold, set or set-relation** | 8 | a number or a containment test the reviewer computes | obligation 1's reviewer's test "every changed file is in the authorised set or an exception"; `modes/architect.md`'s "at least two credible options"; `workspace-safety.md`'s "stage only task-relevant changes"; `reliability.md`'s "Bound timeouts and retries" (a named bound must exist, per `SKILL.md`'s "every new retry … names the operation, its bound") |
| **D — a named action's occurrence or absence is visible** | 42 | grep/ls of the diff and history settles it | the seven git-safety prohibitions (`reset --hard`, destructive `clean`, force-checkout over modified files, dropping stashes, rewriting shared history, wholesale "ours"/"theirs", discarding unrelated modifications); "Never print secrets to prove they exist"; "Do not write credentials into source, prompts, logs, fixtures, screenshots, or artifacts"; "Never weaken, delete, regenerate or rewrite a verification artefact"; "Never mass-update expected output simply to make the suite green"; `modes/debug.md`'s catch-and-ignore and disabling-assertions entries |
| **E — a route's trigger and its load record** | 16 | the trigger condition is readable, the loaded-file record is mandatory | the nine routing bullets in `SKILL.md` (once obligation 4's load record exists); `self-review.md`/`handoff-template.md` routing; the escalate-to-architecture trigger list in `modes/build.md` |

Note the asymmetry, because it is the doctrine's own thesis and it holds: **the units that are checkable are almost
exactly the units that name a record, a command or a specific prohibited action.** Nothing is checkable because it is
well written; 61 of 145 (42%) are checkable only because a record is demanded by name.

## 3. SKILL.md only: the not-checkable units, quoted, and the clause that would close each

15 of `SKILL.md`'s 50 units (30%). Quoted from the counted revision (`77e54f36`); line numbers as printed in that file.
Each entry gives the reason tag and **the one clause that would make it checkable**.

1. **L16–20, the precedence rule** (Nj). `"where a specialist procedure conflicts, follow it and keep the invariant where you can, and never invent a parallel workflow."`
   — "where you can" and "the invariant" are self-assessed, and no artefact records what was followed or kept.
   **Closing clause:** "…and record, in one line each, the specialist procedure followed and the invariant kept" — i.e. name the artefact, as obligation 4 does for loads.
2. **L62–63, material assumptions** (Na). `"List material assumptions as checked / unchecked, name the one that would most change the design if wrong, and state the risk of acting on any unchecked one. An empty or partial list is not a complete one."`
   — "material" and "complete" have no closure condition; a one-item list reads identically to an exhaustive one.
   **Closing clause:** "for each assumption, name the check that would falsify it and run it, or mark it unchecked and name the file or contract that breaks if it is wrong" — a list is then complete when every named assumption is falsified or bears a named blast radius.
3. **L67–68, the cheapest falsifying check** (Nj). `"Start from the cheapest check that could falsify the hypothesis at hand, and record why each broader check was included or skipped."`
   — "cheapest" has no definition, and the artefact is a justification of the checks that *were* run, so it is silent about the cheaper check never conceived.
   **Closing clause:** "first list every candidate check you considered, then mark each as run or skipped with the reason" — the omission becomes visible by construction.
4. **L74–75, abstractions must be paid for** (Nj). `"Add an abstraction, indirection or dependency only with the requirement that pays for it, cited; otherwise use the ordinary form."`
   — a citation exists, but whether the requirement "pays for it" is the author's judgement, and the rejected ordinary form is never named.
   **Closing clause:** "cite the requirement by its acceptance-behaviour sentence or ticket id, and name the ordinary form you rejected with the reason it could not carry the requirement".
5. **L76–78, boundary semantics** (Ns). `"State the boundary semantics of what you touch — units, ranges, precision, encoding and normalisation, missing values, resource limits — and write not applicable for a category that genuinely does not apply, rather than omitting it silently."`
   — the six categories are named and `not applicable` is required, so this is close; what kills it is "what you touch" — the applicability partition is the assessed agent's own, and the statement has no required home.
   **Closing clause:** "for every value in the diff that crosses a boundary (API, persistence, wire, config, cache), state all six categories or `not applicable`, in the completion record".
6. **L91–93, verification breadth** (Nj). `"Broaden verification in proportion to blast radius and the cost of being wrong, and test behaviour at the narrowest useful level."`
   — "in proportion" and "narrowest useful" have no floor, and the routed file forbids the only obvious numeric form (`testing.md`: "Do not encode a universal numeric test-pyramid ratio"); the file that owns falsifier design also gives no floor.
   **Closing clause:** "at minimum, run one check that fails on the pre-change tree for every changed behaviour, and name the blast-radius facts (callers, consumers, data volume) that set the breadth beyond that".
7. **L99–100, the stop rule** (Nq). `"Stop when the outcome is met and adequately verified: RECORD the level, the results, and the finishing touches you deliberately deferred. After that stop check, do not continue without a new instruction."`
   — "adequately" is the qualifier; the record is mandatory only once the agent has decided to stop, so nothing lets a reviewer call the stop premature.
   **Closing clause:** "adequately verified means every Definition-of-done item is answered or marked not applicable with its reason, and the evidence level is recorded" — the stop then has the record as its precondition.
8. **L104, the ladder's directive** (Nq). `"Use the strongest practical evidence, but never claim above the level actually obtained."`
   — "strongest practical" is the qualifier; "never claim above" is honest but only a ceiling.
   **Closing clause:** "for a behaviour change, at least one E2 check; for a boundary or contract change, at least one E3 run" — a per-task-class minimum alongside the ceiling.
9. **L115–118, the level judgement** (Nj). `"Judge evidence by relevance, freshness, completeness and its ability to falsify the claim, and report the level achieved when the distinction matters."`
   — four unquantified judgement axes, and "when the distinction matters" is the assessed agent's call; the E2/E3/E4 seams are undefined while L97 requires every claim to carry a level.
   **Closing clause:** define the seams operationally — "E3 = two or more components started together under your own control and driven by one pasted command; E4 = the same command run in the named deploy image or CI job, not a local imitation".
10. **L146–148, Definition-of-done item 4** (Nq). `"failure, security, compatibility, migration and rollback concerns were considered where relevant — each answered in the record rather than asserted, or marked not applicable with the reason — documentation and configuration remain truthful against the diff, and the reported evidence level matches the claim."`
    — "where relevant" is the qualifier, and "considered" is unobservable until the record states it; "remain truthful against the diff" has no doc-diff anchor.
    **Closing clause:** "state for each of failure, security, compatibility, migration and rollback either the answer with its evidence or `not applicable` with the reason" — drop "where relevant", split the sentence so the doc/level half is not carried by the qualifier.
11. **L150, self-review trigger** (Ns). `"For nontrivial work, use references/self-review.md before finalising."`
    — "nontrivial" is declared by the agent, so an agent that calls its change small skips the file with no missing artefact. (This is the routed file that carries the completion record for non-obvious work.)
    **Closing clause:** replace the trigger with an objective one — "when more than one file changes, or any verification/CI/doc file changes, or any schema/config/contract changes".
12. **Obligation 1 — authorised scope** (Ns). `"Name the files and behaviours this task authorises, and name each exception with the authorised outcome it serves (an exception serving none is reverted)."`
    — files are checkable, **behaviours** have no form, and an exception is compliant by being named (the "reverted" half is never recorded).
    **Closing clause:** "name the acceptance behaviour as one testable sentence, and require each exception to cite the authorised outcome it serves, and show it reverted or still justified at completion".
    *Already closed in the current tree (`9a6756e0`), which drops "and behaviours" and records scope through the tool.*
13. **Obligation 2 — the new-behaviour escape** (Nq). `"For new behaviour, name the observation that would show it wrong and make it; where that is genuinely not practical, name the blocker and the command you attempted, and call the result unverified — never passing."`
    — "genuinely not practical" is the assessed agent's judgement; the fallback branch is one word wide.
    **Closing clause:** "not practical means the check needs a resource that `references/authority-boundaries.md` lists as requiring authority; name that resource and the command attempted" — an objective test for the escape.
    *Tightened but not closed in the current tree: "where it cannot be made".*
14. **Obligation 3 — the record's field list** (Nq). `"Record the baseline revision; the changed files as command output; the intended behavioural effect as one testable sentence; every command executed with its observed result; and the not-verified list derived item by item from the Definition of done — answered, or marked not applicable with the reason — never an unscoped "none"."`
    — the fields are named and mostly checkable, but the unit carries "not applicable", and a vacuous reason is indistinguishable from a real one, so the whole unit fails the qualifier test mechanically.
    **Closing clause:** split it — keep "never an unscoped none" as its own unit, and require the reason to name the item's applicability test ("not applicable because no schema path appears in the diff").
    *Closed mechanically in the current tree: `pe_gate.py dod --item … --na <reason>` blocks on an unanswered item.*
15. **Obligation 3 — the claim/evidence bar** (Na). `"A claim never outranks its evidence."`
    — no oracle ranks a claim against evidence; it is a maxim.
    **Closing clause:** "for every claim name the check that produced it and the level achieved; with no check, no level above E1" — the ranking becomes a comparison the reviewer performs.
    *Dropped in the current tree.*

Also folded as content of directives above, and therefore not in the 15, but not checkable either (a reader who counts
them adds 7 units, all not checkable, making `SKILL.md` 57 units / 22 not checkable): the six evidence-level definitions
(L106–113, definitions of the directive at L104) and the Definition-of-done lead-in (L139, "All applicable items true …",
which carries the listed qualifier).

## 4. Contradictions

**C1 — two priority orders, and the escalation runs from the stricter to the looser.**
`references/decision-policy.md` priority order: safety/security/privacy/legal → data integrity and correctness → **the
user's actual requested outcome** → evidence and observability → simplicity and clarity → reversibility → changeability
→ performance → local conventions → elegance. `references/pragmatic-principles.md`, "Agent interpretation": safety →
correctness → evidence → simplicity → reversibility → maintainability → speed — **the user's requested outcome is
absent and evidence is promoted above where decision-policy puts it**. `SKILL.md` L134 routes to `pragmatic-principles.md`
precisely when `decision-policy.md` "does not resolve" a conflict, so the escalation target re-ranks the conflict with
one rank missing. The newer sentence at `pragmatic-principles.md` L139–140 ("This order is subordinate to
`references/decision-policy.md`'s priority order … read it first") mitigates but does not remove the divergence: the
subordinate file's list is still materially different from the order it defers to.

**C2 — where repository authority sits.** `references/repository-truth.md`: "Project-specific authoritative
instructions, schemas, generators, architecture decisions, and release policies outrank generic preferences in this
skill". `SKILL.md` puts repository/project rules second. `references/decision-policy.md` ranks "Consistency with local
conventions" **ninth**, and its conflict example says "Match the repository's established conventions unless they are
incorrect, unsafe, or the task explicitly changes them." The two routed files disagree about the weight of repository
rules in exactly the case the doctrine sends them to.

**C3 — the falsifier is stronger in the rule than in the file that owns falsifier design.** `SKILL.md` obligation 2
requires the fix branch to "establish a reproducer or failing behavioural test and RUN the identical command after the
change, recording both outcomes with the revision or state each run was made on"; the fix branch has **no** escape.
`references/testing.md`'s Falsification paragraph supplies one ("Where the check cannot be run, name the blocker and the
command you attempted, state that explicitly, and treat the result as unverified"), and its regression workflow step 1
says only "reproduce it deterministically **if practical**". `SKILL.md` L19–20 tells the agent to follow the specialist
procedure where it conflicts, "keeping the invariant where you can" — so following the file the rule routes to produces
a weaker result than the rule states. An agent fixing a production-only or intermittent defect is pushed into this gap.

**C4 — three stopping tests.** `SKILL.md` L99–100 ("outcome met and **adequately verified**"), `references/self-review.md`
("Stop only when the requested outcome is met **and** the Definition of done is answered in the completion record"),
`references/modes/build.md` step 9 ("Stop when acceptance behavior is achieved and **evidence is sufficient**"), with
`modes/performance.md`, `modes/refactor.md` and `modes/architect.md` each adding their own stop condition. These are not
equivalent: a task can satisfy `build.md`'s test and fail `self-review.md`'s, and none of the four gives a threshold.

**C5 — the mode footers assert the obligations; no mode step elicits them.** All eight mode files end with "The four
recorded obligations in `SKILL.md` — baseline, falsifier, completion record, procedure compliance — apply in this mode.
This file tells you what to do; the obligations tell you what to record while doing it." `grep` finds no baseline,
falsifier, revision, completion-record, not-verified or load requirement in any of the eight step lists, and
`modes/build.md`'s last step licenses stopping without one; `modes/debug.md` makes a durable record conditional
("When the investigation needs a durable record or handoff, use `assets/debug-template.md`"). The footer is the only
operative instruction in the common path, and a footer is not a step. This is the same structural finding the shipped
R1 review made against the predecessor; the deletion of obligation 4's trigger/load clause in the current tree makes it
worse, because nothing now requires the routed-file list to appear at all.

**C6 — breadth demanded, measurability forbidden.** `SKILL.md` L91–93 demands verification "in proportion to blast
radius"; `references/testing.md` forbids the numeric form ("Do not encode a universal numeric test-pyramid ratio. Let
architecture and risk determine the mix."); `references/decision-policy.md` forbids the other observable form ("Avoid
both test theater and ritual full-suite execution"). A reviewer has no admissible measurement of "broad enough".
(Classified INFERRED as a contradiction — it is a tension with three mutually unmeasurable terms, not a flat conflict.)

**C7 — a rule contradicts a file the package runs as its own test (INFERRED scope: evals, not counted).**
`evals/v3.4-operational-evals.md` case 3: "**Fail:** … records status without a revision identifier", "**Pass:** Not
accepted as a valid baseline; the obligation requires a revision identifier plus the authorised scope". `SKILL.md`
obligation 1 explicitly contemplates a workspace without version control — "If the workspace is not under version
control, record that as a claim, with the check that showed it" — where no revision identifier can exist. An agent that
complies with the rule in a non-VCS workspace fails the eval as written.

**C8 — agency vs bounded autonomy (minor).** `references/pragmatic-principles.md` #3: "**Exercise agency.** Tools,
process, environment, and approach can be changed when they block good work." vs `references/authority-boundaries.md`:
"Never infer authority merely because a tool exists", and its consequential-action list. Precedence resolves it in
favour of the latter, but #3 is in the file `SKILL.md` routes to when `decision-policy.md` fails to resolve a conflict.

**C9 — the "completion record" has three different field sets (minor, but it is the doctrine's central artefact).**
`SKILL.md` obligation 3 lists five items (no evidence level; the level appears in the claim form);
`references/self-review.md`'s "Completion record (evidence-bearing)" lists six (including "the evidence level reached
(E0–E5)"); the current tree's `pe_gate.py record` emits baseline revision, root, scope, a *pointer* to the changed-file
list, falsifier runs, six DoD answers and a state digest — and **no evidence-level field at all** (section 5.7). An
agent that satisfies one form fails another.

## 5. Rules that cannot be run, or that cannot be recorded in the prescribed form

**5.1 The counted revision: nothing unrunnable, one under-specified check.** `grep -n "scripts/\|pe_gate"` over the
counted `SKILL.md` returns **no hits** — the counted revision names no tool. Its three named commands (`git status
--short`, `git rev-parse HEAD`, the identical falsifier command) are runnable. The non-VCS clause demands "the check
that showed it" and names no check, so any check satisfies it — under-specified rather than unrunnable.

**5.2 The current tree: the doctrine now prints commands that do not run where it will be used (VERIFIED).**
`SKILL.md` (9a6756e0) tells the agent to run `python3 scripts/pe_gate.py …` as its four obligations. That path resolves
against the current working directory, which for this doctrine is the user's repository, where no `scripts/pe_gate.py`
exists:

```
$ mkdir -p /tmp/fakerepo && cd /tmp/fakerepo && git init && echo x > app.py && git add -A
$ python3 scripts/pe_gate.py baseline --authorised app.py
python3: can't open file '/tmp/fakerepo/scripts/pe_gate.py': [Errno 2] No such file or directory
```

The script lives in the skill package (`…/v3.4/build/scripts/pe_gate.py`, and identically in the installed skill), and
`SKILL.md` never gives an absolute path, a `$SKILL_DIR` form, or an instruction to invoke it from the skill directory.
Invoked by absolute path from the same repo it works and behaves as documented (`baseline` ok; `check` exit 2 naming
every unmet obligation; `falsify --phase after` with a changed command refused as
`gate.falsifier-command-changed`; a still-failing after-run refused as `gate.falsifier-still-failing`). So the defect is
the printed path, not the tool.

**5.3 The current tree: the doctrine's own gate cannot pass in a non-VCS workspace (VERIFIED).** `SKILL.md` still says
"No version control? Record that as a claim, with the check that showed it". The tool refuses and offers no way to
record the claim (`baseline` takes only `--authorised` and `--note`; no `--claim`/`--no-vcs` flag), and `check` then
refuses permanently:

```
$ cd /tmp/novcs && python3 …/pe_gate.py baseline --authorised app.py
REFUSED  gate.no-vcs: this workspace is not under version control; the baseline obligation is a claim with the check
that showed it, and this tool cannot check it for you        (exit 2)
$ python3 …/pe_gate.py check
REFUSED - gate.baseline-missing: no baseline recorded …      (exit 2)
```

So the rule's fallback exists in prose and is unreachable through the prescribed command.

**5.4 The prescribed written form cannot hold six rules' records.** `assets/handoff-template.md` is the only written
form the doctrine names for a handoff (`SKILL.md` L135 counted / L147 current; `self-review.md` "When a reusable
engineering handoff artifact is requested, use `assets/handoff-template.md`"). Its fields are: Outcome; Changes; Why;
Baseline (workspace root + exact command, baseline revision, changed files, authorised scope and exceptions);
Verification (evidence level, falsifying check before with command/revision/result, identical check after, checks run,
runtime exercised, implementation complete, verified correct for `<check>` at level, not-verified item by item);
Risks/limitations; Operational notes; Next action. Six rules demand a record with **no field**:

| rule | record it demands | home in the template |
|---|---|---|
| `SKILL.md` L81–83 (current L93–95) | the doc surfaces checked against the code diff, with the outcome for each | none dedicated; only "Operational notes" mentions configuration/deployment — strained |
| `SKILL.md` L76–78 (current L88–90) | the boundary-semantics statement with `not applicable` per category | none |
| `SKILL.md` L62–63 (current L74–75) | the material-assumptions list with the load-bearing one and its risk | "Risks/limitations" is a strained home |
| `SKILL.md` L64–66 (current L76–78) | the cited instruction/policy for every consequential action | none |
| `SKILL.md` L67–68 (current L79–80) | why each broader check was included or skipped | "Checks run" lists checks, not the justification or the ones skipped |
| obligation 4 (counted revision) | the routed files whose trigger matched, with load/why per file | none; and the current tree drops the clause entirely |

The same mismatch hits the other templates: `assets/debug-template.md`'s "## Verification / Evidence level and checks
performed" cannot hold obligation 3's baseline revision, changed-file list or not-verified list, and
`assets/review-template.md` holds none of them — so a mode file that points at its own template as "a durable record"
(`modes/debug.md`) points at a container that cannot carry the completion record. This is a record-holding defect, not a
run defect: the agent must invent a place, while the doctrine elsewhere discourages inventing formats
("rather than inventing a heavier format").

**5.5 The current tree's generated record cannot hold three of obligation 3's own items (VERIFIED).** `SKILL.md` says
"`python3 scripts/pe_gate.py record` emits it" — i.e. the completion record. Run end-to-end in `/tmp/fakerepo`, the
generated `.pe-gate/record.md` contains: baseline revision, workspace root, authorised scope, "changed files (as
recorded at check time): see `pe_gate.py check` output" (a pointer, not the list), falsifier runs per phase with exit
code and revision, six Definition-of-done answers, a state digest. It has **no field for the evidence level (E0–E5)**,
none for "the intended behavioural effect as one testable sentence", and none for commands other than the falsifier's —
all three required by obligation 3 and by `self-review.md`'s completion-record list. And the tool's Definition of done
is **six** items (`DOD_ITEMS`, `scripts/pe_gate.py` L37–43) where `SKILL.md` lists **four** bullets: answering
`SKILL.md`'s four leaves `dod.5` and `dod.6` unanswered, and "an unanswered item blocks the gate" (verified: `check`
exit 2 listing `gate.dod-unanswered` for each). The agent must therefore satisfy a checklist that is not the one it
was given.

**5.6 The gate's own state contradicts the doctrine's scope test (INFERRED).** `baseline` writes `.pe-gate/` inside the
repository and prints "note: add `.pe-gate/` to .gitignore so the record is not itself part of the diff". The doctrine
never mentions `.pe-gate/`, and obligation 1's reviewer's test — "every changed file is in the authorised set or an
exception" — counts workspace files. An agent that runs the doctrine's own gate therefore creates files outside its
authorised scope under the doctrine's own test unless it adds an ignore the doctrine does not mention. The tool's
internal scope check did not complain about its own directory in testing; whether a human reviewer applying the written
test would is the unresolved half. (INFERRED — not tested against a reviewer.)

**5.7 Unrunnable-by-construction rules in the references (runnable only with authority the doctrine gates).**
`modes/architect.md`: "Assess lock duration, table/data rewrite cost, backfill load, and service availability for the
real data volume" — producing that measurement means touching a production-scale datastore, and
`authority-boundaries.md` lists "changing production/cloud/infrastructure state" and "schema/data migrations with
persistent effects" as requiring explicit authority. `boundary-correctness.md`: "Exercise the relevant target or state
the portability gap" — with `platforms: [linux, macos, windows]` in the front matter and one host available, the
satisfiable branch is the unverifiable one (state the gap). These are not unrunnable commands; they are rules whose
only satisfiable branch is the one a reviewer cannot check. (INFERRED as to how a given agent would resolve them.)

## 6. Evidence actually run

All commands in this review ran on copies under `/tmp`; nothing was written inside `build/` or the installed skill.

```
1  find . -type f | sort ; wc -l            → 48 files, 5,449 lines (package listing and sizes)
2  cp -r …/v3.4/build /tmp/pge34            → read-only snapshot at 16:12, used for every count
3  sha256sum SKILL.md                       → 77e54f36dfcaa5346926ef1f70a2d084a190b0913c5ec0a766f31ac1f9d2dbc2
   find references -name '*.md' | sort | xargs sha256sum | sha256sum
                                            → 5f363bf0af9c81ef90e26627f4dffcaed0bd48cb85f5c157e5d8df497276dcca
4  unit census (script, /tmp/units.json)    → SKILL.md 39 items + 9 paragraphs; references 18 files;
                                              raw items + paragraphs = 690 candidate units before folding
5  qualifier audit                          → 0 units scored checkable contain any listed qualifier
6  quote verification                       → all SKILL.md quotes in §3 matched verbatim (line-wrap joined);
                                              one mismatch was my own stripping of the italics marker in "*applied*"
7  diff -rq /tmp/pge34 …/build              → SKILL.md, CHANGES-V3.4-RC1.md, validate_skill.py differ;
                                              pe_gate.py and tests_pe_gate.py added; references/ evals/ assets/ unchanged
8  diff -rq ~/.hermes/skills/shared/pragmatic-engineering/references references → no differences
   sha256sum ~/.hermes/skills/shared/pragmatic-engineering/SKILL.md → 9a6756e0961d37dfc1f39886acc2d1b2803087cff98a88dd6916e3785e10b394
9  reference→command audit: grep -n "pe_gate\|scripts/" SKILL.md → counted revision 0 hits; current revision 8 hits
10 pe_gate end-to-end in /tmp/fakerepo (git repo), invoked by absolute path:
   baseline ok (root, revision 9087d6a7…, 1 authorised entry); falsify before ok; falsify after with a changed
   command → REFUSED gate.falsifier-command-changed (exit 2); after still failing → REFUSED
   gate.falsifier-still-failing; check → exit 2 listing gate.falsifier-incomplete and gate.dod-unanswered ×6;
   record → .pe-gate/record.md (contents quoted in §5.5)
11 pe_gate as printed (relative path) from a user repo root → python3: can't open file '/tmp/fakerepo/scripts/pe_gate.py'
12 pe_gate in a non-VCS workspace (/tmp/novcs) → REFUSED gate.no-vcs (exit 2); check → exit 2
   gate.baseline-missing (permanent)
13 grep -c '^## ' evals/v3.4-operational-evals.md → 13 cases; Pass/Fail criteria → 26
14 grep -i 'doc|assumption|authoris|authoriz|boundary|cheapest' assets/*.md → 2 hits
   (architecture "Facts vs assumptions", handoff "Authorised scope"); no doc-surface, no citation, no
   boundary-semantics, no cheapest-check field anywhere in the four templates
```

## 7. Limits and what remains unverified

7.1 **The judgement is mine, per unit.** The criterion is stated in 0.2 so it can be re-applied and disagreed with. The
two places I would expect a different reviewer to move numbers: my fold rule (which lowers denominators in files with
category/option lists) and my treatment of "violation is an observable event" rules as checkable (which raises the
checkable count in `workspace-safety.md` and `modes/performance.md` relative to the predecessor's class-A reading). The
alternative denominator in §1 (554/699, 79.3%) is the other end of that range.

7.2 **`evals/`, `assets/`, `scripts/` and the reports are outside the headline count.** For a reader who wants the whole
package: `evals/v3.4-operational-evals.md` has 13 cases and 26 Pass/Fail criteria, each written as an observable
condition — the most checkable text in the package by construction (INFERRED: counting them as units would add roughly
26 checkable units and dilute the not-checkable ratio); the four `assets/` templates contribute ~39 field prompts, which
under my rule are record fields of optional documents and score mostly not checkable. Including both moves the headline
in opposite directions, which is why the headline stays on the 18 doctrine files the predecessor measured.

7.3 **No behavioural evidence exists, in or out of this review.** No agent was run against a real repository to test
whether these rules change behaviour, and this review did not do so either (`INDEX.md` and `CHANGES-V3.4-RC1.md` both
say no behavioural evidence is claimed). Every number here is a property of the text, measured against a stated
criterion — not a measurement of compliance in practice.

7.4 **Unverified items, labelled.** (a) The current tree's counts for the reference files are INFERRED from `references/`
being byte-identical to my snapshot; only `SKILL.md` was re-counted. (b) 5.6 is INFERRED — I did not run a reviewer
against a repo with `.pe-gate/` present. (c) C7 (eval vs non-VCS rule) is INFERRED as a contradiction because the evals
are not routed from `SKILL.md` and I did not run the eval against a non-VCS transcript. (d) Whether the drifted revision
was a deliberate, recorded change is not established here: `CHANGES-V3.4-RC1.md` also changed at 16:13 and I did not
audit the new change record (out of scope for this question, and it is the artifact's own provenance file).

7.5 **Not done, deliberately.** No network, no browser, no commits, no writes inside `build/` or the installed skill.
Nothing in `assets/`, `evals/`, `scripts/` or the reports was modified; all mutation was in `/tmp`.
