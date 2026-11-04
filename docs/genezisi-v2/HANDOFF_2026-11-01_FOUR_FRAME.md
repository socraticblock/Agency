# Genezisi Website — Current-State Handoff (1 November 2026)

**Use this first when continuing in a new chat.** Repository: [`socraticblock/Agency`](https://github.com/socraticblock/Agency). 
**Last verified `main`:** `4065754e4fc1bd0e1d36704fc4fdb54b971cc45e` (2026-11-01 13:04:40 UTC); **always fetch the current head**, since it may change.
**Purpose:** status, accepted creative direction, real application entrypoints, current blockers and next actions. This file supersedes outdated *current-state claims* in October prototype documents; historical design studies remain available on their original branches.

## Current release state — distinguish these facts
- **Founder-approved standalone visual design:** Cards 1–4, including Card 2 editorial facade, Card 3 architectural approach + three steps, Card 4 typographic resolution, diagonal headline reveal and shorter scroll into Work.
- **Integrated into real Next.js app:** PR [#18](https://github.com/socraticblock/Agency/pull/18), merged to `main` at `28f86a0`; it transfers Cards 2–4 into React `en`/`ka`/`nl` components and retains existing Screen 01/V6.5/real Selected Work.
- **Observed regression after integration:** founder's 2026-11-01 recording showed an empty green interval where Card 3 should appear. The source tests did **not** catch it.
- **Candidate mitigation merged:** PR [#19](https://github.com/socraticblock/Agency/pull/19) merged into `main` at `4065754`. It versions the motion script URL and makes the Card 3 visibility fallback tolerant of a stale cached script. **This is a plausible fix, NOT a browser-verified resolution yet.**
- **Remaining acceptance:** rerun the real integrated homepage on desktop and mobile, confirm Card 3 actually renders, then test reverse scroll, Card 4, locales and fallback. Also review new Georgian/Dutch copy for meaning and line wrapping. Do not call the new integration visually accepted until the founder confirms it.

## Frozen four-frame art direction
1. **Card 1 / opening:** approved "Your website is only the beginning." Cream opening; "Explore our work" opens approved V6.5 Digital Passage shortcut to the genuine Work section. Preserve existing Next.js production implementation. No unrequested redesign.
2. **Card 2 / facade:** dark evergreen site window, distinct Websites / Automation / AI systems, editorial "Built around your ideas." Three independent disciplines. Approved responsive desktop/mobile design.
3. **Card 3 / room:** Card 2 transforms into a believable green architectural room; a centered reading plane approaches. "From idea to a *working solution.*" plus **Understand**, **Create**, **Make it real** process steps. Steps begin during the camera approach, staggered, settle before the next fold. Founder approved the standalone result; integration rendering must be checked.
4. **Card 4 / resolution:** pared-back dark-green full-screen typography — "Made to be seen. *Built to work.*" No repeated services grid or extra Work CTA. Moving diagonal C plane itself uncovers already-positioned headline; no separate fade. The final pinned interval is shortened to ~0.28 viewport heights after the full composition, then the **real** Selected Work begins. Visually approved in the standalone proof.

**Final feature branch / reference:** `feature/hero-four-frame-design-2026-11-01` at `73989661e9117da23c5785f90945b6a76f4f733d`. **Do not merge this entire branch.** It is the historic source of accepted standalone visual poses and contains extensive superseded history.

## Production app files and integration contracts

| Responsibility | Current production source |
| --- | --- |
| Homepage assembly | `src/app/[locale]/_components/SignalHeroPrototype.tsx` |
| Card 1 / facade Card 2 | `src/app/[locale]/_components/v2/V2Hero.tsx` |
| Architecture and Cards 3–4 | `src/app/[locale]/_components/v2/JourneyScenes.tsx` |
| Shared existing scene styles | `src/app/[locale]/_components/v2/scroll-journey.css` |
| Approved Card 2–4 scoped styles | `src/app/[locale]/_components/v2/approved-four-frame.css` |
| Approved Screen 01 styles | `src/app/[locale]/_components/v2/entry-hero.css` |
| Native, reversible scroll controller | `public/flagship-journey/infinite-bc/motion.js` |
| V6.5 Work shortcut | `public/flagship-journey/infinite-bc/digital-passage-nav.js`, `digital-passage-scene-v6-5.js` |
| Real projects and destinations | `src/app/[locale]/_components/v2/SelectedWork.tsx` |
| Localized page content | `src/app/[locale]/_components/v2/hero.copy.ts` and component-local `COPY` |
| Regression test | `tests/approved-four-frame-integration.test.mjs` |

Additional homepage sections (Capabilities, V2Lab, FounderClose, StudioFooter), contact links, route SEO and language switching must remain in place.

The old HTML file `public/flagship-journey/infinite-bc/index.html` on the **historical design branch** was a noindex standalone proof; its mirrored Work cards are not the production Work section. Changes must be made to real Next.js files for future shipping work.

## Immediate next-session checklist
1. Read this handoff and [branch/release policy](../development/BRANCHING_INTEGRATION_RELEASE.md). Fetch latest `main` and open PRs. **Do not rely on stored SHAs as current.**
2. Check the post-PR#19 live **Next.js homepage**: in English, scroll Card 2 → Card 3 (architecture and ALL three process steps) → Card 4 → Selected Work. Scroll backward. If blank Card 3 persists, inspect computed `visibility`, `opacity`, `clip-path`, cached `motion.js` response, motion `data-mode` and runtime exceptions at the observed scroll position. Diagnose actual failure; don't assume the cache hypothesis.
3. Repeat on portrait mobile (at least 390px and 320px), reduced-motion mode, and after changing `en`/`ka`/`nl`. Check text fitting and labels. Verify the Screen 01 Work shortcut still lands on the real Work destination.
4. Run locally and record results: `npm run typecheck`, `npm run lint`, `npm run build` and `node --test tests/approved-four-frame-integration.test.mjs`. Source-level tests passing alone cannot certify the browser presentation.
5. If fixes are needed, create one focused task branch from latest `main`, implement in actual production architecture, run QA, open focused PR, and obtain founder visual approval before merge.
6. After the full experience passes, choose the **next website feature**; use the branching workflow for ongoing work. Don't reopen already accepted design without founder direction.

## Working agreement for future website development
- User/founder makes creative and visual acceptance decisions; coder handles code and automated checks. Avoid coder claiming founder-tested results.
- Founder prefers focused changes, minimal unnecessary branches, limited deployment quota, and no repeated long speculative design cycles. Multiple edits to the same unfinished feature stay together.
- No feature is complete for release until its integrated production-architecture behavior has been exercised in a real browser.
- On status, be precise: **implemented**, **source-tested**, **build-tested**, **visually reviewed**, **merged**, and **live verified** are distinct.
- No blanket merge from historical prototype branches.
