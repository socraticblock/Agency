import { Navbar } from "../_components/Navbar";
import type { Locale } from "@/lib/i18n";

function normalizeLocale(locale: string | undefined): Locale {
  if (locale && (locale === "en" || locale === "ka")) return locale;
  return "en";
}

export default async function StartLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = normalizeLocale(locale);

  return (
    <>
      <Navbar locale={lang} />
      {children}
    </>
  );
}
