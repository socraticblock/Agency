/**
 * Diagnostic endpoint: GET /api/test-db
 *
 * Tests Turso connection and returns env var status.
 */

import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  const info = {
    hasDbUrl: !!dbUrl,
    hasAuthToken: !!authToken,
    dbUrl: dbUrl ? dbUrl.replace(/\/\/.*@/, "//***@") : "MISSING",
    tokenPrefix: authToken ? `eyJ...${authToken.slice(-10)}` : "MISSING",
  };

  let queryOk = false;
  let queryError = "";

  if (dbUrl && authToken) {
    try {
      const res = await fetch(`${dbUrl}/v2/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statements: [{ sql: "SELECT count(*) as cnt FROM cards", params: [] }],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        queryOk = true;
        queryError = JSON.stringify(data);
      } else {
        queryError = `HTTP ${res.status}: ${await res.text()}`;
      }
    } catch (err: unknown) {
      queryError = err instanceof Error ? err.message : String(err);
    }
  } else {
    queryError = "Missing env vars";
  }

  return NextResponse.json({
    env: info,
    queryWorks: queryOk,
    queryError,
  });
}
