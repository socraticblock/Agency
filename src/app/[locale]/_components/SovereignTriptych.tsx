"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";

type TriptychItem = {
  key: "bridge" | "intercept" | "vault";
  title: string;
  subtitle: string;
};

export function SovereignTriptych({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  const items: TriptychItem[] = [
    {
      key: "bridge",
      title: t.sovereign?.bridgeTitle ?? "The 1-Second Rule",
      subtitle: t.sovereign?.bridgeBody ?? "",
    },
    {
      key: "intercept",
      title: t.sovereign?.interceptTitle ?? "Your 24/7 Sales Partner",
      subtitle: t.sovereign?.interceptBody ?? "",
    },
    {
      key: "vault",
      title: t.sovereign?.vaultTitle ?? "The Safety Net",
      subtitle: t.sovereign?.vaultBody ?? "",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
          {t.sovereign?.triptychLabel ?? "Your peace of mind"}
        </p>
        <p className="mt-2 text-base text-white/70 sm:text-lg">
          {t.sovereign?.triptychSubheading ??
            "Three ways we get you off the algorithm's leash and into a business that runs even when you're not online."}
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <motion.article
            key={item.key}
            whileHover={{ y: -4, scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.35),_transparent_60%)]" />
            <div className="relative z-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-white/80">{item.subtitle}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

