import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { SignalHeroPrototype } from "./_components/SignalHeroPrototype";

function normalizeLocale(locale: string): Locale {
  return locale === "ka" ? "ka" : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = normalizeLocale(locale);
  const ka = lang === "ka";

  const title = ka
    ? "Genezisi — ვებსაიტები, AI და ავტომატიზაცია"
    : "Genezisi — Websites, AI & Automation";
  const description = ka
    ? "Genezisi ქმნის გამორჩეულ ვებსაიტებს, AI სისტემებსა და ავტომატიზაციას, რომლებიც მათ უკან მდგომ ბიზნესს უკეთ მუშაობაში ეხმარება."
    : "Genezisi builds distinctive websites, AI systems and automation that make the business behind them work better.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        ka: "/ka",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: ka ? "ka_GE" : "en_US",
      siteName: "Genezisi",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SignalHeroPrototype locale={normalizeLocale(locale)} />;
}
