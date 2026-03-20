import { BookStrategyView } from "../_components/BookStrategyView";
import { FunnelShell } from "../_components/FunnelShell";
import type { Locale } from "@/lib/i18n";

export default async function BookStrategyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale;

  return (
    <FunnelShell locale={lang}>
      <main className="min-h-screen bg-[#050505] px-4 py-16 sm:px-6">
        <BookStrategyView locale={lang} />
      </main>
    </FunnelShell>
  );
}
