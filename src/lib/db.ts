/**
 * Turso (libSQL) database client for genezisi.com card orders.
 *
 * Uses the Turso SQL-over-HTTP API v2 — works from anywhere (Vercel, local, etc.)
 *
 * Env vars required in Vercel:
 *   TURSO_DATABASE_URL   — e.g. https://genezisi-cards-xxx.turso.io
 *   TURSO_AUTH_TOKEN     — from: turso db tokens genezisi-cards
 */

import type { DomainStatus } from "@/lib/order-publish-intent";

export interface CardRow {
  id: string;
  slug: string | null;
  publish_slug?: string | null;
  requested_domain?: string | null;
  domain_status?: string | null;
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
  publishSlug: string | null;
  requestedDomain: string | null;
  domainStatus: DomainStatus;
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
  publishSlug: string;
  requestedDomain: string | null;
  domainStatus: DomainStatus;
}

export interface CreatePartnerApplicationInput {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  networkSectorsJson: string;
  experience: string;
  whyGenezisi: string;
  clientPlan: string;
  resumeLink: string;
  referralSource: string;
  createdAt: number;
}

// ---------------------------------------------------------------------------
// Turso HTTP client
// ---------------------------------------------------------------------------

function getDatabaseUrl(): string {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) throw new Error("TURSO_DATABASE_URL env var not set in Vercel");
  return url;
}

function getAuthToken(): string {
  const token = process.env.TURSO_AUTH_TOKEN;
  if (!token) throw new Error("TURSO_AUTH_TOKEN env var not set in Vercel");
  return token;
}

/** Convert a JS value to a Turso Hrana-typed value object */
function toTursoValue(val: unknown): { type: string; value: string } {
  if (val === null) return { type: "null", value: "null" };
  if (typeof val === "number" && Number.isInteger(val)) return { type: "integer", value: String(val) };
  if (typeof val === "number") return { type: "float", value: String(val) };
  if (typeof val === "boolean") return { type: "integer", value: val ? "1" : "0" };
  if (typeof val === "string") return { type: "text", value: val };
  return { type: "text", value: String(val) };
}

/** Execute a SQL statement that doesn't return rows (INSERT, UPDATE, etc.) */
async function tursoExec(sql: string, params: unknown[] = []): Promise<void> {
  const url = `${getDatabaseUrl()}/v2/pipeline`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: [
        {
          type: "execute",
          stmt: {
            sql,
            args: params.map(toTursoValue),
          },
        },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Turso API error: ${res.status} ${err}`);
  }
  const data = await res.json();
  if (data.error) {
    throw new Error(`Turso error: ${JSON.stringify(data.error)}`);
  }
  const result = data.results?.[0];
  if (result?.type === "error") {
    throw new Error(`Turso error: ${result.error?.message ?? JSON.stringify(result.error)}`);
  }
}

/** Execute a SQL query and return the rows */
async function tursoQuery<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
  const url = `${getDatabaseUrl()}/v2/pipeline`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: [
        {
          type: "execute",
          stmt: {
            sql,
            args: params.map(toTursoValue),
          },
        },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Turso API error: ${res.status} ${err}`);
  }
  const data = await res.json();
  if (data.error) {
    throw new Error(`Turso error: ${JSON.stringify(data.error)}`);
  }
  const result = data.results?.[0];
  if (result?.type === "error") {
    throw new Error(`Turso error: ${result.error?.message ?? JSON.stringify(result.error)}`);
  }
  // Rows are nested inside result.response.result.rows
  const rows = result?.response?.result?.rows ?? [];
  if (!rows.length) return [];
  const cols = result?.response?.result?.cols ?? [];
  return rows.map((row: Record<string, { type: string; value: unknown }> | unknown[]) => {
    const entryPairs = (Array.isArray(row) ? row : Object.values(row)).map((cell, i) => [
      cols[i]?.name ?? String(i),
      convertTursoValue(cell as { type: string; value: unknown }),
    ]);
    return Object.fromEntries(entryPairs);
  }) as T[];
}

/** Convert a Turso Hrana typed value to a JS value */
function convertTursoValue(val: { type: string; value: unknown }): unknown {
  switch (val.type) {
    case "null": return null;
    case "integer": return Number(val.value);
    case "float": return Number(val.value);
    case "text": return String(val.value);
    case "blob": return val.value; // base64 string in JSON
    default: return val.value;
  }
}

// ---------------------------------------------------------------------------
// Card CRUD
// ---------------------------------------------------------------------------

export async function createPartnerApplication(
  input: CreatePartnerApplicationInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await tursoExec(
      `INSERT INTO partner_applications
        (id, full_name, phone, email, network_sectors, experience, why_genezisi, client_plan, resume_link, referral_source, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.id,
        input.fullName,
        input.phone,
        input.email,
        input.networkSectorsJson,
        input.experience,
        input.whyGenezisi,
        input.clientPlan,
        input.resumeLink,
        input.referralSource,
        "pending",
        input.createdAt,
      ]
    );
    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

export async function createCard(
  input: CreateCardInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const now = Date.now();
    await tursoExec(
      `INSERT INTO cards (id, tier, name, company, phone, email, state_json, status, created_at,
         publish_slug, requested_domain, domain_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)`,
      [
        input.id,
        input.tier,
        input.name,
        input.company,
        input.phone,
        input.email,
        input.stateJson,
        now,
        input.publishSlug,
        input.requestedDomain,
        input.domainStatus,
      ]
    );
    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

export async function getCardById(id: string): Promise<Card | null> {
  const rows = await tursoQuery<CardRow>(
    "SELECT * FROM cards WHERE id = ?",
    [id]
  );
  return rows[0] ? toCard(rows[0]) : null;
}

export async function getPublishedCardBySlug(slug: string): Promise<Card | null> {
  const rows = await tursoQuery<CardRow>(
    "SELECT * FROM cards WHERE slug = ? AND status = 'published'",
    [slug]
  );
  return rows[0] ? toCard(rows[0]) : null;
}

export async function listCards(opts: { admin?: boolean } = {}): Promise<Card[]> {
  const sql = opts.admin
    ? "SELECT * FROM cards ORDER BY created_at DESC"
    : "SELECT * FROM cards WHERE status = 'published' ORDER BY published_at DESC";
  const rows = await tursoQuery<CardRow>(sql);
  return rows.map(toCard);
}

export async function publishCard(
  id: string,
  slug: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const now = Date.now();
    await tursoExec(
      "UPDATE cards SET slug = ?, status = 'published', published_at = ? WHERE id = ?",
      [slug, now, id]
    );
    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

export async function slugTaken(slug: string): Promise<boolean> {
  const rows = await tursoQuery("SELECT 1 FROM cards WHERE slug = ?", [slug]);
  return rows.length > 0;
}

/** True if another card (not `excludeId`) already uses this slug as `cards.slug`. */
export async function slugTakenByOther(slug: string, excludeId: string): Promise<boolean> {
  const rows = await tursoQuery("SELECT 1 FROM cards WHERE slug = ? AND id != ?", [slug, excludeId]);
  return rows.length > 0;
}

function parseDomainStatus(raw: string | null | undefined): DomainStatus {
  const v = (raw ?? "none").toLowerCase();
  if (v === "requested" || v === "awaiting_dns" || v === "connected" || v === "live") return v;
  return "none";
}

export async function updateCardDomainStatus(
  id: string,
  domainStatus: DomainStatus
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await tursoExec("UPDATE cards SET domain_status = ? WHERE id = ?", [domainStatus, id]);
    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

/** Normalize host: lowercase, no port, trim. */
export function normalizeHostHeader(host: string): string {
  return host.split(":")[0].trim().toLowerCase();
}

/**
 * Returns published `cards.slug` for a custom host mapped in `card_domains`, or null.
 */
export async function getPublishedSlugByMappedHost(host: string): Promise<string | null> {
  const h = normalizeHostHeader(host);
  if (!h) return null;
  const rows = await tursoQuery<{ slug: string | null }>(
    `SELECT c.slug AS slug
     FROM card_domains d
     INNER JOIN cards c ON c.id = d.card_id
     WHERE d.host = ? AND c.status = 'published' AND c.slug IS NOT NULL`,
    [h]
  );
  const slug = rows[0]?.slug;
  return typeof slug === "string" && slug.length > 0 ? slug : null;
}

export async function upsertCardDomainHost(
  cardId: string,
  host: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const h = normalizeHostHeader(host);
  if (!h || !/^[a-z0-9.-]+$/.test(h)) {
    return { ok: false, error: "Invalid host" };
  }
  try {
    await tursoExec("INSERT OR REPLACE INTO card_domains (host, card_id) VALUES (?, ?)", [h, cardId]);
    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

/** SQLite upsert: ON CONFLICT requires UNIQUE on host - we have PRIMARY KEY. */

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

function toCard(row: CardRow): Card {
  return {
    id: row.id,
    slug: row.slug,
    publishSlug: row.publish_slug ?? null,
    requestedDomain: row.requested_domain ?? null,
    domainStatus: parseDomainStatus(row.domain_status ?? null),
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
