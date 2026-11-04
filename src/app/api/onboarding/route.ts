import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Onboarding has no active customers or provisioned sessions as of
 * 2026-11-04 (confirmed by founder). Do not accept unauthenticated writes
 * using a caller-provided session_id and the Supabase service-role key.
 *
 * This endpoint is intentionally closed until a new authenticated,
 * expiring invitation flow has been implemented and reviewed.
 *
 * Existing database rows and schema are NOT modified.
 */
export async function POST() {
  return NextResponse.json(
    { error: "Online onboarding is not available." },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
