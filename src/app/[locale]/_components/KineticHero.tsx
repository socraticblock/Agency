"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { MagneticButton } from "./MagneticButton";
import { NanoBananaBackground } from "./NanoBananaBackground";

export function KineticHero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const offsetX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const offsetY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const scrollY2 = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

  const handleSectionMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleSectionLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const words: string[] = t.hero.headline.split(" ");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      onMouseLeave={handleSectionLeave}
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-emerald-900/30 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-slate-800/40 rounded-full blur-[160px] animate-pulse delay-1000" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

      <NanoBananaBackground />

      <motion.div
        style={{ opacity: scrollOpacity, scale: scrollScale, y: scrollY2 }}
        className="flex flex-col items-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="max-w-4xl text-balance font-space text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl pb-4 text-white"
          style={{ x: offsetX, y: offsetY }}
        >
          {words.map((word: string, index: number) => (
            <motion.span key={index} className="inline-block mr-2">
              {word}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.h2 className="mt-2 max-w-xl text-base font-bold text-emerald-400 font-space leading-tight sm:text-lg text-center opacity-95">
          {t.hero.h2}
        </motion.h2>

        <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            as="a"
            href={`/${locale}/architect`}
            magneticStrength={24}
            textStrength={12}
            className="group relative overflow-hidden rounded-full bg-emerald-500/10 border border-emerald-400/40 backdrop-blur-sm text-white px-10 py-4 text-sm font-black shadow-xl transition-all duration-300 hover:scale-[1.03] hover:bg-emerald-500/20 flex items-center justify-center"
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.4),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 block flex items-center gap-1.5 text-white font-black">
              {t.hero.cta}
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
