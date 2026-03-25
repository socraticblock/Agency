"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
// removed static i18n imports to decouple client bundle weights
import { Lock, CreditCard, MessageSquare, CheckCircle2, Layout, Zap, Target } from "lucide-react";
import { KineticText } from "./KineticText";

type StageKey = "design" | "speed" | "conversion" | "bridge" | "intercept" | "vault";

import dynamic from "next/dynamic";

const DesignVisual = dynamic(() => import("./SovereignVisualizers").then(mod => mod.DesignVisual), { ssr: false });
const SpeedVisual = dynamic(() => import("./SovereignVisualizers").then(mod => mod.SpeedVisual), { ssr: false });
const BridgeVisual = dynamic(() => import("./SovereignVisualizers").then(mod => mod.BridgeVisual), { ssr: false });
const InterceptVisual = dynamic(() => import("./SovereignVisualizers").then(mod => mod.InterceptVisual), { ssr: false });
const ConversionVisual = dynamic(() => import("./SovereignVisualizers").then(mod => mod.ConversionVisual), { ssr: false });
const VaultVisual = dynamic(() => import("./SovereignVisualizers").then(mod => mod.VaultVisual), { ssr: false });

export function SovereignTriptych({ dict }: { dict: any }) {
  const t = { sovereign: dict }; // wrap to maintain t.sovereign.* paths securely

  const [activeTab, setActiveTab] = useState<string>("design");
  const [activeTabMobile, setActiveTabMobile] = useState<string | null>(null);

  const FEATURES = [
    {
      key: "design" as const,
      icon: Layout,
      title: "High-End Design",
      hook: "Tailor-made aesthetics for creators",
      body: "We build unique, custom-built interactive layouts with Next.js edge performance. Your website will look as premium as your content, matching your brand fully.",
      features: ["Unique Aesthetic Branding", "Responsive Grid Layouts", "Fluid Smooth Animations"],
      Component: DesignVisual,
    },
    {
      key: "speed" as const,
      icon: Zap,
      title: "Lightning Fast",
      hook: "Optimized Core Web Vitals",
      body: "Sub-second Edge delivery: Because your customers' attention is your most expensive resource. Google research shows that as page load time increases from 1s to 3s, the probability of a bounce increases by 32%—meaning you lose nearly a third of your incoming social traffic before they even see your brand.",
      source: "Source: Google Consumer Insights / Think with Google",
      features: ["100/100 Page Speed Index", "Sub-second Edge-Cache Latency", "Optimized Bounce Mitigation"],
      Component: SpeedVisual,
    },
    {
      key: "conversion" as const,
      icon: Target,
      title: "Conversion Focused",
      hook: "Pixel-designed to drive action",
      body: "Every element of your grid aligns flawlessly to drive action and convert visitors into active customers. Bookings, product sales, and checkout flows.",
      features: ["Dynamic Booking Schedules", "Fluid Checkout Experience", "Responsive Overlay CTAs"],
      Component: ConversionVisual,
    },
    {
      key: "bridge" as const,
      icon: Lock,
      title: t.sovereign.bridgeTitle,
      hook: t.sovereign.bridgeHook,
      body: t.sovereign.bridgeBody,
      features: t.sovereign.bridgeFeatures,
      Component: BridgeVisual,
    },
    {
      key: "intercept" as const,
      icon: CreditCard,
      title: t.sovereign.interceptTitle,
      hook: t.sovereign.interceptHook,
      body: t.sovereign.interceptBody,
      features: t.sovereign.interceptFeatures,
      source: "*Note: Automated checkout requires an active Merchant Account with TBC or Bank of Georgia. We handle the technical integration; our legal partners can assist you in activating your merchant account correctly from day one.",
      Component: InterceptVisual,
    },
    {
      key: "vault" as const,
      icon: MessageSquare,
      title: t.sovereign.vaultTitle,
      hook: t.sovereign.vaultHook,
      body: t.sovereign.vaultBody,
      features: t.sovereign.vaultFeatures,
      source: "*Note: AI Agent deployment requires an external API subscription (e.g., OpenAI) and may incur third-party messaging fees (WhatsApp Business API). Kvali handles the architectural training and integration; usage-based costs are billed directly by the providers.",
      Component: VaultVisual,
    },
  ];

  const activeStage = FEATURES.find((s) => s.key === activeTab)!;

  return (
    <section
      id="footprint"
      className="scroll-anchor-target mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6"
    >
      <div className="mx-auto max-w-3xl text-center mb-16">
        <motion.p
          initial={false}
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
          initial={false}
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
          {FEATURES.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeTabMobile === stage.key;

            return (
              <div key={stage.key} className="p-0.5">
                <motion.button
                  type="button"
                  onClick={() => {
                    setActiveTabMobile(isActive ? null : stage.key);
                    setActiveTab(stage.key); // keep desktop state synced just in case
                  }}
                  className={`relative w-full touch-manipulation cursor-pointer rounded-xl p-4 text-left transition-all glass-card ${isActive
                    ? "shadow-[0_0_25px_rgba(16,185,129,0.12)] z-10"
                    : "opacity-70 hover:opacity-100 glass-card-hover"
                    }`}
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
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-[10px] font-medium text-emerald-400/80 mt-0.5">
                                {stage.hook}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                      {stage.source && (
                        <p className="text-[10px] text-slate-500 italic mt-0.5 font-medium">
                          {stage.source}
                        </p>
                      )}
                      <div className="space-y-2">
                        {stage.features.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <span className="text-[11px] font-mono text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* inline visual mockups just for this stage on mobile */}
                      <div className="relative h-40 w-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] mt-4 flex items-center justify-center scale-90">
                        <stage.Component />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* SIDEBAR (4/12): Sticky Navigation */}
        <div className="hidden md:col-span-4 md:space-y-4 md:block sticky top-24">
          {FEATURES.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeTab === stage.key;

            return (
              <motion.button
                key={stage.key}
                onClick={() => setActiveTab(stage.key)}
                className={`relative w-full text-left p-5 rounded-2xl transition-all cursor-pointer glass-card ${isActive
                  ? "z-10"
                  : "opacity-60 hover:opacity-100 glass-card-hover"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),_transparent_75%)] border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.12)] z-0"
                  />
                )}
                <div className={`flex gap-4 transition-all duration-300 ${isActive ? "items-start" : "items-center"}`}>
                  <div className={`p-2 rounded-xl border transition-all duration-300 ${isActive ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/5 text-slate-400"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`font-space text-lg font-bold transition-colors ${isActive ? "text-emerald-300" : "text-white"}`}>
                      {stage.title}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs font-medium text-emerald-400/80 mt-1">
                            {stage.hook}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* MAIN VIEWPORT (8/12): AnimatePresence Container */}
        <div className="hidden md:block md:col-span-8 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="glass-card static md:sticky md:top-24 rounded-3xl p-8 shadow-[0_0_40px_rgba(16,185,129,0.08)] backdrop-blur-md border border-white/10 flex flex-col justify-between overflow-hidden group min-h-[400px]"
            >
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.4),_transparent_60%)]" />

              <div className="relative z-10 flex-1">
                <p className="text-sm leading-relaxed text-slate-200">
                  {activeStage.body}
                </p>
                {activeStage.source && (
                  <p className="text-xs text-slate-500 italic mt-2 font-medium">
                    {activeStage.source}
                  </p>
                )}

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
                  <activeStage.Component />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

