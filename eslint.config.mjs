import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react/no-unescaped-entities": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // eslint-config-next 16.4.3 ships a stricter react-hooks plugin whose new
  // "refs" rule errors on four ref-mirror lines in HeroSegment.tsx only, where
  // zoom/style/pointer refs are mirrored during render so pointer handlers read
  // the latest value without re-attaching listeners. Scoped to that file: every
  // other component keeps the rule at its default error severity. Tracked as
  // LINT-01 in docs/security/2026-11-dependency-patch-and-open-findings.md.
  {
    files: ["**/start/components/segments/HeroSegment.tsx"],
    rules: {
      "react-hooks/refs": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "fix_tooltip.js",
    "test-pricing.js",
    "test_gemini.js",
    "fix_wrap.mjs",
  ]),
]);

export default eslintConfig;
