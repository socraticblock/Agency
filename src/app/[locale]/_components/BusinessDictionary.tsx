"use client";

import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function BusinessDictionary({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <section className="mx-auto max-w-4xl px-4 pb-24 pt-2 sm:px-6">
      <h2 className="text-center text-lg font-semibold text-slate-300 sm:text-xl">
        {t.dictionary.heading}
      </h2>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur-xl sm:px-8">
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {t.dictionary.rows.map((row, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <dt className="text-sm font-medium text-slate-400 sm:w-44 sm:shrink-0">
                {row.tech}
              </dt>
              <dd className="text-sm text-slate-200">{row.result}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
