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
  accessibleModuleIds: string[];
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
  accessibleModuleIds,
}: ModuleGridProps) {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const isEssentialFoundation = activeFoundation?.id === "landing";
  const accessibleIdSet = new Set(accessibleModuleIds);
  const accessibleModules = MODULES.filter((mod) => accessibleIdSet.has(mod.id));
  const lockedModules = MODULES.filter((mod) => !accessibleIdSet.has(mod.id));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-black font-space tracking-tight text-white mb-4">
          2. Build Your Engine
        </h3>

        <div className="mb-6 p-5 bg-emerald-500/[0.03] border border-emerald-500/20 rounded-2xl shadow-[inset_0_1px_0_0_rgba(16,185,129,0.05)]">
          <p className="text-[10px] font-black text-emerald-400 font-space mb-2 flex items-center gap-2 uppercase tracking-[0.2em]">
            🏛️ ARCHITECTURE PROTOCOL
          </p>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Your foundation is a high-performance asset on its own—these modules are optional &apos;plug-ins&apos; designed to scale with you. While this list is pre-validated for your current architecture, it isn&apos;t the limit. If you have a unique software idea for your project, we can architect it. We&apos;ll discuss your vision during the discovery phase and blueprint the custom logic together.
          </p>
        </div>
      </div>

      {isEssentialFoundation ? (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/5 p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">Module Gating</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Essential is intentionally streamlined for fast launch. Add-on modules are unlocked from the
            Professional tier and above.
          </p>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500/20"
          >
            Upgrade Foundation to Unlock Modules
          </button>
        </div>
      ) : null}

      {!isEssentialFoundation && (
        <div className="flex flex-col gap-1.5">
          {accessibleModules.map((mod) => {
            const isSelected = selectedModules.includes(mod.id);
            const isExpanded = expandedModuleId === mod.id;

            return (
              <ModuleItem
                key={`allowed-${mod.id}`}
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

      {!isEssentialFoundation && lockedModules.length > 0 ? (
        <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/30 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Locked For Current Foundation
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Some modules unlock on higher foundations. Upgrade your foundation in Step 1 to access
            advanced enterprise nodes.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {lockedModules.slice(0, 12).map((module) => (
              <span
                key={`locked-${module.id}`}
                className="rounded-md border border-zinc-700/70 bg-zinc-950/60 px-2 py-1 text-[10px] font-bold text-zinc-400"
              >
                {module.name}
              </span>
            ))}
            {lockedModules.length > 12 ? (
              <span className="rounded-md border border-zinc-700/70 bg-zinc-950/60 px-2 py-1 text-[10px] font-bold text-zinc-400">
                +{lockedModules.length - 12} more
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

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

    </div>
  );
}
