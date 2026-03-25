import type { Locale } from "@/lib/i18n";
import { Navbar } from "../_components/Navbar";
import Configurator from "../_components/Configurator";
import { NanoBananaBackground } from "../_components/NanoBananaBackground";

export const runtime = 'edge';

export const metadata = {
  title: "Genezisi Architect Studio — Build Your Infrastructure",
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
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Continuous mesh grid backgound overlay */}
        <NanoBananaBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-4 pt-6 sm:px-6">
          <div className="mb-6 flex flex-col gap-1">
            <span className="text-xs font-black font-space uppercase tracking-widest text-emerald-400">Genezisi Architect Studio</span>
            <h1 className="font-space text-2xl font-black tracking-tight text-white md:text-3xl">
              Build Your Digital Infrastructure
            </h1>
            <p className="max-w-xl text-base text-slate-400 sm:text-sm">
              Design your asset from the ground up. Choose a foundation, customize with precision modules, and secure it with our Sentinel shield.
            </p>
          </div>
        </div>
        
        <div className="relative z-10">
          <Configurator />
        </div>
      </main>
    </>
  );
}
