**Status:** CURRENT for 3.4.0-rc.1 — this is the pilot experiment the change record cites. It is a HARNESS proof,
not proof of this revision, and it is n=1.

# T1 pilot — does pinning this doctrine change what an agent produces?

**Question.** Would pinning `pragmatic-engineering` into every session's context add anything over what a lane
already inherits (SOUL.md plus the auto-loaded `merge-ready-review` gate)?

**Design.** One real task from a public repository (`socraticblock/open-source-ready` @ `c9c3790`, issue #2: a
candidate can carry documents citing paths it does not contain), two arms, two detached worktrees, one variable:
arm A's brief said load the doctrine and follow it, arm B's said consult no skill. Same model
(`deepseek-v4.1-flash`), same brief otherwise, byte-identical apart from that line. Nothing committed, nothing
pushed. Harness: `~/.hermes/profiles/assistant-4/cache/scratch/pe-diff-2026-10-15/` (manifest, briefs, rubric,
mechanical evidence, both judges' verdicts).

**What the harness cost to learn.** Four leaf-subagent attempts produced no artifact at all while reporting
`status=completed`; the run that worked used real one-shot agent sessions (`hermes -z`). The manipulation check
passed from the transcripts: the treatment loaded the skill, the control did not.

**Mechanical layer, run by me (not taken on trust).** Both suites green in both arms (400 control / 395 doctrine
against a 377 baseline); no existing test weakened (0 deletions under `tests/`; the control touched no existing
test file, the doctrine arm added cases to three); falsification passes for both — every new test errors against
the pre-change source.

**Two independent judges, blind to arm identity, on anonymised copies.**
- Rubric judge: **control 11/12, doctrine 9/12.** It named the doctrine arm's failure as a functional defect: its
  `doctor` returned PASS on the brief's own motivating case — a document present on this machine but absent from
  the release set — because the check resolved citations against the working tree instead of the release set,
  while the control arm reported that case at both surfaces. The doctrine arm scored higher on record honesty.
  Caveat stated by the judge and repeated here: the rubric's first axis was a bright line ("any edit to an
  existing test file = 0"), which zeroed the doctrine arm for *additive* edits with no assertion removed.
- Honesty judge (independently): reproduced the same doctrine-arm defect, with a command; and found the control
  arm's own defects — an allowance that exempts more than it declares (bare suffix matching), a wrong guard named
  for a test skip, and a check that reports its own evidence file as dangling because the record was never
  re-measured after it existed. It judged the doctrine arm's account the more trustworthy record and its artifact
  the weaker one.

**Verdict.** On this one task, with this model, the doctrine did not improve the artifact — it correlated with a
miss on the case the task existed for — while it did improve the account of the work. **No evidence here justifies
pinning it into every session.** One task, one model, and a rubric defect of mine are all reasons to re-run rather
than to conclude; the run that would matter is 2-3 tasks against the hardened doctrine, with a rubric that
separates "weakened a test" from "added cases to a test file".

**Harness artefact to disclose.** The experimenter ran `git add -N` in both worktrees to produce the diffs, which
made the `??` lines in both records untrue *as delivered*. Both judges identified it and absolved both arms.
