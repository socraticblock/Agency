import { Navbar } from "../_components/Navbar";
import { GlobalFooter } from "../_components/GlobalFooter";
import { NanoBananaBackground } from "../_components/NanoBananaBackground";
import type { Locale } from "@/lib/i18n";
import { PartnerPageClient } from "./_components/PartnerPageClient";

function normalizeLocale(locale: string | undefined): Locale {
  if (locale && (locale === "en" || locale === "ka")) return locale;
  return "en";
}

export default async function PartnerPage({
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
          <PartnerPageClient locale={lang} />
        </div>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
