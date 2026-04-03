# Digital Business Card — Lane 1 (`/[locale]/start`)

**Version:** 1.1 · **Internal reference** · Aligns with shipped implementation.

## Source of truth

- This brief and product decisions documented here take precedence over older code comments.
- **`src/constants/pricing.ts` → `SHIELD_TIERS`:** Updated to match brainstorm (**50 / 150 / 750** ₾/mo for paid tiers). Lane 1 does not use Shield; Business Card renewal (**120** ₾/yr) covers basics only.

## JavaScript model

- **`/[locale]/start` customizer:** Client-side JS (React state, `localStorage`, `FileReader` for photo preview). Required for the product.
- **Deployed customer Business Card sites (future):** Static HTML/CSS, no product-level interactivity or animations; avoid claiming “zero bytes of JS” where Next may ship a minimal runtime.

## Shield availability (Lane 2)

- Shield subscriptions are available for **all** Lane 2 foundations: Essential, Professional, Command Center, E-Commerce HQ.
- **Not** available for Digital Business Card clients (Lane 1); they get annual renewal basics instead.

## Loyalty discount

- **15%** off Lane 2 for existing Business Card clients is **private / sales-only** — never rendered in public UI.

## Section 13 — Decisions (v1)

| Area | Decision |
|------|-----------|
| **Color presets** | 6 backgrounds (cream, white, light gray, soft navy, charcoal, warm sand) + 2 subtle gradients; 6 accent presets (navy, forest, burgundy, slate, gold-olive, teal). Pairs tested for contrast. |
| **Font presets** | 5: Classic (serif/sans), Modern (Space Grotesk + Inter), Bold, Minimal, Traditional (Georgia + system). Georgian via `Noto Sans Georgian` where needed. |
| **Placeholder content** | Per-sector defaults in `placeholders.ts` (lawyers, real estate, consultants, restaurants). |
| **WhatsApp templates** | Ka + En in `whatsapp.ts`; structured sections; ends with “My photo is ready to send!” |
| **Mobile customizer** | Sticky bottom “Customize” control opens a slide-up panel (`max-h-[85vh]`, scroll); desktop remains ~60/40 split. |

## Pricing (Lane 1)

| Item | GEL |
|------|-----|
| Base Digital Business Card | 450 one-time |
| Extra language (self) | +50 |
| Extra language (professional) | +150 |
| Google Map add-on | +75 |
| Annual renewal (copy) | 120 / year |

## Template rules

- One universal template, **4 fixed sections**, max width **640px**, **Contact Me** / **დამიკავშირდით** (not “DContact Me”).
- Mandatory footer: Built by Genezisi → site root.

## Routes

- Lane 1: `/{locale}/start` (e.g. `/en/start`).
- Lane 3 reference: `/{locale}/enterprise` (minimal page; inbound only).
