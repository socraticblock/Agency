import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { ServiceSeoPage } from "../_components/ServiceSeoPage";

export const metadata: Metadata = {
  title: "Booking Website Design in Tbilisi | Genezisi",
  description:
    "Custom booking websites for studios, clinics, coaches, beauty businesses, and appointment-based local services in Georgia.",
};

export default async function BookingWebsitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "ka" ? "ka" : "en") as Locale;

  return (
    <ServiceSeoPage
      locale={lang}
      eyebrow="Booking website design"
      title="Booking websites that make it easier for customers to choose a time and show up."
      intro="For appointment-based businesses, the website should remove hesitation: explain the offer, build trust, and make the next step obvious."
      bullets={[
        "Clear service and schedule presentation",
        "Booking or inquiry flow connected to your preferred tools",
        "WhatsApp-first calls to action",
        "Mobile-first layout for customers on the move",
        "Analytics so you can see what people click",
      ]}
      bestFor={[
        "Pilates and yoga studios",
        "Clinics and therapists",
        "Beauty salons",
        "Coaches and consultants",
        "Private lessons",
        "Local appointment services",
      ]}
      sections={[
        {
          title: "Reduce booking friction",
          body: "The page guides visitors from interest to action without making them hunt through Instagram posts or message threads.",
        },
        {
          title: "Show the experience",
          body: "Strong visuals, service structure, and trust signals help customers feel confident before they contact you.",
        },
        {
          title: "Connect the tools",
          body: "Forms, WhatsApp, calendars, deposits, and analytics can be added based on how your business actually runs.",
        },
      ]}
    />
  );
}
