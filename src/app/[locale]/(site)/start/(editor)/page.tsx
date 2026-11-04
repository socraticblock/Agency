import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../../_components/Navbar";
import { GlobalFooter } from "../../../_components/GlobalFooter";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Digital card orders closed | Genezisi",
    description: "Genezisi no longer accepts new digital business card orders. Existing published cards remain available.",
    robots: { index: false, follow: false },
    alternates: { canonical: null },
  };
}

/** This closes new sales only; published /c/[slug], mapped domains and admin remain untouched. */
export default async function CardOrdersClosed({ params }: { params: Promise<{ locale: string }> }) {
  const lang: Locale = (await params).locale === "ka" ? "ka" : "en";
  const ka = lang === "ka";
  return (
    <>
      <Navbar locale={lang} />
      <main className="flex min-h-[65vh] items-center justify-center bg-[#050505] px-5 py-20 text-white">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Genezisi</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            {ka ? "ციფრული ვიზიტკების ახალი შეკვეთები შეწყვეტილია." : "Digital card ordering is closed."}
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/70">
            {ka
              ? "Genezisi აღარ იღებს ციფრული ვიზიტკების ახალ შეკვეთებს. უკვე გამოქვეყნებული ვიზიტკები და არსებული მომხმარებლების ბმულები შენარჩუნებულია."
              : "Genezisi no longer accepts new digital business card orders. Existing published cards and customer links remain available."}
          </p>
          <Link href={`/${lang}/pricing`} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-bold text-black">
            {ka ? "ჩვენი მიმდინარე სერვისები" : "Explore current services"}
          </Link>
        </div>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
