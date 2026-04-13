/**
 * API: /api/cards/[slug]/publish
 *
 * POST — Assign slug + publish a card order
 * Body: { id: string }   (the gc-... order ID)
 */

import { NextResponse } from "next/server";
import { getCardById, publishCard, slugTaken } from "@/lib/db";

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

  try {
    // Verify the order exists
    const card = await getCardById(body.id);
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
    if (await slugTaken(slug)) {
      return NextResponse.json(
        { error: `Slug "${slug}" is already taken. Choose a different one.` },
        { status: 409 }
      );
    }

    // Publish
    const result = await publishCard(body.id, slug);

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
      url: `https://genezisi.com/en/c/${slug}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Database error", detail: message }, { status: 500 });
  }
}
