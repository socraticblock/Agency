import { ApplyForm } from "../_components/ApplyForm";
import type { Locale } from "@/lib/i18n";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale;

  return (
    <main className="min-h-screen bg-[#050509] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-xl">
        <ApplyForm locale={lang} />
      </div>
    </main>
  );
}
