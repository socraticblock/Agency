import { AuditResultsDashboard } from "../_components/AuditResultsDashboard";
import type { Locale } from "@/lib/i18n";

export default async function AuditResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale;

  return <AuditResultsDashboard locale={lang} />;
}
