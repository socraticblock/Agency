/**
 * D1 database wrapper for genezisi.com card orders.
 *
 * Runtime support:
 * - Cloudflare Workers / Edge (Vercel Edge Functions):
 *     pass `env.CARDS_DB` (D1Database binding from wrangler.toml)
 * - Local dev:
 *     pass undefined — uses @libsql/client with TURSO_DATABASE_URL or local file
 */

import { createClient, type Client } from "@libsql/client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

/** Env type for Next.js 15 App Router — use in route handlers */
export interface Env {
  CARDS_DB?: D1Database;
  ADMIN_PASSWORD?: string;
}

// ---------------------------------------------------------------------------
// DB factory
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type D1Like = any;

let _localClient: Client | null = null;

/**
 * Returns a DB client compatible with D1's prepare().bind().run() API.
 *
 * - In Cloudflare Workers / Vercel Edge: pass env.CARDS_DB (the D1 binding)
 * - In local dev: pass undefined to use @libsql/client with TURSO_DATABASE_URL
 *   or a local file at ./local_cards.db
 */
export function createDb(d1: D1Like | undefined): D1Like {
  if (d1) {
    return d1;
  }

  if (!_localClient) {
    const url =
      process.env.TURSO_DATABASE_URL ??
      `file:${process.cwd()}/local_cards.db`;
    _localClient = createClient({ url });
  }

  return d1Shim(_localClient);
}

// ---------------------------------------------------------------------------
// D1-compatible shim for local @libsql/client
// ---------------------------------------------------------------------------

function d1Shim(client: Client): D1Like {
  return {
    prepare(sql: string) {
      return {
        bind: (...args: unknown[]) => ({
          async run() {
            const result = await client.execute({
              sql,
              args: args as unknown[],
            });
            return {
              results: result.rows ?? [],
              success: true,
              meta: { changes: result.rowsAffected },
            };
          },
          async first<T = Record<string, unknown>>() {
            const result = await client.execute({
              sql,
              args: args as unknown[],
            });
            return (result.rows[0] as T) ?? null;
          },
          async all<T = Record<string, unknown>>() {
            const result = await client.execute({
              sql,
              args: args as unknown[],
            });
            return {
              results: (result.rows as T[]) ?? [],
              success: true,
            };
          },
        }),
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Card CRUD helpers
// ---------------------------------------------------------------------------

/** Insert a new pending card order. */
export async function createCard(
  db: D1Like,
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
  db: D1Like,
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
  db: D1Like,
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
  db: D1Like,
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
  db: D1Like,
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
export async function slugTaken(db: D1Like, slug: string): Promise<boolean> {
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
