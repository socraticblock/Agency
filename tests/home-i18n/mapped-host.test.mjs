/**
 * Mapped custom-host regression (roadmap §8.2 precedence, §22 R26/R27).
 *
 * The middleware rewrites a published customer domain to `/{locale}/c/{slug}`
 * *before* any Dutch routing. That ordering is a "Critical" risk in the roadmap
 * and cannot be proven with a real Turso database from here, so this test starts
 * a canned Hrana stub (see `turso-stub.mjs`) and a real production server, then
 * drives both a mapped and an unmapped host.
 *
 * Requires a production build to exist first:
 *   npm run build && node --test tests/home-i18n/mapped-host.test.mjs
 */
import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MAPPED_HOST, MAPPED_SLUG, startStub } from "./turso-stub.mjs";

const REPO = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const PORT = Number(process.env.MAPPED_HOST_PORT || 3261);
const STUB_PORT = PORT + 1;
const PRIMARY_HOST = "genezisi.com";
const UNMAPPED_HOST = "not-mapped.example";

const NL_HOME_MARKER = "Bewijs, geen beloftes.";
const EN_HOME_MARKER = "Proof, not promises.";

let stub;
let server;

/** node:http (not fetch) so the Host header can actually be set. */
function rawGet(pathname, host) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: "127.0.0.1", port: PORT, path: pathname, method: "GET", headers: { Host: host } },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
      },
    );
    req.on("error", reject);
    req.end();
  });
}

async function waitForServer() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await rawGet("/en", PRIMARY_HOST);
      if (res.status === 200) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("production server did not become ready on port " + PORT);
}

before(async () => {
  assert.ok(
    existsSync(path.join(REPO, ".next", "server", "middleware-manifest.json")),
    "no production build in .next — run `npm run build` before this suite",
  );
  stub = await startStub(STUB_PORT);
  server = spawn("npm", ["run", "start", "--", "--port", String(PORT)], {
    cwd: REPO,
    env: {
      ...process.env,
      TURSO_DATABASE_URL: `http://127.0.0.1:${STUB_PORT}`,
      TURSO_AUTH_TOKEN: "qa-stub-token",
      NEXT_PUBLIC_SITE_URL: "https://genezisi.com",
    },
    stdio: "ignore",
  });
  await waitForServer();
});

after(() => {
  server?.kill("SIGTERM");
  stub?.close();
});

test("R26 a mapped custom host is rewritten to its published card, not the homepage", async () => {
  const res = await rawGet("/", MAPPED_HOST);
  assert.ok(res.status < 300 || res.status >= 400, `rewrite should not redirect (got ${res.status})`);
  assert.ok(!res.body.includes(EN_HOME_MARKER), "mapped host served the Genezisi homepage instead of its card");
  assert.ok(!res.body.includes(NL_HOME_MARKER), "mapped host served the Dutch homepage instead of its card");
  const rewrite = res.headers["x-middleware-rewrite"];
  if (rewrite) assert.match(rewrite, new RegExp(`/en/c/${MAPPED_SLUG}$`));
});

test("R26b a mapped custom host does NOT inherit the Dutch homepage on /nl", async () => {
  const res = await rawGet("/nl", MAPPED_HOST);
  assert.ok(!res.body.includes(NL_HOME_MARKER), "Dutch homepage leaked onto a mapped customer domain");
  assert.ok(!res.body.includes(EN_HOME_MARKER), "Genezisi homepage leaked onto a mapped customer domain");
  const rewrite = res.headers["x-middleware-rewrite"];
  if (rewrite) assert.match(rewrite, new RegExp(`/en/c/${MAPPED_SLUG}$`));
});

test("R26c the NL legacy redirect never pre-empts a mapped host", async () => {
  const res = await rawGet("/nl/pricing", MAPPED_HOST);
  assert.notEqual(res.status, 307, "mapped host received the /nl -> /en pricing redirect");
  assert.equal(res.headers.location ?? null, null, "mapped host was redirected away from its own domain");
});

test("R27 an unmapped host never leaks another customer's slug", async () => {
  for (const pathname of ["/", "/nl"]) {
    const res = await rawGet(pathname, UNMAPPED_HOST);
    assert.ok(!res.body.includes(MAPPED_SLUG), `${pathname}: slug of a different customer leaked`);
    assert.ok(!/\/c\/demo-card/.test(res.headers.location || ""), `${pathname}: redirected into another customer's card`);
  }
});

test("the primary host keeps its baseline behaviour", async () => {
  const root = await rawGet("/", PRIMARY_HOST);
  assert.equal(root.status, 308);
  assert.equal(root.headers.location, "/en");

  const nl = await rawGet("/nl", PRIMARY_HOST);
  assert.equal(nl.status, 200);
  assert.ok(nl.body.includes(NL_HOME_MARKER), "primary host lost the Dutch homepage");

  const legacy = await rawGet("/nl/pricing", PRIMARY_HOST);
  assert.equal(legacy.status, 307);
  assert.equal(legacy.headers.location, "/en/pricing");
});
