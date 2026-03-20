"use client";

import { useState, useRef, type UIEvent } from "react";
import { motion, animate } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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

function AuditStepper({
  id,
  activeIndex,
  total,
  dotSize,
  className,
  onSelect,
}: {
  id?: string;
  activeIndex: number;
  total: number;
  dotSize: "sm" | "md";
  className: string;
  onSelect: (index: number) => void;
}) {
  const dot = dotSize === "md" ? "h-2.5 w-2.5" : "h-2 w-2";
  return (
    <div id={id} className={className}>
      {Array.from({ length: total }, (_, idx) => (
        <div key={idx} className="flex flex-1 items-center last:flex-none">
          <button
            type="button"
            onClick={() => onSelect(idx)}
            className={`z-10 flex-none cursor-pointer rounded-full border-2 transition-all duration-300 ${dot} ${
              idx <= activeIndex
                ? "border-emerald-400 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                : "border-slate-700 bg-slate-900"
            }`}
          />
          {idx < total - 1 && (
            <div
              className={`h-[2px] flex-1 transition-all duration-300 ${
                idx < activeIndex ? "bg-emerald-400" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function LeadGenHub({ locale }: LeadGenHubProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = getMessages(locale);
  const total = tools.length;

  const triggerViewportCorrection = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const topBar = document.getElementById("audit-top-tracker");
      if (topBar) {
        const rect = topBar.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        animate(window.scrollY, absoluteTop - 4, {
          type: "spring",
          stiffness: 65,
          damping: 15,
          onUpdate: (latest) => window.scrollTo(0, latest),
        });
      }
    }, 400);
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: idx * el.clientWidth,
      behavior: "smooth",
    });
    triggerViewportCorrection();
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth } = el;
    const targetScroll =
      direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    el.scrollTo({ left: targetScroll, behavior: "smooth" });
    triggerViewportCorrection();
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    const index = Math.round(scrollLeft / clientWidth);
    if (index !== activeIndex) setActiveIndex(index);
    triggerViewportCorrection();
  };

  return (
    <section id="interactive-audit" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          {t.leadHub?.label}
        </p>
        <KineticText
          text={t.leadHub?.title ?? "Identify your hidden bottlenecks"}
          splitBy="word"
          delay={0.1}
          className="mt-4 justify-center text-3xl font-bold text-slate-100 sm:text-4xl"
        />
        <p className="mt-4 text-lg text-slate-400">{t.leadHub?.body}</p>
      </div>

      <AuditStepper
        id="audit-top-tracker"
        activeIndex={activeIndex}
        total={total}
        dotSize="md"
        className="scroll-mt-4 mx-auto mb-8 flex max-w-3xl items-center px-4 md:px-10"
        onSelect={scrollToIndex}
      />

      <div className="group/slider relative">
        <div className="pointer-events-none absolute left-0 top-1/2 z-20 flex w-full -translate-y-1/2 justify-between px-2 opacity-100 transition-opacity md:px-0 md:opacity-0 md:group-hover/slider:opacity-100">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={activeIndex === 0}
            className={`pointer-events-auto rounded-full border border-emerald-500/20 bg-slate-950/80 p-2 text-emerald-300 shadow-[0_4px_24px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all hover:bg-emerald-500/10 active:scale-95 md:-translate-x-6 md:p-3 ${
              activeIndex === 0
                ? "cursor-not-allowed opacity-30"
                : "cursor-pointer"
            }`}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={activeIndex === total - 1}
            className={`pointer-events-auto rounded-full border border-emerald-500/20 bg-slate-950/80 p-2 text-emerald-300 shadow-[0_4px_24px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all hover:bg-emerald-500/10 active:scale-95 md:translate-x-6 md:p-3 ${
              activeIndex === total - 1
                ? "cursor-not-allowed opacity-30"
                : "cursor-pointer"
            }`}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-nowrap gap-0 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory select-none"
        >
          {tools.map((tool, idx) => {
            const ToolComponent = tool.component;
            const toolCopy =
              (
                t.leadHub?.tools as
                  | Record<string, { name: string; description: string }>
                  | undefined
              )?.[tool.id] ?? { name: tool.id, description: "" };
            return (
              <motion.div
                key={tool.id}
                initial={false}
                animate={{
                  scale: activeIndex === idx ? 1 : 0.4,
                  opacity: activeIndex === idx ? 1 : 0.4,
                  filter: activeIndex === idx ? "blur(0px)" : "blur(1px)",
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="min-w-full origin-center snap-center px-4 transition-all [scroll-snap-stop:always] md:px-6"
              >
                <div className="mb-4 text-center">
                  <h3 className="font-space text-xl font-bold text-emerald-400">
                    {toolCopy.name}
                  </h3>
                  {toolCopy.description && (
                    <p className="mt-0.5 text-xs text-slate-400">
                      {toolCopy.description}
                    </p>
                  )}
                </div>
                <ToolComponent locale={locale} />

                {(activeIndex > 0 || activeIndex < total - 1) && (
                  <div className="mt-8 flex justify-center gap-4">
                    {activeIndex > 0 && (
                      <button
                        type="button"
                        onClick={() => scroll("left")}
                        className="group z-10 flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-5 py-3 font-space text-xs font-bold uppercase text-slate-300 transition-all hover:bg-white/5 active:scale-95"
                      >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Previous Audit Module
                      </button>
                    )}
                    {activeIndex < total - 1 && (
                      <button
                        type="button"
                        onClick={() => scroll("right")}
                        className="z-10 flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 font-space text-xs font-black uppercase text-slate-950 shadow-[0_4px_20px_rgba(16,185,129,0.25)] transition-all hover:bg-emerald-300 active:scale-95"
                      >
                        Next Audit Module
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                )}

                <AuditStepper
                  activeIndex={activeIndex}
                  total={total}
                  dotSize="sm"
                  className="mx-auto mb-4 mt-4 flex max-w-3xl items-center px-4 md:px-10"
                  onSelect={scrollToIndex}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
