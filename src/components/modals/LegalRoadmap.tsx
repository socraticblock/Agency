"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Lock } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { title: "Legal Protocol", desc: "We provide the specialized POA template and legal briefing. You sign; we finalize the administrative file." },
  { title: "Authentication", desc: "We coordinate the Notary and Apostille verification to satisfy the strict security compliance of Georgian banks." },
  { title: "Agency Representation", desc: "Our legal team physically submits your application to TBC/BoG and manages the technical back-and-forth until your Merchant ID is issued." },
  { title: "Digital Handover", desc: "We wire the secure API keys into your Next.js infrastructure and push the native GEL checkout to live production." }
];

export function LegalRoadmap({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl rounded-3xl glass-card p-8 border border-white/10 shadow-2xl flex flex-col items-center text-center cursor-default"
          >
            <button onClick={onClose} className="absolute right-5 top-5 text-slate-500 hover:text-white text-xs font-bold">[X]</button>

            <Lock className="h-8 w-8 text-emerald-400 mb-2" />
            <h4 className="text-xl font-space font-black uppercase tracking-tight text-white mb-2">
              The Hands-off Launch Sequence
            </h4>
            <p className="text-xs text-slate-400 max-w-md mb-6">
              Skip the red tape. Here's exactly how we handle the operations behind your payment integration.
            </p>

            {/* Stepper Grid (Production Code Inserted) */}
            <div className="w-full py-4">
              <div className="flex justify-between relative">
                {/* The Animated Connecting Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute top-5 left-0 h-[2px] bg-emerald-500/30 z-0"
                />

                {steps.map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center group flex-1">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold mb-4 group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <h4 className="text-white text-[12px] font-bold tracking-tight">{step.title}</h4>
                    <p className="text-slate-400 text-[9px] text-center max-w-[90px] mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
