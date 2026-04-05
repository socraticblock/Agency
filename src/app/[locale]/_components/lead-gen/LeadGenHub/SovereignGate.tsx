import { motion } from "framer-motion";
import { Scan, Activity, Fingerprint, Zap, ShieldCheck, Sparkles, Maximize2 } from "lucide-react";

export function SovereignGate({ setIsDashboardOpen }: { setIsDashboardOpen: (v: boolean) => void }) {
  return (
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
  );
}
