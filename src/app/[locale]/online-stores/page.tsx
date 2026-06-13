import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { ServiceSeoPage } from "../_components/ServiceSeoPage";

export const metadata: Metadata = {
  title: "Online Store Development in Georgia | Genezisi",
  description:
    "Custom online stores for Georgian businesses with product management, fast storefront UX, analytics, and local payment integration options.",
};

export default async function OnlineStoresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "ka" ? "ka" : "en") as Locale;

  return (
    <ServiceSeoPage
      locale={lang}
      eyebrow="Online store development"
      title="Online stores that feel premium, load fast, and make buying easier."
      intro="Genezisi builds custom commerce experiences for shops and product businesses that want a serious storefront instead of a generic rented template."
      bullets={[
        "Custom storefront design",
        "Product and service management",
        "Checkout and payment integration options",
        "Analytics and conversion tracking",
        "SEO-ready product and category structure",
      ]}
      bestFor={[
        "Boutique shops",
        "Product brands",
        "Wine and food businesses",
        "Jewelry and fashion",
        "Digital products",
        "Booking-commerce hybrids",
      ]}
      sections={[
        {
          title: "Sell with clarity",
          body: "Products, categories, benefits, and purchase steps are organized so customers understand what they are buying.",
        },
        {
          title: "Local integrations",
          body: "Payment, order, analytics, and operational integrations can be scoped around the Georgian market.",
        },
        {
          title: "Own the asset",
          body: "The store is built as your digital property, with source-code ownership and a roadmap for future growth.",
        },
      ]}
    />
  );
}
