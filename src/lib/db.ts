/**
 * Cloudflare D1 REST API client for genezisi.com card orders.
 *
 * Vercel doesn't support wrangler.toml D1 bindings — we call the Cloudflare D1
 * REST API directly using the API token stored in CLOUDFLARE_API_TOKEN env var.
 *
 * Env vars required in Vercel dashboard:
 *   CLOUDFLARE_API_TOKEN   — your Cloudflare API token (with D1 edit permission)
 *   CLOUDFLARE_D1_DATABASE_ID — the D1 database ID (e.g. f49d592e-...)
 *   CLOUDFLARE_ACCOUNT_ID  — your Cloudflare account ID
 */

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
// D1 REST API client
// ---------------------------------------------------------------------------

function getAccountId(): string {
  const id = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!id) throw new Error("CLOUDFLARE_ACCOUNT_ID env var not set in Vercel");
  return id;
}

function getDatabaseId(): string {
  const id = process.env.CLOUDFLARE_D1_DATABASE_ID;
  if (!id) throw new Error("CLOUDFLARE_D1_DATABASE_ID env var not set in Vercel");
  return id;
}

function getApiToken(): string {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) throw new Error("CLOUDFLARE_API_TOKEN env var not set in Vercel");
  return token;
}

function baseUrl(): string {
  return `https://api.cloudflare.com/client/v4/accounts/${getAccountId()}/d1/database/${getDatabaseId()}`;
}

/** Execute a SQL query against D1 via the REST API */
async function d1Exec(sql: string, params?: unknown[]): Promise<void> {
  const url = `${baseUrl()}/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params: params ?? [] }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`D1 API error: ${res.status} ${err}`);
  }
}

/** Execute a SQL query and return the results */
async function d1Query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]> {
  const url = `${baseUrl()}/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params: params ?? [] }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`D1 API error: ${res.status} ${err}`);
  }
  const data = await res.json();
  // D1 REST API returns { results: [{ result: [...] }] }
  return (data.results?.[0]?.result as T[]) ?? [];
}

// ---------------------------------------------------------------------------
// Card CRUD helpers
// ---------------------------------------------------------------------------

/** Insert a new pending card order. */
export async function createCard(
  input: CreateCardInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const now = Date.now();
    await d1Exec(
      `INSERT INTO cards (id, tier, name, company, phone, email, state_json, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      [input.id, input.tier, input.name, input.company, input.phone, input.email, input.stateJson, now]
    );
    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

/** Get a card by its order ID (gc-...). */
export async function getCardById(id: string): Promise<Card | null> {
  const rows = await d1Query<CardRow>(
    "SELECT * FROM cards WHERE id = ?",
    [id]
  );
  return rows[0] ? toCard(rows[0]) : null;
}

/** Get a published card by its public slug. */
export async function getPublishedCardBySlug(slug: string): Promise<Card | null> {
  const rows = await d1Query<CardRow>(
    "SELECT * FROM cards WHERE slug = ? AND status = 'published'",
    [slug]
  );
  return rows[0] ? toCard(rows[0]) : null;
}

/** Get all cards, newest first. admin=true includes unpublished. */
export async function listCards(
  opts: { admin?: boolean } = {}
): Promise<Card[]> {
  const sql = opts.admin
    ? "SELECT * FROM cards ORDER BY created_at DESC"
    : "SELECT * FROM cards WHERE status = 'published' ORDER BY published_at DESC";

  const rows = await d1Query<CardRow>(sql);
  return rows.map(toCard);
}

/** Assign a slug and publish a card. */
export async function publishCard(
  id: string,
  slug: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const now = Date.now();
    await d1Exec(
      "UPDATE cards SET slug = ?, status = 'published', published_at = ? WHERE id = ?",
      [slug, now, id]
    );
    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

/** Check if a slug is already taken. */
export async function slugTaken(slug: string): Promise<boolean> {
  const rows = await d1Query("SELECT 1 FROM cards WHERE slug = ?", [slug]);
  return rows.length > 0;
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
