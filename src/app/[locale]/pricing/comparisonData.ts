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
      values: [pro.deliveryTimeline ?? "7-10 days", cc.deliveryTimeline ?? "10-15 days", ec.deliveryTimeline ?? "20+ days"],
    },
    {
      label: "Pages",
      values: [
        "6 sections",
        "4 pages (Home, About, Contact, Blog)",
        "5 pages included",
      ],
    },
    {
      label: "Hosting (Card)",
      values: ["50 ₾/yr", "50 ₾/yr", "120 ₾/yr"],
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
      label: "CMS",
      values: ["—", "✓", "✓"],
    },
    {
      label: "Dashboard",
      values: ["—", "✓", "✓"],
    },
    {
      label: "Multi-Language",
      values: ["—", "—", "✓"],
    },
    {
      label: "E-Commerce",
      values: ["—", "—", "✓"],
    },
    {
      label: "Payment Processing",
      values: ["—", "—", "✓"],
    },
    {
      label: "Inventory Mgmt",
      values: ["—", "—", "✓"],
    },
    {
      label: "Priority Support",
      values: ["—", "✓", "✓"],
    },
    {
      label: "Shield (Yearly)",
      values: [
        "120 ₾/yr",
        "500 ₾/yr",
        "1,500 ₾/yr",
      ],
    },
  ];
}
