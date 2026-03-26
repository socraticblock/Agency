"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Info, Sparkles, Lightbulb } from "lucide-react";
import { ServiceItem, MODULES } from "@/constants/pricing";

import { memo, useState } from "react";

interface ModuleItemProps {
  m: ServiceItem;
  isSelected: boolean;
  isExpanded: boolean;
  setExpanded: () => void;
  toggleModule: (id: string) => void;
  formatPrice: (p: number) => string;
  setDrawerItem: (item: ServiceItem) => void;
  selectedModules?: string[];
  isRecommended?: boolean;
  quantity?: number;
  updateQuantity?: (id: string, qty: number) => void;
  activeFoundation?: string | null;
}

const CARD_STYLES = {
  base: "p-3 rounded-xl border backdrop-blur-md flex justify-between items-center transition-all duration-300",
  selected: "border-emerald-500/30 bg-emerald-500/[0.02]",
  idle: "border-zinc-800/50 bg-zinc-900/80 hover:border-zinc-700"
};

const ANIMATION_OVERRIDES: Record<string, { whatItIs: string, howItHelps: string }> = {
  landing: {
    whatItIs: "Targeted kinetic prompts and high-performance button triggers. We engineer 'flicker-free' hover states and magnetic lead-magnet animations that subconsciously draw the visitor’s eye toward your primary Call to Action (CTA).",
    howItHelps: "It kills 'Banner Blindness.' By adding subtle, high-end motion to your 'Buy' or 'Sign Up' buttons, we increase the probability of a click by up to 30%. These animations act as a silent salesperson, guiding the user’s gaze through your sales narrative and ensuring they don't miss the most important part: the conversion."
  },
  cms: {
    whatItIs: "Seamless layout transitions and 'Elite-Tier' UI responses. We use advanced physics-based libraries to create fluid scroll-reveals and magnetic cursor interactions that make your brand identity feel expensive, stable, and world-class.",
    howItHelps: "The '0.1% Authority' Signal. High-ticket clients decide whether they trust you in the first 3 seconds. By making your site respond with 'Apple-level' fluidity, you signal that your business is meticulous and modern. It increases 'Dwell Time' and justifies premium pricing by making your digital infrastructure feel like a high-end physical office."
  },
  ecomm: {
    whatItIs: "Tactile product interactions and 'Satisfying' feedback loops. We engineer smooth product image morphs, instant 'Add to Cart' visual confirmations, and elegant cart-drawer reveals that provide the same sensory satisfaction as a physical luxury shopping trip.",
    howItHelps: "It reduces 'Buyer’s Friction.' Friction is what makes people abandon carts. By making the shopping experience feel lightweight and responsive, we remove the technical lag that kills impulse buys. It makes browsing your catalog a joy rather than a chore, directly increasing your 'Average Order Value' (AOV)."
  }
};

export default memo(function ModuleItem({ m, isSelected, isExpanded, setExpanded, toggleModule, formatPrice, setDrawerItem, selectedModules = [], isRecommended = false, quantity = 1, updateQuantity, activeFoundation }: ModuleItemProps) {
  const [kycChoice, setKycChoice] = useState<'yes' | 'no' | 'self' | 'none'>('none');

  const activeOverride = m.id === 'micro-animations' && activeFoundation && ANIMATION_OVERRIDES[activeFoundation];
  const whatItIsText = activeOverride ? activeOverride.whatItIs : (m.description || m.whatItIs || "Standard engine node deployment configuration.");
  const howItHelpsText = activeOverride ? activeOverride.howItHelps : m.howItHelps;

  const bankRepModule = MODULES.find(mod => mod.id === 'bank-rep');
  const bankRepPrice = bankRepModule?.priceGEL || 0;

  const displayedPrice = (m.id === 'pay-gateway' && selectedModules.includes('bank-rep'))
    ? m.priceGEL + bankRepPrice
    : m.priceGEL;

  const isHeavyNode = m.category === 'Business Engines' || m.category === 'AI & Automation';

  return (
    <div
      className={`${CARD_STYLES.base} relative ${isSelected ? 'border-green-400 bg-green-500/[0.02] shadow-[0_0_15px_rgba(34,197,94,0.05)]' : isExpanded ? CARD_STYLES.selected : CARD_STYLES.idle} flex-col !items-stretch !justify-start gap-1 ${isHeavyNode ? 'shadow-[0_15px_40px_rgba(0,0,0,0.45)] z-20' : 'z-10'}`}
    >
      {/* 🛡️ HAPTIC HIT-BOX: High-Fidelity Expansion Trigger */}
      <div 
        className="absolute inset-0 z-0 cursor-pointer" 
        onClick={() => setExpanded()}
      />

      {/* Row 1: Header - GRID ARCHITECTURE */}
      <div className="relative z-10 grid grid-cols-[1fr_auto] items-center w-full gap-3 pointer-events-none md:pointer-events-auto">
        {/* Left Col: Identification */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-base font-black text-slate-200 leading-tight block sm:inline" style={{ WebkitTextStroke: "0.3px rgba(0,0,0,0.8)", textShadow: "0px 2px 4px rgba(0,0,0,0.9)" }}>
            {m.name}
          </span>
          {m.tooltip && (
            <div className="group relative pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <Info className="h-3 w-3 text-slate-500 cursor-help hover:text-emerald-400 transition-colors" />
              <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block w-40 p-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-slate-400 shadow-xl backdrop-blur-xl z-30 leading-relaxed">
                {m.tooltip}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Metrics & Action */}
        <div className="flex items-center gap-3 flex-shrink-0 pointer-events-auto">
          <span className="text-lg font-black font-space text-emerald-400" style={{ WebkitTextStroke: "0.2px rgba(0,0,0,0.4)", textShadow: "0px 1px 2px rgba(0,0,0,0.9)" }}>
            {formatPrice(displayedPrice * Math.max(1, quantity))}
            {m.id === 'pro-copy' && <span className="text-xs text-zinc-500 font-bold"> / pg</span>}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (m.id === 'pay-gateway' && isSelected && selectedModules.includes('bank-rep')) {
                toggleModule('bank-rep');
              }
              toggleModule(m.id);
            }}
            className="font-space font-black text-[9px] uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center min-w-[70px] justify-end"
          >
            {isSelected ? (
              <span className="text-green-400 font-bold flex items-center gap-1">
                <div className="h-1 w-1 bg-green-400 rounded-full animate-pulse" />
                <span className="hidden sm:inline">[ STATUS: ONLINE ]</span>
                <span className="sm:hidden">[ ONLINE ]</span>
              </span>
            ) : (
              <span className="text-orange-500 font-bold">
                <span className="hidden sm:inline">[ STATUS: IDLE ]</span>
                <span className="sm:hidden">[ IDLE ]</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Row 2: Expanded Accordion */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden w-full flex flex-col pt-2 border-t border-white/5 mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 pt-1 border-t border-white/5 mt-1">
              {/* High Density Monospace Tech Tray */}
              <div className="font-mono text-[10px] leading-relaxed bg-zinc-950/20 border border-zinc-800/40 rounded-lg p-2 flex flex-col gap-1.5 text-slate-400">
                {m.timeSaved && (
                  <div className="flex justify-between items-center border-b border-zinc-900/60 pb-1">
                    <span className="text-zinc-500 uppercase">ETA_Reduction:</span>
                    <span className="text-emerald-400">+{m.timeSaved}hr / mo saved</span>
                  </div>
                )}

                {m.recommendation && (
                  <div className="flex items-center gap-1.5 bg-emerald-950/40 text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-black font-space border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)] w-fit mb-1.5 uppercase tracking-wide">
                    <Sparkles className="h-3.5 w-3.5" /> {m.recommendation}
                  </div>
                )}

                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-500 uppercase">What It Is:</span>
                  <p className="text-slate-300 font-sans text-sm leading-normal whitespace-pre-line">{whatItIsText}</p>
                </div>

                {howItHelpsText && (
                  <div className="flex flex-col gap-0.5 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">How It Helps / ROI:</span>
                    <p className="text-slate-400 font-sans text-sm leading-normal whitespace-pre-line">{howItHelpsText}</p>
                  </div>
                )}

                {/* Custom Gateway Selection */}
                {m.id === 'pay-gateway' && (
                  <div className="mt-1 flex flex-col gap-1 p-1 bg-black/30 border border-amber-500/10 rounded">
                    <p className="text-[9px] font-black text-amber-500 uppercase">Do you have active Merchant Keys?</p>
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => {
                          setKycChoice('yes');
                          if (selectedModules.includes('bank-rep')) toggleModule('bank-rep');
                        }}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold cursor-pointer ${(kycChoice === 'yes' || (kycChoice === 'none' && !selectedModules.includes('bank-rep'))) ? 'bg-emerald-400 text-slate-950' : 'bg-zinc-800 text-slate-400'}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => {
                          setKycChoice('self');
                          if (selectedModules.includes('bank-rep')) toggleModule('bank-rep');
                        }}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold cursor-pointer ${kycChoice === 'self' ? 'bg-emerald-400 text-slate-950' : 'bg-zinc-800 text-slate-400'}`}
                      >
                        I'll get them
                      </button>
                      <button
                        onClick={() => {
                          setKycChoice('no');
                          if (!selectedModules.includes('bank-rep')) toggleModule('bank-rep');
                        }}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold cursor-pointer ${(kycChoice === 'no' || (kycChoice === 'none' && selectedModules.includes('bank-rep'))) ? 'bg-amber-400 text-slate-950' : 'bg-zinc-800 text-slate-400'}`}
                      >
                        No (+{bankRepPrice.toLocaleString()} ₾)
                      </button>
                    </div>
                  </div>
                )}

                {m.strategy && (
                  <div className="flex flex-col gap-0.5 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">Strategy:</span>
                    <p className="text-slate-400 font-sans text-sm">{m.strategy}</p>
                  </div>
                )}

                {m.strategicBacking && (
                  <div className="flex flex-col gap-1 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">Strategic_Backing:</span>
                    {m.strategicBacking.map((item, id) => (
                      <div key={id} className="p-1 bg-black/20 border border-zinc-800/40 rounded flex flex-col gap-0.5">
                        <p className="text-[10px] font-bold text-slate-200 font-sans">{item.title}</p>
                        <p className="text-[9px] text-slate-400">Cost Focus: <span className="text-emerald-400">{item.cost}</span></p>
                      </div>
                    ))}
                  </div>
                )}

                {m.scope && (
                  <div className="flex flex-col gap-0.5 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">Output Node Nodes:</span>
                    <div className="grid grid-cols-1 gap-0.5">
                      {m.scope.map((item, id) => (
                        <div key={id} className="flex items-center gap-1">
                          <div className="h-1 w-1 bg-emerald-400 rounded-full" />
                          <span className="text-[9px] text-slate-300 font-sans">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {m.proFeatures && (
                  <div className="flex flex-col gap-1 pt-1 border-t border-zinc-900/60">
                    <span className="text-zinc-500 uppercase">Addon_Gates:</span>
                    {m.proFeatures.map((feat, i) => (
                      <div key={i} className="text-[9px]">
                        <span className="text-slate-200 font-extrabold font-sans">[{feat.title}]</span> <span className="text-slate-500 font-sans">{feat.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>



              {/* Quantity Selector Conditionals */}
              {m.id === 'extra-page' && (
                <div className="flex flex-col gap-1.5 bg-zinc-950/40 p-2 border border-zinc-900/60 rounded-lg mt-1 mb-1 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase text-zinc-400 font-mono tracking-wider flex items-center gap-1">
                      <div className="h-1 w-1 bg-amber-400 rounded-full animate-pulse" /> Count (Extra Nodes):
                    </span>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => {
                          const newQty = Math.max(0, quantity - 1);
                          updateQuantity?.(m.id, newQty);
                          if (newQty === 0 && isSelected) {
                            toggleModule(m.id);
                          }
                        }}
                        className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 hover:border-zinc-500 hover:text-slate-200 text-slate-400 font-black cursor-pointer transition-all text-sm"
                      >-</button>
                      <span className="text-sm font-black text-emerald-400 font-space min-w-[12px] text-center">{quantity}</span>
                      <button 
                        onClick={() => {
                          const maxQty = activeFoundation === 'landing' ? 3 : 999;
                          if (quantity < maxQty) {
                            updateQuantity?.(m.id, quantity + 1);
                          }
                        }}
                        disabled={activeFoundation === 'landing' && quantity >= 3}
                        className={`px-2 py-1 rounded bg-zinc-800 border border-zinc-700 font-black transition-all text-sm ${activeFoundation === 'landing' && quantity >= 3 ? 'opacity-40 cursor-not-allowed border-zinc-800 text-zinc-600' : 'hover:border-zinc-500 hover:text-slate-200 text-slate-400 cursor-pointer'}`}
                      >+</button>
                    </div>
                  </div>

                  {activeFoundation === 'landing' && quantity >= 3 && (
                    <div className="p-2 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-lg flex gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-wide flex items-center gap-1">Architect's Insight</span>
                        <p className="text-[9px] font-medium text-slate-400 leading-normal">
                          You’ve reached the structural limit for a Landing Page. For more nodes, we recommend the Digital Command Center. It includes a Visual Dashboard and SEO Blog Engine for nearly the same price, giving you total control over your growth.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Command Buttons */}
              <div className="flex items-center gap-1 mt-1 pt-1.5 border-t border-zinc-900/60">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) toggleModule(m.id);
                    setExpanded();
                  }}
                  className={`flex-1 py-1 px-2 rounded-lg border text-center text-[10px] font-black font-space uppercase tracking-wider transition-all duration-200 cursor-pointer ${isSelected ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] text-emerald-400'}`}
                >
                  {isSelected ? "DEPLOYED ✓" : "DEPLOY MODULE"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) {
                      if (m.id === 'pay-gateway' && selectedModules?.includes('bank-rep')) {
                        toggleModule('bank-rep');
                      }
                      toggleModule(m.id);
                    }
                    setExpanded();
                  }}
                  className="flex-1 py-1 px-2 rounded-lg border border-red-500/30 hover:border-red-500/60 hover:bg-red-500/[0.03] text-red-500/70 hover:text-red-400 text-center text-[10px] font-black font-space uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  SKIP FOR NOW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
