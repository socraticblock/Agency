/**
 * Safe, dependency-free repository hygiene checks.
 * Run from the repository root: node --test tests/repository-cleanup.test.mjs
 * These checks do not replace typecheck, build, browser or deployed-site QA.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = (name) => readFileSync(path.join(root, name), "utf8");
const exists = (name) => existsSync(path.join(root, name));

test("one authoritative future homepage and preserved real app entry", () => {
  assert.ok(exists("AGENTS.md"));
  assert.ok(exists("docs/infinite-website/NORTH_STAR_v1.2.md"));
  assert.ok(exists("docs/infinite-website/VISITOR_FLOW_v1.2.md"));
  assert.ok(exists("docs/infinite-website/ACCEPTANCE_GATES_v1.2.md"));
  assert.ok(exists("docs/infinite-website/archive/NORTH_STAR_v1.1_2026-10-29.md"));
  assert.ok(exists("src/app/[locale]/page.tsx"));
  assert.ok(exists("src/app/[locale]/_components/v2/SelectedWork.tsx"));
  assert.match(file("src/app/[locale]/page.tsx"), /SignalHeroPrototype/);
});

test("digital-card product and localized route boundaries remain available", () => {
  assert.ok(exists("src/app/[locale]/(site)/start/page.tsx"));
  assert.ok(exists("src/app/[locale]/(site)/partner/page.tsx"));
  assert.ok(exists("src/app/[locale]/(site)/c/[slug]/page.tsx"));
  assert.ok(exists("src/lib/home-i18n.ts"));
  assert.ok(exists("middleware.ts"));
});

test("legacy patch is archived without polluting root; one-off repair script gone", () => {
  assert.equal(exists("partner-page.patch"), false);
  assert.equal(exists("fix_wrap.mjs"), false);
  assert.ok(exists("docs/archive/partner-page-2026-04-27.patch"));
  assert.match(file("docs/archive/partner-page-2026-04-27.patch"), /Subject: \[PATCH\]/);
});

test("database diagnostics disabled outside development; no secret fragments in responses", () => {
  const route = file("src/app/api/test-db/route.ts");
  assert.match(route, /process\.env\.NODE_ENV !== "development"/);
  assert.match(route, /status: 404/);
  assert.match(route, /Cache-Control.*no-store/);
  assert.doesNotMatch(route, /tokenPrefix|authToken\.slice|queryError|dbUrl\.replace/);
  assert.match(route, /Intentionally never include response body/);
});

test("homepage design authority is explicit and prototype never called production", () => {
  const guide = file("AGENTS.md");
  assert.match(guide, /Gate 1b/);
  assert.match(guide, /NOT accepted or implemented/);
  assert.match(guide, /No production or integration claims from a static preview/);
  const rootDoc = file("README.md");
  assert.match(rootDoc, /Infinite Website/);
  assert.match(rootDoc, /not the site/);
});
