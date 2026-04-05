"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ConversionVisual() {
  const [conversationIndex, setConversationIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setConversationIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 9000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="w-full relative min-h-[220px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {conversationIndex === 0 ? (
          <motion.div key="book-mesh" className="clay-card border border-white/10 bg-[#070707] rounded-2xl p-4 w-[240px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col gap-2" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}>
            <div className="text-[9px] font-space font-bold uppercase tracking-widest text-slate-400">Dynamic Booking Mesh</div>
            <div className="text-[11px] font-bold text-white mt-1">Select A Time:</div>
            <div className="grid grid-cols-4 gap-1">
              {["Mo", "Tu", "We", "Th"].map((day, i) => (
                <div key={i} className={`p-1 text-center rounded-md border text-[9px] font-bold ${i === 2 ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300" : "bg-white/5 border-white/5 text-slate-400"}`}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {["10:00 AM", "11:30 AM"].map((time, i) => (
                <div key={i} className={`p-1 text-center rounded-md border text-[8px] font-bold ${i === 0 ? "bg-emerald-400 text-black" : "bg-white/5 border-white/5 text-slate-300"}`}>{time}</div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full mt-1 bg-white/5 text-white font-space font-bold text-[9px] py-1.5 rounded-xl border border-white/10">Confirm</motion.button>
          </motion.div>
        ) : conversationIndex === 1 ? (
          <motion.div key="checkout-adv" className="clay-card border border-white/10 bg-[#070707] rounded-2xl p-4 w-[240px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col gap-2" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}>
            <div className="text-[9px] font-space font-bold uppercase tracking-widest text-slate-400">Fluid Checkout</div>
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl border border-white/5">
              <div className="text-[10px] font-bold text-white">Elite Template</div>
              <div className="text-xs font-black font-space text-emerald-400">350 ₾</div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full bg-emerald-400 text-black font-space font-bold text-[10px] py-1.5 rounded-xl">Pay 300 ₾</motion.button>
          </motion.div>
        ) : (
          <motion.div key="cta-popover" className="clay-card border border-white/10 bg-[#070707] rounded-2xl p-4 w-[240px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col gap-2 text-center" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}>
            <div className="text-[10px] font-black font-space text-emerald-300">🎉 DISCOUNT APPLIED!</div>
            <p className="text-[9px] text-slate-200">Book within 10 minutes and save absolute layout.</p>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full bg-emerald-400 text-black font-space font-bold text-[10px] py-1.5 rounded-xl">Claim Now</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 bg-black/30 backdrop-blur-md px-1.5 py-0.5 rounded-full">
        {[0, 1, 2].map((idx) => <div key={idx} className={`h-1 w-1 rounded-full ${conversationIndex === idx ? "bg-emerald-400" : "bg-white/20"}`} />)}
      </div>
    </div>
  );
}
