"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { ServiceItem } from "@/constants/pricing";

import { memo } from "react";

interface ModuleItemProps {
  m: ServiceItem;
  isSelected: boolean;
  toggleModule: (id: string) => void;
  formatPrice: (p: number) => string;
  setDrawerItem: (item: ServiceItem) => void;
}

const CARD_STYLES = {
  base: "p-3 rounded-xl border backdrop-blur-md flex justify-between items-center transition-all duration-300",
  selected: "border-emerald-500/30 bg-emerald-500/[0.02]",
  idle: "border-zinc-800/50 bg-zinc-900/20 hover:border-zinc-700"
};

export default memo(function ModuleItem({ m, isSelected, toggleModule, formatPrice, setDrawerItem }: ModuleItemProps) {
  return (
    <div
      className={`${CARD_STYLES.base} ${isSelected ? CARD_STYLES.selected : CARD_STYLES.idle}`}
    >
      <div className="flex flex-col max-w-[70%]">
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-white">{m.name}</span>
          <button onClick={(e) => { e.stopPropagation(); setDrawerItem(m); }} className="text-[10px] text-emerald-400 font-bold underline cursor-pointer ml-1">Spec</button>
          {m.tooltip && (
            <div className="group relative">
              <Info className="h-3 w-3 text-slate-500 cursor-help hover:text-emerald-400 transition-colors" />
              <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block w-40 p-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-slate-400 shadow-xl backdrop-blur-xl z-30 leading-relaxed">
                {m.tooltip}
              </div>
            </div>
          )}
        </div>
        <p className="text-sm text-slate-500 mt-0.5">{m.description || m.whatItIs || ""}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-bold font-space text-emerald-400">{formatPrice(m.priceGEL)}</span>
        <button
          onClick={() => toggleModule(m.id)}
          className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${isSelected ? "bg-emerald-500" : "bg-zinc-800"
            }`}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`h-3 w-3 rounded-full bg-white shadow-md ${isSelected ? "translate-x-3.5" : "translate-x-0"
              }`}
          />
        </button>
      </div>
    </div>
  );
});
