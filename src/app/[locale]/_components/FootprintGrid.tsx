"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useRef } from "react";
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

function GlassCardSpotlight({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(148,163,184,0.25), transparent 60%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <motion.article
      ref={ref}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition hover:border-emerald-400/50 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3),0_0_40px_rgba(16,185,129,0.2)]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: spotlight,
          mixBlendMode: "screen",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.article>
  );
}

export function FootprintGrid({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <section
      id="footprint"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
    >
      <h2 className="mb-10 text-center text-2xl font-bold text-slate-100 sm:text-3xl">
        Web-as-a-Service
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <GlassCardSpotlight>
          <div className="mb-3 text-2xl">⚡</div>
          <h3 className="font-bold text-slate-50">{t.bento.build.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{t.bento.build.desc}</p>
        </GlassCardSpotlight>

        <GlassCardSpotlight>
          <div className="mb-3 text-2xl">🔍</div>
          <h3 className="font-bold text-slate-50">{t.bento.seo.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{t.bento.seo.desc}</p>
          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-3 text-left text-xs text-slate-300">
            <div className="text-emerald-300">Your Business — Tbilisi</div>
            <div className="text-slate-400">https://yoursite.ge</div>
            <div className="mt-1 text-slate-400">
              We get you to page one. Local search, done right.
            </div>
          </div>
        </GlassCardSpotlight>

        <GlassCardSpotlight>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">📍</span>
            <span className="relative inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-sm font-medium text-emerald-300">
              <span className="relative inline-flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 rounded-full border border-emerald-400/60" />
                <motion.span
                  className="absolute inline-flex h-4 w-4 rounded-full border border-emerald-400/60"
                  initial={{ scale: 0.8, opacity: 0.9 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              On Maps
            </span>
          </div>
          <h3 className="font-bold text-slate-50">{t.bento.maps.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{t.bento.maps.desc}</p>
          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-3">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-300">
                {"★".repeat(5)}
              </div>
              <span className="text-sm font-medium text-slate-100">5.0</span>
              <span className="text-xs text-slate-400">
                (12 reviews) · Tbilisi
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Your business, found first.
            </div>
          </div>
        </GlassCardSpotlight>

        <GlassCardSpotlight>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-sm font-medium text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Online
            </span>
          </div>
          <h3 className="font-bold text-slate-50">
            {t.bento.maintenance.title}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {t.bento.maintenance.desc}
          </p>
          <div className="mt-4 h-2 rounded-full bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "99.9%" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">99.9% uptime</p>
        </GlassCardSpotlight>
      </motion.div>
    </section>
  );
}
