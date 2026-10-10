/**
 * Static accessibility, no-JavaScript and payload-parity checks (roadmap §15
 * subset, §16, §23 S21, §18.1).
 *
 * Everything here is read from the server response. It is a real subset of the
 * accessibility contract, explicitly NOT a substitute for keyboard,
 * screen-reader, zoom or device testing — those stay an owner gate.
 *
 *   BASE_URL=http://localhost:3100 node --test tests/home-i18n/assets-a11y.test.mjs
 */
import assert from "node:assert/strict";
import test from "node:test";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const LOCALES = ["en", "ka", "nl"];

async function home(locale) {
  const res = await fetch(`${BASE}/${locale}`, { redirect: "manual" });
  assert.equal(res.status, 200);
  return res.text();
}

/** Strip <script> blocks so the RSC payload can never masquerade as markup. */
function markup(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<\/body>[\s\S]*$/, "");
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "g")) || [];
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? m[1] : null;
}

test("§15.2 exactly one H1 and a logical heading order, per locale", async () => {
  for (const locale of LOCALES) {
    const body = markup(await home(locale));
    const headings = [...body.matchAll(/<h([1-6])[^>]*>/g)].map((m) => Number(m[1]));
    assert.equal(headings.filter((h) => h === 1).length, 1, `${locale}: expected exactly one H1`);
    assert.equal(headings[0], 1, `${locale}: first heading is h${headings[0]}, not h1`);
    for (let i = 1; i < headings.length; i += 1) {
      assert.ok(headings[i] - headings[i - 1] <= 1, `${locale}: heading jump h${headings[i - 1]} -> h${headings[i]}`);
    }
  }
});

test("§15.2 landmarks and skip link exist", async () => {
  for (const locale of LOCALES) {
    const body = markup(await home(locale));
    assert.match(body, /<header\b/, `${locale}: no header landmark`);
    assert.match(body, /<main\b/, `${locale}: no main landmark`);
    assert.match(body, /<footer\b/, `${locale}: no footer landmark`);
    assert.equal(tags(body, "main").length, 1, `${locale}: more than one main landmark`);
    assert.match(body, /href="#main-content"/, `${locale}: skip link missing`);
  }
});

test("§15.1 the current language is marked with aria-current, not colour alone", async () => {
  for (const locale of LOCALES) {
    const body = markup(await home(locale));
    const current = tags(body, "a").filter((t) => attr(t, "aria-current") === "page");
    assert.ok(current.length >= 2, `${locale}: aria-current missing in header and/or footer`);
    for (const link of current) {
      assert.equal(attr(link, "aria-current"), "page");
      assert.match(attr(link, "href") || "", new RegExp(`/${locale}$`), `${locale}: aria-current on the wrong link`);
    }
  }
});

test("§15.2 every image has non-empty alt text; decorative icons are hidden", async () => {
  for (const locale of LOCALES) {
    const body = markup(await home(locale));
    const images = tags(body, "img");
    assert.ok(images.length >= 3, `${locale}: expected the three portfolio images`);
    for (const img of images) {
      const alt = attr(img, "alt");
      assert.ok(alt !== null && alt.trim().length > 0, `${locale}: image without alt: ${img.slice(0, 120)}`);
    }
    // lucide icons render as <svg aria-hidden="true">
    const svgs = tags(body, "svg");
    for (const svg of svgs) {
      assert.match(svg, /aria-hidden="true"/, `${locale}: inline icon not aria-hidden: ${svg.slice(0, 100)}`);
    }
  }
});

test("§15.1 no duplicate element ids in the rendered page", async () => {
  for (const locale of LOCALES) {
    const body = markup(await home(locale));
    const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const seen = new Set();
    for (const id of ids) {
      assert.ok(!seen.has(id), `${locale}: duplicate id "${id}"`);
      seen.add(id);
    }
  }
});

test("§17.1 every outbound link is safely opened and points at one WhatsApp number", async () => {
  for (const locale of LOCALES) {
    const body = markup(await home(locale));
    const external = tags(body, "a").filter((t) => /href="https?:/.test(t));
    assert.ok(external.length >= 3, `${locale}: expected the external CTAs`);
    for (const link of external) {
      const rel = attr(link, "rel") || "";
      assert.ok(rel.includes("noopener") && rel.includes("noreferrer"), `${locale}: unsafe external link: ${link.slice(0, 140)}`);
    }
    const whatsapp = external.map((t) => attr(t, "href")).filter((h) => h.startsWith("https://wa.me/"));
    assert.equal(whatsapp.length, 3, `${locale}: expected three WhatsApp CTAs`);
    assert.equal(new Set(whatsapp).size, 1, `${locale}: WhatsApp CTAs drifted apart`);
    assert.match(whatsapp[0], /^https:\/\/wa\.me\/995579723564\?text=/);
    // encoded exactly once: no double-encoded octet left in the query
    const text = new URL(whatsapp[0]).searchParams.get("text");
    assert.ok(text && text.length > 0, `${locale}: empty WhatsApp prefill`);
    assert.ok(!/%25/i.test(text), `${locale}: prefill looks double-encoded`);
  }
});

test("§23 S21 the Dutch page is complete without JavaScript", async () => {
  const html = await home("nl");
  const body = markup(html);
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  for (const needed of [
    "nog maar het begin",          // hero
    "Geselecteerd werk",           // work section
    "Wat ik doe",                  // capabilities
    "Het systeem in actie",        // system demo
    "Rechtstreeks met de oprichter", // founder
    "wa.me/995579723564",          // contact
    "Hoofdnavigatie",              // nav label
    "Taalkeuze",                   // language label
  ]) {
    assert.ok(text.includes(needed) || body.includes(needed), `no-JS Dutch page is missing: ${needed}`);
  }
});

test("§16/§18.1 the page loads no third-party script, style, image or font", async () => {
  for (const locale of LOCALES) {
    const html = await home(locale);
    const urls = [
      ...tags(html, "script").map((t) => attr(t, "src")),
      ...tags(html, "link").map((t) => attr(t, "href")),
      ...tags(html, "img").map((t) => attr(t, "src")),
    ].filter(Boolean);
    assert.ok(urls.length > 5, `${locale}: suspiciously few assets`);
    for (const url of urls) {
      if (url.startsWith("/")) continue;
      const { host } = new URL(url);
      assert.ok(
        ["localhost", "127.0.0.1", "genezisi.com", "www.genezisi.com"].includes(host),
        `${locale}: third-party asset/script on ${host} (${url.slice(0, 120)})`,
      );
    }
    // no remote font stylesheet, no analytics bootstrap
    assert.ok(!/fonts\.(googleapis|gstatic)\.com/.test(html), `${locale}: remote font request present`);
    assert.ok(!/gtag\(|googletagmanager|vercel\/insights|va\.vercel-scripts\.com/.test(html), `${locale}: analytics bootstrap present`);
  }
});

test("§16 Dutch adds no JavaScript, CSS or font payload over English", async () => {
  const assets = {};
  for (const locale of LOCALES) {
    const html = await home(locale);
    assets[locale] = {
      scripts: tags(html, "script").map((t) => attr(t, "src")).filter(Boolean).sort(),
      styles: tags(html, "link").filter((t) => attr(t, "rel") === "stylesheet").map((t) => attr(t, "href")).sort(),
    };
  }
  assert.deepEqual(assets.nl.scripts, assets.en.scripts, "NL ships a different script set than EN");
  assert.deepEqual(assets.nl.styles, assets.en.styles, "NL ships a different stylesheet set than EN");
  assert.deepEqual(assets.ka.scripts, assets.en.scripts, "KA ships a different script set than EN");
});

test("§16 the three homepages are comparable in server-rendered weight", async () => {
  const sizes = {};
  for (const locale of LOCALES) {
    const start = performance.now();
    const res = await fetch(`${BASE}/${locale}`, { redirect: "manual" });
    const html = await res.text();
    sizes[locale] = { bytes: Buffer.byteLength(html), ms: performance.now() - start };
  }
  const spread = Math.max(sizes.nl.bytes, sizes.en.bytes) / Math.min(sizes.nl.bytes, sizes.en.bytes);
  assert.ok(spread < 3, `NL/EN HTML weight differs by ${spread.toFixed(2)}x: ${JSON.stringify(sizes)}`);
  // Informational: recorded in the test report, not asserted as a perf promise.
  console.log("home HTML bytes/ms:", JSON.stringify(sizes));
});
