/**
 * Genezisi business-reset release checks.
 * Requires a LOCAL served production build (do not point at customer production):
 *
 *   npm ci
 *   npm run build
 *   npm run start -- -p 3100
 *   BASE_URL=http://127.0.0.1:3100 node --test tests/business-reset-routes.test.mjs
 *
 * This suite is not a substitute for customer-data fixtures or visual QA.
 */
import assert from "node:assert/strict";
import test from "node:test";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3100";
if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(BASE)) {
  throw new Error("Business-reset tests must run against local build, not production.");
}

async function response(path, options = {}) {
  return fetch(BASE + path, { redirect: "manual", ...options });
}

function destination(res) {
  const location = res.headers.get("location");
  return location ? new URL(location, BASE).pathname : null;
}
async function headHtml(path) {
  // Ask Next.js for crawler-compatible in-head metadata (no streaming-to-body).
  const res = await response(path, { headers: { "User-Agent": "facebookexternalhit/1.1" } });
  assert.equal(res.status, 200, path);
  const html = await res.text();
  return {
    html,
    head: html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "",
  };
}

test("EN/KA/NL home routes remain available", async () => {
  for (const locale of ["en", "ka", "nl"]) {
    const res = await response("/" + locale);
    assert.equal(res.status, 200, locale);
  }
});

test("Bespoke project pages replace tier price menu and self-canonicalize", async () => {
  const en = await headHtml("/en/pricing");
  assert.match(en.html, /Every project has its own shape\./);
  assert.match(en.head, /rel="canonical" href="https:\/\/genezisi\.com\/en\/pricing"/);
  // React serialises the attribute as `hrefLang`; HTML attribute names are
  // case-insensitive, so crawlers read it as `hreflang`. Match case-insensitively
  // instead of pinning React's casing.
  assert.match(en.head, /hreflang="ka-GE"/i);
  const ka = await headHtml("/ka/pricing");
  assert.match(ka.html, /ყოველი პროექტი განსხვავებულია|ყოველი პროექტი განსხვავებულია\./i);
  assert.match(ka.head, /rel="canonical" href="https:\/\/genezisi\.com\/ka\/pricing"/);
});

test("Old package tiers redirect to the relevant bespoke page", async () => {
  for (const tier of ["professional", "command-center", "e-commerce"]) {
    for (const locale of ["en", "ka"]) {
      const res = await response(`/${locale}/pricing/${tier}`);
      assert.equal(res.status, 308, `${locale}/${tier}`);
      assert.equal(destination(res), `/${locale}/pricing`);
    }
  }
});

test("Old digital-audit application redirects to bespoke scoping", async () => {
  for (const locale of ["en", "ka"]) {
    const res = await response(`/${locale}/apply`);
    assert.equal(res.status, 308);
    assert.equal(destination(res), `/${locale}/pricing`);
  }
});

test("Discontinued card sales are closed across UI and API", async () => {
  const page = await headHtml("/en/start");
  assert.match(page.html, /Digital card ordering is closed\./);
  assert.match(page.head, /name="robots"[^>]*noindex/);
  const order = await response("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: "gc-test", tier: "subdomain", state: { name: "Test" } }),
  });
  assert.equal(order.status, 410);
  assert.equal(order.headers.get("cache-control"), "no-store");
  const read = await response("/api/orders");
  assert.equal(read.status, 401, "admin list must still reject unauthenticated users");
});

test("Outdated partner and editorial claims are no longer marketed", async () => {
  const partner = await headHtml("/en/partner");
  assert.match(partner.head, /name="robots"[^>]*noindex/);
  assert.doesNotMatch(partner.html, /30% on every sale/);
  const blog = await headHtml("/en/blog");
  assert.ok(blog.head.includes('rel="canonical" href="https://genezisi.com/en/blog"'));
  assert.match(blog.html, /Custom Website vs Website Builder/);
  assert.doesNotMatch(blog.html, /Transparent website and e-commerce packages/);
  const oldGuide = await headHtml("/en/stop-renting");
  assert.match(oldGuide.head, /name="robots"[^>]*noindex/);
});

test("International articles and rewritten regional URLs remain available", async () => {
  for (const slug of [
    "custom-website-vs-website-builder",
    "ai-automation-small-business-where-to-start",
    "website-redesign-checklist-before-hiring",
    "website-cost-georgia-2026",
    "digital-business-card-vs-paper",
    "facebook-page-costing-customers-georgia",
    "georgian-businesses-invisible-online",
  ]) {
    const { head, html } = await headHtml(`/en/blog/${slug}`);
    assert.match(head, new RegExp(`rel="canonical" href="https://genezisi\\.com/en/blog/${slug}"`));
    assert.ok(html.includes("Genezisi Journal"));
  }
  const nonEnglish = await response("/ka/blog");
  assert.equal(nonEnglish.status, 308);
  assert.equal(destination(nonEnglish), "/en/blog");
  const article = await response("/ka/blog/digital-business-card-vs-paper");
  assert.equal(article.status, 308);
  assert.equal(destination(article), "/en/blog/digital-business-card-vs-paper");
});

test("Legacy service pages have correct English canonical, not homepage canonical", async () => {
  for (const page of ["websites", "service-websites", "booking-websites", "online-stores", "work"]) {
    const { head } = await headHtml("/en/" + page);
    assert.match(head, new RegExp(`rel="canonical" href="https://genezisi\\.com/en/${page}"`));
    assert.doesNotMatch(head, /hreflang="ka-GE"[^>]*href="https:\/\/genezisi\.com\/ka"/i);
  }
  const ka = await headHtml("/ka/websites");
  assert.match(ka.head, /rel="canonical" href="https:\/\/genezisi\.com\/en\/websites"/);
});

test("Sitemap lists retained indexable canonical pages only", async () => {
  const res = await response("/sitemap.xml");
  assert.equal(res.status, 200);
  const xml = await res.text();
  for (const path of ["/en", "/ka", "/nl", "/en/pricing", "/ka/pricing", "/en/websites", "/en/work", "/en/blog", "/en/blog/custom-website-vs-website-builder", "/en/blog/digital-business-card-vs-paper"]) {
    assert.ok(xml.includes(`<loc>https://genezisi.com${path}</loc>`), path + " missing");
  }
  for (const retired of ["/en/start", "/en/partner", "/en/pricing/professional", "/en/pricing/command-center", "/en/pricing/e-commerce", "/onboarding"]) {
    assert.ok(!xml.includes(retired), retired + " must not be advertised");
  }
});

test("Site index no longer advertises fixed-price offers", async () => {
  const res = await response("/llms.txt");
  assert.equal(res.status, 200);
  const body = await res.text();
  assert.match(body, /bespoke websites/i);
  assert.doesNotMatch(body, /from 999 GEL|from 150|pricing\/professional|pricing\/command-center|\/en\/start/i);
});

test("Client utility pages discourage search indexing", async () => {
  for (const path of ["/onboarding", "/onboarding-brief", "/success"]) {
    const { head } = await headHtml(path);
    assert.match(head, /name="robots"[^>]*noindex/);
  }
});
