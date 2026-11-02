# Genezisi repository cleanup — first-pass audit (2 November 2026)

**Base:** `main` at `ce202f691b4f34badf9867509a54510c8ba78b28`. **Scope:** conservative cleanup of previous website iterations; this is a DRAFT until build and browser checks pass.

## Active surfaces to preserve
- **Current homepage (EN / KA / NL):** `src/app/[locale]/page.tsx` → `_components/SignalHeroPrototype.tsx` → `v2/V2Hero.tsx`, `v2/JourneyScenes.tsx`, current `v2/` sections and CSS, `public/flagship-journey/infinite-bc/motion.js`, and the digital passage scripts. The approved four-frame choreography, Card 3 fixes, native reversible scrolling, and Work links must remain intact.
- **Digital-business-card product:** `src/app/[locale]/(site)/start/**`, public card `/c/[slug]`, order/card/admin APIs, migrations, customizer, presets, overlays, templates, and associated supporting code.
- **Other existing live routes/products:** pricing and its detail pages, service/booking/e-commerce pages, `/work`, `/blog`, `/partner`, `/apply`, `/enterprise`, `/stop-renting`, onboarding, API routes and SEO. These are not safe to delete merely because the homepage no longer links to every one.
- **Shared dependencies:** `framer-motion` is still used on legacy routes; `MagneticButton`, `KineticText`, `ScrollReveal` and lead-gen visualizers are used by `/stop-renting`. Do not remove them simply because they originated in an older homepage.
- **Public project imagery, language assets, metadata, security work and historical design documentation:** preserve pending separate review.

## Files removed in this proposal
| Path | Reason |
|---|---|
| `fix_wrap.mjs` | One-off Windows-only textual repair script referencing `FoundationGrid.tsx`, a file absent from current `main`. Not part of scripts or application routes. |
| `partner-page.patch` | Historic April 2026 patch artifact; actual `/partner` route and components remain in the tree. |
| `src/app/[locale]/_components/HomeLandingPage.tsx` | Previous homepage implementation; current homepage renders `SignalHeroPrototype`, not this component. |
| `src/app/[locale]/_components/KineticHero.tsx` | Previous kinetic hero; current homepage renders `V2Hero`. Keep `MagneticButton` (used in `/stop-renting`). |
| `src/app/[locale]/_components/StickyCardStack.tsx` | Earlier scrolling persuasion section; not part of the current homepage or audited route entry points. |
| `src/app/[locale]/_components/SovereignVisualizers.tsx` | Earlier large visualizer module; not part of the current homepage or audited route entry points. |

All 49 route `page`, `layout`, and `route` entry points were inspected for their direct imports, together with the homepage composition and primary pricing/partner/stop-renting child compositions. This is **not** a complete transitive dependency scan. The files above are proposed removal candidates, not browser-verified deletions.

## Items for a second cleanup pass, not yet removed
- Other old homepage sections (`Sovereign*`, `Trust*`, `PackageGrid`, `RoadmapTimeline`, old standalone visualizers, old lead-gen islands) **only after a full import/reachability graph and build**.
- Placeholder assets `public/{file,globe,next,vercel,window}.svg` after checking CSS, markup, public URL references and any externally linked assets.
- Old `/v2-prototype` and testing routes only after confirming they are not used for release diagnostics and checking SEO/robots.
- Duplicate or abandoned docs: mark old iterations **historical/superseded** and keep the approved Infinite Website north star and current handoff easily discoverable. There is already an open docs-only PR #20, so avoid making competing README/AGENTS changes in this PR.
- Heavy dependencies (GSAP, Three/R3F, Lenis, video-related libraries, etc.) only after checking the entire codebase, build-time configuration, and package lockfile. Do not infer absence of usage from the current homepage alone.
- Legacy CSS selectors and assets only after repository-wide usage analysis.

## Validation required before merge
1. Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build` and targeted regression tests, including `tests/approved-four-frame-integration.test.mjs` and the existing route/locale suites.
2. Resolve any missing-import errors **without restoring abandoned features unless genuinely still used**.
3. In the built Next.js application, check `/en`, `/ka`, `/nl`, Card 2 → Card 3 → Card 4 (forward/reverse/fast scroll and reduced motion), genuine Work destination and passage shortcut.
4. Smoke-test `/pricing`, `/partner`, `/start`, `/c/[slug]`, `/work` and `/stop-renting` plus key forms/actions before release.
5. Obtain founder visual acceptance. Do not merge to `main` or create a `preview-*` branch without explicit approval.

**Evidence limits:** This audit used current GitHub source, not a local checkout. No npm build, full-repository import graph, end-to-end browser test or production verification has run for this proposed change. Removal of source files from the current Git tree does not rewrite past Git history or erase historical objects.
