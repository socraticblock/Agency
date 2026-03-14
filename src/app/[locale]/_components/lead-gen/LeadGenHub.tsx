"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrueAudienceVisualizer } from "./TrueAudienceVisualizer";
import { LostWeekendCalculator } from "./LostWeekendCalculator";
import { FrictionRaceSimulator } from "./FrictionRaceSimulator";
import { TimeDebtReceipt } from "./TimeDebtReceipt";
import { PlatformRiskMeter } from "./PlatformRiskMeter";

interface LeadGenHubProps {
  locale: string;
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
  const [activeTab, setActiveTab] = useState(0);

  const ActiveComponent = tools[activeTab].component;

  return (
    <section id="interactive-audit" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Interactive Audit
        </p>
        <h2 className="mt-4 text-3xl font-bold text-slate-100 sm:text-4xl">
          Identify Your Hidden Bottlenecks
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          Select a tool below to see exactly where your social-media-dependent business is losing money, time, and reach.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-4">
        {tools.map((tool, index) => (
          <button
            key={tool.id}
            onClick={() => setActiveTab(index)}
            className={`relative rounded-xl px-4 py-3 text-sm font-medium transition-all sm:px-6 ${
              activeTab === index
                ? "text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            {activeTab === index && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 rounded-xl bg-emerald-500/20 border border-emerald-500/30"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 block">{tool.name}</span>
            <span className="relative z-10 mt-1 hidden text-xs opacity-70 sm:block">
              {tool.description}
            </span>
          </button>
        ))}
      </div>

      {/* Active Tool Container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent locale={locale} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
