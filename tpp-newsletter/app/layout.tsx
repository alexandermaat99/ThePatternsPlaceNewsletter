import { Space_Grotesk } from "next/font/google";
import { Metadata } from "next";
import { metaData } from "@/constants";

import "./globals.css";

// Metadata including the favicon
export const metadata: Metadata = {
  ...metaData,
  icons: {
    icon: "/favicon.ico", // Path to your favicon
  },
};

// Load Google Font: Space Grotesk
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
