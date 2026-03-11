"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Truth = {
  id: number;
  title: string;
  reality: string;
  solution: string;
};

const TRUTHS: Truth[] = [
  {
    id: 1,
    title: "Site builders",
    reality:
      "Generic site builders are digital malls. You rent a tiny spot and compete with everyone else for attention.",
    solution:
      "We build your own private, high-speed shop that exists to do one thing: sell your offer on your terms.",
  },
  {
    id: 2,
    title: "The assistant",
    reality:
      "Most chatbots feel fake and frustrating. They answer in scripts and your customer gives up.",
    solution:
      "Our assistant is trained on your brand, offers, and objections so it can answer, guide, and sell 24/7 while you sleep.",
  },
  {
    id: 3,
    title: "The monthly fee",
    reality:
      "A website is not a poster you print once. It breaks, slows down, and falls behind every month.",
    solution:
      "You are hiring a tech team to keep your digital shop fast, secure, and always tuned to make you more money.",
  },
  {
    id: 4,
    title: "DM slavery",
    reality:
      "If you answer DMs hours later, most buyers have already moved on. Your revenue is stuck in your inbox.",
    solution:
      "We give customers clear 'Buy now' and 'Book now' paths so they can act immediately without waiting on replies.",
  },
  {
    id: 5,
    title: "Platform ownership",
    reality:
      "You don't own your followers. A single algorithm change or account issue can erase your income overnight.",
    solution:
      "We move your audience into a list you own forever—email, phone, and first-party data that no platform can take away.",
  },
  {
    id: 6,
    title: "'Cheap' websites",
    reality:
      "Slow, clunky sites silently lose thousands in missed sales every year, even if they were cheap to build.",
    solution:
      "We use elite, modern tech that loads before your customer can blink, so they stay, trust, and buy.",
  },
  {
    id: 7,
    title: "Admin vs. boss",
    reality:
      "Answering the same questions all day turns you into an admin, not the CEO of your business.",
    solution:
      "We automate the boring, repetitive work so you can focus on decisions, product, and growth.",
  },
  {
    id: 8,
    title: "Follower illusion",
    reality:
      "Likes and views look good, but they don't pay salaries, rent, or suppliers.",
    solution:
      "We build a direct pipeline from your content to your bank account: visit → trust → checkout.",
  },
];


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

  const toggle = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="relative mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <div className="mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400"
        >
          Hard Truths
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="mt-2 text-lg font-semibold text-white"
        >
          The honest version of what&apos;s really happening.
        </motion.p>
      </div>

      <div className="flex w-full flex-col gap-3">
        {TRUTHS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ scale: 1.02, y: -3 }}
              layout
              className={`relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-black/50 p-5 backdrop-blur-xl ${
                isOpen
                  ? "border-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.12)] ring-1 ring-emerald-500/20"
                  : "border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20 hover:shadow-[0_28px_60px_rgba(0,0,0,0.6)]"
              }`}
              onClick={() => toggle(item.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-bold uppercase leading-tight tracking-[0.2em] text-white">
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
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                          The Reality
                        </p>
                        <p className="mt-1 leading-relaxed text-slate-300">{item.reality}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                          The Solution
                        </p>
                        <p className="mt-1 leading-relaxed text-[#10b981]">{item.solution}</p>
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
