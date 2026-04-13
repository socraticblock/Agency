import { hasValidAddress } from "./location";
import type { Lane1CustomizerState, SectionId, SocialPlatformId } from "./types";
import { orderedActiveCtaChannels } from "./types";
import { defaultLane1State } from "./types";

export type OrderValidationIssue = {
  id: string;
  title: string;
  why: string;
  action: string;
  blocking: boolean;
};

const DEFAULTS = defaultLane1State();

function isBlank(s: string): boolean {
  return !s.trim();
}

function safeHttpUrl(raw: string): boolean {
  const t = raw.trim();
  if (!t) return false;
  try {
    const u = new URL(t.startsWith("http") ? t : `https://${t}`);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function looksLikePlaceholderPhone(phone: string): boolean {
  return phone.trim() === DEFAULTS.phone.trim() || !/\d{3,}/.test(phone.replace(/\D/g, ""));
}

function looksLikePlaceholderEmail(email: string): boolean {
  return email.trim().toLowerCase() === DEFAULTS.email.trim().toLowerCase();
}

function socialUrlFor(state: Lane1CustomizerState, id: SocialPlatformId): string {
  switch (id) {
    case "facebook":
      return state.social.facebook;
    case "instagram":
      return state.social.instagram;
    case "linkedin":
      return state.social.linkedin;
    case "tiktok":
      return state.social.tiktok;
    case "youtube":
      return state.social.youtube;
    default:
      return "";
  }
}

function sectionActive(state: Lane1CustomizerState, id: SectionId): boolean {
  return state.activeSections.includes(id);
}

export function validateOrderState(state: Lane1CustomizerState): {
  blocking: OrderValidationIssue[];
  advisory: OrderValidationIssue[];
} {
  const blocking: OrderValidationIssue[] = [];
  const advisory: OrderValidationIssue[] = [];

  const addr = state.address.trim();
  const addrOk = hasValidAddress(addr);

  if (state.selectedTier === "subdomain" && !state.digitalCardUrlHint.trim()) {
    blocking.push({
      id: "subdomain-hint",
      title: "Preferred subdomain",
      why: "We need a subdomain slug to reserve your card URL on genezisi.com.",
      action: "Enter a short name (letters, numbers, hyphen), e.g. mycompany.",
      blocking: true,
    });
  }

  if (state.selectedTier === "executive" && !state.digitalCardUrlHint.trim()) {
    blocking.push({
      id: "executive-domain",
      title: "Preferred domain",
      why: "Executive tier includes domain handling — tell us which domain you want so we can check availability.",
      action: "Enter your preferred domain, e.g. yourname.ge.",
      blocking: true,
    });
  }

  if (isBlank(state.name) || state.name.trim() === DEFAULTS.name) {
    blocking.push({
      id: "name",
      title: "Your name",
      why: "Your card needs the name clients will see.",
      action: "Edit your name on the card (hero section).",
      blocking: true,
    });
  }

  if (isBlank(state.title) || state.title.trim() === DEFAULTS.title) {
    blocking.push({
      id: "title",
      title: "Job title",
      why: "Visitors need to know your role or profession.",
      action: "Edit your job title on the card.",
      blocking: true,
    });
  }

  if (isBlank(state.phone) || looksLikePlaceholderPhone(state.phone)) {
    blocking.push({
      id: "phone",
      title: "Phone number",
      why: "Call and WhatsApp buttons use this number when those actions are shown.",
      action: "Replace the sample phone with your real number (with country code).",
      blocking: true,
    });
  }

  if (orderedActiveCtaChannels(state).length === 0) {
    advisory.push({
      id: "cta-buttons",
      title: "Primary contact buttons",
      why: "Both Call and WhatsApp are hidden — visitors have no main tap-to-contact actions.",
      action: "Open the CTAs pill and turn on Call and/or WhatsApp, or confirm you only want email/social.",
      blocking: false,
    });
  }

  if (isBlank(state.email) || looksLikePlaceholderEmail(state.email)) {
    blocking.push({
      id: "email",
      title: "Email",
      why: "Clients use this to reach you from the card.",
      action: "Replace the sample email with your real address.",
      blocking: true,
    });
  }

  if (sectionActive(state, "booking") && !safeHttpUrl(state.bookingUrl)) {
    blocking.push({
      id: "booking-url",
      title: "Booking link",
      why: "The booking section is on but there is no valid calendar or booking URL.",
      action: "Add your booking URL (https://…) or turn off the Booking section in Sections.",
      blocking: true,
    });
  }

  if (state.addGoogleMap) {
    if (state.showMapPreview && !addrOk) {
      blocking.push({
        id: "map-address",
        title: "Address for map",
        why: "Map preview is on, but the address is too short or unclear for Google Maps.",
        action: "Add a full street address, or turn off map preview in Location.",
        blocking: true,
      });
    }
    if (state.showGetDirectionsButton && !addrOk) {
      blocking.push({
        id: "directions-address",
        title: "Address for directions",
        why: "Get Directions is on, but the address is not valid enough to open maps.",
        action: "Add a full street address, or turn off Get Directions in Location.",
        blocking: true,
      });
    }
  }

  const ph = state.photoDataUrl;
  if (!ph || ph === "/premium_profile_placeholder.png") {
    advisory.push({
      id: "photo-placeholder",
      title: "Profile photo",
      why: "You are still using the placeholder photo.",
      action: "Tap your photo to upload a professional headshot, or send one later in WhatsApp.",
      blocking: false,
    });
  }

  if (state.profileLanguageMode === "both" || state.secondaryMode !== "none") {
    const sparseSecondary =
      isBlank(state.nameSecondary) &&
      isBlank(state.titleSecondary) &&
      isBlank(state.aboutBioSecondary) &&
      isBlank(state.practiceHeadingSecondary);
    if (sparseSecondary && state.secondaryMode === "self") {
      advisory.push({
        id: "secondary-self",
        title: "Georgian / second language",
        why: "Self-translated mode is on but secondary fields are mostly empty.",
        action: "Fill Georgian fields on the card, or switch language mode if you only need English.",
        blocking: false,
      });
    }
  }

  for (const id of state.activeSocialPlatforms) {
    if (!socialUrlFor(state, id).trim()) {
      advisory.push({
        id: `social-${id}`,
        title: `${id} link`,
        why: "This network is shown on the card but has no URL.",
        action: `Add your ${id} link in Social, or hide that network.`,
        blocking: false,
      });
    }
  }

  if (sectionActive(state, "about") && isBlank(state.aboutBio) && isBlank(state.aboutBioSecondary)) {
    advisory.push({
      id: "about-empty",
      title: "About section",
      why: "About is visible but has no text yet.",
      action: "Write a short bio, or remove the About section.",
      blocking: false,
    });
  }

  if (sectionActive(state, "video") && !state.videoUrl.trim()) {
    advisory.push({
      id: "video-empty",
      title: "Video section",
      why: "Video section is on but no URL is set.",
      action: "Paste a YouTube or video link, or turn off the Video section.",
      blocking: false,
    });
  }

  if (sectionActive(state, "gallery")) {
    let count = 0;
    for (let i = 0; i < state.galleryCount; i++) {
      if (state.galleryImageDataUrls[i]) count += 1;
    }
    if (count === 0) {
      advisory.push({
        id: "gallery-empty",
        title: "Gallery",
        why: "Gallery is on but no images are uploaded.",
        action: "Add images in Gallery, or turn off the section.",
        blocking: false,
      });
    }
  }

  return { blocking, advisory };
}
