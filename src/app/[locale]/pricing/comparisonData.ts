import { FOUNDATIONS } from "@/constants/pricing";
import type { Locale } from "@/lib/i18n";

export interface ComparisonRow {
  label: string;
  values: string[];
}

export function getComparisonData(_locale: Locale): ComparisonRow[] {
  const pro = FOUNDATIONS.find((f) => f.id === "cms")!;
  const cc = FOUNDATIONS.find((f) => f.id === "saas")!;
  const ec = FOUNDATIONS.find((f) => f.id === "ecomm")!;

  return [
    {
      label: "Starting Price",
      values: [
        `${pro.priceGEL.toLocaleString()} ₾`,
        `${cc.priceGEL.toLocaleString()} ₾`,
        `from ${ec.priceGEL.toLocaleString()} ₾`,
      ],
    },
    {
      label: "Warranty",
      values: [`${pro.warrantyDays}d`, `${cc.warrantyDays}d`, `${ec.warrantyDays}d`],
    },
    {
      label: "Delivery",
      values: ["7-10 days", "10-15 days", "20-30 days"],
    },
    {
      label: "Pages",
      values: ["6 sections", "4 pages", "5 pages"],
    },
    {
      label: "Revision Rounds",
      values: ["2", "3", "4"],
    },
    {
      label: "SSL",
      values: ["✓", "✓", "✓"],
    },
    {
      label: "Responsive",
      values: ["✓", "✓", "✓"],
    },
    {
      label: "Custom Animations",
      values: ["✓", "✓", "✓"],
    },
    {
      label: "Source Code Ownership",
      values: ["✓", "✓", "✓"],
    },
    {
      label: "Analytics",
      values: ["✓", "✓", "✓"],
    },
    {
      label: "Advanced Contact Forms",
      values: ["✓", "✓", "—"],
    },
    {
      label: "CMS",
      values: ["—", "✓", "✓"],
    },
    {
      label: "Dashboard",
      values: ["—", "✓", "✓"],
    },
    {
      label: "Business Cockpit",
      values: ["—", "—", "✓"],
    },
    {
      label: "E-Commerce",
      values: ["—", "—", "✓"],
    },
    {
      label: "Payment Processing",
      values: ["—", "—", "— (₾500+ add-on)"],
    },
    {
      label: "Inventory Mgmt",
      values: ["—", "—", "✓"],
    },
    {
      label: "Multi-Language",
      values: ["Add-on", "Add-on", "Add-on"],
    },
    {
      label: "Priority Support",
      values: ["—", "✓", "✓"],
    },
  ];
}
