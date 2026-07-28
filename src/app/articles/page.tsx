import type { Metadata } from "next";
import ArticlesSection from "@/components/ArticlesSection";
import { assets } from "@/lib/assets";

const title = "مجله سلامت و تغذیه";
const description =
  "مقاله‌های کاربردی یخچال درباره تغذیه سالم، کاهش وزن پایدار و برنامه‌ریزی غذایی.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/articles", languages: { "fa-IR": "/articles" } },
  openGraph: {
    type: "website",
    url: "/articles",
    title,
    description,
    images: [{ url: assets.article1, width: 900, height: 681, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [assets.article1] },
};

export default function ArticlesPage() {
  return <ArticlesSection standalone />;
}
