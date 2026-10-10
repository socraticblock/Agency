import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomeJsonLd, getHomeMetadata } from "@/lib/home-seo";
import { isHomeLocale } from "@/lib/home-i18n";
import { SignalHeroPrototype } from "./_components/SignalHeroPrototype";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // An unsupported locale must not advertise a fabricated localised home page;
  // middleware decides what actually reaches this route.
  if (!isHomeLocale(locale)) return {};
  return getHomeMetadata(locale);
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isHomeLocale(locale)) notFound();

  const jsonLd = getHomeJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SignalHeroPrototype locale={locale} />
    </>
  );
}
