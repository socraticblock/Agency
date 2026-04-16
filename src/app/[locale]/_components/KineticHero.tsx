"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { memo, useMemo } from "react";
import { MagneticButton } from "./MagneticButton";

const Typewriter = memo(({ phrases }: { phrases: string[] }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullPhrase = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        setCurrentText(fullPhrase.substring(0, currentText.length + 1));
        if (currentText.length + 1 === fullPhrase.length) {
          setIsDeleting(true);
          setTypingSpeed(1500);
        } else {
          setTypingSpeed(80 + Math.random() * 40);
        }
      } else {
        setCurrentText(fullPhrase.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(250);
        } else {
          setTypingSpeed(40);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed]);

  return (
    <motion.h2 className="mt-2 min-h-[1.5em] max-w-xl text-base font-bold text-emerald-400 font-space leading-tight sm:text-lg text-center opacity-95">
      <span>{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-4 ml-1 bg-emerald-400/80 align-middle"
      />
    </motion.h2>
  );
});

Typewriter.displayName = "Typewriter";

export function KineticHero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxOff, setParallaxOff] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setParallaxOff(coarse.matches || reduce.matches);
    sync();
    coarse.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      coarse.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const offsetX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const offsetY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
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

  const videoRef = useRef<HTMLVideoElement>(null);
  const words = useMemo(() => t.hero.headline.split(" "), [t.hero.headline]);
  const h2Phrases = useMemo(() => t.hero.h2.split(". ").map((p: string) => p.endsWith(".") ? p : p + "."), [t.hero.h2]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      onMouseLeave={handleSectionLeave}
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden bg-[#030717]">
        <div className="absolute -top-1/4 -left-1/4 h-[min(100vw,28rem)] w-[min(100vw,28rem)] rounded-full bg-emerald-900/40 blur-[100px] animate-pulse sm:h-[min(100vw,40rem)] sm:w-[min(100vw,40rem)] sm:blur-[120px] md:h-[800px] md:w-[800px] md:blur-[140px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[min(100vw,28rem)] w-[min(100vw,28rem)] rounded-full bg-slate-800/50 blur-[110px] animate-pulse delay-1000 sm:h-[min(100vw,40rem)] sm:w-[min(100vw,40rem)] sm:blur-[130px] md:h-[800px] md:w-[800px] md:blur-[160px]" />
      </div>

      {/* STRIPPED BACK VIDEO LAYER FOR MAXIMUM PERFORMANCE */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          src="/hero-bg-animation.mp4"
          className="h-full w-full object-cover opacity-50 brightness-20"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#030717] via-[#030717]/60 to-transparent z-10" />

      <motion.div
        style={{ opacity: scrollOpacity, scale: scrollScale, y: scrollY2, willChange: 'transform, opacity' }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={false}
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="max-w-4xl text-balance pb-4 font-space text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          style={parallaxOff ? undefined : { x: offsetX, y: offsetY }}
        >
          {words.map((word: string, index: number) => (
            <motion.span key={index} className="inline-block mr-2">
              {word}
            </motion.span>
          ))}
        </motion.div>

        <Typewriter phrases={h2Phrases} />

        <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            as="a"
            href={`/${locale}/start`}
            magneticStrength={24}
            textStrength={12}
            className="group relative flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-emerald-400/40 bg-emerald-500/10 px-8 py-3 text-sm font-black text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:bg-emerald-500/20 sm:px-10 sm:py-4"
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.4),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 block flex items-center gap-1.5 text-white font-black">
              {t.hero.startCardCta}
            </span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href={`/${locale}/architect`}
            magneticStrength={24}
            textStrength={12}
            className="group relative flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-emerald-400/40 bg-emerald-500/10 px-8 py-3 text-sm font-black text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:bg-emerald-500/20 sm:px-10 sm:py-4"
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
