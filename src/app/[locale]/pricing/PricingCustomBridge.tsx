import { buildPricingTierWhatsAppUrl } from "@/lib/pricingWhatsApp";

export function PricingCustomBridge() {
  const customSoftwareUrl = buildPricingTierWhatsAppUrl({
    projectType: "custom-software",
  });
  const legacyUrl = buildPricingTierWhatsAppUrl({
    projectType: "legacy-upgrade",
  });

  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0b1327]/80 p-6 text-left shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
        <div className="text-3xl" aria-hidden>
          💻
        </div>
        <h3 className="mt-4 text-xl font-black tracking-tight text-white sm:text-2xl">
          Custom software architecture
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300 sm:text-base">
          Building a private portal, knowledge base, or complex internal tool? We scope proprietary
          solutions from architecture to handoff.
        </p>
        <p className="mt-4 text-sm font-bold text-emerald-400">Starting from 4,000+ ₾</p>
        <a
          href={customSoftwareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-emerald-400/50 bg-transparent px-6 py-3 text-sm font-black uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500/10"
        >
          Discuss on WhatsApp
        </a>
      </div>

      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0b1327]/80 p-6 text-left shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
        <div className="text-3xl" aria-hidden>
          🔄
        </div>
        <h3 className="mt-4 text-xl font-black tracking-tight text-white sm:text-2xl">
          Site rescue & modernization
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300 sm:text-base">
          Legacy stack, slow loads, or fragile integrations? We audit first, then propose a fixed
          modernization path.
        </p>
        <p className="mt-4 text-sm font-bold text-emerald-400">Variable (audit required)</p>
        <a
          href={legacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-emerald-400/50 bg-transparent px-6 py-3 text-sm font-black uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500/10"
        >
          Request audit on WhatsApp
        </a>
      </div>
    </div>
  );
}
