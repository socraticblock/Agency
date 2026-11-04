import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  ...(process.env.NODE_ENV === "production"
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

/**
 * Where the game lives.
 *
 * A sub-path MOUNT (`/games/*` proxied to the game's deployment) is not possible on this site
 * without deeper surgery, and the reasons are worth recording so nobody re-attempts it:
 *
 *   1. `middleware.ts` redirects any path without a known locale prefix to `/{locale}{path}`, so
 *      `/games` becomes `/en/games` before a rewrite can see it;
 *   2. `trailingSlash` is false, so Next normalises `/games/` back to `/games`;
 *   3. the game resolves its assets relatively (`./assets/...`), because it is also served at the
 *      root of its own deployment. At a URL of `/games`, those resolve to `/assets/...`, which this
 *      site does not own. A mount therefore needs the URL to end in `/`, which (2) forbids.
 *
 * A redirect has none of those problems: the game runs at its own origin, where its relative paths
 * are correct and its crawler rules and manifest apply natively.
 *
 * A subdomain (`games.genezisi.com` pointed at the game's own project) is the better end state when
 * the official name is chosen: same brand, separate origin, separate bandwidth, no redirect in the
 * address bar.
 */
const GAME_URL = "https://broken-chapel-prototype.vercel.app";

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // `redirects()` is resolved BEFORE middleware, which is what keeps the locale redirect from
  // rewriting these paths out from under us.
  async redirects() {
    return [
      { source: "/games", destination: GAME_URL, permanent: false },
      { source: "/games/:path*", destination: `${GAME_URL}/:path*`, permanent: false },

      /*
       * Business reset (2026-11-04): the fixed-price tiers and the audit
       * application funnel are retired in favour of bespoke project scoping.
       *
       * These live in `redirects()` rather than `permanentRedirect()` inside the
       * page components, because those components render inside the root layout,
       * which reads `headers()`. That makes the response streamed, so Next cannot
       * set a 308 status line any more and falls back to a 200 + <meta refresh>.
       * A meta refresh is not a real redirect for crawlers, so the status must be
       * decided here, before any rendering happens.
       */
      {
        source: "/:locale(en|ka)/pricing/professional",
        destination: "/:locale/pricing",
        permanent: true,
      },
      {
        source: "/:locale(en|ka)/pricing/command-center",
        destination: "/:locale/pricing",
        permanent: true,
      },
      {
        source: "/:locale(en|ka)/pricing/e-commerce",
        destination: "/:locale/pricing",
        permanent: true,
      },
      {
        source: "/:locale(en|ka)/apply",
        destination: "/:locale/pricing",
        permanent: true,
      },

      /*
       * The journal is English-only. `/ka` is a first-class locale, so the
       * retirement of Georgian journal URLs is permanent (308). `/nl` is
       * homepage-only and every `/nl/*` path falls through to middleware's
       * temporary 307 -> `/en/*` rule, which stays as it is.
       */
      {
        source: "/ka/blog",
        destination: "/en/blog",
        permanent: true,
      },
      {
        source: "/ka/blog/:slug",
        destination: "/en/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
