"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Lightbulb } from "lucide-react";
import { FOUNDATIONS, type Foundation } from "@/constants/pricing";

interface FoundationCardProps {
  f: Foundation;
  isSelected: boolean;
  onClick: () => void;
  formatPrice: (p: number) => string;
  setDrawerItem?: (item: any) => void;
}

const CARD_STYLES = {
  base: "relative text-left p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between min-h-[160px] h-auto transition-all",
  selected: "border-emerald-500 bg-emerald-500/[0.04] shadow-[0_0_40px_rgba(16,185,129,0.12)]",
  idle: "border-zinc-800/60 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700"
};

export default function FoundationCard({ f, isSelected, onClick, formatPrice, setDrawerItem }: FoundationCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);


  const background = useTransform(
    [glowX, glowY],
    ([xVal, yVal]) => `radial-gradient(140px circle at ${xVal}px ${yVal}px, rgba(16,185,129,0.18), transparent)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    glowX.set(mouseX);
    glowY.set(mouseY);
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      layout
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      className={`group ${CARD_STYLES.base} ${isSelected ? CARD_STYLES.selected : CARD_STYLES.idle}`}
    >
      <motion.div
        style={{ background }}
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      />
      {isSelected && (
        <motion.div
          layoutId="foundationGlow"
          className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.2),_transparent)] pointer-events-none"
        />
      )}

      <div className="flex flex-col z-10">
        {f.id === 'upgrade' && (
          <span className="text-[9px] w-fit font-black font-space text-red-950 bg-red-400 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse uppercase tracking-wider mb-1">
            [ 🚨 ACTIVE TECHNICAL RESCUE ]
          </span>
        )}
        <h4 className="text-lg font-black text-slate-200 mt-0.5" style={{ WebkitTextStroke: "0.3px rgba(0,0,0,0.8)", textShadow: "0px 2px 4px rgba(0,0,0,0.9)" }}>{f.name}</h4>
        <p className="text-base text-slate-400 mt-1 leading-relaxed font-medium" style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.9)" }}>{f.concept}</p>
      </div>

      <div className="flex justify-between items-end mt-auto w-full pt-2 border-t border-zinc-900/40 z-10">
        <div className="flex items-center gap-2">
          {f.id === 'cms' && isSelected && (
            <span className="text-[9px] font-black font-space text-emerald-950 bg-emerald-400 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse uppercase tracking-wider">
              [ OWNER INDEPENDENCE ACTIVATED ]
            </span>
          )}
          {!isSelected && (
            f.customPriceLabel ? (
              <span className="text-sm font-black font-space text-amber-400" style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.8)" }}>{f.customPriceLabel}</span>
            ) : (
              <span className="text-base font-black font-space text-emerald-300" style={{ WebkitTextStroke: "0.2px rgba(0,0,0,0.4)", textShadow: "0px 1px 2px rgba(0,0,0,0.9)" }}>
                {formatPrice(f.priceGEL)}
              </span>
            )
          )}
        </div>
      </div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden w-full flex flex-col gap-3 pt-3 border-t border-zinc-800/80 mt-3"
            onClick={(e) => e.stopPropagation()}
            style={{ transform: "translateZ(15px)" }}
          >
            {/* Inheritance Value Anchor */}
            {f.inheritedValue && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (setDrawerItem) {
                    const inherited = FOUNDATIONS.find(fd => fd.id === f.inheritedValue?.id);
                    if (inherited) setDrawerItem(inherited);
                  }
                }}
                className="bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/10 hover:border-emerald-500/30 rounded-xl p-3 mb-1 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.02)] backdrop-blur-md cursor-pointer transition-all group/inherit"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-500/20 group-hover/inherit:bg-emerald-500/30 p-1.5 rounded-lg border border-emerald-500/30 group-hover/inherit:scale-110 transition-transform">
                    <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-black font-space text-emerald-400 tracking-wider flex items-center gap-1">
                      [ INHERITED INFRASTRUCTURE ]
                    </span>
                    <span className="text-xs font-black text-white group-hover/inherit:underline decoration-emerald-500/40 underline-offset-2 transition-all">
                      {f.inheritedValue.name}
                    </span>
                  </div>
                </div>
                <div className="bg-emerald-500/10 group-hover/inherit:bg-emerald-500/20 px-2 py-1 rounded-lg border border-emerald-500/20 transition-colors">
                  <span className="text-[11px] font-black text-emerald-300 font-mono">
                    +{f.inheritedValue.priceGEL.toLocaleString()} ₾ VALUE
                  </span>
                </div>
              </div>
            )}

            {/* Exact Scope of Work */}
            {f.scope && (
              <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-800/40 flex flex-col gap-1.5 shadow-inner">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black font-space text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    WHAT YOU GET IN THIS BASE
                  </span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mt-1">
                  {f.scope.map((item, id) => (
                    <li key={id} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Strategists Note */}
              {f.strategy && (
                <div className={`p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50 flex flex-col items-center justify-center text-center gap-2 backdrop-blur-md ${!f.proFeatures || f.proFeatures.length === 0 ? 'md:col-span-2' : ''}`}>
                  <Lightbulb className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <div className="flex flex-col items-center">
                    {f.id === 'cms' ? (
                      <span className="text-[10px] font-black font-space text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
                        STRATEGIST'S NOTE: THE INDEPENDENCE PRINCIPLE
                      </span>
                    ) : f.id === 'landing' ? (
                      <span className="text-[10px] font-black font-space text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
                        STRATEGIST'S NOTE: THE CONVERSION TUNNEL
                      </span>
                    ) : f.id === 'ecomm' ? (
                      <span className="text-[10px] font-black font-space text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
                        STRATEGIST'S NOTE: THE SHIELD PROTOCOL
                      </span>
                    ) : f.id === 'saas' ? (
                      <span className="text-[10px] font-black font-space text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
                        STRATEGIST'S NOTE: THE BLUEPRINT PRINCIPLE
                      </span>
                    ) : (
                      <span className="text-[10px] font-black font-space text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
                        Strategists Note: How it Works
                      </span>
                    )}
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium whitespace-pre-line text-center">
                      {f.strategy}
                    </p>
                  </div>
                </div>
              )}

              {/* Pro-Feature Grid */}
              {f.proFeatures && (
                <div className="flex flex-col gap-2">
                  {f.proFeatures.map((feat, i) => (
                    <div key={i} className="p-2 border border-zinc-800/60 bg-zinc-900/10 rounded-xl flex flex-col gap-0.5 transition-all">
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5 text-emerald-500" /> {feat.title}
                      </span>
                      <span className="text-[10px] text-slate-500 leading-relaxed font-medium">{feat.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Best For Badges */}
            {f.bestFor && (
              <div className="flex flex-wrap gap-1.5 mt-1 border-t border-zinc-900/80 pt-2.5">
                <span className="text-[10px] font-black uppercase text-slate-500 self-center mr-1">Best For:</span>
                {f.bestFor.map((bad, i) => (
                  <span key={i} className="text-[10px] font-bold font-space bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {bad}
                  </span>
                ))}
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
