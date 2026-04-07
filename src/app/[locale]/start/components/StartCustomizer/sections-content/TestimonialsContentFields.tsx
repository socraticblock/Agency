import type { Lane1CustomizerState, TestimonialItem } from "../../../lib/types";
import { fieldClass, labelClass } from "../types";

function setT(
  list: [TestimonialItem, TestimonialItem, TestimonialItem],
  i: number,
  field: keyof TestimonialItem,
  v: string,
): [TestimonialItem, TestimonialItem, TestimonialItem] {
  const next = [...list] as [TestimonialItem, TestimonialItem, TestimonialItem];
  next[i] = { ...next[i], [field]: v };
  return next;
}

export function TestimonialsContentFields({
  state,
  patch,
}: {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
}) {
  return (
    <fieldset className="space-y-4 border-t border-black/10 pt-4">
      <legend className="start-label font-semibold text-[#1e293b]">Testimonials (3)</legend>
      {state.testimonials.map((t, i) => (
        <div key={i} className="space-y-2 rounded-lg border border-black/10 p-3">
          <p className="text-xs font-medium opacity-70">Quote {i + 1}</p>
          <label className={labelClass}>
            Quote
            <textarea
              className={`${fieldClass} min-h-[64px] resize-y`}
              value={t.quote}
              onChange={(e) => patch({ testimonials: setT(state.testimonials, i, "quote", e.target.value) })}
              onFocus={(e) => e.target.select()}
            />
          </label>
          <label className={labelClass}>
            Name
            <input
              className={fieldClass}
              value={t.name}
              onChange={(e) => patch({ testimonials: setT(state.testimonials, i, "name", e.target.value) })}
              onFocus={(e) => e.target.select()}
            />
          </label>
          <label className={labelClass}>
            Job title / company
            <input
              className={fieldClass}
              value={t.title}
              onChange={(e) => patch({ testimonials: setT(state.testimonials, i, "title", e.target.value) })}
              onFocus={(e) => e.target.select()}
            />
          </label>
        </div>
      ))}
    </fieldset>
  );
}
