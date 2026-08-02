import type { Metadata } from "next";
import CalorieCalculator from "@/components/CalorieCalculator";
import CalorieHelp, { calorieFaqs } from "@/components/CalorieHelp";
import CaloriesContentHub from "@/components/CaloriesContentHub";
import { assets } from "@/lib/assets";
import { serializeJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

const title = "کالری غذاهای ایرانی | محاسبه آنلاین";
const description =
  "محاسبه کالری غذاهای ایرانی بر اساس وزن؛ با جست‌وجوی سریع، جمع کل، نمودار و ذخیره در مرورگر.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/calories", languages: { "fa-IR": "/calories" } },
  openGraph: {
    type: "website",
    url: "/calories",
    title,
    description,
    images: [{ url: assets.og, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [assets.og] },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: calorieFaqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "کالری غذاهای ایرانی",
      item: `${siteConfig.url}/calories`,
    },
  ],
};

export default function CaloriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <CalorieCalculator />
      <div className="container calorie-help-wrap"><CalorieHelp /></div>
      <CaloriesContentHub />
    </>
  );
}
