"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";

interface TrueAudienceVisualizerProps {
  locale: string;
}

export function TrueAudienceVisualizer({ locale }: TrueAudienceVisualizerProps) {
  const [followers, setFollowers] = useState(10000);
  const [engagementRate, setEngagementRate] = useState(5);
  const [showForm, setShowForm] = useState(false);

  // Calculate reached audience
  const reachedAudience = Math.floor(followers * (engagementRate / 100));

  // Generate dots for visualization (max 1000 dots to keep DOM light)
  const maxDots = 400; // 20x20 grid
  const dotsToDisplay = Math.min(followers, maxDots);
  const activeDots = Math.max(1, Math.floor(dotsToDisplay * (engagementRate / 100)));

  const dots = useMemo(() => {
    return Array.from({ length: maxDots }).map((_, i) => ({
      id: i,
      isActive: i < activeDots,
    }));
  }, [activeDots, maxDots]);

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          The "True Audience" Visualizer
        </h2>
        <p className="mt-2 text-slate-400">
          See how the algorithm filters your reach.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
              <span>Total Followers</span>
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
            />
          </div>

          <div>
            <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
              <span>Engagement Rate</span>
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
            />
          </div>

          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <h3 className="text-lg font-semibold text-red-200">
              The Reality Check
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              You worked hard for{" "}
              <strong className="text-white">{followers.toLocaleString()}</strong>{" "}
              followers. Instagram only lets you talk to{" "}
              <strong className="text-red-400">
                {reachedAudience.toLocaleString()}
              </strong>{" "}
              of them.
            </p>
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
            >
              Build Your Owned List
            </button>
          )}
        </div>

        {/* Visualization */}
        <div className="flex items-center justify-center rounded-2xl bg-black/60 p-6 border border-white/5">
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
                transition={{ duration: 0.5, delay: dot.id * 0.001 }}
                className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lead Capture Form */}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="True Audience Visualizer"
          painPoint={`Low Reach: ${reachedAudience} out of ${followers}`}
          ctaText="Let's build a platform where you reach 100% of your audience."
        />
      )}
    </div>
  );
}
