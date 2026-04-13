/**
 * API: /api/orders
 *
 * POST — Create a new card order (client-facing)
 * GET  — List all orders (admin only — password protected)
 */

import { NextResponse } from "next/server";
import { createCard, getCardById, listCards } from "@/lib/db";
import type { D1Database } from "@/lib/db";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = "Jeftax12!";

function adminAuth(request: Request): boolean {
  const sent = request.headers.get("x-admin-password") ?? "";
  return sent === (process.env.ADMIN_PASSWORD ?? ADMIN_PASSWORD);
}

function makeSlug(name: string, company: string): string {
  const base = name
    ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : company
      ? company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      : "card";
  return base || "card";
}

// ---------------------------------------------------------------------------
// POST — Create a new card order
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  // CARDS_DB is bound via wrangler.toml [[d1_databases]] — injected by Vercel Edge Runtime
  // @ts-expect-error Vercel Edge injects D1 bindings into process.env
  const db: D1Database = process.env.CARDS_DB;

  if (!db) {
    return NextResponse.json(
      { error: "Database not configured. Set CLOUDFLARE_D1_DATABASE_ID in Vercel env vars." },
      { status: 500 }
    );
  }

  let body: {
    id: string;
    state: unknown;
    tier: string;
    digitalCardUrlHint?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { id, state, tier } = body;

  if (!id || typeof id !== "string" || !id.startsWith("gc-")) {
    return NextResponse.json(
      { error: "Valid order ID required (must start with gc-)" },
      { status: 400 }
    );
  }

  if (!state || typeof state !== "object") {
    return NextResponse.json(
      { error: "state (Lane1CustomizerState) required" },
      { status: 400 }
    );
  }

  if (!tier || !["subdomain", "professional", "executive"].includes(tier)) {
    return NextResponse.json(
      { error: "Valid tier required: subdomain | professional | executive" },
      { status: 400 }
    );
  }

  // Idempotency: if order already exists, return existing data
  const existing = await getCardById(db, id);
  if (existing) {
    return NextResponse.json({ ok: true, id, status: existing.status });
  }

  const stateObj = state as Record<string, unknown>;

  // Determine slug at order time
  const slug =
    tier === "subdomain" && body.digitalCardUrlHint
      ? body.digitalCardUrlHint
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "-")
          .replace(/^-|-$/g, "")
      : makeSlug(
          (stateObj.name as string) ?? "",
          (stateObj.company as string) ?? ""
        );

  const result = await createCard(db, {
    id,
    tier,
    name: (stateObj.name as string) ?? null,
    company: (stateObj.company as string) ?? null,
    phone: (stateObj.phone as string) ?? null,
    email: (stateObj.email as string) ?? null,
    stateJson: JSON.stringify(state),
  });

  if (!result.ok) {
    console.error("Failed to create card order:", result.error);
    return NextResponse.json(
      { error: "Failed to save order", detail: result.error },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, id, slug });
}

// ---------------------------------------------------------------------------
// GET — List all orders (admin)
// ---------------------------------------------------------------------------

export async function GET(request: Request) {
  if (!adminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // @ts-expect-error Vercel Edge injects D1 bindings into process.env
  const db: D1Database = process.env.CARDS_DB;

  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const cards = await listCards(db, { admin: true });

  return NextResponse.json({
    cards: cards.map((c) => ({
      id: c.id,
      slug: c.slug,
      tier: c.tier,
      status: c.status,
      name: c.name,
      company: c.company,
      phone: c.phone,
      email: c.email,
      createdAt: c.createdAt,
      publishedAt: c.publishedAt,
    })),
  });
}
