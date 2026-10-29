import type { MetadataRoute } from "next";

/**
 * Two different questions were being answered by one blanket rule.
 *
 * SEARCH and USER-FETCH agents decide whether a page can be found and cited in an
 * answer. They are allowed, because being citable is the point of publishing.
 * TRAINING agents decide whether text may be used to build future model weights.
 * That is a separate decision, it has no effect on whether this site appears in
 * current search answers, and it is declined here.
 *
 * Google-Extended is ALLOWED on purpose. Google documents it as controlling Gemini
 * training AND grounding; declining it would remove the site from Gemini answers.
 * It does not affect Google Search inclusion or ranking either way.
 *
 * `/api/` stays disallowed for every agent: it is not content.
 */
const SEARCH_AND_FETCH_AGENTS = [
  "Googlebot",
  "Google-Extended",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
];

const TRAINING_ONLY_AGENTS = [
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "meta-externalagent",
  "Applebot-Extended",
];

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(
    /\/$/,
    ""
  );
}

export default function robots(): MetadataRoute.Robots {
  const base = siteBase();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...SEARCH_AND_FETCH_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
      ...TRAINING_ONLY_AGENTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
