**Status:** CURRENT for 3.4.0-rc.1 — the three-task record of the question this revision exists to answer. It is
NOT evidence that this revision is good; on the evidence it has, it is the reason NOT to pin it.

# T1 + T2 — does the doctrine change what an agent produces?

**Answered: not measurably, on three tasks.** The arm with the doctrine lost all three blind comparisons.

| task | arm without the doctrine | arm with the doctrine | judge's reason |
|---|---|---|---|
| T1 — issue #2, dangling citations | **11 / 12** | 9 / 12 | the doctrine arm's `doctor` returned PASS on the brief's own motivating case |
| T2 — issue #4, bytecode cache | **11 / 12** | 10 / 12 | behaviourally indistinguishable fixes; the doctrine arm left `.gitignore` and `.pe-gate/` residue in the diff |
| T2 — issue #1, licence vs UNDECIDED | **11 / 12** | 9 / 12 | the doctrine arm's recogniser emitted a false STOP naming the wrong licence on canonical licence texts |

Aggregate: **33 / 36 without the doctrine, 28 / 36 with it.**

**What the doctrine did win.** One axis, consistently: *was the failure demonstrated before the fix?* The doctrine arm
scored 2 where the control scored 1 on that axis in T2's second task, and the honesty judge in T1 called the doctrine
arm's record the more trustworthy account of the work. So the doctrine's measurable effect here is on **evidence
discipline**, not on correctness.

**What it cost.** 68 and 69 model calls against 44 and 59 for the control arms on the same two tasks — roughly half
again the work — plus, in the first design, residue inside the repository being changed, which an independent judge
then counted against the diff. That residue is fixed: the record now lives under git's own directory
(`$(git rev-parse --absolute-git-dir)/pe-gate/`), so the working tree is left exactly as the task found it, and a test
asserts `git status --porcelain` is empty after a run.

**Why this is not a verdict on the idea.** Every task here was small, crisp and single-file-shaped, and the arm
*without* the doctrine still scored 11/12 — there was almost no headroom left for a discipline to win. A fair test of
whether these obligations change outcomes needs a task where the baseline actually fails: a multi-file change, an
ambiguity that invites inventing a requirement, or a defect whose real cause is one layer away from its symptom. The
runs also used one model, one repository and one judge per task, and both judges worked from sanitised copies — the
worktrees' git metadata still named their source lane, which both judges disclosed and neither used.

**Recommendation, on this evidence: do not pin this revision into every session.** It costs context and work, and
three blind comparisons say the code it produces is not better. The honest next step is a task with a known hard
failure mode, not another trim.
