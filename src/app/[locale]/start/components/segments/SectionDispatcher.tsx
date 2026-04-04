"use client";

import type { Lane1CustomizerState, SectionId } from "../../lib/types";
import { ServicesSegment } from "./ServicesSegment";
import type { CSSProperties } from "react";

interface SectionDispatcherProps {
  state: Lane1CustomizerState;
  editable: boolean;
  useSecondary: boolean;
  isResponsive: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  setServiceLine: (i: number, v: string) => void;
  setServiceDescriptionLine: (i: number, v: string) => void;
  headingStyle: CSSProperties;
  bodyStyle: CSSProperties;
  itemVariants: any;
  glassStyle: CSSProperties;
  icons: any[];
}

export function SectionDispatcher({
  state,
  editable,
  useSecondary,
  isResponsive,
  patch,
  setServiceLine,
  setServiceDescriptionLine,
  headingStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
  icons,
}: SectionDispatcherProps) {
  // Hard limit of 4 sections enforced in the UI, but we filter here just in case.
  const activeSections = state.sectionOrder.filter(id => state.activeSections.includes(id)).slice(0, 4);

  return (
    <>
      {activeSections.map((sectionId) => {
        switch (sectionId) {
          case "services":
            return (
              <ServicesSegment
                key="services"
                state={state}
                editable={editable}
                useSecondary={useSecondary}
                isResponsive={isResponsive}
                expandedService={null}
                setExpandedService={() => {}} // Internal logic handled or passed
                patch={patch}
                setServiceLine={setServiceLine}
                setServiceDescriptionLine={setServiceDescriptionLine}
                headingStyle={headingStyle}
                bodyStyle={bodyStyle}
                itemVariants={itemVariants}
                glassStyle={glassStyle}
                icons={icons}
              />
            );
          
          case "about":
            // TODO: Phase 6
            return null;
          case "testimonials":
            // TODO: Phase 6
            return null;
          case "gallery":
            // TODO: Phase 6
            return null;
          case "awards":
            // TODO: Phase 6
            return null;
          case "hours":
            // TODO: Phase 6
            return null;
          case "video":
            // TODO: Phase 6
            return null;
          case "booking":
            // TODO: Phase 6
            return null;
            
          default:
            return null;
        }
      })}
    </>
  );
}
