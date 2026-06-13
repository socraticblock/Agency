import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { ServiceSeoPage } from "../_components/ServiceSeoPage";

export const metadata: Metadata = {
  title: "Service Business Website Design | Genezisi",
  description:
    "Premium websites for consultants, agencies, legal services, coaches, clinics, and Georgian service businesses that need trust and leads.",
};

export default async function ServiceWebsitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "ka" ? "ka" : "en") as Locale;

  return (
    <ServiceSeoPage
      locale={lang}
      eyebrow="Service business websites"
      title="Service websites that explain your value clearly and make you look credible."
      intro="If your business sells expertise, trust is the product. Genezisi builds service websites that make your offer clear, serious, and easy to act on."
      bullets={[
        "Strong homepage or multi-page structure",
        "Service pages written around customer intent",
        "Professional trust sections and calls to action",
        "Contact, WhatsApp, and lead-capture flows",
        "SEO-ready structure for local search",
      ]}
      bestFor={[
        "Law firms and professional services",
        "Consultants",
        "Agencies",
        "Coaches",
        "Clinics",
        "Local service providers",
      ]}
      sections={[
        {
          title: "Explain the offer",
          body: "The structure makes it obvious what you do, who you help, and what the visitor should do next.",
        },
        {
          title: "Build trust quickly",
          body: "Premium design, clean copy, proof points, and a serious mobile experience help customers feel safe contacting you.",
        },
        {
          title: "Capture better leads",
          body: "The site can route visitors into WhatsApp, forms, booking, email, CRM, or whatever follow-up flow fits your business.",
        },
      ]}
    />
  );
}
