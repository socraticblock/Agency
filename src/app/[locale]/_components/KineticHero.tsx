"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function KineticHero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const offsetX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const offsetY = useTransform(mouseY, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-[#0f172a] px-4 py-20 text-center"
    >
      <motion.h1
        style={{ x: offsetX, y: offsetY }}
        className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {t.hero.headline}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
      >
        {t.hero.subhead}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#contact"
          className="rounded-full bg-[#10b981] px-6 py-3 font-semibold text-white transition hover:bg-[#0d9668]"
        >
          {t.hero.cta}
        </a>
        <a
          href="https://wa.me/995"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10"
        >
          {t.hero.ctaSecondary}
        </a>
      </motion.div>
    </section>
  );
}
