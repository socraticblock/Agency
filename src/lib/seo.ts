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
  jobTitle?: string;
  accentColor?: string;
  photoUrl?: string;
  theme?: "light" | "dark";
  ogType?: "home" | "pricing" | "blog" | "card";
  ogTier?: string;
  ogPrice?: string;
  ogFeatures?: string;
  ogCta?: string;
  ogCategory?: string;
  ogReadTime?: string;
  ogTagline?: string;
  ogSubline?: string;
  ogServices?: string;
  ogAlt?: string;
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
    jobTitle = "Expert",
    accentColor = "#10b981", // Changed default to emerald
    photoUrl,
    theme = "dark",
    ogType = "home",
    ogTier,
    ogPrice,
    ogFeatures,
  ogCta,
    ogCategory,
    ogReadTime,
    ogTagline,
    ogSubline,
    ogServices,
    ogAlt,
  } = options;

  const baseUrl = getBaseUrl().replace(/\/$/, "");
  /** Public URLs only use routed locales (`/en` today; `/ka` redirects). */
  const pathLocale = locale === "ka" ? defaultLocale : locale;
  const synchronizedPath = `/${pathLocale}${path}`;
  const url = `${baseUrl}${synchronizedPath}`.replace(/\/+$/, "");

  const title = jobTitle && ogType === "card" ? `${name} | ${jobTitle}` : name;
  const localeTag = getLocaleTag(locale);

  // Construct High-Fidelity OG Image URL with parameters
  const ogParams = new URLSearchParams({
    type: ogType,
    name,
    title: jobTitle || "Expert",
    accent: accentColor,
    theme,
  });

  if (photoUrl) ogParams.set("photo", photoUrl);
  if (ogCategory) ogParams.set("category", ogCategory);
  if (ogReadTime) ogParams.set("readTime", ogReadTime);
  if (ogTier) ogParams.set("tier", ogTier);
  if (ogPrice) ogParams.set("price", ogPrice);
  if (ogFeatures) ogParams.set("features", ogFeatures);
  if (ogTagline) ogParams.set("tagline", ogTagline);
  if (ogSubline) ogParams.set("subline", ogSubline);
  if (ogServices) ogParams.set("services", ogServices);
  if (ogCta) ogParams.set("cta", ogCta);

  const ogImageUrl = `${baseUrl}/api/og?${ogParams.toString()}`;

  // Generate descriptive Alt Text for the OG Image
  let finalAlt = ogAlt;
  if (!finalAlt) {
    if (ogType === "home") {
      finalAlt = `${name} — Professional Digital Foundations in Tbilisi`;
    } else if (ogType === "pricing") {
      finalAlt = `${name} — ${ogTier || "Professional"} Pricing Packages`;
    } else if (ogType === "blog") {
      finalAlt = `${name} Blog — Insights on ${ogCategory || "Web Design"}`;
    } else if (ogType === "card") {
      finalAlt = `${name} — ${jobTitle}`;
    } else {
      finalAlt = `${name} - ${jobTitle}`;
    }
  }

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
      siteName: "Genezisi",
      locale: localeTag,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: finalAlt,
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
    jobTitle,
    priceRange: "$$",
  };

  return { metadata, jsonLd };
}

