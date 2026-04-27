"use client";

import { motion } from "framer-motion";
import { User, Wrench } from "lucide-react";

const PARTNER_TASKS = [
  "Find clients through your network and communication skills",
  "Be their trusted point of contact — in person, in Georgian, English, or Russian",
  "Walk them through our structured questionnaire to capture exactly what they need",
  "Collect their assets (photos, logos, text, examples of sites they like)",
  "Ask us anything technical — consult us, then relay the answer to your client",
  "Over time, you'll learn the product deeply and answer more questions yourself",
  "Keep them happy, informed, and subscribed — because your recurring income depends on it",
];

const GENESIS_TASKS = [
  "Builds everything from scratch (no templates)",
  "Hosts, secures, and maintains every site",
  "Handles all technical issues — you never touch code",
  "Pushes updates and improvements",
  "Provides you with every tool, document, and answer you need to sell confidently",
];

export function PartnerSplit() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Clear Boundaries
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            You own the relationship. We build the product.
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Partner column */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <User className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">You — The Partner</h3>
            </div>

            <ul className="space-y-3">
              {PARTNER_TASKS.map((task, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-sm text-slate-300 leading-relaxed">{task}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Genezisi column */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-slate-300">
                <Wrench className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Genezisi — The Builder</h3>
            </div>

            <ul className="space-y-3">
              {GENESIS_TASKS.map((task, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                  <span className="text-sm text-slate-300 leading-relaxed">{task}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto sm:text-base"
        >
          The client owns their business — and if they ever choose to leave, they take their code with them.
          We want partners who keep clients because the service is exceptional, not because they&apos;re locked in.
        </motion.p>
      </div>
    </section>
  );
}
