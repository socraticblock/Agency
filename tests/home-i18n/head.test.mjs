/**
 * Rendered-head assertions for the three homepages.
 *
 * Reads only real `<link>`/`<meta>`/`<script type="application/ld+json">` tags
 * from the server response — never a substring of the RSC payload, which would
 * happily match a URL that is not actually a tag.
 *
 *   BASE_URL=http://localhost:3100 node --test tests/home-i18n/head.test.mjs
 */
import assert from "node:assert/strict";
import test from "node:test";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const ORIGIN = "https://genezisi.com";

const EXPECTED_ALTERNATES = {
  en: `${ORIGIN}/en`,
  "ka-GE": `${ORIGIN}/ka`,
  "nl-BE": `${ORIGIN}/nl`,
  "x-default": `${ORIGIN}/en`,
};

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "g")) || [];
}

function attrs(tag) {
  const out = {};
  // HTML attribute names are ASCII case-insensitive, and Next's metadata
  // renderer emits `hrefLang` on alternate links; a parser sees `hreflang`.
  for (const m of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) out[m[1].toLowerCase()] = m[2];
  return out;
}

function links(html, rel) {
  return tags(html, "link")
    .map(attrs)
    .filter((a) => a.rel === rel);
}

function metas(html, property) {
  return tags(html, "meta")
    .map(attrs)
    .filter((a) => a.property === property || a.name === property);
}

async function home(locale) {
  const res = await fetch(`${BASE}/${locale}`, { redirect: "manual" });
  assert.equal(res.status, 200, `/${locale} did not return 200`);
  return res.text();
}

for (const locale of ["en", "ka", "nl"]) {
  test(`${locale}: exactly one self-canonical`, async () => {
    const html = await home(locale);
    const canonical = links(html, "canonical");
    assert.equal(canonical.length, 1, `expected 1 canonical, got ${canonical.length}`);
    assert.equal(canonical[0].href, `${ORIGIN}/${locale}`);
  });

  test(`${locale}: one complete reciprocal alternate cluster`, async () => {
    const html = await home(locale);
    const alternates = links(html, "alternate").filter((a) => a.hreflang);
    assert.equal(alternates.length, 4, `expected 4 hreflang links, got ${alternates.length}`);
    for (const [tag, href] of Object.entries(EXPECTED_ALTERNATES)) {
      const found = alternates.filter((a) => a.hreflang === tag);
      assert.equal(found.length, 1, `hreflang ${tag} appears ${found.length}x`);
      assert.equal(found[0].href, href, `hreflang ${tag} points at ${found[0].href}`);
    }
  });

  test(`${locale}: og/twitter metadata is localised and complete`, async () => {
    const html = await home(locale);
    const ogLocale = metas(html, "og:locale");
    assert.equal(ogLocale.length, 1);
    const expectedOgLocale = { en: "en_US", ka: "ka_GE", nl: "nl_BE" }[locale];
    assert.equal(ogLocale[0].content, expectedOgLocale);

    const ogUrl = metas(html, "og:url");
    assert.equal(ogUrl.length, 1);
    assert.equal(ogUrl[0].content, `${ORIGIN}/${locale}`);

    const ogImage = metas(html, "og:image");
    assert.ok(ogImage.length >= 1, "og:image missing");
    for (const image of ogImage) {
      assert.match(image.content, /^https:\/\/genezisi\.com\/api\/og\?/);
    }

    const title = metas(html, "og:title");
    assert.equal(title.length, 1);
    assert.ok(title[0].content.length > 0);
  });

  test(`${locale}: exactly one JSON-LD graph, no invented Belgian presence`, async () => {
    const html = await home(locale);
    const scripts = [
      ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    ];
    assert.equal(scripts.length, 1, `expected 1 JSON-LD script, got ${scripts.length}`);
    const data = JSON.parse(scripts[0][1]);
    assert.equal(data["@type"], "Organization");
    assert.equal(data.address.addressCountry, "GE");
    const serialised = JSON.stringify(data).toLowerCase();
    assert.ok(!serialised.includes("belgi"), "Belgian location claim in structured data");
    assert.ok(!serialised.includes("be\"") || !serialised.includes("addresscountry\":\"be"));
  });

  test(`${locale}: content language is declared`, async () => {
    const html = await home(locale);
    const expected = { en: "en", ka: "ka-GE", nl: "nl-BE" }[locale];
    assert.match(html, new RegExp(`lang="${expected}"`), `lang="${expected}" missing`);
  });
}

test("OG image URL for /nl actually renders a PNG", async () => {
  const html = await home("nl");
  const url = metas(html, "og:image")[0].content;
  const res = await fetch(url, { redirect: "manual" });
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") || "", /^image\//);
  const bytes = new Uint8Array(await res.arrayBuffer());
  assert.ok(bytes.length > 1000, "OG image suspiciously small");
  // PNG magic number
  assert.deepEqual([...bytes.slice(0, 4)], [0x89, 0x50, 0x4e, 0x47]);
});

test("Dutch home does not carry the English share-card sentence", async () => {
  const html = await home("nl");
  const image = metas(html, "og:image")[0].content;
  assert.ok(!decodeURIComponent(image).includes("Your website is only the beginning"));
});
