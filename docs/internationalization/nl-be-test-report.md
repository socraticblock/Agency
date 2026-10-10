# NL-BE test report

Everything below was executed against a **served production build** of this branch
(`npm run build` → `npm run start -- --port 3100`), not against the dev server.

| Gate | Command | Result |
|---|---|---|
| Lint | `npm run lint` | exit 0 — 0 errors, 234 warnings (identical to baseline) |
| Types | `npm run typecheck` | exit 0, clean |
| Build | `npm run build` | exit 0, `✓ Compiled successfully` |
| Routes + rendered head | `BASE_URL=http://localhost:3100 node --test tests/home-i18n/routes.test.mjs tests/home-i18n/head.test.mjs` | **42 tests, 42 pass, 0 fail** |

One transient failure was observed and resolved: an unrelated `next/font/google` module
resolution error (network fetch to Google Fonts) failed one build attempt. Connectivity was
verified with `curl` and the build then succeeded unchanged. It is not caused by this branch,
but it is recorded because it can make a build look broken.

## Route matrix (real HTTP, redirect: manual)

| Input | Expected | Observed |
|---|---|---|
| `/` | 308 → `/en` | ✅ 308 → `/en` |
| `/en`, `/ka` | 200, correct language | ✅ |
| `/nl` | 200, Dutch | ✅ Dutch copy, no English proof line |
| `/nl/` | no loop | ✅ 200 |
| `/nl?utm_source=test` | 200 Dutch, canonical `/nl` | ✅ |
| `/nl/pricing`, `/nl/pricing/professional`, `/nl/work`, `/nl/start`, `/nl/blog`, `/nl/websites`, `/nl/c/example` | 307 → `/en/…` | ✅ all seven, `Location: /en/…`, query preserved (`?x=1` case) |
| `/nl/unknown`, `/nl/unknown/nested`, `/nl/v2-prototype`, `/nl/admin` | 404, never English 200 | ✅ 404, body is the app's own not-found shell (same as `/en/<unknown>`) |
| `/fr` | baseline 308 → `/en/fr` | ✅ unchanged |
| `/en/pricing`, `/ka/pricing` | 200 | ✅ |
| `/onboarding`, `/onboarding-brief`, `/success` | 200, unlocalized | ✅ |
| `/api/og?…` | image response | ✅ 200, `image/*` |
| `/games` | configured game redirect | ✅ → `broken-chapel-prototype.vercel.app` |
| `/sitemap.xml` | contains `/nl`, no `/nl/pricing` etc. | ✅ |
| `/robots.txt` | points at the sitemap, `/nl` not blocked | ✅ |
| `/nl/unknown?next=https://attacker.example` | 404, no `Location` | ✅ no open redirect |
| `/nl%2Fpricing`, `/nl/%2e%2e/pricing` | no crash, no loop | ✅ |

Custom host: a request with `Host: some-client.example` still falls through exactly as before
(308 → `/en`). The mapped-host rewrite is untouched and still runs before the NL branch.

## Rendered head (`<link>`/`<meta>` tags only, never RSC payload substrings)

| Check | `/en` | `/ka` | `/nl` |
|---|---|---|---|
| Exactly one canonical | ✅ `/en` | ✅ `/ka` | ✅ `/nl` |
| Exactly 4 reciprocal alternates (`en`, `ka-GE`, `nl-BE`, `x-default`→`/en`) | ✅ | ✅ | ✅ |
| `og:locale` | `en_US` | `ka_GE` | `nl_BE` |
| `og:url` = own canonical | ✅ | ✅ | ✅ |
| `og:image` = `/api/og?…`, rendered as a real PNG | ✅ | ✅ | ✅ 1200×630 PNG magic number verified |
| Dutch share card free of the English sentence | n/a | n/a | ✅ |
| Exactly one JSON-LD script, `Organization`, country `GE`, no Belgian claim | ✅ | ✅ | ✅ |

Legacy regression: `/en/pricing` still serves its own canonical, its pricing OG image
(`type=pricing`) and exactly one `LocalBusiness` graph.

## Content language

`/nl` ships `<div id="main-content" lang="nl-BE">` and `<main lang="nl-BE">`.
Root `<html lang="en">` remains (known limitation, see decisions doc §7.1). `LangSetter`
sets `document.documentElement.lang = "nl-BE"` after hydration.

## WhatsApp

All three CTAs on `/nl` (header, hero, founder) resolve to the same URL:
`https://wa.me/995579723564?text=Hallo%20Genezisi%2C%20ik%20wil%20graag%20een%20project%20bespreken.%20Kunnen%20we%20even%20overleggen%3F`
— one `encodeURIComponent` pass, same destination as EN/KA.

## Additional local suites

| Suite | Command | Result |
|---|---|---|
| Content / translation (§24) | `node --test tests/home-i18n/content.test.mjs` | **14 tests, 14 pass** |
| Static a11y + no-JS + payload parity (§15 subset, §16, §23 S21, §18.1) | `BASE_URL=… node --test tests/home-i18n/assets-a11y.test.mjs` | see below |
| Mapped custom host (§8.2, R26/R27) | `npm run build && node --test tests/home-i18n/mapped-host.test.mjs` | see below |

The content suite loads the real `V2Copy` object straight out of `hero.copy.ts` (Node 26 strips
the types; the module's only import is type-only) instead of scraping the rendered page, so
"every string is present and non-empty" is checked against the single source of truth. It
covers: complete non-empty coverage in all three locales, identical key sets, no English left
in the Dutch object, four intent rows, five distinct stages, the demo still labelled an
internal demonstration, truthful and distinct portfolio statuses (prototype never presented as
launched), no price/currency in any locale, alt text naming its project, the informal `je`
register with no formal drift, no Belgian-presence/call/client claim, and authored hero line
breaks that stay within the approved English width.

The mapped-host suite starts a canned Turso (Hrana) stub and a real production server, so the
`Critical` §8.2 ordering claim — customer domain rewrite happens before Dutch routing — is
tested rather than asserted from reading the code.

## Verified image content (roadmap §11.2)

The three `public/work-previews/*` images were inspected directly, because an alt string that
describes the wrong thing is a truth defect:

- `tk-counsel.webp` — the dark hero of the TK Counsel website: "Based in Tbilisi, Georgia"
  label, headline "Expert Legal Counsel for the International Community in Georgia", and the
  "PRIORITY PRACTICE AREAS" section label. It is a website preview, not a logo or mock-up.
- `frankencoin-desk.png` — the Frankencoin web-app home: FRANKENCOIN nav (Home, Desk, ZCHF,
  Borrow, Invest, Portfolio), a connected-wallet pill, the "FRANKENCOIN DESK" panel and the
  headline "A simpler way to use the Frankencoin Protocol". Product-interface preview confirmed.
- `her-house-pilates.webp` — **studio photography, not a website screenshot**: two women seated
  on a Pilates reformer in a warm studio with arched backlit mirrors. No signage, no business
  name, no prices, no readable text. The alt therefore describes the photograph rather than
  claiming a site preview, which is exactly what §11.2 asks for.

Result: the existing English alt strings describe what the images actually show and were left
unchanged (no EN regression). The Dutch strings are faithful translations of them; `altTk` was
sharpened from "voorbeeld van de website" to "voorbeeld van de startpagina", which is what the
image is. No alt claims a result, a client or a metric.

## NOT TESTED — owner-run visual/device gate

No browser automation is available or permitted in this environment, so **no screenshot,
layout, zoom, keyboard, screen-reader or real-device claim is made**. These remain open:

- [ ] `/nl` at 320×568, 360×800, 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1440×900, 1728×1000, and 667×375 landscape.
- [ ] EN/KA/NL side by side at 320 and 1440 — confirm no EN/KA visual change.
- [ ] Header at 320px: wordmark + `EN · KA · NL` + CTA all visible and tappable (≥44px targets).
- [ ] All five NL demo states: mobile sticky stack, and the short-viewport fallback (a phone ≤700px tall should show the cards in normal flow, nothing truncated or buried).
- [ ] Desktop stage: click each step, slow scroll, reverse scroll, resize through `lg`, reduced motion.
- [ ] Keyboard: tab order, visible focus, `aria-current` announced, Enter/Space on stage buttons.
- [ ] 200% zoom, JavaScript disabled, screen-reader language on `/nl`.
- [ ] WhatsApp deep link opens the intended account (do **not** send a message from QA unless intended).
- [ ] Portfolio destinations still load: tkcounsel.com, frankencoindesk.com, her-house-pilates.vercel.app.
- [ ] Samsung Galaxy S25 + Brave (owner's device) for the sticky stack and header.

## Editorial sign-off

Native/proficient Belgian-Dutch review: **pending**. The Dutch copy is the brief's candidate
with light polish; it has not been certified by a native reviewer.
