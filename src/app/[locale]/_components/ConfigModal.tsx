"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Check } from "lucide-react";
import { ServiceItem, MODULES } from "@/constants/pricing";

interface ConfigModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  activeFoundation: ServiceItem | null | undefined;
  selectedModules: string[];
  formatPrice: (price: number) => string;
  foundationPrice: number;
}

export default function ConfigModal({
  isModalOpen,
  setIsModalOpen,
  activeFoundation,
  selectedModules,
  formatPrice,
  foundationPrice
}: ConfigModalProps) {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          >
            <h4 className="text-base font-black font-space text-white">Infrastructure Blueprint</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Summary container holding standard active foundation nodes accurately flawlessly.
            </p>

            <div className="flex flex-col gap-1.5 border-y border-zinc-800/40 py-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-300 font-bold">{activeFoundation?.name}</span>
                <span className="text-emerald-400 font-bold">{formatPrice(foundationPrice)}</span>
              </div>
              {selectedModules.map(id => {
                const m = MODULES.find(mod => mod.id === id);
                return (
                  <div key={id} className="flex justify-between text-[9px] text-slate-500">
                    <span>• {m?.name}</span>
                    <span>{formatPrice(m?.priceGEL || 0)}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> 90-Day Tech Warranty Verified.
              </span>
              <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                <Check className="h-3 w-3" /> 100% IP & Code Transfer absolute setups.
              </span>
            </div>

            <input type="email" placeholder="ceo@yourbrand.com" className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-400 text-white mt-1" />
            <button 
              onClick={() => {
                const activeMods = selectedModules.map(id => MODULES.find(m => m.id === id)?.name || id).join('\n  • ');
                const text = `======================================\nKVALI ARCHITECT STUDIO: BLUEPRINT\n======================================\nFoundation: ${activeFoundation?.name || "None"}\nBase Cost: ${formatPrice(foundationPrice)}\n\nSelected Modules:\n  • ${activeMods || "None"}\n\nWarranties Included:\n- 90-Day Tech Warranty\n- 100% IP & Code Transfer absolute setups\n======================================`;
                const blob = new Blob([text], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'infrastructure_blueprint.txt';
                a.click();
                URL.revokeObjectURL(url);
              }} 
              className="w-full bg-emerald-400 text-black font-black font-space py-2 rounded-xl text-xs hover:bg-emerald-300 transition-colors"
            >
              Download Blueprint (.txt)
            </button>
            <button onClick={() => setIsModalOpen(false)} className="text-[10px] text-slate-500 hover:text-white transition-colors mt-1">Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
