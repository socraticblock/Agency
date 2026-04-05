import { motion } from "framer-motion";
import { Scan, ChevronLeft, ChevronRight, BarChart3, Orbit, Zap, Fingerprint, ShieldCheck } from "lucide-react";

export function DashboardHeader({
  activeIndex,
  setActiveIndex,
  total,
  closeDashboard,
  TOOL_IDS,
  tabStripRef,
  tabRefs,
}: {
  activeIndex: number;
  setActiveIndex: (updater: (prev: number) => number) => void;
  total: number;
  closeDashboard: () => void;
  TOOL_IDS: string[];
  tabStripRef: React.RefObject<HTMLDivElement | null>;
  tabRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
}) {
  return (
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
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
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
              onClick={() => setActiveIndex((prev) => Math.min(total - 1, prev + 1))}
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
            <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5">
        <motion.div
          className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          initial={false}
          animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>

      <div ref={tabStripRef} className="relative flex p-1 md:p-2 bg-black/60 border border-white/5 rounded-xl md:rounded-[1.5rem] max-w-4xl mx-auto w-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
        {TOOL_IDS.map((id, i) => {
          const isActive = activeIndex === i;
          const ToolIcon = i === 0 ? BarChart3 : i === 1 ? Orbit : i === 2 ? Zap : i === 3 ? Fingerprint : ShieldCheck;

          return (
            <button
              key={id}
              ref={(el) => { tabRefs.current[i] = el; }}
              onClick={() => setActiveIndex(() => i)}
              className={`relative z-10 flex flex-1 items-center justify-center gap-2 md:gap-4 min-w-[70px] md:min-w-[100px] py-2.5 md:py-4 px-4 md:px-8 text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-500 font-space whitespace-nowrap snap-center ${
                isActive ? "text-slate-950" : "text-slate-600 hover:text-slate-300"
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
  );
}
