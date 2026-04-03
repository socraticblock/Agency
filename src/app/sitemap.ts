import type { MetadataRoute } from "next";
import { defaultLocale } from "@/lib/i18n";

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    ""
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const root = siteBase();
  const now = new Date();

  const localized = [
    { path: "", priority: 1 },
    { path: "/apply", priority: 0.9 },
    { path: "/book-strategy", priority: 0.95 },
    { path: "/pricing", priority: 0.95 },
    { path: "/architect", priority: 0.95 },
    { path: "/stop-renting", priority: 0.85 },
  ].map(({ path, priority }) => ({
    url: `${root}/${defaultLocale}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority,
  }));

  const global = ["/onboarding", "/onboarding-brief", "/success"].map(
    (path, i) => ({
      url: `${root}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5 - i * 0.05,
    })
  );

  return [...localized, ...global];
}
