/**
 * Route matrix for the Belgian-Dutch homepage release.
 *
 * Runs against a *served* build (`npm run start`), because a green `next build`
 * says nothing about status codes, redirect targets or which language actually
 * renders.
 *
 *   BASE_URL=http://localhost:3100 node --test tests/home-i18n/routes.test.mjs
 */
import assert from "node:assert/strict";
import test from "node:test";

const BASE = process.env.BASE_URL || "http://localhost:3100";

const MARKERS = {
  en: "Proof, not promises.",
  ka: "საქმე, არა დაპირებები.",
  nl: "Bewijs, geen beloftes.",
};

async function req(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  const body = res.status === 200 ? await res.text() : "";
  return { status: res.status, location: res.headers.get("location"), body };
}

function locationPath(res) {
  return res.location ? new URL(res.location, BASE).pathname : null;
}

test("R01 / redirects to /en", async () => {
  const res = await req("/");
  assert.equal(res.status, 308);
  assert.equal(locationPath(res), "/en");
});

test("R02 /en renders the English headline", async () => {
  const res = await req("/en");
  assert.equal(res.status, 200);
  assert.ok(res.body.includes(MARKERS.en), "English home copy missing");
});

test("R03 /ka renders Georgian copy", async () => {
  const res = await req("/ka");
  assert.equal(res.status, 200);
  assert.ok(res.body.includes(MARKERS.ka), "Georgian home copy missing");
});

test("R04 /nl renders Dutch copy and no English proof line", async () => {
  const res = await req("/nl");
  assert.equal(res.status, 200);
  assert.ok(res.body.includes(MARKERS.nl), "Dutch home copy missing");
  assert.ok(!res.body.includes(MARKERS.en), "English proof line leaked into /nl");
});

test("R05 /nl/ normalises without a loop", async () => {
  const res = await req("/nl/");
  assert.ok([200, 301, 307, 308].includes(res.status), `unexpected ${res.status}`);
  if (res.status !== 200) assert.equal(locationPath(res), "/nl");
});

test("R06 /nl with query stays 200 and keeps the language", async () => {
  const res = await req("/nl?utm_source=test");
  assert.equal(res.status, 200);
  assert.ok(res.body.includes(MARKERS.nl));
});

for (const path of [
  "/nl/pricing",
  "/nl/pricing/professional",
  "/nl/work",
  "/nl/start",
  "/nl/blog",
  "/nl/websites",
  "/nl/c/example",
]) {
  test(`R07-08 temporary redirect: ${path} -> /en…`, async () => {
    const res = await req(path);
    assert.equal(res.status, 307, `${path} should be a temporary redirect`);
    assert.equal(locationPath(res), `/en${path.slice(3)}`);
  });
}

for (const path of ["/nl/unknown", "/nl/unknown/nested", "/nl/v2-prototype", "/nl/admin"]) {
  test(`R12-14 real 404: ${path}`, async () => {
    const res = await req(path);
    assert.equal(res.status, 404, `${path} must not be an English 200 page`);
    assert.ok(!res.body.includes(MARKERS.en), "English homepage body served under /nl");
  });
}

test("R15 unsupported locale keeps baseline behaviour", async () => {
  const res = await req("/fr");
  assert.equal(res.status, 308);
  assert.equal(locationPath(res), "/en/fr");
});

test("R16-17 legacy locale routes unaffected", async () => {
  for (const path of ["/en/pricing", "/ka/pricing"]) {
    const res = await req(path);
    assert.equal(res.status, 200, `${path} should still render`);
  }
});

test("R18-20 unlocalized public routes unaffected", async () => {
  for (const path of ["/onboarding", "/onboarding-brief", "/success"]) {
    const res = await req(path);
    assert.equal(res.status, 200, `${path} should still render`);
  }
});

test("R21 OG image route still renders an image", async () => {
  const res = await fetch(`${BASE}/api/og?type=home&tagline=Test`, { redirect: "manual" });
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") || "", /^image\//);
});

test("R24 /games keeps its configured redirect", async () => {
  const res = await req("/games");
  assert.ok([307, 308, 301, 302].includes(res.status));
  assert.match(res.location || "", /broken-chapel-prototype\.vercel\.app/);
});

test("R28 no open redirect through the query string", async () => {
  const res = await req("/nl/unknown?next=https://attacker.example");
  assert.equal(res.status, 404);
  assert.equal(res.location, null);
});

test("R29 abnormal encoding does not crash or loop", async () => {
  for (const path of ["/nl%2Fpricing", "/nl/%2e%2e/pricing"]) {
    const res = await req(path);
    assert.ok([200, 307, 308, 404].includes(res.status), `${path} -> ${res.status}`);
  }
});

test("S14-S16 sitemap and robots", async () => {
  const sitemap = await fetch(`${BASE}/sitemap.xml`, { redirect: "manual" });
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.ok(xml.includes("<loc>https://genezisi.com/nl</loc>"), "/nl missing from sitemap");
  for (const forbidden of ["/nl/pricing", "/nl/work", "/nl/start", "/nl/blog"]) {
    assert.ok(!xml.includes(forbidden), `sitemap advertises ${forbidden}`);
  }

  const robots = await fetch(`${BASE}/robots.txt`, { redirect: "manual" });
  assert.equal(robots.status, 200);
  const robotsTxt = await robots.text();
  assert.match(robotsTxt, /Sitemap: https:\/\/genezisi\.com\/sitemap\.xml/);
});
