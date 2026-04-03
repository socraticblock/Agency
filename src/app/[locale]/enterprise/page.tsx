import type { Metadata } from "next";
import Link from "next/link";
import { createLocalBusinessSeo } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { Navbar } from "../_components/Navbar";

function normalizeLocale(locale: string | undefined): Locale {
  if (locale && (locale === "en" || locale === "ka")) return locale;
  return "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = normalizeLocale(locale);
  const { metadata } = createLocalBusinessSeo({
    name: lang === "ka" ? "საწარმო | Genezisi" : "Enterprise | Genezisi",
    description:
      lang === "ka"
        ? "საწარმო გადაწყვეტილებები — მალე."
        : "Enterprise solutions — coming soon.",
    locale: lang,
    path: "/enterprise",
  });
  return metadata;
}

export default async function EnterprisePlaceholderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = normalizeLocale(locale);

  return (
    <>
      <Navbar locale={lang} />
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-3xl font-black text-white">
          {lang === "ka" ? "საწარმო" : "Enterprise"}
        </h1>
        <p className="mt-4 text-slate-400">
          {lang === "ka"
            ? "ეს გვერდი მალე შეივსება. ციფრული ვიზიტკისთვის იხილეთ /start."
            : "This page will be expanded soon. For the digital business card, see /start."}
        </p>
        <Link
          href={`/${lang}/start`}
          className="mt-8 inline-block text-emerald-400 underline"
        >
          {lang === "ka" ? "ციფრული ვიზიტკა" : "Digital business card"}
        </Link>
      </main>
    </>
  );
}
