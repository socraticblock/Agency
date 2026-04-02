import {
  PRICING_COMPARISON_ROWS,
  type ComparisonRow,
} from "./comparisonData";

function cellClass(
  col: "essential" | "professional" | "command" | "ecommerce",
  highlight?: ComparisonRow["highlightCol"]
): string {
  const base = "px-3 py-3 text-left text-sm text-slate-300 align-top border-b border-white/5";
  if (highlight === col) return `${base} bg-emerald-500/[0.06] text-emerald-100/95`;
  return base;
}

export function PricingComparisonSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:px-16" id="comparison">
      <div className="mb-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-400">
          Compare
        </p>
        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
          Compare at a glance
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
          See exactly what each package includes side by side.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0a1125]/85 shadow-[0_12px_40px_rgba(0,0,0,0.35)] [-webkit-overflow-scrolling:touch]">
        <table className="min-w-[720px] w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.04]">
              <th className="sticky left-0 z-10 min-w-[140px] bg-[#0a1125] px-3 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                Feature
              </th>
              <th className="bg-emerald-500/[0.06] px-3 py-4 text-xs font-black uppercase tracking-wider text-slate-200">
                <span className="block">Essential</span>
                <span className="mt-1 block text-[11px] font-bold normal-case text-slate-400">
                  999 ₾
                </span>
              </th>
              <th className="bg-emerald-500/[0.08] px-3 py-4 text-xs font-black uppercase tracking-wider text-emerald-200">
                <span className="block">Professional</span>
                <span className="mt-1 block text-[11px] font-bold normal-case text-emerald-300/90">
                  2,299 ₾
                </span>
                <span className="mt-1 inline-block rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[9px] tracking-widest text-emerald-200">
                  Recommended
                </span>
              </th>
              <th className="px-3 py-4 text-xs font-black uppercase tracking-wider text-slate-200">
                <span className="block">Command Center</span>
                <span className="mt-1 block text-[11px] font-bold normal-case text-slate-400">
                  4,999 ₾
                </span>
              </th>
              <th className="px-3 py-4 text-xs font-black uppercase tracking-wider text-slate-200">
                <span className="block">E-Commerce HQ</span>
                <span className="mt-1 block text-[11px] font-bold normal-case text-slate-400">
                  17,999 ₾
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {PRICING_COMPARISON_ROWS.map((row, idx) => (
              <tr
                key={row.feature}
                className={idx % 2 === 0 ? "bg-white/[0.02]" : undefined}
              >
                <td className="sticky left-0 z-10 bg-[#0a1125]/95 px-3 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm border-b border-white/5">
                  {row.feature}
                </td>
                <td className={cellClass("essential", row.highlightCol)}>{row.essential}</td>
                <td className={cellClass("professional", row.highlightCol)}>{row.professional}</td>
                <td className={cellClass("command", row.highlightCol)}>{row.commandCenter}</td>
                <td className={cellClass("ecommerce", row.highlightCol)}>{row.ecommerce}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-xs italic text-slate-500">
        “—” means not included in the base package; add-ons can be scoped separately.
      </p>
    </section>
  );
}
