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
}

const CARD_STYLES = {
  base: "p-3 rounded-xl border backdrop-blur-md flex justify-between items-center transition-all duration-300",
  selected: "border-emerald-500/30 bg-emerald-500/[0.02]",
  idle: "border-zinc-800/50 bg-zinc-900/20 hover:border-zinc-700"
};

export default memo(function ModuleItem({ m, isSelected, isExpanded, setExpanded, toggleModule, formatPrice, setDrawerItem, selectedModules = [] }: ModuleItemProps) {
  const [kycChoice, setKycChoice] = useState<'yes' | 'no' | 'self' | 'none'>('none');

  const bankRepModule = MODULES.find(mod => mod.id === 'bank-rep');
  const bankRepPrice = bankRepModule?.priceGEL || 0;
  
  const displayedPrice = (m.id === 'pay-gateway' && selectedModules.includes('bank-rep'))
    ? m.priceGEL + bankRepPrice
    : m.priceGEL;

  return (
    <div
      onClick={() => setExpanded()}
      className={`${CARD_STYLES.base} ${isExpanded ? CARD_STYLES.selected : CARD_STYLES.idle} cursor-pointer flex-col !items-stretch !justify-start gap-1 ${isSelected && !isExpanded ? 'border-emerald-500/20 bg-emerald-500/[0.01]' : ''}`}
    >
      {/* Row 1: Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-1 max-w-[70%]">
          <span className="text-sm font-black text-white">{m.name}</span>
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
            className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${isSelected ? "bg-emerald-500" : "bg-zinc-800"}`}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`h-3 w-3 rounded-full bg-white shadow-md ${isSelected ? "translate-x-3.5" : "translate-x-0"}`}
            />
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
            <div className="flex flex-col gap-0.5">
              <p className="text-[10px] font-black font-space uppercase tracking-wider text-emerald-400">What it is</p>
              <p className="text-xs text-slate-300 leading-normal">{m.description || m.whatItIs || ""}</p>
            </div>

            {m.id === 'pay-gateway' && (
              <div className="mt-2.5 flex flex-col gap-1.5 pt-2 border-t border-dashed border-white/5">
                <p className="text-[10px] font-black font-space text-white uppercase tracking-wider">Do you have active Merchant Keys?</p>
                <div className="flex flex-wrap gap-1">
                  <button 
                    onClick={() => {
                      setKycChoice('yes');
                      if (selectedModules.includes('bank-rep')) toggleModule('bank-rep');
                    }}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold font-space cursor-pointer ${(kycChoice === 'yes' || (kycChoice === 'none' && !selectedModules.includes('bank-rep'))) ? 'bg-emerald-400 text-slate-950 shadow-[0_2px_10px_rgba(16,185,129,0.2)]' : 'bg-zinc-800/80 text-slate-400'}`}
                  >
                    Yes, I do
                  </button>
                  <button 
                    onClick={() => {
                      setKycChoice('self');
                      if (selectedModules.includes('bank-rep')) toggleModule('bank-rep');
                    }}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold font-space cursor-pointer ${kycChoice === 'self' ? 'bg-emerald-400 text-slate-950 shadow-[0_2px_10px_rgba(16,185,129,0.2)]' : 'bg-zinc-800/80 text-slate-400'}`}
                  >
                    Not yet, I'll get them
                  </button>
                  <button 
                    onClick={() => {
                      setKycChoice('no');
                      if (!selectedModules.includes('bank-rep')) toggleModule('bank-rep');
                    }}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold font-space cursor-pointer ${(kycChoice === 'no' || (kycChoice === 'none' && selectedModules.includes('bank-rep'))) ? 'bg-amber-400 text-slate-950 shadow-[0_2px_10px_rgba(245,158,11,0.2)]' : 'bg-zinc-800/80 text-slate-400'}`}
                  >
                    No, Lawyer handles onboarding (+{bankRepPrice.toLocaleString()} ₾)
                  </button>
                </div>
              </div>
            )}

            {m.strategy && (
              <div className="mt-2 border-t border-dashed border-white/5 pt-1.5 flex flex-col gap-0.5">
                <p className="text-[10px] font-black font-space uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                   Strategy Setup
                </p>
                <p className="text-xs text-slate-400 leading-normal">{m.strategy}</p>
              </div>
            )}

            {m.howItHelps && (
              <div className="mt-2 border-t border-dashed border-white/5 pt-1.5 flex flex-col gap-0.5">
                <p className="text-[10px] font-black font-space uppercase tracking-wider text-emerald-400">Business ROI / How it Helps</p>
                <p className="text-xs text-slate-300 leading-normal">{m.howItHelps}</p>
              </div>
            )}

            {m.strategicBacking && (
              <div className="mt-2 border-t border-dashed border-white/5 pt-1.5 flex flex-col gap-1.5">
                <p className="text-[10px] font-black font-space uppercase tracking-wider text-emerald-400">Strategic Backing: Why Upgrade?</p>
                {m.strategicBacking.map((item, id) => (
                  <div key={id} className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col gap-0.5">
                    <p className="text-xs font-black text-white">{item.title}</p>
                    <p className="text-[10px] text-slate-400"><span className="text-emerald-400 font-bold">The Fact:</span> {item.fact}</p>
                    <p className="text-[10px] text-slate-300 font-bold bg-emerald-500/5 p-1 rounded mt-0.5 border border-emerald-500/10"><span className="text-white">The Cost:</span> {item.cost}</p>
                  </div>
                ))}
              </div>
            )}

            {m.scope && (
              <div className="mt-2 border-t border-dashed border-white/5 pt-1.5 flex flex-col gap-1">
                <p className="text-[10px] font-black font-space uppercase tracking-wider text-emerald-400">What you get in this node</p>
                <ul className="grid grid-cols-1 gap-0.5">
                  {m.scope.map((item, id) => (
                    <li key={id} className="text-xs text-slate-300 flex items-center gap-1.5">
                      <div className="h-1 w-1 bg-emerald-400 rounded-full flex-none" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {m.proFeatures && (
              <div className="mt-2 border-t border-dashed border-white/5 pt-1.5 flex flex-col gap-1">
                <p className="text-[10px] font-black font-space uppercase tracking-wider text-emerald-400">Pro Features</p>
                <div className="grid grid-cols-1 gap-1">
                  {m.proFeatures.map((feat, i) => (
                    <div key={i} className="p-1.5 border border-zinc-800 bg-zinc-900/40 rounded-lg">
                      <p className="text-xs font-bold text-white">{feat.title}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {m.lawyerRole && (
              <div className="mt-2 flex flex-col gap-0.5 border-t border-dashed border-white/5 pt-1.5">
                <div className="flex items-center gap-1 text-[10px] text-amber-400 font-black uppercase tracking-wider">
                  <span>⚖️ Counsel Sync</span>
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  We operate in sync with our law firm to {m.lawyerRole.charAt(0).toLowerCase() + m.lawyerRole.slice(1)}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
