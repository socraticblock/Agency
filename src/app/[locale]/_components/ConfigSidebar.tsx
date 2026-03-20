"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { ServiceItem, MODULES } from "@/constants/pricing";
import { memo } from "react";

const countUpVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: [1, 1.05, 1],
    transition: { 
      opacity: { duration: 0.15 },
      y: { type: "spring", stiffness: 400, damping: 25 },
      scale: { duration: 0.4, ease: "linear" }
    } 
  }
};

interface ConfigSidebarProps {
  oneTimeTotal: number;
  monthlyTotal: number;
  isUSD: boolean;
  setIsUSD: (val: boolean) => void;
  formatPrice: (price: number) => string;
  savingsUSD: number;
  activeFoundation: ServiceItem | null | undefined;
  setIsModalOpen: (val: boolean) => void;
  totalHoursSaved?: number;
  selectedModules?: string[];
  shieldTier?: number;
}

export default memo(function ConfigSidebar({
  oneTimeTotal,
  monthlyTotal,
  isUSD,
  setIsUSD,
  formatPrice,
  savingsUSD,
  activeFoundation,
  setIsModalOpen,
  totalHoursSaved = 0,
  selectedModules = [],
  shieldTier = 0
}: ConfigSidebarProps) {
  
  const groupedModules = selectedModules.reduce((acc: Record<string, typeof MODULES>, id) => {
    const mod = MODULES.find(m => m.id === id);
    if (mod) {
      if (!acc[mod.category]) acc[mod.category] = [];
      acc[mod.category].push(mod);
    }
    return acc;
  }, {});

  return (
    <div className="lg:w-1/3 flex flex-col max-h-[calc(100vh-120px)] overflow-y-auto sticky lg:top-4 gap-3 pr-2 scrollbar-none">
      <div className="clay-card border border-white/5 bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col shadow-xl">
        <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2 mb-2">
          <h4 className="text-xs font-black font-space tracking-tight text-white uppercase flex items-center gap-1">
            Live Total Updates
          </h4>
          <button
            onClick={() => setIsUSD(!isUSD)}
            className="px-2 py-0.5 rounded-md border border-zinc-700 bg-zinc-800 flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <Globe className="h-2.5 w-2.5" /> {isUSD ? "USD" : "GEL"}
          </button>
        </div>

        {/* Configuration Breakdown */}
        {(activeFoundation || (selectedModules && selectedModules.length > 0)) && (
          <div className="border-b border-zinc-800/50 pb-2.5 mb-2.5 flex flex-col gap-2">
            {activeFoundation && (
              <div>
                <span className="text-[9px] font-black font-space text-slate-500 uppercase tracking-widest">Selected Foundation</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                   {activeFoundation.name}
                </div>
              </div>
            )}

            {selectedModules && selectedModules.length > 0 && (
              <div>
                <span className="text-[9px] font-black font-space text-slate-500 uppercase tracking-widest">Active Modules</span>
                <div className="flex flex-col gap-2 mt-1.5">
                  {Object.entries(groupedModules).map(([category, mods]: any) => (
                    <div key={category} className="flex flex-col gap-1">
                      <span className="text-[8px] font-black font-space text-zinc-500 uppercase tracking-wider">
                        [ {category} ]
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {mods.map((mod: any) => (
                          <span key={mod.id} className="flex items-center gap-1 bg-emerald-500/5 border border-emerald-500/10 text-[9px] font-space font-black text-emerald-300 px-1.5 py-0.5 rounded-md shadow-[0_0_10px_rgba(16,185,129,0.03)]">
                            <div className="h-1 w-1 rounded-full bg-emerald-400" />
                            {mod.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2 mb-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400 font-medium font-space">Total One-Time:</span>
            <motion.span
              key={oneTimeTotal}
              variants={countUpVariants} initial="hidden" animate="visible"
              className="text-lg font-black font-mono text-emerald-400 tracking-tight"
            >
              {formatPrice(oneTimeTotal)}
            </motion.span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400 font-medium font-space">Monthly Recurring:</span>
            <motion.span
              key={monthlyTotal}
              variants={countUpVariants} initial="hidden" animate="visible"
              className="text-sm font-black font-mono text-emerald-300 tracking-tight"
            >
              {formatPrice(monthlyTotal)}
              {monthlyTotal > 0 && "/mo"}
            </motion.span>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 pt-1.5 flex flex-col gap-1">
          <span className="text-xs font-bold text-emerald-400 font-space uppercase flex items-center gap-1">
            Strategic Advantage
          </span>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Saves ≈ <span className="text-emerald-300 font-bold">${savingsUSD.toFixed(0)}</span> compared to Western agencies at $150/hr.
          </p>
          {totalHoursSaved > 0 && (
            <p className="text-xs font-black text-emerald-300 font-space tracking-tight flex items-center gap-1 mt-1 bg-emerald-500/5 p-1.5 rounded border border-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.05)] animate-pulse">
              🔥 +{totalHoursSaved} Hours/week Reclaimed
            </p>
          )}
          {activeFoundation?.roiNote && (
            <p className="text-xs text-emerald-400 font-bold bg-emerald-500/5 p-1 rounded border border-emerald-500/10 mt-0.5">
              🎯 {activeFoundation.roiNote}
            </p>
          )}
          {selectedModules.includes('fiscal-sync') && (
            <p className="text-[10px] font-black text-emerald-300 font-space tracking-tight flex items-center gap-1 mt-1 bg-emerald-500/10 p-2 rounded border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              🛡️ 1% Tax Guardrail Active (Monitoring 500K GEL limit).
            </p>
          )}
          {selectedModules.includes('pay-gateway') && (
            <div className="text-[9px] font-bold text-slate-300 font-space tracking-tight flex items-center justify-between gap-1 mt-1 bg-zinc-900 border border-zinc-800 p-2 rounded-lg">
              <span>🏦 TBC / BoG Gateway API Bridge setup triggers.</span>
              <div className="flex gap-1">
                <span className="bg-white/5 px-1 rounded font-black text-white text-[8px]">TBC</span>
                <span className="bg-white/5 px-1 rounded font-black text-white text-[8px]">BoG</span>
              </div>
            </div>
          )}
          {shieldTier === 3 && (
            <p className="text-[10px] font-black text-indigo-300 font-space tracking-tight flex items-center gap-1 mt-1 bg-indigo-500/10 p-2 rounded border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              🛡️ Algorithm Immunity Active (Circuit-Breakers Enabled).
            </p>
          )}
        </div>

        <div className="border-t border-zinc-800/50 pt-2 flex flex-col gap-2">
          <div>
            <span className="text-[10px] font-black font-space text-white uppercase flex items-center gap-1">
              The 5% Tax Advantage
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">We operate under a 5% Tax Status in Georgia, passing 65% in overhead savings directly to you.</p>
          </div>
          <div>
            <span className="text-[10px] font-black font-space text-white uppercase flex items-center gap-1">
              The 'No Hostage' Clause
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">We push all code to your private GitHub. You own the deed to your digital real estate.</p>
          </div>
          <div>
            <span className="text-[10px] font-black font-space text-white uppercase flex items-center gap-1">
              The Shield Metaphor
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Hosting is a place to stay. The Shield is Digital Life Insurance.</p>
          </div>
        </div>
      </div>

      {/* Strategic USP Bullet layout */}
      <div className="flex flex-col gap-1">
        {[
          "✅ 100% IP Transfer: Legal ownership under Georgian Law.",
          "✅ Source Code Ownership: Zero vendor lock-in Full GitHub transfer.",
          "✅ 90-Day Tech Warranty: Every build guaranteed for 3 months."
        ].map((text, idx) => (
          <div key={idx} className="flex items-center gap-1.5 p-2 bg-zinc-900/20 border border-zinc-900/40 rounded-xl text-sm text-slate-300 backdrop-blur-md">
            <span className="font-medium leading-relaxed">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
