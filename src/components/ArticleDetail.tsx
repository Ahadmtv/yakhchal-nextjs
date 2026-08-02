import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { articles, type Article, type ArticleSection } from "@/data/articles";
import { siteConfig } from "@/lib/site";

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
  const articleUrl = `${siteConfig.url}/articles/${article.slug}`;
  const shareText = encodeURIComponent(article.title);
  const shareUrl = encodeURIComponent(articleUrl);
  const splitIndex = Math.max(1, Math.ceil(article.sections.length / 2));
  const firstSections = article.sections.slice(0, splitIndex);
  const lastSections = article.sections.slice(splitIndex);

  return <article className="detail-page article-detail"><div className="container container-article">
    <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/articles">مقالات</Link><span>/</span><span aria-current="page">{article.title}</span></nav>
    <h1>{article.title}</h1>
    {article.intro && <p className="detail-lead">{article.intro}</p>}
    <div className="detail-meta">
      <span className="tag">{article.category}</span>
      {article.author && <Link href={(article.author.url ?? `/authors/${article.author.slug}`) as Route}>نویسنده: {article.author.name}</Link>}
      {publishedDate && <time dateTime={article.publishedAt}>انتشار: {publishedDate}</time>}
      {modifiedDate && <time dateTime={article.modifiedAt}>آخرین بروزرسانی: {modifiedDate}</time>}
      <span><Icon name="clock" />{readTime(article)} دقیقه مطالعه</span>
      {article.tags?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
    </div>
    <div className="detail-cover"><Image src={article.image} alt={article.title} fill preload quality={85} sizes="(max-width: 899px) calc(100vw - 32px), 900px" /></div>
    <nav className="article-toc" aria-labelledby="article-toc-title">
      <h2 id="article-toc-title">در این مقاله</h2>
      <ol>{article.sections.map((section, index) => {
        const anchor = section.id ?? section.heading.replace(/\s+/g, "-");
        return <li key={anchor}><a href={`#${anchor}`}>{index + 1}. {section.heading}</a></li>;
      })}</ol>
    </nav>
    <div className="article-body">
      {firstSections.map((section, index) => <ArticleSectionContent key={section.id ?? index} section={section} />)}
      <aside className="article-product-cta" aria-label="برنامه‌ریزی با یخچال">
        <div><strong>برنامه هفته را از مواد موجود شروع کنید</strong><p>یخچال، برنامه غذایی و فهرست خرید را در یک مسیر ساده کنار هم می‌گذارد.</p></div>
        <Link className="btn btn-primary" href="/download" data-analytics-event="click_article_install_cta" data-analytics-article={article.slug}>دریافت یخچال</Link>
      </aside>
      {lastSections.map((section, index) => <ArticleSectionContent key={section.id ?? index + splitIndex} section={section} />)}
    </div>
    {article.reviewer && <aside className="article-review">بازبین علمی: <Link href={(article.reviewer.url ?? `/authors/${article.reviewer.slug}`) as Route}>{article.reviewer.name}</Link></aside>}
    {article.faq?.length ? <section className="article-faq" aria-labelledby="article-faq-title"><h2 id="article-faq-title">پرسش‌های رایج</h2>{article.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section> : null}
    {article.sources?.length ? <section className="article-sources" aria-labelledby="sources-title"><h2 id="sources-title">منابع و تاریخ بررسی</h2>{modifiedDate && <p>پیوندها و محتوای این مطلب در {modifiedDate} بررسی شده‌اند.</p>}<ol>{article.sources.map((source) => <li key={source.url}><a href={source.url} rel="noopener noreferrer" target="_blank">{source.title}<span className="sr-only"> (در پنجره جدید)</span></a></li>)}</ol></section> : null}
    <section className="article-share" aria-labelledby="share-title">
      <h2 id="share-title">اشتراک‌گذاری مقاله</h2>
      <div>
        <a className="btn btn-secondary" href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer">تلگرام<span className="sr-only"> (در پنجره جدید)</span></a>
        <a className="btn btn-secondary" href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer">واتس‌اپ<span className="sr-only"> (در پنجره جدید)</span></a>
        <a className="btn btn-secondary" href={`mailto:?subject=${shareText}&body=${shareUrl}`}>ایمیل</a>
      </div>
    </section>
    {relatedArticles.length ? <aside className="related-content" aria-labelledby="related-title"><h2 id="related-title">مطالب مرتبط</h2><div>{relatedArticles.map((item) => <Link className="tag tag-link" key={item.slug} href={`/articles/${item.slug}`}>{item.title}</Link>)}</div></aside> : null}
    <aside className="article-end-cta"><strong>برای برنامه‌ریزی آماده‌اید؟</strong><Link className="text-link" href="/features/meal-planner" data-analytics-event="click_article_install_cta" data-analytics-article={`${article.slug}:end`}>ببینید برنامه‌ریز هفتگی چطور کار می‌کند <Icon name="arrow" /></Link></aside>
  </div></article>;
}
