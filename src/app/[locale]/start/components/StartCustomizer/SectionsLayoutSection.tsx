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
  hours: "Hours",
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
  const orderedActive = state.sectionOrder.filter((id) => state.activeSections.includes(id)).slice(0, 4);
  const atCapacity = state.activeSections.length >= 4;

  function toggle(id: SectionId) {
    if (state.activeSections.includes(id)) {
      patch({ activeSections: state.activeSections.filter((x) => x !== id) });
      return;
    }
    if (atCapacity) return;
    patch({ activeSections: [...state.activeSections, id] });
  }

  function move(id: SectionId, dir: -1 | 1) {
    const oa = state.sectionOrder.filter((x) => state.activeSections.includes(x)).slice(0, 4);
    const idx = oa.indexOf(id);
    const j = idx + dir;
    if (idx === -1 || j < 0 || j >= oa.length) return;
    const other = oa[j];
    patch({ sectionOrder: swapInOrder(state.sectionOrder, id, other) });
  }

  return (
    <CollapsibleSection id="sections" title="Sections" isOpen={isOpen} onToggle={onToggle}>
      <p className="start-caption mb-4">
        Show up to <strong>four</strong> blocks on your card. Reorder changes how they appear between CTAs and contact.
      </p>

      <fieldset className="space-y-2">
        <legend className={labelClass}>Visible sections</legend>
        {state.sectionOrder.map((id) => {
          const on = state.activeSections.includes(id);
          const disabledOff = !on && atCapacity;
          return (
            <label
              key={id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border border-black/10 px-3 py-2 text-sm ${
                disabledOff ? "cursor-not-allowed opacity-50" : ""
              }`}
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
          );
        })}
      </fieldset>

      {atCapacity && (
        <p className="mt-2 text-xs opacity-70" style={{ color: "var(--text-primary)" }}>
          Maximum of four sections enabled. Turn one off to add another.
        </p>
      )}

      <div className="mt-6">
        <p className={labelClass}>Order (active only)</p>
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
