import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { Article } from "@/data/articles";
import { articles } from "@/data/articles";

function readTime(article: Article): number {
  const wordCount = article.sections.map((section) => `${section.heading} ${section.body}`).join(" ").split(/\s+/).length;
  return Math.max(2, Math.round(wordCount / 180));
}

export default function ArticleDetail({ article }: Readonly<{ article: Article }>) {
  const publishedDate = article.publishedAt
    ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(new Date(article.publishedAt))
    : null;

  return (
    <article className="detail-page article-detail">
      <div className="container container-article">
        <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/articles">مقالات</Link><span>/</span><span aria-current="page">{article.title}</span></nav>
        <h1>{article.title}</h1>
        <div className="detail-meta">
          {article.author && <span>{article.author}</span>}
          {publishedDate && <time dateTime={article.publishedAt}>{publishedDate}</time>}
          <span><Icon name="clock" />{readTime(article)} دقیقه مطالعه</span>
          {article.tags?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <div className="detail-cover">
          <Image src={article.image} alt={article.title} fill preload quality={85} sizes="(max-width: 899px) calc(100vw - 32px), 900px" />
        </div>
        <div className="article-body">
          {article.sections.map((section, index) => (
            <section key={section.id ?? `${article.slug}-${index}`} id={section.id ?? `sec-${index}`}>
              <h2>{section.heading}</h2><p>{section.body}</p>
            </section>
          ))}
        </div>
        <aside className="related-content" aria-labelledby="related-title">
          <h2 id="related-title">مطالب مرتبط</h2>
          <div>{articles.filter((item) => item.slug !== article.slug).map((item) => <Link className="tag tag-link" key={item.slug} href={`/articles/${item.slug}`}>{item.title}</Link>)}</div>
        </aside>
      </div>
    </article>
  );
}
