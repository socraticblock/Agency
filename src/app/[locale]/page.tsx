import type { Locale } from "@/lib/i18n";
import { HomeLandingPage } from "./_components/HomeLandingPage";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale;

  return <HomeLandingPage locale={lang} />;
}
