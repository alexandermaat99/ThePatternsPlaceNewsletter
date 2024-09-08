import { Space_Grotesk } from "next/font/google";
import { Metadata } from "next";
import { metaData } from "@/constants";
import Head from "next/head";

import "./globals.css";

export const metadata: Metadata = metaData;

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
      <Head>
        <link rel="icon" href="favicon.ico" /> {/* Or your favicon path */}
      </Head>
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
