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
 * Note on /games.
 *
 * The landing page is a real route (`src/app/games/page.tsx`) — not a redirect, and not a proxied
 * mount. Each of those alternatives is ruled out by something concrete:
 *
 *   - a redirect puts the game's own hostname in the address bar and throws away the brand, which is
 *     the opposite of what a front door is for;
 *   - a proxied mount cannot work here. `trailingSlash` is false, so Next normalises `/games/` back
 *     to `/games` — measured on the deployed site on 2026-10-03: `/games/` answered `308 -> /games`.
 *     The game resolves its assets relatively (`./assets/...`) and so needs a URL that ends in `/`.
 *     Those two facts are incompatible;
 *   - a rewrite cannot re-point `/` at a landing page, because Vercel gives the filesystem precedence
 *     over rewrites ("the source property should NOT be a file... instead, you should rename your
 *     static file"), and `/` maps to the game's `index.html`.
 *
 * So the game keeps its own origin and bandwidth, and the front door sits on the brand domain.
 * `middleware.ts` bypasses the locale rewrite for this path, or the page below would be unreachable.
 */
const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
