import type { Metadata } from "next";

/**
 * These retained legacy service pages are English-language pages even when
 * requested under /ka. Their canonical version is the English route.
 * Do not publish hreflang until the body is genuinely translated.
 */
export function legacyServiceMetadata(path: string, title: string, description: string): Metadata {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(/\/$/, "");
  const canonical = `${base}/en${path}`;
  return {
    title,
    description,
    metadataBase: new URL(base),
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: "Genezisi", type: "website", locale: "en_US" },
    twitter: { card: "summary", title, description },
  };
}
