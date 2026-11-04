import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../_components/Navbar";
import { GlobalFooter } from "../../_components/GlobalFooter";
import { WHATSAPP_INTAKE } from "@/constants/content";
import type { Locale } from "@/lib/i18n";

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(/\/$/, "");
const SERVICES = [
  { key: "web", en: "Websites", ka: "ვებსაიტები", enText: "Distinctive, responsive websites that explain your business and help customers take the next step.", kaText: "გამორჩეული, ადაპტური ვებსაიტები, რომლებიც ნათლად წარმოაჩენს თქვენს ბიზნესს და მომხმარებელს შემდეგ ნაბიჯში ეხმარება." },
  { key: "ai", en: "AI systems", ka: "AI სისტემები", enText: "Practical AI workflows built around your information, requirements, and human review.", kaText: "პრაქტიკული AI სისტემები თქვენი მონაცემების, საჭიროებებისა და ადამიანის კონტროლის გათვალისწინებით." },
  { key: "automation", en: "Automation", ka: "ავტომატიზაცია", enText: "Connected workflows that reduce repetitive work and make existing tools more useful.", kaText: "დაკავშირებული სამუშაო პროცესები, რომლებიც ამცირებს განმეორებით საქმეებს და აუმჯობესებს არსებული ხელსაწყოების გამოყენებას." },
] as const;

function normalizedLocale(locale: string): Locale {
  return locale === "ka" ? "ka" : "en";
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const lang = normalizedLocale((await params).locale);
  const ka = lang === "ka";
  const title = ka ? "ინდივიდუალური პროექტები | Genezisi" : "Bespoke projects | Genezisi";
  const description = ka
    ? "Genezisi ქმნის ინდივიდუალურად დაგეგმილ ვებსაიტებს, AI სისტემებსა და ავტომატიზაციას. პროექტის მოცულობასა და ფასს ერთად განვსაზღვრავთ."
    : "Founder-led websites, AI systems and automation, scoped around your business rather than fixed-price packages.";
  return {
    title, description, metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${lang}/pricing`,
      languages: { "en-US": `${BASE_URL}/en/pricing`, "ka-GE": `${BASE_URL}/ka/pricing` },
    },
    openGraph: { title, description, url: `${BASE_URL}/${lang}/pricing`, siteName: "Genezisi", type: "website", locale: ka ? "ka_GE" : "en_US" },
    twitter: { card: "summary", title, description },
  };
}

export default async function BespokeProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const lang = normalizedLocale((await params).locale);
  const ka = lang === "ka";
  const message = ka ? "გამარჯობა, მსურს განვიხილო ინდივიდუალური პროექტი Genezisi-სთან." : "Hello Genezisi, I would like to discuss a bespoke project.";
  const contact = `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(message)}`;
  return (
    <>
      <Navbar locale={lang} />
      <main className="min-h-[70vh] bg-[#050505] text-white">
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-20 sm:px-8 sm:pt-28">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            {ka ? "როგორ ვმუშაობთ" : "How we work"}
          </p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-[0.98] tracking-[-0.05em]">
            {ka ? "ყოველი პროექტი განსხვავებულია." : "Every project has its own shape."}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">
            {ka ? "Genezisi ქმნის ვებსაიტებს, AI სისტემებსა და ავტომატიზაციას კონკრეტული საჭიროებებისთვის. წინასწარ განსაზღვრული პაკეტების ნაცვლად, ჯერ ამოცანასა და სამუშაოს მოცულობას ვადგენთ, შემდეგ კი ვთავაზობთ ინდივიდუალურ პირობებს." : "Genezisi builds websites, AI systems and automation around real business needs. Instead of selling preset packages, we discuss the problem, define the scope and agree on a tailored proposal."}
          </p>
        </section>
        <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-3" aria-label={ka ? "სერვისები" : "Services"}>
          {SERVICES.map((service) => (
            <article key={service.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-7">
              <h2 className="text-xl font-bold">{ka ? service.ka : service.en}</h2>
              <p className="mt-4 text-sm leading-7 text-white/65">{ka ? service.kaText : service.enText}</p>
            </article>
          ))}
        </section>
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <h2 className="text-2xl font-bold">{ka ? "განვიხილოთ თქვენი პროექტი" : "Discuss your project"}</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/65">
            {ka ? "მომწერეთ რა გსურთ შექმნათ ან გააუმჯობესოთ. პირველ რიგში გავარკვევთ, რა არის თქვენთვის პრაქტიკულად მნიშვნელოვანი." : "Tell me what you want to build or improve. We can start by identifying what would make the biggest practical difference."}
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a href={contact} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-bold text-black transition hover:bg-emerald-100">
              {ka ? "მომწერეთ WhatsApp-ზე" : "Message me on WhatsApp"}
            </a>
            <Link href={`/${lang}`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-bold text-white transition hover:border-white/60">
              {ka ? "მთავარზე დაბრუნება" : "Back to the homepage"}
            </Link>
          </div>
        </section>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
