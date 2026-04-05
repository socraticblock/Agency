import { CollapsibleSection } from "../CollapsibleSection";
import { AccentPresetGrid, FontPresetGrid, VibePresetGrid, AnimationPresetGrid } from "../StylePresetGrids";
import { ACCENT_PRESETS, FONT_PRESETS, VIBE_PRESETS, ANIMATION_PRESETS } from "../../lib/presets";
import { type SectionProps } from "./types";

export function AccentSection({ state, onPatch, isOpen, onToggle }: SectionProps & { onPatch: any }) {
  return (
    <CollapsibleSection
      id="accent"
      title="Accent color"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <AccentPresetGrid
        options={ACCENT_PRESETS}
        value={state.style.accentId}
        onChange={(id: string) => onPatch({ accentId: id })}
      />
    </CollapsibleSection>
  );
}

export function FontSection({ state, onPatch, isOpen, onToggle }: SectionProps & { onPatch: any }) {
  return (
    <CollapsibleSection
      id="font"
      title="Font style"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <FontPresetGrid
        options={FONT_PRESETS}
        value={state.style.fontId}
        onChange={(id: string) => onPatch({ fontId: id })}
      />
    </CollapsibleSection>
  );
}

export function ExperienceSection({ state, onPatch, isOpen, onToggle }: SectionProps & { onPatch: any }) {
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
    </CollapsibleSection>
  );
}
