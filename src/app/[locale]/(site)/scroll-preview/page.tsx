import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getV2Copy } from "../../_components/v2/scroll/hero.copy";
import { V2Hero } from "../../_components/v2/scroll/V2Hero";

const ROBOTS = { index: false, follow: false };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "ka" ? "ka" : "en";
  return {
    title:
      lang === "ka"
        ? "Genezisi V2 — სკროლის ექსპერიმენტი"
        : "Genezisi V2 — scroll experiment",
    description:
      lang === "ka"
        ? "გოლოვანი სკროლ-სტორიის ექსპერიმენტი."
        : "Scroll-story experiment: the GSAP Signal sequence that was removed from the homepage, restored for review.",
    robots: ROBOTS,
  };
}

export default async function GenezisiScrollPreview({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "ka" ? "ka" : "en") as Locale;
  const copy = getV2Copy(lang);

  return (
    <main lang={lang} className="v2-home bg-[#02060b] text-white">
      <V2Hero copy={copy} />
    </main>
  );
}
