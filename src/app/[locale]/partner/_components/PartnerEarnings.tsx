"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, BarChart3 } from "lucide-react";

const SCENARIOS = [
  {
    label: "Part-Time",
    desc: "2 card clients/month + 1 Studio every 3 months",
    year1: "~8,000₾",
  },
  {
    label: "Committed",
    desc: "3 card clients/month + 1 Studio/month",
    year1: "~20,000₾",
  },
  {
    label: "Full-Time",
    desc: "5 card clients/month + 2 Studios/month",
    year1: "~30,000₾",
  },
];

const YEARLY_TRAJECTORY = [
  { year: "Year 1", setup: "~19,800₾", recurring: "~7,200₾", total: "~27,000₾" },
  { year: "Year 2", setup: "~19,800₾", recurring: "~14,400₾", total: "~34,200₾" },
  { year: "Year 3", setup: "~19,800₾", recurring: "~21,600₾", total: "~41,400₾" },
];

type View = "glance" | "full";

export function PartnerEarnings() {
  const [view, setView] = useState<View>("glance");

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            What You Could Earn
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            The harder you work, the more you earn.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Setup requires selling. Shield income is passive and compounds annually. There is no ceiling.
          </p>
        </motion.div>

        {/* View toggle */}
        <div className="mb-8 flex justify-center gap-2">
          <button
            onClick={() => setView("glance")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              view === "glance"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:text-white"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            At a Glance
          </button>
          <button
            onClick={() => setView("full")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              view === "full"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:text-white"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            The Full Picture
          </button>
        </div>

        <AnimatePresence mode="wait">
          {view === "glance" ? (
            <motion.div
              key="glance"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              {SCENARIOS.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center backdrop-blur-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {s.label}
                  </p>
                  <p className="mt-3 text-3xl font-bold text-white sm:text-4xl">{s.year1}</p>
                  <p className="text-xs text-slate-500 mt-1">Year 1</p>
                  <p className="mt-4 text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
                <p className="text-sm text-slate-300 leading-relaxed">
                  The numbers above are base products only. Most Studio clients add 2-3 modules —
                  copywriting, booking systems, analytics. Every add-on earns you{" "}
                  <span className="text-emerald-300 font-semibold">30%</span>. And every Shield renews every year.
                </p>
              </div>

              {/* 3-year trajectory */}
              <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Full-Time Partner
                      </th>
                      <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                        Year 1
                      </th>
                      <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                        Year 2
                      </th>
                      <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                        Year 3
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/[0.04]">
                      <td className="px-5 py-3 text-slate-300">Setup commissions</td>
                      {YEARLY_TRAJECTORY.map((y) => (
                        <td key={y.year + "-setup"} className="px-5 py-3 text-right text-slate-300">
                          {y.setup}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/[0.04]">
                      <td className="px-5 py-3 text-slate-300">
                        Shield recurring <span className="text-xs text-emerald-400">(cumulative)</span>
                      </td>
                      {YEARLY_TRAJECTORY.map((y) => (
                        <td key={y.year + "-rec"} className="px-5 py-3 text-right text-emerald-400 font-semibold">
                          {y.recurring}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-bold text-white">Total that year</td>
                      {YEARLY_TRAJECTORY.map((y) => (
                        <td key={y.year + "-total"} className="px-5 py-3 text-right font-bold text-white">
                          {y.total}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-slate-400 leading-relaxed text-center">
                By Year 3, Shield income alone is ~1,800₾/month — and it required zero new sales to maintain.
                Every new client you close adds to this pile permanently.
                <br />
                <span className="text-slate-500">Note: These are base-product conservative estimates. With add-ons, real numbers are higher.</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
