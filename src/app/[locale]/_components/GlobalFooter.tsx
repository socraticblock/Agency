"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function GlobalFooter({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const ctaX = useMotionValue(0);
  const ctaY = useMotionValue(0);
  const springX = useSpring(ctaX, { stiffness: 300, damping: 26 });
  const springY = useSpring(ctaY, { stiffness: 300, damping: 26 });

  const handleCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    const strength = 10;
    ctaX.set(relX * strength);
    ctaY.set(relY * strength);
  };

  const handleCtaLeave = () => {
    ctaX.set(0);
    ctaY.set(0);
  };

  return (
    <footer className="relative flex min-h-[60vh] flex-col items-center justify-center bg-[#050505] px-4 py-20 text-center">
      <p className="text-3xl font-semibold text-slate-100 sm:text-4xl md:text-5xl">
        {t.footer.headline}
      </p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-10"
      >
        <motion.a
          href={`/${locale}/apply`}
          onMouseMove={handleCtaMove}
          onMouseLeave={handleCtaLeave}
          style={{ x: springX, y: springY }}
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -2 }}
          className="group relative inline-block overflow-hidden rounded-full border border-emerald-400/60 bg-emerald-500/10 px-8 py-3 text-sm font-semibold text-emerald-100 shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-colors hover:bg-emerald-500/20"
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.4),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative z-10">{t.footer.cta}</span>
        </motion.a>
      </motion.div>
    </footer>
  );
}
