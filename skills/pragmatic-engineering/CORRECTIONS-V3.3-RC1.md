# Corrections applied — pragmatic-engineering 3.3.0-rc.1

**Date:** 2026-10-07
**Base:** `pragmatic-engineering-v3.3-audit-candidate` (preserved byte-for-byte at
`../pragmatic-engineering-v3.3-audit-candidate/`)
**Input:** the independent verification of that candidate (findings F1–F6)
**Outcome:** this directory. Every change below is scoped to the finding that caused it.

---

## F1 — the validator now validates the live runtime graph, in both reference forms

**Required behaviour** (owner): start from `SKILL.md`; traverse only the live graph; validate
backticked paths **and** Markdown links in every reachable document; a broken reference of either
form in a live document fails; a deliberately broken example of either form in an unreachable
report/eval does not fail; do not achieve this by globally ignoring Markdown links.

**What changed** — `scripts/validate_skill.py` (4156 → 6408 bytes):

- one BFS from `SKILL.md` builds the runtime graph; only documents in it are reference-validated;
- **both** forms are checked in every reachable document — backticked root-relative paths and
  Markdown links resolved against the linking document's directory;
- the graph is **closed under both forms**: a Markdown link from a reachable document to another
  in-package `.md` makes that document reachable, so its own references are validated in turn;
- escape-outside-the-root is rejected for both forms;
- the previous global Markdown-link sweep over `root.rglob("*.md")` — the source of the asymmetry —
  is gone; unreachable documents are no longer reference-checked at all, which is exactly what lets
  the reports and eval notes keep quoting broken examples.

**Evidence** — `scripts/regression_suite.py`, 12/12:
`live_route_broken` (INVALID), `live_markdown_link_broken` (INVALID),
`route_broken_in_reachable_reference` (INVALID), `unreachable_route_broken` (VALID),
`unreachable_markdown_link_broken` (VALID), `link_closure_exposes_broken_reference` (INVALID),
`escaping_route_rejected`, `escaping_markdown_link_rejected`, plus package invariants.

The adversarial probe matrix, re-run against all three revisions (each mutated copy validated by
that revision's own validator):

| Probe | V3.2 | pre-correction candidate | **rc1** |
|---|---|---|---|
| live broken backticked route | VALID / exit 0 ← defect | INVALID / exit 1 | **INVALID / exit 1** |
| live broken Markdown link | INVALID / exit 1 | INVALID / exit 1 | **INVALID / exit 1** |
| unreachable broken backticked route | VALID / exit 0 | VALID / exit 0 | **VALID / exit 0** |
| unreachable broken Markdown link | INVALID / exit 1 ← defect | INVALID / exit 1 ← defect | **VALID / exit 0** |

Both required failure rules and both required non-failure rules hold in rc1, in both forms. The two
cells marked "defect" are the exact reviewer findings F1 named.

**Regression coverage requested** (four cases) is in `evals/independent-v3.3-regressions.md` as
cases 21–24, each naming its executable counterpart. The Markdown asymmetry in particular is cases 21
(live link broken → must fail) and 23 (unreachable link broken → must pass), which are the two halves
the old validator could not both satisfy.

**Honest scope note.** No document reachable from `SKILL.md` currently uses the Markdown-link form —
every live route today is a backticked path. The link branch of the new validator is therefore
exercised by the probes, not by shipped content. It is correct and tested; it is not yet load-bearing.

## F2 — the package now states what build it is

- `SKILL.md` front matter gains `version: 3.3.0-rc.1` (plus `author`, `license`, `platforms`,
  `metadata.hermes.{tags, related_skills}` — the standard fields for this skill format; no invented
  fields).
- `INDEX.md` states the skill name, the version, the build/audit date, the relationship to V3.2 and
  to the pre-correction candidate, and the report inventory.
- `validate_skill.py` now **fails the build** when `INDEX.md` is missing or when its `**Version:**`
  line disagrees with the front matter — the package cannot claim two identities at once.
- The distributable is renamed to agree with its payload: `dist/pragmatic-engineering-v3.3-rc1.zip`,
  containing a single top-level directory `pragmatic-engineering-v3.3-rc1/`.

Note: the front-matter provenance fields take `SKILL.md` from 97 to 105 lines (825 → 883 words).
`V3.3-INDEPENDENT-PATCH-VERIFICATION.md` still states the old counts; its Status line marks it as
describing the pre-correction candidate.

## F3 — provenance of the reports is now unambiguous, and nothing was deleted

- every historical report carries a `**Status:**` first line naming the revision it describes and
  whether it is HISTORICAL or SUPERSEDED;
- `INDEX.md` maps each report to the revision it describes and names the current one;
- the four co-existing score sets (29/40, 72/72, 38/60 → 60/60, 19/24 → 24/24) are each attributed
  to their revision;
- case 23's justification is amended in place, with a correction note appended beneath the original
  table rather than rewriting it;
- this file and `HOLDOUT-RC1-RESULTS.md` are added as the rc1 record; both are now required files,
  so a release cannot ship without them.

## F4 — hidden case 23 now rests on explicit doctrine

`references/boundary-correctness.md` (environment section) gained:

> case-only renames and case-differing lookups, which succeed on a case-sensitive filesystem and can
> silently target the wrong entry, or fail to register as a change at all, on a case-insensitive one;

With that line present, the 2/2 is retained on its merits. The amendment and its reasoning are
recorded at the end of `INDEPENDENT-HIDDEN-SUITE-RESULTS.md`. No other score was touched.

## F6 — description conforms to the trigger window

`description:` went from 214 characters to 48:
`Pragmatic engineering judgment for code changes.` — a capability statement whose full text fits
inside the 57-character index window, so the trigger is never truncated away. The longer formulation
("repository-level build/debug/refactor/review/design work where correctness, changeability,
verification and maintainability matter") is not lost: it is the body's opening and is restated in
`INDEX.md`. Note this departs from the `Use when …` phrasing used by most fleet skills, on the
grounds that the eight-character prefix would consume a sixth of the window for no routing gain; it
does not change what the skill does or when it loads.

## F5 — precedence ruling recorded (owner ruling)

`INDEX.md` records the ruling: this skill is **cross-cutting engineering doctrine, not another
workflow owner**. Order: explicit user/owner authority and safety constraints → repository/project/
SOUL rules → narrower specialist workflow (`systematic-debugging`, `fix-playbook`,
`code-simplification`, `source-driven-development`, `specification-first-design`, `review-loop`,
`merge-ready-review`, and peers) → these heuristics. Where a specialist procedure and this doctrine
appear to conflict, satisfy the specialist procedure and preserve the invariant where possible; do
not create a second parallel workflow. The same list is in the front matter's `related_skills`.

**Where it lives (corrected during install preparation).** The ruling was first recorded only in
`INDEX.md` — which is *not* part of the runtime graph, so an agent that loads this skill would never
see it. The precedence statement is now also two sentences in `SKILL.md` itself, immediately after
the opening paragraphs, where every load reads it. Everything else about the ruling is unchanged;
`INDEX.md` keeps the longer form.

---

## Re-verification after the corrections

| Step | Result |
|---|---|
| rc1 validator on rc1 | `VALID`, exit 0 — 21 runtime references reachable, 38 files |
| V3.2 validator on untouched V3.2 | `VALID`, exit 0 (unchanged, preserved copy) |
| Pre-correction candidate validator on the preserved candidate | `VALID`, exit 0 (unchanged) |
| Adversarial route probe (live) | rc1 `INVALID` + exit 1; pre-correction `VALID` — the fix holds |
| Adversarial link probe (live) | rc1 `INVALID` + exit 1 (the pre-correction asymmetry) |
| Reachability, independently rebuilt | 21 references reachable from `SKILL.md`; templates included |
| `scripts/regression_suite.py` | 12/12 pass |
| `scripts/rc1_holdout.py` (new, post-fix, targeted at the changed surfaces) | 11/11 pass — one first-run failure found and fixed (anchored routes) |
| 100-principle invariant | 100 numbered principles, exactly 1–100 |
| Preservation | V3.2 and the pre-correction candidate still byte-identical to the bundle's copies |

The holdout found one genuine gap in the F1 fix — anchored backticked routes
(`` `references/ghost.md#section` ``) were not matched, and so were silently unvalidated. That is the
same failure class F1 removed, one level down. Fixed in rc1 (the route pattern accepts and strips an
optional `#fragment`) and promoted to permanent regression 25.

## What rc1 still does not claim

Doctrine and packaging are verified; behaviour is not. No independent coding agent has been run
against repositories with traces captured, so nothing here upgrades the skill to production grade.
That requires the trace-backed benchmark: multiple agents, fresh repositories, hidden tasks, captured
actions/tool traces, and a no-skill / V3.2 / rc1 comparison. Until then, any statement of the form
"agents will follow this reliably" remains a doctrine claim, not a result.
