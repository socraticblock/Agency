"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function PartnerHero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center">
      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/[0.07] blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-600/[0.04] blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl"
      >
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm">
          Genezisi Partner Program
        </p>

        <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Your network is your most valuable asset.
          <br />
          <span className="text-emerald-400">You just haven&apos;t monetized it yet.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-lg text-slate-400 sm:text-xl"
        >
          Genezisi is accepting a limited number of Sales Partners in Georgia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-300"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Limited openings — 5 positions
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
