import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../_components/Navbar";
import { GlobalFooter } from "../../_components/GlobalFooter";
import type { Locale } from "@/lib/i18n";

/**
 * Replace unsupported 'renting vs owning' performance metrics with a
 * balanced explanation of bespoke sites and hosted services.
 */
export const metadata: Metadata = {
  title: "Website ownership and hosting | Genezisi",
  description: "Understand the tradeoffs between hosted website builders and custom development.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};
export default async function WebsiteOwnership({ params }: { params: Promise<{ locale: string }> }) {
  const lang: Locale = (await params).locale === "ka" ? "ka" : "en";
  const ka = lang === "ka";
  return (
    <>
      <Navbar locale={lang} />
      <main className="mx-auto min-h-[65vh] max-w-5xl bg-[#050505] px-5 py-20 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">{ka ? "გადაწყვეტილების გზამკვლევი" : "A practical decision guide"}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">{ka ? "საკუთარი ვებსაიტი თუ მზა პლატფორმა?" : "Custom website or hosted platform?"}</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70">{ka ? "ორივე მიდგომას აქვს უპირატესობა. სწორი არჩევანი დამოკიდებულია ბიუჯეტზე, მოთხოვნებზე, მომსახურებაზე, ინტეგრაციებსა და სასურველ კონტროლზე." : "Both approaches can work. The right choice depends on budget, maintenance, integrations, flexibility, and the level of control your business requires."}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"><h2 className="text-xl font-bold">{ka ? "მზა პლატფორმა" : "Hosted website builder"}</h2><p className="mt-4 leading-7 text-white/70">{ka ? "შეიძლება სწრაფად და მარტივად დაინერგოს, თუმცა ფუნქციები, გამოწერა და ექსპორტის შესაძლებლობა დამოკიდებულია პროვაიდერზე." : "Often faster to launch and easier to maintain, but capabilities, ongoing subscription costs and export options depend on the provider."}</p></section>
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"><h2 className="text-xl font-bold">{ka ? "ინდივიდუალური შემუშავება" : "Bespoke development"}</h2><p className="mt-4 leading-7 text-white/70">{ka ? "მეტი კონტროლია არქიტექტურასა და ინტეგრაციებზე, მაგრამ საჭიროა შესაბამისი ტექნიკური მომსახურება, ჰოსტინგი და უსაფრთხოების განახლებები." : "More flexibility over architecture and integrations, alongside responsibility for hosting, maintenance, security updates and operational support."}</p></section>
        </div>
        <p className="mt-10 max-w-3xl text-base leading-7 text-white/65">{ka ? "Genezisi გეხმარებათ შეარჩიოთ გადაწყვეტა თქვენი რეალური მიზნებისა და შესაძლებლობების მიხედვით — წინასწარ განსაზღვრული პაკეტების გარეშე." : "Genezisi can help scope an approach around your actual requirements rather than fitting every project into a predefined package."}</p>
        <Link href={`/${lang}/pricing`} className="mt-7 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-bold text-black">{ka ? "პროექტის განხილვა" : "Discuss a project"}</Link>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
