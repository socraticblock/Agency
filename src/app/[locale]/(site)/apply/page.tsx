import { permanentRedirect } from "next/navigation";

/** The former website audit application now directs to bespoke scoping. */
export default async function LegacyApplicationRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale === "ka" ? "ka" : "en";
  permanentRedirect(`/${locale}/pricing`);
}
