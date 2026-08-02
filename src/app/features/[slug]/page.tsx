import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FeatureDetail from "@/components/FeatureDetail";
import { features } from "@/data/features";
import { serializeJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return features.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = features.find((item) => item.slug === slug);

  if (!feature) {
    return { title: "ویژگی یافت نشد", robots: { index: false, follow: false } };
  }

  const canonical = `/features/${slug}`;
  const title = feature.title;
  const description = feature.description;
  return {
    title,
    description,
    alternates: { canonical, languages: { "fa-IR": canonical } },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      locale: "fa_IR",
      title,
      description,
      images: [{ url: feature.mainImage, width: 1200, height: 630, alt: feature.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [feature.mainImage],
    },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = features.find((item) => item.slug === slug);
  if (!feature) notFound();

  const featureUrl = `${siteConfig.url}/features/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: feature.title,
    description: feature.description,
    image: feature.mainImage,
    url: featureUrl,
    inLanguage: "fa-IR",
    isPartOf: { "@type": "WebSite", name: "یخچال", url: siteConfig.url },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "امکانات",
        item: `${siteConfig.url}/features`,
      },
      { "@type": "ListItem", position: 3, name: feature.title, item: featureUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: feature.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <FeatureDetail feature={feature} />
    </>
  );
}
