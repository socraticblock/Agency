import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { SignalHeroPrototype } from "../_components/SignalHeroPrototype";

const ROBOTS = {
  index: false,
  follow: false,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ka = locale === "ka";

  return {
    title: ka
      ? "Genezisi — ვებსაიტები, AI და ავტომატიზაცია"
      : "Genezisi — Websites, AI & Automation",
    description: ka
      ? "Genezisi ქმნის გამორჩეულ ვებსაიტებს, სასარგებლო AI სისტემებსა და ავტომატიზაციას რეალური ბიზნესებისთვის."
      : "Genezisi builds distinctive websites, useful AI systems and automation for real businesses.",
    robots: ROBOTS,
  };
}

export default async function V2PrototypePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "ka" ? "ka" : "en") as Locale;

  return <SignalHeroPrototype locale={lang} />;
}
