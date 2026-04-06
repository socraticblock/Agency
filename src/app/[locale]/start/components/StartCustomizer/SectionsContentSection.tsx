import { CollapsibleSection } from "../CollapsibleSection";
import type { SectionProps } from "./types";
import type { SectionId } from "../../lib/types";
import { AboutContentFields } from "./sections-content/AboutContentFields";
import { TestimonialsContentFields } from "./sections-content/TestimonialsContentFields";
import { GalleryContentFields } from "./sections-content/GalleryContentFields";
import { AwardsContentFields } from "./sections-content/AwardsContentFields";
import { VideoBookingContentFields } from "./sections-content/VideoBookingContentFields";

// Map section IDs to their content components
function SectionContentBlock({ sectionId, state, patch }: { sectionId: SectionId; state: any; patch: (p: any) => void }) {
  switch (sectionId) {
    case "about":
      return <AboutContentFields state={state} patch={patch} />;
    case "testimonials":
      return <TestimonialsContentFields state={state} patch={patch} />;
    case "gallery":
      return <GalleryContentFields state={state} patch={patch} />;
    case "awards":
      return <AwardsContentFields state={state} patch={patch} />;
    case "video":
    case "booking":
      // Video and booking share the same content block
      return state.activeSections.includes("video") || state.activeSections.includes("booking") 
        ? <VideoBookingContentFields state={state} patch={patch} />
        : null;
    case "hours":
      // Hours fields are in ContentSection, not here
      return null;
    case "services":
      // Services are handled in the ServicesSection component
      return null;
    default:
      return null;
  }
}

export function SectionsContentSection({ state, patch, isOpen, onToggle }: SectionProps) {
  // Get only active sections, in the user's chosen order
  const visibleSectionsInOrder = state.sectionOrder
    .filter((id: SectionId) => state.activeSections.includes(id))
    .filter((id: SectionId) => {
      // Filter out hours (in ContentSection) and services (in ServicesSection)
      return id !== "hours" && id !== "services";
    });

  // Merge video and booking if both are active (they share content block)
  const uniqueSections = new Set<SectionId>();
  const filteredSections = visibleSectionsInOrder.filter((id: SectionId) => {
    if (id === "video" || id === "booking") {
      const key = "video-booking";
      if (uniqueSections.has(key as any)) return false;
      uniqueSections.add(key as any);
      return true;
    }
    return true;
  });

  return (
    <CollapsibleSection id="sections-content" title="Section content" isOpen={isOpen} onToggle={onToggle}>
      <p className="start-caption mb-4">
        Fill in the blocks you enable under Sections. Hours still use the same fields as Contact (English / Georgian).
      </p>
      {filteredSections.length > 0 ? (
        filteredSections.map((sectionId) => (
          <SectionContentBlock 
            key={sectionId} 
            sectionId={sectionId} 
            state={state} 
            patch={patch} 
          />
        ))
      ) : (
        <div className="text-center py-8 text-[#64748b]">
          No sections enabled. Please go to the "Sections" tab and toggle on the features you want to include on your card.
        </div>
      )}
    </CollapsibleSection>
  );
}
