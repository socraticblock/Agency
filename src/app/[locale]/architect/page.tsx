import type { Locale } from "@/lib/i18n";
import { Navbar } from "../_components/Navbar";
import Configurator from "../_components/Configurator";
import { NanoBananaBackground } from "../_components/NanoBananaBackground";

// Use the default Node.js runtime instead of Edge to avoid size limits (1.55MB bundle)
// export const runtime = 'edge';

export const metadata = {
  title: "Genezisi Architect Studio — Build Your Infrastructure",
  description: "Design your infrastructure with our consultative project builder. Choose your foundation, customize modules, and secure your asset.",
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
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Continuous mesh grid backgound overlay */}
        <NanoBananaBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-4 pt-6 sm:px-6 invisible hidden opacity-0 pointer-events-none h-0 p-0 m-0 overflow-hidden">
          {/* Hero section moved to Configurator for conditional step-based rendering */}
        </div>
        
        <div className="relative z-10">
          <Configurator />
        </div>
      </main>
    </>
  );
}
