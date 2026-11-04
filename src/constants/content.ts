/**
 * Shared content for legacy enquiry components.
 * Never imply measured conversion improvements or a real AI analysis when
 * the corresponding system does not actually perform one.
 */
export const ANIMATION_OVERRIDES: Record<string, { whatItIs: string; howItHelps: string }> = {
  landing: {
    whatItIs: "Subtle motion can direct attention to important navigation and calls to action.",
    howItHelps: "Thoughtful feedback can make interactions easier to understand. The effect on customer behavior must be tested for each project.",
  },
  cms: {
    whatItIs: "Transitions help people understand changes in a content or dashboard interface.",
    howItHelps: "Consistent, accessible interaction can make a product easier to use. Animation should respect reduced-motion preferences.",
  },
  ecomm: {
    whatItIs: "Responsive feedback can clarify product selections, cart updates and checkout steps.",
    howItHelps: "Clear state changes can reduce confusion. Conversion and order-value effects cannot be promised without measurement.",
  },
};

/** Existing WhatsApp intake channel for bespoke project conversations. */
export const WHATSAPP_INTAKE = "995579723564";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello Genezisi, I'd like to discuss a project involving a website, AI system or automation.";

/**
 * These are presentation phrases, not results from a live audit or AI model.
 */
export function buildLoadingPhrases(params: {
  company: string;
  name: string;
  foundationName: string;
  dominantColor: string;
}): string[] {
  const { company, name, foundationName, dominantColor } = params;
  return [
    `Organizing details for ${company || "your business"}...`,
    `Preparing the project overview for ${name || "you"}...`,
    `Reviewing the information entered for ${foundationName || "your project"}...`,
    `Noting your preferred color ${dominantColor || "palette"}...`,
    "Preparing next-step suggestions...",
    "Ready for your review.",
  ];
}
