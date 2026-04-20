import type { Metadata, Viewport } from "next";
import { createLocalBusinessSeo } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { LangSetter } from "@/components/providers/LangSetter";
import { ChatWidgetWrapper } from "@/components/chat/ChatWidgetWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SITE_NAME = "Genezisi";
const SITE_DESCRIPTION =
  "Escape the social media trap. We build a permanent, high-speed digital home for your brand that sells 24/7.";

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
    jobTitle: "Luxury Branding",
    accentColor: "#10b981",
    theme: "dark",
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
      <ChatWidgetWrapper />
    </>
  );
}
