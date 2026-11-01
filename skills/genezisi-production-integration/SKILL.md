---
name: genezisi-production-integration
description: Use when building or editing the Genezisi website, creating feature/integration branches, bringing approved visual work into the Next.js homepage, resolving merge conflicts, preparing release PRs or checking scroll-journey regressions.
---

# Genezisi: Integrate Real Features Without Rebuilding Them

**Source of truth:** [Branching policy](../../docs/development/BRANCHING_INTEGRATION_RELEASE.md). **Current website status:** [1 Nov handoff](../../docs/genezisi-v2/HANDOFF_2026-11-01_FOUR_FRAME.md). **Repo:** `socraticblock/Agency`. No tool invocation in this skill replaces inspecting the latest GitHub state.

## When to activate
- New website feature / card redesign / substantial mobile or animation edit
- Coordinated release involving multiple features
- Integrating a founder-accepted prototype into the real homepage
- Investigating a discrepancy between source-level tests and real browser behavior
- Preparing a draft PR or release to `main`

## Procedure

### 1. Identify the actual target
- Read current `main` head and any integration PR/branch. Identify current app entrypoint and relevant localized components. Never trust a previously reported head SHA without checking.
- For a small independent change, branch from latest `main` and PR back to `main`.
- For multiple dependent features, start `integration/<release>` from `main`; start each dependent `feature/<name>` from that *integration* branch and PR back to integration.
- Keep revising the same feature on the same branch. Create a new branch only for a new coherent scope or separately releasable fix.

### 2. Verify that the feature is real-app code
- Production homepage: `src/app/[locale]/_components/SignalHeroPrototype.tsx`, `v2/V2Hero.tsx`, `v2/JourneyScenes.tsx` and related `v2` CSS, not `public/flagship-journey/infinite-bc/index.html`.
- Production owns real `SelectedWork`, locale content, navigation, contact, SEO and reduced-motion behavior. Don't replace them with static duplicates.
- The standalone four-frame demo on the historical design branch is a *reference* only. Do not merge its entire Git history, and do not overwrite the Next.js motion controller's event cleanup/locale remount code.
- If a change requires both CSS and a public JS script, verify runtime contract and cache key/versioning as part of the same change.

### 3. Build / integrate conservatively
- Inspect the smallest relevant file set and existing tests.
- Keep functional changes scoped; make logical commits and push to a non-production branch.
- Merge completed task branches into integration and re-run checks there.
- Bring the current `main` into integration periodically, reconciling conflicts before they accumulate.
- Use local runtime/tunnel reviews where possible; avoid unwanted Vercel deployments or exhausted GitHub Actions quota.

### 4. Test the *integrated* experience
Run from the real repository (record exact results; do not imply tests ran if they did not):

```bash
npm run typecheck
npm run lint
npm run build
node --test tests/approved-four-frame-integration.test.mjs
```

For website/motion work, also review the real homepage in a browser: EN/KA/NL, 320/390px mobile, desktop, scroll forwards/backwards, paused transitions, reduced motion, reloading/cached scripts, locale remount and real #work destination. A source-only test cannot establish text visibility or visual acceptance.

**Specific regression:** the integrated Card 3 once rendered blank because new visibility CSS could combine with an old motion controller from the same static URL. PR #19 changed the script asset key/fallback. Verify the actual displayed Card 3; don't report the suspected cause as proven without a browser reproduction.

### 5. Release gate
- Compare integration to up-to-date `main`; ensure only release changes remain, no abandoned studies.
- PR description lists base/head SHAs, exact scope, executed checks, browser/device evidence, known risks and rollback point.
- Founder reviews the **integrated** app and gives explicit approval.
- Only then merge to `main` and verify live site. Keep historic design reference and clean up stale branches only with authorization.

## Stop conditions
- A branch has hundreds of unrelated experimental commits: **do not mass cherry-pick**; create clean integration from latest `main` and transfer final approved implementation.
- Tests pass but browser shows a missing scene: do not claim success; diagnose DOM/CSS layers/JS/cache on the real page and rerun browser review.
- The implementation exists only in an HTML proof: not ready for main; implement in Next.js first.
- Remote build or browser cannot be run: report precisely what was unverified and leave release unapproved.
