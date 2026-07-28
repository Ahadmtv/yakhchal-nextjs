import type { MetadataRoute } from "next";
import { features } from "@/data/features";
import { articles } from "@/data/articles";
import { siteConfig } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/features`, changeFrequency: "monthly", priority: .8 },
    { url: `${base}/calories`, changeFrequency: "monthly", priority: .9 },
    { url: `${base}/articles`, changeFrequency: "weekly", priority: .8 },
    ...features.map(f => ({ url: `${base}/features/${f.slug}`, changeFrequency: "monthly" as const, priority: .7 })),
    ...articles.map(a => ({ url: `${base}/articles/${a.slug}`, lastModified: a.modifiedAt || a.publishedAt, changeFrequency: "monthly" as const, priority: .7 }))
  ];
}
