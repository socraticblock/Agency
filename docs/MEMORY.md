# Memory Index

- [001] Implemented 5 interactive lead generation tools with Server Actions for lead capture.
- [002] Deployed LeadGenHub on the homepage to replace the old InefficiencyCalculator.
- [003] Lead architecture/security audit documented in `docs/AUDIT_REPORT.md` with critical fixes applied in API routes and `bookStrategyAction`.
- [004] UX/funnel cohesion: shared `FunnelShell` + navbar on apply/book-strategy, lead-tool session payload for book-strategy sidebar + prefills, security headers and `.env.example`.
- [005] Smaller codebase: removed unused components, deduped `LeadGenHub` loaders/steppers, shared `formActionState` type guards, trimmed `Navbar` imports.
- [006] Architect configurator hardening: shared discovery definitions/labels, step-5 completion gate, blueprint API validation + semantic pitch keys, summary submit UX and analyzing timers, full reset + module quantity cleanup, curated module copy, StepNav a11y.
- [007] Full-stack audit in `docs/COMPREHENSIVE_AUDIT_2026-03-22.md`: build/lint/audit + SEO (missing `/api/og`, `/ka` alternates), deps CVEs, blueprint Resend-missing success, a11y gaps; `MagneticButton` `@ts-expect-error` removed for green `next build`.
- [008] Top-tier polish: dynamic `/api/og`, `sitemap.ts`/`robots.ts`, SEO alternates + Twitter images + JSON-LD image; blueprint 503 without Resend; onboarding payload limits; Zod on lead actions; `MotionConfig` + Lenis skip + CSS reduced-motion; `lang="en"`; HSTS prod; Next `16.2.1` + clean `npm audit`.
- [009] Blueprint persistence: shared `blueprintStore` lib; architect submit uses `POST/PATCH /api/architect-blueprint` (plain JSON) instead of Server Actions to avoid Next Flight `charCodeAt` failures on large payloads; Redis + dev `Map` unchanged; thin `saveBlueprint` actions remain optional.
- [010] Architect audit handover: VIP modal (name + company) before analyze; loading phrases use lead; WhatsApp prefill + `995591039019`; handover email-only for PDF; `PATCH` still sends full `lead`.
- [011] Discovery → step 5: `isAnswerValidForDiscoveryQuestion` aligns Continue/keyboard with `isDiscoveryComplete` (fixes color_palette drift); `goToStep` returns boolean; Generate Blueprint gated on full completion + user-visible errors if navigation blocked.
- [012] Dead-code trim: removed `@upstash/redis`, `nanoid`; deleted unused `StepNavigation`, `SummarySidebar`, `lib/agents/*`, `lib/services/sovereignModel`; dropped empty `agents`/`services` dirs.
- [013] Architect blueprint: no Redis/server blob; `KV-` id from `sessionStorage` via `clientBlueprintId`; handover + WhatsApp use client id; PDF request uses `POST /api/blueprint` with `blueprintId` + contact + full audit; removed `blueprintStore`, `/api/architect-blueprint`, `saveBlueprint`, `ioredis`.
- [014] Slow dev/LAN hydration: hero + scroll sections used Framer `initial` opacity 0 and `ScrollReveal` opacity floor 0.15; fixed with `initial={false}` on critical motion + scroll-only scale/y (no opacity dimming).
- [015] Mobile-friendly pass: viewport export + safe areas; Navbar slide-out menu (lg+ desktop links); anchor `scroll-margin-top`; `touch-form-control` / 16px inputs; hero parallax off for coarse pointer + reduced motion; Architect/LeadGen touch targets and horizontal scroll polish.
- [016] Real-device touch fixes: LeadGenHub removed window scroll spring + blur/scale carousel; lazy-mount tool chunks ±1 slide; `MagneticButton` plain link/button on coarse/`hover:none`; Navbar menu z-index + `touch-manipulation`; Roadmap `useTransform` + `initial={false}` / viewport amount; Sovereign mobile accordion `type="button"`.
- [017] Framer `useScroll` targets: `ScrollReveal` root is always `relative`; `StickyCardStack` uses a `relative` wrapper ref for scroll tracking (sticky card no longer the ref target).
- [018] Architect step-2 `ModuleItem` accordion: price/header taps + `touch-manipulation`; STATUS control isolates `stopPropagation`; configurator scroll panel `touch-manipulation`.
- [019] Ref-counted `acquireBodyScrollLock` (`html`+`body` overflow, measured gutter padding); `Navbar`/`LeadGenHub`/`ConfigDrawer`; LeadGenHub split tab/content refs + Escape; `ConfigDrawer` duplicate closing JSX removed.
- [020] Dashboard fallback: removed `LeadGenHub` document scroll lock entirely; overlay remains fullscreen with internal scroll to eliminate any possible stale page lock from that flow.
- [021] Dashboard close hardening: removed top-level `AnimatePresence` exit layer for Sovereign overlay and force-cleared `html/body` inline overflow styles in `closeDashboard` to avoid ghost fixed layer + stale lock leftovers.
- [028] Canonical WhatsApp intake and `wa.me` default: `WHATSAPP_INTAKE` `995579723564`; `generateWhatsAppLink` imports it; `createLocalBusinessSeo` default `telephone` `+995579723564`.
- [029] Lane 1 Digital Business Card: `/{locale}/start` with sector grid, `BusinessCardTemplate` preview, persisted customizer (`genezisi_lane1_customizer_v1`), WhatsApp order via `buildLane1WhatsAppUrl`; warm lane UI; sitemap `/start` + optional `/enterprise` placeholder; homepage hero + Navbar link.

# Detailed Observations

## [001]
- **Context:** Needed highly persuasive, interactive tools to replace old Audit/Chat tools for social-media-dependent businesses.
- **Decision:** Built 5 interactive client components (TrueAudienceVisualizer, LostWeekendCalculator, FrictionRaceSimulator, TimeDebtReceipt, PlatformRiskMeter) using Framer Motion for animations, feeding into a shared `LeadCaptureForm` that uses React 19 `useActionState` and Server Actions for data submission.
- **Impact:** Provides engaging, zero-refresh lead capture flows while maintaining token-efficient component isolation and leveraging Next.js 15 server capabilities.

## [002]
- **Context:** Needed a logical, non-overwhelming way to present all 5 new lead gen tools to first-time visitors on the homepage.
- **Decision:** Created a `LeadGenHub` tabbed interface component and swapped it in for the old `InefficiencyCalculator` on `src/app/[locale]/page.tsx`.
- **Impact:** Allows users to self-select their biggest pain point without cluttering the homepage with 5 stacked tools, maintaining a clean user journey right after the value propositions.

## [003]
- **Context:** Needed a concrete security/architecture review of the Next.js app (public APIs, Supabase, email, Gemini test route).
- **Decision:** Authored `docs/AUDIT_REPORT.md` and shipped fixes: production lockout for `GET /api/test`, fail-closed `bookStrategyAction` on Supabase errors, blueprint email HTML escaping + safer subject/reply_to + Resend error handling.
- **Impact:** Reduces API abuse and silent data-loss UX; documents remaining work (RLS, rate limits, CSP) without a bloated in-chat summary.

## [004]
- **Context:** Homepage lead tools and Apply both route to book-strategy but only Apply persisted context; funnel pages lacked site chrome; operators needed env documentation.
- **Decision:** Added `src/lib/leadSession.ts`, `LeadCaptureForm` session write + optional “Continue now”, typed `LeadCaptureState` vs `BookStrategyFormState`, `FunnelShell` with `Navbar` on apply/book-strategy, unified LeadGenHub loading copy, `next.config` security headers, `.env.example` + gitignore exception, removed dead `ViewPackagesCTA` import.
- **Impact:** Book-strategy shows tool insights and prefills contact fields from the lead form; consistent navigation through conversion; clearer deploy setup without claiming “perfection” in code comments.

## [005]
- **Context:** Repo carried orphaned marketing components and repeated patterns (five identical `dynamic()` blocks, duplicated stepper markup, verbose action-state checks).
- **Decision:** Deleted unused `InefficiencyCalculator`, `FootprintGrid`, both `CitationBadge` variants, and `LanguageToggle`; refactored `LeadGenHub` to data-driven `dynamic` loaders + shared `AuditStepper`; added `src/lib/formActionState.ts` guards for lead/booking actions; dropped dead `Navbar` router/pathname imports; removed empty `src/components/layout` folder.
- **Impact:** Less maintenance surface and clearer bundle boundaries for the hub; type guards keep action state handling consistent without repeating `"success" in state` chains.

## [006]
- **Context:** Architect funnel had mismatched discovery answer keys vs email route, weak step-5 gating, silent blueprint submit failures, timer leaks on unmount, incomplete `clearConfiguration`, and curated module step UX drift.
- **Decision:** Centralized question data in `src/lib/discovery/` (`discoveryDefinitions`, `DISCOVERY_QUESTION_LABELS`, `buildDiscoveryQuestions` + `isDiscoveryComplete`); aligned `useConfigurator` step 5, Resend payload (semantic pitch/hook, labels, body size cap, email validation, pricing rows), `SummaryDashboard` loader/submit/analyzing effect, `ModuleGrid` copy; tightened foundation typings on `FoundationCard`/`FoundationGrid`.
- **Impact:** Ops emails match UI discovery data; users see errors on failed blueprint POST; no interval leaks; reset clears quantities and UI chrome; StepNav exposes step state to assistive tech; single source of truth reduces drift when adding questions.

## [007]
- **Context:** User requested a comprehensive audit beyond the existing security-focused `AUDIT_REPORT.md`.
- **Decision:** Ran `npm run lint`, `npm run build`, and `npm audit`; reviewed API routes, Server Actions, middleware, SEO (`seo.ts`, layout), funnel submit paths; documented findings in `docs/COMPREHENSIVE_AUDIT_2026-03-22.md`; removed stale `@ts-expect-error` in `MagneticButton.tsx` that blocked TypeScript build.
- **Impact:** Single doc tracks cross-cutting gaps (OG 404, hreflang/ka mismatch, npm advisories, blueprint false success without Resend, no reduced-motion); production build is green for CI gating.

## [008]
- **Context:** User asked to bring the marketing site to a “top tier” bar after the comprehensive audit.
- **Decision:** Shipped OG image route (`next/og` edge), App Router `sitemap`/`robots`, corrected SEO alternates and Twitter card image, fail-closed blueprint when Resend is missing, bounded onboarding JSON bodies, Zod validation on lead/booking actions, Framer `MotionConfig reducedMotion="user"` + Lenis bypass + global CSS for reduced motion, root `lang="en"`, production HSTS header, upgraded Next/eslint-config to 16.2.1 and cleared npm audit.
- **Impact:** Better social previews and crawler signals, honest error UX for misconfigured email, less abuse surface on onboarding payloads, stricter lead data hygiene, improved a11y for motion sensitivity, current security patches on the framework.

## [009]
- **Context:** Submitting the architect audit called `saveBlueprint` while `REDIS_URL` was unset or invalid; `new Redis("")` or a bad URL could make ioredis throw `Cannot read properties of undefined (reading 'charCodeAt')` (often on the first `SET`, not in the constructor), surfaced in `SummaryDashboard` as a cryptic submit error.
- **Decision:** Lazy-create Redis only when `REDIS_URL` is non-empty; try/catch on constructor; try/catch on every `SET`/`GET`, disconnect on failure; in `development` flip to an in-module `Map` after Redis errors (or when URL missing); production returns explicit misconfiguration/reachability errors; normalize payload with `JSON.parse(JSON.stringify)` inside the action.
- **Impact:** Local dev survives missing or broken Redis without opaque parser errors; production gets actionable messages; avoids spinning a broken Redis client on every request after one failure.

## [010]
- **Context:** User wanted a professional lead-gen handover: identify the prospect before the terminal animation, personalize loader copy, pre-filled WhatsApp, and drop duplicate name/company fields on the final card.
- **Decision:** `SummaryDashboard` opens a VIP modal on “Submit for Architectural Review”; “Secure my blueprint” validates then runs the existing POST flow; `loadingPhrases` depend on `lead.name` / `lead.company` (with truncation); WhatsApp uses the intake number aligned with `FoundationGrid` and a fixed message template with ID; handover form is email-only while `handleLeadSubmit` still PATCHes `{ name, company, email }` from state.
- **Impact:** Clearer funnel positioning without API changes; Escape / backdrop / X close the modal; build remains green.

## [011]
- **Context:** Users on the last discovery question saw “Processing…” then stayed on step 4 because `goToStep(5)` no-oped when `canGoToStep(5)` required `isDiscoveryComplete` while the UI only checked `hasAnswer` for the current question (e.g. incomplete 3-color palette allowed).
- **Decision:** Exported `isAnswerValidForDiscoveryQuestion` matching completion rules; DiscoveryModule uses it for Continue/Enter; last-step primary action requires full `isDiscoveryComplete`; `handlesSubmit` pre-checks + reads `goToStep` boolean with amber error copy; `goToStep` returns `boolean` from `useConfigurator`.
- **Impact:** Step 5 opens when and only when discovery data satisfies the same rules as the configurator gate; fewer silent failures.

## [012]
- **Context:** User asked to execute codebase shrink/cleanup: unused deps and orphan modules identified in review.
- **Decision:** Removed npm packages `@upstash/redis` and `nanoid` (no `src` imports); deleted `architect/_components/StepNavigation.tsx` and `SummarySidebar.tsx` (superseded by `StepNav` / `Configurator` flow); removed unused `src/lib/agents/sovereignAudit.ts`, `sovereignConciergePrompt.ts`, and `src/lib/services/sovereignModel.ts`; removed empty `lib/agents` and `lib/services` directories.
- **Impact:** Fewer dependencies (442 audited, 0 vulns at trim time), less dead surface area; `next build` green. R3F/NanoBanana background left unchanged as a separate optional follow-up.

## [013]
- **Context:** User wanted no server-side blueprint storage; email/WhatsApp + client as truth; stable blueprint id per browser tab for manual CRM; remove Redis entirely.
- **Decision:** Added `src/lib/blueprint/clientBlueprintId.ts` (`getOrCreateBlueprintId`, `clearBlueprintSessionId`, `sessionStorage` key `kvali_architect_blueprint_id`); `SummaryDashboard` no longer POSTs to `/api/architect-blueprint`—finalize runs analyzer then sets id from client helper; `PATCH` replaced by `POST /api/blueprint` including `blueprintId`, `leadName`, `leadCompany` plus existing audit fields; email template adds Blueprint ID / name / company rows and subject prefix; deleted `blueprintStore.ts`, `/api/architect-blueprint`, `saveBlueprint` actions; `useConfigurator` `clearConfiguration` clears session blueprint id; removed `ioredis` from `package.json`.
- **Impact:** No Redis or in-memory blueprint map on server; `npm` smaller; operator must use Resend email for full dossier; same tab re-finalize reuses id until session cleared or full reset.

## [014]
- **Context:** Mobile testing against `next dev` over LAN showed missing hero headline and ghosted accordions while localhost and Vercel looked fine.
- **Decision:** Hero headline variant container uses `initial={false}`; `ScrollReveal` drops scroll-linked opacity (keeps scale/y); `KineticText`, `SovereignFaq`, and `SovereignTriptych` `whileInView` blocks use `initial={false}` so content is not stuck at opacity 0 before motion runs.
- **Impact:** Above-the-fold and in-section text stay readable when dev bundles hydrate slowly; slight reduction in fade-in staging on first paint; production behavior remains acceptable.

## [015]
- **Context:** Site was desktop-first; expected growth in phone traffic required layout, navigation, touch, and iOS form behavior without a full redesign.
- **Decision:** Root `viewport` + `themeColor`; removed root `overflow-hidden` (sticky-safe); body `overflow-x: clip` + horizontal safe-area padding; `.scroll-anchor-target` for `#footprint` / `#contact` / lead hub; `Navbar` hamburger + drawer under `lg`, CTA visible on mobile; shared `.touch-form-control` (16px min height) on lead/apply/book-strategy/Summary VIP/ConfigModal/Discovery custom fields/onboarding inputs; `KineticHero` disables mouse parallax for `(pointer: coarse)` or `prefers-reduced-motion`, scales down blur orbs on small viewports; `StepNav` horizontal scroll + larger step hit targets; `LeadGenHub`/`Configurator`/`GlobalFooter` safe-area and touch-pan-x / overscroll tweaks.
- **Impact:** Better tap targets, fewer iOS input-zoom quirks, hash navigation clears sticky header, architect flow usable on narrow screens; slightly taller header on notched devices via safe-area padding.

## [016]
- **Context:** Desktop narrow viewport worked while real phones (multiple browsers) saw dead menu, stuck scroll at interactive tools, roadmap/tools not appearing—pointer/touch + main-thread cost, not CSS breakpoints alone.
- **Decision:** `LeadGenHub` drops Framer `animate(window.scrollY)` viewport correction, removes per-slide `filter: blur` + scale animation and `touch-pan-x`; throttles `onScroll` with `requestAnimationFrame`; mounts heavy `dynamic()` tool components only for `activeIndex±1`. `MagneticButton` uses plain `<Link>`/`<button>` when `(pointer: coarse)` or `(hover: none)` to avoid motion transform stack on touch. `Navbar` raises mobile cluster/menu `z-index` and adds `touch-manipulation`. `RoadmapTimeline` uses `useTransform` instead of `useSpring` on scroll progress; phase list `initial={false}` + looser `whileInView` viewport. `SovereignTriptych` mobile accordion `type="button"` + `touch-manipulation`.
- **Impact:** Fewer scroll fights and GPU stalls on phones; menu and accordions receive reliable taps; roadmap and tools hydrate without waiting on expensive off-screen effects; desktop mouse keeps magnetic polish.

## [017]
- **Context:** Browser console warned that scroll offset requires a non-static positioned container for Framer `useScroll` targets.
- **Decision:** `ScrollReveal` always applies `relative` on its `motion.div` ref; `StickyCardStack` `StickyCard` attaches `useScroll` `target` to an outer `div.relative` and keeps transforms on the inner `motion.article` (sticky).
- **Impact:** Clears Framer layout measurement warning for those components; THREE `Clock` deprecation (if present) remains upstream in Three/R3F until dependency updates.

## [018]
- **Context:** Live mobile architect step 2 often needed multiple taps to expand module rows; users hit price/STATUS area while the parent used `stopPropagation` on the whole right cluster.
- **Decision:** Removed wrapper `stopPropagation` so price taps bubble to the card toggle; `type="button"` + `stopPropagation` + `touch-manipulation` + mobile min hit target on STATUS only; `touch-manipulation` on module card and `Configurator` main `overflow-y-auto` panel.
- **Impact:** First-tap expand works when tapping price or title; STATUS still toggles selection without collapsing/expanding; aligns with prior mobile `touch-manipulation` fixes without widening scope beyond architect UI.

## [019]
- **Context:** Sovereign dashboard + mobile menu both set `document.body.style.overflow`; restoring a saved `prev` of `hidden` left the homepage non-scrollable; duplicate `ref` on tab strip vs content broke scroll helpers; `ConfigDrawer` had duplicate closing JSX breaking `tsc`.
- **Decision:** `lib/bodyScrollLock.ts` ref-count locks `documentElement` and `body`, uses measured scrollbar width for gutter mode; `Navbar`, `LeadGenHub`, `ConfigDrawer` call `acquireBodyScrollLock`; `LeadGenHub` uses `tabStripRef`/`dashboardContentRef`, `closeDashboard` resets science overlay, Escape closes science then dashboard.
- **Impact:** Stacked overlays release scroll only when all close; tab horizontal scroll and tool vertical scroll use correct refs; typecheck passes; no dedicated route required.

## [020]
- **Context:** User still reproduced dead wheel/touchpad scrolling after closing the Sovereign dashboard despite ref-counted global lock changes.
- **Decision:** Removed `LeadGenHub`'s document scroll lock acquisition entirely so the dashboard no longer mutates `html/body` overflow; kept fullscreen fixed overlay + internal `overflow-y-auto` content and close-state hygiene.
- **Impact:** The dashboard open/close path cannot leave document scroll locked, because it no longer participates in document-level locking; background movement risk is limited to overlay edge cases and is preferable to a stuck page.

## [021]
- **Context:** Scroll still froze after interacting with non-first dashboard tools, suggesting an invisible fixed overlay or stale inline overflow persisted after close rather than active lock management alone.
- **Decision:** Replaced the top-level dashboard wrapper from `AnimatePresence` + exiting `motion.div` to direct conditional `<div>` mount/unmount (no exit retention), and made `closeDashboard` hard-reset `document.documentElement.style.overflow`, `document.body.style.overflow`, and `document.body.style.paddingRight`.
- **Impact:** Closing the Sovereign dashboard now removes the fullscreen layer synchronously and clears residual inline scroll styles in the same tick, reducing chance of ghost overlay/wheel capture across tool transitions.

## [028]
- **Context:** Business and SEO surfaces needed consistent WhatsApp and schema `telephone` without placeholder drift across `content.ts`, `routing.ts`, and JSON-LD defaults.
- **Decision:** Set `WHATSAPP_INTAKE` to `995579723564`; `generateWhatsAppLink` defaults to `WHATSAPP_INTAKE` instead of a placeholder; `createLocalBusinessSeo` default `telephone` is `+995579723564` (E.164).
- **Impact:** All `wa.me` links and `PackageGrid` WhatsApp CTAs use one number; LocalBusiness schema matches the real line unless a page overrides `telephone`.

## [029]
- **Context:** Product plan required a fast “digital business card” lane with live preview, sector presets, and WhatsApp intake separate from the main dark marketing site.
- **Decision:** Added `src/app/[locale]/start/*` (template + client customizer, mobile bottom sheet for fields), `lane1-pricing` + `buildLane1WhatsAppUrl`, Navbar + hero CTAs to `/start`, sitemap entries for `/start` and `/enterprise`, and aligned `SHIELD_TIERS` paid prices to **50 / 150 / 750** ₾ in `pricing.ts` per brainstorm/spec.
- **Impact:** One URL for card orders and preview; architect/shield pricing stays consistent site-wide; SEO discovers the new funnel from `sitemap.ts`.
