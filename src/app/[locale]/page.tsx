import { Navbar } from "./_components/Navbar";
import { KineticHero } from "./_components/KineticHero";
import { TechStackSection } from "./_components/TechStackSection";
import { GlobalFooter } from "./_components/GlobalFooter";
import { LeadGenHub } from "./_components/lead-gen/LeadGenHub";
import { SovereignTriptych } from "./_components/SovereignTriptych";
import { PackageGrid } from "./_components/PackageGrid";
import { SovereignFaq } from "./_components/SovereignFaq";
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
        <SovereignTriptych locale={lang} />
        <LeadGenHub locale={lang} />
        <PackageGrid locale={lang} />
        <SovereignFaq locale={lang} />
        <TechStackSection locale={lang} />
        <GlobalFooter locale={lang} />
      </main>
    </>
  );
}
