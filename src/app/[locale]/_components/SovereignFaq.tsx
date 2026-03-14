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

const TRUTHS_EN: Truth[] = [
  {
    id: 1,
    title: "\"I already have a website from Wix / Squarespace\"",
    reality:
      "Template builders give you a rented spot in a crowded digital mall. You're competing with millions of identical sites for attention, and you don't control the speed, the SEO, or the checkout experience.",
    solution:
      "We build a private, high-speed shop that does one thing: turn visitors into paying customers — on your terms, not a template's.",
  },
  {
    id: 2,
    title: "\"Chatbots feel fake and annoying\"",
    reality:
      "Most chatbots recite scripts and frustrate people until they give up. They hurt your brand more than they help.",
    solution:
      "Our AI assistant is trained on your specific business — your products, your prices, your most common objections. It has real conversations, takes orders, and books calls while you sleep.",
  },
  {
    id: 3,
    title: "\"Why do I need to pay monthly?\"",
    reality:
      "A website isn't a poster you print once. It slows down, breaks, gets hacked, and falls behind competitors every single month you ignore it.",
    solution:
      "Your monthly fee is a tiny tech team keeping your digital shop fast, secure, and constantly tuned to make you more money.",
  },
  {
    id: 4,
    title: "\"I just answer DMs, it works fine\"",
    reality:
      "If you reply hours later, most buyers have already moved on. Your revenue is trapped inside your inbox — and you're chained to your phone.",
    solution:
      "We give customers clear 'Buy now' and 'Book now' buttons so they can act immediately. No waiting, no lost sales, no slavery to your notifications.",
  },
  {
    id: 5,
    title: "\"My followers are my customers\"",
    reality:
      "You don't own your followers. One algorithm change, one account suspension, one glitch — and your income evaporates overnight.",
    solution:
      "We move your audience into a list you own forever — emails, phone numbers, first-party data that no platform can take away.",
  },
  {
    id: 6,
    title: "\"A cheap website is good enough\"",
    reality:
      "Slow, clunky sites silently lose you thousands in missed sales every year. They make your business look unprofessional — even if your product is great.",
    solution:
      "We use the same technology as Netflix and Airbnb. Your site loads before your customer can blink, so they stay, trust you, and buy.",
  },
  {
    id: 7,
    title: "\"I spend all day answering the same questions\"",
    reality:
      "Answering the same 10 questions 50 times a day makes you an administrator, not a business owner.",
    solution:
      "We automate the repetitive stuff so you can focus on the big decisions — product, growth, and actually living your life.",
  },
  {
    id: 8,
    title: "\"But I get lots of likes!\"",
    reality:
      "Likes don't pay rent. Views don't pay suppliers. A viral post with zero sales is just entertainment, not business.",
    solution:
      "We build a direct pipeline from your content to your bank account: visit → trust → checkout. Real revenue, not vanity metrics.",
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
          Honest answers
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="mt-2 text-2xl font-space font-semibold text-white sm:text-3xl"
        >
          You&apos;re probably thinking one of these. Let&apos;s talk about it.
        </motion.p>
      </div>

      <div className="flex w-full flex-col gap-3">
        {TRUTHS_EN.map((item) => {
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
              whileHover={{ scale: 1.01, y: -2 }}
              layout
              className={`relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl glass-card p-5 transition-all ${
                isOpen
                  ? "border-emerald-500/40 shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_24px_rgba(16,185,129,0.12)]"
                  : "hover:-translate-y-1 hover:border-emerald-500/20"
              }`}
              onClick={() => toggle(item.id)}
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
                          The reality
                        </p>
                        <p className="mt-1 leading-relaxed text-slate-300">{item.reality}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                          What we do instead
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
