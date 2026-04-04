"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function CollapsibleSection({
  id,
  title,
  defaultOpen,
  children,
}: {
  id?: string;
  title: string;
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      id={id}
      className="start-glass overflow-hidden rounded-2xl"
    >
      <button
        type="button"
        className="flex w-full min-h-[44px] items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/40 md:min-h-10 md:py-2.5"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <h3 className="start-panel-heading">{title}</h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#64748b] transition-transform duration-300 ease-out ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="space-y-4 border-t border-white/25 px-4 pb-4 pt-2 md:px-6 md:pb-6">
          {children}
        </div>
      ) : null}
    </section>
  );
}
