/**
 * D1 database wrapper for genezisi.com card orders.
 *
 * Uses Cloudflare D1 via process.env.CARDS_DB — injected by Vercel Edge
 * Runtime from the [[d1_databases]] binding in wrangler.toml.
 *
 * Usage:
 *   // @ts-expect-error CARDS_DB bound via Vercel Edge config
 *   const db = process.env.CARDS_DB as D1Database;
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

// D1Database is the Cloudflare Workers D1 API type. We cast to this type
// at runtime when using process.env.CARDS_DB, but define a local interface
// so TypeScript is happy during Next.js build (which doesn't have @cloudflare/workers-types)
export interface D1Database {
  prepare(sql: string): D1PreparedStatement;
}

export interface D1PreparedStatement {
  bind(...args: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}

export interface D1Result<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
  meta: { changes?: number };
}

export interface CardRow {
  id: string;
  slug: string | null;
  tier: string;
  status: "pending" | "published";
  name: string | null;
  company: string | null;
  phone: string | null;
  email: string | null;
  state_json: string;
  created_at: number;
  published_at: number | null;
}

export interface Card {
  id: string;
  slug: string | null;
  tier: string;
  status: "pending" | "published";
  name: string | null;
  company: string | null;
  phone: string | null;
  email: string | null;
  state_json: string;
  createdAt: number;
  publishedAt: number | null;
}

export interface CreateCardInput {
  id: string;
  tier: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  email: string | null;
  stateJson: string;
}

// ---------------------------------------------------------------------------
// Card CRUD helpers
// ---------------------------------------------------------------------------

/** Insert a new pending card order. */
export async function createCard(
  db: D1Database,
  input: CreateCardInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const now = Date.now();
    await db
      .prepare(
        `INSERT INTO cards (id, tier, name, company, phone, email, state_json, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`
      )
      .bind(
        input.id,
        input.tier,
        input.name,
        input.company,
        input.phone,
        input.email,
        input.stateJson,
        now
      )
      .run();
    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

/** Get a card by its order ID (gc-...). */
export async function getCardById(
  db: D1Database,
  id: string
): Promise<Card | null> {
  const row = await db
    .prepare("SELECT * FROM cards WHERE id = ?")
    .bind(id)
    .first<CardRow>();
  return row ? toCard(row) : null;
}

/** Get a published card by its public slug. */
export async function getPublishedCardBySlug(
  db: D1Database,
  slug: string
): Promise<Card | null> {
  const row = await db
    .prepare(
      "SELECT * FROM cards WHERE slug = ? AND status = 'published'"
    )
    .bind(slug)
    .first<CardRow>();
  return row ? toCard(row) : null;
}

/** Get all cards, newest first. admin=true includes unpublished. */
export async function listCards(
  db: D1Database,
  opts: { admin?: boolean } = {}
): Promise<Card[]> {
  const sql = opts.admin
    ? "SELECT * FROM cards ORDER BY created_at DESC"
    : "SELECT * FROM cards WHERE status = 'published' ORDER BY published_at DESC";

  const result = await db.prepare(sql).all<CardRow>();
  return (result.results as CardRow[]).map(toCard);
}

/** Assign a slug and publish a card. */
export async function publishCard(
  db: D1Database,
  id: string,
  slug: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const now = Date.now();
    await db
      .prepare(
        `UPDATE cards SET slug = ?, status = 'published', published_at = ? WHERE id = ?`
      )
      .bind(slug, now, id)
      .run();
    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

/** Check if a slug is already taken. */
export async function slugTaken(
  db: D1Database,
  slug: string
): Promise<boolean> {
  const row = await db
    .prepare("SELECT 1 FROM cards WHERE slug = ?")
    .bind(slug)
    .first();
  return row !== null;
}

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

function toCard(row: CardRow): Card {
  return {
    id: row.id,
    slug: row.slug,
    tier: row.tier,
    status: row.status,
    name: row.name,
    company: row.company,
    phone: row.phone,
    email: row.email,
    state_json: row.state_json,
    createdAt: row.created_at,
    publishedAt: row.published_at,
  };
}
