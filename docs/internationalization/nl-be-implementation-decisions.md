# NL-BE implementation decisions

Feature: Belgian-Dutch homepage at `/nl` — `feat/genezisi-belgian-dutch-homepage`.
Base: `879b5b7e9ea5c16681b56b5e176f127830692918`.

## 1. Homepage-only locale boundary

`src/lib/i18n.ts` (`Locale = 'en' | 'ka'`) is untouched. A new narrow registry
`src/lib/home-i18n.ts` defines `HomeLocale = 'en' | 'ka' | 'nl'`, the hreflang tags
(`en`, `ka-GE`, `nl-BE`), `og:locale` values, HTML language tags and `isHomeLocale()`.

`getV2Copy` is now an exhaustive `satisfies Record<HomeLocale, V2Copy>` map — adding a
homepage language without its copy is a compile error, not a silent English fallback.

## 2. Routing policy

Middleware keeps its existing precedence and adds one narrow branch **after** the mapped-host
rewrite and the `/` → `/en` redirect:

1. `/nl` → the Dutch homepage (200).
2. `/nl/<known family>` → **307** to the visible `/en/<same path>` (query string preserved via
   `nextUrl.clone()`). The allowlist is short and explicit: `apply`, `blog`,
   `booking-websites`, `c`, `enterprise`, `online-stores`, `partner`, `pricing`,
   `service-websites`, `start`, `stop-renting`, `websites`, `work`.
3. Anything else under `/nl` (including `/nl/v2-prototype`) → rewrite to a path that matches
   no route, so the visitor gets the app's own **404** with the requested URL still in the
   address bar. This is the same 404 the site already serves for `/en/<unknown>`.
4. Unknown non-NL locales (`/fr`, …) keep the pre-existing behaviour: 308 → `/en/fr`.

`nl` is deliberately **not** added to the middleware `LOCALES` array: that array drives the
legacy path, and widening it would make every legacy route reachable under `/nl`.

`/games` is untouched: `next.config.ts` `redirects()` resolve before middleware.

## 3. Metadata ownership (Next's shallow merge)

`src/app/[locale]/layout.tsx` used to publish sitewide `createLocalBusinessSeo()` metadata
**and** a `LocalBusiness` JSON-LD script for every route under the locale segment — including
the homepage. Because Next merges metadata object-by-object, a page-level `openGraph`/
`alternates` replaces the layout's rather than deep-merging, so the homepage would have
inherited a second, contradictory canonical/graph.

The legacy metadata + JSON-LD moved verbatim into `src/app/[locale]/(site)/layout.tsx`
(the route group that contains every legacy page). The homepage now owns its complete
metadata through `src/lib/home-seo.ts`. Verified unchanged for legacy pages:
`/en/pricing` still emits its own pricing OG image, canonical and `LocalBusiness` graph.

## 4. Homepage SEO

- One self-canonical per language, fully qualified on `https://genezisi.com`.
- One **identical** reciprocal cluster on all three homepages: `en`, `ka-GE`, `nl-BE`,
  `x-default` → `/en`.
- `og:locale` `en_US` / `ka_GE` / `nl_BE`; `og:image` is the existing `/api/og` generator
  called with this language's own words, so the Dutch share card does not carry
  "Your website is only the beginning.".
- Structured data is a single `Organization` graph: name, URL, description, real Tbilisi /
  `GE` address (no street address, which is unknown), `areaServed` Georgia, the published
  WhatsApp number, `knowsLanguage` — and **no** Belgian office, VAT id, rating or price range.
  This replaces the previous homepage `LocalBusiness` graph, whose `telephone` was a masked
  placeholder (`+995****3564`); that placeholder is not published on the homepage any more.
- Sitemap gains exactly one `/nl` entry and no Dutch legacy URLs.

## 5. Copy

Dutch copy lives in `hero.copy.ts` as `NL`, transcreated rather than translated, in the
`je`/`jouw` register, using the brief's candidate strings with light polish for length.
Five new keys are shared by all three languages: `primaryNavLabel`, `languageNavLabel`,
`altTk`, `altFranken`, `altPilates`. The header/footer navigation landmarks no longer
hard-code English `aria-label`s. EN alt text is unchanged; the KA alt strings are the ones
supplied with the brief.

**Editorial status: candidate copy, NOT native-certified.** A proficient Belgian-Dutch reader
should review `hero.copy.ts` (esp. `nl.demo.reviewBody`, `nl.founderBodySecond`) before launch.

WhatsApp: the same `WHATSAPP_INTAKE` constant, encoded once; the Dutch prefill is
`Hallo Genezisi, ik wil graag een project bespreken. Kunnen we even overleggen?`.

No claim is made about a Belgian office, Dutch-language calls, prices, or Belgian clients.

## 6. Mobile / accessibility

- `truncate` removed from the mobile stage titles; they now wrap (`leading-tight`).
- The card floor moved from an inline style into `.v2-stack-card` so a short-screen fallback
  can lower it: below `1024px` wide **and** `≤700px` tall the five cards drop into normal
  document flow (`position: static`), keeping every step readable instead of trapping it
  under the next card.
- Header: 320px keeps wordmark + `EN · KA · NL` + CTA. Gaps, tracking, CTA padding and the
  language-link padding shrink at small widths first; nothing is hidden behind a menu.
- Language links carry `lang`/`hreflang` (`en`, `ka-GE`, `nl-BE`) and `aria-current="page"`.
- `lang` on `/nl` is `nl-BE` on the content wrapper and the `<main>`.

## 7. Deliberate deviations / known limitations

| # | Item | Decision |
|---|---|---|
| 1 | Root `<html lang="en">` on every route — **fixed** | The document language is now authored server-side: middleware forwards `x-doc-lang` (derived from the first path segment) and `src/app/layout.tsx` renders it on `<html>`. Initial HTML is `en` / `ka-GE` / `nl-BE` on `/en` / `/ka` / `/nl`. **Measured cost:** reading `headers()` in the root layout moves `/_not-found`, `/onboarding`, `/onboarding-brief` and `/success` from static (`○`) to dynamic (`ƒ`); `/[locale]/blog/[slug]` keeps its SSG (`●`) and `/robots.txt` / `/sitemap.xml` are unaffected. The `[locale]` layout and `LangSetter` still refine the DOM after hydration. |
| 2 | Unknown `/nl/*` renders the site's English 404 shell | It is a real 404 (status + UX) identical to `/en/<unknown>`; a Dutch 404 page would need a locale-aware not-found boundary and was not worth the regression surface in this branch. Its `<html lang>` is `en`, matching the English content it actually serves. |
| 3 | KA alt strings | Supplied with the brief, not independently verified by a Georgian reviewer. |
| 4 | `/nl` on an *unmapped* custom host | Falls through to the primary app and serves the Dutch homepage. Mapped hosts are rewritten to `/{locale}/c/{slug}` before the NL branch, so published customer domains are unaffected. |
| 5 | `hrefLang` attribute casing | Next's metadata renderer emits `hrefLang="…"`; HTML attribute names are ASCII case-insensitive, so parsers and crawlers see `hreflang`. Unchanged from the existing production output. |
| 6 | Visual/device QA | No browser automation is permitted in this environment. All layout/visual acceptance is an **owner-run gate** with the checklist in the test report. |
