/**
 * API: /api/orders
 *
 * POST — Create a new card order (client-facing)
 * GET — List all orders (admin only — password protected)
 */

import { NextResponse } from "next/server";
import { listCards } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// POST — Retired new-card sales are deliberately closed, including direct API calls.
// GET /api/orders and existing published-card/admin APIs remain supported.
// ---------------------------------------------------------------------------

export async function POST() {
  return NextResponse.json(
    { error: "New digital business card orders are no longer accepted." },
    { status: 410, headers: { "Cache-Control": "no-store" } }
  );
}

// ---------------------------------------------------------------------------
// GET — List all orders (admin)
// ---------------------------------------------------------------------------

export async function GET() {
  if (!(await verifyAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cards = await listCards({ admin: true });

    return NextResponse.json({
      cards: cards.map((c) => ({
        id: c.id,
        slug: c.slug,
        publishSlug: c.publishSlug,
        requestedDomain: c.requestedDomain,
        domainStatus: c.domainStatus,
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Database error", detail: message }, { status: 500 });
  }
}
