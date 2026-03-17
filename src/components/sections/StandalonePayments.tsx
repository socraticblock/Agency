"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Lock, PenTool, ShieldCheck, Building, CheckCircle2 } from "lucide-react";
import { LegalRoadmap } from "@/components/modals/LegalRoadmap";

export function StandalonePaymentCard({ onLearnMore, onShowRoadmap }: { onLearnMore: (tier: "tech" | "glove") => void, onShowRoadmap: () => void }) {
  const [tier, setTier] = useState<"tech" | "glove">("tech");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    { title: "POA Signing", desc: "We provide the bank-vetted template.", icon: PenTool },
    { title: "Notary/Apostille", desc: "Your local signature verified for Georgia.", icon: ShieldCheck },
    { title: "Bank Filing", desc: "Our legal team submits at TBC/BoG headquarters.", icon: Building },
    { title: "Live Checkout", desc: "Technical handshake & automated receipting active.", icon: CheckCircle2 }
  ];

  return (
    <>
      <motion.article
        layout
        className="relative cursor-pointer p-6 text-left transition-all hover:-translate-y-1 clay-card clay-card-hover min-h-[260px] flex flex-col justify-between"
      >
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
            Native Payment Integration
          </h3>

          {/* Toggle (Segmented Control) */}
          <div className="mt-4 flex rounded-xl bg-white/5 p-1 relative z-10 w-full max-w-[240px]">
            {["tech", "glove"].map((mode) => (
              <button
                key={mode}
                onClick={(e) => {
                  e.stopPropagation();
                  setTier(mode as "tech" | "glove");
                }}
                className={`relative flex-1 py-1 px-3 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${tier === mode ? "text-black" : "text-slate-400 hover:text-white"
                  }`}
              >
                {tier === mode && (
                  <motion.div
                    layoutId="active-payment-bg"
                    className="absolute inset-0 bg-emerald-400 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {mode === "tech" ? "Technical" : "Hands-off"}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="mt-6 flex-1 min-h-[70px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tier}
                initial={{ opacity: 0, x: tier === "tech" ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: tier === "tech" ? 10 : -10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="text-white"
              >
                <p className="text-2xl font-bold">
                  {tier === "tech" ? "₾1,200" : "₾2,500+"}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {tier === "tech"
                    ? "We integrate your existing Merchant Keys. Server-side Next.js logic. Zero latency."
                    : "Total Administrative Freedom. We handle the POA, bank visits, and KYC. You only sign once."}
                </p>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={() => onLearnMore(tier)}
          className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-white relative z-10 w-full text-left"
        >
          See what's included →
        </button>
      </motion.article>


    </>
  );
}
