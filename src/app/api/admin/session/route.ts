import { NextResponse } from "next/server";
import { verifyAdminRequest, adminPasswordConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!adminPasswordConfigured()) {
    return NextResponse.json({ ok: false, configured: false }, { status: 503 });
  }
  const ok = await verifyAdminRequest();
  return NextResponse.json({ ok, configured: true });
}
