"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { JargonTooltip } from "@/components/ui/JargonTooltip";

type TechKey = "next" | "vercel" | "tailwind" | "framer";

export function TechStackSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  const tooltips = t.tooltips;
  const items: { key: TechKey; label: string; description: string; tip: string }[] = [
    { key: "next", label: "Next.js 15", description: t.persuasion.techLogos.next, tip: tooltips.nextjs },
    { key: "vercel", label: "Vercel", description: t.persuasion.techLogos.vercel, tip: tooltips.vercel },
    { key: "tailwind", label: "Tailwind", description: t.persuasion.techLogos.tailwind, tip: tooltips.tailwind },
    { key: "framer", label: "Framer Motion", description: t.persuasion.techLogos.framer, tip: tooltips.framer },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24 pt-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          {t.persuasion.techHeading}
        </h2>
        <p className="mt-4 text-sm text-slate-400 sm:text-base">
          {t.persuasion.techSubheading}
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((item) => (
          <MagneticIcon key={item.key} label={item.label} description={item.description} tip={item.tip} />
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-slate-500 sm:text-base">
        {t.persuasion.techTagline}
      </p>
    </section>
  );
}

function MagneticIcon({
  label,
  description,
  tip,
}: {
  label: string;
  description: string;
  tip: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 26 });
  const springY = useSpring(y, { stiffness: 300, damping: 26 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    const strength = 10;
    x.set(relX * -strength);
    y.set(relY * -strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: springX, y: springY, willChange: "transform" }}
        className="group relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        <JargonTooltip tip={tip}>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-100">
            {label}
          </span>
        </JargonTooltip>
      </motion.div>
      <p className="mt-3 max-w-[11rem] text-xs text-slate-400">{description}</p>
    </div>
  );
}

