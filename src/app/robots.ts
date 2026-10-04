import type { MetadataRoute } from "next";

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(
    /\/$/,
    ""
  );
}

export default function robots(): MetadataRoute.Robots {
  const base = siteBase();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/en/v2-prototype", "/ka/v2-prototype"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
