import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function TrustSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <section className="bg-[#0f172a] px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-2xl">
        <p className="text-5xl font-bold text-[#10b981] sm:text-6xl">
          {t.trust.stat}
        </p>
        <h2 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">
          {t.trust.headline}
        </h2>
        <p className="mt-4 text-lg text-white/80">
          {t.trust.body}
        </p>
      </div>
    </section>
  );
}
