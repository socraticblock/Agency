"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { ServiceItem, MODULES } from "@/constants/pricing";

import { memo, useState } from "react";

interface ModuleItemProps {
  m: ServiceItem;
  isSelected: boolean;
  isExpanded: boolean;
  setExpanded: () => void;
  toggleModule: (id: string) => void;
  formatPrice: (p: number) => string;
  setDrawerItem: (item: ServiceItem) => void;
  selectedModules?: string[];
  isRecommended?: boolean;
}

const CARD_STYLES = {
  base: "p-3 rounded-xl border backdrop-blur-md flex justify-between items-center transition-all duration-300",
  selected: "border-emerald-500/30 bg-emerald-500/[0.02]",
  idle: "border-zinc-800/50 bg-zinc-900/20 hover:border-zinc-700"
};

export default memo(function ModuleItem({ m, isSelected, isExpanded, setExpanded, toggleModule, formatPrice, setDrawerItem, selectedModules = [], isRecommended = false }: ModuleItemProps) {
  const [kycChoice, setKycChoice] = useState<'yes' | 'no' | 'self' | 'none'>('none');

  const bankRepModule = MODULES.find(mod => mod.id === 'bank-rep');
  const bankRepPrice = bankRepModule?.priceGEL || 0;

  const displayedPrice = (m.id === 'pay-gateway' && selectedModules.includes('bank-rep'))
    ? m.priceGEL + bankRepPrice
    : m.priceGEL;

  const isHeavyNode = m.category === 'Business Engines' || m.category === 'AI & Automation';

  return (
    <div
      onClick={() => setExpanded()}
      className={`${CARD_STYLES.base} ${isSelected ? 'border-green-400 bg-green-500/[0.02] shadow-[0_0_15px_rgba(34,197,94,0.05)]' : isExpanded ? CARD_STYLES.selected : isRecommended ? 'border-amber-500/30 bg-amber-500/[0.01] hover:border-amber-500/50 shadow-[0_4px_20px_rgba(245,158,11,0.03)]' : CARD_STYLES.idle} cursor-pointer flex-col !items-stretch !justify-start gap-1 ${isHeavyNode ? 'shadow-[0_15px_40px_rgba(0,0,0,0.45)] z-10' : 'z-0'}`}
    >
      {/* Row 1: Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-1.5 max-w-[70%]">
          <span className="text-sm font-black text-white">{m.name}</span>
          {isRecommended && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[8px] font-black font-space text-amber-500 uppercase tracking-wider flex items-center gap-0.5 whitespace-nowrap">
              ★ Architect's Choice
            </span>
          )}
          {m.tooltip && (
            <div className="group relative" onClick={(e) => e.stopPropagation()}>
              <Info className="h-3 w-3 text-slate-500 cursor-help hover:text-emerald-400 transition-colors" />
              <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block w-40 p-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-slate-400 shadow-xl backdrop-blur-xl z-30 leading-relaxed">
                {m.tooltip}
              </div>
            </div>
          )}

        </div>

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <span className="text-base font-black font-space text-emerald-400">{formatPrice(displayedPrice)}</span>
          <button
            onClick={() => {
              if (m.id === 'pay-gateway' && isSelected && selectedModules.includes('bank-rep')) {
                toggleModule('bank-rep');
              }
              toggleModule(m.id);
            }}
            className="font-space font-black text-[9px] uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center"
          >
            {isSelected ? (
              <span className="text-green-400 font-bold flex items-center gap-1">
                <div className="h-1 w-1 bg-green-400 rounded-full animate-pulse" />
                [ STATUS: ONLINE ]
              </span>
            ) : (
              <span className="text-orange-500 font-bold">
                [ STATUS: IDLE ]
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Row 2: Expanded Accordion */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden w-full flex flex-col pt-2 border-t border-white/5 mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 pt-1 border-t border-white/5 mt-1">
              {/* High Density Monospace Tech Tray */}
              <div className="font-mono text-[10px] leading-relaxed bg-zinc-950/20 border border-zinc-800/40 rounded-lg p-2 flex flex-col gap-1.5 text-slate-400">
                {m.timeSaved && (
                  <div className="flex justify-between items-center border-b border-zinc-900/60 pb-1">
                    <span className="text-zinc-500 uppercase">ETA_Reduction:</span>
                    <span className="text-emerald-400">+{m.timeSaved}hr / mo saved</span>
                  </div>
                )}

                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-500 uppercase">What It Is:</span>
                  <p className="text-slate-300 font-sans text-xs leading-normal">{m.description || m.whatItIs || "Standard engine node deployment configuration."}</p>
                </div>

                {m.howItHelps && (
                  <div className="flex flex-col gap-0.5 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">How It Helps / ROI:</span>
                    <p className="text-slate-400 font-sans text-xs leading-normal">{m.howItHelps}</p>
                  </div>
                )}

                {/* Custom Gateway Selection */}
                {m.id === 'pay-gateway' && (
                  <div className="mt-1 flex flex-col gap-1 p-1 bg-black/30 border border-amber-500/10 rounded">
                    <p className="text-[9px] font-black text-amber-500 uppercase">Do you have active Merchant Keys?</p>
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => {
                          setKycChoice('yes');
                          if (selectedModules.includes('bank-rep')) toggleModule('bank-rep');
                        }}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold cursor-pointer ${(kycChoice === 'yes' || (kycChoice === 'none' && !selectedModules.includes('bank-rep'))) ? 'bg-emerald-400 text-slate-950' : 'bg-zinc-800 text-slate-400'}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => {
                          setKycChoice('self');
                          if (selectedModules.includes('bank-rep')) toggleModule('bank-rep');
                        }}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold cursor-pointer ${kycChoice === 'self' ? 'bg-emerald-400 text-slate-950' : 'bg-zinc-800 text-slate-400'}`}
                      >
                        I'll get them
                      </button>
                      <button
                        onClick={() => {
                          setKycChoice('no');
                          if (!selectedModules.includes('bank-rep')) toggleModule('bank-rep');
                        }}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold cursor-pointer ${(kycChoice === 'no' || (kycChoice === 'none' && selectedModules.includes('bank-rep'))) ? 'bg-amber-400 text-slate-950' : 'bg-zinc-800 text-slate-400'}`}
                      >
                        No (+{bankRepPrice.toLocaleString()} ₾)
                      </button>
                    </div>
                  </div>
                )}

                {m.strategy && (
                  <div className="flex flex-col gap-0.5 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">Strategy:</span>
                    <p className="text-slate-400 font-sans text-xs">{m.strategy}</p>
                  </div>
                )}

                {m.strategicBacking && (
                  <div className="flex flex-col gap-1 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">Strategic_Backing:</span>
                    {m.strategicBacking.map((item, id) => (
                      <div key={id} className="p-1 bg-black/20 border border-zinc-800/40 rounded flex flex-col gap-0.5">
                        <p className="text-[10px] font-bold text-white font-sans">{item.title}</p>
                        <p className="text-[9px] text-slate-400">Cost Focus: <span className="text-emerald-400">{item.cost}</span></p>
                      </div>
                    ))}
                  </div>
                )}

                {m.scope && (
                  <div className="flex flex-col gap-0.5 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">Output Node Nodes:</span>
                    <div className="grid grid-cols-1 gap-0.5">
                      {m.scope.map((item, id) => (
                        <div key={id} className="flex items-center gap-1">
                          <div className="h-1 w-1 bg-emerald-400 rounded-full" />
                          <span className="text-[9px] text-slate-300 font-sans">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {m.proFeatures && (
                  <div className="flex flex-col gap-1 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">Addon_Gates:</span>
                    {m.proFeatures.map((feat, i) => (
                      <div key={i} className="text-[9px]">
                        <span className="text-white font-extrabold font-sans">[{feat.title}]</span> <span className="text-slate-500 font-sans">{feat.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Command Buttons */}
              <div className="flex items-center gap-1 mt-1 pt-1.5 border-t border-zinc-900/60">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) toggleModule(m.id);
                    setExpanded();
                  }}
                  className={`flex-1 py-1 px-2 rounded-lg border text-center text-[10px] font-black font-space uppercase tracking-wider transition-all duration-200 cursor-pointer ${isSelected ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] text-emerald-400'}`}
                >
                  {isSelected ? "DEPLOYED ✓" : "DEPLOY MODULE"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) {
                      if (m.id === 'pay-gateway' && selectedModules?.includes('bank-rep')) {
                        toggleModule('bank-rep');
                      }
                      toggleModule(m.id);
                    }
                    setExpanded();
                  }}
                  className="flex-1 py-1 px-2 rounded-lg border border-red-500/30 hover:border-red-500/60 hover:bg-red-500/[0.03] text-red-500/70 hover:text-red-400 text-center text-[10px] font-black font-space uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  SKIP FOR NOW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
