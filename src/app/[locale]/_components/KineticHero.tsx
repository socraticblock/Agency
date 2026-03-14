"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { StatusBadge } from "./StatusBadge";

export function KineticHero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax for headline
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const offsetX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const offsetY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  // Emerald glow background following cursor
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(35);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(16,185,129,0.35), transparent 60%)`;

  // Magnetic CTA
  const ctaX = useMotionValue(0);
  const ctaY = useMotionValue(0);

  const handleSectionMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX);
    mouseY.set(relY);

    // position glow in percentage space
    glowX.set((e.clientX - rect.left) / rect.width * 100);
    glowY.set((e.clientY - rect.top) / rect.height * 100);
  };

  const handleSectionLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glowX.set(50);
    glowY.set(35);
  };

  const handleCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    const strength = 10;
    if (typeof ctaX.set === "function") ctaX.set(relX * strength);
    if (typeof ctaY.set === "function") ctaY.set(relY * strength);
  };

  const handleCtaLeave = () => {
    if (typeof ctaX.set === "function") ctaX.set(0);
    if (typeof ctaY.set === "function") ctaY.set(0);
  };

  const words: string[] = t.hero.headline.split(" ");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      onMouseLeave={handleSectionLeave}
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#020617] to-black px-4 py-20 text-center"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{
          backgroundImage: glowBackground,
        }}
      />
      <StatusBadge locale={locale} />
      <div className="mt-4">
        <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-[10px] font-semibold tracking-[0.3em] text-emerald-300 font-mono shadow-[0_0_30px_rgba(16,185,129,0.45)]">
          {t.sovereign?.tagline}
        </span>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
          },
        }}
        className="max-w-4xl text-balance font-space text-5xl font-bold leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 sm:text-6xl md:text-7xl pb-4"
        style={{ x: offsetX, y: offsetY }}
      >
        {words.map((word: string, index: number) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block mr-2"
            variants={{
              hidden: {
                opacity: 0,
                y: 10,
                filter: "blur(4px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl"
      >
        {t.hero.subhead}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <motion.a
          href="#reality-check"
          onMouseMove={handleCtaMove}
          onMouseLeave={handleCtaLeave}
          style={{ x: ctaX, y: ctaY }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ y: -2, scale: 1.02 }}
          className="group relative overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-500/10 px-8 py-3.5 text-sm font-semibold text-emerald-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_40px_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-500/20 hover:border-emerald-400/60 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_60px_rgba(16,185,129,0.3)]"
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.4),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative z-10">{t.hero.cta}</span>
        </motion.a>
        <motion.a
          href="https://wa.me/995555555555?text=I%20saw%20the%20Kvali%20site%20and%20want%20help%20escaping%20the%20social%20media%20trap."
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.96 }}
          whileHover={{ y: -2, scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
          className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all"
        >
          {t.hero.ctaSecondary}
        </motion.a>
      </motion.div>
    </section>
  );
}
