/**
 * Diagnostic endpoint: GET /api/test-db
 *
 * Returns the current D1 API configuration and whether we can reach the database.
 * Used to debug "Database not configured" errors in production.
 */

import { NextResponse } from "next/server";

export async function GET() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  const info = {
    hasAccountId: !!accountId,
    hasDatabaseId: !!databaseId,
    hasApiToken: !!apiToken,
    accountId: accountId ?? "MISSING",
    databaseId: databaseId ?? "MISSING",
    tokenPrefix: apiToken ? `cfut_${apiToken.slice(4, 12)}...` : "MISSING",
  };

  // Try to do a simple read query to verify the connection works
  let queryOk = false;
  let queryError = "";

  if (accountId && databaseId && apiToken) {
    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/databases/${databaseId}/query`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: "SELECT count(*) as cnt FROM cards", params: [] }),
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
    queryError = "Missing env vars — cannot query";
  }

  return NextResponse.json({
    env: info,
    queryWorks: queryOk,
    queryError,
  });
}
