/**
 * SSRF-01 regression suite for /api/og.
 *
 * Runs against a *served* build (`npm run start`), because the guard lives in
 * the request handler and only a real request proves it:
 *
 *   BASE_URL=http://127.0.0.1:3112 node --test tests/og-safety.test.mjs
 *
 * The remote-image cases use only public, inert URLs. Nothing here probes an
 * internal service, and the point of the timing assertions is that the route
 * never dials out at all — a rejected URL must come back in milliseconds,
 * whereas the pre-fix route held an unroutable host for ~10s.
 */
import assert from "node:assert/strict";
import test from "node:test";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const OG = `${BASE}/api/og`;

/** Parse the dimensions straight out of the PNG IHDR chunk. */
function pngSize(buf) {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < 8; i++) if (buf[i] !== sig[i]) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

async function get(query, init) {
  const started = Date.now();
  const url = query ? `${OG}?${query}` : OG;
  const res = await fetch(url, { redirect: "manual", ...init });
  const type = res.headers.get("content-type") || "";
  const buf = Buffer.from(await res.arrayBuffer());
  return { status: res.status, type, buf, ms: Date.now() - started, headers: res.headers, url };
}

const OK_QUERY = new URLSearchParams({
  type: "home",
  name: "Genezisi",
  title: "Genezisi",
  accent: "#a5f3fc",
  theme: "dark",
  tagline: "Websites, AI systems and automation.",
  subline: "Tbilisi · built to be seen.",
  services: "Websites  ·  AI systems  ·  Automation",
}).toString();

const CARD_QUERY = new URLSearchParams({
  type: "card",
  name: "Ana Test",
  title: "Designer",
  company: "Genezisi",
  accent: "#10b981",
  theme: "dark",
}).toString();

// --- legitimate output is unchanged -----------------------------------------

test("O01 default request returns a 1200x630 PNG", async () => {
  const r = await get("");
  assert.equal(r.status, 200);
  assert.match(r.type, /^image\/png/);
  assert.deepEqual(pngSize(r.buf), { width: 1200, height: 630 });
});

test("O02 the homepage share card still renders at 1200x630", async () => {
  const r = await get(OK_QUERY);
  assert.equal(r.status, 200);
  assert.match(r.type, /^image\/png/);
  assert.deepEqual(pngSize(r.buf), { width: 1200, height: 630 });
});

test("O03 a digital-card share card still renders at 1200x630", async () => {
  const r = await get(CARD_QUERY);
  assert.equal(r.status, 200);
  assert.match(r.type, /^image\/png/);
  assert.deepEqual(pngSize(r.buf), { width: 1200, height: 630 });
});

test("O04 light theme and a lower-case hex accent are accepted", async () => {
  const r = await get("type=pricing&theme=light&accent=%23aabbcc&tier=Pro&price=999");
  assert.equal(r.status, 200);
  assert.deepEqual(pngSize(r.buf), { width: 1200, height: 630 });
});

test("O05 successful renders are cacheable", async () => {
  const r = await get(OK_QUERY);
  assert.equal(r.status, 200);
  assert.match(r.headers.get("cache-control") || "", /s-maxage=\d+/);
});

// --- the SSRF parameter is gone ---------------------------------------------

const PHOTO_CASES = [
  ["https URL", "photo=https%3A%2F%2Fexample.com%2Fx.png"],
  ["http URL", "photo=http%3A%2F%2Fexample.com%2Fx.png"],
  ["file scheme", "photo=file%3A%2F%2F%2Fetc%2Fpasswd"],
  ["protocol-relative", "photo=%2F%2Fevil.example%2Fx.png"],
  ["same-origin path", "photo=%2Fwork-previews%2Ftk-counsel.webp"],
  ["loopback literal", "photo=http%3A%2F%2F127.0.0.1%3A80%2F"],
  ["metadata literal", "photo=http%3A%2F%2F169.254.169.254%2Flatest%2Fmeta-data%2F"],
  ["data URL", "photo=data%3Aimage%2Fpng%3Bbase64%2CAAAA"],
  ["empty value", "photo="],
];

for (const [label, query] of PHOTO_CASES) {
  test(`O06 photo param rejected: ${label}`, async () => {
    const r = await get(`type=card&name=Ana&${query}`);
    assert.equal(r.status, 400, `expected 400 for ${label}, got ${r.status}`);
    assert.match(r.type, /application\/json/);
    assert.ok(!pngSize(r.buf), "must not return an image");
  });
}

test("O07 a redirecting remote URL is rejected, not followed", async () => {
  const r = await get(
    "type=card&name=Ana&photo=" +
      encodeURIComponent("https://httpbin.org/redirect-to?url=https://example.com/x.png")
  );
  assert.equal(r.status, 400);
  assert.ok(r.ms < 2000, `rejection took ${r.ms}ms — it must not fetch`);
});

test("O08 an unroutable host is rejected in milliseconds, not held", async () => {
  // Pre-fix this path held the connection for ~10.3s before dropping it.
  const r = await get("type=card&name=Ana&photo=" + encodeURIComponent("http://192.0.2.1/x.png"));
  assert.equal(r.status, 400);
  assert.ok(r.ms < 2000, `rejection took ${r.ms}ms — it must not dial out`);
});

// --- input bounds ------------------------------------------------------------

test("O09 oversized text is rejected", async () => {
  const r = await get("type=home&tagline=" + "A".repeat(5000));
  assert.equal(r.status, 400);
});

test("O10 a name beyond the bound is rejected", async () => {
  const r = await get("type=card&name=" + "B".repeat(300));
  assert.equal(r.status, 400);
});

test("O11 an oversized query string is rejected", async () => {
  const r = await get("type=home&x=" + "y".repeat(3000));
  assert.equal(r.status, 400);
});

test("O12 text exactly at the bound is still accepted", async () => {
  const r = await get("type=home&tagline=" + "A".repeat(140));
  assert.equal(r.status, 200);
});

// --- enumerated values -------------------------------------------------------

test("O13 unknown type is rejected", async () => {
  assert.equal((await get("type=admin")).status, 400);
});

test("O14 unknown theme is rejected", async () => {
  assert.equal((await get("type=home&theme=neon")).status, 400);
});

test("O15 malformed accent is rejected", async () => {
  for (const bad of ["red", "#fff", "#gggggg", "javascript:alert(1)", "#a5f3fc00"]) {
    const r = await get(`type=home&accent=${encodeURIComponent(bad)}`);
    assert.equal(r.status, 400, `accent ${bad} should be rejected`);
  }
});

// --- failure hygiene ---------------------------------------------------------

test("O16 hostile input never yields a 5xx or an HTML body", async () => {
  const hostile = [
    "type=%00",
    "type=home&name=%3Cscript%3Ealert(1)%3C%2Fscript%3E",
    "type=home&tagline=%E2%80%AE%E2%80%8B",
    "type=blog&title=" + "%F0%9F%92%A9".repeat(40),
    "type=home&accent=%23FFFFFF&theme=DARK",
  ];
  for (const q of hostile) {
    const r = await get(q);
    assert.ok(r.status < 500, `${q} produced ${r.status}`);
    assert.ok(!r.type.includes("text/html"), `${q} produced HTML`);
  }
});

test("O17 an emoji-only and empty name still render a card", async () => {
  assert.equal((await get("type=card&name=%F0%9F%92%A9")).status, 200);
  assert.equal((await get("type=card&name=")).status, 200);
});
