import Hero from "@/components/Hero";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
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
