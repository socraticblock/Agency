"use client";

import { useCallback, useEffect, useRef, useState, type UIEvent } from "react";
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
            className={`-m-1.5 z-10 flex-none cursor-pointer touch-manipulation rounded-full border-2 p-1.5 transition-all duration-300 ${dot} ${
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
  const scrollRaf = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  /** Only mount heavy tool chunks for slides the user has opened (saves mobile CPU/RAM). */
  const [mounted, setMounted] = useState(() => new Set<number>([0]));

  const t = getMessages(locale);
  const total = tools.length;

  useEffect(() => {
    setMounted((prev) => {
      const next = new Set(prev);
      for (let d = -1; d <= 1; d++) {
        const i = activeIndex + d;
        if (i >= 0 && i < total) next.add(i);
      }
      return next;
    });
  }, [activeIndex, total]);

  const scrollToIndex = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: idx * el.clientWidth,
      behavior: "smooth",
    });
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = scrollRef.current;
      if (!el) return;
      const { scrollLeft, clientWidth } = el;
      const targetScroll =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      el.scrollTo({ left: targetScroll, behavior: "smooth" });
    },
    [],
  );

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (scrollRaf.current != null) return;
    scrollRaf.current = window.requestAnimationFrame(() => {
      scrollRaf.current = null;
      const { scrollLeft, clientWidth } = el;
      if (clientWidth <= 0) return;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex((prev) => (index !== prev ? index : prev));
    });
  }, []);

  return (
    <section
      id="interactive-audit"
      className="scroll-anchor-target mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >
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
        <p className="mt-4 text-base text-slate-400 sm:text-lg">{t.leadHub?.body}</p>
      </div>

      <AuditStepper
        id="audit-top-tracker"
        activeIndex={activeIndex}
        total={total}
        dotSize="md"
        className="scroll-anchor-target scroll-mt-4 mx-auto mb-8 flex max-w-3xl items-center px-4 md:px-10"
        onSelect={scrollToIndex}
      />

      <div className="group/slider relative">
        <div className="pointer-events-none absolute left-0 top-1/2 z-20 flex w-full -translate-y-1/2 justify-between px-2 opacity-100 transition-opacity md:px-0 md:opacity-0 md:group-hover/slider:opacity-100">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={activeIndex === 0}
            className={`pointer-events-auto min-h-11 min-w-11 touch-manipulation rounded-full border border-emerald-500/20 bg-slate-950/80 p-2 text-emerald-300 shadow-[0_4px_24px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all hover:bg-emerald-500/10 active:scale-95 md:-translate-x-6 md:min-h-0 md:min-w-0 md:p-3 ${
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
            className={`pointer-events-auto min-h-11 min-w-11 touch-manipulation rounded-full border border-emerald-500/20 bg-slate-950/80 p-2 text-emerald-300 shadow-[0_4px_24px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all hover:bg-emerald-500/10 active:scale-95 md:translate-x-6 md:min-h-0 md:min-w-0 md:p-3 ${
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
          className="flex flex-nowrap gap-0 overflow-x-auto overscroll-x-contain pb-4 scrollbar-hide snap-x snap-mandatory [-webkit-overflow-scrolling:touch] select-none"
        >
          {tools.map((tool, idx) => {
            const ToolComponent = tool.component;
            const toolCopy =
              (
                t.leadHub?.tools as
                  | Record<string, { name: string; description: string }>
                  | undefined
              )?.[tool.id] ?? { name: tool.id, description: "" };
            const isActive = activeIndex === idx;
            return (
              <div
                key={tool.id}
                className={`min-w-full shrink-0 snap-center px-4 transition-opacity duration-200 [scroll-snap-stop:always] md:px-6 ${
                  isActive ? "opacity-100" : "opacity-45"
                }`}
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
                {mounted.has(idx) ? (
                  <ToolComponent locale={locale} />
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-2xl border border-white/5 bg-slate-900/30 text-xs text-slate-500">
                    Swipe here to load this module
                  </div>
                )}

                {(activeIndex > 0 || activeIndex < total - 1) && (
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                    {activeIndex > 0 && (
                      <button
                        type="button"
                        onClick={() => scroll("left")}
                        className="group z-10 flex min-h-12 w-full touch-manipulation cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-5 py-3 font-space text-xs font-bold uppercase text-slate-300 transition-all hover:bg-white/5 active:scale-95 sm:w-auto"
                      >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Previous Audit Module
                      </button>
                    )}
                    {activeIndex < total - 1 && (
                      <button
                        type="button"
                        onClick={() => scroll("right")}
                        className="z-10 flex min-h-12 w-full touch-manipulation cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 font-space text-xs font-black uppercase text-slate-950 shadow-[0_4px_20px_rgba(16,185,129,0.25)] transition-all hover:bg-emerald-300 active:scale-95 sm:w-auto"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
