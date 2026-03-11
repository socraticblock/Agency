"use client";

import { motion, animate } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Zap,
  Globe,
  MessageSquare,
  TrendingDown,
} from "lucide-react";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { CitationBadge } from "./CitationBadge";

const AUDIT_PAYLOAD_KEY = "kvali_audit_payload";
const BASELINE_MONTHLY_GEL = 5000;
const SPEED_TAX = 0.07; // 7% per second (Deloitte/Google)
const TRUST_TAX = 0.15; // 15% (BrightLocal)

function KineticGEL({
  value,
  currencyLabel,
}: {
  value: number;
  currencyLabel: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "circOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);
  return (
    <span>
      {displayValue.toLocaleString()} {currencyLabel}
    </span>
  );
}

type AuditPayload = {
  targetRevenue?: string;
  businessName?: string;
  isGenesis?: boolean;
  [key: string]: unknown;
};

export function AuditResultsDashboard({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [isGenesis, setIsGenesis] = useState(false);
  const [estimatedLeak, setEstimatedLeak] = useState(0);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(AUDIT_PAYLOAD_KEY);
      if (raw) {
        const payload = JSON.parse(raw) as AuditPayload;
        const genesis = Boolean(payload.isGenesis);
        setIsGenesis(genesis);
        const monthly =
          Number.parseFloat(String(payload.targetRevenue || "").replace(/\D/g, "")) || 0;
        const baselineMonthly = monthly > 0 ? monthly : BASELINE_MONTHLY_GEL;
        const annualRevenue = baselineMonthly * 12;
        // Precision Leakage Calculation
        const totalLeak = genesis
          ? annualRevenue * 0.25 // Market Capture Opportunity
          : annualRevenue * (SPEED_TAX + TRUST_TAX); // Technical Debt Cost
        setEstimatedLeak(Math.round(totalLeak));
      } else {
        const annualRevenue = BASELINE_MONTHLY_GEL * 12;
        setEstimatedLeak(Math.round(annualRevenue * (SPEED_TAX + TRUST_TAX)));
      }
    } catch {
      const annualRevenue = BASELINE_MONTHLY_GEL * 12;
      setEstimatedLeak(Math.round(annualRevenue * (SPEED_TAX + TRUST_TAX)));
    }
  }, []);

  const title = isGenesis ? t.auditResults.titleGenesis : t.auditResults.title;
  const leakCardTitle = isGenesis
    ? t.auditResults.leakCardTitleGenesis
    : t.auditResults.leakCardTitle;
  const leakCardBody = isGenesis
    ? t.auditResults.leakCardBodyGenesis
    : t.auditResults.leakCardBody;
  const gradeValue = isGenesis ? t.auditResults.gradeValueGenesis : t.auditResults.gradeValue;
  const gradeSubtext = isGenesis
    ? t.auditResults.gradeSubtextGenesis
    : [
        t.auditResults.gradeLatency,
        t.auditResults.gradeMobile,
        t.auditResults.gradeSearch,
      ];

  const pillars = [
    {
      title: t.auditResults.engineTitle,
      icon: <Zap size={20} />,
      desc: t.auditResults.engineDesc,
      spec: t.auditResults.engineSpec,
    },
    {
      title: t.auditResults.shieldTitle,
      icon: <ShieldCheck size={20} />,
      desc: t.auditResults.shieldDesc,
      spec: t.auditResults.shieldSpec,
    },
    {
      title: t.auditResults.mapTitle,
      icon: <Globe size={20} />,
      desc: t.auditResults.mapDesc,
      spec: t.auditResults.mapSpec,
    },
    {
      title: t.auditResults.agentTitle,
      icon: <MessageSquare size={20} />,
      desc: t.auditResults.agentDesc,
      spec: t.auditResults.agentSpec,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] py-24 px-6 text-white selection:bg-[#00FF80]/30">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#00FF80]">
            {t.auditResults.badge}
          </span>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-7xl">
            {title}
          </h1>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl isolate z-10"
          >
            <div className="flex items-center gap-4 text-red-400">
              <TrendingDown size={24} />
              <h3 className="font-bold uppercase tracking-wider">
                {leakCardTitle}
              </h3>
            </div>
            <div className="mt-6 flex items-baseline gap-2 text-6xl font-black text-white">
              <KineticGEL
                value={estimatedLeak}
                currencyLabel={t.auditResults.currencyLabel}
              />
              <CitationBadge locale={locale} variant="speed" />
            </div>
            <p className="mt-4 leading-relaxed text-slate-400">
              {leakCardBody}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl isolate z-10"
          >
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase text-slate-500">
                  {t.auditResults.gradeLabel}
                </h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-8xl font-black text-[#00FF80]">
                    {gradeValue}
                  </p>
                  <CitationBadge locale={locale} variant="trust" />
                </div>
              </div>
              <div className="text-right font-mono text-sm text-slate-500">
                {typeof gradeSubtext === "string" ? (
                  <p>{gradeSubtext}</p>
                ) : (
                  <>
                    <p>{gradeSubtext[0]}</p>
                    <p>{gradeSubtext[1]}</p>
                    <p>{gradeSubtext[2]}</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {pillars.map((item, i: number) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="group rounded-2xl border border-white/5 bg-white/5 p-6 transition-all duration-500 hover:border-[#00FF80]/30 isolate z-10"
            >
              <div className="mb-4 text-[#00FF80]">{item.icon}</div>
              <h4 className="mb-2 text-lg font-bold">{item.title}</h4>
              <p className="text-sm text-slate-500 group-hover:text-slate-300">
                {item.desc}
              </p>
              <p className="mt-3 text-xs font-mono text-slate-500">
                {item.spec}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center justify-center pt-12"
        >
          <Link href={`/${locale}/book-strategy`}>
            <motion.span
              whileTap={{ scale: 0.98 }}
              className="group relative inline-block rounded-full bg-white px-12 py-5 font-bold text-black transition-transform"
            >
              <span className="relative z-10">{t.auditResults.cta}</span>
              <div className="absolute inset-0 rounded-full bg-[#00FF80] opacity-0 blur-xl transition-opacity group-hover:opacity-40" />
            </motion.span>
          </Link>
          <p className="mt-6 text-sm text-slate-600">
            {t.auditResults.scarcity}
          </p>
          <p className="mt-8 max-w-xl text-center text-xs font-mono text-slate-600">
            {t.auditResults.researchDisclaimer}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
