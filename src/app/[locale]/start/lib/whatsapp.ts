import { WHATSAPP_INTAKE } from "@/constants/content";
import {
  DIGITAL_CARD_ORDER_SCHEMA_VERSION,
  type DigitalCardTierId,
  digitalCardTierLabelEn,
  digitalCardTierLabelKa,
} from "./digital-card-product";
import { getDigitalCardPricingSummary } from "./lane1-pricing";
import type { Lane1CustomizerState, SectorId } from "./types";
import { SECTOR_LABELS } from "./placeholders";

function normalizeWaDigits(): string {
  return WHATSAPP_INTAKE.replace(/\D/g, "");
}

function sectorLabel(id: SectorId | null, lang: "ka" | "en"): string {
  if (!id) return lang === "ka" ? "სექტორი არ არის არჩეული" : "No sector";
  return lang === "ka" ? SECTOR_LABELS[id].titleKa : SECTOR_LABELS[id].titleEn;
}

function styleSummary(state: Lane1CustomizerState, lang: "ka" | "en"): string {
  const { style } = state;
  if (lang === "ka") {
    return `სტილი: ფონი ${style.backgroundId}, ტექსტი ${style.textColorId}, აქცენტი ${style.accentId}, ფონტი ${style.fontId}`;
  }
  return `Style: bg ${style.backgroundId}, text ${style.textColorId}, accent ${style.accentId}, font ${style.fontId}`;
}

function servicesBlock(state: Lane1CustomizerState, lang: "ka" | "en"): string {
  const n = state.serviceCount;
  const lines: string[] = [];
  for (let i = 0; i < n; i++) {
    const t = state.serviceAreas[i]?.trim();
    if (t) lines.push(`${i + 1}. ${t}`);
  }
  if (lines.length === 0) return lang === "ka" ? "(სერვისები ცარიელია)" : "(no services)";
  return lines.join("\n");
}

function servicesBlockSecondary(state: Lane1CustomizerState): string {
  const n = state.serviceCount;
  const lines: string[] = [];
  for (let i = 0; i < n; i++) {
    const t = state.serviceAreasSecondary[i]?.trim();
    if (t) lines.push(`${i + 1}. ${t}`);
  }
  if (lines.length === 0) return "(no services)";
  return lines.join("\n");
}

function enGeBlock(label: string, en: string, ge: string): string[] {
  return [`${label}`, `EN: ${en.trim() || "—"}`, `GE: ${ge.trim() || "—"}`, ""];
}

function digitalCardUrlPreferenceLine(
  tier: DigitalCardTierId,
  trimmedHint: string,
  lang: "ka" | "en",
): string {
  if (lang === "ka") {
    if (tier === "subdomain") return `სურვილი სუბდომენი / სლაგი: ${trimmedHint}`;
    if (tier === "executive") return `სურვილი დომენი: ${trimmedHint}`;
    return `სურვილი URL / სლაგი: ${trimmedHint}`;
  }
  if (tier === "subdomain") return `Preferred subdomain: ${trimmedHint}`;
  if (tier === "executive") return `Preferred domain: ${trimmedHint}`;
  return `URL / domain preference: ${trimmedHint}`;
}

function pushDigitalCardOrderHeader(lines: string[], state: Lane1CustomizerState, lang: "ka" | "en") {
  const { setupGel, hostingAnnualGel } = getDigitalCardPricingSummary(state.selectedTier);
  const tierLabel =
    lang === "ka" ? digitalCardTierLabelKa(state.selectedTier) : digitalCardTierLabelEn(state.selectedTier);
  const hint = state.digitalCardUrlHint.trim();
  if (lang === "ka") {
    lines.push("---");
    lines.push(`შეკვეთა · სქემა v${DIGITAL_CARD_ORDER_SCHEMA_VERSION}`);
    lines.push(`ტარიფი: ${tierLabel}`);
    lines.push(`დაყენება: ${setupGel} ₾`);
    lines.push(`წლიური ჰოსტინგი: ${hostingAnnualGel} ₾/წელი`);
  } else {
    lines.push("---");
    lines.push(`ORDER · schema v${DIGITAL_CARD_ORDER_SCHEMA_VERSION}`);
    lines.push(`Tier: ${tierLabel}`);
    lines.push(`Setup: ${setupGel} GEL`);
    lines.push(`Annual hosting: ${hostingAnnualGel} GEL/year`);
  }
  if (hint) {
    lines.push(digitalCardUrlPreferenceLine(state.selectedTier, hint, lang));
  }
  lines.push(
    lang === "ka"
      ? `სნაპშოტი · customizer v${state.version}`
      : `Snapshot · customizer v${state.version}`,
  );
  lines.push("---");
  lines.push("");
}

export function buildLane1WhatsAppUrl(state: Lane1CustomizerState): string {
  const lines: string[] = [];
  const lang = state.primaryLang;

  if (lang === "ka") {
    lines.push("გამარჯობა Genezisi! მინდა ციფრული ვიზიტკის შეკვეთა.");
    lines.push("");
    pushDigitalCardOrderHeader(lines, state, "ka");
    lines.push(`სექტორი: ${sectorLabel(state.sectorId, "ka")}`);
    lines.push(`სახელი / ფირმა: ${state.name || "—"}`);
    lines.push(`თანამდებობა: ${state.title || "—"}`);
    lines.push(`ტელეფონი: ${state.phone || "—"}`);
    lines.push(`ელფოსტა: ${state.email || "—"}`);
    lines.push("");
    lines.push("სერვისები:");
    lines.push(servicesBlock(state, "ka"));
    lines.push("");
    lines.push(`მისამართი: ${state.address || "—"}`);
    lines.push(`საათები: ${state.hours || "—"}`);
    lines.push("");
    lines.push("სოციალური:");
    lines.push(`Facebook: ${state.social.facebook || "—"}`);
    lines.push(`Instagram: ${state.social.instagram || "—"}`);
    lines.push(`LinkedIn: ${state.social.linkedin || "—"}`);
    lines.push(`TikTok: ${state.social.tiktok || "—"}`);
    lines.push(`YouTube: ${state.social.youtube || "—"}`);
    state.social.extra.forEach((e, i) => {
      if (e.url.trim()) lines.push(`${e.label || `Extra ${i + 1}`}: ${e.url}`);
    });
    lines.push("");
    lines.push(styleSummary(state, "ka"));
    lines.push(
      `ენა: ძირითადი — ${state.primaryLang === "ka" ? "ქართული" : "ინგლისური"}`,
    );
    if (state.secondaryMode === "self") {
      lines.push("მეორე ენა: კლიენტის თარგმანი (+50 ₾) — ცალკე ხარჯი, დაადასტურეთ Genezisi-თან");
      lines.push(`სახელი (მე-2 ენა): ${state.nameSecondary || "—"}`);
    } else if (state.secondaryMode === "pro") {
      lines.push("მეორე ენა: პროფესიონალი მთარგმნელი (+150 ₾) — ცალკე ხარჯი, დაადასტურეთ Genezisi-თან");
    }
    lines.push(`Google Maps: ${state.addGoogleMap ? "კი (უფასო)" : "არა"}`);
    lines.push("");
    lines.push("My photo is ready to send!");
  } else if (state.secondaryMode === "self") {
    lines.push("Hi Genezisi! I'd like to order a Digital Business Card.");
    lines.push("");
    pushDigitalCardOrderHeader(lines, state, "en");
    lines.push("(Self-translated Georgian — EN + GE for each field per your checklist)");
    lines.push("");
    lines.push(`Sector: ${sectorLabel(state.sectorId, "en")}`);
    lines.push(...enGeBlock("Name / firm", state.name, state.nameSecondary));
    lines.push(...enGeBlock("Title", state.title, state.titleSecondary));
    lines.push(...enGeBlock("Phone", state.phone, state.phone));
    lines.push(...enGeBlock("Email", state.email, state.email));
    lines.push("Service areas:");
    lines.push("EN:");
    lines.push(servicesBlock(state, "en"));
    lines.push("GE:");
    lines.push(servicesBlockSecondary(state));
    lines.push("");
    lines.push(...enGeBlock("Practice heading", state.practiceHeading, state.practiceHeadingSecondary));
    lines.push(...enGeBlock("Address", state.address, state.addressSecondary));
    lines.push(...enGeBlock("Hours", state.hours, state.hoursSecondary));
    lines.push("");
    lines.push("Social:");
    lines.push(`Facebook: ${state.social.facebook || "—"}`);
    lines.push(`Instagram: ${state.social.instagram || "—"}`);
    lines.push(`LinkedIn: ${state.social.linkedin || "—"}`);
    lines.push(`TikTok: ${state.social.tiktok || "—"}`);
    lines.push(`YouTube: ${state.social.youtube || "—"}`);
    state.social.extra.forEach((e, i) => {
      if (e.url.trim()) lines.push(`${e.label || `Link ${i + 1}`}: ${e.url}`);
    });
    lines.push("");
    lines.push(styleSummary(state, "en"));
    lines.push(
      "Second language: self-translated (+50 GEL) — separate from Digital Card setup/hosting; confirm with Genezisi.",
    );
    lines.push(`Google Maps: ${state.addGoogleMap ? "Yes (free)" : "No"}`);
    lines.push("");
    lines.push("My photo is ready to send!");
  } else if (state.secondaryMode === "pro") {
    lines.push("Hi Genezisi! I'd like to order a Digital Business Card.");
    lines.push("");
    pushDigitalCardOrderHeader(lines, state, "en");
    lines.push(`Sector: ${sectorLabel(state.sectorId, "en")}`);
    lines.push(`Name / firm: ${state.name || "—"}`);
    lines.push(`Title: ${state.title || "—"}`);
    lines.push(`Phone: ${state.phone || "—"}`);
    lines.push(`Email: ${state.email || "—"}`);
    lines.push("");
    lines.push("Service areas:");
    lines.push(servicesBlock(state, "en"));
    lines.push("");
    lines.push(`Practice heading: ${state.practiceHeading || "—"}`);
    lines.push(`Address: ${state.address || "—"}`);
    lines.push(`Hours: ${state.hours || "—"}`);
    lines.push("");
    lines.push("Social:");
    lines.push(`Facebook: ${state.social.facebook || "—"}`);
    lines.push(`Instagram: ${state.social.instagram || "—"}`);
    lines.push(`LinkedIn: ${state.social.linkedin || "—"}`);
    lines.push(`TikTok: ${state.social.tiktok || "—"}`);
    lines.push(`YouTube: ${state.social.youtube || "—"}`);
    state.social.extra.forEach((e, i) => {
      if (e.url.trim()) lines.push(`${e.label || `Link ${i + 1}`}: ${e.url}`);
    });
    lines.push("");
    lines.push(styleSummary(state, "en"));
    lines.push(
      "Second language: professional translation (+150 GEL) — separate from Digital Card setup/hosting; confirm with Genezisi.",
    );
    lines.push(`Google Maps: ${state.addGoogleMap ? "Yes (free)" : "No"}`);
    lines.push("");
    lines.push(
      "Professional Georgian translation requested (+150 GEL). Please translate the following content into Georgian.",
    );
    lines.push("");
    lines.push("My photo is ready to send!");
  } else {
    lines.push("Hi Genezisi! I'd like to order a Digital Business Card.");
    lines.push("");
    pushDigitalCardOrderHeader(lines, state, "en");
    lines.push(`Sector: ${sectorLabel(state.sectorId, "en")}`);
    lines.push(`Name / firm: ${state.name || "—"}`);
    lines.push(`Title: ${state.title || "—"}`);
    lines.push(`Phone: ${state.phone || "—"}`);
    lines.push(`Email: ${state.email || "—"}`);
    lines.push("");
    lines.push("Service areas:");
    lines.push(servicesBlock(state, "en"));
    lines.push("");
    lines.push(`Practice heading: ${state.practiceHeading || "—"}`);
    lines.push(`Address: ${state.address || "—"}`);
    lines.push(`Hours: ${state.hours || "—"}`);
    lines.push("");
    lines.push("Social:");
    lines.push(`Facebook: ${state.social.facebook || "—"}`);
    lines.push(`Instagram: ${state.social.instagram || "—"}`);
    lines.push(`LinkedIn: ${state.social.linkedin || "—"}`);
    lines.push(`TikTok: ${state.social.tiktok || "—"}`);
    lines.push(`YouTube: ${state.social.youtube || "—"}`);
    state.social.extra.forEach((e, i) => {
      if (e.url.trim()) lines.push(`${e.label || `Link ${i + 1}`}: ${e.url}`);
    });
    lines.push("");
    lines.push(styleSummary(state, "en"));
    lines.push("Primary language: English");
    lines.push(`Google Maps: ${state.addGoogleMap ? "Yes (free)" : "No"}`);
    lines.push("");
    lines.push("My photo is ready to send!");
  }

  const message = lines.join("\n");
  const phone = normalizeWaDigits();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
