# Lead architecture & security audit — my-agency

**Scope:** Next.js 16 app, React 19, Supabase (service role), Resend, Google Gemini.  
**Method:** Static review of server boundaries, env usage, API routes, Server Actions, and data flows.  
**Date:** 2025-03-20

---

## Executive summary

The app is a marketing / lead-generation site with Server Actions for leads, public API routes for onboarding persistence and blueprint emails, and a **development-oriented Gemini test endpoint**. Main risks are **unauthenticated abuse of paid/third-party APIs**, **service-role Supabase usage without in-repo RLS policy**, **HTML injection in outbound email**, and **integrity bugs** where the UI reports success after a failed write. Several items are **remediated in code** in the same change set as this report (see § Remediation applied).

---

## Trust boundaries

| Boundary | Mechanism | Notes |
|----------|-----------|--------|
| Browser → Server Actions | Next.js action CSRF (same-site) | No auth; spam/rate limits are app-level gaps |
| Browser → `/api/*` | Public POST/GET | No shared secret or session |
| Server → Supabase | `SUPABASE_SERVICE_ROLE_KEY` | Bypasses RLS; key must never reach client |
| Server → Resend / Gemini | Server env only | Abuse if routes are open |

---

## Findings

### Critical

| ID | Finding | Evidence | Remediation |
|----|---------|----------|-------------|
| C-1 | **Unauthenticated GET `/api/test` invokes Gemini** — quota burn, cost, and prompt injection surface | `src/app/api/test/route.ts` | **Fixed:** disabled in production (`NODE_ENV === 'production'` returns 404). Remove route entirely before GA if unused. |

### High

| ID | Finding | Evidence | Remediation |
|----|---------|----------|-------------|
| H-1 | **Supabase service role** used for all server writes | `src/lib/supabase/server.ts` | Prefer **anon key + RLS** for any user-scoped data; reserve service role for strictly server-only, validated pipelines. Add Supabase RLS policies in repo (`supabase/migrations`) and document table contracts. |
| H-2 | **Unauthenticated `/api/blueprint`** — spam to admin inbox; arbitrary `reply_to` | `src/app/api/blueprint/route.ts` | Add **Turnstile/hCaptcha**, **rate limit** (e.g. Upstash), **signed nonce** from client, or **auth** for “submit brief.” Validate email format and cap payload size. |
| H-3 | **HTML injection** in Resend HTML body (user `answers`, `email`, etc. interpolated raw) | `src/app/api/blueprint/route.ts` | **Fixed:** `escapeHtml()` on interpolated values. |

### Medium

| ID | Finding | Evidence | Remediation |
|----|---------|----------|-------------|
| M-1 | **`bookStrategyAction` returned success when Supabase insert failed** | `src/app/actions/lead.ts` | **Fixed:** return `{ error }` on insert failure, aligned with `captureLeadAction`. |
| M-2 | **`/api/onboarding`** upsert by `session_id` with no auth — ID from URL `/onboarding/[id]` | `src/app/api/onboarding/route.ts`, `src/app/onboarding/[id]/page.tsx` | Use **unguessable** session IDs (UUID v4 from server or cryptographically random), consider **HMAC-signed** session cookie instead of path ID, and RLS if moving to anon client. |
| M-3 | **Lead actions lack validation** (length, email format, phone) despite Zod in dependencies | `src/app/actions/lead.ts` | Zod schemas + max lengths; optional **honeypot** + rate limit. |
| M-4 | **No security headers** in `next.config.ts` | `next.config.ts` | Add `headers()` for CSP (tighten over time), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` as appropriate. |
| M-5 | **No committed `.env.example`** | `.gitignore` ignores `.env*` | Add `.env.example` with dummy keys (no secrets) listing required vars. |

### Low / informational

| ID | Finding | Notes |
|----|---------|--------|
| L-1 | `NEXT_PUBLIC_STRIPE_PRICE_*` | Expected public Stripe Payment Link / price IDs — not secret; still avoid exposing internal pricing strategy if sensitive. |
| L-2 | `dangerouslySetInnerHTML` for JSON-LD | `src/app/[locale]/layout.tsx` — safe if `jsonLd` is server-built from trusted strings; keep it that way. |
| L-3 | `ApplyForm` only uses `sessionStorage` | No server persistence until book-strategy; acceptable for funnel UX, document for analytics/compliance. |
| L-4 | Root `test_gemini.js`, `test-pricing.js` | Ensure not imported by app bundle; keep out of production entrypoints. |

---

## Remediation applied (this repo)

1. **`/api/test`:** 404 in production.
2. **`bookStrategyAction`:** fail closed on Supabase insert error.
3. **`/api/blueprint`:** HTML-escape user-derived fields in email HTML; strip CR/LF in subject line; omit `reply_to` unless value contains `@`; return 502 when Resend responds non-OK.

---

## Suggested 30 / 90-day roadmap

- **30 days:** RLS + migration files for `leads`, `strategy_calls`, `onboarding_submissions`; rate limits on public POST routes; remove or feature-flag `/api/test`.
- **90 days:** CSP and security headers; bot protection on blueprint; structured logging without PII in production logs.
- **Ongoing:** dependency updates, secret rotation, Vercel/deployment audit (env visibility, preview URL protection).

---

## Files reviewed (representative)

- `middleware.ts`, `next.config.ts`, `package.json`
- `src/lib/supabase/server.ts`, `src/app/actions/lead.ts`
- `src/app/api/test/route.ts`, `src/app/api/blueprint/route.ts`, `src/app/api/onboarding/route.ts`
- `src/app/[locale]/_components/lead-gen/LeadCaptureForm.tsx`, `BookStrategyView.tsx`, `SummaryDashboard.tsx` (blueprint caller)
- `src/app/onboarding/[id]/OnboardingPortal.tsx`

---

## Sign-off

This audit is **point-in-time** and does not replace penetration testing or compliance review. Re-run after major feature additions or auth changes.
