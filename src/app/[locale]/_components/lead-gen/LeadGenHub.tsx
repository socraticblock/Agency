"use client";

import { useCallback, useEffect, useRef, useState, type UIEvent } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft,
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Orbit, 
  BarChart3, 
  Zap, 
  Fingerprint, 
  ShieldCheck, 
  Maximize2 
} from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";
import { KineticText } from "../KineticText";

interface LeadGenHubProps {
  locale: Locale;
}

const loading = () => (
  <div className="flex h-64 items-center justify-center rounded-3xl border border-white/5 bg-slate-900/40 text-xs text-slate-500 animate-pulse">
    Loading…
  </div>
);

const TOOL_IDS = ["audience", "weekend", "friction", "time", "risk"] as const;

const TOOL_LOADERS = [
  () =>
    import("./TrueAudienceVisualizer").then((m) => m.TrueAudienceVisualizer),
  () =>
    import("./LostWeekendCalculator").then((m) => m.LostWeekendCalculator),
  () =>
    import("./FrictionRaceSimulator").then((m) => m.FrictionRaceSimulator),
  () => import("./TimeDebtReceipt").then((m) => m.TimeDebtReceipt),
  () =>
    import("./PlatformRiskMeter").then((m) => m.PlatformRiskMeter),
] as const;

const tools = TOOL_IDS.map((id, i) => ({
  id,
  component: dynamic(TOOL_LOADERS[i], {
    ssr: false,
    loading,
  }),
}));

// --- LeadGenHub Component ---

export function LeadGenHub({ locale }: LeadGenHubProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [mounted, setMounted] = useState(() => new Set<number>([0]));

  const t = getMessages(locale);
  const total = tools.length;

  // Mobile Detection & Hydration Guard
  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    setMounted((prev) => {
      const next = new Set(prev);
      if (isDashboardOpen) {
          for (let d = -1; d <= 1; d++) {
            const i = activeIndex + d;
            if (i >= 0 && i < total) next.add(i);
          }
      }
      return next;
    });
  }, [activeIndex, total, hasMounted, isDashboardOpen]);

  // Prevent SSR/Hydration mismatch
  if (!hasMounted) return null;

  return (
    <section id="interactive-audit" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      {/* 🏁 THE LAUNCHPAD: High-Fidelity Trigger Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-1 backdrop-blur-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-indigo-500/10 opacity-30" />
        
        <div className="relative flex flex-col items-center justify-between gap-8 rounded-[2.25rem] border border-white/5 bg-black/40 px-8 py-12 md:flex-row md:px-16 md:py-20">
          <div className="max-w-xl text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-space">
                System Diagnostic Available
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-white md:text-5xl font-space leading-tight mb-6">
              {t.leadHub?.title ?? "Quantify Your Growth Delta"}
            </h2>
            
            <p className="text-lg text-slate-400 md:text-xl leading-relaxed">
              {t.leadHub?.body ?? "Run a global infrastructure audit to identify hidden conversion bottlenecks and automate your revenue capture."}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
               <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-widest border-r border-white/10 pr-4">
                  <Orbit className="h-4 w-4 text-emerald-500/60" /> 5 Audit Modules
               </div>
               <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
                  <Fingerprint className="h-4 w-4 text-emerald-500/60" /> Precision Analytics
               </div>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setIsDashboardOpen(true)}
              className="group relative flex h-40 w-40 items-center justify-center rounded-full bg-emerald-500 p-2 text-slate-950 transition-all hover:scale-105 hover:bg-emerald-400 active:scale-95 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
            >
              <div className="absolute inset-0 animate-pulse rounded-full border-4 border-emerald-500/30" />
              <div className="flex flex-col items-center text-center">
                 <Maximize2 className="h-8 w-8 mb-2 group-hover:rotate-6 transition-transform" />
                 <span className="text-[10px] font-black uppercase tracking-tighter leading-none">
                    Launch<br/>Dashboard
                 </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 🔮 THE SOVEREIGN DASHBOARD: Full-Screen Modal */}
      <AnimatePresence>
        {isDashboardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-zinc-950 text-white overflow-hidden"
          >
            {/* Header: Segmented Control & Navigation */}
            <div className="px-5 pt-12 pb-6 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl shrink-0 z-20">
              <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto w-full">
                 <div>
                    <span className="text-[10px] font-black tracking-[0.25em] text-emerald-500 uppercase font-space animate-pulse">
                       LIVE INFRASTRUCTURE AUDIT
                    </span>
                    <h1 className="text-xl md:text-2xl font-bold font-space flex items-center gap-3">
                       Sovereign Dashboard 
                       <span className="hidden md:inline-block rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">v1.4</span>
                    </h1>
                 </div>
                 <button 
                    onClick={() => setIsDashboardOpen(false)}
                    className="group h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30"
                 >
                    <span className="sr-only">Close Audit</span>
                    <div className="relative h-4 w-4">
                       <div className="absolute top-1/2 left-0 w-full h-0.5 bg-current rotate-45" />
                       <div className="absolute top-1/2 left-0 w-full h-0.5 bg-current -rotate-45" />
                    </div>
                 </button>
              </div>

              {/* Enhanced Segmented Control */}
              <div className="relative flex p-1.5 bg-black/40 border border-white/10 rounded-2xl max-w-4xl mx-auto w-full overflow-x-auto no-scrollbar scroll-smooth">
                  {TOOL_IDS.map((id, i) => {
                     const toolCopy = (t.leadHub?.tools as any)?.[id] ?? { name: id };
                     const isActive = activeIndex === i;
                     
                     // Get Icon based on tool ID
                     const ToolIcon = i === 0 ? BarChart3 : i === 1 ? Orbit : i === 2 ? Zap : i === 3 ? Fingerprint : ShieldCheck;

                     return (
                       <button
                         key={id}
                         onClick={() => setActiveIndex(i)}
                         className={`relative z-10 flex flex-1 items-center justify-center gap-2 min-w-[100px] py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 font-space whitespace-nowrap px-4 ${
                           isActive ? "text-slate-950" : "text-slate-500 hover:text-slate-300"
                         }`}
                       >
                         <ToolIcon className={`h-3.5 w-3.5 ${isActive ? "text-slate-950" : "text-emerald-500/40"}`} />
                         {toolCopy.name.split(' ')[0]}
                         {isActive && (
                           <motion.div 
                             layoutId="dashboard-pill"
                             className="absolute inset-0 z-[-1] bg-emerald-400 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                             transition={{ type: "spring", stiffness: 400, damping: 30 }}
                           />
                         )}
                       </button>
                     );
                  })}
              </div>
            </div>

            {/* Main Content Area: FIXED Viewport Lock but INNER content scroll */}
            <div className="flex-grow relative overflow-y-auto overscroll-contain bg-zinc-950 pb-24 md:pb-32">
               <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-8 md:py-16">
                  <AnimatePresence mode="wait">
                     <motion.div
                       key={activeIndex}
                       initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                       animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                       exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                       transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                       className="w-full"
                     >
                       {mounted.has(activeIndex) ? (
                            <div className="w-full">
                                {(() => {
                                    const Tool = tools[activeIndex].component;
                                    return <Tool locale={locale} isDashboard={true} />;
                                })()}
                            </div>
                       ) : (
                         <div className="flex min-h-[400px] items-center justify-center text-slate-500 font-space text-[12px] tracking-widest animate-pulse uppercase">
                           Synchronizing Neural Nodes...
                         </div>
                       )}
                     </motion.div>
                  </AnimatePresence>
               </div>
            </div>

            {/* Global Progress Bar & Info Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-30 px-6 py-6 border-t border-white/10 bg-zinc-950/95 backdrop-blur-md">
                 <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500">
                            <Zap className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest font-space">
                               Module Progress
                            </span>
                            <span className="block text-sm font-bold text-white font-space">
                               Audit Active — Step {activeIndex + 1} of {total}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex-grow max-w-sm w-full">
                        <div className="flex justify-between items-center mb-1.5 px-1">
                            <span className="text-[9px] font-black text-emerald-500 font-space uppercase">Compute Load: Optimized</span>
                            <span className="text-[9px] font-black text-emerald-500 font-space">{Math.round(((activeIndex+1)/total)*100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-emerald-500" 
                              initial={false}
                              animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                              transition={{ duration: 0.8, ease: "circOut" }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                         <button 
                            disabled={activeIndex === 0}
                            onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
                         >
                            <ChevronLeft className="h-4 w-4" />
                         </button>
                         <button 
                            disabled={activeIndex === total - 1}
                            onClick={() => setActiveIndex(prev => Math.min(total - 1, prev + 1))}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
                         >
                            <ChevronRight className="h-4 w-4" />
                         </button>
                    </div>
                 </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
