import type { Locale } from "@/lib/i18n";
import { Navbar } from "../_components/Navbar";
import Configurator from "../_components/Configurator";

export const runtime = 'edge';

export const metadata = {
  title: "Kvali Architect Studio — Build Your Infrastructure",
  description: "Design your digital infrastructure with our consultative project builder. Choose your foundation, customize modules, and secure your asset.",
};

export default async function ArchitectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale;

  return (
    <>
      <Navbar locale={lang} />
      <main className="min-h-screen bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
          <div className="flex flex-col gap-1 mb-6">
            <span className="text-xs font-black font-space text-emerald-400 uppercase tracking-widest">Kvali Architect Studio</span>
            <h1 className="text-2xl md:text-3xl font-black font-space text-white tracking-tight">
              Build Your Digital Infrastructure
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Design your asset from the ground up. Choose a foundation, customize with precision modules, and secure it with our Sentinel shield.
            </p>
          </div>
        </div>
        <Configurator />
      </main>
    </>
  );
}
