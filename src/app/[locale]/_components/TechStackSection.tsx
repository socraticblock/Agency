"use client";

import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function TechStackSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const { tagline, label, items } = t.pointOneStack;

  return (
    <section className="relative mx-auto max-w-5xl px-4 pb-16 pt-2 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
          {label}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">
          {tagline}
        </h2>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:mx-auto">
        {items.map((item: (typeof items)[number], i: number) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative isolate z-10 mb-4 flex flex-col gap-3 overflow-hidden rounded-2xl glass-card p-6 shadow-[0_0_30px_rgba(16,185,129,0.06)] last:mb-0 md:flex-row md:items-start md:gap-6"
          >
            {/* Subtle grid background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 md:w-[30%] md:shrink-0">
              <h3 className="font-bold text-emerald-400">{item.name}</h3>
            </div>
            <div className="relative z-10 mx-auto min-w-0 max-w-[640px] md:mx-0 md:w-[70%]">
              <p className="mb-1.5 font-medium text-white">
                {item.headline}
              </p>
              {"sublabel" in item && item.sublabel && (
                <p className="mb-2 text-sm italic text-emerald-300/90">
                  {item.sublabel}
                </p>
              )}
              <p className="text-sm leading-relaxed text-slate-400">
                {item.body}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
