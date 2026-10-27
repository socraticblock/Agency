import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getV2Copy } from "../../_components/v2/scroll/hero.copy";
import { V2Hero } from "../../_components/v2/scroll/V2Hero";
import { getScrubLayer } from "../../_components/v2/scroll/scrub.layers";

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
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ layer?: string }>;
}) {
  const { locale } = await params;
  const { layer: layerKey } = await searchParams;
  const lang = (locale === "ka" ? "ka" : "en") as Locale;
  const copy = getV2Copy(lang);

  // Two scrub layers, both frame sequences: the 3D scene (atmosphere) and
  // the flat vector composition (precision). `?layer=flat` switches.
  const layer = getScrubLayer(layerKey);

  return (
    <main lang={lang} className="v2-home bg-[#02060b] text-white">
      <V2Hero copy={copy} layer={layer} />
    </main>
  );
}
