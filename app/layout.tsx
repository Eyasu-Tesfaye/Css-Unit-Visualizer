import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://csscope.vercel.app"),
  title: "CSScope — Interactive CSS Unit Visualizer",
  description:
    "An interactive educational tool built to help developers master CSS units (rem, em, vw, vh, %, px) in real-time.",
  keywords: [
    "CSS units",
    "CSScope",
    "rem vs px",
    "viewport units",
    "web development tool",
    "frontend visualizer",
    "CSS learning",
  ],
  authors: [{ name: "Eyasu Tesfaye" }],
  creator: "Eyasu Tesfaye",
  publisher: "CSScope",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://csscope.vercel.app",
    siteName: "CSScope",
    title: "CSScope — Interactive CSS Unit Visualizer",
    description:
      "Master CSS units instantly with real-time visual rendering and precise conversion formulas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSScope — Interactive CSS Unit Visualizer",
    description:
      "Master CSS units instantly with real-time visual rendering and precise conversion formulas.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
