"use client";

import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function FootprintGrid({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <section
      id="footprint"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      <h2 className="mb-10 text-center text-2xl font-bold text-[#0f172a] sm:text-3xl">
        Web-as-a-Service
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.article
          variants={itemVariants}
          className="rounded-2xl border border-[#0f172a]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-3 text-2xl">⚡</div>
          <h3 className="font-bold text-[#0f172a]">{t.bento.build.title}</h3>
          <p className="mt-2 text-sm text-[#0f172a]/70">{t.bento.build.desc}</p>
        </motion.article>

        <motion.article
          variants={itemVariants}
          className="rounded-2xl border border-[#0f172a]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-3 text-2xl">🔍</div>
          <h3 className="font-bold text-[#0f172a]">{t.bento.seo.title}</h3>
          <p className="mt-2 text-sm text-[#0f172a]/70">{t.bento.seo.desc}</p>
          <div className="mt-4 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3 text-left text-xs">
            <div className="text-[#1a0dab]">Your Business — Tbilisi</div>
            <div className="text-[#006621]">https://yoursite.ge</div>
            <div className="mt-1 text-[#545454]">
              We get you to page one. Local search, done right.
            </div>
          </div>
        </motion.article>

        <motion.article
          variants={itemVariants}
          className="rounded-2xl border border-[#0f172a]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">📍</span>
            <span className="inline-flex items-center gap-1 rounded bg-[#e8f5e9] px-2 py-0.5 text-sm font-medium text-[#2e7d32]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#10b981]" />
              On Maps
            </span>
          </div>
          <h3 className="font-bold text-[#0f172a]">{t.bento.maps.title}</h3>
          <p className="mt-2 text-sm text-[#0f172a]/70">{t.bento.maps.desc}</p>
          <div className="mt-4 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3">
            <div className="flex items-center gap-2">
              <div className="flex text-[#f9ab00]">
                {"★".repeat(5)}
              </div>
              <span className="text-sm font-medium text-[#0f172a]">5.0</span>
              <span className="text-xs text-[#6b7280]">(12 reviews) · Tbilisi</span>
            </div>
            <div className="mt-1 text-xs text-[#545454]">
              Your business, found first.
            </div>
          </div>
        </motion.article>

        <motion.article
          variants={itemVariants}
          className="rounded-2xl border border-[#0f172a]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="inline-flex items-center gap-1 rounded bg-[#e8f5e9] px-2 py-0.5 text-sm font-medium text-[#2e7d32]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#10b981]" />
              Online
            </span>
          </div>
          <h3 className="font-bold text-[#0f172a]">{t.bento.maintenance.title}</h3>
          <p className="mt-2 text-sm text-[#0f172a]/70">{t.bento.maintenance.desc}</p>
          <div className="mt-4 h-2 rounded-full bg-[#e5e7eb]">
            <div
              className="h-full rounded-full bg-[#10b981]"
              style={{ width: "99.9%" }}
            />
          </div>
          <p className="mt-2 text-xs text-[#6b7280]">99.9% uptime</p>
        </motion.article>
      </motion.div>
    </section>
  );
}
