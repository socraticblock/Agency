"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
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

type StageKey = "design" | "speed" | "conversion" | "bridge" | "intercept" | "vault";

interface AnimatedLighthouseScoreProps {
  value: number;
  duration?: number;
  small?: boolean;
}

function AnimatedLighthouseScore({ value, duration = 0.8, small = false }: AnimatedLighthouseScoreProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "circOut",
    });
    
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, value, duration, rounded]);

  const size = small ? "w-20 h-20" : "w-28 h-28";
  const strokeWidth = small ? "4" : "6";
  const radius = small ? "32" : "45";
  const textSize = small ? "text-xl" : "text-3xl";
  const viewbox = small ? "0 0 80 80" : "0 0 112 112";
  const center = small ? "40" : "56";

  return (
    <div className={`relative flex items-center justify-center ${size}`}>
      {/* Background Circle */}
      <svg className="absolute w-full h-full -rotate-90" viewBox={viewbox}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="stroke-emerald-400/10"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          className="stroke-emerald-400"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value / 100 }}
          transition={{ duration, ease: "circOut" }}
        />
      </svg>
      {/* Score Text */}
      <div className="flex flex-col items-center justify-center z-10">
        <div className={`${textSize} font-black font-space text-emerald-300`}>
          {displayValue}
        </div>
        {!small && (
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">PERFORMANCE</span>
        )}
      </div>
    </div>
  );
}

export function SovereignTriptych({ dict }: { dict: any }) {
  const t = { sovereign: dict }; // wrap to maintain t.sovereign.* paths securely

  const [activeTab, setActiveTab] = useState<StageKey>("design");
  const [activeTabMobile, setActiveTabMobile] = useState<StageKey | null>(null);
  const [conversationIndex, setConversationIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  // Cycle conversations every 8 seconds for the Vault tab
  useEffect(() => {
    const isVaultActive = activeTab === "conversion" || activeTabMobile === "conversion";
    if (!isVaultActive || isPaused) return;
    const interval = setInterval(() => {
      setConversationIndex((prev) => (prev === 3 ? 0 : prev + 1));
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
      key: "design" as const,
      icon: Layout,
      title: "High-End Design",
      hook: "Bespoke aesthetics for creators",
      body: "We build custom, bespoke interactive layouts with Next.js edge performance. Your website will look as premium as your content, matching your brand fully.",
      features: [
        "Unique Aesthetic Branding",
        "Responsive Grid Layouts",
        "Fluid Smooth Animations"
      ],
    },
    {
      key: "speed" as const,
      icon: Zap,
      title: "Lightning Fast",
      hook: "Optimized Core Web Vitals",
      body: "Sub-second Edge delivery: Because your customers' attention is your most expensive resource. If your site takes over 1 second to load, you lose up to 40% of incoming social traffic.",
      features: [
        "100/100 Page Speed Index",
        "Sub-second Edge-Cache Latency",
        "Optimized Bounce Mitigation"
      ],
    },
    {
      key: "conversion" as const,
      icon: Target,
      title: "Conversion Focused",
      hook: "Pixel-designed to drive action",
      body: "Every element of your grid aligns flawlessly to drive action and convert visitors into active customers. Bookings, product sales, and checkout flows.",
      features: [
        "Dynamic Booking Schedules",
        "Fluid Checkout Experience",
        "Responsive Overlay CTAs"
      ],
    },
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

      {/* 2-Column Tabs Layout */}
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
                  className={`relative w-full text-left p-4 rounded-xl transition-all cursor-pointer glass-card ${isActive
                    ? "shadow-[0_0_25px_rgba(16,185,129,0.12)] z-10"
                    : "opacity-70 hover:opacity-100 glass-card-hover"
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
                        {stage.key === "design" && (
                            <div className="flex flex-col items-center gap-1 scale-90">
                              <div className="text-2xl font-black font-space text-emerald-300">100/100</div>
                              <div className="text-[8px] font-mono uppercase tracking-widest text-slate-400">Custom UI Framework</div>
                              <div className="h-1 bg-emerald-400 rounded-full w-32" />
                            </div>
                          )}
                          {stage.key === "speed" && (
                            <div className="flex flex-col items-center gap-2 scale-90">
                              <AnimatedLighthouseScore value={100} duration={0.8} small />
                              <div className="px-3 py-1.5 rounded-xl border border-white/10 bg-black flex items-center gap-2">
                                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-bold text-white">Next.js Edge Speed</span>
                              </div>
                            </div>
                          )}
                          {stage.key === "conversion" && (
                            <div className="w-full relative h-full flex items-center justify-center scale-90">
                              {conversationIndex === 0 && (
                                <motion.div key="mob-book" className="clay-card border border-white/10 bg-[#070707] rounded-xl p-3 w-[200px] flex flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <div className="text-[8px] font-space font-bold uppercase tracking-widest text-slate-400">Dynamic Booking</div>
                                  <div className="grid grid-cols-4 gap-1">
                                    {["Mo", "Tu", "We", "Th"].map((day, i) => (
                                      <div key={i} className={`p-1 text-center rounded-md border text-[8px] ${i === 2 ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300" : "bg-white/5 border-white/5 text-slate-400"}`}>{day}</div>
                                    ))}
                                  </div>
                                  <motion.button className="w-full mt-1 bg-white/5 text-white font-space font-bold text-[9px] py-1.5 rounded-lg border border-white/10">Confirm</motion.button>
                                </motion.div>
                              )}
                              {conversationIndex === 1 && (
                                <motion.div key="mob-checkout" className="clay-card border border-white/10 bg-[#070707] rounded-xl p-3 w-[200px] flex flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <div className="flex justify-between items-center bg-white/5 p-1.5 rounded-lg">
                                    <div className="text-[10px] font-bold text-white">Elite Template</div>
                                    <div className="text-[10px] font-black text-emerald-400">350 ₾</div>
                                  </div>
                                  <motion.button className="w-full bg-emerald-400 text-black font-bold text-[9px] py-1.5 rounded-lg">Pay 300 ₾</motion.button>
                                </motion.div>
                              )}
                              {(conversationIndex === 2 || conversationIndex === 3) && (
                                <motion.div key="mob-cta" className="clay-card border border-white/10 bg-[#070707] rounded-xl p-3 w-[200px] flex flex-col gap-2 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <div className="text-[10px] font-black font-space text-emerald-300">🎉 DISCOUNT APPLIED!</div>
                                  <p className="text-[8px] text-slate-300">Book in 10 mins and save -50 ₾ Node.</p>
                                  <motion.button className="w-full bg-emerald-400 text-black font-bold text-[9px] py-1.5 rounded-lg">Claim Now</motion.button>
                                </motion.div>
                              )}
                            </div>
                          )}
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
                                {conversationIndex === 0 && (
                                  <motion.div key="mob-delivery" className="w-full space-y-1 p-2 scale-90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Do you ship to Batumi?</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Yes! 2-4 days. Want to check out?</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Yes, please!</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Link: <span className="underline">order.ge/checkout</span></motion.div>
                                  </motion.div>
                                )}
                                {conversationIndex === 1 && (
                                  <motion.div key="mob-flowers" className="w-full space-y-1 p-2 scale-90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">White roses available?</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Yes, we have 12 stems left in inventory! 🌹</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Book for 6:00 PM today.</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Link: <span className="underline">roses.ge/pay</span></motion.div>
                                  </motion.div>
                                )}
                                {conversationIndex === 2 && (
                                  <motion.div key="mob-pt" className="w-full space-y-1 p-2 scale-90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Do you have a special program to get more muscles in the legs?</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Yes! I have a 12-week Hypertrophy track forming extreme quads efficiently.</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Yes, please!</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Link: <span className="underline">train.ge/legs</span> or book an appointment for personalized training.</motion.div>
                                  </motion.div>
                                )}
                                {conversationIndex === 3 && (
                                  <motion.div key="mob-legal" className="w-full space-y-1 p-2 scale-90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">I need urgent help with an insurance case.</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">No problem, we are here to help you resolve this.</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-300 max-w-[85%]">Can I speak to someone now?</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 ml-auto max-w-[85%]">Calling 24/7 hotline now: <span className="underline border-transparent">+995...</span></motion.div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Left Arrow */}
                              <button
                                onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 0 ? 3 : prev - 1)); }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md p-1.5 rounded-r-xl border border-white/5 border-l-0 text-white z-20"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                              </button>

                              {/* Right Arrow */}
                              <button
                                onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 3 ? 0 : prev + 1)); }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md p-1.5 rounded-l-xl border border-white/5 border-r-0 text-white z-20"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                              </button>

                              {/* Paged Dots at Bottom center */}
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                                {[0, 1, 2, 3].map((idx) => (
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
                className={`relative w-full text-left p-5 rounded-2xl transition-all cursor-pointer glass-card ${isActive
                  ? "shadow-[0_0_30px_rgba(16,185,129,0.12)] z-10"
                  : "opacity-60 hover:opacity-100 glass-card-hover"
                  }`}
                layout
              >
                {isActive && (
                  <div className="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.1),_transparent_70%)]" />
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
              className="glass-card static md:sticky md:top-24 rounded-3xl p-8 shadow-[0_0_40px_rgba(16,185,129,0.08)] flex flex-col justify-between overflow-hidden group min-h-[400px]"
            >
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.4),_transparent_60%)]" />

              <div className="relative z-10 flex-1">
                <p className="text-sm leading-relaxed text-slate-200">
                  {activeStage.body}
                </p>

                <div className="mt-8 space-y-3">
                  {activeStage.features.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-mono text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Visual Indicator at Bottom */}
              <div className="relative mt-5 h-60 w-full overflow-hidden rounded-xl glass-card">
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  {activeTab === "design" && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-3xl font-black font-space text-emerald-300">100/100</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Custom UI Framework</div>
                      <div className="h-1 w-44 rounded-full bg-emerald-400" />
                    </div>
                  )}
                  {activeTab === "speed" && (
                    <div className="flex flex-col items-center gap-4">
                      <AnimatedLighthouseScore value={100} duration={0.8} />
                      <div className="px-5 py-3 rounded-2xl border border-white/10 bg-[#0a0a0a] flex items-center gap-4">
                        <div className="h-4 w-4 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-bold text-white">Next.js Edge Speed</span>
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mt-2">✅ Core Web Vitals Passed</div>
                    </div>
                  )}
                  {activeTab === "bridge" && (
                    <div className="w-full h-full flex items-center justify-center p-2">
                      <div className="relative w-full max-w-[340px] flex justify-between items-center">
                        <div className="flex flex-col gap-4 z-10">
                          {["Instagram", "TikTok", "Facebook"].map((item, i) => (
                            <motion.div
                              key={item}
                              className="px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2 text-[10px] font-bold text-slate-300"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                              {item}
                            </motion.div>
                          ))}
                        </div>
                        <div className="absolute inset-0">
                          <svg className="w-full h-full" viewBox="0 0 340 180">
                            {[40, 75, 110].map((y, i) => (
                              <motion.path
                                key={i}
                                d={`M 110 ${y} Q 170 ${y} 210 90`}
                                fill="transparent"
                                className="stroke-emerald-400/20"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                              />
                            ))}
                          </svg>
                        </div>
                        <motion.div
                          className="glass-card flex flex-col items-center justify-center p-3 rounded-2xl border border-emerald-400/20 w-[110px] h-[110px] z-10"
                        >
                          <Lock className="h-6 w-6 text-emerald-400 mb-1" />
                          <div className="text-[10px] font-bold text-white">Your Platform</div>
                          <div className="text-[8px] font-mono text-emerald-300 mt-1 uppercase">100% Owned</div>
                        </motion.div>
                      </div>
                    </div>
                  )}
                  {activeTab === "intercept" && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="px-5 py-3 rounded-2xl border border-white/10 bg-[#0a0a0a] flex items-center gap-4">
                        <div className="h-4 w-4 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-bold text-white">Pay with TBC</span>
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mt-2">✅ Success Message</div>
                    </div>
                  )}
                  {activeTab === "conversion" && (
                    <div className="w-full relative min-h-[220px] flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {conversationIndex === 0 ? (
                          <motion.div 
                            key="book-mesh" 
                            className="clay-card border border-white/10 bg-[#070707] rounded-2xl p-4 w-[240px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col gap-3"
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          >
                            <div className="text-[9px] font-space font-bold uppercase tracking-widest text-slate-400">Dynamic Booking Mesh</div>
                            <div className="text-[11px] font-bold text-white mt-1">Select A Time:</div>
                            
                            <div className="grid grid-cols-4 gap-1.5">
                              {["Mo", "Tu", "We", "Th"].map((day, i) => (
                                <div key={i} className={`p-1 text-center rounded-lg border text-[10px] font-bold ${i === 2 ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300" : "bg-white/5 border-white/5 text-slate-400"}`}>
                                  {day}
                                </div>
                              ))}
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 mt-1">
                              {["10:00 AM", "11:30 AM"].map((time, i) => (
                                <div key={i} className={`p-1.5 text-center rounded-lg border text-[9px] font-bold ${i === 0 ? "bg-emerald-400 text-black border-transparent" : "bg-white/5 border-white/5 text-slate-300"}`}>
                                  {time}
                                </div>
                              ))}
                            </div>

                            <motion.button className="w-full mt-1 bg-white/5 hover:bg-white/10 text-white font-space font-bold text-[10px] py-2 rounded-xl border border-white/10 flex items-center justify-center gap-1 shadow-sm">
                              Confirm Appointment
                            </motion.button>
                          </motion.div>
                        ) : conversationIndex === 1 ? (
                          <motion.div 
                            key="checkout-adv" 
                            className="clay-card border border-white/10 bg-[#070707] rounded-2xl p-4 w-[240px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col gap-3"
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          >
                            <div className="text-[9px] font-space font-bold uppercase tracking-widest text-slate-400">Fluid Checkout Advance</div>
                            <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                              <div>
                                <div className="text-xs font-bold text-white">Elite Template</div>
                                <div className="text-[8px] text-slate-400">Custom Dynamic setup</div>
                              </div>
                              <div className="text-xs font-black font-space text-emerald-400">350 ₾</div>
                            </div>
                            
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[9px] text-slate-300"><span>Subtotal</span><span>350 ₾</span></div>
                              <div className="flex justify-between text-[9px] text-emerald-400 font-bold"><span>Applied Coupon</span><span>-50 ₾</span></div>
                            </div>

                            <motion.button 
                              className="w-full bg-emerald-400 text-black font-space font-bold text-[10px] py-1.5 rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                              animate={{ scale: [1, 1.02, 1] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                              Pay 300 ₾
                            </motion.button>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="cta-popover" 
                            className="clay-card border border-white/10 bg-[#070707] rounded-2xl p-4 w-[240px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col gap-3"
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          >
                            <div className="text-[9px] font-space font-bold uppercase tracking-widest text-slate-400">Overlay CTA Track</div>
                            
                            <div className="relative p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/20 text-center space-y-2 mt-1">
                              <div className="text-[11px] font-black font-space text-emerald-300">🎉 DISCOUNT APPLIED!</div>
                              <p className="text-[9px] text-slate-200">Book within 10 minutes to save **$150 off** on checkout absolute layout.</p>
                              
                              <motion.div 
                                className="text-[10px] bg-emerald-400/20 text-emerald-300 font-black px-2 py-1 rounded-lg border border-emerald-400/30 inline-block"
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                              >
                                code: KVALI24
                              </motion.div>
                            </div>

                            <motion.button className="w-full bg-emerald-400 text-black font-space font-bold text-[10px] py-1.5 rounded-xl flex items-center justify-center gap-1 shadow-sm">
                              Claim Voucher
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Manual Navigation Arrows for Conversion */}
                      <button
                        onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 0 ? 2 : prev - 1)); }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/5 text-white/50 hover:text-white z-20 transition-all scale-90"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                      </button>

                      <button
                        onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 2 ? 0 : prev + 1)); }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/5 text-white/50 hover:text-white z-20 transition-all scale-90"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                      </button>

                      {/* Dots inside bottom panel footer layout centered */}
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/30 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/5 z-20">
                        {[0, 1, 2, 3].map((idx) => (
                          <div key={idx} className={`h-1 w-1 rounded-full ${conversationIndex === idx ? "bg-emerald-400 w-2" : "bg-white/20"} transition-all`} />
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === "vault" && (
                    <div>
                      <AnimatePresence mode="wait">
                        {conversationIndex === 0 && (
                          <motion.div key="chat-delivery" className="w-full max-w-xs space-y-2 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Do you ship to Batumi?
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Yes! Standard shipping is 2-4 days. Would you like to check out?
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Yes, please!
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Perfect! Here is your link: <span className="underline text-emerald-400">order.ge/checkout</span>
                            </motion.div>
                          </motion.div>
                        )}
                        {conversationIndex === 1 && (
                          <motion.div key="chat-flowers" className="w-full max-w-xs space-y-2 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Do you still have white roses available?
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Yes, we have 12 stems left in our current inventory! 🌹
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              I want to book them for 6:00 PM today.
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Done! Checkout instantly here to secure your booking: <span className="underline text-emerald-400">roses.ge/pay</span>
                            </motion.div>
                          </motion.div>
                        )}
                        {conversationIndex === 2 && (
                          <motion.div key="chat-pt" className="w-full max-w-xs space-y-2 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Do you have a special program to get more muscles in the legs?
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Yes! I have a 12-week Hypertrophy cycle designed to maximize leg mass efficiently. Want to review it?
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Yes, please!
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Awesome! Grab your guide here: <span className="underline text-emerald-400">train.ge/legs</span> or book an appointment for personalized training.
                            </motion.div>
                          </motion.div>
                        )}
                        {conversationIndex === 3 && (
                          <motion.div key="chat-legal" className="w-full max-w-xs space-y-2 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              I need urgent help with an insurance case.
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              No problem, we are here to help you resolve this.
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 max-w-[80%]" >
                              Can I speak to someone now?
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 ml-auto max-w-[80%]" >
                              Calling our 24/7 hotline now: <span className="underline text-emerald-400 font-bold">+995-555...</span> (Connecting)
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Manual Navigation Arrows for Desktop */}
                      <button
                        onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 0 ? 3 : prev - 1)); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/5 text-white/50 hover:text-white z-20 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                      </button>

                      <button
                        onClick={() => { setIsPaused(true); setConversationIndex((prev) => (prev === 3 ? 0 : prev + 1)); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/5 text-white/50 hover:text-white z-20 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                      </button>

                      {/* Dots inside bottom panel footer layout centered */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/5 z-20">
                        {[0, 1, 2, 3].map((idx) => (
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

