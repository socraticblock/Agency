import {
  PRICING_COMPARISON_DETAIL_ROWS,
  type ComparisonRow,
} from "./comparisonData";
import { getOrderedPricingFoundations, priceDisplayLabel } from "./pricingTierData";

function cellClass(
  col: "essential" | "professional" | "command" | "ecommerce",
  highlight?: ComparisonRow["highlightCol"]
): string {
  const base = "px-3 py-3 text-left text-sm text-slate-300 align-top border-b border-white/5";
  if (highlight === col) return `${base} bg-emerald-500/[0.06] text-emerald-100/95`;
  return base;
}

export function PricingComparisonSection() {
  const tiers = getOrderedPricingFoundations();
  const [e, p, c, eco] = tiers;

  const priceRow: ComparisonRow = {
    feature: "Price",
    essential: priceDisplayLabel(e),
    professional: priceDisplayLabel(p),
    commandCenter: priceDisplayLabel(c),
    ecommerce: priceDisplayLabel(eco),
    highlightCol: "professional",
  };

  const rows = [priceRow, ...PRICING_COMPARISON_DETAIL_ROWS];

  const headerTiers = [
    { key: "essential" as const, tier: e },
    { key: "professional" as const, tier: p },
    { key: "command" as const, tier: c },
    { key: "ecommerce" as const, tier: eco },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" id="comparison">
      <div className="mb-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-400">Compare</p>
        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">Compare at a glance</h2>
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
              {headerTiers.map(({ key, tier }) => {
                const isRec = tier.isRecommendedTier;
                const isProCol = key === "professional";
                const priceStr = priceDisplayLabel(tier);
                return (
                  <th
                    key={tier.id}
                    className={`px-3 py-4 text-xs font-black uppercase tracking-wider ${
                      isProCol
                        ? "bg-emerald-500/[0.08] text-emerald-200"
                        : "text-slate-200"
                    }`}
                  >
                    <span className="flex items-start gap-1.5">
                      {tier.emoji && <span className="text-base leading-none">{tier.emoji}</span>}
                      <span className="block">{tier.name}</span>
                    </span>
                    <span
                      className={`mt-1 block text-[11px] font-bold normal-case ${
                        isProCol ? "text-emerald-300/90" : "text-slate-400"
                      }`}
                    >
                      {priceStr}
                    </span>
                    {isRec && (
                      <span className="mt-1 inline-block rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[9px] tracking-widest text-emerald-200">
                        Recommended
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.feature} className={idx % 2 === 0 ? "bg-white/[0.02]" : undefined}>
                <td className="sticky left-0 z-10 border-b border-white/5 bg-[#0a1125]/95 px-3 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm">
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
