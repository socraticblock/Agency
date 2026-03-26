"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scan,
  Activity,
  Fingerprint,
  Zap,
  ShieldCheck,
  BarChart3,
  Orbit,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2
} from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";

// Tools Imports
import { TrueAudienceVisualizer } from "./TrueAudienceVisualizer";
import { FrictionRaceSimulator } from "./FrictionRaceSimulator";
import { LostWeekendCalculator } from "./LostWeekendCalculator";
import { TimeDebtReceipt } from "./TimeDebtReceipt";
import { PlatformRiskMeter } from "./PlatformRiskMeter";

type ToolId = 'audience' | 'weekend' | 'friction' | 'time' | 'risk';

const TOOL_IDS: ToolId[] = ['audience', 'weekend', 'friction', 'time', 'risk'];

export function LeadGenHub({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lazy Mount State to preserve mobile performance
  const [mounted, setMounted] = useState<Set<number>>(new Set([0]));

  const total = TOOL_IDS.length;
  const activeId = TOOL_IDS[activeIndex];

  const tools = [
    { id: 'audience', component: TrueAudienceVisualizer },
    { id: 'weekend', component: LostWeekendCalculator },
    { id: 'friction', component: FrictionRaceSimulator },
    { id: 'time', component: TimeDebtReceipt },
    { id: 'risk', component: PlatformRiskMeter },
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Update mounted tools and scroll state
  useEffect(() => {
    if (!hasMounted || !isDashboardOpen) return;

    // Center tab in the scroll view
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = activeTab.offsetLeft - (container.offsetWidth / 2) + (activeTab.offsetWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }

    setMounted(prev => {
      const next = new Set(prev);
      next.add(activeIndex);
      // Pre-mount neighbors
      [activeIndex - 1, activeIndex + 1].forEach(i => {
        if (i >= 0 && i < total) next.add(i);
      });
      return next;
    });
  }, [activeIndex, total, hasMounted, isDashboardOpen]);

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
                  Launch<br />Dashboard
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

      <AnimatePresence>
        {isDashboardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex flex-col bg-zinc-950 text-white overflow-hidden"
          >
            {/* 🛸 COMPACT HEADER (v1.6): Single-Row on Mobile */}
            <div className="px-4 py-4 md:px-8 md:pt-12 md:pb-8 border-b border-white/5 bg-zinc-950/80 backdrop-blur-2xl shrink-0 z-20">
              <div className="flex items-center justify-between mb-4 md:mb-10 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3 md:gap-4 font-space">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Scan className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <span className="hidden md:block text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase animate-pulse">
                      ENCRYPTED AUDIT HUD
                    </span>
                    <h1 className="text-sm md:text-3xl font-black tracking-tight uppercase md:normal-case">
                      Sovereign Dashboard
                    </h1>
                  </div>
                </div>

                <button
                  onClick={() => setIsDashboardOpen(false)}
                  className="group relative h-10 w-10 md:h-14 md:w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30 hover:rotate-90"
                >
                  <XIcon className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>

              {/* v1.6 SLIM TABS: Maximum Viewport Conservation (v1.8 Identity Refactor: Icons-Only) */}
              <div ref={scrollContainerRef} className="relative flex p-1 md:p-2 bg-black/60 border border-white/5 rounded-xl md:rounded-[1.5rem] max-w-4xl mx-auto w-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
                {TOOL_IDS.map((id, i) => {
                  const isActive = activeIndex === i;
                  const ToolIcon = i === 0 ? BarChart3 : i === 1 ? Orbit : i === 2 ? Zap : i === 3 ? Fingerprint : ShieldCheck;

                  return (
                    <button
                      key={id}
                      ref={el => { tabRefs.current[i] = el; }}
                      onClick={() => setActiveIndex(i)}
                      className={`relative z-10 flex flex-1 items-center justify-center gap-2 md:gap-4 min-w-[70px] md:min-w-[100px] py-2.5 md:py-4 px-4 md:px-8 text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-500 font-space whitespace-nowrap snap-center ${isActive ? "text-slate-950" : "text-slate-600 hover:text-slate-300"
                        }`}
                    >
                      <ToolIcon className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-500 ${isActive ? "text-black scale-110" : "text-emerald-500/10 group-hover:text-emerald-400"}`} />
                      {isActive && (
                        <motion.div
                          layoutId="dashboard-pill-v1.6"
                          className="absolute inset-0 z-[-1] bg-emerald-400 rounded-lg md:rounded-2xl"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 🚀 LEAN CORE (v1.6): 80% Viewport Area */}
            <div className="flex-grow relative overflow-y-auto overscroll-contain bg-zinc-950 px-0 md:px-8">
              <div className="sticky top-0 left-0 right-0 h-8 md:h-12 bg-gradient-to-b from-zinc-950 to-transparent z-10 pointer-events-none" />

              <div className="max-w-6xl mx-auto w-full py-4 md:py-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -30, filter: "blur(20px)" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Sovereign Stage Identity HUD (v1.8) */}
                    <div className="w-full max-w-4xl mx-auto px-4 mb-3">
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-grow bg-white/5" />
                        <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white/45 whitespace-nowrap font-space">
                          [ {String(activeIndex + 1).padStart(2, '0')} // {(t.leadHub?.tools as any)?.[TOOL_IDS[activeIndex]]?.name} ]
                        </span>
                        <div className="h-[1px] flex-grow bg-white/5" />
                      </div>
                    </div>

                    <div className="w-full p-4 md:p-8 max-w-4xl md:rounded-[2rem] md:border border-white/5 md:bg-white/[0.02] backdrop-blur-md">
                      {mounted.has(activeIndex) ? (
                        <div className="w-full">
                          {(() => {
                            const Tool = tools[activeIndex].component;
                            return <Tool locale={locale} isDashboard={true} />;
                          })()}
                        </div>
                      ) : (
                        <div className="flex min-h-[300px] flex-col items-center justify-center gap-6">
                          <Orbit className="h-8 w-8 text-emerald-500 animate-spin-slow" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="sticky bottom-0 left-0 right-0 h-8 md:h-12 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none" />
            </div>

            {/* 🛠 SLIM FOOTER (v1.6): Single-Row Unified Control */}
            <div className="shrink-0 px-4 py-4 md:px-12 md:py-10 border-t border-white/5 bg-zinc-950/95 backdrop-blur-3xl safe-area-bottom">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-12">
                <div className="hidden md:flex items-center gap-4 min-w-[200px]">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 relative">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div className="font-space">
                    <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Step {activeIndex + 1} of {total}</span>
                    <span className="block text-sm font-black text-white tracking-tight">Active Node Engaged</span>
                  </div>
                </div>

                <div className="flex-grow max-w-2xl">
                  <div className="flex justify-between items-center mb-1.5 md:mb-2 px-1">
                    <span className="text-[8px] md:text-[10px] font-black text-emerald-500/50 uppercase font-space tracking-[0.2em]">Audit Flow Matrix</span>
                    <span className="text-[9px] md:text-[10px] font-black text-emerald-400 font-space tracking-tighter">{Math.round(((activeIndex + 1) / total) * 100)}%</span>
                  </div>
                  <div className="h-1 md:h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                      initial={false}
                      animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                  <button
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                    className="h-10 w-10 md:h-14 md:w-14 rounded-lg md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition disabled:opacity-20"
                  >
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                  <button
                    disabled={activeIndex === total - 1}
                    onClick={() => setActiveIndex(prev => Math.min(total - 1, prev + 1))}
                    className="h-10 px-4 md:h-14 md:px-8 rounded-lg md:rounded-2xl bg-emerald-500 text-slate-950 font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-2 md:gap-3 shadow-[0_0_32px_rgba(16,185,129,0.3)] disabled:opacity-20"
                  >
                    <span className="hidden sm:inline">Next Module</span>
                    <span className="inline sm:hidden">Next</span>
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
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
