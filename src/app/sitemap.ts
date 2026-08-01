import type { MetadataRoute } from "next";
import { features } from "@/data/features";
import { articles } from "@/data/articles";
import { siteConfig } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/features`, changeFrequency: "monthly", priority: .8 },
    { url: `${base}/features/weekly-meal-planner`, changeFrequency: "monthly", priority: .9 },
    { url: `${base}/calories`, changeFrequency: "monthly", priority: .9 },
    { url: `${base}/articles`, changeFrequency: "weekly", priority: .8 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: .4 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: .3 },
    ...features.filter((feature) => feature.slug !== "weekly-meal-planner").map((feature) => ({ url: `${base}/features/${feature.slug}`, changeFrequency: "monthly" as const, priority: .7 })),
    ...articles.map((article) => ({ url: `${base}/articles/${article.slug}`, ...(article.modifiedAt || article.publishedAt ? { lastModified: article.modifiedAt || article.publishedAt } : {}), changeFrequency: "monthly" as const, priority: .7 })),
  ];
}
