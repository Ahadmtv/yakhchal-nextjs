import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Food detail pages remain unpublished until source, review date, serving data, and distinct editorial copy are verified.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return [];
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CalorieDetailPage() {
  notFound();
}
