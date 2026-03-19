"use client";

import { m } from "framer-motion";
import { Check, Info, ArrowRight, Sparkles, Lightbulb } from "lucide-react";
import { FOUNDATIONS, ServiceItem } from "@/constants/pricing";
import FoundationCard from "../architect/_components/FoundationCard";

interface FoundationGridProps {
  foundation: string | null;
  setFoundation: (id: string) => void;
  activeFoundation: ServiceItem | null | undefined;
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

      {/* The Kvali Engineering Standard Banner */}
      <m.div 
        initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/40 flex flex-col sm:flex-row justify-between items-center gap-2 backdrop-blur-md"
      >
        <div>
          <span className="text-xs font-black font-space text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> THE KVALI ENGINEERING STANDARD
          </span>
          <p className="text-[11px] text-slate-500 font-medium">Headache-Free implementation built into every base.</p>
        </div>
        <div className="flex gap-1.5">
          <div className="group relative">
            <div className="cursor-help bg-emerald-500/5 hover:bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/10 text-[10px] font-bold text-emerald-300 flex items-center gap-1 transition-all">PM</div>
            <div className="absolute bottom-full right-0 mb-1 hidden group-hover:block w-48 p-2 bg-black border border-zinc-800 rounded-xl text-[11px] text-slate-400 shadow-xl z-20 leading-relaxed">
              <span className="text-white font-bold">Project Management:</span> We manage the team, the tech, and the timelines so you stay in your creative zone.
            </div>
          </div>
          <div className="group relative">
            <div className="cursor-help bg-emerald-500/5 hover:bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/10 text-[10px] font-bold text-emerald-300 flex items-center gap-1 transition-all">QA</div>
            <div className="absolute bottom-full right-0 mb-1 hidden group-hover:block w-48 p-2 bg-black border border-zinc-800 rounded-xl text-[11px] text-slate-400 shadow-xl z-20 leading-relaxed">
              <span className="text-white font-bold">Quality Assurance:</span> We test every pixel for bulletproof security and perfect displays on all devices.
            </div>
          </div>
        </div>
      </m.div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {FOUNDATIONS.map((f) => (
          <FoundationCard
            key={f.id}
            f={f}
            isSelected={foundation === f.id}
            onClick={() => setFoundation(f.id)}
            formatPrice={formatPrice}
          />
        ))}
      </div>

      {/* Mobile Snap Carousel */}
      <div className="md:hidden flex flex-col gap-3">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none pb-2"
        >
          {FOUNDATIONS.map((f) => {
            const isSelected = foundation === f.id;
            return (
              <div key={f.id} className="snap-center shrink-0 w-[85vw]">
                <m.div
                  onClick={() => setFoundation(f.id)}
                  role="button"
                  className={`relative cursor-pointer text-left p-4 rounded-xl border flex flex-col justify-between w-full h-[140px] transition-all ${isSelected
                      ? "border-emerald-500 bg-emerald-500/[0.04]"
                      : "border-zinc-800/60 bg-zinc-900/30"
                    }`}
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

                  <div className="flex justify-between items-center w-full pt-1.5 border-t border-zinc-900/40">
                    <button
                      onClick={(e) => { e.stopPropagation(); setDrawerItem(f); }}
                      className="text-emerald-400 text-xs font-bold underline"
                    >
                      Review Technical Strategy
                    </button>
                    <span className="text-sm font-black font-space text-emerald-300">
                      {formatPrice(f.priceGEL)}
                    </span>
                  </div>
                </m.div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5">
          {FOUNDATIONS.map((_, i) => (
            <m.div
              key={i}
              animate={{ scale: i === mobileIndex ? 1.4 : 1, opacity: i === mobileIndex ? 1 : 0.4 }}
              className={`h-1.5 w-1.5 rounded-full bg-emerald-400`}
            />
          ))}
        </div>
      </div>

      {/* Progressive Disclosure Based on Selections */}
        {activeFoundation && (
          <m.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            {/* Exact Scope of Work */}
            {activeFoundation.scope && (
              <div className="p-3 bg-zinc-900/20 rounded-xl border border-zinc-800/40 flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                   <span className="text-xs font-black font-space text-emerald-400 uppercase flex items-center gap-1">
                     WHAT YOU GET IN THIS BASE
                   </span>
                   <div className="group relative">
                     <Info className="h-3 w-3 text-emerald-400/60 cursor-help" />
                     <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block w-52 p-2 bg-black border border-zinc-800 rounded-xl text-xs text-slate-400 shadow-2xl z-30 leading-relaxed">
                       This is your high-performance starting kit. It’s the engine of your project before you add custom business modules in the next steps.
                     </div>
                   </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1">
                  {activeFoundation.scope.map((item, id) => (
                    <li key={id} className="text-sm text-slate-300 flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Strategists Note */}
            <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50 flex gap-2 items-start backdrop-blur-md">
              <Lightbulb className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-black font-space text-emerald-400 uppercase flex items-center gap-1">
                  Strategists Note: How it Works
                </span>
                <p className="text-sm text-slate-400 mt-0.5 leading-relaxed font-medium">
                  {activeFoundation.strategy}
                </p>
              </div>
            </div>

            {/* Pro-Feature Grid */}
            {activeFoundation.proFeatures && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeFoundation.proFeatures.map((feat, i) => (
                  <div key={i} className="p-2.5 border border-zinc-800/60 bg-zinc-900/10 rounded-xl flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-white flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-emerald-500" /> {feat.title}
                    </span>
                    <span className="text-xs text-slate-500 leading-relaxed font-medium">{feat.desc}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Best For Badges */}
            {activeFoundation.bestFor && (
              <div className="flex flex-wrap gap-1.5 mt-1 border-t border-zinc-900/80 pt-2">
                <span className="text-xs font-bold text-slate-600 self-center">Best For:</span>
                {activeFoundation.bestFor.map((bad, i) => (
                  <span key={i} className="text-xs font-bold font-space bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {bad}
                  </span>
                ))}
              </div>
            )}
          </m.div>
        )}

      <button
        onClick={() => goToStep(2)}
        disabled={!foundation}
        className={`mt-1 ml-auto flex items-center gap-1.5 font-bold px-4 py-1.5 rounded-lg text-xs font-space transition-all duration-300 ${foundation ? "bg-white text-black hover:bg-emerald-400" : "bg-zinc-800 text-slate-600 cursor-not-allowed"
          }`}
      >
        Configure Modules <ArrowRight className="h-3 w-3" />
      </button>
    </m.div>
  );
}
