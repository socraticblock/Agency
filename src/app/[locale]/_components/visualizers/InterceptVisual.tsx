"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InterceptVisual() {
  const [lang, setLang] = useState<"EN" | "GE" | "RU">("EN");
  const [isPaid, setIsPaid] = useState(false);
  const [selectedBank, setSelectedBank] = useState<"tbc" | "bog" | null>(null);

  const text = {
    EN: { summary: "Order Summary", item: "Elite Implementation", pay: "Pay with" },
    GE: { summary: "შეკვეთის ჯამი", item: "ელიტური იმპლემენტაცია", pay: "გადახდა" },
    RU: { summary: "Сумма заказа", item: "Элитная реализация", pay: "Оплатить с" }
  };

  return (
    <div className="w-full h-[220px] flex items-center justify-center p-2 relative">
      {/* Persistent Checkout Component */}
      <motion.div
        layoutId="checkout-container"
        layout="position"
        initial={false}
        animate={{
          opacity: !isPaid ? 1 : 0,
          scale: !isPaid ? 1 : 0.9,
          pointerEvents: !isPaid ? "auto" : "none",
          zIndex: !isPaid ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] bg-[#090909] border border-white/10 rounded-2xl p-3 flex flex-col gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
      >
        {/* Header Language Toggle */}
        <div className="flex justify-between items-center bg-white/5 rounded-xl p-0.5">
          {["EN", "GE", "RU"].map((l) => (
            <button
              key={l}
              onClick={(e) => {
                e.stopPropagation();
                setLang(l as any);
              }}
              className={`px-2 py-1 rounded-lg text-[9px] font-bold font-space transition-all w-full text-center ${
                lang === l ? "bg-emerald-400 text-black shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="space-y-1.5 border-b border-white/5 pb-2 border-dashed"
          >
            <div className="text-[9px] font-space font-bold uppercase tracking-wider text-slate-500">{text[lang].summary}</div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white font-semibold">{text[lang].item}</span>
              <span className="text-xs font-black font-space text-emerald-300">350 ₾</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Payment Selection */}
        <div className="space-y-1.5">
          <div className="text-[8px] font-bold text-slate-400 mb-1">{text[lang].pay}:</div>
          <div className="grid grid-cols-2 gap-1.5">
            {["tbc", "bog"].map((bank) => (
              <button
                key={bank}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBank(bank as any);
                  setTimeout(() => setIsPaid(true), 600);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                  selectedBank === bank
                    ? "border-emerald-400 bg-emerald-500/5"
                    : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                }`}
              >
                <div className="h-5 w-8 flex items-center justify-center">
                  {bank === "tbc" ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="#00A0E3"/>
                      <path d="M6 12h12M12 6v12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#FF5000"/>
                      <path d="M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-[9px] font-black font-space mt-1 uppercase text-white">
                  {bank === "tbc" ? "TBC" : "BOG"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Persistent Success Component */}
      <motion.div
        initial={false}
        animate={{
          opacity: isPaid ? 1 : 0,
          scale: isPaid ? 1 : 0.8,
          pointerEvents: isPaid ? "auto" : "none",
          zIndex: isPaid ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[140px] bg-[#0c0c0c] border border-emerald-500/30 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden"
      >
        <div className="h-9 w-9 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>

        <div className="text-center">
          <div className="text-[10px] font-black font-space text-emerald-300">SUCCESSFUL!</div>
          <div className="text-[8px] text-slate-400 mt-0.5">Booking Confirmed 🧾</div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPaid(false);
            setSelectedBank(null);
          }}
          className="px-1.5 py-0.5 rounded-md border border-white/10 text-[7px] font-bold text-slate-500 hover:text-white mt-0.5"
        >
          Reset
        </button>
      </motion.div>
    </div>
  );
}
