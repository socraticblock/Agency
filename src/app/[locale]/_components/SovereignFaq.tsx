"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";
import { KineticText } from "./KineticText";

function ExpandIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400"
      aria-hidden
    >
      <Plus className="h-4 w-4" strokeWidth={2.5} />
    </motion.div>
  );
}

export function SovereignFaq({ locale }: { locale: Locale }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const t = getMessages(locale);

  const toggle = (id: number, e: React.MouseEvent<HTMLElement>) => {
    const isOpening = openId !== id;
    setOpenId((current) => (current === id ? null : id));

    if (isOpening) {
      const element = e.currentTarget;
      // Small timeout to allow Framer Motion layout animations to settle slightly
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
    }
  };

  return (
    <section className="relative mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <div className="mb-10 text-center">
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400"
        >
          {t.faq.label}
        </motion.p>
        <KineticText
          text={t.faq.heading}
          splitBy="word"
          delay={0.1}
          className="mt-2 text-2xl font-space font-semibold text-white sm:text-3xl justify-center"
        />
      </div>

      <div className="flex w-full flex-col gap-3">
        {t.faq.items.map((item: { title: string; reality: string; solution: string }, index: number) => {
          const id = index + 1;
          const isOpen = openId === id;
          return (
            <motion.article
              key={id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ scale: 1.01, y: -2 }}
              layout
              className={`relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl glass-card p-5 transition-all ${
                isOpen
                  ? "border-emerald-500/40 shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_24px_rgba(16,185,129,0.12)]"
                  : "hover:-translate-y-1 hover:border-emerald-500/20"
              }`}
              onClick={(e) => toggle(id, e)}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-bold leading-tight tracking-wide text-white">
                  {item.title}
                </h3>
                <ExpandIcon isOpen={isOpen} />
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 pb-1 text-sm">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-400/80">
                          {t.faq.realityLabel}
                        </p>
                        <p className="mt-1 leading-relaxed text-slate-300">{item.reality}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                          {t.faq.solutionLabel}
                        </p>
                        <p className="mt-1 leading-relaxed text-emerald-200/80">{item.solution}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
