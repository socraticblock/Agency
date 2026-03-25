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
  Maximize2,
  Activity,
  Scan,
  Sparkles,
  Lock
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

  // Update mounted set when dashboard opens or index changes
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
    <section id="interactive-audit" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* 🏁 THE SOVEREIGN GATE: Bento-Hierarchy Trigger Card */}
      <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-slate-950/40 p-1 backdrop-blur-3xl shadow-[0_32px_128px_-32px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-indigo-500/10 opacity-40" />
        
        <div className="relative flex flex-col items-stretch lg:flex-row rounded-[2.8rem] border border-white/5 bg-black/60 overflow-hidden">
          {/* Left: Strategic Content */}
          <div className="flex-grow p-8 sm:p-12 lg:p-20 lg:max-w-[60%]">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-emerald-500/10 px-5 py-2 border border-emerald-500/20 backdrop-blur-md">
              <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400 font-space">
                System Diagnostic: Active
              </span>
            </div>
            
            <h2 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl font-space leading-tight mb-8">
              Explore your <span className="text-emerald-400">digital</span> foundation.
            </h2>
            
            <p className="text-lg text-slate-400 sm:text-xl leading-relaxed mb-12 max-w-xl">
              Launch a sovereign infrastructure audit to identify hidden bottlenecks and automate your high-value growth loops.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
               {[
                 { icon: Scan, text: "Structural Analysis" },
                 { icon: Fingerprint, text: "Behavioral Identity" },
                 { icon: Zap, text: "Friction Recovery" },
                 { icon: ShieldCheck, text: "Risk Appraisal" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500/60 transition group-hover:text-emerald-400">
                       <item.icon className="h-5 w-5" />
                    </div>
                    {item.text}
                 </div>
               ))}
            </div>
          </div>

          {/* Right: The Visual Anchor (Audit Pulse) */}
          <div className="relative lg:w-[40%] bg-zinc-900/40 border-l border-white/5 flex items-center justify-center p-12 min-h-[400px]">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
             
             {/* Animated Orbital Pulse */}
             <div className="relative flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute h-80 w-80 rounded-full border border-dashed border-white/10"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute h-64 w-64 rounded-full border border-emerald-500/10"
                />
                <div className="absolute h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />
                
                <button
                  onClick={() => setIsDashboardOpen(true)}
                  className="group relative flex h-48 w-48 flex-col items-center justify-center rounded-full bg-emerald-500 p-4 text-slate-950 transition-all hover:scale-105 hover:bg-emerald-400 active:scale-95 shadow-[0_0_80px_rgba(16,185,129,0.4)]"
                >
                  <div className="absolute inset-0 animate-pulse rounded-full border-[6px] border-emerald-500/30" />
                  <Maximize2 className="h-10 w-10 mb-3 group-hover:rotate-12 transition-transform duration-500" />
                  <span className="text-[12px] font-black uppercase tracking-tighter leading-none text-center">
                    Launch<br/>Dashboard
                  </span>
                  <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Sparkles className="h-3 w-3" />
                     <span className="text-[8px] font-black uppercase font-space">Sovereign Mode</span>
                  </div>
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* 🔮 THE SOVEREIGN DASHBOARD: Full-Screen Modal v1.5 */}
      <AnimatePresence>
        {isDashboardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex flex-col bg-zinc-950 text-white overflow-hidden"
          >
            {/* Header: v1.5 Muted Exit & Spacious Tabs */}
            <div className="px-5 pt-12 pb-8 border-b border-white/5 bg-zinc-950/80 backdrop-blur-2xl shrink-0 z-20">
              <div className="flex items-center justify-between mb-10 max-w-7xl mx-auto w-full">
                 <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                       <Scan className="h-5 w-5" />
                    </div>
                    <div>
                       <span className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase font-space animate-pulse">
                          ENCRYPTED AUDIT HUD
                       </span>
                       <h1 className="text-xl md:text-3xl font-black font-space tracking-tight">
                          Sovereign Dashboard 
                       </h1>
                    </div>
                 </div>

                 {/* v1.5 Muted Glassmorphic Exit */}
                 <button 
                    onClick={() => setIsDashboardOpen(false)}
                    className="group relative h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30 hover:rotate-90 shadow-xl"
                 >
                    <span className="sr-only">Close Audit</span>
                    <XIcon className="h-5 w-5" />
                 </button>
              </div>

              {/* Spacious Segmented Control v1.5 */}
              <div className="relative flex p-2 bg-black/60 border border-white/5 rounded-[1.5rem] max-w-4xl mx-auto w-full overflow-x-auto no-scrollbar scroll-smooth">
                  {TOOL_IDS.map((id, i) => {
                     const toolCopy = (t.leadHub?.tools as any)?.[id] ?? { name: id };
                     const isActive = activeIndex === i;
                     const ToolIcon = i === 0 ? BarChart3 : i === 1 ? Orbit : i === 2 ? Zap : i === 3 ? Fingerprint : ShieldCheck;

                     return (
                       <button
                         key={id}
                         onClick={() => setActiveIndex(i)}
                         className={`relative z-10 flex flex-1 items-center justify-center gap-4 min-w-[120px] py-4 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-500 font-space whitespace-nowrap px-8 ${
                           isActive ? "text-slate-950" : "text-slate-500 hover:text-slate-300"
                         }`}
                       >
                         <ToolIcon className={`h-5 w-5 transition-transform duration-500 ${isActive ? "text-black scale-110" : "text-emerald-500/30 group-hover:text-emerald-400"}`} />
                         {toolCopy.name.split(' ')[0]}
                         {isActive && (
                           <motion.div 
                             layoutId="dashboard-pill-v1.5"
                             className="absolute inset-0 z-[-1] bg-emerald-400 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                             transition={{ type: "spring", stiffness: 350, damping: 30 }}
                           />
                         )}
                       </button>
                     );
                  })}
              </div>
            </div>

            {/* Main Content: Locked Body + Fluid Core + Fade Gradients */}
            <div className="flex-grow relative overflow-y-auto overscroll-contain bg-zinc-950 px-4 md:px-8 pb-32">
               {/* Fade Gradients for visual continuity */}
               <div className="sticky top-0 left-0 right-0 h-12 bg-gradient-to-b from-zinc-950 to-transparent z-10 pointer-events-none" />
               
               <div className="max-w-6xl mx-auto w-full py-8 md:py-16">
                  <AnimatePresence mode="wait">
                     <motion.div
                       key={activeIndex}
                       initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                       animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                       exit={{ opacity: 0, y: -30, filter: "blur(20px)" }}
                       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                       className="w-full flex flex-col items-center"
                     >
                       <div className="w-full p-4 md:p-8 max-w-4xl rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-md">
                          {mounted.has(activeIndex) ? (
                              <div className="w-full">
                                  {(() => {
                                      const Tool = tools[activeIndex].component;
                                      return <Tool locale={locale} isDashboard={true} />;
                                  })()}
                              </div>
                          ) : (
                            <div className="flex min-h-[400px] flex-col items-center justify-center gap-6">
                               <Orbit className="h-10 w-10 text-emerald-500 animate-spin-slow" />
                               <div className="text-slate-500 font-space text-[12px] tracking-[0.4em] uppercase">
                                 Synchronizing Audit Node {activeIndex + 1}...
                               </div>
                            </div>
                          )}
                       </div>
                     </motion.div>
                  </AnimatePresence>
               </div>
               
               <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Global Authority Footer v1.5 */}
            <div className="fixed bottom-0 left-0 right-0 z-[600] px-6 py-8 border-t border-white/5 bg-zinc-950/90 backdrop-blur-xl">
                 <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 relative">
                             <Lock className="h-6 w-6" />
                             <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-pulse" />
                        </div>
                        <div>
                            <span className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] font-space mb-1">
                               System Integrity
                            </span>
                            <span className="block text-lg font-black text-white font-space tracking-tight">
                               Step {activeIndex + 1} of {total}: <span className="text-emerald-400">Encryption Active</span>
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex-grow max-w-sm w-full">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <span className="text-[10px] font-black text-emerald-500/60 font-space uppercase tracking-widest">Audit Logic: Propagating</span>
                            <span className="text-[10px] font-black text-emerald-500 font-space">{Math.round(((activeIndex+1)/total)*100)}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-[1px]">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" 
                              initial={false}
                              animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                         <button 
                            disabled={activeIndex === 0}
                            onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                            className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition duration-300 disabled:opacity-20 disabled:grayscale"
                         >
                            <ChevronLeft className="h-6 w-6" />
                         </button>
                         <button 
                            disabled={activeIndex === total - 1}
                            onClick={() => setActiveIndex(prev => Math.min(total - 1, prev + 1))}
                            className="h-14 px-8 rounded-2xl bg-emerald-500 text-slate-950 font-black uppercase text-[11px] tracking-widest hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] disabled:opacity-20 flex items-center gap-3"
                         >
                            Next Module
                            <ChevronRight className="h-5 w-5" />
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

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
