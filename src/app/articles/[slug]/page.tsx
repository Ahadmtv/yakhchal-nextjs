import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/ArticleDetail";
import { articles } from "@/data/articles";
import { assets } from "@/lib/assets";
import { serializeJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return { title: "مقاله یافت نشد", robots: { index: false, follow: false } };
  }

  const canonical = `/articles/${slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    authors: article.author ? [{ name: article.author.name, url: article.author.url ?? `/authors/${article.author.slug}` }] : undefined,
    alternates: { canonical, languages: { "fa-IR": canonical } },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: siteConfig.name,
      locale: "fa_IR",
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, width: 900, height: 681, alt: article.title }],
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      authors: article.author ? [article.author.name] : undefined,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const articleUrl = `${siteConfig.url}/articles/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    articleBody: article.sections.flatMap((section) => [section.summary ?? "", section.body ?? "", ...(section.paragraphs ?? []), ...(section.list ?? [])]).join("\n\n"),
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    inLanguage: "fa-IR",
    publisher: { "@type": "Organization", name: "یخچال", url: siteConfig.url, logo: { "@type": "ImageObject", url: assets.icon192 } },
    ...(article.author ? { author: { "@type": "Person", name: article.author.name, url: article.author.url ?? `${siteConfig.url}/authors/${article.author.slug}` } } : {}),
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(article.modifiedAt || article.publishedAt ? { dateModified: article.modifiedAt || article.publishedAt } : {}),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "مقالات",
        item: `${siteConfig.url}/articles`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />
      <ArticleDetail article={article} />
    </>
  );
}
