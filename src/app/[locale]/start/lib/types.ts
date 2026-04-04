export type PrimaryLang = "ka" | "en";
export type SecondaryLangMode = "none" | "self" | "pro";
export type SectorId = "lawyers" | "realestate" | "consultants" | "restaurants";

export type PhotoShape = "circle" | "rounded-square" | "wide-cinematic" | "full-bleed" | "none";
export type PhotoEffect = "none" | "bw" | "sepia" | "cool" | "high-contrast" | "soft-focus" | "vivid" | "duotone" | "film-grain" | "fade-to-white";
export type PhotoOverlay = "none" | "gradient-fade" | "color-tint" | "dark-vignette";
export type PhotoBorder = "none" | "thin-ring" | "thick-ring" | "glow-ring" | "double-frame" | "gradient-border";

export type BackgroundType = "solid" | "linear" | "radial" | "mesh" | "image";
export type TextureId = "none" | "fine-grain" | "coarse-grain" | "dot-grid" | "diagonal-lines" | "cross-hatch" | "waves" | "geometric" | "topographic";
export type BackgroundEffectId = "none" | "ambient-glow" | "floating-orbs" | "gradient-shift" | "vignette" | "light-leak";

export type TypographyPackId = "classic" | "modern" | "editorial" | "bold" | "minimal" | "warm" | "noir" | "elegant";
export type ButtonStyleId = "classic" | "outlined" | "ghost" | "sharp" | "luxury" | "minimal";

export type SectionId = "about" | "services" | "testimonials" | "gallery" | "awards" | "hours" | "video" | "booking";

export type SocialIconStyle = "filled" | "outlined" | "rounded" | "minimal";
export type SocialIconSize = "small" | "medium" | "large";
export type SocialIconColorMode = "accent" | "text" | "custom";

export type QrStyle = "square" | "rounded" | "dots";

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

  // Phase 3: Background
  bgType: BackgroundType;
  bgColor1: string;
  bgColor2: string;
  bgAngle: number;
  bgImage: string | null;
  bgBlur: number;
  bgOverlayOpacity: number;
  textureId: TextureId;
  textureOpacity: number;
  bgEffectId: BackgroundEffectId;

  // Phase 4: Typography & Buttons
  typographyPackId: TypographyPackId;
  buttonStyleId: ButtonStyleId;
}

export const CUSTOMIZER_VERSION = 3 as const;

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
  photoDataUrl: string | null;
  proTranslationAcknowledged: boolean;

  // Phase 4.4: Custom CTA Text
  ctaTextCall: string;
  ctaTextWhatsApp: string;

  // Phase 6: Sections
  activeSections: SectionId[];
  sectionOrder: SectionId[];

  // Phase 7: Social & QR
  socialIconStyle: SocialIconStyle;
  socialIconSize: SocialIconSize;
  socialIconColorMode: SocialIconColorMode;
  showSocialLabels: boolean;
  qrStyle: QrStyle;
  showQrOnCard: boolean;
  qrForegroundColor: string;
  qrBackgroundColor: string;
  showQrLogo: boolean;
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
    title: "Your Title",
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
      textColorId: "black",
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

      // Phase 3 Defaults
      bgType: "solid",
      bgColor1: "#ffffff",
      bgColor2: "#f8fafc",
      bgAngle: 180,
      bgImage: null,
      bgBlur: 0,
      bgOverlayOpacity: 0,
      textureId: "none",
      textureOpacity: 5,
      bgEffectId: "none",

      // Phase 4 Defaults
      typographyPackId: "minimal",
      buttonStyleId: "minimal",
    },
    
    addGoogleMap: true,
    photoDataUrl: "/premium_profile_placeholder.png", // Corrected path to generated asset
    proTranslationAcknowledged: false,
    ctaTextCall: "Call Me",
    ctaTextWhatsApp: "WhatsApp Me",
    activeSections: ["services"],
    sectionOrder: ["about", "services", "testimonials", "gallery", "awards", "hours", "video", "booking"],
    socialIconStyle: "minimal",
    socialIconSize: "medium",
    socialIconColorMode: "accent",
    showSocialLabels: false,
    qrStyle: "rounded",
    showQrOnCard: true,
    qrForegroundColor: "#000000",
    qrBackgroundColor: "#ffffff",
    showQrLogo: true,
  };
}
