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
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
