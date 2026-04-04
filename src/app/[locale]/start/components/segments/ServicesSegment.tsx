"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";
import type { CSSProperties } from "react";

interface ServicesSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  useSecondary: boolean;
  isResponsive: boolean;
  expandedService: number | null;
  setExpandedService: (i: number | null) => void;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  setServiceLine: (i: number, v: string) => void;
  setServiceDescriptionLine: (i: number, v: string) => void;
  headingStyle: CSSProperties;
  bodyStyle: CSSProperties;
  itemVariants: any;
  glassStyle: CSSProperties;
  icons: LucideIcon[];
}

export function ServicesSegment({
  state,
  editable,
  useSecondary,
  isResponsive,
  expandedService,
  setExpandedService,
  patch,
  setServiceLine,
  setServiceDescriptionLine,
  headingStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
  icons,
}: ServicesSegmentProps) {
  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{
        borderColor: "var(--accent-secondary)",
        ...glassStyle
      }}
    >
      <h2
        className="mb-4 text-lg font-bold"
        style={headingStyle}
      >
        <InlineEditable
          value={
            useSecondary
              ? state.practiceHeadingSecondary
              : state.practiceHeading
          }
          onChange={(v) =>
            patch(
              useSecondary
                ? { practiceHeadingSecondary: v }
                : { practiceHeading: v },
            )
          }
          fallbackIfEmpty={useSecondary ? state.practiceHeading : ""}
          showFallbackIndicator={useSecondary}
          placeholder="Practice areas"
          editable={editable}
          className="block w-full"
          style={headingStyle}
        />
      </h2>
      <ul className="flex flex-col gap-3">
        {Array.from({ length: state.serviceCount }).map((_, i) => {
          const enTitle = state.serviceAreas[i] ?? "";
          const geTitle = state.serviceAreasSecondary[i] ?? "";
          const enDesc = state.serviceDescriptions[i] ?? "";
          const geDesc = state.serviceDescriptionsSecondary[i] ?? "";

          const title = useSecondary ? geTitle : enTitle;
          const desc = useSecondary ? geDesc : enDesc;

          if (useSecondary) {
            if (!enTitle.trim() && !geTitle.trim() && !editable) return null;
          } else if (!enTitle.trim() && !editable) {
            return null;
          }

          const isExpanded = expandedService === i;
          const Icon = icons[i % icons.length];

          return (
            <li
              key={i}
              className="overflow-hidden rounded-xl border transition-all"
              style={{
                borderColor: isExpanded ? "var(--accent)" : "rgba(0,0,0,0.05)",
                background: isExpanded ? "rgba(0,0,0,0.02)" : "transparent",
                ...glassStyle
              }}
            >
              <button
                type="button"
                onClick={() => setExpandedService(isExpanded ? null : i)}
                className="flex w-full items-start gap-3 p-3 text-left"
              >
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: "var(--accent)" }}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold leading-snug">
                      <InlineEditable
                        value={title}
                        onChange={(v) => setServiceLine(i, v)}
                        fallbackIfEmpty={useSecondary ? enTitle : ""}
                        showFallbackIndicator={useSecondary}
                        placeholder={`Service ${i + 1}`}
                        editable={editable}
                        className="block w-full"
                      />
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div
                      className="border-t border-black/5 p-3 pt-0 text-sm leading-relaxed opacity-70"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <InlineEditable
                        value={desc}
                        onChange={(v) => setServiceDescriptionLine(i, v)}
                        fallbackIfEmpty={useSecondary ? enDesc : ""}
                        showFallbackIndicator={useSecondary}
                        placeholder="Add a detailed description of your expertise in this area..."
                        editable={editable}
                        className="block w-full"
                        style={bodyStyle}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
