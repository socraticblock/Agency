import type { Metadata } from "next";

const PARTNER_TITLE = "Become a Genezisi Partner | Sales Partner Program in Georgia";
const PARTNER_DESCRIPTION =
  "Join a limited group of Georgian sales partners earning 30% commission and recurring income by connecting local businesses with premium digital solutions.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PARTNER_TITLE,
    description: PARTNER_DESCRIPTION,
    openGraph: {
      title: PARTNER_TITLE,
      description: PARTNER_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: PARTNER_TITLE,
      description: PARTNER_DESCRIPTION,
    },
  };
}

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
