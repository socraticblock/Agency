import type { Metadata } from "next";
import { createLocalBusinessSeo } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

const SITE_NAME = "Kvali Digital";
const SITE_DESCRIPTION =
  "Web-as-a-Service for physical businesses in Georgia. We build, optimize, and maintain your digital footprint.";

function normalizeLocale(locale: string | undefined): Locale {
  return locale === "en" ? "en" : "ka";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={`locale-${lang}`}>{children}</div>
    </>
  );
}
