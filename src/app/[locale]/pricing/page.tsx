import type { Locale } from "@/lib/i18n";
import { Navbar } from "../_components/Navbar";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale;

  return (
    <>
      <Navbar locale={lang} />
      <main className="min-h-screen bg-[#060c22]">
        <section className="relative mx-auto flex min-h-[65vh] max-w-7xl flex-col justify-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16)_0%,rgba(6,12,34,0.95)_58%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="relative z-10 max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-emerald-400">
              Pricing
            </p>
            <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Invest in Your Digital Real Estate
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Not an expense, an owned digital asset designed to convert demand into predictable revenue.
              Choose the foundation that matches your stage.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Built for Georgian LLC owners who need speed, credibility, and operational clarity.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`/${lang}/architect`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-500 px-7 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-emerald-400"
              >
                Compare Foundations
              </a>
              <a
                href={`/${lang}/architect`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-wider text-slate-200 transition hover:bg-white/10"
              >
                Need Custom Architecture?
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
