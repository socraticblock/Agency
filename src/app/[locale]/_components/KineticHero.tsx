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
import { StatusBadge } from "./StatusBadge";
import { MagneticButton } from "./MagneticButton";
import { NanoBananaBackground } from "./NanoBananaBackground";

export function KineticHero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax for headline
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const offsetX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const offsetY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  // Subtle blue glow anchored to top-left corner that moves slightly
  const glowX = useMotionValue(15);
  const glowY = useMotionValue(15);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(59,130,246,0.25), transparent 45%)`;

  // Scroll-driven parallax: fade + push back as user scrolls past hero
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

    // position glow in top-left space with slight offset sway
    glowX.set(15 + relX * 12);
    glowY.set(15 + relY * 12);
  };

  const handleSectionLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glowX.set(15);
    glowY.set(15);
  };

  const words: string[] = t.hero.headline.split(" ");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      onMouseLeave={handleSectionLeave}
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      {/* Deep blue ambient glow behind hero */}
      <div className="pointer-events-none absolute inset-0 -z-20" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,64,175,0.15) 0%, rgba(6,12,34,0.5) 50%, #050505 100%)' }} />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Heavy bottom fade edge to blend transparent canvas down */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Interactive Nano Banana WebGL Canvas */}
      <NanoBananaBackground />

      {/* Scroll-driven parallax container */}
      <motion.div
        style={{ opacity: scrollOpacity, scale: scrollScale, y: scrollY2 }}
        className="flex flex-col items-center"
      >
        <StatusBadge locale={locale} />

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
          className="max-w-4xl text-balance font-space text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl pb-4 text-white"
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
          <MagneticButton
            as="a"
            href="#reality-check"
            magneticStrength={20}
            textStrength={10}
            className="group relative overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-500/10 px-8 py-3.5 text-sm font-semibold text-emerald-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_40px_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-500/20 hover:border-emerald-400/60 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_60px_rgba(16,185,129,0.3)]"
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.4),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 block">{t.hero.cta}</span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href="https://wa.me/995555555555?text=I%20saw%20the%20Kvali%20site%20and%20want%20help%20escaping%20the%20social%20media%20trap."
            target="_blank"
            rel="noopener noreferrer"
            magneticStrength={10}
            textStrength={4}
            className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-colors hover:bg-white/10"
          >
            <span className="block">{t.hero.ctaSecondary}</span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
