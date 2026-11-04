import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../_components/Navbar";
import { GlobalFooter } from "../../_components/GlobalFooter";
import type { Locale } from "@/lib/i18n";

/**
 * Legacy articles contain stale fixed-price offers and unsupported marketing
 * claims. They are retained in src/lib/blog.ts for editorial revision, but are
 * not currently published to visitors or crawlers.
 */
export const metadata: Metadata = {
  title: "Journal under revision | Genezisi",
  description: "The Genezisi journal is being updated to reflect the studio's current work.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default async function JournalPaused({ params }: { params: Promise<{ locale: string }> }) {
  const lang: Locale = (await params).locale === "ka" ? "ka" : "en";
  return (
    <>
      <Navbar locale={lang} />
      <main className="flex min-h-[65vh] items-center justify-center bg-[#050505] px-5 py-20 text-white">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">{lang === "ka" ? "Genezisi — ბლოგი" : "Genezisi — Journal"}</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{lang === "ka" ? "სტატიები განახლების პროცესშია." : "Our journal is being updated."}</h1>
          <p className="mt-6 text-lg leading-8 text-white/70">{lang === "ka" ? "ძველი სტატიები აღარ ასახავს Genezisi-ს მიმდინარე შეთავაზებებს. ახალი მასალების გამოქვეყნებამდე გაეცანით ჩვენს სერვისებს." : "Older articles describe offers we no longer provide. We are revising the journal before republishing useful material."}</p>
          <Link href={`/${lang}/pricing`} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-bold text-black">{lang === "ka" ? "მიმდინარე სერვისები" : "Explore current services"}</Link>
        </div>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
