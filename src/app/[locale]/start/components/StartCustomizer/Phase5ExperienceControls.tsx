import type { CardHoverEffectId, Lane1CustomizerState } from "../../lib/types";
import { fieldClass, labelClass } from "./types";

export function Phase5ExperienceControls({
  state,
  patch,
  onStylePatch,
}: {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  onStylePatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
}) {
  return (
    <div className="mt-6 space-y-5 border-t border-black/10 pt-6">
      <label className={labelClass}>
        Animation speed ({state.style.animationSpeed}%)
        <input
          type="range"
          min={50}
          max={150}
          value={state.style.animationSpeed}
          onChange={(e) => onStylePatch({ animationSpeed: Number(e.target.value) })}
          className="mt-1 w-full accent-[#1A2744]"
        />
        <span className="start-caption">Lower is slower; higher is snappier.</span>
      </label>

      <fieldset>
        <legend className={`${labelClass} mb-2 block`}>3D tilt (desktop wide layout)</legend>
        <label className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1e293b]">
          <input
            type="checkbox"
            className="h-4 w-4"
            style={{ accentColor: "var(--accent)" }}
            checked={state.cardTiltEnabled}
            onChange={(e) => patch({ cardTiltEnabled: e.target.checked })}
          />
          Enable parallax tilt on hero
        </label>
        <label className={labelClass}>
          Tilt strength ({state.cardTiltMaxDeg}°)
          <input
            type="range"
            min={3}
            max={12}
            value={state.cardTiltMaxDeg}
            onChange={(e) => patch({ cardTiltMaxDeg: Number(e.target.value) })}
            className="mt-1 w-full accent-[#1A2744]"
            disabled={!state.cardTiltEnabled}
          />
        </label>
      </fieldset>

      <label className={labelClass}>
        Hover emphasis (pointer devices only)
        <select
          className={fieldClass}
          value={state.cardHoverEffectId}
          onChange={(e) => patch({ cardHoverEffectId: e.target.value as CardHoverEffectId })}
        >
          <option value="none">None</option>
          <option value="lift">Lift</option>
          <option value="glow">Glow</option>
          <option value="scale">Gentle scale</option>
        </select>
      </label>
    </div>
  );
}
