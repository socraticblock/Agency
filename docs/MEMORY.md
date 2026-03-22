# Memory Index

- [001] Implemented 5 interactive lead generation tools with Server Actions for lead capture.
- [002] Deployed LeadGenHub on the homepage to replace the old InefficiencyCalculator.
- [003] Lead architecture/security audit documented in `docs/AUDIT_REPORT.md` with critical fixes applied in API routes and `bookStrategyAction`.
- [004] UX/funnel cohesion: shared `FunnelShell` + navbar on apply/book-strategy, lead-tool session payload for book-strategy sidebar + prefills, security headers and `.env.example`.
- [005] Smaller codebase: removed unused components, deduped `LeadGenHub` loaders/steppers, shared `formActionState` type guards, trimmed `Navbar` imports.
- [006] Architect configurator hardening: shared discovery definitions/labels, step-5 completion gate, blueprint API validation + semantic pitch keys, summary submit UX and analyzing timers, full reset + module quantity cleanup, curated module copy, StepNav a11y.
- [007] Full-stack audit in `docs/COMPREHENSIVE_AUDIT_2026-03-22.md`: build/lint/audit + SEO (missing `/api/og`, `/ka` alternates), deps CVEs, blueprint Resend-missing success, a11y gaps; `MagneticButton` `@ts-expect-error` removed for green `next build`.
- [008] Top-tier polish: dynamic `/api/og`, `sitemap.ts`/`robots.ts`, SEO alternates + Twitter images + JSON-LD image; blueprint 503 without Resend; onboarding payload limits; Zod on lead actions; `MotionConfig` + Lenis skip + CSS reduced-motion; `lang="en"`; HSTS prod; Next `16.2.1` + clean `npm audit`.

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