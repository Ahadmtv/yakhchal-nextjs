import type { Metadata } from "next";
import FeaturesSection from "@/components/FeaturesSection";
import { assets } from "@/lib/assets";

const title = "امکانات اپلیکیشن";
const description =
  "آشنایی با برنامه‌ریز هفتگی، دستورپخت گام‌به‌گام، لیست خرید هوشمند و دیگر امکانات اپلیکیشن یخچال.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/features", languages: { "fa-IR": "/features" } },
  openGraph: {
    type: "website",
    url: "/features",
    title,
    description,
    images: [{ url: assets.featureRecipes, width: 900, height: 681, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [assets.featureRecipes] },
};

export default function FeaturesPage() {
  return <FeaturesSection standalone />;
}
