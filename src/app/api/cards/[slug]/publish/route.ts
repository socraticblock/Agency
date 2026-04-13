/**
 * API: /api/cards/[slug]/publish
 *
 * POST — Assign slug + publish a card order
 * Body: { id: string }   (the gc-... order ID)
 */

import { NextResponse } from "next/server";
import { getCardById, publishCard, slugTaken } from "@/lib/db";
import type { D1Database } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  let body: { id: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.id || typeof body.id !== "string") {
    return NextResponse.json(
      { error: "Order ID (id) required" },
      { status: 400 }
    );
  }

  // @ts-expect-error CARDS_DB is bound via Vercel Edge config (wrangler.toml [[d1_databases]])
  const db: D1Database = process.env.CARDS_DB;

  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  // Verify the order exists
  const card = await getCardById(db, body.id);
  if (!card) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // If the card already has a different slug, reject
  if (card.slug && card.slug !== slug) {
    return NextResponse.json(
      {
        error: `Order already published with slug "${card.slug}". Choose a different slug.`,
      },
      { status: 409 }
    );
  }

  // Check slug is not taken by a different card
  if (await slugTaken(db, slug)) {
    return NextResponse.json(
      { error: `Slug "${slug}" is already taken. Choose a different one.` },
      { status: 409 }
    );
  }

  // Publish
  const result = await publishCard(db, body.id, slug);

  if (!result.ok) {
    return NextResponse.json(
      { error: "Failed to publish", detail: result.error },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    id: body.id,
    slug,
    url: `https://genezisi.com/c/${slug}`,
  });
}
