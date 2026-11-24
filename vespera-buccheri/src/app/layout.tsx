import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Agentation } from "agentation";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Vespera Buccheri — One Pair. Different Needs.",
    template: "%s — Vespera Buccheri",
  },
  description:
    "Premium leather footwear dengan interchangeable insoles. Pre-order Batch 01 — designed in Jakarta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
