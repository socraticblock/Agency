/**
 * Custom-domain mapping integrity (admin PATCH /api/orders/[id]).
 *
 * `upsertCardDomainHost` used to run `INSERT OR REPLACE`, which let an admin
 * reassign a live customer host to another card without notice. It now refuses
 * with a conflict unless the host is already owned by the same card.
 *
 * Runs against a canned Turso (Hrana) stub so no real database is contacted:
 *   npm run build && node --test tests/domain-mapping-conflict.test.mjs
 */
import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const PORT = Number(process.env.DOMAIN_TEST_PORT || 3271);
const STUB_PORT = PORT + 1;
const PASSWORD = "qa-domain-test-password";
const OWNER_CARD = "gc-1";

const CARD_COLS = [
  "id", "slug", "publish_slug", "requested_domain", "domain_status", "tier",
  "status", "name", "company", "phone", "email", "state_json", "created_at",
  "published_at",
].map((name) => ({ name }));

function text(v) {
  return v === null || v === undefined ? { type: "null", value: null } : { type: "text", value: String(v) };
}
function int(v) {
  return v === null || v === undefined ? { type: "null", value: null } : { type: "integer", value: String(v) };
}

function startStub(port) {
  const server = http.createServer((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      const payload = JSON.parse(body || "{}");
      const stmt = payload.requests?.[0]?.stmt ?? {};
      const sql = String(stmt.sql || "");
      const arg = stmt.args?.[0]?.value ?? null;
      let cols = [];
      let rows = [];

      if (/FROM cards WHERE id =/.test(sql)) {
        cols = CARD_COLS;
        rows = [[
          text("gc-1"), text("demo"), text(null), text(null), text("none"),
          text("professional"), text("published"), text("Demo"), text("Demo Co"),
          text(null), text(null), text("{}"), int(1), int(2),
        ]];
      } else if (/FROM card_domains WHERE host =/.test(sql)) {
        cols = [{ name: "card_id" }];
        if (arg === "taken.example") rows = [[text("gc-other")]];
        else if (arg === "own.example") rows = [[text(OWNER_CARD)]];
      }

      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          results: [
            { type: "ok", response: { result: { cols, rows } } },
          ],
        }),
      );
    });
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

let stub;
let server;
let cookie = "";

async function rawJson(method, pathname, payload) {
  const res = await fetch(`http://127.0.0.1:${PORT}${pathname}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const text = await res.text();
  return { status: res.status, text, json: text ? JSON.parse(text) : null };
}

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/en`);
      if (res.status === 200) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("production server did not start on " + PORT);
}

before(async () => {
  assert.ok(
    existsSync(path.join(REPO, ".next", "server", "middleware-manifest.json")),
    "no production build in .next — run `npm run build` first",
  );
  stub = await startStub(STUB_PORT);
  server = spawn("npm", ["run", "start", "--", "--port", String(PORT)], {
    cwd: REPO,
    env: {
      ...process.env,
      TURSO_DATABASE_URL: `http://127.0.0.1:${STUB_PORT}`,
      TURSO_AUTH_TOKEN: "qa-stub-token",
      ADMIN_PASSWORD: PASSWORD,
      NEXT_PUBLIC_SITE_URL: "https://genezisi.com",
    },
    stdio: "ignore",
  });
  await waitForServer();

  const login = await fetch(`http://127.0.0.1:${PORT}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: PASSWORD }),
  });
  assert.equal(login.status, 200, "admin login should succeed with the QA password");
  cookie = (login.headers.get("set-cookie") || "").split(";")[0];
  assert.ok(cookie.startsWith("genezisi_admin_session="), "no session cookie");
});

after(() => {
  server?.kill("SIGTERM");
  stub?.close();
});

test("an unauthenticated domain PATCH is rejected", async () => {
  const saved = cookie;
  cookie = "";
  const res = await rawJson("PATCH", "/api/orders/gc-1", { mapHost: "new.example" });
  cookie = saved;
  assert.equal(res.status, 401);
});

test("a host mapped to another card is refused with 409, not silently reassigned", async () => {
  const res = await rawJson("PATCH", "/api/orders/gc-1", { mapHost: "taken.example" });
  assert.equal(res.status, 409, res.text);
  assert.match(res.json.error, /already mapped/i);
});

test("re-saving a host the same card already owns succeeds", async () => {
  const res = await rawJson("PATCH", "/api/orders/gc-1", { mapHost: "own.example" });
  assert.equal(res.status, 200, res.text);
  assert.equal(res.json.ok, true);
});

test("a fresh host can be mapped", async () => {
  const res = await rawJson("PATCH", "/api/orders/gc-1", { mapHost: "new.example" });
  assert.equal(res.status, 200, res.text);
});
