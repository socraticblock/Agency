import type { Metadata } from "next";
import { createLocalBusinessSeo } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { StartPageClient } from "./components/StartPageClient";

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
  const name = "Digital Business Card | Genezisi";
  const description =
    "Premium digital business card: live customizer, from 150₾ setup + 120₾/year hosting. Order via WhatsApp — WYSIWYG.";
  const { metadata } = createLocalBusinessSeo({
    name,
    description,
    locale: lang,
    path: "/start",
  });
  return metadata;
}

export default async function StartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = normalizeLocale(locale);
  return <StartPageClient locale={lang} />;
}
