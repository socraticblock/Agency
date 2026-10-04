import type { Metadata, Viewport } from "next";
import { createLocalBusinessSeo } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { LangSetter } from "@/components/providers/LangSetter";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SITE_NAME = "Genezisi";
const SITE_DESCRIPTION = {
  en: "Genezisi is a founder-led digital studio building distinctive websites, useful AI systems and automation for real businesses.",
  ka: "Genezisi არის დამფუძნებლის მიერ მართული ციფრული სტუდია, რომელიც ბიზნესებისთვის ქმნის გამორჩეულ ვებსაიტებს, სასარგებლო AI სისტემებსა და ავტომატიზაციას.",
} satisfies Record<Locale, string>;

const SEO_COPY = {
  en: {
    jobTitle: "Websites, AI Systems & Automation",
    tagline: "Websites, AI and automation built to work together.",
    subline: "Founder-led digital design and systems work for businesses that want a better customer experience and less repetitive work.",
    services: "Websites, AI systems, automation, integrations",
    cta: "Message Genezisi",
    alt: "Genezisi websites, AI systems and automation for real businesses",
  },
  ka: {
    jobTitle: "ვებსაიტები, AI სისტემები და ავტომატიზაცია",
    tagline: "ვებსაიტები, AI და ავტომატიზაცია — შექმნილი ერთად სამუშაოდ.",
    subline: "დამფუძნებელთან პირდაპირი თანამშრომლობა უკეთესი მომხმარებლის გამოცდილებისა და ნაკლები განმეორებადი სამუშაოსთვის.",
    services: "ვებსაიტები, AI სისტემები, ავტომატიზაცია, ინტეგრაციები",
    cta: "მომწერეთ Genezisi-ს",
    alt: "Genezisi — ვებსაიტები, AI სისტემები და ავტომატიზაცია ბიზნესებისთვის",
  },
} satisfies Record<Locale, {
  jobTitle: string;
  tagline: string;
  subline: string;
  services: string;
  cta: string;
  alt: string;
}>;

function normalizeLocale(locale: string | undefined): Locale {
  if (locale && (locale === "en" || locale === "ka")) return locale;
  return "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = normalizeLocale(locale);
  const seo = SEO_COPY[lang];
  const { metadata } = createLocalBusinessSeo({
    name: SITE_NAME,
    description: SITE_DESCRIPTION[lang],
    locale: lang,
    path: "/",
    jobTitle: seo.jobTitle,
    accentColor: "#10b981",
    theme: "dark",
    ogTagline: seo.tagline,
    ogSubline: seo.subline,
    ogServices: seo.services,
    ogCta: seo.cta,
    ogAlt: seo.alt,
  });
  
  return {
    ...metadata,
    appleWebApp: {
      title: SITE_NAME,
      statusBarStyle: "black-translucent",
      capable: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = normalizeLocale(locale);
  const { jsonLd } = createLocalBusinessSeo({
    name: SITE_NAME,
    description: SITE_DESCRIPTION[lang],
    locale: lang,
    path: "/",
  });

  return (
    <>
      <LangSetter lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div id="main-content" className={`locale-${lang} outline-none`} tabIndex={-1}>
        {children}
      </div>
    </>
  );
}
