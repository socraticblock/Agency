import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../_components/Navbar";
import { GlobalFooter } from "../../_components/GlobalFooter";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Bespoke systems | Genezisi",
  description: "Business systems and technical projects are individually scoped with the Genezisi founder.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default async function EnterprisePage({ params }: { params: Promise<{ locale: string }> }) {
  const lang: Locale = (await params).locale === "ka" ? "ka" : "en";
  return (
    <>
      <Navbar locale={lang} />
      <main className="flex min-h-[60vh] items-center justify-center bg-[#050505] px-5 py-20 text-center text-white">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold">{lang === "ka" ? "ინდივიდუალური სისტემები" : "Bespoke systems"}</h1>
          <p className="mt-5 text-lg leading-8 text-white/70">
            {lang === "ka" ? "მასშტაბური სისტემები და ინტეგრაციები განიხილება ინდივიდუალურად. მოგვწერეთ თქვენი პროექტის შესახებ." : "Complex systems and integrations are scoped individually. Tell us about your project and what you need it to achieve."}
          </p>
          <Link href={`/${lang}/pricing`} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-bold text-black">{lang === "ka" ? "განვიხილოთ პროექტი" : "Discuss a project"}</Link>
        </div>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
