import { CollapsibleSection } from "../CollapsibleSection";
import type { SectionProps } from "./types";
import type { SectionId } from "../../lib/types";

export function SectionsContentSection({ state, patch, isOpen, onToggle }: SectionProps) {
  const visibleSections = state.activeSections.filter((id: SectionId) => id !== "services");

  return (
    <CollapsibleSection id="sections-content" title="Section content" isOpen={isOpen} onToggle={onToggle}>
      <p className="start-caption mb-4">
        Genezisi is now a direct-manipulation editor. To edit your About bio, Testimonials, Awards, or Gallery titles, simply **click on the text directly on the business card preview.**
      </p>
      
      {visibleSections.length === 0 && (
        <div className="text-center py-8 text-[#64748b]">
          No sections enabled. Please go to the "Sections" tab and toggle on the features you want to include on your card.
        </div>
      )}
    </CollapsibleSection>
  );
}
