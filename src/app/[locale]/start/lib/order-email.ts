import { ARCHITECT_INTAKE_EMAIL } from "@/constants/content";
import { digitalCardTierLabelEn, DIGITAL_CARD_ORDER_SCHEMA_VERSION } from "./digital-card-product";
import { getDigitalCardPricingSummary } from "./lane1-pricing";
import { buildOrderAssetSummary } from "./order-payload";
import type {
  AwardItem,
  Lane1CustomizerState,
  SectionId,
  SocialLinksState,
  SocialPlatformId,
  TestimonialItem,
} from "./types";

const EMPTY = "—";

function oneLine(value: string | null | undefined): string {
  if (!value) return EMPTY;
  const next = value.replace(/\s+/g, " ").trim();
  return next || EMPTY;
}

function pushLine(lines: string[], key: string, value: string | null | undefined): void {
  lines.push(`${key}: ${oneLine(value)}`);
}

function activeSectionIds(state: Lane1CustomizerState): SectionId[] {
  return state.sectionOrder.filter((id) => state.activeSections.includes(id));
}

function sectionLabel(id: SectionId): string {
  switch (id) {
    case "about":
      return "About";
    case "services":
      return "Services";
    case "testimonials":
      return "Testimonials";
    case "gallery":
      return "Gallery";
    case "awards":
      return "Awards";
    case "video":
      return "Video";
    case "booking":
      return "Booking";
    default:
      return id;
  }
}

function languageModeLabel(state: Lane1CustomizerState): string {
  if (state.profileLanguageMode === "both") {
    if (state.secondaryMode === "pro") return "English + Georgian (professional translation requested)";
    if (state.secondaryMode === "self") return "English + Georgian (self-translated)";
    return "English + Georgian";
  }
  return state.primaryLang === "ka" ? "Georgian" : "English";
}

function activeSocialIds(state: Lane1CustomizerState): SocialPlatformId[] {
  const ordered = state.socialPlatformOrder.filter((id) => state.activeSocialPlatforms.includes(id));
  return ordered.length > 0 ? ordered : state.activeSocialPlatforms;
}

function socialValue(social: SocialLinksState, id: SocialPlatformId): string {
  switch (id) {
    case "facebook":
      return social.facebook;
    case "instagram":
      return social.instagram;
    case "linkedin":
      return social.linkedin;
    case "tiktok":
      return social.tiktok;
    case "youtube":
      return social.youtube;
    default:
      return "";
  }
}

function visibleTestimonials(state: Lane1CustomizerState): TestimonialItem[] {
  return state.testimonials.slice(0, state.testimonialCount).filter((item) => {
    return Boolean(item.quote.trim() || item.name.trim() || item.title.trim());
  });
}

function visibleAwards(state: Lane1CustomizerState): AwardItem[] {
  return state.awards.slice(0, state.awardCount).filter((item) => {
    return Boolean(item.title.trim() || item.issuer.trim());
  });
}

function mediaTransferLine(state: Lane1CustomizerState): string {
  const assets = buildOrderAssetSummary(state);
  const pending: string[] = [];
  if (assets.heroPhoto === "custom") pending.push("Headshot selected in builder; collect original file in WhatsApp");
  else pending.push("Headshot not uploaded yet; ask in WhatsApp if needed");
  if (assets.galleryImages > 0) pending.push(`${assets.galleryImages} gallery image(s) still need the original files`);
  if (assets.backgroundImage) pending.push("Custom background image is part of the design; collect the original file");
  return pending.join("; ");
}

export function buildArchitectEmailSubject(state: Lane1CustomizerState, orderId: string): string {
  const owner = oneLine(state.company) !== EMPTY ? oneLine(state.company) : oneLine(state.name);
  return `Digital Card Build Brief - ${owner} - ${orderId}`;
}

export function buildArchitectBriefLines(state: Lane1CustomizerState, orderId: string): string[] {
  const { setupGel, hostingAnnualGel } = getDigitalCardPricingSummary(state.selectedTier);
  const sections = activeSectionIds(state);
  const lines: string[] = [
    "Hi Genezisi,",
    "",
    "Please find my custom Digital Business Card build brief below.",
    "",
    `ORDER_ID: ${orderId}`,
    `ORDER_SCHEMA: v${DIGITAL_CARD_ORDER_SCHEMA_VERSION}`,
    `TIER: ${digitalCardTierLabelEn(state.selectedTier)}`,
    `SETUP_GEL: ${setupGel}`,
    `HOSTING_GEL_ANNUAL: ${hostingAnnualGel}`,
  ];

  pushLine(lines, "URL_HINT", state.digitalCardUrlHint);
  pushLine(lines, "CLIENT_NAME", state.name);
  pushLine(lines, "CLIENT_NAME_SECONDARY", state.nameSecondary);
  pushLine(lines, "COMPANY", state.company);
  pushLine(lines, "TITLE", state.title);
  pushLine(lines, "TITLE_SECONDARY", state.titleSecondary);
  pushLine(lines, "TAGLINE", state.tagline);
  pushLine(lines, "TAGLINE_SECONDARY", state.taglineSecondary);
  pushLine(lines, "EMAIL", state.email);
  pushLine(lines, "PHONE", state.phone);
  pushLine(lines, "LANGUAGE_MODE", languageModeLabel(state));
  pushLine(lines, "ADDRESS", state.address);
  pushLine(lines, "ADDRESS_SECONDARY", state.addressSecondary);
  pushLine(lines, "HOURS", state.hours);
  pushLine(lines, "HOURS_SECONDARY", state.hoursSecondary);
  lines.push(`ACTIVE_SECTIONS: ${sections.map(sectionLabel).join(", ") || EMPTY}`);
  lines.push(`ACTIVE_SOCIALS: ${activeSocialIds(state).join(", ") || EMPTY}`);
  lines.push(`MAPS: ${state.addGoogleMap ? "on" : "off"} | preview=${state.showMapPreview ? "on" : "off"} | directions=${state.showGetDirectionsButton ? "on" : "off"}`);
  lines.push(`STYLE: accent=${state.style.accentId} | vibe=${state.style.vibeId} | button=${state.style.buttonStyleId} | text_scale=${state.style.cardTextScaleId} | photo_shape=${state.style.photoShape}`);
  lines.push(`MEDIA_TRANSFER: ${mediaTransferLine(state)}`);

  if (sections.includes("about")) {
    pushLine(lines, "ABOUT", state.aboutBio);
    pushLine(lines, "ABOUT_SECONDARY", state.aboutBioSecondary);
  }

  if (sections.includes("services")) {
    pushLine(lines, "SERVICES_HEADING", state.practiceHeading);
    pushLine(lines, "SERVICES_HEADING_SECONDARY", state.practiceHeadingSecondary);
    for (let i = 0; i < state.serviceCount; i++) {
      pushLine(lines, `SERVICE_${i + 1}_TITLE`, state.serviceAreas[i]);
      pushLine(lines, `SERVICE_${i + 1}_DESCRIPTION`, state.serviceDescriptions[i]);
      pushLine(lines, `SERVICE_${i + 1}_TITLE_SECONDARY`, state.serviceAreasSecondary[i]);
      pushLine(lines, `SERVICE_${i + 1}_DESCRIPTION_SECONDARY`, state.serviceDescriptionsSecondary[i]);
    }
  }

  if (sections.includes("testimonials")) {
    for (const [index, item] of visibleTestimonials(state).entries()) {
      lines.push(
        `TESTIMONIAL_${index + 1}: quote="${oneLine(item.quote)}" | name="${oneLine(item.name)}" | title="${oneLine(item.title)}"`,
      );
    }
  }

  if (sections.includes("awards")) {
    for (const [index, item] of visibleAwards(state).entries()) {
      lines.push(`AWARD_${index + 1}: title="${oneLine(item.title)}" | issuer="${oneLine(item.issuer)}"`);
    }
  }

  if (sections.includes("video")) {
    pushLine(lines, "VIDEO_URL", state.videoUrl);
  }

  if (sections.includes("booking")) {
    pushLine(lines, "BOOKING_URL", state.bookingUrl);
    pushLine(lines, "BOOKING_LABEL", state.bookingLabel);
  }

  for (const id of activeSocialIds(state)) {
    pushLine(lines, `SOCIAL_${id.toUpperCase()}`, socialValue(state.social, id));
  }

  for (const [index, item] of state.social.extra.entries()) {
    const value = item.label.trim() || item.url.trim() ? `${oneLine(item.label)} | ${oneLine(item.url)}` : "";
    pushLine(lines, `SOCIAL_EXTRA_${index + 1}`, value);
  }

  lines.push("");
  lines.push("If easier, I can continue photo delivery or clarification by WhatsApp.");
  return lines;
}

export function buildArchitectEmailBody(state: Lane1CustomizerState, orderId: string): string {
  return buildArchitectBriefLines(state, orderId).join("\n");
}

export function buildArchitectMailtoUrl(state: Lane1CustomizerState, orderId: string): string {
  const subject = buildArchitectEmailSubject(state, orderId);
  const body = buildArchitectEmailBody(state, orderId);
  return `mailto:${ARCHITECT_INTAKE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
