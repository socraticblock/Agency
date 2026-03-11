"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      "We give customers clear ‘Buy now’ and ‘Book now’ paths so they can act immediately without waiting on replies.",
  },
  {
    id: 5,
    title: "Platform ownership",
    reality:
      "You don’t own your followers. A single algorithm change or account issue can erase your income overnight.",
    solution:
      "We move your audience into a list you own forever—email, phone, and first-party data that no platform can take away.",
  },
  {
    id: 6,
    title: "‘Cheap’ websites",
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
      "Likes and views look good, but they don’t pay salaries, rent, or suppliers.",
    solution:
      "We build a direct pipeline from your content to your bank account: visit → trust → checkout.",
  },
];

export function SovereignFaq({ locale }: { locale: Locale }) {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Hard Truths
        </p>
        <p className="mt-2 text-lg font-semibold text-white">
          The honest version of what’s really happening.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {TRUTHS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <motion.article
              key={item.id}
              layout
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl"
              onClick={() => toggle(item.id)}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
                  {item.title}
                </h3>
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  className="text-xs text-slate-400"
                >
                  ▶
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-3 space-y-2 text-sm"
                  >
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        The Reality
                      </p>
                      <p className="mt-1 text-slate-300">{item.reality}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                        The Solution
                      </p>
                      <p className="mt-1 text-emerald-200">{item.solution}</p>
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

