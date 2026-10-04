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
const SITE_DESCRIPTION =
  "Premium website design and development in Tbilisi, Georgia for local businesses that want to look serious online and book more customers.";

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
  const { metadata } = createLocalBusinessSeo({
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: lang,
    path: "/",
    jobTitle: "Premium Website Design",
    accentColor: "#10b981",
    theme: "dark",
    ogTagline: "Premium websites for businesses that want to look serious online.",
    ogSubline:
      "Founder-led website design and development for coaches, clinics, studios, restaurants, shops, and local services.",
    ogServices: "Website design, development, booking, payments, SEO",
    ogCta: "Book a website call",
    ogAlt:
      "Genezisi premium website design and development for Georgian businesses",
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
    description: SITE_DESCRIPTION,
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
