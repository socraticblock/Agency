# Genezisi repository cleanup — audit and validation record (2 November 2026)

**Base:** `main` @ `ce202f691b4f34badf9867509a54510c8ba78b28`.
**Branch:** `chore/retire-old-website-iterations-2026-11-02`.
**Status:** DRAFT. Every removal below was validated by a full import-graph scan, typecheck, lint, production build, the existing test suites against a *served* build, and a browser pass. Nothing here is deployed, merged or previewed.

This document supersedes the first-pass audit of the same name. It records what was removed, how it was proven safe, what was deliberately preserved, and what remains for a later pass.

---

## 1. Scope and boundaries

This PR retires source that belonged to **earlier website iterations and that nothing references any more**. It does not redesign anything, and it does not touch:

- the approved four-card homepage (`SignalHeroPrototype` → `v2/*`, `public/flagship-journey/infinite-bc/motion.js`) or its CSS;
- the digital-business-card product (`/start`, `/c/[slug]`, order/card/admin APIs, migrations, customizer, presets, overlays, templates);
- pricing, partner, work, blog, apply, enterprise, stop-renting, onboarding, APIs, SEO or middleware;
- dependencies or `package-lock.json`;
- the accepted creative direction (PR #12) or the current production handoff (PR #20).

---

## 2. Method: a repository-wide import graph, not a route-entry scan

The first pass audited the direct imports of all 49 route `page`/`layout`/`route` entry points. That is not sufficient, and it is exactly how `SovereignVisualizers.tsx` was wrongly deleted — no route imports it directly, but `SovereignTriptych.tsx` does, through six `next/dynamic` calls.

This pass therefore resolves **every** module-specifier form in the repository, across `src/`, `tests/`, `middleware.ts` and the config files:

- `import x from "…"`, `import { … } from "…"`, `import "…"` (side-effect);
- `export … from "…"` and `export * from "…"` (re-exports);
- `import("…")` (dynamic) and `require("…")`;
- CSS `@import` / side-effect CSS imports;
- the `@/*` → `./src/*` path alias, extension and `/index` resolution, and directory-relative resolution.

Result at the first-pass head (`b56e7c0`): **310 TypeScript/JavaScript files scanned, 69 entry points, 76 modules with no path from any entry, 0 unresolved specifiers.** Route files, `middleware.ts`, `next.config.ts`, the test files and every Next.js special file (`page`, `layout`, `route`, `template`, `not-found`, `error`, `sitemap`, `robots`, `opengraph-image`, …) were entries; a module counts as live only if some entry reaches it transitively.

The three `public/flagship-journey/infinite-bc/*.js` files show as unreachable by static analysis because they are loaded by `<Script src>` and by each other at runtime, not imported. They are **live** and untouched.

### The correction, and the proof it was needed

`SovereignVisualizers.tsx` is restored on this branch and is not removed. The dependency is real, and it is checked by `tsc`, which type-checks every file matched by `tsconfig.json`'s `include` (`**/*.ts`, `**/*.tsx`) — including modules no route imports. Removing `SovereignVisualizers.tsx` from the working tree and running `tsc --noEmit` produces:

```
src/app/[locale]/_components/SovereignTriptych.tsx(13,43): error TS2307: Cannot find module './SovereignVisualizers' or its corresponding type declarations.
… five more, one per dynamic import …        (tsc exit 2)
```

The file was restored from a backup copy and its SHA-256 confirmed unchanged (`1fbf3ef8…3534e5ec`); `tsc --noEmit` then exits 0. So: **an unreachable module is still type-checked, and "no route imports it" is not evidence that a file is unused.**

---

## 3. Removed by this branch

### 3.1 First pass (already on the branch before this review)

| Path | Reason |
|---|---|
| `fix_wrap.mjs` | One-off Windows-only textual repair script for `FoundationGrid.tsx`, a component that does not exist on `main`. Zero references. |
| `partner-page.patch` | Historic April 2026 patch artefact. The `/partner` route and its components are untouched. |
| `src/app/[locale]/_components/HomeLandingPage.tsx` | Previous homepage implementation. The locale homepage renders `SignalHeroPrototype`, and nothing imports this. |
| `src/app/[locale]/_components/KineticHero.tsx` | Previous kinetic hero, superseded by `V2Hero`. Zero references. |
| `src/app/[locale]/_components/StickyCardStack.tsx` | Earlier scrolling card section. Zero references. |

### 3.2 Added in this review

| Path | Reason |
|---|---|
| `src/app/[locale]/_components/visualizers/` (6 files: `BridgeVisual`, `ConversionVisual`, `DesignVisual`, `InterceptVisual`, `SpeedVisual`, `VaultVisual`) | An abandoned first implementation of the six visualizers, superseded by the versions inside `SovereignVisualizers.tsx`. Zero importers anywhere in `src/`, `tests/`, config or docs — verified by a repository-wide search for the directory name and for every exported symbol. |
| `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` | Create-Next-App starter placeholders. No reference in markup, CSS (`url()`), tests, docs, `robots.txt`/`sitemap.ts`, or the built `.next` output. |
| `eslint.config.mjs` — the `"fix_wrap.mjs"` ignore entry | Stale once the file it ignored is gone. |

`public/f6fa9a50bd67e3642cff38cceb7b9349.txt` looks like debris but is **preserved**: its name and content are an ownership/verification key file served from the site root. Files like this exist to be requested by an external service, so "nothing in the repository references it" is the wrong test for them.

---

## 4. Validation evidence

All commands were run on this branch's tree, in a dedicated worktree, with `npm ci` from the committed lockfile.

| Check | Command | Result |
|---|---|---|
| Install | `npm ci` | 457 packages; 20 advisories (17 moderate, 3 high) — identical to `main`, dev-toolchain only (`TOOLCHAIN-01`) |
| Types | `npx tsc --noEmit` | exit 0 — and 295 project files reported by `--listFiles`, so the checker really did read the project |
| Types (baseline `main`) | `npx tsc --noEmit` | exit 0 — no new diagnostics |
| Lint | `npx eslint .` | 0 errors, 234 warnings |
| Lint (baseline `main`) | `npx eslint .` | 0 errors, 237 warnings — the three-warning difference is the three unused-import/`any` warnings inside the deleted `visualizers/*` files, confirmed by linting that directory on its own |
| Build | `npm run build` | exit 0; every route in the manifest builds |
| Four-frame regression | `node --test tests/approved-four-frame-integration.test.mjs` | 10 passed, 0 failed |
| Served-build routes | `BASE_URL=http://127.0.0.1:3100 node --test tests/home-i18n/routes.test.mjs` | 25 passed, 0 failed |
| Accessibility / locale payload | `… tests/home-i18n/assets-a11y.test.mjs` | 10 passed, 0 failed |
| Content / clock | `… tests/home-i18n/content.test.mjs` | 14 passed, 0 failed |
| Metadata / head | `… tests/home-i18n/head.test.mjs` | 17 passed, 0 failed |
| OG image safety | `… tests/og-safety.test.mjs` | 30 passed, 0 failed |
| **Total** | | **106 tests, 0 failures** |

The `home-i18n` and `og-safety` suites need a *served* build on `127.0.0.1:3100`; they legitimately fail with `ECONNREFUSED` when no server is running, which is why `next start` was part of the run.

### 4.1 Nothing visual changed — proved three ways

A green build does not prove a page still looks the same. Three independent checks were run against `main` built from the same lockfile and served on a second port (`127.0.0.1:3101`).

**Served-HTML equality (final tree).** For all 12 routes below, the HTML served by the branch build and by the `main` build was fetched and compared after stripping build-specific opaque identifiers (chunk/media filenames and long generated ids). The stripped token counts came out equal on both sides for every route (e.g. 265/265, 307/307), so nothing was masked asymmetrically:

`/en`, `/ka`, `/nl`, `/en/pricing`, `/en/partner`, `/en/start`, `/en/work`, `/en/stop-renting`, `/en/blog`, `/en/enterprise`, `/en/apply`, `/en/v2-prototype` — **12 of 12 byte-identical after normalisation, 0 differing.**

**Pixel comparison.** The same 12 routes were screenshotted on both builds at 1280×577 with `prefers-reduced-motion: reduce` (deterministic, no in-flight animation) and diffed: **12 of 12 pixel-identical (0 differing pixels).** `/en/stop-renting` initially differed by 13,687 px (max channel delta 55) when captured 1.2 s after load; re-captured after a 3 s settle it is identical to `main`, and identical to itself across repeat captures on both builds — an entrance animation caught mid-flight, not a regression. The final-tree CSS bundle is byte-identical (same SHA-256, 184,012 B) to the bundle those screenshots were taken against, so the pixel result carries over to the final tree.

**CSS selector set.** The Tailwind bundle dropped from **201,097 → 184,012 bytes** (−17,085 B, −8.5 %) because utilities used only by the deleted components are no longer emitted. To prove no *live* rule was lost, the selector sets of both builds were diffed and every removed selector was then run against the live DOM of 22 routes:

- **154 selectors removed, 0 added.** All are Tailwind utilities (`blur-*`, `bg-slate-*`, `-top-1/4`, …).
- **0 of the 154 match any element on any of the 22 routes** (`/en`, `/ka`, `/nl`, the four pricing routes, `/partner`, `/start`, `/start/preview`, `/work`, `/stop-renting`, `/blog`, `/enterprise`, `/apply`, `/websites`, `/booking-websites`, `/service-websites`, `/online-stores`, `/v2-prototype`, `/onboarding`, `/success`).

So the CSS shrink is dead-utility removal, not lost styling.

---

## 5. Browser verification

Run against `next start` of this branch's production build, on a real browser at 1280×577.

**Four-card journey.** `#journey` carries `data-beat` and drives the composition from native scroll position; the stage is one viewport tall over a 1,500 px travel band. Walked forward and sampled:

| scroll | beat | story progress | card 3 opacity | card 4 |
|---|---|---|---|---|
| 0 | `opening` | 0.00 | 0 | present |
| 630 px | `opening` | 0.41 | 0 | present |
| 780 px | `opening` | 0.48 | 0.93 (handover) | present |
| 930 px | `interior` | 0.55 | 1.00 | present |
| 1,110 px | `interior` | 0.66 | 1.00 | present |
| 1,470 px | `reveal` | 0.93 | 0 (handed off) | visible |

Progression is monotonic, Card 3 reaches full opacity and holds through the interior beat, and Card 3 does not disappear before Card 4 takes over.

**Reverse scroll.** Stepped back 0.98 → 0 in eight samples: every driven variable returned to its exact start value (`--p` 0, `--readInk` 0, `--depthVisibility: hidden`, opening opacity 1, card 3 opacity 0). The journey is reversible and leaves no residue at the top.

**Locales.** `/en` (`lang="en"`, "Your website is only the beginning."), `/ka` (`lang="ka"`, "თქვენი ვებსაიტი / მხოლოდ / დასაწყისია."), `/nl` (`lang="nl-BE"`, "Je website is / nog maar het / begin.", localized nav CTA "Stuur me een bericht"). All three carry the `genezisi-entry-home`, `card2-window` and `card4-resolution` markers and advance to `interior` on scroll. No price or currency string leaks onto any homepage.

**Reduced motion.** With `prefers-reduced-motion: reduce` emulated, `bc-motion-ready` is **not** added, the journey collapses from a pinned 2,077 px stage to ordinary flow (1,579 px), and all four cards render at full opacity with real dimensions and readable copy. The page is a normal static page, not a stack of invisible panels.

**Work shortcut.** Clicking "Work" in the nav from the top of the journey jumps to `#work` (scrollY 2,013), the section lands 64 px below the top, and its heading "Proof, not promises." with three work items is visible. The shortcut does not strand the stage. Card 1, Card 3 and Card 4 were also read frame by frame: Card 3 holds the approved "From idea to a working solution." three-stage composition and Card 4 the "Made to be seen. Built to work." resolution.

**Digital-card editor (`/en/start`).** The welcome overlay opens (`View Pricing`, `View FAQ`, `Start Building`, `Skip →`); dismissing it reveals the editor (2,773 px). "Profile setup" opens the panel with Company Name, Your Name, Job title, tagline, phone, email, address and subdomain fields, language mode and quick themes. Typing a name updates the live card preview. This is the whole product path the cleanup must not disturb, and it is intact.

**Pricing (`/en/pricing`) and partner (`/en/partner`).** Both render their headline, the WebGL background canvas, pricing CTAs and the 8-field partner form (5 required) — and both are pixel-identical to `main`.

---

## 6. Preserved on purpose

- **Homepage:** `page.tsx` → `SignalHeroPrototype` → `v2/V2Hero`, `v2/JourneyScenes`, `v2/SelectedWork`, `v2/StudioHeader`, `v2/Capabilities`, `v2/FounderClose`, `v2/SystemDemoState`, `v2/hero.copy.ts`, and the four `v2/*.css` files; `public/flagship-journey/infinite-bc/{motion,digital-passage-nav,digital-passage-scene-v6-5}.js`.
- **Shared primitives still used outside the homepage:** `Navbar`, `GlobalFooter`, `MagneticButton`, `KineticText`, `ScrollReveal` (all three used by `/stop-renting`), `lead-gen/TrueAudienceVisualizer`, `lead-gen/TimeDebtReceipt`, `NanoBananaBackground` (used by `/pricing` and `/partner`, and therefore `three`, `@react-three/fiber`, `@react-three/drei`).
- **Digital-card product:** `/start/**`, `/c/[slug]`, `/api/cards`, `/api/orders`, `/api/admin/*`, `d1/migrations/*`, `supabase/*`.
- **Dependencies:** unchanged. Nothing was added or removed from `package.json` or `package-lock.json` in this pass.
- **`SovereignVisualizers.tsx`** — kept because `SovereignTriptych.tsx` imports it dynamically, even though neither is reachable from a route today.
- **`public/f6fa9a50bd…txt`** — external verification key file.

---

## 7. Remaining cleanup candidates

Classified by what is actually known, not by what looks unused.

### 7.1 Safe to remove — proven unreachable, no owner decision needed

67 modules under `src/` still have no path from any route entry or test after this pass. They form one coherent group — the earlier homepage's marketing sections, the pre-V2 discovery flow and the abandoned pricing widgets:

- `_components/`: `SovereignFaq`, `SovereignSummary`, `SovereignTriptych` (+ its `SovereignVisualizers`), `TrustSection`, `TrustMetrics`, `ShieldGrid`, `TopographyGrid`, `TechStackSection`, `ScrollingBanner`, `AmbientGlow`, `StatusBadge`, `StepNav`, `StudioHeader`, `ViewPackagesCTA`, `BookStrategyView`, `PackageGrid`, `RoadmapTimeline`;
- `_components/DiscoveryModule/*` (7), `_components/discovery/QuestionRenderer/*` (6) + `discovery/DiscoveryFooter`;
- `_components/lead-gen/LeadGenHub/*` (5), `lead-gen/FrictionRaceSimulator`, `lead-gen/GenezisiSlider`, `lead-gen/PlatformRiskMeter`, `lead-gen/LostWeekendCalculator`;
- `(site)/pricing/{PricingCustomBridge,PricingModuleShowcase,TierPickerQuiz}.tsx`, `(site)/pricing/components/ProfessionalExplainer.tsx`;
- `start/components/CollapsibleSection`, `start/components/segments/ContactSocialSegment`, `start/components/start-digital-card/useHideOnScroll`, `start/lib/{order-share,placeholders}`;
- `lib/{bodyScrollLock,bot-knowledge,packages,theme,pricingWhatsApp}`, `lib/discovery/*`, `lib/blueprint/clientBlueprintId`, `lib/payments/checkout`;
- `utils/{format,routing,sanitizeUrl}`, `hooks/useTiltEffect`, `components/ui/CustomCursor`, `components/providers/LenisProvider`, `components/modals/LegalRoadmap`, `components/sections/StandalonePayments`.

They are removed from the tree but **not from Git history**, so nothing is lost. Removing them should be its own PR: it is ~40 files plus their CSS, and it deserves its own visual pass even though it is the same class of change as this one.

### 7.2 Safe to remove — but they need a dependency decision

- **`gsap`** — zero imports in `src/`, `tests/`, config or `public/`.
- **`hls.js`** — zero imports. Its only known consumer was `KineticHero.tsx:120`, which loaded it from a CDN and is deleted by this PR, so the `hls.js` half of `PERF-03` is retired with the file. The `three@0.186.1`-from-jsDelivr half in `digital-passage-scene-v6-5.js` is **not** retired and still deserves its own fix.
- **`lenis`** — only importer is `components/providers/LenisProvider.tsx`, which is itself unreachable.
- **`react-textarea-autosize`** — only importers are the two unreachable discovery components.
- **`@google/generative-ai`** — only importer is `src/app/api/test/route.ts`. That route is live and returns 200; decide whether it is still wanted before removing the dependency.
- **`three` / `@react-three/fiber` / `@react-three/drei`** — **do not remove.** They are live through `NanoBananaBackground`, which `/pricing` and `/partner` render.

Removing any of these changes `package-lock.json`, which needs a re-run of `npm ci`, typecheck, build and a browser pass. That is why none of it is in this PR.

### 7.3 Requires verification before removal

- **`/v2-prototype`** (and its `opengraph-image` route) — reachable and returns 200 under `/en`, but it behaves like an internal prototype: `/nl/v2-prototype` is deliberately a 404 in the route matrix. Decide whether it is still used for release diagnostics before touching it, then check `robots`/`sitemap` and SEO impact.
- **`/api/test`** — live route; see the dependency note above.
- **`src/components/ui/CustomCursor.tsx`, `src/hooks/useTiltEffect.ts`** — unreachable, but they are generic primitives a future surface could legitimately want; they cost nothing at runtime.
- **Historical docs that name removed files** — `docs/genezisi-v2/current-implementation-audit.md` (says the homepage renders `HomeLandingPage`) and `docs/security/2026-11-dependency-patch-and-open-findings.md` (`PERF-03`/`PERF-04` cite `KineticHero.tsx` and `HomeLandingPage.tsx`). Both were already stale relative to `main` before this PR, and **both are edited by open PR #12**, so they are left untouched here — annotating them in two branches would guarantee a conflict. Provenance rule applies: do not rewrite a record to match today's tree.

### 7.4 Preserve

- Everything in §6.
- **Historical documentation as a whole.** `docs/COMPREHENSIVE_AUDIT_2026-03-22.md`, `docs/AUDIT_REPORT.md`, `docs/genezisi-v2/research-and-creative-direction-2026-10-04.md` and the `docs/internationalization/*` release records describe decisions that were made; deleting them destroys the record, not just clutter. Mark superseded work as superseded instead.
- **Root prose** (`AUDIT-REPORT.md`, `phase3-fixes.md`, `outreach_scripts.md`) — PR #13 already covers root debris; duplicating that here would collide.

---

## 8. Coordination with open PRs

| PR | State | Relationship to this one |
|---|---|---|
| **#12** *Docs: align entire Agency repository with Genezisi Infinite Website v1.2* | open, draft | Owns the accepted creative direction: `docs/infinite-website/*`, `README.md`, `AGENTS.md`, `docs/README.md`, and addenda to `docs/genezisi-v2/*`. **This PR touches none of those files.** The four-card homepage in the tree is the approved experience the v1.2 documents describe as the current production target; nothing here contradicts it. |
| **#20** *Docs: production-architecture workflow … 1 Nov website handoff* | open, ready | Owns `docs/genezisi-v2/HANDOFF_2026-11-01_FOUR_FRAME.md`, `docs/development/BRANCHING_INTEGRATION_RELEASE.md`, `skills/genezisi-production-integration/`, `AGENTS.md`, `README.md`. **This PR touches none of those files**, and adds only `docs/maintenance/WEBSITE_CLEANUP_2026-11-02.md`. |
| **#13** *Cleanup: preserve legacy products, archive root debris …* | open, draft, stacked on #12 | **Overlaps this PR on two files and needs a decision.** #13 also deletes `fix_wrap.mjs`, and it *moves* `partner-page.patch` to `docs/archive/partner-page-2026-04-27.patch` and adds `tests/repository-cleanup.test.mjs`, which asserts that archived path exists. This PR *deletes* `partner-page.patch` instead. Whichever lands second must be reconciled: if #28 lands first, #13 keeps its own archived copy and its test still passes after a rebase; if #13 lands first, #28's deletion becomes a no-op. Flagged rather than silently resolved — archives-or-deletes is the owner's call. |

No documentation authored by #12 or #20 is overwritten, reworded or relocated by this branch.

---

## 9. Evidence limits

- The import graph proves **reachability from a route entry or test**, which is what matters for shipping, but it cannot prove that a module is not loaded by a runtime string path. Every remaining candidate was therefore also searched for by name across the whole repository.
- **No database was configured for these runs.** The build warns `Supabase env missing: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for onboarding storage`. Everything verified here is client-side or statically rendered, so the editor, preview, homepage and marketing routes are genuinely covered — but the **database-backed writes are not**: `POST /api/orders`, `POST /api/partner-applications`, `/api/onboarding` and card publishing under `/c/[slug]` were exercised only as far as rendering and field validation. Verifying them needs a configured environment, and nothing in this PR changes their code.
- Browser checks ran at **1280×577 desktop only**, in Chromium. Touch/trackpad wheel physics, mobile Safari toolbar collapse and real-device behaviour are covered by the existing tests (`approved-four-frame-integration`, `assets-a11y`) and by the owner's device pass, not by this one.
- The before/after comparison ran against `main` built locally from the same lockfile — not against the deployed production site.
- `npm audit` reports 20 advisories on both branches; they are dev-toolchain only and unchanged by this PR.
- Nothing here is merged, deployed or previewed. Final visual acceptance is the owner's.
