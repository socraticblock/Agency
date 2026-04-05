import { CollapsibleSection } from "../CollapsibleSection";
import type { CardShadowId, Lane1CustomizerState } from "../../lib/types";
import { fieldClass, labelClass } from "./types";

export function CardChromeSection({
  state,
  onPatch,
  isOpen,
  onToggle,
}: {
  state: Lane1CustomizerState;
  onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <CollapsibleSection id="card-chrome" title="Card surface" isOpen={isOpen} onToggle={onToggle}>
      <p className="start-caption mb-3">Dark mode-style surface and outer chrome for the preview card.</p>
      <label className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1e293b]">
        <input
          type="checkbox"
          className="h-4 w-4"
          style={{ accentColor: "var(--accent)" }}
          checked={state.style.cardDarkSurface}
          onChange={(e) => onPatch({ cardDarkSurface: e.target.checked })}
        />
        Dark card surface
      </label>
      <label className={labelClass}>
        Corner radius ({state.style.cardRadiusPx}px)
        <input
          type="range"
          min={8}
          max={40}
          value={state.style.cardRadiusPx}
          onChange={(e) => onPatch({ cardRadiusPx: Number(e.target.value) })}
          className="mt-1 w-full accent-[#1A2744]"
        />
      </label>
      <label className={labelClass}>
        Shadow
        <select
          className={fieldClass}
          value={state.style.cardShadowId}
          onChange={(e) => onPatch({ cardShadowId: e.target.value as CardShadowId })}
        >
          <option value="none">None</option>
          <option value="soft">Soft</option>
          <option value="elevated">Elevated</option>
          <option value="luxury">Luxury</option>
        </select>
      </label>
    </CollapsibleSection>
  );
}
