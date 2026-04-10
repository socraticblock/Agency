"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { START_DC_FAQ, startDigitalCardFaqWhatsAppHref } from "@/constants/start-digital-card-copy";
import { START_DIGITAL_CARD_FAQ_ITEMS } from "@/constants/start-digital-card-faq";
import { START_DC_WELCOME } from "@/constants/start-digital-card-copy";

type Props = {
  onBack: () => void;
  onStartBuilding: () => void;
};

const PAGE = 5;

export function OverlayFaqBody({ onBack, onStartBuilding }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE);
  const items = START_DIGITAL_CARD_FAQ_ITEMS;
  const visible = items.slice(0, visibleCount);
  const remaining = items.length - visibleCount;
  const f = START_DC_FAQ;

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-auto w-full max-w-3xl text-left text-white">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-sm text-white/50 transition-colors hover:text-white"
      >
        {f.back}
      </button>
      <h2 className="mb-6 text-xl font-bold">{f.title}</h2>
      <div className="start-dc-info-panel rounded-xl px-3 md:px-4">
        {visible.map((item) => {
          const expanded = openId === item.id;
          return (
            <div key={item.id} className="border-b border-white/[0.06]">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-2 py-3 text-left text-sm text-white/80 transition-colors hover:text-white"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
              {expanded ? (
                <div className="pb-4 text-sm leading-relaxed text-white/50">
                  {item.answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {remaining > 0 ? (
        <button
          type="button"
          onClick={() => setVisibleCount((c) => Math.min(c + PAGE, items.length))}
          className="mt-4 w-full text-center text-sm text-emerald-400 transition-colors hover:text-emerald-300"
        >
          {f.loadMore(remaining)}
        </button>
      ) : null}
      <p className="mt-6 text-center text-sm text-white/40">{f.stillQuestions}</p>
      <a
        href={startDigitalCardFaqWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="start-dc-info-panel mt-2 flex justify-center rounded-lg px-6 py-2 text-center text-sm text-white transition-colors hover:text-white"
      >
        {f.whatsappCta}
      </a>
      <button
        type="button"
        onClick={onStartBuilding}
        className="mt-6 w-full rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600"
      >
        {START_DC_WELCOME.startBuilding}
      </button>
    </div>
  );
}
