/** localStorage / sessionStorage for Digital Card `/start` overlay (separate from lane1 customizer snapshot). */

export const DC_OVERLAY_ENTERED_KEY = "genezisi_dc_customizer_entered_v1";
const DC_SESSION_WELCOME_TOAST_KEY = "genezisi_dc_welcome_toast_session_v1";

export function readCustomizerEntered(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(DC_OVERLAY_ENTERED_KEY) === "1";
}

export function writeCustomizerEntered(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DC_OVERLAY_ENTERED_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function readWelcomeToastShownThisSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(DC_SESSION_WELCOME_TOAST_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeWelcomeToastShownThisSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(DC_SESSION_WELCOME_TOAST_KEY, "1");
  } catch {
    /* ignore */
  }
}
