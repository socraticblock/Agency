import { Navbar } from "./_components/Navbar";
import { KineticHero } from "./_components/KineticHero";
import { FootprintGrid } from "./_components/FootprintGrid";
import { StickyCardStack } from "./_components/StickyCardStack";
import { TechStackSection } from "./_components/TechStackSection";
import { BusinessDictionary } from "./_components/BusinessDictionary";
import { ROICalculator } from "./_components/ROICalculator";
import { TrustSection } from "./_components/TrustSection";
import type { Locale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale; // safe: default "ka" for empty/undefined

  return (
    <>
      <Navbar locale={lang} />
      <main>
        <KineticHero locale={lang} />
        <FootprintGrid locale={lang} />
        <StickyCardStack locale={lang} />
        <TechStackSection locale={lang} />
        <BusinessDictionary locale={lang} />
        <ROICalculator locale={lang} />
        <TrustSection locale={lang} />
      </main>
    </>
  );
}
