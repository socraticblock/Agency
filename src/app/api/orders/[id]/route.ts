/**
 * GET — Single order with parsed state (admin)
 * PATCH — Update domain_status and/or map custom host (admin)
 */

import { NextResponse } from "next/server";
import { getCardById, updateCardDomainStatus, upsertCardDomainHost } from "@/lib/db";
import { verifyAdminPassword } from "@/lib/admin-auth";
import type { DomainStatus } from "@/lib/order-publish-intent";
import type { Lane1CustomizerState } from "@/app/[locale]/start/lib/types";

const DOMAIN_STATUSES = new Set<DomainStatus>([
  "none",
  "requested",
  "awaiting_dns",
  "connected",
  "live",
]);

function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminPassword(request)) {
    return unauthorized();
  }

  const { id } = await params;
  if (!id || !id.startsWith("gc-")) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
  }

  const card = await getCardById(id);
  if (!card) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  let state: Lane1CustomizerState;
  try {
    state = JSON.parse(card.state_json) as Lane1CustomizerState;
  } catch {
    return NextResponse.json({ error: "Corrupted state_json" }, { status: 500 });
  }

  return NextResponse.json({
    id: card.id,
    slug: card.slug,
    publishSlug: card.publishSlug,
    requestedDomain: card.requestedDomain,
    domainStatus: card.domainStatus,
    tier: card.tier,
    status: card.status,
    name: card.name,
    company: card.company,
    phone: card.phone,
    email: card.email,
    createdAt: card.createdAt,
    publishedAt: card.publishedAt,
    state,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminPassword(request)) {
    return unauthorized();
  }

  const { id } = await params;
  if (!id || !id.startsWith("gc-")) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
  }

  const card = await getCardById(id);
  if (!card) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  let body: { domainStatus?: string; mapHost?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.domainStatus !== undefined) {
    const ds = body.domainStatus as DomainStatus;
    if (!DOMAIN_STATUSES.has(ds)) {
      return NextResponse.json({ error: "Invalid domainStatus" }, { status: 400 });
    }
    const r = await updateCardDomainStatus(id, ds);
    if (!r.ok) {
      return NextResponse.json({ error: r.error }, { status: 500 });
    }
  }

  if (body.mapHost !== undefined && typeof body.mapHost === "string" && body.mapHost.trim()) {
    const r = await upsertCardDomainHost(id, body.mapHost.trim());
    if (!r.ok) {
      return NextResponse.json({ error: r.error }, { status: 400 });
    }
  }

  const updated = await getCardById(id);
  return NextResponse.json({
    ok: true,
    id,
    domainStatus: updated?.domainStatus,
    slug: updated?.slug,
    publishSlug: updated?.publishSlug,
  });
}
