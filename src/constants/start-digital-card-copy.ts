/**
 * Customer-facing copy for Digital Card `/start` overlay and chrome.
 * Internal policies: docs/digital-card-product-internal.md
 */

import { WHATSAPP_INTAKE } from "./content";

export type StartDigitalCardOverlayView = "welcome" | "pricing" | "faq";

export const START_DC_BRAND = "GENEZISI";

export const START_DC_WELCOME = {
  headline: "Your Elite Digital Business Card",
  subtitle: "Premium design. Zero friction. Stand out from your peers.",
  priceLine: "From 150₾ setup + 120₾/yr hosting",
  stepDesignTitle: "DESIGN",
  stepDesignBody: "Live-edit your card on this page",
  stepOrderTitle: "ORDER",
  stepOrderBody: "Send your blueprint via WhatsApp",
  stepLiveTitle: "LIVE",
  stepLiveBody: "Go live within 3 working days",
  featureLiveUpdates: "Live Updates",
  featureSecure: "Secure Hosting",
  featureDomain: "Custom Domain",
  featureMobile: "Mobile Optimized",
  viewPricing: "View Pricing",
  viewFaq: "View FAQ",
  startBuilding: "Start Building",
  skip: "Not ready yet? Skip →",
} as const;

export const START_DC_PRICING = {
  title: "Choose Your Plan",
  hostingNote: "All plans: 120₾/year hosting · Includes security, speed & updates",
  back: "← Back",
  setupLabel: "setup",
  subdomainBadge: "Most affordable",
  executiveBadge: "VIP",
  tierSubdomain: "Subdomain",
  tierProfessional: "Professional",
  tierExecutive: "Executive",
  bulletSubdomain: [
    "genezisi.com/your-name",
    "2 major changes per year",
    "3–5 working day delivery",
    "WhatsApp support",
  ] as const,
  bulletProfessional: [
    "Your own .ge or .com domain",
    "Step-by-step PDF setup guide",
    "4 major changes per year",
    "3–5 working day delivery",
    "WhatsApp support",
  ] as const,
  bulletExecutive: [
    "We buy and manage your .ge domain (your name on registration)",
    "12 major changes per year",
    "Unlimited minor changes (VIP)",
    "Priority delivery queue",
    "Priority WhatsApp response",
  ] as const,
} as const;

export const START_DC_FAQ = {
  title: "Frequently Asked Questions",
  back: "← Back",
  loadMore: (remaining: number) => `+ ${remaining} more questions`,
  stillQuestions: "Still have questions?",
  whatsappCta: "WhatsApp Us",
  startBuilding: "Start Building",
} as const;

export const START_DC_CHROME = {
  pricingAria: "View pricing",
  faqAria: "View FAQ",
  closeOverlay: "Close",
} as const;

export const START_DC_TOAST = {
  message: "Welcome back",
} as const;

export const START_DC_ORDER_BLOCK = {
  urlHintLabel: "Preferred URL or subdomain (optional)",
  urlHintPlaceholder: "e.g. your-name or yourname.ge",
} as const;

/** Pre-filled WhatsApp for FAQ “still have questions”. */
export function startDigitalCardFaqWhatsAppHref(): string {
  const text = encodeURIComponent("Hi Genezisi! I have a question about the Digital Card.");
  return `https://wa.me/${WHATSAPP_INTAKE}?text=${text}`;
}
