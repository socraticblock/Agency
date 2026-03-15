"use client";

import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function TechStackSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const { tagline, label, items } = t.pointOneStack;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-2 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
          {label}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">
          {tagline}
        </h2>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:mx-auto">
        {items.map(
          (item: (typeof items)[number], i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{
              scale: 1.01,
              x: 4,
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: "rgba(61, 244, 33, 0.3)",
            }}
            className="group relative isolate z-10 mb-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md last:mb-0 md:flex-row md:items-start md:gap-6"
          >
            <div className="md:w-[30%] md:shrink-0">
              <h3 className="font-bold text-emerald-400">{item.name}</h3>
            </div>
            <div className="min-w-0 md:w-[70%] max-w-[640px] mx-auto md:mx-0">
              <p className="mb-1.5 font-medium text-white">{item.headline}</p>
              {"sublabel" in item && item.sublabel && (
                <p className="mb-2 text-sm italic text-emerald-300/90">
                  {item.sublabel}
                </p>
              )}
              <p className="text-sm leading-relaxed text-white md:text-white/70">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
