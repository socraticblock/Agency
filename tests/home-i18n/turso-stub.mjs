/**
 * Minimal Turso (Hrana) HTTP stub for local QA.
 *
 * `src/lib/db.ts` talks to `${TURSO_DATABASE_URL}/v2/pipeline` with plain
 * `fetch`, so a canned HTTP response is enough to exercise the mapped custom
 * host rewrite in `middleware.ts` without touching a real database.
 *
 * It answers the `getPublishedSlugByMappedHost` query: the mapped host gets one
 * row, every other host gets none.
 *
 *   node tests/home-i18n/turso-stub.mjs [port]
 */
import { createServer } from "node:http";

export const MAPPED_HOST = "client-demo.example";
export const MAPPED_SLUG = "demo-card";

function pipelineResponse(rows) {
  return JSON.stringify({
    results: [
      {
        type: "ok",
        response: { result: { cols: [{ name: "slug" }], rows } },
      },
    ],
  });
}

export function startStub(port) {
  const server = createServer((req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let host = null;
      try {
        host = JSON.parse(body)?.requests?.[0]?.stmt?.args?.[0]?.value ?? null;
      } catch {
        host = null;
      }
      res.setHeader("content-type", "application/json");
      res.end(
        pipelineResponse(
          host === MAPPED_HOST ? [[{ type: "text", value: MAPPED_SLUG }]] : [],
        ),
      );
    });
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

if (process.argv[1] && process.argv[1].endsWith("turso-stub.mjs")) {
  const port = Number(process.argv[2] || 3252);
  await startStub(port);
  console.log(`turso stub listening on http://127.0.0.1:${port} (mapped host: ${MAPPED_HOST})`);
}
