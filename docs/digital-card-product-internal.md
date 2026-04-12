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
- **Primary handoff:** client sends a prefilled **architect email brief** from `/start` (stable copy/paste text block for manual ops / DB entry). **Alternative:** direct WhatsApp reference message for clients who prefer chat-first communication.
- **Internal fallback:** lean `genezisi-order-{id}.json` still exists for replay/import (`handoffMedia` records stripped hero/gallery/background images), but the customer flow no longer asks clients to download it.
- See [digital-card-order-handoff.md](./digital-card-order-handoff.md) for replay and optional DB storage notes.

## Changes policy (summary)

- **Minor** (free, policy limits apply by tier): phone, email, address, hours.
- **Major** (tier quotas + paid overage): photo, bio, services, sections, socials, layout, company/title changes.
- Executive: unlimited minor changes (VIP); other tiers have monthly minor limits per policy.

## Code touchpoints

- Tier + URL hint: `Lane1CustomizerState.selectedTier`, `digitalCardUrlHint` (`CUSTOMIZER_VERSION` 17).
- Pricing helpers: `src/app/[locale]/start/lib/lane1-pricing.ts`, `digital-card-product.ts`.
- Order file + WhatsApp summary: `order-payload.ts`, `order-validation.ts`, `order-share.ts`, `whatsapp.ts`.
- Overlay persistence: `src/app/[locale]/start/lib/start-overlay-storage.ts` (keys prefixed `genezisi_dc_`).
