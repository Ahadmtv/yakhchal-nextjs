import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { Feature } from "@/data/features";

export default function FeatureDetail({ feature }: Readonly<{ feature: Feature }>) {
  return (
    <article className="detail-page feature-detail">
      <div className="container container-article">
        <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/features">امکانات</Link><span>/</span><span aria-current="page">{feature.title}</span></nav>
        <div className="feature-page-hero">
          <div className="feature-page-copy">
            <p className="eyebrow">ویژگی یخچال</p>
            <h1>{feature.title}</h1>
            <p className="detail-lead">{feature.description}</p>
            <div className="detail-tags">{feature.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            <div className="feature-page-actions">
              <Link className="button button-primary" href="/download" data-analytics-event="click_feature_install_cta" data-analytics-feature={feature.slug} data-analytics-source="feature_hero"><Icon name="download" />نصب رایگان یخچال</Link>
              <Link className="button button-outline" href="/features">همه امکانات</Link>
            </div>
          </div>
          {feature.mockupImage && feature.imageAlt ? (
            <figure className="feature-real-preview feature-page-visual">
              <span className="feature-visual-badge"><Icon name="sparkle" />نمای واقعی اپلیکیشن</span>
              <Image
                src={feature.mockupImage}
                alt={feature.imageAlt}
                width={feature.imageWidth}
                height={feature.imageHeight}
                preload
                quality={85}
                sizes="(max-width: 699px) calc(100vw - 54px), 420px"
              />
              <figcaption>تصویر واقعی از {feature.shortTitle} در اپلیکیشن یخچال.</figcaption>
            </figure>
          ) : (
            <aside className="feature-image-pending" aria-label="وضعیت تصویر قابلیت">
              <Icon name="sparkle" />
              <strong>اسکرین‌شات این قابلیت در دسترس نیست</strong>
              <p>تا زمان دریافت تصویر مرتبط، هیچ نمای عمومی یا ساختگی به‌جای آن نمایش داده نمی‌شود.</p>
            </aside>
          )}
        </div>

        <section className="feature-problem-solution" aria-label="مسئله و راه‌حل">
          <article><span>مسئله</span><h2>چرا این قابلیت لازم است؟</h2><p>{feature.problem}</p></article>
          <article><span>راه‌حل</span><h2>یخچال چه کمکی می‌کند؟</h2><p>{feature.solution}</p></article>
        </section>

        <section className="feature-explanation" aria-labelledby="feature-explanation-title">
          <h2 id="feature-explanation-title">این قابلیت در عمل</h2><p>{feature.longDescription}</p>
          <ul>{feature.highlights.map((highlight) => <li key={highlight}><Icon name="check" />{highlight}</li>)}</ul>
        </section>

        <section className="feature-steps-section" aria-labelledby="feature-steps-title">
          <p className="eyebrow">شروع ساده</p><h2 id="feature-steps-title">مراحل استفاده</h2>
          <ol>{feature.steps.map((step, index) => <li key={step.title}><span>{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        </section>

        <section className="feature-use-cases" aria-labelledby="feature-use-cases-title">
          <h2 id="feature-use-cases-title">کاربردهای عملی</h2>
          <ul>{feature.useCases.map((useCase) => <li key={useCase}><Icon name="sparkle" />{useCase}</li>)}</ul>
        </section>

        <section className="feature-faq" aria-labelledby="feature-faq-title">
          <h2 id="feature-faq-title">سؤالات متداول</h2>
          <div className="faq-list">{feature.faqs.map((item) => <details className="faq-item" key={item.question} data-analytics-event="open_faq" data-analytics-source={`feature_${feature.slug}`}><summary><span>{item.question}</span><i aria-hidden="true"><Icon name="add" /></i></summary><p>{item.answer}</p></details>)}</div>
        </section>

        <aside className="feature-install-cta"><div><p className="eyebrow">آماده شروع هستید؟</p><h2>{feature.shortTitle} را در یخچال تجربه کنید</h2><p>نسخه اندروید از مایکت و کافه‌بازار در دسترس است.</p></div><Link className="button button-primary button-large" href="/download" data-analytics-event="click_feature_install_cta" data-analytics-feature={feature.slug} data-analytics-source="feature_footer"><Icon name="download" />رفتن به صفحه دانلود</Link></aside>

        <nav className="related-features" aria-label="قابلیت‌های مرتبط"><h2>قابلیت‌های مرتبط</h2><div>{feature.relatedSlugs.map((slug) => <Link key={slug} href={`/features/${slug}`}>{slug === "meal-planner" ? "برنامه غذای هفته" : slug === "smart-shopping-list" ? "لیست خرید هوشمند" : slug === "fridge-inventory" ? "مدیریت موجودی" : slug === "expiry-reminder" ? "یادآور انقضا" : slug === "recipes-by-ingredients" ? "غذا با مواد موجود" : slug}<Icon name="arrow" /></Link>)}</div></nav>
      </div>
    </article>
  );
}
