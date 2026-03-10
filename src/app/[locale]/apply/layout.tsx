import type { Metadata } from "next";

const APPLY_TITLE = "Apply for a Digital Audit | Kvali Digital";
const APPLY_DESCRIPTION =
  "Join an elite group of Georgian businesses utilizing high-performance revenue infrastructure.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APPLY_TITLE,
    description: APPLY_DESCRIPTION,
    openGraph: {
      title: APPLY_TITLE,
      description: APPLY_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: APPLY_TITLE,
      description: APPLY_DESCRIPTION,
    },
  };
}

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
