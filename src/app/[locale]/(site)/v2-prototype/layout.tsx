import { Noto_Sans_Georgian } from "next/font/google";

const v2Georgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export default function V2PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={v2Georgian.variable}>{children}</div>;
}
