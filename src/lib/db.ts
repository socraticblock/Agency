/**
 * D1 database wrapper for genezisi.com card orders.
 *
 * Uses Cloudflare D1 via the D1 binding (env.CARDS_DB) — works natively
 * in Cloudflare Workers, Vercel Edge Functions, and Next.js App Router
 * with the wrangler.toml [[d1_databases]] binding.
 *
 * Usage in API routes:
 *   export const runtime = 'edge';
 *   export async function GET(_req: Request, { env }: { env: Env }) {
 *     const db = createDb(env.CARDS_DB);
 *     ...
 *   }
 */

import type { Env } from "~/lib/db-types";

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

// Re-export Env for convenience
export type { Env };

// ---------------------------------------------------------------------------
// DB factory
// ---------------------------------------------------------------------------

/**
 * Returns the D1 database client.
 * Pass env.CARDS_DB from your Next.js route handler's `env` parameter.
 *
 * In production (Vercel Edge / Cloudflare Workers): env.CARDS_DB is a D1Database
 * In local dev with `wrangler dev --remote`: also a D1Database
 *
 * The D1 binding is Cloudflare's D1Database API which is directly compatible
 * with the prepare().bind().run() interface used throughout this file.
 */
export function createDb(d1: D1Database | undefined): D1Database {
  if (!d1) {
    throw new Error(
      "CARDS_DB binding is not defined. " +
        "Make sure wrangler.toml has the [[d1_databases]] binding, " +
        "and your Vercel project has CLOUDFLARE_D1_DATABASE_ID set."
    );
  }
  return d1;
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
