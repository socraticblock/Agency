"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

const VISIBILITY_TAX_RATE = 0.2; // 20% visibility tax on followers
const DELAY_FRICTION_RATE = 0.15; // 15% per DM, annualized

export function InefficiencyCalculator({ locale }: Props) {
  const t = getMessages(locale);
  const [followers, setFollowers] = useState<number>(10000);
  const [aov, setAov] = useState<number>(80);
  const [monthlyDMs, setMonthlyDMs] = useState<number>(50);
  const [displayBleed, setDisplayBleed] = useState<number>(0);

  const safeFollowers = Math.max(0, followers || 0);
  const safeAov = Math.max(0, aov || 0);
  const safeMonthlyDMs = Math.max(0, monthlyDMs || 0);

  // Total Annual Leak = (Followers × AOV × 0.20) + (DMs × AOV × 0.15 × 12)
  const visibilityLeak = safeFollowers * safeAov * VISIBILITY_TAX_RATE;
  const delayLeak =
    safeMonthlyDMs * safeAov * DELAY_FRICTION_RATE * 12; // annualized
  const annualLeak = visibilityLeak + delayLeak;

  useEffect(() => {
    const controls = animate(displayBleed, annualLeak, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayBleed(latest),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annualLeak]);

  return (
    <section
      id="reality-check"
      className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          {t.sovereign?.calcTitle}
        </p>
        <p className="mt-3 text-base text-white/70 sm:text-lg">
          {t.sovereign?.calcSubheading}
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <label className="block text-sm font-medium text-white/80">
              {t.sovereign?.calcFollowersLabel}
            </label>
            <input
              type="number"
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-emerald-400/40 focus:ring-2"
              value={followers}
              min={0}
              onChange={(e) => setFollowers(Number(e.target.value) || 0)}
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <label className="block text-sm font-medium text-white/80">
              {t.sovereign?.calcAovLabel}
            </label>
            <input
              type="number"
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-emerald-400/40 focus:ring-2"
              value={aov}
              min={0}
              onChange={(e) => setAov(Number(e.target.value) || 0)}
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <label className="block text-sm font-medium text-white/80">
              {t.sovereign?.calcDmsLabel}
            </label>
            <input
              type="number"
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-emerald-400/40 focus:ring-2"
              value={monthlyDMs}
              min={0}
              onChange={(e) => setMonthlyDMs(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="group relative isolate z-10 overflow-hidden rounded-2xl border border-red-500/30 bg-red-500/10 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">
            {t.sovereign?.calcResultHeadline}
          </p>
          <motion.p
            key={Math.round(displayBleed)}
            initial={{ x: -4, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="mt-4 text-4xl font-black text-red-200 sm:text-5xl"
          >
            {Math.round(displayBleed).toLocaleString("en-US")} GEL
          </motion.p>
          <p className="mt-3 text-sm text-red-100/90">
            {t.sovereign?.calcResultFollowUp}
          </p>
          <motion.div
            animate={
              annualLeak > 0
                ? { x: [0, -2, 2, -2, 2, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.4 }}
            className="mt-4 inline-block rounded-full border border-red-400/60 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200"
          >
            20% Algorithm Tax
          </motion.div>
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-black/30 p-4 text-left text-xs text-red-100/90">
            <p className="font-semibold uppercase tracking-[0.25em] text-red-200">
              {t.sovereign?.calcBreakdownTitle}
            </p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <span className="font-semibold">
                  {t.sovereign?.calcVisibilityTitle}
                </span>{" "}
                <span>{t.sovereign?.calcVisibilityBody}</span>
              </li>
              <li>
                <span className="font-semibold">
                  {t.sovereign?.calcDelayTitle}
                </span>{" "}
                <span>{t.sovereign?.calcDelayBody}</span>
              </li>
            </ul>
            <p className="mt-3 text-[11px] text-red-100/80">
              {t.sovereign?.calcFormulaLabel}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

