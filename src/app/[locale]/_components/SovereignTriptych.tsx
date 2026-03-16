"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// removed static i18n imports to decouple client bundle weights
import { Lock, CreditCard, MessageSquare, CheckCircle2, Layout, Zap, Target } from "lucide-react";
import { KineticText } from "./KineticText";

const pillars = [
  {
    icon: Layout,
    title: "High-End Design",
    description: "Websites that look as good as your content. Custom aesthetics that match your personal brand perfectly.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed. Don't lose potential clients to slow loading times. Core Web Vitals are our priority.",
  },
  {
    icon: Target,
    title: "Conversion Focused",
    description: "Every pixel is designed to drive action. Whether it's newsletter signups, bookings, or product sales.",
  },
];

type StageKey = "bridge" | "intercept" | "vault";

export function SovereignTriptych({ dict }: { dict: any }) {
  const t = { sovereign: dict }; // wrap to maintain t.sovereign.* paths securely

  const [activeTab, setActiveTab] = useState<StageKey>("bridge");
  const [activeTabMobile, setActiveTabMobile] = useState<StageKey | null>(null);
  const [conversationIndex, setConversationIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  // Cycle conversations every 8 seconds for the Vault tab
  useEffect(() => {
    const isVaultActive = activeTab === "vault" || activeTabMobile === "vault";
    if (!isVaultActive || isPaused) return;
    const interval = setInterval(() => {
      setConversationIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 9000);
    return () => clearInterval(interval);
  }, [activeTab, activeTabMobile, isPaused]);

  // Auto-resume after 12s of no interaction
  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => setIsPaused(false), 12000);
      return () => clearTimeout(timeout);
    }
  }, [isPaused]);

  const stages = [
    {
      key: "bridge" as const,
      icon: Lock,
      title: t.sovereign.bridgeTitle,
      hook: t.sovereign.bridgeHook,
      body: t.sovereign.bridgeBody,
      features: t.sovereign.bridgeFeatures,
    },
    {
      key: "intercept" as const,
      icon: CreditCard,
      title: t.sovereign.interceptTitle,
      hook: t.sovereign.interceptHook,
      body: t.sovereign.interceptBody,
      features: t.sovereign.interceptFeatures,
    },
    {
      key: "vault" as const,
      icon: MessageSquare,
      title: t.sovereign.vaultTitle,
      hook: t.sovereign.vaultHook,
      body: t.sovereign.vaultBody,
      features: t.sovereign.vaultFeatures,
    },
  ];

  const activeStage = stages.find((s) => s.key === activeTab)!;

  return (
    <section id="footprint" className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400"
        >
          {t.sovereign.triptychLabel}
        </motion.p>
        <KineticText
          text="Your presence, fully owned."
          splitBy="word"
          delay={0.1}
          className="mt-3 justify-center text-2xl font-space font-bold text-white sm:text-4xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-base text-white/70 sm:text-lg"
        >
          {t.sovereign.triptychSubheading}
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-16 max-w-5xl mx-auto px-2">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="clay-card clay-card-hover rounded-2xl border border-emerald-500/30 p-6 shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/5 text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
              
              <h3 className="font-space text-lg font-bold text-white mb-2">
                {pillar.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-slate-400">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-10 md:grid-cols-12 items-start">
        {/* MOBILE LAYOUT: Accordion-style inline cards */}
        <div className="md:hidden space-y-3">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeTabMobile === stage.key;

            return (
              <div key={stage.key} className="p-0.5">
                <motion.button
                  onClick={() => {
                    setActiveTabMobile(isActive ? null : stage.key);
                    setActiveTab(stage.key); // keep desktop state synced just in case
                  }}
                  className={`relative w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${isActive
                    ? "border-emerald-500/30 bg-white/[0.03]"
                    : "border-white/5 bg-transparent"
                    }`}
                  layout
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg border ${isActive ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300" : "border-white/5 bg-white/5 text-slate-400"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className={`font-space text-sm font-bold transition-colors ${isActive ? "text-emerald-300" : "text-white"}`}>
                          {stage.title}
                        </h3>
                        <p className="text-[10px] font-medium text-emerald-400/80">
                          {stage.hook}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                        {isActive ? "Close" : "Expand"}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-500 transition-transform ${isActive ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-[#0a0a0a] rounded-xl border border-white/5 mt-2 p-4 space-y-4"
                    >
                      <p className="text-xs leading-relaxed text-slate-200">
                        {stage.body}
                      </p>
                      <div className="space-y-2">
                        {stage.features.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <span className="text-[11px] font-mono text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* inline visual mockups just for this stage on mobile */}
                      <div className="relative h-40 w-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] mt-4 flex items-center justify-center">
                        {stage.key === "bridge" && (
                          <div className="flex flex-col items-center gap-1 scale-90">
                            <div className="text-2xl font-black font-space text-emerald-300">100/100</div>
                            <div className="text-[8px] font-mono uppercase tracking-widest text-slate-400">Next.js Edge</div>
                            <div className="h-1 bg-emerald-400 rounded-full w-32" />
                          </div>
                        )}
                        {stage.key === "intercept" && (
                          <div className="flex flex-col items-center gap-1 scale-90">
                            <div className="px-3 py-2 rounded-xl border border-white/10 bg-black flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-xs font-bold text-white">Pay with TBC</span>
                            </div>
                          </div>
                        )}
                        {stage.key === "vault" && (
                          <div className="w-full relative">
                            <AnimatePresence mode="wait">
                              {conversationIndex === 0 ? (
                                <motion.div key="mob-delivery" className="w-full space-y-1 p-2 scale-90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Do you ship to Batumi?</motion.div>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Yes! 2-4 days. Want to check out?</motion.div>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Yes, please!</motion.div>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Link: <span className="underline">order.ge/checkout</span></motion.div>
                                </motion.div>
                              ) : conversationIndex === 1 ? (
                                <motion.div key="mob-flowers" className="w-full space-y-1 p-2 scale-90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">White roses available?</motion.div>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Yes, 12 stems left! 🌹</motion.div>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Book for 6:00 PM today.</motion.div>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Link: <span className="underline">roses.ge/pay</span></motion.div>
                                </motion.div>
                              ) : (
                                <motion.div key="mob-legal" className="w-full space-y-1 p-2 scale-90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">I need urgent help with insurance.</motion.div>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">We are here to help resolve this.</motion.div>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Can I speak now?</motion.div>
                                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Calling hotline: <span className="underline">+995...</span></motion.div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Left Arrow */}
                            <button
                              onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 0 ? 2 : prev - 1)); }}
                              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md p-1.5 rounded-r-xl border border-white/5 border-l-0 text-white z-20"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </button>

                            {/* Right Arrow */}
                            <button
                              onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 2 ? 0 : prev + 1)); }}
                              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md p-1.5 rounded-l-xl border border-white/5 border-r-0 text-white z-20"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </button>

                            {/* Paged Dots at Bottom center */}
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                              {[0, 1, 2].map((idx) => (
                                <div key={idx} className={`h-1 w-1 rounded-full ${conversationIndex === idx ? "bg-emerald-400 w-1.5" : "bg-white/20"} transition-all`} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* DESKTOP LAYOUT (>= md): Navigation/Content */}
        <div className="hidden md:col-span-5 md:space-y-4 md:block">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeTab === stage.key;

            return (
              <motion.button
                key={stage.key}
                onClick={() => setActiveTab(stage.key)}
                className={`relative w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${isActive
                  ? "clay-card border-emerald-500/40 shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_24px_rgba(16,185,129,0.12)]"
                  : "border-white/5 hover:border-white/10 bg-transparent"
                  }`}
                whileHover={{ x: isActive ? 0 : 4 }}
                layout
              >
                {isActive && (
                  <motion.div
                    layoutId="active-glow"
                    className="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.1),_transparent_70%)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-xl border ${isActive ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/5 text-slate-400"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`font-space text-lg font-bold transition-colors ${isActive ? "text-emerald-300" : "text-white"}`}>
                      {stage.title}
                    </h3>
                    <p className="text-xs font-medium text-emerald-400/80 mt-1">
                      {stage.hook}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* DESKTOP RIGHT SIDE: Visual Visualizer */}
        <div className="hidden md:block md:col-span-7 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="clay-card static md:sticky md:top-24 rounded-3xl border border-emerald-500/40 p-8 shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-between overflow-hidden group min-h-[400px]"
            >
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.4),_transparent_60%)] group-hover:opacity-30 transition-opacity" />

              <div className="relative z-10 flex-1">
                <p className="text-sm leading-relaxed text-slate-200">
                  {activeStage.body}
                </p>

                <div className="mt-8 space-y-3">
                  {activeStage.features.map((item: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-mono text-slate-300">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Dynamic Visual Indicator at Bottom */}
              <div className="relative mt-5 h-52 w-full overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  {activeTab === "bridge" && (
                    <motion.div className="flex flex-col items-center gap-2">
                      <div className="text-3xl font-black font-space text-emerald-300">100/100</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Next.js Edge Speed</div>
                      <motion.div className="h-1 bg-emerald-400 rounded-full" animate={{ width: [0, 180] }} transition={{ duration: 0.8, ease: "easeOut" }} />
                    </motion.div>
                  )}
                  {activeTab === "intercept" && (
                    <motion.div className="flex flex-col items-center gap-2">
                      <div className="px-5 py-3 rounded-2xl border border-white/10 bg-[#0a0a0a] flex items-center gap-4">
                        <div className="h-4 w-4 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-bold text-white">Pay with TBC</span>
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mt-2">✅ Success Message</div>
                    </motion.div>
                  )}
                  {activeTab === "vault" && (
                    <div>
                      <AnimatePresence mode="wait">
                        {conversationIndex === 0 ? (
                          <motion.div key="chat-delivery" className="w-full max-w-xs space-y-2 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* Step 1: User Question */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Do you ship to Batumi?
                            </motion.div>
                            {/* Step 2: AI Response */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Yes! Standard shipping is 2-4 days. Would you like to check out?
                            </motion.div>
                            {/* Step 3: User Confirmation */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Yes, please!
                            </motion.div>
                            {/* Step 4: AI Checkout Link */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Perfect! Here is your link: <span className="underline text-emerald-400">order.ge/checkout</span>
                            </motion.div>
                          </motion.div>
                        ) : conversationIndex === 1 ? (
                          <motion.div key="chat-flowers" className="w-full max-w-xs space-y-2 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* Step 1: User Question */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Do you still have white roses available?
                            </motion.div>
                            {/* Step 2: AI Response */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Yes, we have 12 stems left in our current inventory! 🌹
                            </motion.div>
                            {/* Step 3: User Confirmation */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              I want to book them for 6:00 PM today.
                            </motion.div>
                            {/* Step 4: AI Checkout Link */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Done! Checkout instantly here to secure your booking: <span className="underline text-emerald-400">roses.ge/pay</span>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.div key="chat-legal" className="w-full max-w-xs space-y-2 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* Step 1: User Question */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              I need urgent help with an insurance case.
                            </motion.div>
                            {/* Step 2: AI Response */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              No problem, we are here to help you resolve this.
                            </motion.div>
                            {/* Step 3: User Confirmation */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Can I speak to someone now?
                            </motion.div>
                            {/* Step 4: AI Checkout/Action Link */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Calling our 24/7 hotline now: <span className="underline text-emerald-400 font-bold">+995-555...</span> (Connecting)
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Manual Navigation Arrows for Desktop */}
                      <button
                        onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 0 ? 2 : prev - 1)); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/5 text-white/50 hover:text-white z-20 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                      </button>

                      <button
                        onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 2 ? 0 : prev + 1)); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/5 text-white/50 hover:text-white z-20 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                      </button>

                      {/* Dots inside bottom panel footer layout centered */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/5 z-20">
                        {[0, 1, 2].map((idx) => (
                          <div key={idx} className={`h-1.5 w-1.5 rounded-full ${conversationIndex === idx ? "bg-emerald-400 w-2.5" : "bg-white/20"} transition-all`} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

