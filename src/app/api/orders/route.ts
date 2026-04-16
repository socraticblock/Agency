/**
 * API: /api/orders
 *
 * POST — Create a new card order (client-facing)
 * GET — List all orders (admin only — password protected)
 */

import { NextResponse } from "next/server";
import { createCard, getCardById, listCards } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { computeOrderPublishIntent } from "@/lib/order-publish-intent";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// POST — Create a new card order
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  try {
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

    const existing = await getCardById(id);
    if (existing) {
      return NextResponse.json({
        ok: true,
        id,
        status: existing.status,
        slug: existing.publishSlug ?? existing.slug ?? undefined,
        publishSlug: existing.publishSlug ?? existing.slug ?? undefined,
      });
    }

    const stateObj = state as Record<string, unknown>;
    const name = String(stateObj.name ?? "");
    const company = String(stateObj.company ?? "");
    const hint = typeof body.digitalCardUrlHint === "string" ? body.digitalCardUrlHint : "";

    const intent = computeOrderPublishIntent(
      tier as "subdomain" | "professional" | "executive",
      id,
      hint,
      name,
      company
    );

    const result = await createCard({
      id,
      tier,
      name: name || null,
      company: company || null,
      phone: (stateObj.phone as string) ?? null,
      email: (stateObj.email as string) ?? null,
      stateJson: JSON.stringify(state),
      publishSlug: intent.publishSlug,
      requestedDomain: intent.requestedDomain,
      domainStatus: intent.domainStatus,
    });

    if (!result.ok) {
      console.error("Failed to create card order:", result.error);
      return NextResponse.json(
        { error: "Failed to save order", detail: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id, slug: intent.publishSlug });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Orders API Critical Crash:", msg);
    return NextResponse.json(
      { error: "Database or server configuration error.", detail: msg },
      { status: 500 }
    );
  }
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
