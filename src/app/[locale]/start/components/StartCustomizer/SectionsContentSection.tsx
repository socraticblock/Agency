import { CollapsibleSection } from "../CollapsibleSection";
import type { SectionProps } from "./types";
import { AboutContentFields } from "./sections-content/AboutContentFields";
import { TestimonialsContentFields } from "./sections-content/TestimonialsContentFields";
import { GalleryContentFields } from "./sections-content/GalleryContentFields";
import { AwardsContentFields } from "./sections-content/AwardsContentFields";
import { VideoBookingContentFields } from "./sections-content/VideoBookingContentFields";

export function SectionsContentSection({ state, patch, isOpen, onToggle }: SectionProps) {
  return (
    <CollapsibleSection id="sections-content" title="Section content" isOpen={isOpen} onToggle={onToggle}>
      <p className="start-caption mb-4">
        Fill in the blocks you enable under Sections. Hours still use the same fields as Contact (English / Georgian).
      </p>
      <AboutContentFields state={state} patch={patch} />
      <TestimonialsContentFields state={state} patch={patch} />
      <GalleryContentFields state={state} patch={patch} />
      <AwardsContentFields state={state} patch={patch} />
      <VideoBookingContentFields state={state} patch={patch} />
    </CollapsibleSection>
  );
}
