-- =============================================================================
-- Genezisi Digital Card Orders — D1 Migration
-- =============================================================================
-- Apply with: wrangler d1 migrations apply genezisi-cards --remote
-- (requires: set CLOUDFLARE_API_TOKEN env var first)
-- =============================================================================

-- Cards table: stores digital business card orders
CREATE TABLE IF NOT EXISTS cards (
  id           TEXT PRIMARY KEY,           -- "gc-<timestamp>-<random>"
  slug         TEXT UNIQUE,                -- e.g. "tamar-jakobadze" — set at publish time
  tier         TEXT NOT NULL,               -- "subdomain" | "professional" | "executive"
  status       TEXT NOT NULL DEFAULT 'pending',  -- "pending" | "published"

  -- Flat extracted fields (human-readable, no JSON parsing needed)
  name         TEXT,
  company      TEXT,
  phone        TEXT,
  email        TEXT,

  -- Full builder state (drives card render)
  state_json   TEXT NOT NULL,

  created_at   INTEGER NOT NULL,            -- Unix ms
  published_at INTEGER                      -- Unix ms, set on publish
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_cards_status ON cards(status);
CREATE INDEX IF NOT EXISTS idx_cards_slug ON cards(slug);
