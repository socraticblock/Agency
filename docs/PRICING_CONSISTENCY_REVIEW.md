# Pricing funnel consistency and logic review

**Review date:** 2026-04-02  
**Scope:** `FOUNDATIONS` (four sellable tiers), `/pricing` implementation, `/architect` alignment, WhatsApp/Shield, module teaser.

---

## 1. Tier matrix (canonical: `src/constants/pricing.ts`)

| Field | Essential (`landing`) | Professional (`cms`) | Command Center (`saas`) | E-Commerce HQ (`ecomm`) |
|--------|-------------------------|----------------------|-------------------------|-------------------------|
| **priceGEL** | 999 | 2,299 | 4,999 | 17,999 |
| **revisionRounds** | 1 | 2 | 3 | 4 |
| **warrantyDays** | 30 | 90 | 90 | 90 |
| **deliveryTimeline** | 7-10 business days | 10-15 business days | 25-35 business days | 8-10 weeks |
| **Architect `?tier=`** | `essential` | `professional` | `command-center` | `ecommerce-hq` |
| **FOUNDATIONS `ctaHref`** | `/book-strategy` | `/architect?tier=professional` | `/architect?tier=command-center` | `/architect?tier=ecommerce-hq` |
| **Installment (pricing-only)** | `or 3 × 333 ₾/month` | `or 3 × 767 ₾/month` | — | — |

**Slug map (pricing → architect):** [`pricingTierData.ts`](../src/app/[locale]/pricing/pricingTierData.ts) `FOUNDATION_TO_SLUG` matches [`Configurator.tsx`](../src/app/[locale]/_components/Configurator.tsx) `tierMap` (inverse):

| Query slug | Foundation id |
|------------|---------------|
| `essential` | `landing` |
| `professional` | `cms` |
| `command-center` | `saas` |
| `ecommerce-hq` | `ecomm` |

---

## 2. Cross-check: comparison table vs matrix

**Source:** [`comparisonData.ts`](../src/app/[locale]/pricing/comparisonData.ts)

| Row | Status |
|-----|--------|
| Prices (999 / 2,299 / 4,999 / 17,999) | Matches `FOUNDATIONS` |
| Revision rounds (1 / 2 / 3 / 4) | Matches |
| Warranty (30 / 90 / 90 / 90) | Matches |
| Delivery copy | Aligned with timelines (en-dash vs hyphen is cosmetic only) |
| Georgian payments / RS.ge only on E-Commerce | Matches `ecomm` scope in `FOUNDATIONS` |

**Note:** Professional column shows Blog/CMS as not included (`—`), consistent with `cms` being positioned as a conversion site, not a multi-page blog product.

---

## 3. Cross-check: `pricingTierData` `TIER_FEATURES` vs `FOUNDATIONS`

- **Economics** (price, revisions, warranty) come from `getPricingTierPayloads()` via `FOUNDATIONS`; no numeric drift.
- **Copy:** Tier bullets are marketing summaries; they align with `FOUNDATIONS.scope` themes (Essential template, Professional custom+GA4+SEO, Command multi-page/blog narrative, E-Commerce Next.js+TBC/BOG+RS.ge). No P0 contradiction found.

---

## 4. Architect UI spot-check

| Location | Finding |
|----------|---------|
| [`FoundationGrid.tsx`](../src/app/[locale]/_components/FoundationGrid.tsx) | Uses `formatPrice(f.priceGEL)` from `FOUNDATIONS` — E-Commerce shows 17,999 ₾ when selected. |
| [`ReviewPhase.tsx`](../src/app/[locale]/_components/summary/ReviewPhase.tsx) | `activeFoundation.priceGEL` and `warrantyDays` from selected foundation — consistent. |
| [`ConfigSidebar.tsx`](../src/app/[locale]/_components/ConfigSidebar.tsx) | Revision lines 1/2/3/4 and warranty line Essential 30d vs others 90d — **matches matrix**. |

---

## 5. Shield and WhatsApp

| Check | Result |
|-------|--------|
| Shield source | [`PricingTierDeck.tsx`](../src/app/[locale]/pricing/PricingTierDeck.tsx) uses `SHIELD_TIERS` from `pricing.ts` only. |
| Phone | [`pricingWhatsApp.ts`](../src/lib/pricingWhatsApp.ts) uses `WHATSAPP_INTAKE` from [`content.ts`](../src/constants/content.ts) — same family as footer/handover. |
| **Continue** | Passes selected `ShieldTier`; paid tiers show `₾/yr` in message. |
| **Skip** | Sets `skipShieldLine: true` — message says Shield will be confirmed on the call (no fake “none” tier). |
| Custom bridge | [`PricingCustomBridge.tsx`](../src/app/[locale]/pricing/PricingCustomBridge.tsx) uses `projectType` `custom-software` / `legacy-upgrade` — separate copy path, no tier numbers. |

**Support sign-off:** Behavior is internally consistent; changing the WhatsApp number remains a single edit to `WHATSAPP_INTAKE` in `content.ts`.

---

## 6. Module showcase vs `MODULES`

**Source:** [`PricingModuleShowcase.tsx`](../src/app/[locale]/pricing/PricingModuleShowcase.tsx) vs [`MODULES`](../src/constants/pricing.ts) category counts.

| Showcase label | Declared `moduleCount` | Actual modules in `MODULES` (by `category`) | Severity |
|----------------|------------------------|-----------------------------------------------|----------|
| Georgian Advantage | 6 | 6 (`Georgian Advantage`) | OK |
| Marketing & SEO | 7 | 8 (`Marketing`) | **P1** — off by one |
| Business Engines | 8 | 9 (`Business Engines`) | **P1** |
| AI & Automation | 5 | 6 (`AI & Automation`) | **P1** |
| Creative Extras | 6 | 5 (`Creative`) | **P1** — inverted |
| Operations | 5 | 6 (`Operational`) | **P1** |

`fromPriceGEL` values (600, 400, 700, 800, 300, 500) are **round marketing anchors**, not strict `min(module.priceGEL)` per category. If the page must reflect exact minimums, recompute from `MODULES` or label as “from” with a footnote.

---

## 7. FAQ vs gating and policy

| Topic | Finding |
|-------|---------|
| Configurator vs WhatsApp | Aligns with [`getAccessibleModuleIdsByFoundation`](../src/constants/pricing.ts) (Essential: no modules; Professional+: modules). |
| Installments | FAQ states splits may apply to Essential/Professional — matches `installmentLabel` on those tiers only. |
| Upgrade / credit | Qualitative (“scoped migration”) — no numeric promise; **P2** legal clarity if you need fixed credit rules. |

**Grammar (P2):** First FAQ question reads “Why should not I” — prefer “Why shouldn’t I just use Wix/Squarespace?”.

---

## 8. Accessibility / motion (spot-check)

| Item | Status |
|------|--------|
| Primary “Build this package” | `aria-expanded` present in [`PricingTierDeck.tsx`](../src/app/[locale]/pricing/PricingTierDeck.tsx). |
| Shield radios | `fieldset` + `legend.sr-only` present. |
| Reduced motion | `motion-reduce:transition-none` on expandable panel; expand/collapse is not animation-only (no P0). |

---

## 9. Severity summary

| ID | Severity | Issue | Suggested fix |
|----|----------|-------|----------------|
| C-01 | P1 | Module showcase `moduleCount` does not match `MODULES` per-category counts | Derive counts with `MODULES.filter(m => m.category === …).length` or fix static numbers; add “approximate” label if intentional. |
| C-02 | P1 | `fromPriceGEL` in module showcase may not equal minimum module price in category | Document as marketing floor or compute `Math.min(…)` from `MODULES`. |
| C-03 | P2 | FAQ grammar (“Why should not I”) | Copy edit in [`page.tsx`](../src/app/[locale]/pricing/page.tsx). |

**P0 (blocking contradiction):** None identified between pricing page, comparison data, `FOUNDATIONS`, and architect revision/warranty UI.

---

## 10. Deliverables checklist

- [x] Consistency matrix (Section 1)
- [x] Issue list with file targets (Section 9)
- [x] WhatsApp/Shield support sign-off (Section 5)
