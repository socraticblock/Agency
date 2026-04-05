"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orbit, Scan } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";

// Tools Imports
import { TrueAudienceVisualizer } from "../TrueAudienceVisualizer";
import { FrictionRaceSimulator } from "../FrictionRaceSimulator";
import { LostWeekendCalculator } from "../LostWeekendCalculator";
import { TimeDebtReceipt } from "../TimeDebtReceipt";
import { PlatformRiskMeter } from "../PlatformRiskMeter";

// Sub-components
import { SovereignGate } from "./SovereignGate";
import { DashboardHeader } from "./DashboardHeader";
import { AuditScienceOverlay } from "./AuditScienceOverlay";

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
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
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
      <SovereignGate setIsDashboardOpen={setIsDashboardOpen} />

      {isDashboardOpen && (
        <div className="fixed inset-0 z-[500] flex flex-col bg-[#030717] text-white overflow-hidden">
          {/* Depth Layer */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.06),_transparent_70%)] opacity-100" />
          </div>

          <DashboardHeader
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            total={total}
            closeDashboard={closeDashboard}
            TOOL_IDS={TOOL_IDS}
            tabStripRef={tabStripRef}
            tabRefs={tabRefs}
          />

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
                  <div className="w-full max-w-4xl mx-auto px-4 mb-2 flex flex-col items-center">
                    <div className="w-full flex items-center gap-4">
                      <div className="h-[1px] flex-grow bg-white/5" />
                      <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white/80 whitespace-nowrap font-space">
                        [ {String(activeIndex + 1).padStart(2, "0")}{" "}
                        {"//"}{" "}
                        {(t.leadHub?.tools as any)?.[TOOL_IDS[activeIndex]]?.name} ]
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

                  {/* Ghost Navigation */}
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

          <AuditScienceOverlay
            isScienceOpen={isScienceOpen}
            setIsScienceOpen={setIsScienceOpen}
            TOOL_IDS={TOOL_IDS}
            activeIndex={activeIndex}
            t={t}
          />
        </div>
      )}
    </section>
  );
}
