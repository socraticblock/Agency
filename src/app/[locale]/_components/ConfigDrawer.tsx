"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Lightbulb, Sparkles, Shield, Trash2 } from "lucide-react";
import { ServiceItem } from "@/constants/pricing";

interface ConfigDrawerProps {
  drawerItem: ServiceItem | null;
  setDrawerItem: (item: ServiceItem | null) => void;
  setFoundation: (id: string) => void;
  toggleModule: (id: string) => void;
  selectedModules: string[];
  activeFoundationId?: string | null;
}

const ANIMATION_OVERRIDES: Record<string, { whatItIs: string, howItHelps: string }> = {
  landing: {
    whatItIs: "Targeted kinetic prompts and high-performance button triggers. We engineer 'flicker-free' hover states and magnetic lead-magnet animations that subconsciously draw the visitor’s eye toward your primary Call to Action (CTA).",
    howItHelps: "It kills 'Banner Blindness.' By adding subtle, high-end motion to your 'Buy' or 'Sign Up' buttons, we increase the probability of a click by up to 30%. These animations act as a silent salesperson, guiding the user’s gaze through your sales narrative and ensuring they don't miss the most important part: the conversion."
  },
  cms: {
    whatItIs: "Seamless layout transitions and 'Elite-Tier' UI responses. We use advanced physics-based libraries to create fluid scroll-reveals and magnetic cursor interactions that make your brand identity feel expensive, stable, and world-class.",
    howItHelps: "The '0.1% Authority' Signal. High-ticket clients decide whether they trust you in the first 3 seconds. By making your site respond with 'Apple-level' fluidity, you signal that your business is meticulous and modern. It increases 'Dwell Time' and justifies premium pricing by making your digital infrastructure feel like a high-end physical office."
  },
  ecomm: {
    whatItIs: "Tactile product interactions and 'Satisfying' feedback loops. We engineer smooth product image morphs, instant 'Add to Cart' visual confirmations, and elegant cart-drawer reveals that provide the same sensory satisfaction as a physical luxury shopping trip.",
    howItHelps: "It reduces 'Buyer’s Friction.' Friction is what makes people abandon carts. By making the shopping experience feel lightweight and responsive, we remove the technical lag that kills impulse buys. It makes browsing your catalog a joy rather than a chore, directly increasing your 'Average Order Value' (AOV)."
  }
};

export default function ConfigDrawer({
  drawerItem,
  setDrawerItem,
  setFoundation,
  toggleModule,
  selectedModules,
  activeFoundationId
}: ConfigDrawerProps) {
  const activeOverride = drawerItem?.id === 'micro-animations' && activeFoundationId && ANIMATION_OVERRIDES[activeFoundationId];
  const whatItIsText = activeOverride ? activeOverride.whatItIs : drawerItem?.whatItIs;
  const howItHelpsText = activeOverride ? activeOverride.howItHelps : drawerItem?.howItHelps;

  return (
    <AnimatePresence>
      {drawerItem && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDrawerItem(null)}
          />
          <motion.div
            className="fixed bottom-0 md:bottom-auto md:top-0 right-0 left-0 md:left-auto w-full md:w-[420px] h-[85vh] md:h-screen bg-zinc-950 border-t md:border-t-0 md:border-l border-zinc-800 rounded-t-3xl md:rounded-none p-6 z-50 flex flex-col gap-4 shadow-2xl overflow-y-auto"
            initial={{ x: "100%", y: 0 }} animate={{ x: 0, y: 0 }} exit={{ x: "100%", y: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <button
              onClick={() => setDrawerItem(null)}
              className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-zinc-900/80 border border-white/5 backdrop-blur-md text-emerald-500 hover:scale-110 active:scale-95 transition-all shadow-2xl"
              aria-label="Close details"
            >
              <span className="text-xl font-black">×</span>
            </button>

            <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto mb-1 flex-shrink-0" />

            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 px-2.5 self-start mb-1">
              <div className={`h-1.5 w-1.5 rounded-full ${selectedModules.includes(drawerItem.id) || activeFoundationId === drawerItem.id ? 'bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-zinc-500'}`} />
              <span className={`text-[9px] font-black font-space uppercase tracking-wider ${selectedModules.includes(drawerItem.id) || activeFoundationId === drawerItem.id ? 'text-emerald-400' : 'text-zinc-400'}`}>
                [ STATUS: {activeFoundationId === drawerItem.id ? 'ACTIVE FOUNDATION' : selectedModules.includes(drawerItem.id) ? 'ACTIVE IN ARCHITECTURE' : activeFoundationId && (drawerItem.category === 'Base' || !drawerItem.category) ? 'PREVIEWING INCLUDED ASSET' : 'READY FOR DEPLOYMENT'} ]
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-black font-space text-emerald-400 uppercase tracking-wider">{drawerItem.category || "Foundation"}</span>
              <h3 className="text-xl font-black text-white">{drawerItem.name}</h3>
              <p className="text-sm text-slate-400 mt-1">{drawerItem.concept}</p>
            </div>

            {drawerItem.strategy && (
              <div className="border-t border-zinc-800/40 pt-3">
                <span className="text-xs font-black uppercase text-emerald-400 font-space flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5" /> Strategy Setup
                </span>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{drawerItem.strategy}</p>
              </div>
            )}

            {drawerItem.strategicBacking && (
              <div className="border-t border-zinc-800/40 pt-3 flex flex-col gap-3">
                <span className="text-xs font-black uppercase text-emerald-400 font-space flex items-center gap-1">
                  Strategic Backing: Why Upgrade?
                </span>
                {drawerItem.strategicBacking.map((item, id) => (
                  <div key={id} className="p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl flex flex-col gap-1">
                    <h4 className="text-sm font-black text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400"><span className="text-emerald-400 font-bold">The Fact:</span> {item.fact}</p>
                    <p className="text-xs text-slate-400"><span className="text-emerald-400 font-bold">The Reality:</span> {item.reality}</p>
                    <p className="text-xs text-emerald-300 font-bold bg-emerald-500/5 p-1 rounded mt-1 border border-emerald-500/10"><span className="text-white">The Cost:</span> {item.cost}</p>
                  </div>
                ))}
              </div>
            )}

            {whatItIsText && (
              <div className="border-t border-zinc-800/40 pt-3">
                <span className="text-xs font-black uppercase text-emerald-400 font-space flex items-center gap-1">
                  What It Is
                </span>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{whatItIsText}</p>
              </div>
            )}

            {howItHelpsText && (
              <div className="border-t border-zinc-800/40 pt-3">
                <span className="text-xs font-black uppercase text-emerald-400 font-space flex items-center gap-1">
                  Business ROI / How it Helps
                </span>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{howItHelpsText}</p>
              </div>
            )}

            {drawerItem.lawyerRole && (
              <div className="border-t border-zinc-800/40 pt-3 bg-emerald-500/5 p-2.5 rounded-xl border border-emerald-500/10">
                <span className="text-xs font-black uppercase text-emerald-400 font-space flex items-center gap-1">
                  Lawyer's Role
                </span>
                <p className="text-sm text-emerald-200 mt-1 leading-relaxed font-medium">{drawerItem.lawyerRole}</p>
              </div>
            )}

            {drawerItem.scope && (
              <div className="border-t border-zinc-800/40 pt-3 flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black uppercase text-emerald-400 font-space flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> WHAT YOU GET IN THIS BASE
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-1">
                  {drawerItem.scope.map((item, id) => (
                    <li key={id} className="text-sm text-slate-300 flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {drawerItem.proFeatures && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase text-emerald-400 font-space flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Pro Features
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {drawerItem.proFeatures.map((feat, i) => (
                    <div key={i} className="p-3 border border-zinc-800 bg-zinc-900/40 rounded-xl">
                      <span className="text-sm font-bold text-white">{feat.title}</span>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!activeFoundationId || activeFoundationId === drawerItem.id || drawerItem.category !== "Base") && (
              <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-zinc-800/80">
                <motion.button
                  initial={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (drawerItem.category === "Base" || !drawerItem.category) {
                      setFoundation(drawerItem.id);
                    } else {
                      toggleModule(drawerItem.id);
                    }
                    setTimeout(() => setDrawerItem(null), 250);
                  }}
                  className={`w-full font-black font-space py-3.5 rounded-xl text-xs uppercase flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${selectedModules.includes(drawerItem.id)
                    ? "bg-red-500/10 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    : "bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950"
                    }`}
                >
                  {selectedModules.includes(drawerItem.id) ? <Trash2 className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
                  {drawerItem.category === "Base" || !drawerItem.category
                    ? "Deploy Workspace"
                    : selectedModules.includes(drawerItem.id)
                      ? "Decommission Node"
                      : "Deploy Node"}
                </motion.button>

                <button
                  onClick={() => setDrawerItem(null)}
                  className={`w-full py-3.5 text-center text-xs font-black font-space tracking-widest uppercase border border-white/5 bg-zinc-900/40 hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-all rounded-xl cursor-pointer ${selectedModules.includes(drawerItem.id) ? 'border-red-500/30 text-red-500/60 hover:bg-red-500/10 hover:text-red-400' : ''
                    }`}
                >
                  {selectedModules.includes(drawerItem.id) ? "Back to Grid" : "Skip for now"}
                </button>
              </div>
            )}

            {activeFoundationId && activeFoundationId !== drawerItem.id && (drawerItem.category === "Base" || !drawerItem.category) && (
              <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-zinc-800/80">
                <button
                  onClick={() => setDrawerItem(null)}
                  className="w-full font-black font-space py-3.5 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 rounded-xl text-xs uppercase flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
                >
                  Return to foundation dashboard
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
