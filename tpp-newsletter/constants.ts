import { Metadata } from "next";

export const socials = [
  {
    id: 1,
    name: "X",
    handle: "@patterns_place",
    url: "https://x.com/Patterns_Place",
  },
  {
    id: 2,
    name: "Instagram",
    handle: "@thepatternsplace",
    url: "https://www.instagram.com/thepatternsplace/",
  },
];

const title = "The Pattern's Place";
const description =
  "The Pattern's Place is a marketplace for sewists to buy and sell patterns with features like video tutorials, reviews, and community assigned difficulty levels.";
const image = "https://www.thepatternsplace.com/images/tppLogo.png";

export const metaData: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    url: "https://thepatternsplace.com",
    siteName: "The Pattern's Place",
    images: [{ url: image }],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: title,
    description: description,
    card: "summary_large_image",
    images: [image],
    creator: "@Patterns_Place",
  },
};
