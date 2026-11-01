# INDEX — pragmatic-engineering release candidate

**Skill name:** `pragmatic-engineering`
**Version:** 3.5.3-frozen.1
**Build / audit date:** 2026-10-16
**Status:** frozen baseline (2026-10-16, content of `v3.5.3-dev-review.13`), independently reviewed for
mechanical assurance; **NO-GO for stable release or any 9/10–10/10 rating**. The gate has only local
mechanical tests and the doctrine is **not** behaviorally demonstrated. Linux is the only currently tested
platform; macOS and Windows remain release verification obligations. See "What this package does not claim".

## What this package is

A cross-cutting engineering doctrine for repository-level code work: smallest sound change,
evidence honesty, changeability, proportionality, authority boundaries, uncertainty preservation,
and coupling discipline. It is **not** a workflow owner. Specialist skills keep owning their
procedures (see "Precedence").

## Relationship to earlier versions

| Revision | Where it lives | Relationship |
|---|---|---|
| V3.2 | `pragmatic-engineering-v3.2-original/` — preserved byte-for-byte in the release work area, sibling to this directory; not part of an installed copy | The audited predecessor of this candidate. |
| V3.3 audit candidate | `pragmatic-engineering-v3.3-audit-candidate/` — preserved byte-for-byte in the release work area, sibling to this directory; not part of an installed copy | V3.2 + the 12-file patch set produced by the 2026-10-07 independent audit. Superseded by this release candidate. |
| V3.3.0-rc.1 | the 3.3 release work area | Superseded by this candidate: doctrine and packaging verified, behaviour not demonstrated. |
| V3.4.0-rc.1 | superseded in place | The four recorded obligations (baseline, falsifier, completion record, procedure compliance), an operational rewrite of every rule whose compliance could not be told from a transcript, and the independent ambiguity audit behind it. Supersedes 3.3.0-rc.1. |

| **V3.5.0-rc.1** | superseded in place | V3.4.0-rc.1 with the doctrine cut from 9,638 to 5,915 bytes and restructured around four commitments, after four task classes of blind differential found the larger version produced a better record and no better code. Every reference file, the gate and the provenance reports are unchanged. |
| **V3.5.1-rc.1** | superseded in place | V3.5.0-rc.1 with the gate repaired (nine reproduced defects, two of them release-blocking) and the documentation, precedence and packaging corrections that repair requires. Doctrine, references, assets and CLI preserved; 18 of the 42 gate cases fail against the 3.5.0 gate and pass here. See `CHANGES-V3.5.1-RC1.md`. |
| **V3.5.2-rc.1** | original immutable source ZIP | V3.5.1-rc.1 with three false-PASS bypasses repaired — a phase that was never recorded inheriting a default exit code, chronology enforced for `before < after` only, and the candidate never re-bound after the live verification ran — plus a required `--spread` for benchmark stability. 6 of 47 gate cases fail against the shipped 3.5.1 gate and pass here. See `CHANGES-V3.5.2-RC1.md`. |

| **V3.5.3-dev-review.1** | prior experimental bundle | Independent repair proposal addressing five reproduced false-PASS classes, strict state and benchmark validation, real repository attribution, Git NUL parsing and accompanying tests. **Not promoted or independently certified.** See `CHANGES-V3.5.3-DEV-REVIEW1.md`. |

| **V3.5.3-dev-review.2** | prior independent candidate | Post-Hermes follow-up: OS-owned label leases prevent simultaneous duplicate execution, Linux flock replaces expiry-based locks, atomic JSON state saves, bounded process-group termination, concurrent state check detection, and adversarial crash/fault tests. **Local mechanics only; not independently attested.** See `CHANGES-V3.5.3-DEV-REVIEW2.md`. |

| **V3.5.3-dev-review.3** | prior experimental bundle | Hermes's recheck lease and no-symlink lock defense, plus crash-inherited check leases and fail-closed Git index visibility (`assume-unchanged`/`skip-worktree`) in response to independently reproduced false-PASS. **Still local mechanical assurance, not 10/10.** See `CHANGES-V3.5.3-DEV-REVIEW3.md`. |

| **V3.5.3-dev-review.4** | independently verified prior experimental bundle | Additional adversarial repairs: force Git index audit settings for file mode/casefold/fsmonitor, remove shell-evaluated baseline revision from Git diff, validate baseline object identifier, hash literal symlinks/executable bits and stream only regular files. Eight new regression cases. **Not independently attested.** See `CHANGES-V3.5.3-DEV-REVIEW4.md`. |

| **V3.5.3-dev-review.5** | prior experimental bundle | Fixes Hermes's independently reproduced `core.worktree` false PASS: resolves the checkout identity from the enclosing physical `.git` marker and rejects mismatches with Git's selected worktree or metadata directory. Includes linked-worktree/subdirectory/no-VCS passing controls, redirect negative controls, and post-verifier revalidation. Mechanical local evidence only. See `CHANGES-V3.5.3-DEV-REVIEW5.md`. |

| **V3.5.3-dev-review.6** | prior experimental bundle | Refuses active Git clean/smudge filter attributes on tracked paths, closing the previously reproduced raw-working-tree false PASS in those repositories. This restriction is not a comprehensive byte audit. |

| **V3.5.3-dev-review.7** | preceding experimental candidate | Bounded output and restrictive Git normalization audit. See `CHANGES-V3.5.3-DEV-REVIEW7.md`. |
| **V3.5.3-dev-review.8** | prior experimental candidate | Preflight static refusal before live verifier execution, and repeat scope/budget audit after live commands. See `CHANGES-V3.5.3-DEV-REVIEW8.md`. |
| **V3.5.3-dev-review.9** | preceding experimental candidate | Baseline raw-byte inventory, normalizer-compatible audit, early scope refusal, and truthful unknown-line accounting. See `CHANGES-V3.5.3-DEV-REVIEW9.md`. |
| **V3.5.3-dev-review.10** | prior experimental candidate | First-line engineering objective, concise code-quality guidance, independently gradable rubric, and blinded pilot allocation/outcome analysis. Gate unchanged. See `CHANGES-V3.5.3-DEV-REVIEW10.md`. |
| **V3.5.3-dev-review.11** | preceding experimental candidate | Separate private/blind allocation, freeze-manifest verification, external runtime metrics, and calibrated pilot fixtures distributed separately from the installed skill. Gate and first-line objective unchanged. See `CHANGES-V3.5.3-DEV-REVIEW11.md`. |

| **V3.5.3-dev-review.12** | preceding experimental field-pilot candidate | Adds explicit remote-only evidence limits and a generic duplicate-authority-fields invariant, derived from an observed repository defect. Gate/evaluator code unchanged. See `CHANGES-V3.5.3-DEV-REVIEW12.md`. |

| **V3.5.3-frozen.1** | **this directory (frozen)** | Content of 3.5.3-dev-review.13 frozen 2026-10-16 after independent adversarial review; document-only divergences from the reviewed archive. See `FROZEN-2026-10-16.md`. |

| **V3.5.3-dev-review.13** | preceding experimental multi-repository field candidate | Adds conditional artifact-lifecycle guidance and provenance/completeness distinction learned from Open-Ready PR #13/stacked #14. No gate, evaluator or four-commitment change. See `CHANGES-V3.5.3-DEV-REVIEW13.md`. |

Diff 3.4.0-rc.1 → 3.5.0-rc.1 rewrites `SKILL.md` only: four commitments in place of the obligation-per-section layout, the change-class table compressed to one line, the route list kept complete but compressed, and a closing section stating what the measurement found. Diff 3.3.0-rc.1 → 3.4.0-rc.1 rewrites `SKILL.md` around the four recorded obligations, adds one section to each of
`references/workspace-safety.md`, `references/testing.md`, `references/self-review.md` and
`references/decision-policy.md`, deletes two lines the audit found unverifiable (`decision-policy.md`'s
"not a substitute for judgment" and `repository-truth.md`'s "fashionable" dependency rule), and adds `evals/v3.4-operational-evals.md` and `CHANGES-V3.4-RC1.md`. The
doctrine files it does not name are unchanged; the historical reports are untouched.

HISTORICAL, describing 3.3.0-rc.1 and not this revision: "Diff V3.2 → rc1 touches 13 doctrine files (the audit's 12 plus `references/boundary-correctness.md`
gaining the case-only-rename line), the validator, the front matter, and adds the provenance files
listed below. `references/`, `assets/` and mode structure are otherwise unchanged from V3.2's design.**" That sentence describes the superseded revision; see the 3.4.0-rc.1 diff
paragraph above for what this directory actually contains.

## Reports in this package — which one describes which revision

Every report carries a `**Status:**` line as its first line. The authoritative set:

| Report | Describes | Status |
|---|---|---|
| `INDEX.md` + `CHANGES-V3.5.3-DEV-REVIEW13.md` + `FROZEN-2026-10-16.md` | **3.5.3-frozen.1** — the content of 3.5.3-dev-review.13, frozen after independent adversarial review | **CURRENT — frozen 2026-10-16** |
| `evals/v3.4-operational-evals.md` | the four recorded obligations (3.4.0-rc1 and unchanged since) | **CURRENT** |
| `CHANGES-V3.5.1-RC1.md` | 3.5.1-rc1 — the gate repair after the first adversarial review | HISTORICAL — superseded by `CHANGES-V3.5.2-RC1.md` |
| `CHANGES-V3.5-RC1.md` | 3.5.0-rc1 — the instruction-reduction revision | HISTORICAL — superseded by `CHANGES-V3.5.1-RC1.md` |
| `CHANGES-V3.4-RC1.md` | 3.4.0-rc1 | HISTORICAL — superseded by `CHANGES-V3.5-RC1.md` |
| `CORRECTIONS-V3.3-RC1.md` | 3.3.0-rc1 | HISTORICAL — superseded by `CHANGES-V3.4-RC1.md` |
| `HOLDOUT-RC1-RESULTS.md` | **rc1** — the post-correction holdout aimed at the changed validator/provenance surfaces | **CURRENT** |
| `V3.3-INDEPENDENT-PATCH-VERIFICATION.md` | the pre-correction audit candidate | HISTORICAL — superseded by `CORRECTIONS-V3.3-RC1.md` |
| `INDEPENDENT-AUDIT-2026-10-07.md` | V3.2 and the patch set derived from it | HISTORICAL — audit input, kept unedited for provenance |
| `INDEPENDENT-HIDDEN-SUITE-RESULTS.md` | V3.2 vs pre-correction candidate (30 cases) | HISTORICAL — scores describe the pre-correction revision |
| `POST-PATCH-HOLDOUT-RESULTS.md` | pre-correction candidate (12 cases) | HISTORICAL — scores describe the pre-correction revision |
| `evals/independent-v3.3-regressions.md` | **rc1** regression set (20 audit cases + 4 correction cases) | **CURRENT** |
| `evals/behavior-evals.md` | the original behavioral/regression scenario set | CURRENT for that set; unchanged since V3 |
| `TEST-REPORT.md`, `V3-HIDDEN-TEST-REPORT.md`, `V3.1-*.md`, `V3.2-PATCH-VERIFICATION.md`, `RESEARCH.md` | V2/V3/V3.1/V3.2 era | HISTORICAL — retained, not superseded in content, not current for rc1 |

**Current revision = v3.5.3-frozen.1** (content of v3.5.3-dev-review.13, frozen 2026-10-16). Any score in a HISTORICAL report was measured against the
revision named in that report, not against rc1.

The `evals/quality_eval.py` prepares blinded pilot run IDs in separate output trees, binds results to a frozen manifest, and summarizes grader-supplied outcomes with independently recorded runtime metrics; it
**does not** autonomously run coding agents or prove treatment benefit. The detailed qualitative rubric is
`evals/ENGINEERING_QUALITY_RUBRIC_V1.md`.

## How to validate this package

```
python3 -m unittest discover -s evals -p "test_quality_eval*.py"
python3 scripts/validate_skill.py     # package + live runtime-graph reference checks
python3 scripts/regression_suite.py   # executable regressions, incl. the reference-form matrix
python3 scripts/rc1_holdout.py        # held-out validator cases
python3 scripts/tests_pe_gate.py      # 50 gate cases; one permissions skip possible under root
python3 scripts/tests_review_hardening.py  # 24 focused repairs (including Hermes's 3)
python3 scripts/tests_git_nul_paths.py    # 4 Git path cases
python3 scripts/tests_concurrency_durability.py  # 13 Linux concurrency/fault cases
python3 scripts/tests_dev_review4.py   # new state/permission/casefold/symlink adversarial cases
```

`validate_skill.py` validates references **only in the live runtime graph** (documents reachable
from `SKILL.md`): broken backticked routes and broken Markdown links both fail there, in either
form. Documents outside that graph — the reports and eval notes in this package — are deliberately
not reference-validated, because they quote broken paths as examples.

## Precedence

The hierarchy an agent must apply is in `references/core-rules.md`, which `SKILL.md` routes, so a loaded session
actually reads it: owner authority and safety first, then repository/project/SOUL rules, then the narrower
specialist workflow, then this doctrine's cross-cutting heuristics. It is repeated nowhere else — an earlier
revision kept it only here, and loading the skill never reached this file.

Where a specialist workflow and this doctrine appear to conflict, follow the specialist procedure and preserve
the pragmatic invariant where possible; do not create a second parallel workflow.

## What this package does not claim

- **Not production grade.** This revision has local mechanical tests but no independent runtime attestation.
- **No behavioral evidence.** The calibration fixtures are baseline/reference code checks, not agent outcomes. No controlled coding agent has been run against real repositories
  with traces captured. Every score in this package measures written decision-path coverage with an
  authored rubric — not demonstrated behavior. A trace-backed benchmark (multiple agents, fresh
  repos, hidden tasks, no-skill baseline vs V3.2 vs rc1) is the only thing that can upgrade the claim.
