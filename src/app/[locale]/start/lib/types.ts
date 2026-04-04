export type PrimaryLang = "ka" | "en";

/** Second language: none | client translates | professional translation */
export type SecondaryLangMode = "none" | "self" | "pro";

export type SectorId = "lawyers" | "realestate" | "consultants" | "restaurants";

export interface SocialLinksState {
  facebook: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  youtube: string;
  /** Dynamic extra rows */
  extra: { label: string; url: string }[];
}

export interface StylePresetSelection {
  backgroundId: string;
  textColorId: string;
  accentId: string;
  fontId: string;
}

export const CUSTOMIZER_VERSION = 2 as const;

export interface Lane1CustomizerState {
  version: typeof CUSTOMIZER_VERSION;
  sectorId: SectorId | null;
  primaryLang: PrimaryLang;
  secondaryMode: SecondaryLangMode;
  /** When secondaryMode is self, parallel fields for second language */
  name: string;
  nameSecondary: string;
  title: string;
  titleSecondary: string;
  phone: string;
  email: string;
  address: string;
  addressSecondary: string;
  hours: string;
  hoursSecondary: string;
  serviceAreas: [string, string, string, string];
  /** How many service rows are active (1–4) */
  serviceCount: number;
  serviceAreasSecondary: [string, string, string, string];
  social: SocialLinksState;
  practiceHeading: string;
  practiceHeadingSecondary: string;
  style: StylePresetSelection;
  addGoogleMap: boolean;
  /** Base64 data URL or null before upload */
  photoDataUrl: string | null;
  /** Professional translation flow — §2.4 */
  proTranslationAcknowledged: boolean;
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
    name: "",
    nameSecondary: "",
    title: "",
    titleSecondary: "",
    phone: "+995 ",
    email: "",
    address: "",
    addressSecondary: "",
    hours: "",
    hoursSecondary: "",
    serviceAreas: ["", "", "", ""],
    serviceCount: 3,
    serviceAreasSecondary: ["", "", "", ""],
    social: defaultSocial(),
    practiceHeading: "",
    practiceHeadingSecondary: "",
    style: {
      backgroundId: "warmcream",
      textColorId: "ink",
      accentId: "navy",
      fontId: "modern",
    },
    addGoogleMap: false,
    photoDataUrl: null,
    proTranslationAcknowledged: false,
  };
}
