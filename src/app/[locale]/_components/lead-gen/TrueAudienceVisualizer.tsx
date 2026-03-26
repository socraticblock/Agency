"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { AuditCitation } from "./AuditCitation";
import { getMessages, type Locale } from "@/lib/i18n";
import { Scan, X } from "lucide-react";

interface TrueAudienceVisualizerProps {
  locale: Locale;
  isDashboard?: boolean;
}

export function TrueAudienceVisualizer({ locale, isDashboard }: TrueAudienceVisualizerProps) {
  const [followers, setFollowers] = useState(10000);
  const [engagementRate, setEngagementRate] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const t = getMessages(locale);

  // Calculate reached audience
  const reachedAudience = Math.floor(followers * (engagementRate / 100));

  // Generate dots for visualization (kept intentionally light for smooth animation)
  const maxDots = 200; // 10x20 grid
  const dotsToDisplay = Math.min(followers, maxDots);
  const activeDots = Math.max(1, Math.floor(dotsToDisplay * (engagementRate / 100)));

  const dots = useMemo(() => {
    return Array.from({ length: maxDots }).map((_, i) => ({
      id: i,
      isActive: i < activeDots,
    }));
  }, [activeDots, maxDots]);

  const content = (
    <div className={`grid gap-5 md:gap-8 md:grid-cols-2 ${isDashboard ? "flex-grow flex flex-col-reverse justify-end" : ""}`}>
      {/* Controls */}
      <div className={`space-y-6 ${isDashboard ? "px-6 pb-20 pt-4" : ""}`}>
        <div>
          <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
            <span>{t.leadTools?.audience?.totalFollowersLabel}</span>
            <span className="text-emerald-400">{followers.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={followers}
            onChange={(e) => setFollowers(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-500"
            style={{ touchAction: 'none' }}
          />
        </div>

        <div>
          <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
            <span>{t.leadTools?.audience?.engagementRateLabel}</span>
            <span className="text-emerald-400">{engagementRate}%</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={engagementRate}
            onChange={(e) => setEngagementRate(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-500"
            style={{ touchAction: 'none' }}
          />
        </div>

        <div className="relative rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <h3 className="text-lg font-semibold text-red-200">
            {t.leadTools?.audience?.insightTitle}
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            {t.leadTools?.audience?.insightBodyPrefix}{" "}
            <strong className="text-white">{followers.toLocaleString()}</strong>{" "}
            {t.leadTools?.audience?.insightBodyMiddle}{" "}
            <strong className="text-red-400">
              {reachedAudience.toLocaleString()}
            </strong>{" "}
            {t.leadTools?.audience?.insightBodySuffix}
          </p>

        </div>


        {!isDashboard && (
           <AuditCitation
             dataPoint={t.leadTools?.audience?.citationPoint}
             explanation={t.leadTools?.audience?.citationExplanation}
             source={t.leadTools?.audience?.citationSource}
           />
        )}

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
          >
            {t.leadTools?.audience?.cta}
          </button>
        )}
      </div>

      {/* Visualization */}
      <div className={`flex items-center justify-center rounded-2xl bg-black/60 border border-white/5 relative ${isDashboard ? "min-h-[40%] m-4" : "p-6"}`}>
        {isDashboard && (
          <div className="absolute bottom-4 right-4 z-10">
            {/* Science moved to global LeadGenHub Stage HUD */}
          </div>
        )}
        <div className="grid grid-cols-20 gap-1 sm:gap-1.5" style={{ gridTemplateColumns: 'repeat(20, minmax(0, 1fr))' }}>
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              initial={false}
              animate={{
                backgroundColor: dot.isActive ? "#34d399" : "#334155",
                scale: dot.isActive ? 1 : 0.8,
                opacity: dot.isActive ? 1 : 0.3,
              }}
              transition={{ duration: 0.4 }}
              className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (isDashboard) {
    return (
      <>
        {content}
        {showForm && (
           <div className="fixed inset-0 z-[110] bg-zinc-950 p-6 overflow-y-auto">
              <button 
                onClick={() => setShowForm(false)}
                className="mb-8 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400"
              >
                ✕
              </button>
              <LeadCaptureForm
                locale={locale}
                toolName="True Audience Visualizer"
                painPoint={`${t.leadTools?.audience?.leadPainPointPrefix} ${reachedAudience} ${t.leadTools?.audience?.leadPainPointSuffix} ${followers}`}
                ctaText={t.leadTools?.audience?.leadCta}
              />
           </div>
        )}
      </>
    );
  }

  return (
    <div className="clay-card clay-card-hover mx-auto max-w-3xl border-emerald-500/40 p-5 md:p-10 shadow-2xl shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)] md:p-10">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          {t.leadTools?.audience?.title ?? 'Your audience, visualised'}
        </h2>
        <p className="mt-2 text-slate-400">
          {t.leadTools?.audience?.subtitle}
        </p>
      </div>

      {content}

      {/* Lead Capture Form */}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="True Audience Visualizer"
          painPoint={`${t.leadTools?.audience?.leadPainPointPrefix} ${reachedAudience} ${t.leadTools?.audience?.leadPainPointSuffix} ${followers}`}
          ctaText={t.leadTools?.audience?.leadCta}
        />
      )}
    </div>
  );
}
