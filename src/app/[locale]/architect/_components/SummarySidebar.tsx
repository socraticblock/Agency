"use client";

import { motion } from "framer-motion";
import { Globe, Download } from "lucide-react";
import { ServiceItem } from "@/constants/pricing";

const countUpVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

interface SummarySidebarProps {
  oneTimeTotal: number;
  monthlyTotal: number;
  isUSD: boolean;
  setIsUSD: (val: boolean) => void;
  formatPrice: (price: number) => string;
  savingsUSD: number;
  activeFoundation: ServiceItem | null | undefined;
  setIsModalOpen: (val: boolean) => void;
}

export default function SummarySidebar({
  oneTimeTotal,
  monthlyTotal,
  isUSD,
  setIsUSD,
  formatPrice,
  savingsUSD,
  activeFoundation,
  setIsModalOpen
}: SummarySidebarProps) {
  return (
    <div className="lg:w-1/3 flex flex-col h-fit sticky lg:top-4 gap-3">
      <div className="clay-card border border-white/5 bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col shadow-xl">
        <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2 mb-2">
          <h4 className="text-xs font-black font-space tracking-tight text-white uppercase flex items-center gap-1">
            Live Total Updates
          </h4>
          <button
            onClick={() => setIsUSD(!isUSD)}
            className="px-2 py-0.5 rounded-md border border-zinc-700 bg-zinc-800 flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <Globe className="h-2.5 w-2.5" /> {isUSD ? "USD" : "GEL"}
          </button>
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400 font-medium font-space">Total One-Time:</span>
            <motion.span
              key={oneTimeTotal}
              variants={countUpVariants} initial="hidden" animate="visible"
              className="text-lg font-black font-space text-emerald-400"
            >
              {formatPrice(oneTimeTotal)}
            </motion.span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400 font-medium font-space">Monthly Recurring:</span>
            <motion.span
              key={monthlyTotal}
              variants={countUpVariants} initial="hidden" animate="visible"
              className="text-sm font-black font-space text-emerald-300"
            >
              {formatPrice(monthlyTotal)}
              {monthlyTotal > 0 && "/mo"}
            </motion.span>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 pt-1.5 flex flex-col gap-1">
          <span className="text-xs font-bold text-emerald-400 font-space uppercase flex items-center gap-1">
            Strategic Advantage
          </span>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Saves ≈ <span className="text-emerald-300 font-bold">${savingsUSD.toFixed(0)}</span> compared to Western agencies at $150/hr.
          </p>
          {activeFoundation?.roiNote && (
            <p className="text-xs text-emerald-400 font-bold bg-emerald-500/5 p-1 rounded border border-emerald-500/10 mt-0.5">
              🎯 {activeFoundation.roiNote}
            </p>
          )}
        </div>

        <div className="border-t border-zinc-800/50 pt-2 flex flex-col gap-2">
          <div>
            <span className="text-[10px] font-black font-space text-white uppercase flex items-center gap-1">
              The 5% Tax Advantage
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">We operate under a 5% Tax Status in Georgia, passing 65% in overhead savings directly to you.</p>
          </div>
          <div>
            <span className="text-[10px] font-black font-space text-white uppercase flex items-center gap-1">
              The 'No Hostage' Clause
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">We push all code to your private GitHub. You own the deed to your digital real estate.</p>
          </div>
          <div>
            <span className="text-[10px] font-black font-space text-white uppercase flex items-center gap-1">
              The Shield Metaphor
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Hosting is a place to stay. The Shield is Digital Life Insurance.</p>
          </div>
        </div>
      </div>

      {/* Strategic USP Bullet layout */}
      <div className="flex flex-col gap-1">
        {[
          "✅ 100% IP Transfer: Legal ownership under Georgian Law.",
          "✅ Source Code Ownership: Zero vendor lock-in Full GitHub transfer.",
          "✅ 90-Day Tech Warranty: Every build guaranteed for 3 months."
        ].map((text, idx) => (
          <div key={idx} className="flex items-center gap-1.5 p-2 bg-zinc-900/20 border border-zinc-900/40 rounded-xl text-sm text-slate-300 backdrop-blur-md">
            <span className="font-medium leading-relaxed">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
