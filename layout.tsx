import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import MiaChat from "@/components/MiaChat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Atlantis Teaser – The Mythic Digital City",
  description: "A mythic teaser portal for the coming Atlantis digital civilization. Meet Mia, explore realms, feel the prophecy.",
  openGraph: {
    title: "Atlantis Teaser – The Mythic Digital City",
    description: "A mythic teaser portal for the coming Atlantis digital civilization. Meet Mia, explore realms, feel the prophecy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased bg-[#0a0f15] text-[#e5e7eb] min-h-screen`}
      >
        {children}
        <MiaChat />
      </body>
    </html>
  );
}
