import { permanentRedirect } from "next/navigation";

/** Superseded fixed-price tier; consolidated into bespoke project scoping. */
export default async function FormerPackage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  permanentRedirect(`/${locale === "ka" ? "ka" : "en"}/pricing`);
}
