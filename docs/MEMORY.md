# Memory Index

- [001] Implemented 5 interactive lead generation tools with Server Actions for lead capture.
- [002] Deployed LeadGenHub on the homepage to replace the old InefficiencyCalculator.
- [003] Lead architecture/security audit documented in `docs/AUDIT_REPORT.md` with critical fixes applied in API routes and `bookStrategyAction`.
- [004] UX/funnel cohesion: shared `FunnelShell` + navbar on apply/book-strategy, lead-tool session payload for book-strategy sidebar + prefills, security headers and `.env.example`.
- [005] Smaller codebase: removed unused components, deduped `LeadGenHub` loaders/steppers, shared `formActionState` type guards, trimmed `Navbar` imports.

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