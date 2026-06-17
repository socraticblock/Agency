import type { MetadataRoute } from "next";
import { defaultLocale } from "@/lib/i18n";

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(
    /\/$/,
    ""
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const root = siteBase();

  const localized = [
    { path: "", priority: 1 },
    { path: "/websites", priority: 0.9 },
    { path: "/booking-websites", priority: 0.85 },
    { path: "/service-websites", priority: 0.85 },
    { path: "/online-stores", priority: 0.85 },
    { path: "/work", priority: 0.85 },
    { path: "/apply", priority: 0.9 },
    { path: "/pricing", priority: 0.95 },
    { path: "/pricing/professional", priority: 0.85 },
    { path: "/pricing/command-center", priority: 0.85 },
    { path: "/pricing/e-commerce", priority: 0.85 },
    { path: "/stop-renting", priority: 0.85 },
    { path: "/start", priority: 0.9 },
  ].map(({ path, priority }) => ({
    url: `${root}/${defaultLocale}${path}`,
    changeFrequency: "weekly" as const,
    priority,
  }));

  const global = ["/onboarding", "/onboarding-brief", "/success"].map(
    (path, i) => ({
      url: `${root}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.5 - i * 0.05,
    })
  );

  return [...localized, ...global];
}
