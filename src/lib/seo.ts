import type { Metadata } from "next";
import { defaultLocale, type Locale } from "@/lib/i18n";

interface LocalBusinessOptions {
  name: string;
  description: string;
  locale: Locale;
  path?: string;
  telephone?: string;
  streetAddress?: string;
  addressLocality?: string;
  postalCode?: string;
  addressCountry?: string;
}

interface SeoResult {
  metadata: Metadata;
  jsonLd: Record<string, unknown>;
}

function getBaseUrl() {
  if (typeof process !== "undefined") {
    return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  }
  return "http://localhost:3000";
}

function getLocaleTag(locale: Locale) {
  if (locale === "ka") return "ka-GE";
  return "en-US";
}

export function createLocalBusinessSeo(options: LocalBusinessOptions): SeoResult {
  const {
    name,
    description,
    locale,
    path = "/",
    telephone = "+995579723564",
    streetAddress = "Tbilisi",
    addressLocality = "Tbilisi",
    postalCode = "",
    addressCountry = "GE",
  } = options;

  const baseUrl = getBaseUrl().replace(/\/$/, "");
  /** Public URLs only use routed locales (`/en` today; `/ka` redirects). */
  const pathLocale = locale === "ka" ? defaultLocale : locale;
  const localizedPath = `/${pathLocale}${path.startsWith("/") ? path : `/${path}`}`;
  const url = `${baseUrl}${localizedPath}`;

  const title = name;
  const localeTag = getLocaleTag(locale);
  const ogImageUrl = `${baseUrl}/api/og?locale=${encodeURIComponent(pathLocale)}&title=${encodeURIComponent(name)}`;

  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        "x-default": `${baseUrl}/${defaultLocale}`,
        "en-US": `${baseUrl}/${defaultLocale}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: name,
      locale: localeTag,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      postalCode,
      addressCountry,
    },
    areaServed: "Tbilisi, Georgia",
    image: ogImageUrl,
    priceRange: "$$",
  };

  return { metadata, jsonLd };
}

