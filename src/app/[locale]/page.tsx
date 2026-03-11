import { Navbar } from "./_components/Navbar";
import { KineticHero } from "./_components/KineticHero";
import { TechStackSection } from "./_components/TechStackSection";
import { GlobalFooter } from "./_components/GlobalFooter";
import { SovereignSummary } from "./_components/SovereignSummary";
import { InefficiencyCalculator } from "./_components/InefficiencyCalculator";
import { SovereignCommandCenter } from "./_components/SovereignCommandCenter";
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
        <SovereignSummary locale={lang} />
        <TechStackSection locale={lang} />
        <InefficiencyCalculator locale={lang} />
        <SovereignCommandCenter locale={lang} />
        <GlobalFooter locale={lang} />
      </main>
    </>
  );
}
