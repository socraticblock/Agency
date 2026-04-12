import {
  DIGITAL_CARD_ORDER_SCHEMA_VERSION,
  type DigitalCardTierId,
  digitalCardTierLabelEn,
  digitalCardTierLabelKa,
} from "./digital-card-product";
import { getDigitalCardPricingSummary } from "./lane1-pricing";
import type { Lane1CustomizerState, SectionId } from "./types";
import { CUSTOMIZER_VERSION } from "./types";

/** Version of the `order.json` envelope shape (not the WhatsApp text schema). */
export const ORDER_FILE_SCHEMA_VERSION = 1 as const;

/** What was removed from `state` so the JSON stays small; images are sent in WhatsApp separately. */
export type OrderHandoffMediaMeta = {
  heroImageOmitted: boolean;
  galleryImagesOmitted: number;
  backgroundImageOmitted: boolean;
};

export type GenezisiOrderFileV1 = {
  orderFileSchemaVersion: typeof ORDER_FILE_SCHEMA_VERSION;
  orderId: string;
  exportedAt: string;
  digitalCardOrderSchemaVersion: typeof DIGITAL_CARD_ORDER_SCHEMA_VERSION;
  customizerVersion: typeof CUSTOMIZER_VERSION;
  tier: DigitalCardTierId;
  setupGel: number;
  hostingAnnualGel: number;
  digitalCardUrlHint: string;
  /** Set when binary image fields were stripped from `state` for handoff (see `handoffMedia`). */
  handoffMedia?: OrderHandoffMediaMeta;
  /**
   * Card state for replay via `normalizeLane1StateFromUnknown`.
   * Handoff exports omit embedded photos (hero, gallery, background image) — see WhatsApp checklist.
   */
  state: Lane1CustomizerState;
};

export function generateOrderId(): string {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 10);
  return `gc-${t}-${r}`;
}

const PLACEHOLDER_PHOTO = "/premium_profile_placeholder.png";

/** Strips hero, gallery, and background image blobs for a small handoff JSON. */
export function buildLeanHandoffState(state: Lane1CustomizerState): {
  state: Lane1CustomizerState;
  handoffMedia: OrderHandoffMediaMeta;
} {
  const handoffMedia: OrderHandoffMediaMeta = {
    heroImageOmitted: false,
    galleryImagesOmitted: 0,
    backgroundImageOmitted: false,
  };
  const next = structuredClone(state) as Lane1CustomizerState;
  const ph = next.photoDataUrl;
  if (ph && ph !== PLACEHOLDER_PHOTO) {
    handoffMedia.heroImageOmitted = true;
    next.photoDataUrl = PLACEHOLDER_PHOTO;
  }
  const g = [...next.galleryImageDataUrls] as Lane1CustomizerState["galleryImageDataUrls"];
  for (let i = 0; i < g.length; i++) {
    if (g[i]) {
      handoffMedia.galleryImagesOmitted += 1;
      g[i] = null;
    }
  }
  next.galleryImageDataUrls = g;
  if (next.style.bgBaseImageDataUrl?.trim()) {
    handoffMedia.backgroundImageOmitted = true;
    next.style = { ...next.style, bgBaseImageDataUrl: null };
  }
  return { state: next, handoffMedia };
}

export function buildGenezisiOrderFile(state: Lane1CustomizerState, orderId: string): GenezisiOrderFileV1 {
  const { setupGel, hostingAnnualGel } = getDigitalCardPricingSummary(state.selectedTier);
  const { state: leanState, handoffMedia } = buildLeanHandoffState(state);
  return {
    orderFileSchemaVersion: ORDER_FILE_SCHEMA_VERSION,
    orderId,
    exportedAt: new Date().toISOString(),
    digitalCardOrderSchemaVersion: DIGITAL_CARD_ORDER_SCHEMA_VERSION,
    customizerVersion: CUSTOMIZER_VERSION,
    tier: state.selectedTier,
    setupGel,
    hostingAnnualGel,
    digitalCardUrlHint: state.digitalCardUrlHint.trim(),
    handoffMedia,
    state: leanState,
  };
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

export function buildOrderAssetSummary(state: Lane1CustomizerState): {
  heroPhoto: "placeholder" | "custom";
  galleryImages: number;
  backgroundImage: boolean;
} {
  const ph = state.photoDataUrl;
  const heroPhoto = !ph || ph === "/premium_profile_placeholder.png" ? "placeholder" : "custom";
  let galleryImages = 0;
  for (let i = 0; i < state.galleryImageDataUrls.length; i++) {
    if (state.galleryImageDataUrls[i]) galleryImages += 1;
  }
  const backgroundImage = Boolean(
    state.style.bgBaseId === "image" && state.style.bgBaseImageDataUrl?.trim(),
  );
  return { heroPhoto, galleryImages, backgroundImage };
}

/** Short lines for the direct-WhatsApp alternative. */
export function buildOrderSummaryLines(state: Lane1CustomizerState, orderId: string): string[] {
  const { setupGel, hostingAnnualGel } = getDigitalCardPricingSummary(state.selectedTier);
  const tierEn = digitalCardTierLabelEn(state.selectedTier);
  const active = state.sectionOrder.filter((id) => state.activeSections.includes(id));
  const sections = active.map(sectionLabel).join(", ") || "—";
  const assets = buildOrderAssetSummary(state);
  const langLine =
    state.profileLanguageMode === "both"
      ? state.secondaryMode === "self"
        ? "Languages: EN + GE (self-translated)"
        : state.secondaryMode === "pro"
          ? "Languages: EN + GE (pro translation requested)"
          : "Languages: both"
      : state.primaryLang === "ka"
        ? "Language: Georgian"
        : "Language: English";

  const lines: string[] = [
    `Order ID: ${orderId}`,
    `Preference: direct WhatsApp communication`,
    `Tier: ${tierEn} · Setup ${setupGel} GEL · Hosting ${hostingAnnualGel} GEL/yr`,
  ];
  const hint = state.digitalCardUrlHint.trim();
  if (hint) {
    if (state.selectedTier === "subdomain") lines.push(`Preferred subdomain: ${hint}`);
    else if (state.selectedTier === "executive") lines.push(`Preferred domain: ${hint}`);
    else lines.push(`URL note: ${hint}`);
  }
  lines.push(`Name: ${state.name.trim() || "—"}`);
  lines.push(`Company: ${state.company.trim() || "—"}`);
  lines.push(`Title: ${state.title.trim() || "—"}`);
  lines.push(`Phone: ${state.phone.trim() || "—"}`);
  lines.push(`Email: ${state.email.trim() || "—"}`);
  lines.push(langLine);
  lines.push(`Sections: ${sections}`);
  lines.push(
    `Media: headshot ${assets.heroPhoto === "custom" ? "selected in builder" : "not uploaded yet"}, gallery ${assets.galleryImages}, bg photo ${assets.backgroundImage ? "yes" : "no"}`,
  );
  lines.push(`Maps: ${state.addGoogleMap ? "on" : "off"} (preview ${state.showMapPreview ? "on" : "off"}, directions ${state.showGetDirectionsButton ? "on" : "off"})`);
  lines.push(`Customizer version: v${state.version}`);
  lines.push(`---`);
  lines.push(`Next: Please continue with me here in WhatsApp.`);
  lines.push(`Please send your profile headshot in the next message if you have it ready.`);
  if (assets.galleryImages > 0) {
    lines.push(`Please also send ${assets.galleryImages} gallery image(s) in this chat.`);
  }
  if (assets.backgroundImage) {
    lines.push(`Please send the background image in chat too.`);
  }
  if (assets.heroPhoto === "placeholder") {
    lines.push(`Note: Hero is still placeholder in the editor — any headshot you send is welcome.`);
  }
  return lines;
}

/** Georgian summary body for the direct-WhatsApp alternative. */
export function buildOrderSummaryLinesKa(state: Lane1CustomizerState, orderId: string): string[] {
  const { setupGel, hostingAnnualGel } = getDigitalCardPricingSummary(state.selectedTier);
  const tierKa = digitalCardTierLabelKa(state.selectedTier);
  const active = state.sectionOrder.filter((id) => state.activeSections.includes(id));
  const sections = active.map(sectionLabel).join(", ") || "—";
  const assets = buildOrderAssetSummary(state);
  const langNote =
    state.profileLanguageMode === "both"
      ? "ენები: ორივე (დეტალები შეკვეთის ფაილში)"
      : state.primaryLang === "ka"
        ? "ენა: ქართული"
        : "ენა: ინგლისური";

  const lines: string[] = [
    `შეკვეთის ID: ${orderId}`,
    `არჩევანი: პირდაპირი კომუნიკაცია WhatsApp-ში`,
    `ტარიფი: ${tierKa} · დაყენება ${setupGel} ₾ · ჰოსტინგი ${hostingAnnualGel} ₾/წელი`,
  ];
  const hint = state.digitalCardUrlHint.trim();
  if (hint) {
    if (state.selectedTier === "subdomain") lines.push(`სურვილი სუბდომენი: ${hint}`);
    else if (state.selectedTier === "executive") lines.push(`სურვილი დომენი: ${hint}`);
    else lines.push(`URL შენიშვნა: ${hint}`);
  }
  lines.push(`სახელი: ${state.name.trim() || "—"}`);
  lines.push(`კომპანია: ${state.company.trim() || "—"}`);
  lines.push(`თანამდებობა: ${state.title.trim() || "—"}`);
  lines.push(`ტელეფონი: ${state.phone.trim() || "—"}`);
  lines.push(`ელფოსტა: ${state.email.trim() || "—"}`);
  lines.push(langNote);
  lines.push(`სექციები: ${sections}`);
  lines.push(
    `მედია: პროფილის ფოტო ${assets.heroPhoto === "custom" ? "არჩეულია ბილდერში" : "ჯერ არ არის ატვირთული"}, გალერეა ${assets.galleryImages}, ფონის სურათი ${assets.backgroundImage ? "კი" : "არა"}`,
  );
  lines.push(`რუკა: ${state.addGoogleMap ? "ჩართული" : "გამორთული"}`);
  lines.push(`Customizer: v${state.version}`);
  lines.push(`---`);
  lines.push(`შემდეგი: გავაგრძელოთ კომუნიკაცია WhatsApp-ში.`);
  lines.push(`თუ მზად გაქვთ, პროფილის ფოტო გამოაგზავნეთ შემდეგ შეტყობინებაში.`);
  if (assets.galleryImages > 0) {
    lines.push(`გალერეის ${assets.galleryImages} სურათი ამ ჩატში გამოაგზავნეთ.`);
  }
  if (assets.backgroundImage) {
    lines.push(`ფონის სურათიც გამოაგზავნეთ ჩატში.`);
  }
  if (assets.heroPhoto === "placeholder") {
    lines.push(`შენიშვნა: ჯერ კიდევ ნიმუშის ფოტოა — რეალური ფოტოს გამოგზავნა მისასალმებელია.`);
  }
  return lines;
}

export function parseImportedOrderFile(raw: unknown): Lane1CustomizerState | null {
  if (raw === null || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (o.orderFileSchemaVersion === ORDER_FILE_SCHEMA_VERSION && o.state && typeof o.state === "object") {
    return o.state as Lane1CustomizerState;
  }
  if ("version" in o && "style" in o) {
    return raw as Lane1CustomizerState;
  }
  return null;
}
