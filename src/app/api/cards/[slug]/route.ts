/**
 * API: /api/cards/[slug]
 *
 * GET — Get a published card by slug (public)
 */

import { NextResponse } from "next/server";
import { getPublishedCardBySlug } from "@/lib/db";
import type { D1Database } from "@/lib/db";
import type { Lane1CustomizerState } from "@/app/[locale]/start/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  // CARDS_DB is bound via wrangler.toml [[d1_databases]] — injected by Vercel Edge Runtime
  // @ts-expect-error Vercel Edge injects D1 bindings into process.env
  const db: D1Database = process.env.CARDS_DB;

  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const card = await getPublishedCardBySlug(db, slug);

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  let state: Lane1CustomizerState;
  try {
    state = JSON.parse(card.state_json);
  } catch {
    return NextResponse.json({ error: "Card state corrupted" }, { status: 500 });
  }

  return NextResponse.json({
    id: card.id,
    slug: card.slug,
    tier: card.tier,
    status: card.status,
    name: card.name,
    company: card.company,
    state,
  });
}
