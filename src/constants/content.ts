/**
 * Shared content constants for the Architect Studio.
 * Centralizes marketing copy and animation descriptions
 * to prevent duplication across ConfigDrawer and ModuleItem.
 */

export const ANIMATION_OVERRIDES: Record<string, { whatItIs: string; howItHelps: string }> = {
  landing: {
    whatItIs:
      "Targeted kinetic prompts and high-performance button triggers. We engineer 'flicker-free' hover states and magnetic lead-magnet animations that subconsciously draw the visitor's eye toward your primary Call to Action (CTA).",
    howItHelps:
      "It kills 'Banner Blindness.' By adding subtle, high-end motion to your 'Buy' or 'Sign Up' buttons, we increase the probability of a click by up to 30%. These animations act as a silent salesperson, guiding the user's gaze through your sales narrative and ensuring they don't miss the most important part: the conversion.",
  },
  cms: {
    whatItIs:
      "Seamless layout transitions and 'Elite-Tier' UI responses. We use advanced physics-based libraries to create fluid scroll-reveals and magnetic cursor interactions that make your brand identity feel expensive, stable, and world-class.",
    howItHelps:
      "The '0.1% Authority' Signal. High-ticket clients decide whether they trust you in the first 3 seconds. By making your site respond with 'Apple-level' fluidity, you signal that your business is meticulous and modern. It increases 'Dwell Time' and justifies premium pricing by making your digital infrastructure feel like a high-end physical office.",
  },
  ecomm: {
    whatItIs:
      "Tactile product interactions and 'Satisfying' feedback loops. We engineer smooth product image morphs, instant 'Add to Cart' visual confirmations, and elegant cart-drawer reveals that provide the same sensory satisfaction as a physical luxury shopping trip.",
    howItHelps:
      "It reduces 'Buyer's Friction.' Friction is what makes people abandon carts. By making the shopping experience feel lightweight and responsive, we remove the technical lag that kills impulse buys. It makes browsing your catalog a joy rather than a chore, directly increasing your 'Average Order Value' (AOV).",
  },
};

/** WhatsApp intake number used across bespoke components */
export const WHATSAPP_INTAKE = "32475608743";

/** Default message for WhatsApp links */
export const WHATSAPP_DEFAULT_MESSAGE = "Hi Genezisi! I'm interested in discussing an architectural blueprint for my project. Can we talk?";

/** Loading phrase templates for the analyzing overlay */
export function buildLoadingPhrases(params: {
  company: string;
  name: string;
  foundationName: string;
  dominantColor: string;
}): string[] {
  const { company, name, foundationName, dominantColor } = params;
  return [
    `Securing nodes for ${company || "your company"}...`,
    `Linking blueprint to ${name || "you"}...`,
    `Analyzing ${foundationName || "Foundation"} infrastructure nodes...`,
    `Validating ${dominantColor} palette against conversion psychology...`,
    `Calculating server edge distribution for local nodes...`,
    `Finalizing your architecture brief...`,
  ];
}
