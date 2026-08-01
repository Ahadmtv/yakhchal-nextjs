import type { Metadata } from "next";
import { notFound } from "next/navigation";

// TODO: Publish only foods with verified source, review date, serving data, and distinct editorial copy.
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
