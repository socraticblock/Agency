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
import { motion, type Variants } from "framer-motion";

interface SectionDispatcherProps {
  state: Lane1CustomizerState;
  editable: boolean;
  useSecondary: boolean;
  isResponsive: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  setServiceLine: (i: number, v: string) => void;
  setServiceDescriptionLine: (i: number, v: string) => void;
  headingStyle: CSSProperties;
  ctaLabelStyle: CSSProperties;
  bodyStyle: CSSProperties;
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
  setServiceIcon: (i: number, name: string | null) => void;
  activeSection: SectionId | null;
  setActiveSection: (sectionId: SectionId | null) => void;
  pulseSectionId: SectionId | null;
  pulseToken: number;
  orderHighlightIssueIds?: ReadonlySet<string>;
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
  ctaLabelStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
  setServiceIcon,
  activeSection,
  setActiveSection,
  pulseSectionId,
  pulseToken,
  orderHighlightIssueIds,
}: SectionDispatcherProps) {
  const activeSections = state.sectionOrder.filter((id) => state.activeSections.includes(id));

  const sectionShellVariants: Variants = {
    idle: {
      y: 0,
      transition: { duration: 0.16, ease: "easeOut" },
    },
    hover: {
      y: -2,
      transition: { duration: 0.16, ease: "easeOut" },
    },
  };

  const withEditorShell = (sectionId: SectionId, node: ReactNode) => (
    <motion.div
      key={sectionId}
      variants={sectionShellVariants}
      initial="idle"
      animate="idle"
      whileHover={editable ? "hover" : "idle"}
      className={`group relative rounded-2xl transition-all ${
        editable ? "cursor-pointer" : ""
      } ${
        editable && activeSection === sectionId
          ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-transparent"
          : "hover:ring-1 hover:ring-white/15"
      }`}
      onClick={() => {
        if (!editable) return;
        setActiveSection(sectionId);
      }}
    >
      {pulseSectionId === sectionId ? (
        <motion.div
          key={`pulse-${sectionId}-${pulseToken}`}
          initial={{ opacity: 0, scale: 0.992 }}
          animate={{ opacity: [0.0, 0.36, 0.0], scale: [0.992, 1.006, 1.0] }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-2 ring-[var(--accent)]/60"
        />
      ) : null}
      {node}
    </motion.div>
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
                setServiceIcon={setServiceIcon}
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
                useSecondary={useSecondary}
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
                useSecondary={useSecondary}
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
                useSecondary={useSecondary}
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
                useSecondary={useSecondary}
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
                useSecondary={useSecondary}
                patch={patch}
                isResponsive={isResponsive}
                headingStyle={headingStyle}
                ctaLabelStyle={ctaLabelStyle}
                itemVariants={itemVariants}
                glassStyle={glassStyle}
                orderHighlightIssueIds={orderHighlightIssueIds}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
