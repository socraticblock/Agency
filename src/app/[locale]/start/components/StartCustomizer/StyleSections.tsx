import { CollapsibleSection } from "../CollapsibleSection";
import {
  AccentPresetGrid,
  FontPresetGrid,
  VibePresetGrid,
  AnimationPresetGrid,
  ButtonStyleGrid,
} from "../StylePresetGrids";
import {
  ACCENT_PRESETS,
  LEGACY_DISPLAY_TO_BODY_PACK,
  TYPOGRAPHY_PACK_PRESETS,
  TYPOGRAPHY_TO_LEGACY_FONT,
  BUTTON_STYLE_PRESETS,
  VIBE_PRESETS,
  ANIMATION_PRESETS,
} from "../../lib/presets";
import type { ButtonStyleId, Lane1CustomizerState, TypographyPackId } from "../../lib/types";
import { type SectionProps } from "./types";
import { Phase5ExperienceControls } from "./Phase5ExperienceControls";

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
        legend="Primary accent"
        groupAriaLabel="Primary accent color"
      />
      <AccentPresetGrid
        options={ACCENT_PRESETS}
        value={state.style.secondaryAccentId}
        onChange={(id: string) => onPatch({ secondaryAccentId: id })}
        legend="Secondary accent"
        groupAriaLabel="Secondary accent color"
      />
    </CollapsibleSection>
  );
}

export function FontSection({ state, onPatch, isOpen, onToggle }: SectionProps & { onPatch: any }) {
  return (
    <CollapsibleSection
      id="font"
      title="Typography"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <p className="start-caption mb-2">
        Display packs control headings and CTAs; each pairs with a recommended body stack for paragraph copy.
      </p>
      <FontPresetGrid
        options={TYPOGRAPHY_PACK_PRESETS}
        value={state.style.buttonTypographyPackId}
        onChange={(id: string) => {
          const pack = id as TypographyPackId;
          onPatch({
            typographyPackId: pack,
            buttonTypographyPackId: pack,
            bodyTypographyPackId: LEGACY_DISPLAY_TO_BODY_PACK[pack],
            fontId: TYPOGRAPHY_TO_LEGACY_FONT[pack],
          });
        }}
      />
    </CollapsibleSection>
  );
}

export function ButtonStyleSection({ state, onPatch, isOpen, onToggle }: SectionProps & { onPatch: any }) {
  return (
    <CollapsibleSection id="buttons" title="Buttons" isOpen={isOpen} onToggle={onToggle}>
      <p className="start-caption mb-2">Call-to-action, share, and map buttons share this style.</p>
      <ButtonStyleGrid
        options={BUTTON_STYLE_PRESETS}
        value={state.style.buttonStyleId}
        onChange={(id: string) => onPatch({ buttonStyleId: id as ButtonStyleId })}
      />
    </CollapsibleSection>
  );
}

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
