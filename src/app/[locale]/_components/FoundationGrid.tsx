"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Check, Info, ArrowRight, Sparkles, Lightbulb, RefreshCw, ChevronDown } from "lucide-react";
import { FOUNDATIONS, type Foundation } from "@/constants/pricing";
import FoundationCard from "../architect/_components/FoundationCard";

interface FoundationGridProps {
  foundation: string | null;
  setFoundation: (id: string) => void;
  activeFoundation: Foundation | null | undefined;
  formatPrice: (price: number) => string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  mobileIndex: number;
  setDrawerItem: (item: any) => void;
  goToStep: (s: 1 | 2 | 3) => void;
}

export default function FoundationGrid({
  foundation,
  setFoundation,
  activeFoundation,
  formatPrice,
  scrollRef,
  handleScroll,
  mobileIndex,
  setDrawerItem,
  goToStep
}: FoundationGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <m.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      <div>
        <h3 className="text-xl font-black font-space tracking-tight text-white flex items-center gap-2">
          1. Choose Your Foundation
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Define your core architecture starting path nodes correctly.</p>
      </div>

      <AnimatePresence mode="wait">
        {activeFoundation ? (
          /* 🏆 ISOLATED SELECTED VIEW */
          <m.div
            key="isolated"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            <m.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-900/40 p-2 rounded-xl border border-zinc-800/40 backdrop-blur-md gap-2"
            >
              <div className="flex items-center gap-2 pl-2 shrink-0">
                <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-slate-400">Foundation</span>
              </div>

              <div ref={dropdownRef} className="relative w-full sm:w-auto">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                  className="flex w-full sm:w-auto items-center justify-center gap-1.5 bg-zinc-800/20 hover:bg-zinc-800/40 transition-all border border-zinc-800/50 px-2.5 py-1.5 rounded-xl text-sm font-black text-slate-200 cursor-pointer backdrop-blur-md"
                >
                  <span className="text-emerald-400">{activeFoundation?.name || "Select"}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                      <m.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-1.5 bg-zinc-950/95 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-20 w-full sm:w-64 py-1 backdrop-blur-xl"
                      >
                        {FOUNDATIONS.map(f => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => { setFoundation(f.id); setIsOpen(false); }}
                            className={`w-full text-center px-3 py-2 text-xs font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5 ${f.id === foundation ? "text-emerald-400 bg-emerald-500/5" : "text-slate-300"}`}
                          >
                            <span>{f.name}</span>
                            {f.id === foundation && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                          </button>
                        ))}
                      </m.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

            </m.div>

            <FoundationCard
              f={activeFoundation}
              isSelected={true}
              onClick={() => { }}
              formatPrice={formatPrice}
              setDrawerItem={setDrawerItem}
            />
          </m.div>
        ) : (
          /* 🎲 CHOICE GRID VIEW */
          <m.div
            key="grid"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-2 gap-4 items-start">
              {FOUNDATIONS.map((f) => (
                <FoundationCard
                  key={f.id}
                  f={f}
                  isSelected={false}
                  onClick={() => setFoundation(f.id)}
                  formatPrice={formatPrice}
                  setDrawerItem={setDrawerItem}
                />
              ))}
            </div>

            {/* Mobile Snap Carousel */}
            <div className="md:hidden flex flex-col gap-3">
              <div
                ref={scrollRef}
                onScroll={handleScroll}

              >
                {FOUNDATIONS.map((f) => (
                  <div key={f.id} className="snap-center shrink-0 w-[85vw]">
                    <m.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDrawerItem(f)}
                      role="button"
                      className="relative cursor-pointer text-left p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 flex flex-col justify-between w-full h-[140px] transition-all hover:bg-zinc-800/40"
                    >
                      <div className="flex flex-col text-left">
                        <h4 className="text-base font-black text-white mt-0.5">{f.name}</h4>
                        {f.bestFor && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {f.bestFor.slice(0, 2).map((bad, i) => (
                              <span key={i} className="text-[9px] font-bold bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-500/10">
                                {bad}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-end w-full pt-1.5 border-t border-zinc-900/40">
                        <div />
                        <div className="flex flex-col items-end">
                          <span className="text-[8px] font-black font-space text-zinc-500 uppercase tracking-widest leading-none mb-1 opacity-50">Base Price</span>
                          <span className="text-base font-black font-space text-emerald-300 leading-none whitespace-nowrap">
                            {formatPrice(f.priceGEL)}
                          </span>
                        </div>
                      </div>
                    </m.div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-1.5">
                {FOUNDATIONS.map((_, i) => (
                  <m.div
                    key={i}
                    animate={{ scale: i === mobileIndex ? 1.4 : 1, opacity: i === mobileIndex ? 1 : 0.4 }}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  />
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}
