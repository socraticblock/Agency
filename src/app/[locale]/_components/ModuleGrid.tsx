"use client";

import { m } from "framer-motion";
import { useState } from "react";
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
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-black font-space tracking-tight text-white">2. Build Your Engine</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Categorized transparency containing continuous absolute specifications flawlessly.</p>
        
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[10px] font-black font-space uppercase transition-all tracking-wider md:hover:scale-105 active:scale-95 cursor-pointer ${
                selectedCategory === cat 
                  ? "bg-emerald-400 text-slate-950 shadow-[0_3px_12px_rgba(16,185,129,0.25)]" 
                  : "bg-zinc-900 border border-zinc-800/80 text-slate-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-full">
          {MODULES
            .filter(m => m.id !== 'bank-rep')
            .filter(m => selectedCategory === "All" || m.category === selectedCategory)
            .map((m) => {
            const isSelected = selectedModules.includes(m.id);
            const isExpanded = expandedModuleId === m.id;

            return (
              <ModuleItem
                key={m.id}
                m={m}
                isSelected={isSelected}
                isExpanded={isExpanded}
                setExpanded={() => setExpandedModuleId(isExpanded ? null : m.id)}
                toggleModule={toggleModule}
                formatPrice={formatPrice}
                setDrawerItem={setDrawerItem}
                selectedModules={selectedModules}
              />
            );
          })}
        </div>
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
    </div>
  );
}
