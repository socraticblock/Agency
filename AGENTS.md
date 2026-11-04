# Genezisi — Agent Operating Contract
Updated: 2026-11-04. Applies to all coding and documentation work in this repository.

## Source of authority
1. Explicit, latest founder decisions and approvals.
2. Current verified implementation and production constraints.
3. This contract and approved current documentation.
4. Historical design briefs, older rules, and open PRs (reference only).

If these conflict, stop and report the conflict; never silently restore an old business model.

## Product and business boundaries
- Bespoke founder-led studio: websites, AI systems, automation.
- No fixed-price website package marketing.
- No new digital-business-card sales.
- Preserve existing published cards, slugs, mapped domains, orders, admin access, databases, and API behavior until their actual obligations and dependencies are inventoried.
- The existing homepage on `main` is approved. No unsolicited redesign or new spectacle.
- Distinguish live client work from prototypes. Do not fabricate reviews, metrics, pricing, guarantees, or client results.

## Engineering protocol
1. Verify current `main` SHA, branch, clean working tree, and exact scope.
2. Make a route ledger (public pages, API routes, dynamic routes, locale variants, redirects, indexed URLs, and external references).
3. Trace transitive imports, dynamic imports, scripts, CSS and assets; static unreachability alone is not proof of safe deletion.
4. Inventory customer-data and domain dependencies **without exposing personal data**.
5. Classify every proposed change: KEEP / UPDATE / ARCHIVE / REMOVE, with evidence and rollback.
6. Implement small reversible commits on a feature branch, with tests and before/after checks.
7. Verify typecheck, lint, build, key routes/APIs, mobile UX, SEO metadata and redirects.
8. Present findings and unresolved decisions to founder. No merge, deployment, production config change, destructive migration or customer-data deletion without explicit approval.

## SEO contract
- Published metadata must accurately reflect each page; do not let legacy route layouts accidentally canonicalize distinct pages to the homepage.
- Only emit hreflang alternatives for actual equivalent localized content.
- Remove obsolete sales pages from discovery feeds only with a decided route disposition; use relevant redirects, or 404/410 when no equivalent exists.
- Do not redirect unrelated retired pages en masse to the homepage.
- Verify rendered HTTP responses and HTML, not only source declarations.

## Technical consistency
`package.json` is the authoritative installed framework version (currently Next.js 16 and React 19). Existing rules that assume Next.js 15 or mandate WebGL/physics are historical and must not override actual requirements.

## Explicit blockers
Founder decision required for route retirement targets, live customer/card/domain status, any public offer/positioning change beyond approved direction, and release. If evidence is missing, document the blocker rather than guessing.

## SEO and editorial direction (4 November 2026)
- Primary acquisition audience: **international English-speaking businesses**; Georgian and Dutch are supporting homepage languages.
- Journal is an ongoing growth channel. Preserve useful historical article URLs, update outdated claims, and prioritize original, evidence-based English guides for websites, practical AI and automation.
- Do not create unnecessary US/UK/other English country duplicates or misleading localized hreflang.
- Details: `docs/seo/INTERNATIONAL_ENGLISH_CONTENT_STRATEGY_2026-11-04.md`.
- **Do not add GitHub Actions workflows.** Founder uses manual development, build, route and browser verification.
