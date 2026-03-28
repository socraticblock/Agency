"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Check } from "lucide-react";
import { type ServiceItem, MODULES } from "@/constants/pricing";

interface ConfigModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  activeFoundation: ServiceItem | null | undefined;
  selectedModules: string[];
  moduleQuantities: Record<string, number>;
  formatPrice: (price: number) => string;
  foundationPrice: number;
}

export default function ConfigModal({
  isModalOpen,
  setIsModalOpen,
  activeFoundation,
  selectedModules,
  moduleQuantities,
  formatPrice,
  foundationPrice,
}: ConfigModalProps) {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          >
            <h4 className="text-base font-black font-space text-white">Infrastructure Blueprint</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Review your active foundation and module selections before downloading.
            </p>

            <div className="flex flex-col gap-1.5 border-y border-zinc-800/40 py-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-300 font-bold">{activeFoundation?.name}</span>
                <span className="text-emerald-400 font-bold">{formatPrice(foundationPrice)}</span>
              </div>
              {selectedModules.map(id => {
                const m = MODULES.find(mod => mod.id === id);
                const qty = moduleQuantities[id] ?? 1;
                return (
                  <div key={id} className="flex justify-between text-[9px] text-slate-500">
                    <span>• {m?.name}{qty > 1 ? ` ×${qty}` : ""}</span>
                    <span>{formatPrice((m?.priceGEL || 0) * qty)}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> 90-Day Tech Warranty Verified.
              </span>
              <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                <Check className="h-3 w-3" /> 100% IP & Code Transfer.
              </span>
            </div>

            <button
              onClick={() => {
                const activeMods = selectedModules.map(id => {
                  const mod = MODULES.find(m => m.id === id);
                  const qty = moduleQuantities[id] ?? 1;
                  const qtyLabel = qty > 1 ? ` ×${qty}` : "";
                  return `${mod?.name || id}${qtyLabel}`;
                }).join('\n  • ');
                const text = `======================================\nGENEZISI ARCHITECT STUDIO: BLUEPRINT\n======================================\nFoundation: ${activeFoundation?.name || "None"}\nBase Cost: ${formatPrice(foundationPrice)}\n\nSelected Modules:\n  • ${activeMods || "None"}\n\nWarranties Included:\n- 90-Day Tech Warranty\n- 100% IP & Code Transfer\n======================================`;
                const blob = new Blob([text], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'infrastructure_blueprint.txt';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="min-h-12 w-full rounded-xl bg-emerald-400 py-3 font-space text-sm font-black text-black transition-colors hover:bg-emerald-300"
            >
              Download Blueprint (.txt)
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mt-2 min-h-11 text-sm text-slate-500 transition-colors hover:text-white"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
