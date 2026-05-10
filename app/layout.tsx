import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import "@/app/globals.css";
import { appConfig } from "@/lib/config";

const displayFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"]
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.siteUrl),
  title: "Big Wiss Matcha | Dearborn Premium Pop-Up",
  description:
    "Big Wiss Matcha is a founder-led premium matcha pop-up in Dearborn, Michigan, built for event catering, activations, and standout guest experiences.",
  keywords: [
    "Big Wiss Matcha",
    "Dearborn matcha pop-up",
    "matcha catering Dearborn",
    "event matcha bar Michigan"
  ],
  openGraph: {
    title: "Big Wiss Matcha | Dearborn Premium Pop-Up",
    description:
      "Founder-led premium matcha pop-up for weddings, private events, corporate activations, and community gatherings in Michigan.",
    url: appConfig.siteUrl,
    siteName: appConfig.siteName,
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Big Wiss Matcha — Dearborn Premium Matcha Pop-Up"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Wiss Matcha | Premium Event Matcha",
    description:
      "Book Big Wiss Matcha for premium, founder-led pop-up service in Dearborn and throughout Michigan.",
    images: ["/images/og-preview.jpg"]
  },
  icons: {
    icon: "/logo/logo-v2.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
