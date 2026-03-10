"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { TopographyGrid } from "./TopographyGrid";
import { JargonTooltip } from "@/components/ui/JargonTooltip";

const TOP_CLASSES = ["top-24", "top-28", "top-32", "top-36"] as const;

export function StickyCardStack({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const sectionRef = useRef<HTMLElement>(null);

  const cards = [
    {
      key: "engine",
      title: t.persuasion.cards.engine.title,
      body: t.persuasion.cards.engine.body,
      tooltipTerm: "Next.js 15",
      tooltipTip: t.tooltips.nextjs,
    },
    {
      key: "map",
      title: t.persuasion.cards.map.title,
      body: t.persuasion.cards.map.body,
      tooltipTerm: null,
      tooltipTip: null,
    },
    {
      key: "shield",
      title: t.persuasion.cards.shield.title,
      body: t.persuasion.cards.shield.body,
      tooltipTerm: null,
      tooltipTip: null,
    },
    {
      key: "compound",
      title: t.persuasion.cards.compound.title,
      body: t.persuasion.cards.compound.body,
      tooltipTerm: null,
      tooltipTip: null,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto mt-8 max-w-5xl px-4 pb-24 pt-8 sm:px-6"
    >
      <TopographyGrid />
      <div className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">
            {t.persuasion.stackHeading}
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            {t.persuasion.stackSubheading}
          </p>
        </div>
        <div className="mt-16 space-y-10 pb-[60vh]">
          {cards.map((card, index) => (
            <StickyCard
              key={card.key}
              index={index}
              title={card.title}
              body={card.body}
              tooltipTerm={card.tooltipTerm}
              tooltipTip={card.tooltipTip}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyCard({
  index,
  title,
  body,
  tooltipTerm,
  tooltipTip,
}: {
  index: number;
  title: string;
  body: string;
  tooltipTerm: string | null;
  tooltipTip: string | null;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const topClass = TOP_CLASSES[index] ?? TOP_CLASSES[TOP_CLASSES.length - 1];

  const bodyContent =
    tooltipTerm && tooltipTip && body.includes(tooltipTerm) ? (
      <>
        {body.split(tooltipTerm)[0]}
        <JargonTooltip tip={tooltipTip}>{tooltipTerm}</JargonTooltip>
        {body.split(tooltipTerm)[1]}
      </>
    ) : (
      body
    );

  return (
    <motion.article
      ref={ref}
      style={{ scale, y, opacity, willChange: "transform" }}
      className={`sticky ${topClass} mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl`}
    >
      <div className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-300">
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-slate-50 sm:text-3xl">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
        {bodyContent}
      </p>
    </motion.article>
  );
}

