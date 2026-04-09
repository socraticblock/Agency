import type { Lane1CustomizerState } from "./types";

export type LanguagePreviewMode = {
  canToggle: boolean;
  fixedPreview: "primary" | "secondary" | null;
  showProfessionalNote: boolean;
};

export function getLanguagePreviewMode(state: Lane1CustomizerState): LanguagePreviewMode {
  if (state.profileLanguageMode === "en_only") {
    return { canToggle: false, fixedPreview: "primary", showProfessionalNote: false };
  }
  if (state.profileLanguageMode === "ka_only") {
    return { canToggle: false, fixedPreview: "secondary", showProfessionalNote: false };
  }
  if (state.translationMethod === "self") {
    return { canToggle: true, fixedPreview: null, showProfessionalNote: false };
  }
  if (state.translationMethod === "professional") {
    return {
      canToggle: false,
      fixedPreview: state.translationSourceLang === "ka" ? "secondary" : "primary",
      showProfessionalNote: true,
    };
  }
  return { canToggle: false, fixedPreview: "primary", showProfessionalNote: false };
}
