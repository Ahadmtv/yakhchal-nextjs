import Link from "next/link";

type TrustPageProps = { eyebrow: string; title: string; intro: string; sections: { heading: string; body: string }[]; noindex?: boolean };

export default function TrustPage({ eyebrow, title, intro, sections }: Readonly<TrustPageProps>) {
  return <article className="detail-page trust-page"><div className="container container-article">
    <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><span aria-current="page">{title}</span></nav>
    <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="detail-lead">{intro}</p>
    <div className="trust-content">{sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</div>
  </div></article>;
}
