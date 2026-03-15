import { Navbar } from "./_components/Navbar";
import { KineticHero } from "./_components/KineticHero";
import { TechStackSection } from "./_components/TechStackSection";
import { GlobalFooter } from "./_components/GlobalFooter";
import { LeadGenHub } from "./_components/lead-gen/LeadGenHub";
import { SovereignTriptych } from "./_components/SovereignTriptych";
import { PackageGrid } from "./_components/PackageGrid";
import { SovereignFaq } from "./_components/SovereignFaq";
import { ScrollReveal } from "./_components/ScrollReveal";
import { TrustMetrics } from "./_components/TrustMetrics";
import { RoadmapTimeline } from "./_components/RoadmapTimeline";
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
        <ScrollReveal>
          <SovereignTriptych locale={lang} />
        </ScrollReveal>
        <ScrollReveal>
          <RoadmapTimeline />
        </ScrollReveal>
        <ScrollReveal>
          <LeadGenHub locale={lang} />
        </ScrollReveal>
        <ScrollReveal className="pb-20">
          <TrustMetrics />
        </ScrollReveal>
        <ScrollReveal>
          <PackageGrid locale={lang} />
        </ScrollReveal>
        <ScrollReveal>
          <SovereignFaq locale={lang} />
        </ScrollReveal>
        <ScrollReveal>
          <TechStackSection locale={lang} />
        </ScrollReveal>
        <GlobalFooter locale={lang} />
      </main>
    </>
  );
}
