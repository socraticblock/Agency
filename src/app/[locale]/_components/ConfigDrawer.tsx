"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lightbulb, Sparkles, Shield, Trash2 } from "lucide-react";
import { ServiceItem } from "@/constants/pricing";
import { ANIMATION_OVERRIDES, WHATSAPP_INTAKE } from "@/constants/content";

interface ConfigDrawerProps {
  drawerItem: ServiceItem | null;
  setDrawerItem: (item: ServiceItem | null) => void;
  setFoundation: (id: string) => void;
  selectFoundationAndAdvance: (id: string) => void;
  toggleModule: (id: string) => void;
  selectedModules: string[];
  activeFoundationId?: string | null;
}




export default function ConfigDrawer({
  drawerItem,
  setDrawerItem,
  setFoundation,
  selectFoundationAndAdvance,
  toggleModule,
  selectedModules,
  activeFoundationId,
}: ConfigDrawerProps) {
  useEffect(() => {
    if (drawerItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerItem]);

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
            className="fixed inset-0 md:left-auto md:right-0 md:w-[420px] h-[100dvh] bg-zinc-950 border-t md:border-t-0 md:border-l border-zinc-800 p-6 pt-16 pb-5 md:pt-6 md:pb-6 z-[100] flex flex-col gap-4 shadow-2xl overflow-y-auto scrollbar-none"
            initial={{ x: 0, y: "100%" }} animate={{ x: 0, y: 0 }} exit={{ x: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
          >
            <button
              onClick={() => setDrawerItem(null)}
              className="fixed top-4 right-4 z-[110] p-2 rounded-full bg-zinc-900 border border-white/10 text-emerald-500 hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-md"
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

            {/* ── Action Footer ── */}
            {drawerItem.isBespoke ? (
              /* Enterprise Bespoke Block */
              <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-zinc-800/80">
                <div className="bg-black/40 border border-emerald-500/20 rounded-2xl p-4 flex flex-col items-center text-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden group/bespoke">
                  {/* Subtle Animated Glow Accent */}
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-50" />
                  
                  <div className="relative z-10 flex flex-col gap-1">
                    <span className="text-[10px] font-black font-space text-white/70 uppercase tracking-[0.2em] mb-1">
                      Total One-Time
                    </span>
                    <span className="text-xl font-black font-space text-amber-400 animate-pulse tracking-tight" style={{ textShadow: "0 0 15px rgba(251,191,36,0.3)" }}>
                      PROJECT-BASED
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const isUpgrade = drawerItem.id === 'upgrade';
                      const MSG = isUpgrade 
                        ? "Hi Genezisi! My site [ Add URL ] is acting slow and glitchy. I need an Architect to look under the hood for a Legacy Upgrade audit and custom renovation roadmap. Can we talk?"
                        : "Hi Genezisi! I just explored your Architect tool and I'm interested in a Customized Build. I have a specific project in mind that requires unique software logic. When are you free for a quick Discovery Call to discuss the architecture?";
                      window.open(`https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(MSG)}`, '_blank');
                    }}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-space rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative z-10"
                  >
                    Consult with Architect Directly <Sparkles className="h-4 w-4" />
                  </button>

                  <div className="relative z-10 text-[9px] font-bold text-emerald-500/40 uppercase tracking-widest font-space">
                    [ COMMAND DISPATCH ACTIVE ]
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Selection Flow */
              (!activeFoundationId || activeFoundationId === drawerItem.id || drawerItem.category !== "Base") && (
                <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-zinc-800/80">
                  <motion.button
                    initial={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (drawerItem.category === "Base" || !drawerItem.category) {
                        selectFoundationAndAdvance(drawerItem.id);
                      } else {
                        toggleModule(drawerItem.id);
                      }
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
              )
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
