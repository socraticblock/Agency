# Genezisi Digital Card — Internal product reference

This document is for operators and engineering. Customer-facing copy lives in `src/constants/start-digital-card-copy.ts`.

## Offer

- Template-based digital business card; WYSIWYG from `/start` customizer.
- Not a full custom site or landing page (separate products).

## Tiers (setup + annual hosting)

| Tier | Setup (₾) | Hosting (/yr) | URL / domain |
|------|-----------|---------------|--------------|
| Subdomain | 150 | 120 | `genezisi.com/your-name` |
| Professional | 250 | 120 | Client-owned `.ge` / `.com`; PDF DNS guide |
| Executive | 350 | 120 | VIP; domain registered in **client’s name**; Genezisi configures DNS/SSL |

Hosting (120₾/yr) is always required for a live card.

## Fulfillment

- WhatsApp order → bank transfer → go live in 3–5 working days (Executive: priority queue).
- Order message includes schema version, tier, setup + hosting lines, optional URL hint, and customizer snapshot version.

## Changes policy (summary)

- **Minor** (free, policy limits apply by tier): phone, email, address, hours.
- **Major** (tier quotas + paid overage): photo, bio, services, sections, socials, layout, company/title changes.
- Executive: unlimited minor changes (VIP); other tiers have monthly minor limits per policy.

## Code touchpoints

- Tier + URL hint: `Lane1CustomizerState.selectedTier`, `digitalCardUrlHint` (`CUSTOMIZER_VERSION` 17).
- Pricing helpers: `src/app/[locale]/start/lib/lane1-pricing.ts`, `digital-card-product.ts`.
- WhatsApp body: `src/app/[locale]/start/lib/whatsapp.ts`.
- Overlay persistence: `src/app/[locale]/start/lib/start-overlay-storage.ts` (keys prefixed `genezisi_dc_`).
