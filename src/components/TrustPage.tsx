import Link from "next/link";
import type { ReactNode } from "react";

type TrustPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt?: { dateTime: string; label: string };
  sections: ReadonlyArray<{ heading: string; body: ReactNode }>;
};

export default function TrustPage({ eyebrow, title, intro, updatedAt, sections }: Readonly<TrustPageProps>) {
  return <article className="detail-page trust-page"><div className="container container-article">
    <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><span aria-current="page">{title}</span></nav>
    <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="detail-lead">{intro}</p>
    {updatedAt && <p className="trust-updated">آخرین به‌روزرسانی: <time dateTime={updatedAt.dateTime}>{updatedAt.label}</time></p>}
    <div className="trust-content">{sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</div>
  </div></article>;
}
