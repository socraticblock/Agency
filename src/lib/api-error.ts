/**
 * Uniform failure response for API routes.
 *
 * Public endpoints used to return `detail: err.message`, which leaks driver,
 * schema and connection details to anyone who can provoke a 500. The client now
 * gets a generic message plus a request id; the real error is logged server-side
 * with that same id, so support can still join the two.
 */
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export function serverError(scope: string, err: unknown, status = 500): NextResponse {
  const id = randomUUID();
  const message = err instanceof Error ? err.message : String(err);
  // Server logs only — never sent to the client.
  console.error(`[api:${scope}] request=${id} ${message}`);
  return NextResponse.json(
    { error: "Request failed", requestId: id },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}
