"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState, TestimonialItem } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";

interface TestimonialsSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  isResponsive: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  headingStyle: CSSProperties;
  bodyStyle: CSSProperties;
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
}

function patchTestimonial(
  list: [TestimonialItem, TestimonialItem, TestimonialItem],
  i: number,
  field: keyof TestimonialItem,
  v: string,
): Partial<Lane1CustomizerState> {
  const next = [...list] as [TestimonialItem, TestimonialItem, TestimonialItem];
  next[i] = { ...next[i], [field]: v };
  return { testimonials: next };
}

export function TestimonialsSegment({
  state,
  editable,
  isResponsive,
  patch,
  headingStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
}: TestimonialsSegmentProps) {
  const visible = state.testimonials.filter((t) => t.quote.trim() || editable);
  if (!editable && visible.length === 0) return null;

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <h2 className="mb-4 text-lg font-bold" style={headingStyle}>
        Testimonials
      </h2>
      <ul className="flex flex-col gap-4">
        {state.testimonials.slice(0, state.testimonialCount).map((t, i) => {
          if (!editable && !t.quote.trim()) return null;
          return (
            <li
              key={i}
              className="rounded-xl border p-4"
              style={{ borderColor: "rgba(0,0,0,0.08)", ...glassStyle }}
            >
              <blockquote className="text-sm italic leading-relaxed" style={bodyStyle}>
                <InlineEditable
                  value={t.quote}
                  onChange={(v) => patch(patchTestimonial(state.testimonials, i, "quote", v))}
                  placeholder={`Client quote ${i + 1}…`}
                  editable={editable}
                  multiline
                  className="block w-full whitespace-pre-wrap"
                  style={bodyStyle}
                />
              </blockquote>
              <div className="mt-2 text-xs font-semibold opacity-80" style={{ color: "var(--text-primary)" }}>
                <InlineEditable
                  value={t.name}
                  onChange={(v) => patch(patchTestimonial(state.testimonials, i, "name", v))}
                  placeholder="Name"
                  editable={editable}
                  className="inline-block min-w-0"
                />
                {editable || t.title.trim() ? (
                  <span className="opacity-60">
                    {", "}
                    <InlineEditable
                      value={t.title}
                      onChange={(v) => patch(patchTestimonial(state.testimonials, i, "title", v))}
                      placeholder="Title / company"
                      editable={editable}
                      className="inline-block min-w-0"
                    />
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
