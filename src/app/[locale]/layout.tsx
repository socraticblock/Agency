import type { Metadata } from "next";
import { createLocalBusinessSeo } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { LangSetter } from "@/components/providers/LangSetter";

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
  });
  return metadata;
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
      <div className={`locale-${lang}`}>{children}</div>
    </>
  );
}
