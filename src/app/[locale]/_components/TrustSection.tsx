"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function TrustSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    amount: 0.6,
    once: true,
  });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(count, "change", (v) => setDisplayValue(Math.round(v)));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, 80, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isInView, count]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0f172a] px-4 py-16 text-center sm:px-6"
    >
      <div className="mx-auto max-w-2xl">
        <p className="text-5xl font-bold text-[#10b981] sm:text-6xl">
          {displayValue}%
        </p>
        <h2 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">
          {t.trust.headline}
        </h2>
        <p className="mt-4 text-lg text-white/80">
          {t.trust.body}
        </p>
      </div>
    </section>
  );
}
