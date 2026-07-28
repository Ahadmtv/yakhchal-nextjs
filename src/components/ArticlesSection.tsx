import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import { articles, type Article } from "@/data/articles";

function readTime(article: Article): number {
  const words = article.sections.flatMap((section) => `${section.heading} ${section.body}`.split(/\s+/)).length;
  return Math.max(3, Math.round(words / 180));
}

function articleDate(article: Article): string {
  if (!article.publishedAt) return "";
  return new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "long" }).format(new Date(article.publishedAt));
}

export default function ArticlesSection({ standalone = false }: Readonly<{ standalone?: boolean }>) {
  return (
    <section className="articles-section deferred-section" id="articles" aria-labelledby="articles-title">
      <div className="container">
        <div className="articles-heading-row">
          <SectionHeading
            eyebrow="مجله یخچال"
            title={<span id="articles-title">دانش کاربردی برای انتخاب‌های بهتر</span>}
            description="مقاله‌های کوتاه و کاربردی درباره تغذیه، کاهش وزن و عادت‌هایی که می‌توانند واقعاً ادامه‌دار باشند."
            level={standalone ? 1 : 2}
          />
          {!standalone && <Link className="text-link" href="/articles">مشاهده همه مقاله‌ها<Icon name="arrow" /></Link>}
        </div>
        <div className="articles-grid">
          {articles.map((article, index) => (
            <article className="article-card" key={article.slug}>
              <Link className="article-image" href={`/articles/${article.slug}`} aria-label={`مطالعه ${article.title}`}>
                <Image
                  src={article.imageSmall ?? article.image}
                  alt={article.title}
                  fill
                  preload={standalone && index === 0}
                  quality={75}
                  sizes="(max-width: 699px) calc(100vw - 32px), (max-width: 1099px) 50vw, 370px"
                />
              </Link>
              <div className="article-card-content">
                <div className="article-meta"><span><Icon name="clock" />{readTime(article)} دقیقه</span><time dateTime={article.publishedAt}>{articleDate(article)}</time></div>
                <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.excerpt}</p>
                <div className="article-card-footer">
                  <div>{article.tags?.slice(0, 2).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                  <Link className="round-link" href={`/articles/${article.slug}`} aria-label={`مطالعه ${article.title}`}><Icon name="arrow" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
