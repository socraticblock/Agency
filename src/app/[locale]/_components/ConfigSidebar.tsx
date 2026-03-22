"use client";

import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";
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
  moduleQuantities?: Record<string, number>;
  shieldTier?: number;
  resetAll?: () => void;
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
  moduleQuantities = {},
  shieldTier = 0,
  resetAll
}: ConfigSidebarProps) {
  
  const handleResetAll = () => {
    if (typeof window !== "undefined") {
      const isConfirmed = window.confirm(
        "All configuration data will be deleted and you will go back to Step 1 (Choosing a Foundation).\n\nDo you want to continue?"
      );
      if (isConfirmed && resetAll) resetAll();
    }
  };
  
  const groupedModules = selectedModules.reduce((acc: Record<string, typeof MODULES>, id) => {
    const mod = MODULES.find(m => m.id === id);
    if (mod) {
      if (!acc[mod.category]) acc[mod.category] = [];
      acc[mod.category].push(mod);
    }
    return acc;
  }, {});

  return (
    <div className="w-full lg:w-1/3 flex flex-col lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto sticky lg:top-4 gap-3 pr-2 scrollbar-none">
      <div className="clay-card border border-white/5 bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-4 flex flex-col shadow-xl">
        <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2 mb-2">
          <h4 className="text-sm font-black font-space tracking-tight text-slate-200 uppercase flex items-center gap-1" style={{ WebkitTextStroke: "0.3px rgba(0,0,0,0.8)", textShadow: "0px 1px 3px rgba(0,0,0,0.9)" }}>
            Live Total Updates
          </h4>
          <button
            onClick={() => setIsUSD(!isUSD)}
            className="px-2 py-0.5 rounded-md border border-zinc-700 bg-zinc-800 flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Globe className="h-2.5 w-2.5" /> {isUSD ? "USD" : "GEL"}
          </button>
        </div>

        {/* Configuration Breakdown */}
        {(activeFoundation || (selectedModules && selectedModules.length > 0)) && (
          <div className="border-b border-zinc-800/50 pb-2.5 mb-2.5 flex flex-col gap-2">
            {activeFoundation && (
              <div>
                <span className="text-xs font-black font-space text-zinc-500 uppercase tracking-widest">Selected Foundation</span>
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-200 mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                   {activeFoundation.name}
                </div>
              </div>
            )}

            {selectedModules && selectedModules.length > 0 && (
              <div>
                <span className="text-xs font-black font-space text-zinc-500 uppercase tracking-widest">Active Modules</span>
                <div className="flex flex-col gap-2 mt-1.5">
                  {Object.entries(groupedModules).map(([category, mods]: any) => (
                    <div key={category} className="flex flex-col gap-1">
                      <span className="text-[8px] font-black font-space text-zinc-500 uppercase tracking-wider">
                        [ {category} ]
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {mods.map((mod: any) => (
                          <span key={mod.id} className="flex items-center gap-1 bg-emerald-500/5 border border-emerald-500/10 text-xs font-space font-black text-emerald-300 px-1.5 py-0.5 rounded-md shadow-[0_0_10px_rgba(16,185,129,0.03)]">
                            <div className="h-1 w-1 rounded-full bg-emerald-400" />
                             {mod.name}
                             {moduleQuantities[mod.id] > 1 && (
                               <span className="text-emerald-400 font-extrabold ml-1">x{moduleQuantities[mod.id]}</span>
                             )}
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
            <span className="text-base text-slate-400 font-medium font-space">Total One-Time:</span>
            <motion.span
              key={oneTimeTotal}
              variants={countUpVariants} initial="hidden" animate="visible"
              className="text-xl font-black font-mono text-emerald-400 tracking-tight"
            >
              {activeFoundation?.isBespoke ? (
                <span className="text-sm font-black font-space animate-pulse text-amber-400">Project-Based</span>
              ) : (
                formatPrice(oneTimeTotal)
              )}
            </motion.span>
          </div>

          {!activeFoundation?.isBespoke && (
            <div className="flex justify-between items-center">
              <span className="text-base text-slate-400 font-medium font-space">Monthly Recurring:</span>
              <motion.span
                key={monthlyTotal}
                variants={countUpVariants} initial="hidden" animate="visible"
                className="text-base font-black font-mono text-emerald-300 tracking-tight"
              >
                {formatPrice(monthlyTotal)}
                {monthlyTotal > 0 && "/mo"}
              </motion.span>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-800/50 pt-1.5 flex flex-col gap-1">
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
                <span className="bg-white/5 px-1 rounded font-black text-slate-200 text-[8px]">TBC</span>
                <span className="bg-white/5 px-1 rounded font-black text-slate-200 text-[8px]">BoG</span>
              </div>
            </div>
          )}
          {shieldTier === 3 && (
            <p className="text-[10px] font-black text-indigo-300 font-space tracking-tight flex items-center gap-1 mt-1 bg-indigo-500/10 p-2 rounded border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              🛡️ Algorithm Immunity Active (Circuit-Breakers Enabled).
            </p>
          )}
        </div>



                <div className="border-t border-zinc-800/50 pt-2 flex items-center gap-1 mt-1">
          {[
            { title: "🏛️ 5% Tax", desc: "We operate under a 5% Tax Status in Georgia, passing 65% in overhead savings." },
            { title: "🛡️ No Hostage", desc: "We push all code to your private GitHub. You own the deed in full." },
            { title: "📈 Shield", desc: "Hosting is a place to stay. The Shield is Digital Life Insurance." }
          ].map((item, idx) => (
            <div key={idx} className="group relative flex-1">
              <div className="border border-zinc-800/60 bg-zinc-950/40 px-1 py-1 rounded text-[8px] font-black font-space text-slate-300 hover:text-white hover:border-zinc-700 transition-all text-center cursor-help truncate">
                {item.title}
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-44 p-2 bg-black/95 border border-zinc-800 rounded-lg text-[10px] text-slate-400 shadow-xl backdrop-blur-xl z-50 leading-relaxed text-center">
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {((activeFoundation && !activeFoundation.isBespoke) || (selectedModules && selectedModules.length > 0)) && (
          <button
            onClick={handleResetAll}
            className="w-full mt-3 py-2 bg-red-950/30 hover:bg-red-950/50 border border-red-500/10 hover:border-red-500/30 rounded-xl text-[11px] font-black font-space text-red-400 hover:text-red-300 transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer relative z-50"
          >
            Reset All Configurations
          </button>
        )}


      </div>

      {/* The Kvali Engineering Standard Banner */}
      <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/40 flex flex-col gap-2 backdrop-blur-md mb-2 mt-2">
        <div>
          <span className="text-xs font-black font-space text-emerald-400 uppercase tracking-wider flex items-center gap-1" style={{ WebkitTextStroke: "0.3px rgba(0,0,0,0.8)", textShadow: "0px 1px 3px rgba(0,0,0,0.9)" }}>
            <Sparkles className="h-3.5 w-3.5" /> THE KVALI ENGINEERING STANDARD
          </span>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Headache-Free implementation built into every base:</p>
        </div>
        <div className="flex flex-col gap-1.5 pl-2.5 border-l border-emerald-500/20">
          
          <div className="border-t border-zinc-800/40 pt-1.5 mt-0.5 flex flex-col gap-1">
            {[
              "Total Legal Ownership: You legally own every pixel and line of code under Georgian Law.",
              "Source Code Ownership: Full GitHub transfer. No 'vendor lock-in'—you are never trapped with one developer.",
              "90-Day Tech Warranty: Every build is guaranteed. If a bug appears, we kill it for free.",
              "Project & QA Management: We handle the architecture and testing so you stay in your 'creative zone.'"
            ].map((text, idx) => (
              <div key={idx} className="text-[10px] text-slate-400 leading-relaxed flex items-start gap-1">
                <span className="text-emerald-400 mt-0.5">✅</span> <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
