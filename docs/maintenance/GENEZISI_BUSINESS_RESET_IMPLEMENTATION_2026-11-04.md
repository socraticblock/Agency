# Genezisi — Business Reset Implementation Record
**Date:** 4 November 2026  
**Branch:** `audit/genezisi-business-reset-2026-11-04`  
**Base:** `main` at `8043ec4218aa31a8fd4fac883c6768120a5abb00`  
**PR:** https://github.com/socraticblock/Agency/pull/32 (draft)  
**Status:** CODE COMMITTED, NOT VALIDATED OR RELEASED.

## Business boundaries

Genezisi is a bespoke founder-led studio for websites, AI systems and automation. Fixed-price website tiers and **new** digital-card sales are discontinued. Existing published cards, mapped domains, orders, admin tools and onboarding obligations are preserved. The homepage on `main` remains the approved visual/UX baseline.

## Implemented (code on draft branch)

| Surface | New behavior |
|---|---|
| `/en/pricing`, `/ka/pricing` | Localized bespoke project-scoping page without preset packages; self-canonical with genuine EN/KA reciprocal links |
| `/[locale]/pricing/{professional,command-center,e-commerce}` | HTTP 308 permanent redirect to the corresponding localized bespoke project page |
| `/[locale]/apply` | HTTP 308 to corresponding localized bespoke project page; removes obsolete website-audit intake |
| `/[locale]/start` | Public information that new digital-card ordering is closed; noindex |
| `POST /api/orders` | HTTP 410, no-store. **Only new orders are blocked.** The authenticated `GET /api/orders`, published-card and admin APIs are untouched |
| `/[locale]/partner` | Replaces obsolete commission promises with individual partnership information; noindex |
| `/[locale]/stop-renting` | Replaces unsourced comparison metrics with balanced ownership guidance; noindex pending editorial review |
| `/en/blog` | Restored international English-first journal; Georgian blog URLs redirect to English until genuinely translated |
| `/en/blog/[slug]` | Seven review-stage articles: four substantially revised original-slug guides plus three new international articles. Canonical EN URLs and credited sources, no obsolete card-sales links |
| Legacy navbar/footer | No promotional links for discontinued card sales, fixed tiers, or unverified partner offers; contact framed as a project conversation |
| `/sitemap.xml` | Lists retained canonical marketing URLs and all seven English journal articles, alongside EN/KA/NL homes and EN/KA bespoke scoping |
| `/llms.txt` | Current service index; not a search-ranking mechanism |
| Legacy SEO helper and layout | Prevent inherited homepage canonical on unrelated pages; do not invent equivalent KA home hreflang for legacy pages |
| Retained EN service pages and work | Canonical `/en/<path>`; corresponding `/ka` paths are English content and canonicalize to EN until fully localized |
| Client/admin utility pages | Noindex on onboarding, success, card-start/preview, and admin layouts |
| Repository rules and docs | README, AGENTS and active Cursor rules align with current stack, business, and preservation constraints |
| `src/constants/content.ts` | Removes unsupported conversion percentages and artificial audit-analysis claims |
| Regression tests and manual verification | Added served-build route/SEO checks for article URLs, sitemap, content and redirects. **No GitHub Actions; no passing manual build/test run has been observed.** |

## Safety evidence

Read-only GitHub source comparison confirms unchanged blobs between `main` and this branch for: 
`src/app/[locale]/page.tsx`, `SignalHeroPrototype.tsx`, `SelectedWork.tsx`, `BubbleMorphStudy.tsx`, `public/flagship-journey/infinite-bc/motion.js`, `src/lib/db.ts`, `middleware.ts`, published-card page and read/publish APIs, `/api/orders/[id]`, admin-auth, `/api/onboarding`, OG route, and `next.config.ts`.

No client record, database schema, mapped domain, customer data, `main` commit or production configuration was changed.

## Verification to run — required before merge

On a checked-out branch with Node 22 and dependencies:
```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run start -- -p 3100
# in another terminal
BASE_URL=http://127.0.0.1:3100 node --test tests/business-reset-routes.test.mjs tests/home-i18n/routes.test.mjs tests/home-i18n/head.test.mjs tests/home-i18n/content.test.mjs tests/home-i18n/assets-a11y.test.mjs tests/og-safety.test.mjs
node --test tests/approved-four-frame-integration.test.mjs tests/bubble-home-integration.test.mjs tests/bubble-motion.test.mjs
```

Check dynamic page metadata with an HTML-limited bot user-agent as well as normal browsers; Next.js can stream metadata into the body for regular clients. Inspect EN/KA/NL page HTML and custom-domain routing. Run mobile/reduced-motion and keyboard navigation QA. Verify no unexpected source-level route conflict for `start/(editor)` and `start/page.tsx`.

The founder does not use GitHub Actions. The workflow introduced earlier was removed. Testing must run manually on a local checkout or other founder-approved environment, with captured command output. **No passing manual run has been observed**. Environment-specific checks and Vercel previews remain unverified.

## Explicit release blockers

1. **Existing digital-card obligations:** Inventory (aggregate counts only) published cards, custom domains, outstanding orders, migrations, backups and restoration. Check client URLs against disposable fixtures and actual service contracts. Closing new orders is separate from shutting existing accounts.
2. **Onboarding authorization:** `/api/onboarding` accepts a client-supplied session identifier and uses a Supabase service-role client. Session-ID issuance, entropy, ownership and access policy need review before introducing a potentially breaking authentication change. This branch makes only metadata changes to onboarding pages.
3. **Admin-login abuse protection:** Current code has no application-level distributed rate limiter. Verify edge/WAF throttling, password policy and monitoring before considering additional protection. This branch did not modify authentication.
4. **Other public write APIs:** Assess `/api/partner-applications` need and abuse controls. Do not disable existing partner obligations without an owner decision.
5. **Journal editorial and search validation — release blocker:** All four original article URLs are now retained and their content rewritten. Three new international English articles are staged. Review factual accuracy, references, originality, claims and language quality before release. Verify Search Console indexing/backlinks where available. Review the new article schema, actual rendered head and user experience. Do not fabricate metrics or describe staged content as already published.
6. **Localized accuracy:** Validate Georgian page copy with a human reviewer. Review `/ka` legacy route content and Canadian/Belgian market claims before making new alternate clusters.
7. **Runtime and design:** Run full typecheck, lint, build, served-route tests, Android and desktop browser checks and compare homepage pixels/behavior to approved `main`.
8. **Founder approval:** No merge, deployment, destructive operations or production domain/config changes without explicit review and release approval.

## SEO guidance and rationale
Google documents canonical tags as hints rather than guarantees, recommends only relevant site-move redirects, and advises 404/410 when a page truly has no replacement. See:
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors
- https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag

After release, inspect actual indexed pages, redirects, canonical selection and sitemap acceptance in Search Console; these cannot be inferred from source code.

## Founder clarifications (4 November 2026)
- Do not use GitHub Actions (cost/workflow preference); run checks manually.
- Blog is an intended acquisition channel. Update existing articles and add useful new ones over time; avoid sacrificing worthwhile indexed URLs.
- **Audience direction confirmed:** prioritize international English-speaking clients for SEO and articles. Georgian and Dutch remain supporting languages. Preserve existing article URLs wherever useful; four retained and rewritten here. No US/UK country-duplicate pages.
- Homepage Organization metadata updated to remove a Georgia-only `areaServed` claim; physical base remains Tbilisi, Georgia.
