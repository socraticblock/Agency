import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { ServiceSeoPage } from "../_components/ServiceSeoPage";

export const metadata: Metadata = {
  title: "Premium Website Design in Georgia | Genezisi",
  description:
    "Founder-led premium website design and development for Georgian businesses that need a serious online presence, clear packages, and fast delivery.",
};

export default async function WebsitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "ka" ? "ka" : "en") as Locale;

  return (
    <ServiceSeoPage
      locale={lang}
      eyebrow="Website design in Georgia"
      title="Premium websites for businesses that need to look serious online."
      intro="Genezisi builds custom websites for local businesses, studios, clinics, coaches, consultants, shops, and service providers who want customers to trust them faster."
      bullets={[
        "Custom responsive design",
        "Fast Next.js development",
        "WhatsApp, booking, forms, analytics, or CMS integrations",
        "SEO-ready pages, metadata, schema, and sitemap",
        "Founder-led communication from first call to handover",
      ]}
      bestFor={[
        "Local service businesses",
        "Clinics and wellness studios",
        "Professional consultants",
        "Restaurants and hospitality",
        "Boutique shops",
        "Personal brands",
      ]}
      sections={[
        {
          title: "Clear positioning",
          body: "Your website should explain what you do, who it is for, and why someone should trust you within seconds.",
        },
        {
          title: "Premium visual system",
          body: "I design around your business category, not a recycled template, so the site feels credible and specific.",
        },
        {
          title: "Built to convert",
          body: "Every page is structured around action: WhatsApp, calls, bookings, forms, payments, or product purchases.",
        },
      ]}
    />
  );
}
