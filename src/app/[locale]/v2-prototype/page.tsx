import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { SignalHeroPrototype } from "../_components/SignalHeroPrototype";

export const metadata: Metadata = {
  title: "Genezisi — Websites, AI & Automation",
  description: "Genezisi builds distinctive websites, useful AI systems and automation for real businesses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function V2PrototypePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "ka" ? "ka" : "en") as Locale;

  return <SignalHeroPrototype locale={lang} />;
}
