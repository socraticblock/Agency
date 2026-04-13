/**
 * API: /api/orders
 *
 * POST — Create a new card order (client-facing)
 * GET  — List all orders (admin only — password protected)
 */

import { NextResponse } from "next/server";
import { createCard, getCardById, listCards } from "@/lib/db";
import { createDb } from "@/lib/db";
import type { Lane1CustomizerState } from "@/app/[locale]/start/lib/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ADMIN_PASSWORD = "Jeftax12!";

function adminAuth(request: Request, env: { ADMIN_PASSWORD?: string }): boolean {
  const sent = request.headers.get("x-admin-password") ?? "";
  return sent === (env.ADMIN_PASSWORD ?? ADMIN_PASSWORD);
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

export async function POST(request: Request, { env }: { env: { CARDS_DB?: D1Database; ADMIN_PASSWORD?: string } }) {
  let body: {
    id: string;
    state: Lane1CustomizerState;
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

  const db = createDb(env.CARDS_DB);

  // Idempotency: if order already exists, return existing data
  const existing = await getCardById(db, id);
  if (existing) {
    return NextResponse.json({ ok: true, id, status: existing.status });
  }

  // Determine slug at order time
  const slug =
    tier === "subdomain" && body.digitalCardUrlHint
      ? body.digitalCardUrlHint
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "-")
          .replace(/^-|-$/g, "")
      : makeSlug(state.name ?? "", state.company ?? "");

  const result = await createCard(db, {
    id,
    tier,
    name: state.name ?? null,
    company: state.company ?? null,
    phone: state.phone ?? null,
    email: state.email ?? null,
    stateJson: JSON.stringify(state),
  });

  if (!result.ok) {
    console.error("Failed to create card order:", result.error);
    return NextResponse.json(
      { error: "Failed to save order", detail: result.error },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    id,
    slug,
  });
}

// ---------------------------------------------------------------------------
// GET — List all orders (admin)
// ---------------------------------------------------------------------------

export async function GET(request: Request, { env }: { env: { CARDS_DB?: D1Database; ADMIN_PASSWORD?: string } }) {
  if (!adminAuth(request, env)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createDb(env.CARDS_DB);
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
