"use client";

import { m } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Building } from "lucide-react";
import { MODULES, type Foundation, type ServiceItem } from "@/constants/pricing";
import ModuleItem from "../architect/_components/ModuleItem";

interface ModuleGridProps {
  selectedModules: string[];
  toggleModule: (id: string) => void;
  formatPrice: (price: number) => string;
  setDrawerItem: (item: ServiceItem) => void;
  hasGita: boolean;
  goToStep: (s: 1 | 2 | 3) => void;
  activeFoundation?: Foundation | undefined;
  moduleQuantities: Record<string, number>;
  updateQuantity: (id: string, qty: number) => void;
}

export default function ModuleGrid({
  selectedModules,
  toggleModule,
  formatPrice,
  setDrawerItem,
  hasGita,
  goToStep,
  activeFoundation,
  moduleQuantities,
  updateQuantity,
}: ModuleGridProps) {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const recommendedModuleIDs = activeFoundation?.recommendedModules || [];
  const recommendedModules = MODULES.filter((mod) =>
    recommendedModuleIDs.includes(mod.id)
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-black font-space tracking-tight text-white">
          2. Build Your Engine
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Modules shown here are curated for your selected foundation. For add-ons beyond this list, tell us during
          discovery or reach out after you submit—we map bespoke scope in the audit.
        </p>
      </div>

      {recommendedModules.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {recommendedModules.map((mod) => {
            const isSelected = selectedModules.includes(mod.id);
            const isExpanded = expandedModuleId === mod.id;

            return (
              <ModuleItem
                key={`rec-${mod.id}`}
                m={mod}
                isSelected={isSelected}
                isExpanded={isExpanded}
                setExpanded={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                toggleModule={toggleModule}
                formatPrice={formatPrice}
                setDrawerItem={setDrawerItem}
                selectedModules={selectedModules}
                quantity={moduleQuantities[mod.id] ?? 1}
                updateQuantity={updateQuantity}
                activeFoundation={activeFoundation?.id}
              />
            );
          })}
        </div>
      )}

      {hasGita && (
        <m.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl flex items-center gap-2"
        >
          <Building className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-black font-space text-emerald-300">
            GITA Grant Eligible: Potential 150,000 GEL Surcharges fully reimbursable.
          </span>
        </m.div>
      )}

      <div className="flex justify-between mt-2">
        <button
          type="button"
          onClick={() => goToStep(1)}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white font-bold px-4 py-1.5 rounded-lg text-xs font-space transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </button>
        <button
          type="button"
          onClick={() => goToStep(3)}
          className="flex items-center gap-1.5 bg-white text-black font-bold px-4 py-1.5 rounded-lg text-xs font-space hover:bg-emerald-400 transition-colors border-0 shadow-md"
        >
          Secure Setup <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
