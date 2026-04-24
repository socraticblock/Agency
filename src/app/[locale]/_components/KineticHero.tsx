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
import Script from "next/script";
import { WHATSAPP_INTAKE, WHATSAPP_DEFAULT_MESSAGE } from "@/constants/content";

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
    <motion.h2 className="mt-2 min-h-[1.5em] max-w-xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-space text-base font-black leading-tight text-center opacity-95 sm:text-lg">
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

  const words = useMemo(() => t.hero.headline.split(" "), [t.hero.headline]);
  const h2Phrases = useMemo(() => t.hero.h2.split(". ").map((p: string) => p.endsWith(".") ? p : p + "."), [t.hero.h2]);
  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) video.playbackRate = 0.6;
  }, []);

  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/hls.js@latest" 
        strategy="afterInteractive"
        onLoad={() => {
          const video = document.getElementById('hero-video') as HTMLVideoElement;
          if (!video) return;
          const hlsUrl = "https://stream.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE.m3u8";
          // @ts-ignore
          const Hls = window.Hls;
          if (Hls && Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(hlsUrl);
            hls.attachMedia(video);
            video.playbackRate = 0.6;
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              video.play().catch(e => console.error("HLS Play error:", e));
            });
          }
        }}
      />
      <section
        ref={sectionRef}
        onMouseMove={handleSectionMove}
        onMouseLeave={handleSectionLeave}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black"
        >
          <video
            id="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://image.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE/thumbnail.jpg?time=0&width=1920"
            className="h-full w-full object-cover opacity-30 brightness-100"
          >
            <source src="https://stream.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE/high.mp4" type="video/mp4" />
            <source src="https://stream.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE/medium.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#030717]"
        >
          <div className="absolute -top-1/4 -left-1/4 h-[min(100vw,28rem)] w-[min(100vw,28rem)] rounded-full bg-[#004d40]/40 blur-[100px] animate-pulse sm:h-[min(100vw,40rem)] sm:w-[min(100vw,40rem)] sm:blur-[120px] md:h-[800px] md:w-[800px] md:blur-[140px]" />
          <div className="absolute -bottom-1/4 -right-1/4 h-[min(100vw,28rem)] w-[min(100vw,28rem)] rounded-full bg-slate-800/50 blur-[110px] animate-pulse delay-1000 sm:h-[min(100vw,40rem)] sm:w-[min(100vw,40rem)] sm:blur-[130px] md:h-[800px] md:w-[800px] md:blur-[160px]" />
        </motion.div>

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
          className="max-w-4xl text-balance pb-4 font-space text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          style={parallaxOff ? undefined : { x: offsetX, y: offsetY }}
        >
          {words.map((word: string, index: number) => {
            const normalized = word.toLowerCase().replace(/[.,!?;:]/g, "");
            const isHighlight =
              normalized === "digital" ||
              normalized === "footprint" ||
              normalized === "ციფრული" ||
              normalized === "ნაკვალევის";

            return (
              <motion.span
                key={index}
                className={`inline-block mr-2 ${isHighlight
                    ? "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                    : "text-white"
                  }`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.div>

        <Typewriter phrases={h2Phrases} />

        <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            as="a"
            href={`https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            magneticStrength={24}
            textStrength={12}
            className="group relative flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-[#00ead0]/40 bg-[#00ead0]/10 px-8 py-3 text-sm font-black text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:bg-[#00ead0]/20 sm:px-10 sm:py-4"
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,234,208,0.4),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 block flex items-center gap-1.5 text-white font-black uppercase tracking-widest">
              Contact us on WhatsApp
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
    </>
  );
}
