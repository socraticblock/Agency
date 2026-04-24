import { digitalCardTierLabelEn, DIGITAL_CARD_ORDER_SCHEMA_VERSION } from "./digital-card-product";
import { getDigitalCardPricingSummary } from "./lane1-pricing";
import { buildOrderAssetSummary } from "./order-payload";
import {
  ACCENT_PRESETS,
  ANIMATION_PRESETS,
  BACKGROUND_PRESETS,
  BODY_TYPOGRAPHY_PRESETS,
  BUTTON_STYLE_PRESETS,
  CARD_TEXT_SCALE_PRESETS,
  PHOTO_BORDER_PRESETS,
  PHOTO_EFFECT_PRESETS,
  PHOTO_OVERLAY_PRESETS,
  PHOTO_SHAPE_PRESETS,
  TEXT_COLOR_PRESETS,
  TYPOGRAPHY_PACK_PRESETS,
  VIBE_PRESETS,
} from "./presets";
import { BG_EFFECT_OPTION_META, TEXTURE_OPTION_META } from "./texture-presets";
import type {
  AwardItem,
  CardHoverEffectId,
  CardShadowId,
  CtaChannelId,
  Lane1CustomizerState,
  SectionId,
  SocialLinksState,
  SocialPlatformId,
  StylePresetSelection,
  TestimonialItem,
} from "./types";
import { orderedActiveCtaChannels } from "./types";

const EMPTY = "—";

type LangTag = "EN" | "KA";

function oneLine(value: string | null | undefined): string {
  if (!value) return EMPTY;
  const next = value.replace(/\s+/g, " ").trim();
  return next || EMPTY;
}

function pushLine(lines: string[], key: string, value: string | null | undefined): void {
  lines.push(`${key}: ${oneLine(value)}`);
}

function presetLabelEn<T extends { id: string; labelEn: string }>(presets: readonly T[], id: string): string {
  return presets.find((p) => p.id === id)?.labelEn ?? id;
}

function idWithLabel(id: string, labelEn: string): string {
  return labelEn && labelEn !== id ? `${id} (${labelEn})` : id;
}

function cardShadowLabel(id: CardShadowId): string {
  switch (id) {
    case "none":
      return "None";
    case "soft":
      return "Soft";
    case "elevated":
      return "Elevated";
    case "luxury":
      return "Luxury";
    default:
      return id;
  }
}

function cardHoverLabel(id: CardHoverEffectId): string {
  switch (id) {
    case "none":
      return "None";
    case "lift":
      return "Lift";
    case "glow":
      return "Glow";
    case "scale":
      return "Scale";
    default:
      return id;
  }
}

function overlayTypeLabel(id: StylePresetSelection["bgOverlayId"]): string {
  switch (id) {
    case "none":
      return "None";
    case "solid":
      return "Solid";
    case "linear":
      return "Linear gradient";
    case "radial":
      return "Radial gradient";
    case "mesh":
      return "Mesh";
    default:
      return id;
  }
}

function baseTypeLabel(id: StylePresetSelection["bgBaseId"]): string {
  return id === "image" ? "Image" : "Solid";
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

function primaryCtaHandoffLabel(id: CtaChannelId): string {
  return id === "call" ? "Call (tel)" : "WhatsApp";
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

function bilingualContent(state: Lane1CustomizerState) {
  const enPrimary = state.primaryLang === "en";
  return {
    nameEn: enPrimary ? state.name : state.nameSecondary,
    nameKa: enPrimary ? state.nameSecondary : state.name,
    titleEn: enPrimary ? state.title : state.titleSecondary,
    titleKa: enPrimary ? state.titleSecondary : state.title,
    taglineEn: enPrimary ? state.tagline : state.taglineSecondary,
    taglineKa: enPrimary ? state.taglineSecondary : state.tagline,
    addressEn: enPrimary ? state.address : state.addressSecondary,
    addressKa: enPrimary ? state.addressSecondary : state.address,
    hoursEn: enPrimary ? state.hours : state.hoursSecondary,
    hoursKa: enPrimary ? state.hoursSecondary : state.hours,
    aboutEn: enPrimary ? state.aboutBio : state.aboutBioSecondary,
    aboutKa: enPrimary ? state.aboutBioSecondary : state.aboutBio,
    servicesHeadingEn: enPrimary ? state.practiceHeading : state.practiceHeadingSecondary,
    servicesHeadingKa: enPrimary ? state.practiceHeadingSecondary : state.practiceHeading,
    serviceTitleEn: (i: number) => (enPrimary ? state.serviceAreas[i] : state.serviceAreasSecondary[i]),
    serviceTitleKa: (i: number) => (enPrimary ? state.serviceAreasSecondary[i] : state.serviceAreas[i]),
    serviceDescEn: (i: number) => (enPrimary ? state.serviceDescriptions[i] : state.serviceDescriptionsSecondary[i]),
    serviceDescKa: (i: number) => (enPrimary ? state.serviceDescriptionsSecondary[i] : state.serviceDescriptions[i]),
  };
}

function contentLangSequence(state: Lane1CustomizerState): LangTag[] {
  const m = state.profileLanguageMode;
  if (m === "en_only") return ["EN"];
  if (m === "ka_only") return ["KA"];
  return state.primaryLang === "en" ? ["EN", "KA"] : ["KA", "EN"];
}

function appendContentLangBlock(
  lines: string[],
  state: Lane1CustomizerState,
  sections: SectionId[],
  lang: LangTag,
): void {
  const b = bilingualContent(state);
  lines.push(`--- CONTENT_${lang} ---`);
  pushLine(lines, `CLIENT_NAME_${lang}`, lang === "EN" ? b.nameEn : b.nameKa);
  pushLine(lines, `TITLE_${lang}`, lang === "EN" ? b.titleEn : b.titleKa);
  pushLine(lines, `TAGLINE_${lang}`, lang === "EN" ? b.taglineEn : b.taglineKa);
  pushLine(lines, `ADDRESS_${lang}`, lang === "EN" ? b.addressEn : b.addressKa);
  pushLine(lines, `HOURS_${lang}`, lang === "EN" ? b.hoursEn : b.hoursKa);

  if (sections.includes("about")) {
    pushLine(lines, `ABOUT_${lang}`, lang === "EN" ? b.aboutEn : b.aboutKa);
  }
  if (sections.includes("services")) {
    pushLine(lines, `SERVICES_HEADING_${lang}`, lang === "EN" ? b.servicesHeadingEn : b.servicesHeadingKa);
    for (let i = 0; i < state.serviceCount; i++) {
      pushLine(lines, `SERVICE_${i + 1}_TITLE_${lang}`, lang === "EN" ? b.serviceTitleEn(i) : b.serviceTitleKa(i));
      pushLine(
        lines,
        `SERVICE_${i + 1}_DESCRIPTION_${lang}`,
        lang === "EN" ? b.serviceDescEn(i) : b.serviceDescKa(i),
      );
    }
  }
}

function appendDesignSpec(lines: string[], state: Lane1CustomizerState): void {
  const s = state.style;
  const bgLabel = presetLabelEn(BACKGROUND_PRESETS, s.backgroundId);
  const textLabel = presetLabelEn(TEXT_COLOR_PRESETS, s.textColorId);
  const accentLabel = presetLabelEn(ACCENT_PRESETS, s.accentId);
  const bodyTypoLabel = presetLabelEn(BODY_TYPOGRAPHY_PRESETS, s.bodyTypographyPackId);
  const displayTypoLabel = presetLabelEn(TYPOGRAPHY_PACK_PRESETS, s.buttonTypographyPackId);
  const ctaTypoLabel = presetLabelEn(TYPOGRAPHY_PACK_PRESETS, s.ctaTypographyPackId);
  const legacyTypoLabel = presetLabelEn(TYPOGRAPHY_PACK_PRESETS, s.typographyPackId);
  const textScaleLabel = presetLabelEn(CARD_TEXT_SCALE_PRESETS, s.cardTextScaleId);
  const buttonLabel = presetLabelEn(BUTTON_STYLE_PRESETS, s.buttonStyleId);
  const vibeLabel = presetLabelEn(VIBE_PRESETS, s.vibeId);
  const animLabel = presetLabelEn(ANIMATION_PRESETS, s.animationId);
  const texLabel = presetLabelEn(TEXTURE_OPTION_META, s.textureId);
  const motionLabel = presetLabelEn(BG_EFFECT_OPTION_META, s.bgEffectId);
  const shapeLabel = presetLabelEn(PHOTO_SHAPE_PRESETS, s.photoShape);
  const photoFxLabel = presetLabelEn(PHOTO_EFFECT_PRESETS, s.photoEffect);
  const photoOvLabel = presetLabelEn(PHOTO_OVERLAY_PRESETS, s.photoOverlay);
  const photoBdLabel = presetLabelEn(PHOTO_BORDER_PRESETS, s.photoBorder);

  lines.push("");
  lines.push("### BACKGROUND");
  pushLine(lines, "BACKGROUND_PRESET_ID", idWithLabel(s.backgroundId, bgLabel));
  pushLine(lines, "TEXT_COLOR_PRESET_ID", idWithLabel(s.textColorId, textLabel));
  pushLine(lines, "BG_BASE_TYPE", baseTypeLabel(s.bgBaseId));
  pushLine(lines, "BG_BASE_COLOR", s.bgBaseColor);
  pushLine(lines, "BG_BASE_BLUR_PCT", String(s.bgBaseBlur));
  pushLine(lines, "BG_BASE_IMAGE", s.bgBaseImageDataUrl ? "present (binary omitted in paste)" : "none");
  pushLine(lines, "BG_OVERLAY_TYPE", overlayTypeLabel(s.bgOverlayId));
  pushLine(lines, "BG_OVERLAY_COLOR_1", s.bgOverlayColor1);
  pushLine(lines, "BG_OVERLAY_COLOR_2", s.bgOverlayColor2);
  pushLine(lines, "BG_OVERLAY_COLOR_3", s.bgOverlayColor3);
  pushLine(lines, "BG_OVERLAY_ANGLE_DEG", String(s.bgOverlayAngle));
  pushLine(lines, "BG_OVERLAY_OPACITY", String(s.bgOverlayOpacity));
  pushLine(lines, "TEXTURE_ID", idWithLabel(s.textureId, texLabel));
  pushLine(lines, "TEXTURE_OPACITY_PCT", String(s.textureOpacity));
  pushLine(lines, "TEXTURE_TINT_HEX", (s.textureTintHex ?? "").trim() || "(auto)");
  pushLine(lines, "BG_MOTION_EFFECT_ID", idWithLabel(s.bgEffectId, motionLabel));
  pushLine(lines, "BG_MOTION_OPACITY_PCT", String(s.bgEffectOpacity));
  pushLine(lines, "BG_MOTION_SPEED", String(s.bgEffectSpeed));
  pushLine(lines, "BG_MOTION_INTENSITY", String(s.bgEffectIntensity));
  pushLine(lines, "BG_MOTION_TINT_HEX", (s.bgEffectTintHex ?? "").trim() || "(accent)");

  lines.push("");
  lines.push("### TYPE");
  pushLine(lines, "TYPOGRAPHY_LEGACY_PACK_ID", idWithLabel(s.typographyPackId, legacyTypoLabel));
  pushLine(lines, "BODY_TYPOGRAPHY_PACK_ID", idWithLabel(s.bodyTypographyPackId, bodyTypoLabel));
  pushLine(lines, "DISPLAY_TYPOGRAPHY_PACK_ID", idWithLabel(s.buttonTypographyPackId, displayTypoLabel));
  pushLine(lines, "CTA_TYPOGRAPHY_PACK_ID", idWithLabel(s.ctaTypographyPackId, ctaTypoLabel));
  pushLine(lines, "CARD_TEXT_SCALE_ID", idWithLabel(s.cardTextScaleId, textScaleLabel));
  pushLine(lines, "BODY_TEXT_HEX", s.bodyTextHex || "(follow text preset)");
  pushLine(lines, "DISPLAY_TEXT_HEX", s.buttonTextHex || "(follow text preset)");
  pushLine(lines, "CTA_TEXT_HEX", s.ctaTextHex || "(follow text preset)");

  lines.push("");
  lines.push("### LOOK");
  pushLine(lines, "ACCENT_ID", idWithLabel(s.accentId, accentLabel));
  pushLine(lines, "BUTTON_STYLE_ID", idWithLabel(s.buttonStyleId, buttonLabel));
  pushLine(lines, "VIBE_ID", idWithLabel(s.vibeId, vibeLabel));

  lines.push("");
  lines.push("### EXPERIENCE");
  pushLine(lines, "ANIMATION_ID", idWithLabel(s.animationId, animLabel));
  pushLine(lines, "ANIMATION_SPEED", String(s.animationSpeed));
  pushLine(lines, "CARD_TILT_ENABLED", state.cardTiltEnabled ? "on" : "off");
  pushLine(lines, "CARD_TILT_MAX_DEG", String(state.cardTiltMaxDeg));
  pushLine(lines, "CARD_HOVER_EFFECT_ID", idWithLabel(state.cardHoverEffectId, cardHoverLabel(state.cardHoverEffectId)));

  lines.push("");
  lines.push("### HERO_PHOTO_STYLE");
  pushLine(lines, "PHOTO_SHAPE_ID", idWithLabel(s.photoShape, shapeLabel));
  pushLine(lines, "PHOTO_ZOOM_PCT", String(s.photoZoom));
  pushLine(lines, "PHOTO_POSITION_X_PCT", String(s.photoPositionX));
  pushLine(lines, "PHOTO_POSITION_Y_PCT", String(s.photoPositionY));
  pushLine(lines, "PHOTO_EFFECT_ID", idWithLabel(s.photoEffect, photoFxLabel));
  pushLine(lines, "PHOTO_OVERLAY_ID", idWithLabel(s.photoOverlay, photoOvLabel));
  pushLine(lines, "PHOTO_BORDER_ID", idWithLabel(s.photoBorder, photoBdLabel));
  pushLine(lines, "PHOTO_ALIGNMENT", s.photoAlignment);
  pushLine(lines, "PHOTO_KEN_BURNS", s.photoKenBurns ? "on" : "off");

  lines.push("");
  lines.push("### CARD_SURFACE");
  pushLine(lines, "CARD_RADIUS_PX", String(s.cardRadiusPx));
  pushLine(lines, "CARD_SHADOW_ID", idWithLabel(s.cardShadowId, cardShadowLabel(s.cardShadowId)));

  lines.push("");
  lines.push("### QR");
  pushLine(lines, "SHOW_QR_ON_CARD", state.showQrOnCard ? "on" : "off");
  pushLine(lines, "QR_DISPLAY_MODE", state.qrDisplayMode);
  pushLine(lines, "QR_STYLE", state.qrStyle);
  pushLine(lines, "QR_FOREGROUND_HEX", state.qrForegroundColor);
  pushLine(lines, "QR_BACKGROUND_HEX", state.qrBackgroundColor);
  pushLine(lines, "QR_LOGO", state.showQrLogo ? "on" : "off");

  lines.push("");
  lines.push("### SOCIAL_CHROME");
  pushLine(lines, "SOCIAL_ICON_STYLE", state.socialIconStyle);
  pushLine(lines, "SOCIAL_ICON_SIZE", state.socialIconSize);
  pushLine(lines, "SOCIAL_ICON_COLOR_MODE", state.socialIconColorMode);
  pushLine(lines, "SOCIAL_ICON_CUSTOM_HEX", state.socialIconCustomHex || "(none)");
  pushLine(lines, "SHOW_SOCIAL_LABELS", state.showSocialLabels ? "on" : "off");

  lines.push("");
  lines.push("### CTA_LABELS");
  pushLine(lines, "ACTIVE_CTA_ORDER", orderedActiveCtaChannels(state).join(", ") || "(none)");
  pushLine(lines, "CTA_SLOT_ORDER", state.ctaChannelOrder.join(", "));
  pushLine(lines, "CTA_TEXT_CALL", state.ctaTextCall);
  pushLine(lines, "CTA_TEXT_WHATSAPP", state.ctaTextWhatsApp);
}

export function buildOrderEmailSubject(state: Lane1CustomizerState, orderId: string): string {
  const owner = oneLine(state.company) !== EMPTY ? oneLine(state.company) : oneLine(state.name);
  return `Digital Card Build Brief - ${owner} - ${orderId}`;
}

/** Key-value operator block (shared by email body and WhatsApp paste). */
export function buildOrderHandoffDataLines(state: Lane1CustomizerState, orderId: string): string[] {
  const { setupGel, hostingAnnualGel } = getDigitalCardPricingSummary(state.selectedTier);
  const sections = activeSectionIds(state);
  const lines: string[] = [];

  lines.push("### ORDER");
  lines.push(`ORDER_ID: ${orderId}`);
  lines.push(`ORDER_SCHEMA: v${DIGITAL_CARD_ORDER_SCHEMA_VERSION}`);
  pushLine(lines, "TIER", digitalCardTierLabelEn(state.selectedTier));
  pushLine(lines, "SETUP_GEL", String(setupGel));
  pushLine(lines, "HOSTING_GEL_ANNUAL", String(hostingAnnualGel));
  pushLine(lines, "URL_HINT", state.digitalCardUrlHint);
  pushLine(lines, "COMPANY", state.company);
  pushLine(lines, "EMAIL", state.email);
  pushLine(lines, "PHONE", state.phone);
  pushLine(lines, "LANGUAGE_MODE", languageModeLabel(state));
  pushLine(lines, "PRIMARY_LANG", state.primaryLang);
  pushLine(lines, "PROFILE_LANGUAGE_MODE", state.profileLanguageMode);
  pushLine(lines, "SECONDARY_MODE", state.secondaryMode);
  pushLine(lines, "TRANSLATION_METHOD", state.translationMethod);
  pushLine(lines, "TRANSLATION_SOURCE_LANG", state.translationSourceLang);
  lines.push(`ACTIVE_SECTIONS: ${sections.map(sectionLabel).join(", ") || EMPTY}`);
  lines.push(`ACTIVE_SOCIALS: ${activeSocialIds(state).join(", ") || EMPTY}`);
  lines.push(
    `MAPS: ${state.addGoogleMap ? "on" : "off"} | preview=${state.showMapPreview ? "on" : "off"} | directions=${state.showGetDirectionsButton ? "on" : "off"}`,
  );
  lines.push(`MOBILE_BUTTON_ORDER: ${state.mobileButtonOrder.join(", ") || EMPTY}`);
  lines.push(
    `ACTIVE_PRIMARY_CTAS: ${orderedActiveCtaChannels(state).map(primaryCtaHandoffLabel).join(" → ") || EMPTY}`,
  );
  lines.push(`CTA_CHANNEL_SLOTS_ORDER: ${state.ctaChannelOrder.join(", ")}`);

  lines.push("");
  lines.push("### CONTENT (primary language block first)");
  for (const lang of contentLangSequence(state)) {
    appendContentLangBlock(lines, state, sections, lang);
  }

  lines.push("");
  lines.push("### SECTIONS_AND_LINKS");
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

  appendDesignSpec(lines, state);

  lines.push("");
  lines.push("### MEDIA_TRANSFER");
  lines.push(`MEDIA_TRANSFER: ${mediaTransferLine(state)}`);

  lines.push("");
  lines.push("If easier, I can continue photo delivery or clarification by WhatsApp.");
  return lines;
}

export function buildOrderBriefLines(state: Lane1CustomizerState, orderId: string): string[] {
  return [
    "Hi Genezisi,",
    "",
    "Please find my custom Digital Business Card build brief below.",
    "",
    ...buildOrderHandoffDataLines(state, orderId),
  ];
}

/** Full message to copy-paste into WhatsApp (after the short opener message). */
export function buildWhatsAppOrderPasteText(state: Lane1CustomizerState, orderId: string): string {
  const core = buildOrderHandoffDataLines(state, orderId).join("\n");
  if (state.primaryLang === "ka") {
    return `გამარჯობა Genezisi — აი ციფრული ვიზიტკა, რომელიც მინდა:\n\n${core}`;
  }
  return `Hi Genezisi — here is the Digital Business Card I want:\n\n${core}`;
}

export function buildOrderEmailBody(state: Lane1CustomizerState, orderId: string): string {
  return buildOrderBriefLines(state, orderId).join("\n");
}

export function buildOrderMailtoUrl(state: Lane1CustomizerState, orderId: string): string {
  const subject = buildOrderEmailSubject(state, orderId);
  const body = buildOrderEmailBody(state, orderId);
  return `mailto:hello@genezisi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
