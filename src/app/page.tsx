import Hero from "@/components/Hero";
import type { Metadata } from "next";
import FeaturesSection from "@/components/FeaturesSection";
import SmartFridgeStory from "@/components/smart-fridge-story/SmartFridgeStory";
import UseCasesSection from "@/components/UseCasesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProductUpdateSection from "@/components/ProductUpdateSection";
import LazyBMICalculator from "@/components/LazyBMICalculator";
import DownloadSection from "@/components/DownloadSection";
import ArticlesSection from "@/components/ArticlesSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { faqs } from "@/data/faqs";
import { serializeJsonLd } from "@/lib/jsonld";
import { assets } from "@/lib/assets";
import { siteConfig } from "@/lib/site";
import { latestVerifiedRelease, storeListings } from "@/data/appStats";

export const metadata: Metadata = {
  title: { absolute: "با مواد یخچال، برنامه غذایی هفته را بساز | یخچال" },
  description: siteConfig.description,
  alternates: { canonical: "/", languages: { "fa-IR": "/" } },
  openGraph: {
    type: "website",
    url: "/",
    locale: "fa_IR",
    siteName: siteConfig.name,
    title: "با مواد یخچال، برنامه غذایی هفته را بساز",
    description: siteConfig.description,
    images: [{ url: assets.og, width: 1200, height: 630, alt: "نمای اپلیکیشن یخچال" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "با مواد یخچال، برنامه غذایی هفته را بساز",
    description: siteConfig.description,
    images: [assets.og],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "یخچال",
  alternateName: "Yakhchal",
  url: siteConfig.url,
  inLanguage: "fa-IR",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "گروه یخچال",
  alternateName: "Yakhchal",
  url: siteConfig.url,
  logo: assets.icon512,
  email: siteConfig.email,
  sameAs: ["https://instagram.com/yakhchal.app", "https://www.linkedin.com/company/yakhchal"],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "یخچال",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Android",
  softwareVersion: latestVerifiedRelease.version,
  description: siteConfig.description,
  url: `${siteConfig.url}/download`,
  downloadUrl: storeListings[0].url,
  image: assets.og,
  featureList: [
    "برنامه‌ریزی وعده‌های هفتگی",
    "فهرست خرید",
    "ثبت موجودی و تاریخ انقضا",
    "پیشنهاد دستور غذا بر اساس موجودی",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <Hero />
      <SmartFridgeStory />
      <FeaturesSection />
      <UseCasesSection />
      <DownloadSection />
      <TestimonialsSection />
      <ProductUpdateSection />
      <LazyBMICalculator />
      <ArticlesSection />
      <ContactSection />
      <FaqSection />
      <PrivacyPolicy />
    </>
  );
}
