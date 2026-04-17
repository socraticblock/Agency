"use client";

import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";
import { ServiceItem, MODULES } from "@/constants/pricing";
import { WHATSAPP_INTAKE } from "@/constants/content";
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
  step?: number;
  goToStep?: (s: 1 | 2 | 3 | 4 | 5) => void;
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
  resetAll,
  step,
  goToStep,
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
    <div className="w-full lg:w-1/3 flex flex-col lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto sticky lg:top-4 lg:mt-[52px] gap-3 pr-2 scrollbar-none">
      <div className="glass-card border border-white/5 bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-4 flex flex-col shadow-xl">
        <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2 mb-2">
          <h4 className="text-sm font-black font-space tracking-tight text-slate-200 uppercase flex items-center gap-1" style={{ WebkitTextStroke: "0.3px rgba(0,0,0,0.8)", textShadow: "0px 1px 3px rgba(0,0,0,0.9)" }}>
            Live Total Updates
          </h4>
          <button
            type="button"
            onClick={() => setIsUSD(!isUSD)}
            className="flex min-h-10 min-w-[4.5rem] items-center justify-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 text-xs font-bold text-slate-400 transition-colors hover:text-slate-200"
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
                  {Object.entries(groupedModules).map(([category, mods]: [string, ServiceItem[]]) => (
                    <div key={category} className="flex flex-col gap-1">
                      <span className="text-[8px] font-black font-space text-zinc-500 uppercase tracking-wider">
                        [ {category} ]
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {mods.map((mod: ServiceItem) => (
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
          {activeFoundation?.isBespoke ? (
            <div className="bg-black/40 border border-emerald-500/20 rounded-2xl p-4 flex flex-col items-center text-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden group/bespoke">
              {/* Subtle Animated Glow Accent */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-50" />
              
              <div className="relative z-10 flex flex-col gap-1">
                <span className="text-xs font-black font-space text-white/70 uppercase tracking-[0.2em] mb-1">
                  Total One-Time
                </span>
                <span className="text-2xl font-black font-space text-amber-400 animate-pulse tracking-tight" style={{ textShadow: "0 0 15px rgba(251,191,36,0.3)" }}>
                  PROJECT-BASED
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const isUpgrade = activeFoundation.id === 'upgrade';
                  const MSG = isUpgrade 
                    ? "Hi Genezisi! My site [ Add URL ] is acting slow and glitchy. I need an Architect to look under the hood for a Legacy Upgrade audit and custom renovation roadmap. Can we talk?"
                    : "Hi Genezisi! I just explored your Architect tool and I'm interested in a Customized Build. I have a specific project in mind that requires unique software logic. When are you free for a quick Discovery Call to discuss the architecture?";
                  window.open(
                    `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(MSG)}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-space rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative z-10"
              >
                Consult with Architect Directly <Sparkles className="h-4 w-4" />
              </button>

              <div className="relative z-10 text-[9px] font-bold text-emerald-500/40 uppercase tracking-widest font-space">
                [ COMMAND DISPATCH ACTIVE ]
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center group/total">
              <span className="text-base text-slate-400 font-medium font-space">Total One-Time:</span>
              <motion.span
                key={oneTimeTotal}
                variants={countUpVariants} initial="hidden" animate="visible"
                className="text-xl font-black font-mono text-emerald-400 tracking-tight whitespace-nowrap"
              >
                {formatPrice(oneTimeTotal)}
              </motion.span>
            </div>
          )}

          {!activeFoundation?.isBespoke && (
            <div className="flex justify-between items-center">
              <span className="text-base text-slate-400 font-medium font-space">Monthly Recurring:</span>
              <motion.span
                key={monthlyTotal}
                variants={countUpVariants} initial="hidden" animate="visible"
                className="text-base font-black font-mono text-emerald-300 tracking-tight whitespace-nowrap"
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
          <div className="flex flex-col gap-2 mt-3">
            {/* Primary Action Button - Adapts to current step */}
            {step === 1 && activeFoundation && (
              <button
                onClick={() => goToStep && goToStep(2)}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-space rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Configure Modules <Sparkles className="h-3.5 w-3.5" />
              </button>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => goToStep && goToStep(3)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-space rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {selectedModules.length > 0 ? "Confirm & Continue" : "Continue Without Modules"} <Sparkles className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => goToStep && goToStep(1)}
                  className="w-full py-3 border border-white/5 hover:bg-white/5 text-slate-500 hover:text-slate-300 font-bold font-space rounded-xl text-[10px] uppercase tracking-widest transition-all"
                >
                  ← Go Back to Foundations
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => goToStep && goToStep(4)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-space rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Proceed to Strategy Discovery <Sparkles className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => goToStep && goToStep(2)}
                  className="w-full py-3 border border-white/5 hover:bg-white/5 text-slate-500 hover:text-slate-300 font-bold font-space rounded-xl text-[10px] uppercase tracking-widest transition-all"
                >
                  ← Go Back to Module Selection
                </button>
              </div>
            )}

            {step === 4 && (
              <button
                onClick={() => goToStep && goToStep(3)}
                className="w-full py-3 border border-white/5 hover:bg-white/5 text-slate-500 hover:text-slate-300 font-bold font-space rounded-xl text-[10px] uppercase tracking-widest transition-all"
              >
                ← Go Back to Shield Selection
              </button>
            )}

            <button
              onClick={handleResetAll}
              className="w-full py-2 bg-red-950/30 hover:bg-red-950/50 border border-red-500/10 hover:border-red-500/30 rounded-xl text-[11px] font-black font-space text-red-400 hover:text-red-300 transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer relative z-50 mt-1"
            >
              Reset All Configurations
            </button>
          </div>
        )}


      </div>

      {/* The Genezisi Engineering Standard Banner */}
      <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/40 flex flex-col gap-2 backdrop-blur-md mb-2 mt-2">
        <div>
          <span className="text-xs font-black font-space text-emerald-400 uppercase tracking-wider flex items-center gap-1" style={{ WebkitTextStroke: "0.3px rgba(0,0,0,0.8)", textShadow: "0px 1px 3px rgba(0,0,0,0.9)" }}>
            <Sparkles className="h-3.5 w-3.5" /> THE GENEZISI ENGINEERING STANDARD
          </span>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Headache-Free implementation built into every base:</p>
        </div>
        <div className="flex flex-col gap-1.5 pl-2.5 border-l border-emerald-500/20">

          <div className="border-t border-zinc-800/40 pt-1.5 mt-0.5 flex flex-col gap-1">
            {[
              "Total Legal Ownership: You legally own every pixel and line of code under Georgian Law.",
              "Source Code Ownership: Full GitHub transfer. No 'vendor lock-in'—you are never trapped with one developer.",
              "Tier Warranty: Professional 45 days; Command Center 75 days; E-Commerce HQ 100 days.",
              "Project & QA Management: We handle the architecture and testing so you stay in your 'creative zone.'"
            ].map((text, idx) => (
              <div key={idx} className="text-[10px] text-slate-400 leading-relaxed flex items-start gap-1">
                <span className="text-emerald-400 mt-0.5">✅</span> <span>{text}</span>
              </div>
            ))}

            <div className="text-[10px] text-slate-400 leading-relaxed flex items-start gap-1">
              <span className="text-emerald-400 mt-0.5">✅</span>
              <div className="min-w-0 flex-1">
                <details className="group relative">
                  <summary
                    className="list-none cursor-pointer select-none rounded-md outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-0 [&::-webkit-details-marker]:hidden"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="min-w-0">
                        <span className="font-black text-slate-100">Revision Policy</span>{" "}
                        <span className="text-slate-500 font-medium">— Built into every foundation:</span>{" "}
                        <span className="text-slate-400">
                          Professional:{" "}
                          <span className="font-black text-slate-200">2</span> • Command:{" "}
                          <span className="font-black text-slate-200">3</span> • E-commerce:{" "}
                          <span className="font-black text-slate-200">4</span> rounds
                        </span>
                      </div>
                      <span className="shrink-0 text-[8px] text-slate-500 transition-transform duration-200 group-open:rotate-180">
                        ▼
                      </span>
                    </div>
                  </summary>

                  <div className="mt-1 md:mt-0 md:absolute md:bottom-full md:mb-2 md:left-0 md:right-0 md:z-[60] md:rounded-xl md:border md:border-zinc-800/60 md:bg-zinc-950/95 md:p-3 md:shadow-2xl md:backdrop-blur-xl">
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap gap-x-1">
                        <span className="font-black text-slate-200">ESSENTIAL:</span>
                        <span>1 revision round included</span>
                      </div>
                      <div className="flex flex-wrap gap-x-1">
                        <span className="font-black text-slate-200">PROFESSIONAL:</span>
                        <span>2 revision rounds included</span>
                      </div>
                      <div className="flex flex-wrap gap-x-1">
                        <span className="font-black text-slate-200">COMMAND CENTER:</span>
                        <span>3 revision rounds included</span>
                      </div>
                      <div className="flex flex-wrap gap-x-1">
                        <span className="font-black text-slate-200">E-COMMERCE HQ:</span>
                        <span>4 revision rounds included</span>
                      </div>
                    </div>

                    <div className="mt-1 pl-2 border-l-2 border-emerald-500/20 text-slate-400">
                      <p className="text-slate-300/90 font-bold mb-0.5">
                        What counts as ONE revision round:
                      </p>
                      <ul className="space-y-0.5">
                        <li>→ Feedback collected within 48 hours of delivery</li>
                        <li>→ Batched changes (not piecemeal requests)</li>
                        <li>→ Same scope as original brief</li>
                      </ul>
                    </div>

                    <p className="mt-1 text-slate-500 italic">
                      Additional revisions: 75 ₾/hour or bundle in Active Shield plan
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
