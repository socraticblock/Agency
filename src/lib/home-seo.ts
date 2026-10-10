import type { Metadata } from "next";
import {
  HOME_DEFAULT_LOCALE,
  HOME_HREFLANG,
  HOME_OG_LOCALE,
  type HomeLocale,
} from "./home-i18n";

/**
 * Homepage SEO in one place.
 *
 * The three homepages own a complete, identical alternate cluster; nothing is
 * inherited from a parent segment. Next merges metadata object-by-object rather
 * than field-by-field (a child `openGraph`/`alternates` replaces the parent's),
 * so a half-declared cluster in a layout is exactly how a homepage ends up with
 * a canonical it never authored.
 *
 * Legacy surfaces keep using `src/lib/seo.ts` unchanged.
 */
function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(/\/+$/, "");
}

type HomeSeoCopy = {
  title: string;
  description: string;
  ogTagline: string;
  ogSubline: string;
  ogServices: string;
  ogAlt: string;
};

/**
 * Facts only: the studio is founder-led, based in Georgia and works remotely.
 * No local-presence, pricing, language or performance claim is made here.
 */
const HOME_SEO_COPY: Record<HomeLocale, HomeSeoCopy> = {
  en: {
    title: "Genezisi — Websites, AI & Automation",
    description:
      "Genezisi builds distinctive websites, AI systems and automation that make the business behind them work better.",
    ogTagline: "Your website is only the beginning.",
    ogSubline:
      "Founder-led websites, AI systems and automation built around real business needs.",
    ogServices: "Websites, AI systems, automation",
    ogAlt: "Genezisi — websites, AI systems and automation",
  },
  ka: {
    title: "Genezisi — ვებსაიტები, AI და ავტომატიზაცია",
    description:
      "Genezisi ქმნის გამორჩეულ ვებსაიტებს, AI სისტემებსა და ავტომატიზაციას, რომლებიც მათ უკან მდგომ ბიზნესს უკეთ მუშაობაში ეხმარება.",
    ogTagline: "თქვენი ვებსაიტი მხოლოდ დასაწყისია.",
    ogSubline: "ვებსაიტები, AI სისტემები და ავტომატიზაცია რეალური ბიზნეს საჭიროებებისთვის.",
    ogServices: "ვებსაიტები · AI სისტემები · ავტომატიზაცია",
    ogAlt: "Genezisi — ვებსაიტები, AI სისტემები და ავტომატიზაცია",
  },
  nl: {
    title: "Genezisi — Websites, AI en automatisering",
    description:
      "Genezisi bouwt onderscheidende websites, praktische AI-systemen en automatiseringen die je bedrijf beter laten werken. Rechtstreeks met de oprichter.",
    ogTagline: "Je website is nog maar het begin.",
    ogSubline: "Websites, AI-systemen en automatiseringen voor echte bedrijfsbehoeften.",
    ogServices: "Websites · AI-systemen · Automatisering",
    ogAlt: "Genezisi — websites, AI-systemen en automatisering",
  },
};

export function homeUrl(locale: HomeLocale): string {
  return `${siteOrigin()}/${locale}`;
}

/**
 * The homepage share card is rendered by the existing `/api/og` generator with
 * this locale's own words, so the Dutch card never carries the English
 * "Your website is only the beginning." sentence.
 */
export function homeOgImageUrl(locale: HomeLocale): string {
  const copy = HOME_SEO_COPY[locale];
  const params = new URLSearchParams({
    type: "home",
    name: "Genezisi",
    title: "Genezisi",
    accent: "#a5f3fc",
    theme: "dark",
    tagline: copy.ogTagline,
    subline: copy.ogSubline,
    services: copy.ogServices,
  });
  return `${siteOrigin()}/api/og?${params.toString()}`;
}

/** The single reciprocal alternate cluster every homepage publishes. */
export function homeAlternateLanguages(): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": homeUrl(HOME_DEFAULT_LOCALE),
  };
  for (const locale of Object.keys(HOME_HREFLANG) as HomeLocale[]) {
    languages[HOME_HREFLANG[locale]] = homeUrl(locale);
  }
  return languages;
}

export function getHomeMetadata(locale: HomeLocale): Metadata {
  const copy = HOME_SEO_COPY[locale];
  const url = homeUrl(locale);
  const ogImageUrl = homeOgImageUrl(locale);

  return {
    title: copy.title,
    description: copy.description,
    metadataBase: new URL(siteOrigin()),
    alternates: {
      canonical: url,
      languages: homeAlternateLanguages(),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName: "Genezisi",
      locale: HOME_OG_LOCALE[locale],
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: copy.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * One organization graph per homepage.
 *
 * Deliberately *not* a Belgian `LocalBusiness`: the studio is in Georgia and
 * serves clients remotely. No street address (unknown), no VAT id, no rating,
 * no price range, no Belgian office.
 */
export function getHomeJsonLd(locale: HomeLocale): Record<string, unknown> {
  const copy = HOME_SEO_COPY[locale];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteOrigin()}/#organization`,
    name: "Genezisi",
    url: homeUrl(locale),
    description: copy.description,
    telephone: "+995579723564",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
    areaServed: {
      "@type": "Country",
      name: "Georgia",
    },
    knowsLanguage: ["en", "ka", "nl"],
    image: homeOgImageUrl(locale),
  };
}
