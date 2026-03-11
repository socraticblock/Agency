import { Navbar } from "./_components/Navbar";
import { KineticHero } from "./_components/KineticHero";
import { TechStackSection } from "./_components/TechStackSection";
import { GlobalFooter } from "./_components/GlobalFooter";
import { InefficiencyCalculator } from "./_components/InefficiencyCalculator";
import { SovereignCommandCenter } from "./_components/SovereignCommandCenter";
import { SovereignTriptych } from "./_components/SovereignTriptych";
import { PackageGrid } from "./_components/PackageGrid";
import { SovereignFaq } from "./_components/SovereignFaq";
import { ChatTerminal } from "@/components/ui/ChatTerminal";
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
        <TechStackSection locale={lang} />
        <InefficiencyCalculator locale={lang} />
        <PackageGrid locale={lang} />
        <SovereignFaq locale={lang} />
        <SovereignCommandCenter locale={lang} />
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <ChatTerminal locale={lang} />
        </section>
        <GlobalFooter locale={lang} />
      </main>
    </>
  );
}
