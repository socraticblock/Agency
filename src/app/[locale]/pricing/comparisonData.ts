export type ComparisonRow = {
  feature: string;
  essential: string;
  professional: string;
  commandCenter: string;
  ecommerce: string;
  /** Which column gets subtle highlight (optional) */
  highlightCol?: "essential" | "professional" | "command" | "ecommerce";
};

export const PRICING_COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Price",
    essential: "999 ₾",
    professional: "2,299 ₾",
    commandCenter: "4,999 ₾",
    ecommerce: "17,999 ₾",
    highlightCol: "professional",
  },
  {
    feature: "Design approach",
    essential: "Template-based",
    professional: "100% custom",
    commandCenter: "100% custom",
    ecommerce: "100% custom",
  },
  {
    feature: "Pages included (typical)",
    essential: "1 landing",
    professional: "1 conversion site",
    commandCenter: "4+",
    ecommerce: "Store + templates",
  },
  {
    feature: "Blog / CMS",
    essential: "—",
    professional: "—",
    commandCenter: "Yes",
    ecommerce: "Yes",
  },
  {
    feature: "E-commerce",
    essential: "—",
    professional: "—",
    commandCenter: "Optional add-on path",
    ecommerce: "Full store build",
  },
  {
    feature: "Georgian payments (TBC / BOG)",
    essential: "—",
    professional: "—",
    commandCenter: "—",
    ecommerce: "Yes",
  },
  {
    feature: "RS.ge / e-receipt path",
    essential: "—",
    professional: "—",
    commandCenter: "—",
    ecommerce: "Yes (where applicable)",
  },
  {
    feature: "Revision rounds",
    essential: "1",
    professional: "2",
    commandCenter: "3",
    ecommerce: "4",
  },
  {
    feature: "Warranty",
    essential: "30 days",
    professional: "90 days",
    commandCenter: "90 days",
    ecommerce: "90 days",
  },
  {
    feature: "Delivery (typical)",
    essential: "7–10 business days",
    professional: "10–15 business days",
    commandCenter: "25–35 business days",
    ecommerce: "8–10 weeks",
  },
  {
    feature: "Source code ownership",
    essential: "Yes",
    professional: "Yes",
    commandCenter: "Yes",
    ecommerce: "Yes",
  },
];
