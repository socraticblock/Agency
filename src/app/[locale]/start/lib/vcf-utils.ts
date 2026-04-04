import type { Lane1CustomizerState } from "./types";

/**
 * Generates a vCard (VCF) string from the customizer state.
 * Handles photo encoding if present.
 */
export function generateVCard(state: Lane1CustomizerState, lang: "primary" | "secondary"): string {
  const isSecondary = lang === "secondary" && state.secondaryMode === "self";
  
  const name = isSecondary ? state.nameSecondary : state.name;
  const title = isSecondary ? state.titleSecondary : state.title;
  const address = isSecondary ? state.addressSecondary : state.address;
  const org = isSecondary ? state.practiceHeadingSecondary : state.practiceHeading;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `N:;${name};;;`,
    `ORG:${org}`,
    `TITLE:${title}`,
    `TEL;TYPE=CELL:${state.phone}`,
    `EMAIL:${state.email}`,
    `ADR;TYPE=WORK:;;${address};;;;`,
  ];

  if (state.photoDataUrl && state.photoDataUrl.includes("base64,")) {
    const base64Data = state.photoDataUrl.split("base64,")[1];
    // vCard 3.0 uses PHOTO;TYPE=JPEG;ENCODING=b:
    lines.push(`PHOTO;TYPE=JPEG;ENCODING=b:${base64Data}`);
  }

  lines.push("END:VCARD");

  return lines.join("\r\n");
}

/**
 * Triggers a download of the VCF file in the browser.
 */
export function downloadVCF(state: Lane1CustomizerState, lang: "primary" | "secondary") {
  const vcard = generateVCard(state, lang);
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  const fileName = `${state.name.replace(/\s+/g, "_") || "contact"}.vcf`;
  
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
