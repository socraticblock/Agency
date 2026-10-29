/**
 * Development-only Turso health probe.
 *
 * NEVER expose connection URLs, tokens, token fragments or raw driver responses.
 * No sensitive details are returned even in development. Disabled in all
 * production builds and preview deployments (NODE_ENV=production).
 */
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse(null, { status: 404 });
  }

  const dbUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!dbUrl || !authToken) {
    return NextResponse.json(
      { configured: false, queryWorks: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const response = await fetch(`${dbUrl}/v2/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [
          { type: "execute", stmt: { sql: "SELECT count(*) as cnt FROM cards", params: [] } },
        ],
      }),
      cache: "no-store",
    });

    // Intentionally never include response body, URL, token or raw errors.
    return NextResponse.json(
      { configured: true, queryWorks: response.ok },
      {
        status: response.ok ? 200 : 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    return NextResponse.json(
      { configured: true, queryWorks: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
