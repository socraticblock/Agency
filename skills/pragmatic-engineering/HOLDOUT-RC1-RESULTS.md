# Post-correction holdout — rc1

**Date:** 2026-10-07
**Subject:** `pragmatic-engineering` 3.3.0-rc.1
**Runner:** `scripts/rc1_holdout.py` (executable; run it, don't read it)

## Purpose

The audit's 30-case suite and 12-case holdout were scored against the pre-correction candidate.
This is a **new** holdout, written after the F1 validator rewrite and the F2/F3 provenance work, and
aimed at the surfaces that changed — to check for overfitting in the correction itself rather than to
re-score the doctrine.

Every case is executed, not judged: each one mutates a throwaway copy of the package (or a temp
working directory) and asserts the validator's exit status, its first output line, and where
relevant the text of its error.

## Cases

| # | Case | Expected | Result |
|---:|---|---|---|
| 1 | Validator invoked from an unrelated working directory | VALID | PASS — `__file`-relative root resolution, no cwd dependency |
| 2 | `SKILL.md` deleted | INVALID, names the missing front matter | PASS — reported, not a traceback |
| 3 | `INDEX.md` deleted | INVALID, names the missing required file | PASS |
| 4 | `INDEX.md` version disagrees with front matter | INVALID, "version disagreement" | PASS |
| 5 | Broken backticked route inside a reachable **template** (`assets/architecture-decision-template.md`) | INVALID, names the template | PASS — reachability reaches assets, not just references |
| 6 | **Anchored** backticked route `` `references/ghost.md#section` `` | INVALID, names `references/ghost.md` | **FAILED on first run** → fixed (see below); PASS after the fix |
| 7 | Markdown link to a directory (`./modes`) | INVALID, broken live markdown link | PASS |
| 8 | Anchored markdown link `./ghost-doc.md#heading` | INVALID | PASS |
| 9 | Valid anchored markdown link to an existing document | VALID | PASS — no false positive on the anchor form |
| 10 | Every historical report starts with a `Status:` line | all present | PASS |
| 11 | Validator run leaves the package byte-identical | unchanged | PASS — validation does not mutate the artifact |

**Score: 11/11 after the fix (10/11 on first run).**

## The one finding, and what was done with it

Case 6 exposed a real gap in the F1 fix: the route pattern required the backticked path to end at
`.md`, so an anchored route — `` `references/ghost.md#section` `` — matched nothing and was silently
never validated. That is the same class of bug the F1 correction set out to remove (a reference form
that looks live but is not checked).

Fixed in rc1: the route pattern now accepts an optional `#fragment`, which is stripped before the
path is resolved. The case was then promoted out of the holdout into the permanent regression set as
case 25 (`evals/independent-v3.3-regressions.md`, `scripts/regression_suite.py::anchored_route_broken`),
so it cannot regress again.

## What this holdout does and does not show

It shows the correction is not narrower than it claims: both reference forms, in root documents,
references, modes and templates, anchored and unanchored, fail when broken and pass when sound; and
that documents outside the live graph can still quote broken examples without breaking the build.

It does **not** show anything about model behaviour. These are executable checks on packaging and
validation logic. No coding agent was run against a repository.
