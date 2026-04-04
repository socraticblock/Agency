"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CollapsibleSection({
  id,
  title,
  isOpen,
  onToggle,
  children,
}: {
  id?: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-scroll into view when section opens
  useEffect(() => {
    if (isOpen && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="start-glass overflow-hidden rounded-2xl scroll-mt-[4.5rem] md:scroll-mt-6"
    >
      <button
        type="button"
        className="flex w-full min-h-[44px] items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/40 md:min-h-10 md:py-2.5"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="start-panel-heading">{title}</h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#64748b] transition-transform duration-200 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="space-y-4 border-t border-white/25 px-4 pb-4 pt-2 md:px-6 md:pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
