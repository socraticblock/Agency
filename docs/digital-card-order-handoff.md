# Digital Card order handoff (operator reference)

Customer-facing flow lives in `/start`. Technical details for fulfillment and optional admin storage.

## Source of truth

1. **Architect email brief** — Customer-facing primary handoff. `/start` opens a prefilled `mailto:` with a stable, copy/paste-friendly operator brief: order id, contact data, active sections, visible copy, URLs, style summary, and media transfer notes. This is the fastest manual path for fulfillment and future DB entry.
2. **WhatsApp direct message** — Customer-facing fallback. Compact reference (`DIGITAL_CARD_ORDER_SCHEMA_VERSION` in `digital-card-product.ts`): order id, identity/contact summary, sections, and media notes for clients who prefer to continue in chat first.
3. **`genezisi-order-{orderId}.json`** — Internal fallback / import path. `GenezisiOrderFileV1` (`orderFileSchemaVersion: 1`) with **lean** `state`: text, layout, tiers, and settings for replay; **hero, gallery, and background image blobs are omitted** (see `handoffMedia` on the envelope). Parse: unwrap `state`, then `normalizeLane1StateFromUnknown` from `customizer-store.ts`.

## Client-only rule

The customizer and preview work without any server. Do not require database writes for the product to function.

## Optional operator / database storage (later)

If you persist orders in Supabase or another DB:

- **Do not** stuff full base64 image payloads into `onboarding_submissions.form_data` as string fields: `src/app/api/onboarding/route.ts` caps body size and per-field length.
- Prefer one of:
  - **`jsonb` column** large enough for the full export (watch row size and backup costs), or
  - **Object storage** (e.g. Supabase Storage) for the file + a small table row with `order_id`, `created_at`, `storage_path`, `tier`, `client_phone`, etc.

Re-import in-house by loading the JSON into `/start` via **Import saved order (.json)** or opening `/start/preview` and **Load order file**.

## Files

- Payload builder: `src/app/[locale]/start/lib/order-payload.ts`
- Validation: `src/app/[locale]/start/lib/order-validation.ts`
- Download / share: `src/app/[locale]/start/lib/order-share.ts`
- WhatsApp text: `src/app/[locale]/start/lib/whatsapp.ts`
