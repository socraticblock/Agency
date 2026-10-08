"use client";

import { getComparisonData } from "./comparisonData";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
}

export function PricingComparisonSection({ locale }: Props) {
  const rows = getComparisonData(locale);

  const headers = ["Professional", "Command Center", "E-Commerce HQ"];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="mb-8 text-center text-2xl font-black text-white">
        Compare Tiers
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-4 py-3 text-left font-bold text-slate-400">Feature</th>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 text-center font-bold text-white">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={`${i % 2 === 0 ? "bg-white/[0.01]" : ""} border-b border-white/5`}
              >
                <td className="px-4 py-2.5 font-medium text-slate-300">{row.label}</td>
                {row.values.map((v, j) => (
                  <td
                    key={j}
                    className={`px-4 py-2.5 text-center ${
                      v === "✓" ? "text-emerald-400" : v === "—" ? "text-slate-600" : "text-white"
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
