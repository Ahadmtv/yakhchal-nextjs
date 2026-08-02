import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "vazirmatn/Vazirmatn-Variable-font-face.css";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { assets } from "@/lib/assets";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s | یخچال" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/", languages: { "fa-IR": "/" } },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: assets.og, width: 1200, height: 630, alt: "اپلیکیشن مدیریت تغذیه یخچال" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [assets.og],
  },
  icons: {
    icon: [{ url: assets.favicon32, sizes: "32x32", type: "image/png" }],
    apple: [{ url: assets.appleTouch, sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "lifestyle",
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#081510" },
  ],
};

const bootstrapScript = `(()=>{document.documentElement.dataset.js="true";try{const k="yakhchal:theme";let t=localStorage.getItem(k);if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch{}})()`;



export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
