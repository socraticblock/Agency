/**
 * API: /api/cards/[slug]/publish
 *
 * POST — Assign slug + publish a card order (admin)
 * Body: { id: string }   (the gc-... order ID)
 */

import { NextResponse } from "next/server";
import { getCardById, publishCard, slugTakenByOther } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/admin-auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
    const card = await getCardById(body.id);
    if (!card) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (card.slug && card.slug !== slug) {
      return NextResponse.json(
        {
          error: `Order already published with slug "${card.slug}". Choose a different slug.`,
        },
        { status: 409 }
      );
    }

    if (card.publishSlug && card.publishSlug !== slug) {
      return NextResponse.json(
        {
          error: `URL slug must match saved publish slug "${card.publishSlug}".`,
        },
        { status: 400 }
      );
    }

    if (await slugTakenByOther(slug, body.id)) {
      return NextResponse.json(
        { error: `Slug "${slug}" is already taken. Choose a different one.` },
        { status: 409 }
      );
    }

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
