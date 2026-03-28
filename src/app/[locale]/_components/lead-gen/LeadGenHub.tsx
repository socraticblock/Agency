"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { AuditCitation } from "./AuditCitation";

type ToolId = 'audience' | 'weekend' | 'friction' | 'time' | 'risk';

const TOOL_IDS: ToolId[] = ['audience', 'weekend', 'friction', 'time', 'risk'];

export function LeadGenHub({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabStripRef = useRef<HTMLDivElement>(null);
  const dashboardContentRef = useRef<HTMLDivElement>(null);

  // Lazy Mount State to preserve mobile performance
  const [mounted, setMounted] = useState<Set<number>>(new Set([0]));
  const [isScienceOpen, setIsScienceOpen] = useState(false);
  const total = TOOL_IDS.length;

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

  const closeDashboard = useCallback(() => {
    setIsScienceOpen(false);
    setIsDashboardOpen(false);
  }, []);

  useEffect(() => {
    if (!isDashboardOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isScienceOpen) setIsScienceOpen(false);
      else closeDashboard();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDashboardOpen, isScienceOpen, closeDashboard]);

  // Reset vertical scroll when switching tools
  useEffect(() => {
    if (dashboardContentRef.current) {
      dashboardContentRef.current.scrollTo(0, 0);
    }
  }, [activeIndex]);

  // Update mounted tools and scroll state
  useEffect(() => {
    if (!hasMounted || !isDashboardOpen) return;

    const activeTab = tabRefs.current[activeIndex];
    if (activeTab && tabStripRef.current) {
      const container = tabStripRef.current;
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
      <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-slate-950/40 p-1 shadow-[0_32px_128px_-32px_rgba(0,0,0,0.8)]">
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
            className="fixed inset-0 z-[500] flex flex-col bg-[#030717] text-white overflow-hidden"
          >
            {/* 💎 SOVEREIGN SHINE (v2.1): Depth Layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.06),_transparent_70%)] opacity-100" />
            </div>

            {/* 🛸 COMPACT HEADER (v1.6): Single-Row on Mobile */}
            <div className="px-4 py-3 md:px-8 md:pt-2 md:pb-4 border-b border-white/5 bg-[#030717]/80 backdrop-blur-lg shrink-0 z-20 relative">
              <div className="flex items-center justify-between mb-2 md:mb-2 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3 md:gap-4 font-space">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Scan className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <span className="hidden md:block text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase animate-pulse">
                      ENCRYPTED AUDIT HUD
                    </span>
                    <h1 className="text-sm md:text-2xl font-black tracking-tight uppercase md:normal-case">
                      Sovereign Dashboard
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex items-center gap-1 md:gap-2 mr-2 md:mr-4">
                    <button
                      disabled={activeIndex === 0}
                      onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                      className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition disabled:opacity-20"
                    >
                      <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                    <div className="px-2 md:px-3 py-1 rounded-md bg-white/5 border border-white/10 flex items-center justify-center whitespace-nowrap min-w-[3rem]">
                      <span className="text-[10px] md:text-xs font-black font-space text-emerald-400">
                        {activeIndex + 1} / {total}
                      </span>
                    </div>
                    <button
                      disabled={activeIndex === total - 1}
                      onClick={() => setActiveIndex(prev => Math.min(total - 1, prev + 1))}
                      className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition disabled:opacity-20"
                    >
                      <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={closeDashboard}
                    className="group relative h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30 hover:rotate-90"
                  >
                    <XIcon className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                </div>
              </div>

              {/* v1.9 DYNAMIC PROGRESS LINE */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5">
                <motion.div
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  initial={false}
                  animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                  transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                />
              </div>

              {/* v1.6 SLIM TABS: Maximum Viewport Conservation (v1.8 Identity Refactor: Icons-Only) */}
              <div ref={tabStripRef} className="relative flex p-1 md:p-2 bg-black/60 border border-white/5 rounded-xl md:rounded-[1.5rem] max-w-4xl mx-auto w-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
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
                      <ToolIcon className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-500 ${isActive ? "text-black scale-110" : "text-white/40 group-hover:text-white/80"}`} />
                      {isActive && (
                        <motion.div
                          key="dashboard-pill-bg"
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

            <div
              ref={dashboardContentRef}
              className="flex-grow relative overflow-y-auto overscroll-contain bg-transparent px-0 md:px-8 z-10"
            >
              <div className="sticky top-0 left-0 right-0 h-4 md:h-6 bg-gradient-to-b from-[#030717] to-transparent z-10 pointer-events-none" />

              <div className="max-w-6xl mx-auto w-full py-4 md:pt-4 md:pb-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    layout="position"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Sovereign Stage Identity HUD (v1.9): Elevated Science Trigger */}
                    <div className="w-full max-w-4xl mx-auto px-4 mb-2 flex flex-col items-center">
                      <div className="w-full flex items-center gap-4">
                        <div className="h-[1px] flex-grow bg-white/5" />
                        <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white/80 whitespace-nowrap font-space">
                          [ {String(activeIndex + 1).padStart(2, '0')} // {(t.leadHub?.tools as any)?.[TOOL_IDS[activeIndex]]?.name} ]
                        </span>
                        <div className="h-[1px] flex-grow bg-white/5" />
                      </div>

                      <button
                        onClick={() => setIsScienceOpen(true)}
                        className="mt-2 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400/80 hover:text-emerald-400 transition outline-none"
                      >
                        <Scan className="h-3 w-3" />
                        [ View Audit Science ]
                      </button>
                    </div>

                    <div className="w-full p-2 md:p-10 max-w-4xl md:rounded-[2rem] md:border border-white/5 md:bg-white/[0.02] backdrop-blur-sm mb-0 md:mb-5">
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

                    {/* v2.0 GHOST NAVIGATION */}
                    <div className="w-full max-w-4xl mx-auto px-4 pb-6 md:pb-20 flex items-center justify-between">
                      <div>
                        {activeIndex > 0 && (
                          <button
                            onClick={() => setActiveIndex(activeIndex - 1)}
                            className="group flex flex-col items-start transition-all duration-300 outline-none"
                          >
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300">
                              ← Previous
                            </span>
                            <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all">
                              {(t.leadHub?.tools as any)?.[TOOL_IDS[activeIndex - 1]]?.name}
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 opacity-20">
                        {/* Horizontal pagination dots purged per objective */}
                      </div>

                      <div className="text-right">
                        {activeIndex < total - 1 && (
                          <button
                            onClick={() => setActiveIndex(activeIndex + 1)}
                            className="group flex flex-col items-end transition-all duration-300 outline-none"
                          >
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300">
                              Next →
                            </span>
                            <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all">
                              {(t.leadHub?.tools as any)?.[TOOL_IDS[activeIndex + 1]]?.name}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="sticky bottom-0 left-0 right-0 h-4 md:h-6 bg-gradient-to-t from-[#030717] to-transparent z-10 pointer-events-none" />
            </div>



            {/* 🛸 AUDIT SCIENCE OVERLAY */}
            <AnimatePresence>
              {isScienceOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsScienceOpen(false)}
                  className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-zinc-950/90 backdrop-blur-3xl cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-xl relative cursor-default"
                  >
                    <button
                      onClick={() => setIsScienceOpen(false)}
                      className="absolute -top-12 right-0 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>

                    <div className="clay-card p-2">
                      {(() => {
                        const currentTool = TOOL_IDS[activeIndex];
                        let data = { point: "", explanation: "", source: "" };

                        // Global Mapping Strategy
                        if (currentTool === 'audience') {
                          data = {
                            point: t.leadTools?.audience?.citationPoint,
                            explanation: t.leadTools?.audience?.citationExplanation,
                            source: t.leadTools?.audience?.citationSource
                          };
                        } else if (currentTool === 'weekend') {
                          data = {
                            point: "82% of consumers demand an immediate response.",
                            explanation: "Modern commerce operates 24/7. When your business sleeps, your competitors don't.",
                            source: "HubSpot Consumer Survey / Sprout Social Index"
                          };
                        } else if (currentTool === 'friction') {
                          data = {
                            point: t.leadTools?.friction?.citationPoint,
                            explanation: t.leadTools?.friction?.citationExplanation,
                            source: t.leadTools?.friction?.citationSource
                          };
                        } else if (currentTool === 'time') {
                          data = {
                            point: "Context switching costs 23 minutes of focus per interruption.",
                            explanation: "Every time you pause deep work to answer a basic 'how much is this?' DM, you pay a massive Time Debt.",
                            source: "UC Irvine Study"
                          };
                        } else if (currentTool === 'risk') {
                          data = {
                            point: t.leadTools?.risk?.citationPoint,
                            explanation: t.leadTools?.risk?.citationExplanation,
                            source: t.leadTools?.risk?.citationSource
                          };
                        }

                        return (
                          <AuditCitation
                            dataPoint={data.point}
                            explanation={data.explanation}
                            source={data.source}
                          />
                        );
                      })()}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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
