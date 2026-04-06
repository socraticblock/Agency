"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { AwardItem, Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";

interface AwardsSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  isResponsive: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  headingStyle: CSSProperties;
  bodyStyle: CSSProperties;
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
}

function patchAward(
  list: [AwardItem, AwardItem, AwardItem, AwardItem],
  i: number,
  field: keyof AwardItem,
  v: string,
): Partial<Lane1CustomizerState> {
  const next = [...list] as [AwardItem, AwardItem, AwardItem, AwardItem];
  next[i] = { ...next[i], [field]: v };
  return { awards: next };
}

export function AwardsSegment({
  state,
  editable,
  isResponsive,
  patch,
  headingStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
}: AwardsSegmentProps) {
  const visible = state.awards.filter((a) => a.title.trim() || a.issuer.trim() || editable);
  if (!editable && visible.length === 0) return null;

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <h2 className="mb-4 text-lg font-bold" style={headingStyle}>
        Awards & recognition
      </h2>
      <ul className="flex flex-col gap-3">
        {state.awards.slice(0, state.awardCount).map((a, i) => {
          if (!editable && !a.title.trim() && !a.issuer.trim()) return null;
          return (
            <li
              key={i}
              className="flex flex-col gap-0.5 rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "rgba(0,0,0,0.08)", ...glassStyle }}
            >
              <span className="font-semibold" style={bodyStyle}>
                <InlineEditable
                  value={a.title}
                  onChange={(v) => patch(patchAward(state.awards, i, "title", v))}
                  placeholder="Award or certification"
                  editable={editable}
                  className="block w-full"
                />
              </span>
              <span className="text-xs opacity-75" style={bodyStyle}>
                <InlineEditable
                  value={a.issuer}
                  onChange={(v) => patch(patchAward(state.awards, i, "issuer", v))}
                  placeholder="Issuer / year"
                  editable={editable}
                  className="block w-full"
                />
              </span>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
