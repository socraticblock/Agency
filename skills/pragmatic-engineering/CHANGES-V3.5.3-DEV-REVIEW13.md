**Status:** CURRENT EXPERIMENTAL — no 9/10 certification.

# Pragmatic Engineering v3.5.3-dev-review.13 — Artifact integrity field lesson

**Source:** v3.5.3-dev-review.12 (unchanged gate and evaluator).
**Real repository:** `socraticblock/open-source-ready`, main at `c9c3790410969d3e9917e231f7bad3bf16b49b93`, active PR #13 at `31b7b7fd10a352408a49736a544135f684f71e9f` on 2026-10-16.

## What changed

- New optional `references/artifact-lifecycle.md`: distinguish confidentiality, completeness,
  integrity, authorization and execution containment. Follow the final artifact through its
  entire lifecycle; account for omissions explicitly at the appropriate severity.
- `references/engineering-quality.md` links the lifecycle for applicable tasks.
- `SKILL.md` routes to the new reference on demand; retains exact first-line objective,
  four commitments and all gate commands without adding mandatory ceremony.
- `references/workspace-safety.md` now specifies the remote-API-only edit and CI feedback loop.
- Current metadata and release index updated.

## Observation and measured boundary

The Open-Ready PR #13 exporter selects Git-tracked paths but `plan()` excludes tracked paths
not present as regular files in the working tree. Its preflight reports path-rule exclusions
but lacks a structured result for unavailable tracked files. A local Git-only mechanism
reproduces an unstaged-deleted tracked file still appearing in `git ls-files`.
A small **draft**, **stacked** PR #14 adds `candidate.tracked-unavailable` review evidence and two
controls. It does not prohibit intentional deletions. This source-level observation is not
proof that PR #14's complete runtime suite is passing.

## Exclusions from claim

- No independent coding-agent treatment experiment has been run on this version.
- Repository PR #13 CI and acceptance outcomes are author-reported and not locally executed here.
- This version does not repair or certify Open-Ready's software or the gate itself.
- No claim of Windows/macOS portability, hostile-host sandboxing or stable-release readiness.

## Field correction recorded

Our own stacked PR #14 initially failed its Python syntax check because a test method
contained an invalid hyphen; a subsequent CI run found Ruff formatting drift. These were
**our defects**, correctly caught by existing repository CI. Neither failure demonstrates
that the skill makes an agent more reliable. They motivate the remote-edit preflight above.
The final branch status must be checked at the exact head before promotion.
