-- Mirror of D1 migration for Supabase parity (if used)

ALTER TABLE cards ADD COLUMN IF NOT EXISTS publish_slug TEXT;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS requested_domain TEXT;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS domain_status TEXT NOT NULL DEFAULT 'none';

CREATE TABLE IF NOT EXISTS card_domains (
  host TEXT PRIMARY KEY NOT NULL,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_card_domains_card_id ON card_domains(card_id);
