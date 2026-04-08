import { useEffect } from "react";
import { CollapsibleSection } from "../CollapsibleSection";
import type { Lane1CustomizerState, SectionId } from "../../lib/types";
import { labelClass, type SectionProps } from "./types";
import { ChevronDown, ChevronUp } from "lucide-react";

const SECTION_LABELS: Record<SectionId, string> = {
  about: "About",
  services: "Services",
  testimonials: "Testimonials",
  gallery: "Gallery",
  awards: "Awards",
  video: "Video",
  booking: "Booking",
};

function swapInOrder(order: SectionId[], a: SectionId, b: SectionId): SectionId[] {
  const next = [...order];
  const ia = next.indexOf(a);
  const ib = next.indexOf(b);
  if (ia === -1 || ib === -1) return order;
  [next[ia], next[ib]] = [next[ib], next[ia]];
  return next;
}

export function SectionsLayoutSection({ state, patch, isOpen, onToggle }: SectionProps) {
  // Clear any invalid sections from the state (e.g. blank ones)
  useEffect(() => {
    const validOrder = state.sectionOrder.filter((id) => !!id && id in SECTION_LABELS);
    const validActive = state.activeSections.filter((id) => !!id && id in SECTION_LABELS);
    
    if (validOrder.length !== state.sectionOrder.length || validActive.length !== state.activeSections.length) {
      patch({
        sectionOrder: validOrder,
        activeSections: validActive,
      });
    }
  }, [state.sectionOrder, state.activeSections, patch]);

  const orderedActive = state.sectionOrder.filter((id) => state.activeSections.includes(id));

  function toggle(id: SectionId) {
    if (state.activeSections.includes(id)) {
      patch({ activeSections: state.activeSections.filter((x) => x !== id) });
      return;
    }
    patch({ activeSections: [...state.activeSections, id] });
  }

  function move(id: SectionId, dir: -1 | 1) {
    const oa = state.sectionOrder.filter((x) => state.activeSections.includes(x));
    const idx = oa.indexOf(id);
    const j = idx + dir;
    if (idx === -1 || j < 0 || j >= oa.length) return;
    const other = oa[j];
    patch({ sectionOrder: swapInOrder(state.sectionOrder, id, other) });
  }

  return (
    <CollapsibleSection id="sections" title="Sections" isOpen={isOpen} onToggle={onToggle}>
      <p className="start-caption mb-4">
        ✨ <strong>Tip:</strong> Edit your section's text and images directly on the card preview!
      </p>

      <fieldset className="space-y-4">
        <legend className={labelClass}>Visible sections</legend>
        {state.sectionOrder
          .filter((id) => !!id && id in SECTION_LABELS) // Blank section fix
          .map((id) => {
            const on = state.activeSections.includes(id);
            const disabledOff = false;
            
            return (
              <div key={id} className="space-y-3">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border border-black/10 px-3 py-2 text-sm transition-colors ${
                    on ? "bg-black/5" : ""
                  } ${disabledOff ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 shrink-0"
                    style={{ accentColor: "var(--accent)" }}
                    checked={on}
                    disabled={disabledOff}
                    onChange={() => toggle(id)}
                  />
                  <span className="font-medium text-[#1e293b]">{SECTION_LABELS[id]}</span>
                </label>

                {on && (
                  <div className="ml-7 space-y-4 rounded-xl border border-black/5 bg-black/[0.02] p-4">
                    {id === "services" && (
                      <label className="block space-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                          Amount: {state.serviceCount}
                        </span>
                        <input
                          type="range"
                          min={1}
                          max={4}
                          step={1}
                          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-black/10 accent-[var(--accent)]"
                          value={state.serviceCount}
                          onChange={(e) => patch({ serviceCount: parseInt(e.target.value) })}
                        />
                      </label>
                    )}
                    {id === "testimonials" && (
                      <label className="block space-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                          Count: {state.testimonialCount}
                        </span>
                        <input
                          type="range"
                          min={1}
                          max={3}
                          step={1}
                          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-black/10 accent-[var(--accent)]"
                          value={state.testimonialCount}
                          onChange={(e) => patch({ testimonialCount: parseInt(e.target.value) })}
                        />
                      </label>
                    )}
                    {id === "gallery" && (
                      <label className="block space-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                          Photos: {state.galleryCount}
                        </span>
                        <input
                          type="range"
                          min={1}
                          max={6}
                          step={1}
                          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-black/10 accent-[var(--accent)]"
                          value={state.galleryCount}
                          onChange={(e) => patch({ galleryCount: parseInt(e.target.value) })}
                        />
                      </label>
                    )}
                    {id === "awards" && (
                      <label className="block space-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                          Items: {state.awardCount}
                        </span>
                        <input
                          type="range"
                          min={1}
                          max={4}
                          step={1}
                          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-black/10 accent-[var(--accent)]"
                          value={state.awardCount}
                          onChange={(e) => patch({ awardCount: parseInt(e.target.value) })}
                        />
                      </label>
                    )}
                    {(id === "about" || id === "video" || id === "booking") && (
                      <p className="text-xs italic text-[#64748b]">
                        Configuration for this section is available directly on the card preview.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </fieldset>

      <div className="mt-6">
        <p className={labelClass}>Order (active only) — move up/down with chevrons</p>
        <ul className="mt-2 space-y-2">
          {orderedActive.map((id) => {
            const i = orderedActive.indexOf(id);
            return (
              <li
                key={id}
                className="flex items-center justify-between gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm"
              >
                <span>{SECTION_LABELS[id]}</span>
                <span className="flex gap-1">
                  <button
                    type="button"
                    className="rounded p-1 hover:bg-black/5"
                    aria-label={`Move ${SECTION_LABELS[id]} up`}
                    disabled={i === 0}
                    onClick={() => move(id, -1)}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded p-1 hover:bg-black/5"
                    aria-label={`Move ${SECTION_LABELS[id]} down`}
                    disabled={i === orderedActive.length - 1}
                    onClick={() => move(id, 1)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </CollapsibleSection>
  );
}
