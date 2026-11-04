# Genezisi — International English SEO & Editorial Direction
**Decision date:** 4 November 2026  
**Status:** Approved audience direction; article drafts staged in PR #32, not deployed.  
**Owner:** Genezisi founder / editorial reviewer.

## 1. Audience and commercial intent

**Primary acquisition audience:** English-speaking businesses internationally seeking bespoke websites, useful AI systems, practical automation, or connections between their tools. Genezisi is based in Georgia and can collaborate remotely. Do not imply offices or local registration in countries where none exists.

**Secondary editorial audience:** Existing relevant readers of the Georgia-focused articles. Georgian and Dutch homepage editions stay supported but do not define the total service area. Avoid pretending untranslated English articles are Georgian or Dutch content.

Do **not** create separate /en-us, /en-gb, /en-au pages of identical material. Only use locale alternates for genuinely distinct translated/region-specific pages; otherwise keep one canonical English article at `/en/blog/<slug>`.

## 2. What the studio should publish

Publish materials that help a prospective buyer decide *whether* to build something, *what* to commission, *how* to compare approaches, and *how* to evaluate results. Demonstrate reasoning and verifiable process rather than promised uplift.

### Content pillars

| Pillar | Buyer question | Service connection |
|---|---|---|
| Website decisions | Should we redesign? Custom code or platform? What must be in a brief? | Bespoke websites |
| AI workflow decisions | Which tasks are suitable? How does human review work? | Practical AI systems |
| Automation and integrations | How do forms, CRM, booking and staff workflows fit together? | Automation |
| Ownership and assurance | What should be in handover, maintenance and accessibility review? | All projects |
| Selected work | How was a real constraint handled? | Credible proof across services |

### Publishing and updating

**Now staged in draft branch — three English-first international articles:**
1. `/en/blog/custom-website-vs-website-builder` — discovery and build-vs-buy comparison.
2. `/en/blog/ai-automation-small-business-where-to-start` — safe and measurable automation scope.
3. `/en/blog/website-redesign-checklist-before-hiring` — scoping, SEO continuity and release acceptance.

**Four historical articles rewritten at their current slugs, as secondary regional content:**
1. `website-cost-georgia-2026` — comparing quotations, no invented current prices.
2. `digital-business-card-vs-paper` — educational comparison, no new card sales.
3. `facebook-page-costing-customers-georgia` — when social-only is or is not enough.
4. `georgian-businesses-invisible-online` — realistic discoverability checklist.

Their original URL slugs are retained on purpose. Dates in the registry describe editorial updates in November 2026; do not claim they were live on that date before release.

## 3. Next article opportunities (research and review before writing)

| Order | Working title / target reader problem | Search-intent hypothesis | Required evidence |
|---|---|---|---|
| 1 | How to Write a Brief for an AI Automation Project | Hiring / scoping | Example specification, approval and audit model |
| 2 | Website to CRM Integration: What Actually Happens | Implementation | Consent/data-flow diagram, error handling |
| 3 | When Not to Automate a Business Workflow | Buyer education | Counterexamples, maintenance costs, failure modes |
| 4 | Website Maintenance After Launch: Who Owns What? | Commercial | Real checklist, responsibilities and contract considerations |
| 5 | A Practical Website Performance Review (LCP, INP, CLS) | Technical evaluation | Reproducible real project measurement, no unmeasured claims |
| 6 | AI Assistant vs Rule-Based Automation | Technology choice | Working decision criteria with bounded example |
| 7 | How to Compare Website Development Proposals | Buying | Procurement matrix and real exclusions |
| 8 | Booking System Integration: From Form to Confirmed Appointment | Technical/commercial | Accessibility, conflicts, notifications and rollback |
| 9 | Designing an Accessible Intake Form | Customer experience | Keyboard/screen-reader testing record |
| 10 | A Real Website Case Study with Before/After Decisions | Proof | Founder-approved project details, screenshots, scope, verifiable results |

These are **topic hypotheses**, not verified search-volume rankings. Do not announce ranking/traffic forecasts without Search Console and keyword research. Publishing fewer well-evidenced articles is preferable to mass-producing generic articles.

## 4. On-page editorial contract

- Write for a real buyer question; titles should match what the article actually answers.
- Be precise about what is demonstrated, hypothetical, measured or inferred. Mark illustrative scenarios as illustrative.
- Avoid guarantees of traffic, leads, rankings, revenue uplift, automation accuracy or delivery timelines without proof.
- For any cited third-party claim, link to an authoritative primary source and state the date/limitations where relevant.
- Use real author attribution. Don't invent client testimonials, biographies, screenshots or production metrics.
- Explain the useful *how* and tradeoffs, not only definitions. A CTA to discuss a bespoke project is appropriate but should not overpower the guide.
- Review copy for misleading location claims or false equivalence across languages.
- Original visual components/interactive tools can enrich content, but only where they clarify a real decision; they are not required for every article.

## 5. Technical SEO contract

- Homepage EN/KA/NL multilingual cluster remains intact; support it with real content.
- `/en/blog` and English article pages self-canonicalize. `/ka/blog*` redirects to corresponding English content until translated.
- Include only indexable canonical articles in `/sitemap.xml`; keep customer cards and restricted utility pages out of public marketing discovery feeds.
- Make journal reachable from site navigation and related posts. The approved homepage's visual design must not be modified without founder sign-off.
- Preserve older indexed slugs for rewritten equivalent articles. Use relevant redirects only where an exact replacement exists, and confirm backlinks before retiring anything.
- Review indexed article titles, metadata, actual HTTP status, structured data and language signals on a served production build.
- Verify mobile UX and keyboard behavior; verify search performance after release with Search Console.
- Avoid thin near-duplicate country landing pages.

## 6. Reference documentation (editorial standards, not ranking guarantees)

- Google Search Central, helpful people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Managing multilingual and multi-regional sites: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Site moves and URL change guidance: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- Sitemap URLs and canonicalization: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- web.dev Web Vitals: https://web.dev/articles/vitals

## 7. Release/verification status

This file is a planning record. GitHub Actions is not used. Code and copy changes in PR #32 have not passed an observed local `npm run typecheck`, `npm run lint`, `npm run build`, served-route tests, browser QA or founder editorial review.

The first post-release data review should inspect Search Console indexed URLs, queries, click-through patterns, and which enquiries led to genuinely qualified conversations. No traffic improvement is guaranteed.
