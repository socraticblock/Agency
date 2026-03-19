"use client";

import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Building } from "lucide-react";
import { MODULES } from "@/constants/pricing";
import ModuleItem from "../architect/_components/ModuleItem";

interface ModuleGridProps {
  categories: string[];
  selectedModules: string[];
  toggleModule: (id: string) => void;
  formatPrice: (price: number) => string;
  setDrawerItem: (item: any) => void;
  hasGita: boolean;
  goToStep: (s: 1 | 2 | 3) => void;
}

export default function ModuleGrid({
  categories,
  selectedModules,
  toggleModule,
  formatPrice,
  setDrawerItem,
  hasGita,
  goToStep
}: ModuleGridProps) {
  return (
    <m.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-4"
    >
      <div>
        <h3 className="text-xl font-black font-space tracking-tight text-white">2. Build Your Engine</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Categorized transparency containing continuous absolute specifications flawlessly.</p>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <div key={cat} className="flex flex-col gap-1.5">
            <h4 className="text-xs font-black tracking-widest text-slate-500 font-space uppercase">{cat}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MODULES.filter(m => m.category === cat).map((m) => {
                const isSelected = selectedModules.includes(m.id);
                return (
                  <ModuleItem
                    key={m.id}
                    m={m}
                    isSelected={isSelected}
                    toggleModule={toggleModule}
                    formatPrice={formatPrice}
                    setDrawerItem={setDrawerItem}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {hasGita && (
        <m.div
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl flex items-center gap-2"
        >
          <Building className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-black font-space text-emerald-300">GITA Grant Eligible: Potential 150,000 GEL Surcharges fully reimbursable.</span>
        </m.div>
      )}

      <div className="flex justify-between mt-2">
        <button onClick={() => goToStep(1)} className="flex items-center gap-1.5 text-slate-400 hover:text-white font-bold px-4 py-1.5 rounded-lg text-xs font-space transition-colors">
          <ArrowLeft className="h-3 w-3" /> Back
        </button>
        <button onClick={() => goToStep(3)} className="flex items-center gap-1.5 bg-white text-black font-bold px-4 py-1.5 rounded-lg text-xs font-space hover:bg-emerald-400 transition-colors border-0 shadow-md">
          Secure Setup <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </m.div>
  );
}
