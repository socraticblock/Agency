import { CollapsibleSection } from "../CollapsibleSection";
import { VibePresetGrid, AnimationPresetGrid } from "../StylePresetGrids";
import { VIBE_PRESETS, ANIMATION_PRESETS } from "../../lib/presets";
import type { Lane1CustomizerState } from "../../lib/types";
import { type SectionProps } from "./types";
import { Phase5ExperienceControls } from "./Phase5ExperienceControls";

export function ExperienceSection({
  state,
  patch,
  onPatch,
  isOpen,
  onToggle,
}: SectionProps & { onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void }) {
  return (
    <CollapsibleSection
      id="experience"
      title="Experience"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <p className="start-caption">
        Elevate the feeling of your site with luxury effects.
      </p>
      <VibePresetGrid
        options={VIBE_PRESETS}
        value={state.style.vibeId}
        onChange={(id: string) => onPatch({ vibeId: id })}
      />
      <AnimationPresetGrid
        options={ANIMATION_PRESETS}
        value={state.style.animationId}
        onChange={(id: string) => onPatch({ animationId: id })}
      />
      <Phase5ExperienceControls state={state} patch={patch} onStylePatch={onPatch} />
    </CollapsibleSection>
  );
}
