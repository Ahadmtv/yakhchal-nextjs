import type { Metadata } from "next";
import { notFound } from "next/navigation";

// TODO: Add only verified author profiles with a real name, biography, and editorial role.
export const dynamicParams = false;
export function generateStaticParams(): { slug: string }[] { return []; }
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function AuthorPage() { notFound(); }
