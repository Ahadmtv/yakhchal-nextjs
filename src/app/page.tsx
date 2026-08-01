import Hero from "@/components/Hero";
import type { Metadata } from "next";
import FeaturesSection from "@/components/FeaturesSection";
import SmartFridgeStory from "@/components/smart-fridge-story/SmartFridgeStory";
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

export const metadata: Metadata = {
  title: "یخچال | Yakhchal، برنامه‌ریزی غذا و کالری",
  description: siteConfig.description,
  alternates: { canonical: "/", languages: { "fa-IR": "/" } },
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
  name: "یخچال",
  alternateName: "Yakhchal",
  url: siteConfig.url,
  logo: assets.icon512,
  email: siteConfig.email,
  sameAs: ["https://instagram.com/yakhchal.app", "https://www.linkedin.com/company/yakhchal"],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "یخچال",
  applicationCategory: "HealthApplication",
  operatingSystem: "Android",
  offers: { "@type": "Offer", price: "0", priceCurrency: "IRR" },
  description: siteConfig.description,
  url: siteConfig.url,
  image: assets.og,
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
      <LazyBMICalculator />
      <DownloadSection />
      <ArticlesSection />
      <ContactSection />
      <FaqSection />
      <PrivacyPolicy />
    </>
  );
}
