import type { Metadata } from "next";
import { Navbar } from "../_components/Navbar";
import { GlobalFooter } from "../_components/GlobalFooter";
import { NanoBananaBackground } from "../_components/NanoBananaBackground";
import type { Locale } from "@/lib/i18n";
import { createLocalBusinessSeo } from "@/lib/seo";
import { PricingPageClient } from "./PricingPageClient";

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
    name: "Genezisi — Pricing",
    description:
      "Transparent website and e-commerce packages in GEL for Georgian businesses. Full ownership, clear delivery windows, local payment integrations.",
    locale: lang,
    path: "/pricing",
    ogType: "pricing",
    ogTier: "Professional",
    ogPrice: "999 ₾",
    ogFeatures: "100% custom design · High-speed performance · 45-day warranty",
  });
  return metadata;
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = normalizeLocale(locale);

  return (
    <>
      <Navbar locale={lang} />
      <main className="relative min-h-screen overflow-hidden bg-[#050505] text-slate-100 selection:bg-emerald-500/30">
        <NanoBananaBackground />
        <div className="relative z-10">
          <PricingPageClient locale={lang} />
        </div>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
