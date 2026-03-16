"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const TrueAudienceVisualizer = dynamic(() => import("./TrueAudienceVisualizer").then(mod => mod.TrueAudienceVisualizer), { ssr: false, loading: () => <div className="h-64 bg-slate-900/40 rounded-3xl animate-pulse border border-white/5 flex items-center justify-center text-xs text-slate-500">Loading Analyser...</div> });
const LostWeekendCalculator = dynamic(() => import("./LostWeekendCalculator").then(mod => mod.LostWeekendCalculator), { ssr: false, loading: () => <div className="h-64 bg-slate-900/40 rounded-3xl animate-pulse border border-white/5 flex items-center justify-center text-xs text-slate-500">Loading Calculator...</div> });
const FrictionRaceSimulator = dynamic(() => import("./FrictionRaceSimulator").then(mod => mod.FrictionRaceSimulator), { ssr: false, loading: () => <div className="h-64 bg-slate-900/40 rounded-3xl animate-pulse border border-white/5 flex items-center justify-center text-xs text-slate-500">Loading Simulator...</div> });
const TimeDebtReceipt = dynamic(() => import("./TimeDebtReceipt").then(mod => mod.TimeDebtReceipt), { ssr: false, loading: () => <div className="h-64 bg-slate-900/40 rounded-3xl animate-pulse border border-white/5 flex items-center justify-center text-xs text-slate-500">Loading Statement...</div> });
const PlatformRiskMeter = dynamic(() => import("./PlatformRiskMeter").then(mod => mod.PlatformRiskMeter), { ssr: false, loading: () => <div className="h-64 bg-slate-900/40 rounded-3xl animate-pulse border border-white/5 flex items-center justify-center text-xs text-slate-500">Loading Meter...</div> });
import type { Locale } from "@/lib/i18n";
import { KineticText } from "../KineticText";

interface LeadGenHubProps {
  locale: Locale;
}

const tools = [
  {
    id: "audience",
    name: "True Audience",
    description: "See your real reach",
    component: TrueAudienceVisualizer,
  },
  {
    id: "weekend",
    name: "Lost Weekend",
    description: "Calculate off-hours losses",
    component: LostWeekendCalculator,
  },
  {
    id: "friction",
    name: "Site Speed Race",
    description: "Link-in-bio vs. Premium",
    component: FrictionRaceSimulator,
  },
  {
    id: "time",
    name: "Time Debt",
    description: "What are your DMs costing you?",
    component: TimeDebtReceipt,
  },
  {
    id: "risk",
    name: "Platform Risk",
    description: "Test your business safety",
    component: PlatformRiskMeter,
  },
];

export function LeadGenHub({ locale }: LeadGenHubProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const triggerViewportCorrection = () => {
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const topBar = document.getElementById("audit-top-tracker");
      if (topBar) {
        // Calculate absolute position
        const rect = topBar.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        
        // Physics-driven velvet scroll
        animate(window.scrollY, absoluteTop - 4, {
          type: "spring",
          stiffness: 65,
          damping: 15,
          onUpdate: (latest) => window.scrollTo(0, latest)
        });
      }
    }, 400); // Wait for horizontal slider to land!
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const targetScroll =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });

      triggerViewportCorrection();
    }
  };

  const handleScroll = (e: any) => {
    const { scrollLeft, clientWidth } = e.target;
    // Debounce rounding issues
    const index = Math.round(scrollLeft / clientWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
    triggerViewportCorrection();
  };

  return (
    <section id="interactive-audit" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Interactive Audit
        </p>
        <KineticText
          text="Identify Your Hidden Bottlenecks"
          splitBy="word"
          delay={0.1}
          className="mt-4 justify-center text-3xl font-bold text-slate-100 sm:text-4xl"
        />
        <p className="mt-4 text-lg text-slate-400">
          Select a tool below to see exactly where your social-media-dependent business is losing money, time, and reach.
        </p>
      </div>

      {/* Top Banner Progress Stepper Line with node tracking dots */}
      <div id="audit-top-tracker" className="scroll-mt-4 max-w-3xl mx-auto mb-8 flex items-center px-4 md:px-10">
        {tools.map((_, idx) => (
          <div key={idx} className="flex flex-1 items-center last:flex-none">
            {/* The Dot Node */}
            <button 
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: idx * scrollRef.current.clientWidth,
                    behavior: "smooth",
                  });

                  triggerViewportCorrection();
                }
              }}
              className={`flex-none h-2.5 w-2.5 rounded-full border-2 transition-all duration-300 z-10 cursor-pointer ${
              idx <= activeIndex ? "border-emerald-400 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "border-slate-700 bg-slate-900"
            }`} 
          />
          {/* The Line Segment */}
          {idx < tools.length - 1 && (
            <div 
              className={`flex-1 h-[2px] transition-all duration-300 ${
                idx < activeIndex ? "bg-emerald-400" : "bg-white/10"
              }`} 
            />
          )}
          </div>
        ))}
      </div>

      {/* Main Container Wrapper with Absolute Arrows */}
      <div className="relative group/slider">
        {/* Navigation Arrows (Absolute overlay) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-20 pointer-events-none w-full flex justify-between px-2 md:px-0 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity">
          <button
            onClick={() => scroll("left")}
            disabled={activeIndex === 0}
            className={`pointer-events-auto p-2 md:p-3 rounded-full border border-emerald-500/20 bg-slate-950/80 backdrop-blur-md text-emerald-300 shadow-[0_4px_24px_rgba(16,185,129,0.15)] hover:bg-emerald-500/10 active:scale-95 transition-all md:-translate-x-6 ${activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={activeIndex === tools.length - 1}
            className={`pointer-events-auto p-2 md:p-3 rounded-full border border-emerald-500/20 bg-slate-950/80 backdrop-blur-md text-emerald-300 shadow-[0_4px_24px_rgba(16,185,129,0.15)] hover:bg-emerald-500/10 active:scale-95 transition-all md:translate-x-6 ${activeIndex === tools.length - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-nowrap gap-0 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide select-none"
        >
        {tools.map((tool, idx) => {
          const ToolComponent = tool.component;
          return (
            <motion.div
              key={tool.id}
              initial={false}
              animate={{
                scale: activeIndex === idx ? 1 : 0.40,
                opacity: activeIndex === idx ? 1 : 0.4,
                filter: activeIndex === idx ? "blur(0px)" : "blur(1px)",
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="min-w-full snap-center [scroll-snap-stop:always] px-4 md:px-6 transition-all origin-center"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-emerald-400 font-space">{tool.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{tool.description}</p>
              </div>
              <ToolComponent locale={locale} />

              {/* Bottom Banner Progress Stepper Line for Mobile viewports */}
              <div className="max-w-3xl mx-auto mt-4 mb-4 flex items-center px-4 md:px-10">
                {tools.map((_, idx) => (
                  <div key={idx} className="flex flex-1 items-center last:flex-none">
                    <button 
                      onClick={() => {
                        if (scrollRef.current) {
                          scrollRef.current.scrollTo({
                            left: idx * scrollRef.current.clientWidth,
                            behavior: "smooth",
                          });

                          triggerViewportCorrection();
                        }
                      }}
                      className={`flex-none h-2 w-2 rounded-full border-2 transition-all duration-300 z-10 cursor-pointer ${
                        idx <= activeIndex ? "border-emerald-400 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "border-slate-700 bg-slate-900"
                      }`} 
                    />
                    {idx < tools.length - 1 && (
                      <div 
                        className={`flex-1 h-[2px] transition-all duration-300 ${
                          idx < activeIndex ? "bg-emerald-400" : "bg-white/10"
                        }`} 
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      </div>
    </section>
  );
}
