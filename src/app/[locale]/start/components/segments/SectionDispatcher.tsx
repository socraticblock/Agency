"use client";

import type { Lane1CustomizerState, SectionId } from "../../lib/types";
import { ServicesSegment } from "./ServicesSegment";
import { AboutSegment } from "./AboutSegment";
import { TestimonialsSegment } from "./TestimonialsSegment";
import { GallerySegment } from "./GallerySegment";
import { AwardsSegment } from "./AwardsSegment";
import { VideoSegment } from "./VideoSegment";
import { BookingSegment } from "./BookingSegment";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

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
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
  icons: LucideIcon[];
  activeSection: SectionId | null;
  setActiveSection: (sectionId: SectionId | null) => void;
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
  activeSection,
  setActiveSection,
}: SectionDispatcherProps) {
  const activeSections = state.sectionOrder.filter((id) => state.activeSections.includes(id));

  const withEditorShell = (sectionId: SectionId, node: ReactNode) => (
    <div
      key={sectionId}
      className={`group relative rounded-2xl transition-all ${
        editable ? "cursor-pointer" : ""
      } ${editable && activeSection === sectionId ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-transparent" : ""}`}
      onClick={() => {
        if (!editable) return;
        setActiveSection(sectionId);
      }}
    >
      {node}
    </div>
  );

  return (
    <>
      {activeSections.map((sectionId: SectionId) => {
        switch (sectionId) {
          case "services":
            return withEditorShell(
              sectionId,
              <ServicesSegment
                state={state}
                editable={editable}
                useSecondary={useSecondary}
                isResponsive={isResponsive}
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
            return withEditorShell(
              sectionId,
              <AboutSegment
                state={state}
                editable={editable}
                useSecondary={useSecondary}
                isResponsive={isResponsive}
                patch={patch}
                headingStyle={headingStyle}
                bodyStyle={bodyStyle}
                itemVariants={itemVariants}
                glassStyle={glassStyle}
              />
            );
          case "testimonials":
            return withEditorShell(
              sectionId,
              <TestimonialsSegment
                state={state}
                editable={editable}
                isResponsive={isResponsive}
                patch={patch}
                headingStyle={headingStyle}
                bodyStyle={bodyStyle}
                itemVariants={itemVariants}
                glassStyle={glassStyle}
              />
            );
          case "gallery":
            return withEditorShell(
              sectionId,
              <GallerySegment
                state={state}
                editable={editable}
                patch={patch}
                isResponsive={isResponsive}
                headingStyle={headingStyle}
                itemVariants={itemVariants}
                glassStyle={glassStyle}
              />
            );
          case "awards":
            return withEditorShell(
              sectionId,
              <AwardsSegment
                state={state}
                editable={editable}
                isResponsive={isResponsive}
                patch={patch}
                headingStyle={headingStyle}
                bodyStyle={bodyStyle}
                itemVariants={itemVariants}
                glassStyle={glassStyle}
              />
            );
          case "video":
            return withEditorShell(
              sectionId,
              <VideoSegment
                state={state}
                editable={editable}
                patch={patch}
                isResponsive={isResponsive}
                headingStyle={headingStyle}
                bodyStyle={bodyStyle}
                itemVariants={itemVariants}
                glassStyle={glassStyle}
              />
            );
          case "booking":
            return withEditorShell(
              sectionId,
              <BookingSegment
                state={state}
                editable={editable}
                patch={patch}
                isResponsive={isResponsive}
                headingStyle={headingStyle}
                itemVariants={itemVariants}
                glassStyle={glassStyle}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
