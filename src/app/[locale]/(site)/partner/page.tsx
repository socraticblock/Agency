import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../_components/Navbar";
import { GlobalFooter } from "../../_components/GlobalFooter";
import type { Locale } from "@/lib/i18n";

/**
 * Old partner package prices, commission guarantees and earnings projections
 * are not current, approved commercial terms. Keep historical sources for
 * existing agreement reconciliation; do not expose them as a new offer.
 */
export const metadata: Metadata = {
  title: "Partnership enquiries | Genezisi",
  description: "Any collaboration with Genezisi is considered individually; no public partner program terms are currently offered.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};
export default async function PartnershipInformation({ params }: { params: Promise<{ locale: string }> }) {
  const lang: Locale = (await params).locale === "ka" ? "ka" : "en";
  const ka = lang === "ka";
  return (
    <>
      <Navbar locale={lang} />
      <main className="flex min-h-[65vh] items-center justify-center bg-[#050505] px-5 py-20 text-white">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Genezisi</p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{ka ? "თანამშრომლობა განიხილება ინდივიდუალურად." : "Partnerships are considered individually."}</h1>
          <p className="mt-6 text-lg leading-8 text-white/70">
            {ka ? "ამ გვერდზე აღარ მოქმედებს ძველი საკომისიო ანაზღაურებისა და პროდუქტების პაკეტების პირობები. არსებული შეთანხმებები განიხილება ინდივიდუალურად." : "Previous package-based referral rates and projected earnings are no longer presented as current offers. If you have an existing agreement, its terms remain subject to that agreement."}
          </p>
          <Link href={`/${lang}/pricing`} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-bold text-black">{ka ? "Genezisi-ს მიმდინარე სერვისები" : "Explore current services"}</Link>
        </div>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
