import type { MetadataRoute } from "next";

/**
 * Only indexable, canonical marketing URLs belong in the sitemap.
 * Do not advertise unpublished customer cards, admin/client portals,
 * discontinued card sales, former tier offers or experimental routes.
 */
const siteBase = () => (process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteBase();
  const localizedHomes = ["en", "ka", "nl"].map(locale => ({
    url: `${base}/${locale}`,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.9,
  }));
  const retainedEnglishPages = [
    "/work",
    "/websites",
    "/service-websites",
    "/booking-websites",
    "/online-stores",
    "/pricing",
  ].map(path => ({
    url: `${base}/en${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/pricing" ? 0.85 : 0.7,
  }));
  // The bespoke scoping page is genuinely localized in Georgian.
  return [
    ...localizedHomes,
    ...retainedEnglishPages,
    { url: `${base}/ka/pricing`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
