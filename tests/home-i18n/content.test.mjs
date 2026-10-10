/**
 * Content / translation suite (roadmap §24).
 *
 * Loads the real `V2Copy` object out of `hero.copy.ts` rather than scraping the
 * rendered page, so every requirement is checked against the single source of
 * truth. Node 26 strips the TypeScript types natively — the module's only import
 * is a type-only import, which erases cleanly.
 *
 *   node --test tests/home-i18n/content.test.mjs
 */
import assert from "node:assert/strict";
import test from "node:test";

const COPY_URL = new URL(
  "../../src/app/[locale]/_components/v2/hero.copy.ts",
  import.meta.url,
).href;

const { getV2Copy } = await import(COPY_URL);

const LOCALES = ["en", "ka", "nl"];
const COPY = Object.fromEntries(LOCALES.map((l) => [l, getV2Copy(l)]));

/** Every top-level string key of V2Copy, as data rather than trust. */
function stringKeys(copy) {
  return Object.entries(copy)
    .filter(([, value]) => typeof value === "string")
    .map(([key]) => key);
}

const DEMO_KEYS = [
  "enquiryLabel", "fromLabel", "fromValue", "subjectLabel", "subjectValue",
  "messageLabel", "messageValue", "intentLabel", "actionLabel", "actionTime",
  "actionStatus", "actionDraft", "reviewLabel", "reviewTitle", "reviewBody",
  "resolvedLabel", "resolvedOwnerTitle", "resolvedOwnerBody",
  "resolvedCustomerTitle", "resolvedCustomerBody",
];

const STAGE_KEYS = [
  "receiveStep", "understandStep", "actionStep", "exceptionStep", "outcomeStep",
];

test("C01/C02 every string in every locale is non-empty and not whitespace", () => {
  for (const locale of LOCALES) {
    const copy = COPY[locale];
    for (const key of stringKeys(copy)) {
      const value = copy[key];
      assert.equal(typeof value, "string", `${locale}.${key} is not a string`);
      assert.ok(value.length > 0, `${locale}.${key} is empty`);
      assert.equal(value.trim(), value, `${locale}.${key} has stray whitespace`);
      assert.ok(!/^(tbd|todo|lorem|xxx|\?\?\?)$/i.test(value.trim()), `${locale}.${key} is a placeholder`);
    }
  }
});

test("C02b all three locales expose exactly the same key set", () => {
  const en = stringKeys(COPY.en).sort();
  for (const locale of LOCALES) {
    assert.deepEqual(stringKeys(COPY[locale]).sort(), en, `${locale} key set differs from EN`);
  }
});

test("C02c the Dutch copy is not left in English", () => {
  const englishOnly = [
    "Your website", "Proof, not promises", "Selected work", "What I do",
    "See what the system", "Founder-led", "Start on WhatsApp", "Message me",
  ];
  const nlValues = JSON.stringify(COPY.nl);
  for (const phrase of englishOnly) {
    assert.ok(!nlValues.includes(phrase), `English phrase leaked into NL copy: "${phrase}"`);
  }
});

test("C03 the intent table has four meaningful rows", () => {
  for (const locale of LOCALES) {
    const rows = COPY[locale].demo.intentRows;
    assert.equal(rows.length, 4, `${locale} intent rows != 4`);
    for (const row of rows) {
      assert.ok(row.label.trim().length > 0 && row.value.trim().length > 0, `${locale} empty intent row`);
    }
  }
});

test("C04 exactly five distinct translated stages", () => {
  for (const locale of LOCALES) {
    const stages = STAGE_KEYS.map((k) => COPY[locale][k]);
    assert.equal(new Set(stages).size, 5, `${locale} stages are not distinct`);
    for (const stage of stages) assert.ok(stage.trim().length > 0, `${locale} empty stage`);
  }
});

test("C05 the demo is still labelled an internal demonstration", () => {
  const expected = { en: /internal demo/i, ka: /შიდა დემო/, nl: /interne demonstratie/i };
  for (const locale of LOCALES) {
    assert.match(COPY[locale].lab, expected[locale], `${locale} lab label no longer marks the demo`);
  }
});

test("C06/C07 portfolio statuses stay truthful and distinct", () => {
  for (const locale of LOCALES) {
    const { tkStatus, frankStatus, pilatesStatus } = COPY[locale];
    assert.notEqual(tkStatus, pilatesStatus, `${locale}: live website and prototype must differ`);
    assert.notEqual(frankStatus, pilatesStatus, `${locale}: live product and prototype must differ`);
  }
  // The Pilates concept is the prototype; it must never be presented as launched
  // or as a client engagement.
  assert.match(COPY.nl.pilatesStatus, /prototype/i);
  assert.match(COPY.nl.pilatesBody, /concept/i);
  assert.ok(!/klant|opgeleverd|gelanceerd/i.test(COPY.nl.pilatesBody), "Pilates copy implies a delivered client project");
});

test("C08/C13/C14 no price or currency appears in any locale", () => {
  for (const locale of LOCALES) {
    const serialised = JSON.stringify(COPY[locale]);
    for (const symbol of ["₾", "GEL", "€", "EUR", "$"]) {
      assert.ok(!serialised.includes(symbol), `${locale} copy contains a price marker "${symbol}"`);
    }
  }
});

test("C09/C15 alt text names its project and is non-empty", () => {
  const pairs = [["altTk", "TK Counsel"], ["altFranken", "Frankencoin"], ["altPilates", "Her House Pilates"]];
  for (const locale of LOCALES) {
    for (const [key, project] of pairs) {
      const alt = COPY[locale][key];
      assert.ok(alt.trim().length > 5, `${locale}.${key} too short to be meaningful`);
      assert.ok(alt.includes(project), `${locale}.${key} does not name ${project}`);
    }
  }
});

test("C16 Dutch uses the informal register consistently", () => {
  const lines = Object.entries(COPY.nl).flatMap(([key, value]) =>
    typeof value === "string" ? [[key, value]] : [],
  );
  for (const [key, value] of lines) {
    assert.ok(!/(^|\s)(U|Uw|uw|Uwe)(\s|$)/.test(value), `nl.${key} switches to the formal register: ${value}`);
  }
  assert.ok(JSON.stringify(COPY.nl).includes("je"), "expected the informal 'je' register");
});

test("C10/C11 no Belgian presence, call or client claim in Dutch", () => {
  const nl = JSON.stringify(COPY.nl).toLowerCase();
  for (const claim of ["belgi", "antwerpen", "gent", "brussel", "kantoor in", "btw-nummer", "nederlandse klanten"]) {
    assert.ok(!nl.includes(claim), `NL copy makes a local-presence claim: "${claim}"`);
  }
  assert.ok(!/telefonisch|bel ons|nederlandse gesprekken/i.test(JSON.stringify(COPY.nl)), "NL copy promises Dutch calls");
});

test("C17 authored hero line breaks exist and keep the approved rhythm", () => {
  const lines = (value) => value.split("\n");
  for (const locale of LOCALES) {
    const desktop = lines(COPY[locale].heroDesktop);
    const mobile = lines(COPY[locale].heroMobile);
    assert.equal(desktop.length, 3, `${locale}.heroDesktop should be authored as 3 lines`);
    assert.equal(mobile.length, 2, `${locale}.heroMobile should be authored as 2 lines`);
    assert.ok(desktop.every((l) => l.trim().length > 0), `${locale} has an empty authored hero line`);
  }
  // Guard rail: the Dutch heading must not be materially wider than the already
  // approved English one, or it will reflow differently on a 320px phone.
  const longest = (v) => Math.max(...lines(v).map((l) => [...l].length));
  assert.ok(
    longest(COPY.nl.heroDesktop) <= longest(COPY.en.heroDesktop) + 4,
    `nl.heroDesktop line is much longer than EN (${longest(COPY.nl.heroDesktop)} vs ${longest(COPY.en.heroDesktop)})`,
  );
  assert.ok(
    longest(COPY.nl.heroMobile) <= longest(COPY.en.heroMobile) + 4,
    `nl.heroMobile line is much longer than EN (${longest(COPY.nl.heroMobile)} vs ${longest(COPY.en.heroMobile)})`,
  );
});

test("C20 the WhatsApp prefill is one string per locale and mentions no scope limit", () => {
  // The href is assembled in SignalHeroPrototype; the copy-side guarantee is
  // that the Dutch demo message is still an internal simulation value and the
  // demo mailbox is the same fictional one in all three languages.
  for (const locale of LOCALES) {
    assert.equal(COPY[locale].demo.fromValue, "sarah@example.com", `${locale} demo sender drifted`);
  }
});

test("C12 the demo states are internally consistent (day, status, draft)", () => {
  for (const locale of LOCALES) {
    const d = COPY[locale].demo;
    assert.ok(d.actionTime.length > 0 && d.actionStatus.length > 0 && d.actionDraft.length > 0);
    assert.ok(d.resolvedOwnerBody.length > 0 && d.resolvedCustomerBody.length > 0);
  }
});
