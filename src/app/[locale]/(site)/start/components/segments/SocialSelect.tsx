"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export function SocialSelect({
  value,
  options,
  onChange,
  className = "",
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (next: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", handleOutside);
    return () => window.removeEventListener("pointerdown", handleOutside);
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex w-full items-center justify-between rounded-md border border-white/20 bg-white/10 px-2 py-1.5 text-xs text-white transition hover:bg-white/15"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected?.label ?? value}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-white/80 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-white/20 bg-black/90 shadow-xl backdrop-blur-md">
          <ul role="listbox" className="p-1">
            {options.map((option) => {
              const active = option.value === value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-xs transition ${
                      active ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10"
                    }`}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <span>{option.label}</span>
                    {active ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
