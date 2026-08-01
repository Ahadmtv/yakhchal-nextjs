import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { articles, type Article, type ArticleSection } from "@/data/articles";

function readTime(article: Article): number {
  const text = article.sections.flatMap((section) => [section.heading, section.summary ?? section.body ?? "", ...(section.paragraphs ?? []), ...(section.list ?? [])]).join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 180));
}

function formatDate(value?: string) {
  return value ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(new Date(value)) : null;
}

function ArticleSectionContent({ section }: Readonly<{ section: ArticleSection }>) {
  const Heading = section.level === 3 ? "h3" : "h2";
  const anchor = section.id ?? section.heading.replace(/\s+/g, "-");
  return <section id={anchor} className="article-section">
    <Heading><a href={`#${anchor}`}>{section.heading}</a></Heading>
    {section.summary && <p className="article-answer"><strong>{section.summary}</strong></p>}
    {section.body && <p>{section.body}</p>}
    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
    {section.table && <div className="content-table-wrap"><table><thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row.join("-")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>}
    {section.callout && <aside className="article-callout">{section.callout}</aside>}
    {section.links?.length ? <p className="article-links">{section.links.map((link) => <Link key={link.href} href={link.href as Route}>{link.label}</Link>)}</p> : null}
  </section>;
}

export default function ArticleDetail({ article }: Readonly<{ article: Article }>) {
  const publishedDate = formatDate(article.publishedAt);
  const modifiedDate = formatDate(article.modifiedAt);
  const relatedArticles = (article.relatedSlugs ?? []).flatMap((slug) => articles.filter((item) => item.slug === slug)).slice(0, 5);

  return <article className="detail-page article-detail"><div className="container container-article">
    <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/articles">مقالات</Link><span>/</span><span aria-current="page">{article.title}</span></nav>
    <h1>{article.title}</h1>
    {article.intro && <p className="detail-lead">{article.intro}</p>}
    <div className="detail-meta">
      {article.author && <Link href={(article.author.url ?? `/authors/${article.author.slug}`) as Route}>نویسنده: {article.author.name}</Link>}
      {publishedDate && <time dateTime={article.publishedAt}>انتشار: {publishedDate}</time>}
      {modifiedDate && <time dateTime={article.modifiedAt}>آخرین بروزرسانی: {modifiedDate}</time>}
      <span><Icon name="clock" />{readTime(article)} دقیقه مطالعه</span>
      {article.tags?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
    </div>
    <div className="detail-cover"><Image src={article.image} alt={article.title} fill preload quality={85} sizes="(max-width: 899px) calc(100vw - 32px), 900px" /></div>
    <div className="article-body">{article.sections.map((section, index) => <ArticleSectionContent key={section.id ?? index} section={section} />)}</div>
    {article.reviewer && <aside className="article-review">بازبین علمی: <Link href={(article.reviewer.url ?? `/authors/${article.reviewer.slug}`) as Route}>{article.reviewer.name}</Link></aside>}
    {article.sources?.length ? <section className="article-sources" aria-labelledby="sources-title"><h2 id="sources-title">منابع</h2><ol>{article.sources.map((source) => <li key={source.url}><a href={source.url} rel="noopener noreferrer" target="_blank">{source.title}</a></li>)}</ol></section> : null}
    {relatedArticles.length ? <aside className="related-content" aria-labelledby="related-title"><h2 id="related-title">مطالب مرتبط</h2><div>{relatedArticles.map((item) => <Link className="tag tag-link" key={item.slug} href={`/articles/${item.slug}`}>{item.title}</Link>)}</div></aside> : null}
  </div></article>;
}
