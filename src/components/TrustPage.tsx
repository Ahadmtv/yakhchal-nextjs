import Link from "next/link";
import type { ReactNode } from "react";

type TrustPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  showToc?: boolean;
  updatedAt?: { dateTime: string; label: string };
  sections: ReadonlyArray<{ id?: string; heading: string; body: ReactNode }>;
};

export default function TrustPage({ eyebrow, title, intro, showToc = false, updatedAt, sections }: Readonly<TrustPageProps>) {
  return <article className="detail-page trust-page"><div className="container container-article">
    <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><span aria-current="page">{title}</span></nav>
    <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="detail-lead">{intro}</p>
    {updatedAt && <p className="trust-updated">آخرین به‌روزرسانی: <time dateTime={updatedAt.dateTime}>{updatedAt.label}</time></p>}
    {showToc && <nav className="trust-toc" aria-label="فهرست مطالب"><strong>در این صفحه</strong><ol>{sections.filter((section) => section.id).map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol></nav>}
    <div className="trust-content">{sections.map((section) => <section id={section.id} key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</div>
  </div></article>;
}
