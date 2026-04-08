export type PrimaryLang = "ka" | "en";
export type SecondaryLangMode = "none" | "self" | "pro";
export type SectorId = "lawyers" | "realestate" | "consultants" | "restaurants";

export type PhotoShape = "circle" | "rounded-square" | "wide-cinematic" | "full-bleed" | "none";
export type PhotoEffect = "none" | "bw" | "sepia" | "cool" | "high-contrast" | "soft-focus" | "vivid" | "duotone" | "film-grain" | "fade-to-white";
export type PhotoOverlay = "none" | "gradient-fade" | "color-tint" | "dark-vignette";
export type PhotoBorder = "none" | "thin-ring" | "thick-ring" | "glow-ring" | "double-frame" | "gradient-border";

export type BackgroundBaseType = "solid" | "image";
export type BackgroundOverlayType = "none" | "solid" | "linear" | "radial" | "mesh";
export type TextureId = "none" | "fine-grain" | "coarse-grain" | "dot-grid" | "diagonal-lines" | "cross-hatch" | "waves" | "geometric" | "topographic";
export type BackgroundEffectId = "none" | "ambient-glow" | "floating-orbs" | "gradient-shift" | "vignette" | "light-leak";

export type TypographyPackId = "classic" | "modern" | "editorial" | "bold" | "minimal" | "warm" | "noir" | "elegant";
export type ButtonStyleId = "classic" | "outlined" | "ghost" | "sharp" | "luxury" | "minimal";

export type SectionId = "about" | "testimonials" | "gallery" | "awards" | "video" | "booking" | "services";

export type SocialIconStyle = "filled" | "outlined" | "rounded" | "minimal";
export type SocialIconSize = "small" | "medium" | "large";
export type SocialIconColorMode = "accent" | "text" | "custom";
export type SocialPlatformId = "facebook" | "instagram" | "linkedin" | "tiktok" | "youtube";

export type QrStyle = "square" | "rounded" | "dots";

export type CardHoverEffectId = "none" | "lift" | "glow" | "scale";

export type CardShadowId = "none" | "soft" | "elevated" | "luxury";

export interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
}

export interface AwardItem {
  title: string;
  issuer: string;
}

export interface SocialLinksState {
  facebook: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  youtube: string;
  extra: { label: string; url: string }[];
}

export interface StylePresetSelection {
  backgroundId: string;
  textColorId: string;
  accentId: string;
  fontId: string;
  vibeId: string;
  animationId: string;
  secondaryAccentId: string;

  // Phase 2: Photo
  photoShape: PhotoShape;
  photoZoom: number;
  photoPositionX: number;
  photoPositionY: number;
  photoEffect: PhotoEffect;
  photoOverlay: PhotoOverlay;
  photoBorder: PhotoBorder;
  photoAlignment: "left" | "center";
  /** Subtle zoom/pan on hero photo (respects reduced motion). */
  photoKenBurns: boolean;

  // Phase 3: Background Layered System
  bgBaseId: BackgroundBaseType;
  bgBaseColor: string;
  bgBaseImageDataUrl: string | null;
  bgBaseBlur: number;
  bgOverlayId: BackgroundOverlayType;
  bgOverlayColor1: string;
  bgOverlayColor2: string;
  bgOverlayColor3: string;
  bgOverlayAngle: number;
  bgOverlayOpacity: number;
  textureId: TextureId;
  textureOpacity: number;
  bgEffectId: BackgroundEffectId;

  // Phase 4: Typography & Buttons
  typographyPackId: TypographyPackId;
  buttonStyleId: ButtonStyleId;

  /** 50 = slow, 100 = default, 150 = fast */
  animationSpeed: number;

  /** Dark card surface (visitor-facing preview). */
  cardDarkSurface: boolean;
  cardRadiusPx: number;
  cardShadowId: CardShadowId;
}

export const CUSTOMIZER_VERSION = 5 as const;

export interface Lane1CustomizerState {
  version: typeof CUSTOMIZER_VERSION;
  sectorId: SectorId | null;
  primaryLang: PrimaryLang;
  secondaryMode: SecondaryLangMode;
  name: string;
  nameSecondary: string;
  title: string;
  titleSecondary: string;
  company: string;
  tagline: string;
  taglineSecondary: string;
  phone: string;
  email: string;
  address: string;
  addressSecondary: string;
  hours: string;
  hoursSecondary: string;
  serviceAreas: [string, string, string, string];
  serviceDescriptions: [string, string, string, string];
  serviceCount: number;
  serviceAreasSecondary: [string, string, string, string];
  serviceDescriptionsSecondary: [string, string, string, string];
  social: SocialLinksState;
  practiceHeading: string;
  practiceHeadingSecondary: string;
  style: StylePresetSelection;
  addGoogleMap: boolean;
  showMapPreview: boolean;
  photoDataUrl: string | null;
  proTranslationAcknowledged: boolean;

  // Phase 4.4: Custom CTA Text
  ctaTextCall: string;
  ctaTextWhatsApp: string;

  // Phase 6: Sections
  activeSections: SectionId[];
  sectionOrder: SectionId[];
  aboutBio: string;
  aboutBioSecondary: string;
  testimonials: [TestimonialItem, TestimonialItem, TestimonialItem];
  galleryImageDataUrls: [string | null, string | null, string | null, string | null, string | null, string | null];
  awards: [AwardItem, AwardItem, AwardItem, AwardItem];
  videoUrl: string;
  bookingUrl: string;
  bookingLabel: string;

  // Counts
  testimonialCount: number;
  awardCount: number;
  galleryCount: number;

  // Phase 7: Social & QR
  activeSocialPlatforms: SocialPlatformId[];
  socialPlatformOrder: SocialPlatformId[];
  socialIconStyle: SocialIconStyle;
  socialIconSize: SocialIconSize;
  socialIconColorMode: SocialIconColorMode;
  showSocialLabels: boolean;
  qrStyle: QrStyle;
  showQrOnCard: boolean;
  qrForegroundColor: string;
  qrBackgroundColor: string;
  showQrLogo: boolean;

  /** Phase 5: tilt & hover (desktop-first; tilt uses responsive layout only). */
  cardTiltEnabled: boolean;
  /** Max tilt in degrees (3–12). */
  cardTiltMaxDeg: number;
  cardHoverEffectId: CardHoverEffectId;
}

export function defaultSocial(): SocialLinksState {
  return {
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
    youtube: "",
    extra: [],
  };
}

export function defaultLane1State(): Lane1CustomizerState {
  return {
    version: CUSTOMIZER_VERSION,
    sectorId: null,
    primaryLang: "en",
    secondaryMode: "none",

    // User requested placeholders
    name: "Your Name",
    nameSecondary: "თქვენი სახელი",
    title: "Job title",
    titleSecondary: "თქვენი პოზიცია",
    company: "Company Name",
    tagline: "Your tagline here",
    taglineSecondary: "თქვენი სლოგანი აქ",

    phone: "+995 5XX XX XX XX",
    email: "your@email.com",
    address: "123 Professional Ave, Tbilisi",
    addressSecondary: "პროფესიული გამზირი 123, თბილისი",
    hours: "Mon-Fri: 09:00 - 18:00",
    hoursSecondary: "ორშ-პარ: 09:00 - 18:00",

    serviceAreas: ["Service One", "Service Two", "Service Three", "Service Four"],
    serviceDescriptions: ["", "", "", ""],
    serviceCount: 2,
    serviceAreasSecondary: ["", "", "", ""],
    serviceDescriptionsSecondary: ["", "", "", ""],
    social: defaultSocial(),
    practiceHeading: "Professional Services",
    practiceHeadingSecondary: "პროფესიული სერვისები",

    style: {
      backgroundId: "minimal-white",
      textColorId: "ink",
      accentId: "indigo",
      secondaryAccentId: "slate",
      fontId: "modern",
      vibeId: "minimal",
      animationId: "fade",

      // Phase 2 Defaults
      photoShape: "circle",
      photoZoom: 100,
      photoPositionX: 50,
      photoPositionY: 50,
      photoEffect: "none",
      photoOverlay: "none",
      photoBorder: "none",
      photoAlignment: "left",
      photoKenBurns: false,

      // Phase 3 Defaults (Layered)
      bgBaseId: "solid",
      bgBaseColor: "#ffffff",
      bgBaseImageDataUrl: null,
      bgBaseBlur: 0,
      bgOverlayId: "none",
      bgOverlayColor1: "#1A2744",
      bgOverlayColor2: "#2D3F5E",
      bgOverlayColor3: "#C5A55A",
      bgOverlayAngle: 180,
      bgOverlayOpacity: 0.5,
      textureId: "none",
      textureOpacity: 5,
      bgEffectId: "none",

      // Phase 4 Defaults
      typographyPackId: "minimal",
      buttonStyleId: "minimal",
      animationSpeed: 100,
      cardDarkSurface: false,
      cardRadiusPx: 24,
      cardShadowId: "soft",
    },

    addGoogleMap: true,
    showMapPreview: true,
    photoDataUrl: "/premium_profile_placeholder.png", // Corrected path to generated asset
    proTranslationAcknowledged: false,
    ctaTextCall: "Call Me",
    ctaTextWhatsApp: "WhatsApp Me",
    activeSections: ["services"],
    sectionOrder: ["about", "services", "testimonials", "gallery", "awards", "video", "booking"],
    aboutBio: "",
    aboutBioSecondary: "",
    testimonials: [
      { quote: "", name: "", title: "" },
      { quote: "", name: "", title: "" },
      { quote: "", name: "", title: "" },
    ],
    galleryImageDataUrls: [null, null, null, null, null, null],
    awards: [
      { title: "", issuer: "" },
      { title: "", issuer: "" },
      { title: "", issuer: "" },
      { title: "", issuer: "" },
    ],
    videoUrl: "",
    bookingUrl: "",
    bookingLabel: "Book a Consultation",
    testimonialCount: 2,
    awardCount: 2,
    galleryCount: 3,
    socialIconStyle: "minimal",
    socialIconSize: "medium",
    socialIconColorMode: "accent",
    activeSocialPlatforms: ["facebook", "instagram", "linkedin", "tiktok", "youtube"],
    socialPlatformOrder: ["facebook", "instagram", "linkedin", "tiktok", "youtube"],
    showSocialLabels: false,
    qrStyle: "rounded",
    showQrOnCard: true,
    qrForegroundColor: "#000000",
    qrBackgroundColor: "#ffffff",
    showQrLogo: true,
    cardTiltEnabled: true,
    cardTiltMaxDeg: 7,
    cardHoverEffectId: "lift",
  };
}
