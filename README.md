# Genezisi

Founder-led studio building **bespoke websites, AI systems, and automation**. This repository also contains legacy website routes and operational digital-business-card services.

## Current decisions (4 November 2026)
- Bespoke scope and individual quotations; **no fixed-price website packages**.
- New digital-business-card sales are discontinued. Existing customer cards, slugs, mapped domains, order records and operational APIs must be preserved until verified and explicitly retired.
- The homepage currently approved on `main` is the visual and UX baseline. Cleanup does not authorize redesign.
- Historical experiments, pricing copy, and old PRs are not authoritative requirements.

## Stack and development
Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase and supporting libraries for current/legacy routes.

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
```

These commands are prescribed checks, not a claim that every check currently passes.

## Working safely
Read [AGENTS.md](AGENTS.md) before making changes. Inventory public routes, API endpoints, dynamic customer URLs, domains, data dependencies, SEO annotations and transitive imports before deleting or redirecting anything. Use a dedicated branch and small reversible commits. Do not merge, deploy, change production configuration or delete customer data without founder approval.

Some documents in `docs/` and `.cursor/rules/` predate the business reset; verify their applicability rather than treating them as current.

Production: https://genezisi.com

## Content and market direction
Genezisi primarily targets **international English-speaking businesses**. English articles are the core acquisition channel; Georgian and Dutch content supplement the studio's international positioning. The journal preserves updated regional article URLs and adds practical English guides on websites, AI and automation. See `docs/seo/INTERNATIONAL_ENGLISH_CONTENT_STRATEGY_2026-11-04.md`.

## Testing policy
GitHub Actions are not used. Run typecheck, lint, build, served-route tests and mobile/desktop QA manually before founder release review.
