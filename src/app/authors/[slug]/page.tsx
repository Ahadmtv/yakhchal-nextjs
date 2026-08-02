import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Author profiles remain unpublished until a real name, biography, and editorial role are verified.
export const dynamicParams = false;
export function generateStaticParams(): { slug: string }[] { return []; }
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function AuthorPage() { notFound(); }
