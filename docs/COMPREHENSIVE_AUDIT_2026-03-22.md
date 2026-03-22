# Comprehensive site audit — my-agency

**Scope:** Security, architecture, build health, dependencies, SEO, performance signals, accessibility, funnel/data flows, operations.  
**Method:** Automated (`eslint`, `next build`, `npm audit`) plus targeted code review of Server Actions, API routes, middleware, SEO helpers, and critical client submit paths.  
**Date:** 2026-03-22  
**Prior work:** [`docs/AUDIT_REPORT.md`](./AUDIT_REPORT.md) (lead/security, partially remediated). This document **extends** that baseline and records **new** cross-cutting findings.

---

## Executive summary

| Area | Status | Notes |
|------|--------|--------|
| **Production build** | Pass | After removal of unused `@ts-expect-error` in `MagneticButton.tsx`. |
| **ESLint** | 0 errors, **90 warnings** | Mostly unused vars, `any`, `react/no-unescaped-entities`, `react-hooks/set-state-in-effect`. |
| **Dependencies** | **2 advisories** | `flatted` (high); `next@16.1.6` (moderate, multiple CVEs; fix suggests `next@16.2.1`). |
| **Security** | Improved vs prior report; gaps remain | No rate limiting/CAPTCHA; service-role Supabase; `/api/test` still present in dev; blueprint “success” when Resend missing. |
| **SEO / metadata** | **Issues** | Open Graph image points to **`/api/og`**, which **does not exist** (likely 404). `hreflang` / alternates reference **`/ka`**, which middleware **308-redirects to `/en`**. |
| **Accessibility** | Gap | No `prefers-reduced-motion` usage found for motion-heavy UI. |
| **Privacy / funnel** | Document | Lead/session flows; onboarding saves ignore fetch failures silently. |

---

## 1. Automated results

### 1.1 `npm run build`

- Completes successfully (Next.js 16.1.6, Turbopack).
- Warns when Supabase env vars are missing (expected in local/CI without secrets).
- Note: “Using edge runtime on a page currently disables static generation for that page” — verify which route uses Edge and whether that is intentional.

### 1.2 `npm run lint`

- **90 warnings**, 0 errors. Clusters:
  - **Unused imports/vars** — `Configurator.tsx`, `PackageGrid.tsx`, `ConfigSidebar.tsx`, `StepNav.tsx`, several architect components, etc.
  - **`@typescript-eslint/no-explicit-any`** — `MagneticButton`, `FoundationGrid`, `ShieldGrid`, `discoveryDefinitions`, `i18n` messages bridge, etc.
  - **`react-hooks/set-state-in-effect`** — `GlobalFooter`, `FrictionRaceSimulator`, `LostWeekendCalculator`, `LegalRoadmap`, `StandalonePayments`, `CustomCursor`, `useConfigurator` (hydration/guard patterns).
  - **`react/no-unescaped-entities`** — apostrophes/quotes in JSX across marketing components.

**Recommendation:** Treat warnings as backlog; optionally tighten ESLint to fail CI on `any` in new files only, or fix highest-churn files first.

### 1.3 `npm audit`

| Package | Severity | Notes |
|---------|----------|--------|
| `flatted` ≤ 3.4.1 | High | Prototype pollution — `npm audit fix` available. |
| `next` 16.0.0-beta.0 – 16.1.6 | Moderate | Multiple GHSA items (rewrites smuggling, image cache growth, postponed resume buffering, Server Actions CSRF / dev HMR). Upgrade path: **`npm audit fix --force`** → `next@16.2.1` (outside current semver range — **test thoroughly**). |

---

## 2. Security & trust boundaries

Aligned with [`AUDIT_REPORT.md`](./AUDIT_REPORT.md); **still open or newly highlighted:**

1. **Rate limiting / abuse** — Public `POST /api/blueprint`, `POST /api/onboarding`, and unauthenticated Server Actions remain spam-prone (cost: Resend, Supabase, operator time).
2. **Supabase service role** — [`src/lib/supabase/server.ts`](../src/lib/supabase/server.ts) uses service role with no in-repo RLS migrations; acceptable only with strict server-side validation and ops discipline.
3. **`GET /api/test`** — Still ships; **404 in production** only. Remove or feature-flag for non-prod to reduce accidental exposure if `NODE_ENV` is mis-set.
4. **Blueprint without `RESEND_API_KEY`** — Returns **`200` with `{ success: true, debug: ... }`** ([`src/app/api/blueprint/route.ts`](../src/app/api/blueprint/route.ts)). Client treats `res.ok` as success → user may see **success UI when no email was sent**. Prefer **`503`** or **`424`** and uniform error shape.
5. **Onboarding `form_data`** — No max size on `Record<string, string>` in [`onboarding/route.ts`](../src/app/api/onboarding/route.ts); large payloads could stress DB/network.
6. **Lead actions** — [`lead.ts`](../src/app/actions/lead.ts): no Zod/max-length validation despite `zod` in dependencies; `lead_data` JSON string on strategy booking is unbounded.
7. **Security headers** — [`next.config.ts`](../next.config.ts) sets useful headers; **CSP** still not defined (prior report M-4 partially addressed; CSP remains a gap).
8. **Logging** — `console.log` / `console.error` may include PII (e.g. blueprint “email received”); structure logs and redact for production.

---

## 3. Architecture & Next.js usage

- **Server Actions** — Lead actions return discriminated success/error shapes; consistent with React 19 `useActionState` patterns.
- **Public APIs** — Blueprint and onboarding are JSON POST handlers; validation is partial (blueprint strong; onboarding minimal).
- **Middleware** — Locale redirect and `/ka` → `/en` behave as documented in prior audit; matcher excludes `api`, static assets, and `og` segment.
- **i18n drift** — [`src/lib/i18n.ts`](../src/lib/i18n.ts) exposes `Locale` as `"ka" | "en"` but `locales` is **only `["en"]`**. [`layout.tsx`](../src/app/[locale]/layout.tsx) `normalizeLocale` maps non-`en` to **`ka`** for SEO/JSON-LD while URLs are effectively **English-only**. Risk: wrong `inLanguage`, wrong alternates, confusion when adding locales.

---

## 4. SEO & sharing

| Finding | Severity | Detail |
|---------|----------|--------|
| **Missing OG route** | High | [`src/lib/seo.ts`](../src/lib/seo.ts) sets `openGraph.images[0].url` to **`${baseUrl}/api/og?...`** — **no** `src/app/api/og` route found. Social previews may show broken images. |
| **Broken language alternates** | Medium | `alternates.languages` maps `ka-GE` → `/ka`, but **`/ka` redirects to `/en`**. Search engines may see inconsistent signals. |
| **No `sitemap.ts` / `robots.ts`** | Low–medium | No App Router `sitemap` or `robots` found; rely on defaults — may be fine for small site, but worth explicit control for `/en` canonical URLs. |

---

## 5. Performance & bundles

- **Heavy client surface** — Many `"use client"` components (Framer Motion, Lenis, lead tools, architect). Dynamic imports in `LeadGenHub` help; consider verifying **bundle analyzer** output for LCP routes.
- **Three / R3F** — Present in dependencies; ensure 3D is **route-scoped** and not loaded on the marketing homepage unless intentional.
- **Console noise in build** — Supabase warning during static generation; avoid logging secrets; consider quieting expected missing-env in CI with test doubles.

*Note: Lighthouse / Web Vitals were not run in this pass (no served URL in audit environment). Run against staging/prod for numeric scores.*

---

## 6. Accessibility

- **Reduced motion** — No matches for `prefers-reduced-motion` or `useReducedMotion` in `src/`. High-motion marketing and lead tools should respect user OS settings (WCAG 2.2).
- **Step navigation** — Architect StepNav improvements noted in project memory; extend patterns to modals, drawers, and lead forms (focus traps, `aria-live` on errors).
- **ESLint** — Many `react/no-unescaped-entities` warnings — minor for screen readers but worth cleaning for consistency.

---

## 7. Funnel & data integrity

1. **Lead capture → book-strategy** — Session payload (`leadSession`) — confirm TTL, size, and tampering story (see prior audit).
2. **`ApplyForm` / `sessionStorage`** — Documented in prior audit; still relevant for analytics/consent.
3. **Onboarding** — [`OnboardingPortal.tsx`](../src/app/onboarding/[id]/OnboardingPortal.tsx): `saveOnboarding` **swallows errors**; user may believe data persisted when it did not. Consider toast or retry.
4. **SummaryDashboard** — Blueprint submit correctly handles `!res.ok` and parses error JSON; **misleading success** if API returns 200 without Resend (see §2).

---

## 8. Operations & compliance

- **`.env.example`** — Present and aligned with major vars (per memory).
- **Dependency upgrades** — Plan Next + transitive fixes after reading [GHSA-mq59-m269-xvcx](https://github.com/advisories) (Server Actions CSRF) impact on your deployment/host headers.
- **E2E tests** — No Playwright/Cypress observed; smoke tests for lead → book → architect submit would reduce regression risk.

---

## 9. Remediation applied during this audit

| Item | Action |
|------|--------|
| **TypeScript build failure** | Removed unused `// @ts-expect-error` in [`MagneticButton.tsx`](../src/app/[locale]/_components/MagneticButton.tsx) so `next build` passes. |

---

## 10. Prioritized roadmap (suggested)

**Immediate (days)**

1. Add **`/api/og`** (or change OG image URL to a static asset under `public/`) so social cards work.
2. Fix **metadata alternates** to match real URLs (single locale → single canonical; remove or 301-align `ka` references).
3. Change blueprint response when Resend is missing to **non-2xx** or `success: false` consistently.

**Short term (weeks)**

4. **`npm audit fix`** / planned **Next 16.2.x** upgrade with regression pass.
5. Zod + max lengths on **lead** and **onboarding** payloads.
6. Rate limiting (edge or Upstash) on **blueprint**, **onboarding**, and high-volume actions.

**Medium term**

7. Supabase **RLS** + migrations for `leads`, `strategy_calls`, `onboarding_submissions`.
8. CSP policy (start report-only).
9. `prefers-reduced-motion` pass on hero, lead tools, architect.

---

## Files reviewed (this pass)

- `next.config.ts`, `middleware.ts`, `package.json`
- `src/app/actions/lead.ts`
- `src/app/api/blueprint/route.ts`, `onboarding/route.ts`, `test/route.ts`
- `src/lib/supabase/server.ts`, `src/lib/seo.ts`, `src/lib/i18n.ts`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/_components/MagneticButton.tsx`, `SummaryDashboard.tsx`
- `src/app/onboarding/[id]/OnboardingPortal.tsx`

---

## Sign-off

Point-in-time audit. Re-run after major feature work, auth changes, or Next major upgrades. Does not replace penetration testing or legal/privacy review.
