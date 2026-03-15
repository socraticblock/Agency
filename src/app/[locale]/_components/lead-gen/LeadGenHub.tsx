"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrueAudienceVisualizer } from "./TrueAudienceVisualizer";
import { LostWeekendCalculator } from "./LostWeekendCalculator";
import { FrictionRaceSimulator } from "./FrictionRaceSimulator";
import { TimeDebtReceipt } from "./TimeDebtReceipt";
import { PlatformRiskMeter } from "./PlatformRiskMeter";
import type { Locale } from "@/lib/i18n";
import { KineticText } from "../KineticText";

interface LeadGenHubProps {
  locale: Locale;
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
  return (
    <section id="interactive-audit" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Interactive Audit
        </p>
        <KineticText
          text="Identify Your Hidden Bottlenecks"
          splitBy="word"
          delay={0.1}
          className="mt-4 justify-center text-3xl font-bold text-slate-100 sm:text-4xl"
        />
        <p className="mt-4 text-lg text-slate-400">
          Select a tool below to see exactly where your social-media-dependent business is losing money, time, and reach.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex flex-nowrap gap-0 overflow-x-auto pb-16 snap-x snap-mandatory scrollbar-hide select-none">
        {tools.map((tool) => {
          const ToolComponent = tool.component;
          return (
            <div
              key={tool.id}
              className="min-w-full snap-center px-4 md:px-6 transition-transform"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-emerald-400 font-space">{tool.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{tool.description}</p>
              </div>
              <ToolComponent locale={locale} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
