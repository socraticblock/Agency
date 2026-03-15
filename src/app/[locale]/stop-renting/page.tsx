import { Navbar } from "../_components/Navbar";
import { GlobalFooter } from "../_components/GlobalFooter";
import type { Locale } from "@/lib/i18n";
import { StopRentingContent } from "./_components/StopRentingContent";

export default async function StopRentingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale;

  return (
    <>
      <Navbar locale={lang} />
      <main className="bg-[#0F172A] min-h-screen text-slate-100 selection:bg-emerald-500/30">
        <StopRentingContent locale={lang} />
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
