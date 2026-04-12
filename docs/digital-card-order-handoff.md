# Digital Card order handoff (operator reference)

Customer-facing flow lives in `/start`. Technical details for fulfillment and optional admin storage.

## Source of truth

1. **WhatsApp copy-paste (recommended)** — `/start` step 2: client taps **Copy full order message** (same structured block as email: `buildWhatsAppOrderPasteText` / `buildArchitectHandoffDataLines` in `order-email.ts`), then **Open WhatsApp** with a short opener (`buildLane1WhatsAppOpenerUrl` in `whatsapp.ts`), then pastes the full text as the **next** message. Schema **v5** briefs use explicit `*_EN` / `*_KA` content keys (primary language block first), plus grouped design lines (background layers, type packs, look, experience, hero photo, QR, social chrome, CTA labels); image blobs are never inlined—only presence flags where relevant.
2. **Architect email (optional)** — Prefilled `mailto:` to `ARCHITECT_INTAKE_EMAIL` with the same brief (`buildArchitectMailtoUrl`).
3. **`genezisi-order-{orderId}.json`** — Internal fallback / import path. `GenezisiOrderFileV1` (`orderFileSchemaVersion: 1`) with **lean** `state`; **hero, gallery, and background image blobs are omitted** (see `handoffMedia`). Parse: unwrap `state`, then `normalizeLane1StateFromUnknown` from `customizer-store.ts`.

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
- WhatsApp opener URL: `src/app/[locale]/start/lib/whatsapp.ts`
- Architect / WhatsApp paste text: `src/app/[locale]/start/lib/order-email.ts`
