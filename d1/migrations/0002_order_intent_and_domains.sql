-- Order publish intent + custom domain mapping (Turso/D1)
-- Apply: wrangler d1 migrations apply genezisi-cards --remote

ALTER TABLE cards ADD COLUMN publish_slug TEXT;
ALTER TABLE cards ADD COLUMN requested_domain TEXT;
ALTER TABLE cards ADD COLUMN domain_status TEXT NOT NULL DEFAULT 'none';

CREATE TABLE IF NOT EXISTS card_domains (
  host TEXT PRIMARY KEY NOT NULL,
  card_id TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_card_domains_card_id ON card_domains(card_id);
