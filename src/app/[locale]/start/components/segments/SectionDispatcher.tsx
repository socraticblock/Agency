"use client";

import type { Lane1CustomizerState, SectionId } from "../../lib/types";
import { ServicesSegment } from "./ServicesSegment";
import { AboutSegment } from "./AboutSegment";
import { TestimonialsSegment } from "./TestimonialsSegment";
import { GallerySegment } from "./GallerySegment";
import { AwardsSegment } from "./AwardsSegment";
import { VideoSegment } from "./VideoSegment";
import { BookingSegment } from "./BookingSegment";
import type { CSSProperties } from "react";
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
  const activeSections = state.sectionOrder.filter((id) => state.activeSections.includes(id)).slice(0, 4);

  return (
    <>
      {activeSections.map((sectionId: SectionId) => {
        switch (sectionId) {
          case "services":
            return (
              <ServicesSegment
                key={sectionId}
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
            return (
              <AboutSegment
                key={sectionId}
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
            return (
              <TestimonialsSegment
                key={sectionId}
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
            return (
              <GallerySegment
                key={sectionId}
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
            return (
              <AwardsSegment
                key={sectionId}
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
            return (
              <VideoSegment
                key={sectionId}
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
            return (
              <BookingSegment
                key={sectionId}
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
