# Genezisi — Branching, Integration and Release Workflow

**Adopted:** 2026-11-01. **Applies to:** future website features and substantial edits in `socraticblock/Agency`.
**Production branch:** `main`. **Full application:** Next.js App Router, React, TypeScript, CSS, and `en`/`ka`/`nl` routes.
**Purpose:** develop extensively without changing production, yet make final integration a routine, verifiable release.

## Non-negotiable principles

1. **Develop the production application on non-production branches.** Every intended shipping feature uses real Next.js/React components, routes, styles, runtime scripts, data, and localization. A standalone HTML/JS experiment is a disposable visual *spike*, not a completed, accepted product feature. A design is not finally accepted for release until its production-architecture integration has been rendered and checked.
2. **Push commits often; do not confuse pushing with merging.** Pushing to a feature/integration branch is safe for `main`, subject to deployment settings. Avoid wasteful Vercel/GitHub Actions usage; run local checks and use the existing tunnel/local site for founder review.
3. **One branch per coherent task, not per edit.** Revisions to an unfinished Card 3 remain on the same Card 3 branch. A standalone contact form could be one `feature/contact-form` branch straight from `main`.
4. **Use an integration branch for coordinated multi-feature releases.** Create `integration/<release>` from the current `main`. Create dependent `feature/<task>` branches from that *integration* branch; merge each reviewed feature back into integration. Independently deployable features can instead branch from `main` and merge directly to `main` after approval.
5. **Synchronize with `main` regularly.** When production moves forward during a long build, merge the latest `main` into the integration branch, reconcile conflicts in development, then retest. Feature branches should start from the most recent version of their **intended merge target** (integration if dependent; `main` otherwise). Do not assume all branches start from `main`.
6. **Review the combined product, not only isolated parts.** Passing unit/source tests, rendering static screenshots, or a successful build does **not** prove scroll scenes, browser caches, locale changes, responsive layout or navigation.
7. **Release intentionally.** One draft integration PR into `main`, accurate checklist, founder visual acceptance of the real integrated app, then a small reviewed merge. Never bulk-merge a large experimental history or cherry-pick hundreds of obsolete commits.

## Choose the correct branch

| Situation | Start from | Where it merges | When to reuse the branch |
| --- | --- | --- | --- |
| Fix or independent feature to ship soon | Latest `main` | `main` | Continue editing the same task |
| Multi-part redesign / coordinated release | Latest `main` → `integration/redesign` | `main` after final QA | Reuse throughout the release |
| Card, animation or component depending on incomplete redesign | Latest `integration/redesign` → `feature/card-N` | `integration/redesign` | Until that card/feature passes |
| Unrelated bug fix while redesign continues | Latest `main` → `fix/issue` | `main` | Reintegrate new `main` into redesign afterward |
| Experimental HTML/animation feasibility check | Dedicated `spike/<idea>`, clearly disposable | **Never directly** to `main` | Treat as reference, then implement in real app |

**No requirement to create a new branch for every CSS tweak, wording change or commit.**

## Working protocol

### Before development
- Fetch latest `main` and inspect recent commits/open PRs; identify any ongoing integration branch.
- State intended target branch, real production entrypoint, scoped files, dependencies and rollback commit.
- Check that an existing feature/PR doesn't already implement the task.
- For homepage work, inspect `src/app/[locale]/_components/SignalHeroPrototype.tsx`, its `v2` components and existing motion/asset integration. Do not replace them with a standalone HTML page.
- Preserve actual Work, contact destination, metadata, all three locales, accessibility and reduced motion.

### During development
- Work on the real application and keep every commit independently understandable.
- Push logical commits to the development branch; keep a **draft PR** to the intended target open early so divergence is visible.
- When a task is accepted, merge it into the integration branch; **run integrated checks** after each merge.
- Frequently bring upstream `main` into the integration branch, especially after hotfixes. Do not force-push a shared integration branch without explicit coordination.
- Use local tests and one local/tunnel browser session where feasible. Avoid automatically deploying every speculative commit.

### Before integrating into `main`
- Confirm `main` vs integration delta is limited to the release scope and conflicts are resolved.
- Run `npm run typecheck`, `npm run lint`, `npm run build`, and relevant `node --test tests/<name>.test.mjs` commands. If an environment cannot run a check, record "not run"; never mark it passed from reading source.
- Browser-check the **integrated Next.js homepage**, not the source proof: desktop, 320/390px portrait, reduced motion, slow and fast forward scroll, reverse scroll, reload and locale switch.
- Test links, real `#work` destination, Screen 01 passage, selected projects, contact and non-animated fallback.
- Check static public scripts for cache coherency: if runtime expectations change with new CSS or markup, update asset versioning or use bundler-fingerprinted imports. Avoid a new CSS contract depending on an old cached JS file.
- Confirm founder approves the exact integrated build/ref. A recorded screenshot of a different proof branch is not integration approval.
- Merge a focused PR after explicit approval; recheck the merged site and retain a rollback ref.

## Failure modes / preventative gates (2026-11-01 case study)

- The four-card experience was designed in a standalone `public/flagship-journey/infinite-bc/index.html` proof while real production used React; this forced reimplementation and risked discrepancies. **Prevent:** ship-intended work must be authored and reviewed on the real React route.
- The historical proof branch was hundreds of commits ahead and diverged from `main`. **Prevent:** don't cherry-pick everything; consolidate only accepted final changes into a clean integration branch from current `main`.
- Source-only checks passed even when Card 3 was invisible at runtime. **Prevent:** browser checkpoints at each scene plus reverse scrolling and visibility checks, including a production bundle/asset cache check.
- Card 3's integrated CSS expected `--depthVisibility` from a newer public script at the same URL. An older cached script lacked it, plausibly causing an invisible Card 3. PR #19 introduced a versioned motion URL and safe fallback. **Prevent:** coordinate CSS/JS runtime contracts; verify live behavior. Do not assert cache cause conclusively without reproduction.

## Roles, approvals and records
- **Coder:** implementation, targeted automated checks, integration, code review and reporting exact refs; no claim of founder visual acceptance or gameplay QA.
- **Founder:** actual visual/gameplay acceptance on the real integrated app, with screenshots/recording when relevant; decision to release.
- **Release record:** base/main SHA, integration/head SHA, changed-file scope, checks actually executed, URLs/devices reviewed, known deviations, founder decision, merge SHA and rollback.

## See also
- [Current website handoff](../genezisi-v2/HANDOFF_2026-11-01_FOUR_FRAME.md)
- [Reusable agent skill](../../skills/genezisi-production-integration/SKILL.md)
- [Historical V2 documentation](../genezisi-v2/README.md) — not the current release checklist
