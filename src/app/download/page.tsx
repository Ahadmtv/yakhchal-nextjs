import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DownloadQrCode from "@/components/DownloadQrCode";
import Icon from "@/components/Icon";
import StoreButtons from "@/components/StoreButtons";
import { latestVerifiedRelease, storeListings } from "@/data/appStats";
import { assets } from "@/lib/assets";
import { serializeJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

const title = "دانلود اپلیکیشن یخچال برای اندروید";
const description = "دانلود رسمی اپلیکیشن یخچال از مایکت یا کافه‌بازار؛ همراه با نسخه، تاریخ انتشار، تغییرات اخیر و راهنمای نصب.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/download", languages: { "fa-IR": "/download" } },
  openGraph: {
    type: "website",
    url: "/download",
    locale: "fa_IR",
    siteName: siteConfig.name,
    title,
    description,
    images: [{ url: assets.og, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [assets.og] },
};

const downloadFaqs = [
  {
    question: "کدام فروشگاه را انتخاب کنم؟",
    answer: "فروشگاهی را انتخاب کنید که روی گوشی شما نصب است. نسخه و زمان به‌روزرسانی دو فروشگاه ممکن است یکسان نباشد.",
  },
  {
    question: "اگر دکمه نصب باز نشد چه کار کنم؟",
    answer: "اتصال اینترنت و نصب‌بودن فروشگاه را بررسی کنید، سپس لینک را در مرورگر دیگری باز کنید. می‌توانید نام «یخچال» و شناسه me.jfrpr.yakhchal را نیز در فروشگاه جست‌وجو کنید.",
  },
  {
    question: "آیا فایل APK مستقیم ارائه می‌شود؟",
    answer: "خیر. این وب‌سایت در حال حاضر فایل APK مستقیم منتشر نمی‌کند؛ برای دریافت نسخه قابل‌بررسی از لینک رسمی مایکت یا کافه‌بازار استفاده کنید.",
  },
  {
    question: "حداقل نسخه اندروید و مجوزها چیست؟",
    answer: "این اطلاعات در مخزن وب‌سایت ثبت نشده است. پیش از نصب، مشخصات و مجوزهای نمایش‌داده‌شده توسط فروشگاه و نسخه فعلی برنامه را بررسی کنید.",
  },
] as const;

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "یخچال",
  operatingSystem: "Android",
  applicationCategory: "LifestyleApplication",
  description,
  url: `${siteConfig.url}/download`,
  downloadUrl: storeListings[0].url,
  softwareVersion: "1.4.1",
  image: assets.og,
  publisher: { "@type": "Organization", name: "گروه یخچال", url: siteConfig.url },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: downloadFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function DownloadPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <article className="detail-page download-page">
        <div className="container">
          <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><span aria-current="page">دانلود</span></nav>
          <div className="download-page-hero">
            <div className="download-page-copy">
              <p className="eyebrow">نسخه رسمی اندروید</p>
              <h1>{title}</h1>
              <p className="detail-lead">از فروشگاه مورداعتماد خود نصب کنید و مواد خانه، پیشنهاد غذا، برنامه هفتگی و فهرست خرید را کنار هم نگه دارید.</p>
              <StoreButtons source="download_page_hero" />
              <p className="verified-note"><Icon name="check" />اطلاعات فروشگاه‌ها آخرین‌بار در <time dateTime={storeListings[0].verifiedAt}>{storeListings[0].verifiedAtLabel}</time> بررسی شده‌اند.</p>
            </div>
            <div className="download-page-visual">
              <Image src={assets.appPreview760} alt="نمای واقعی اپلیکیشن یخچال" width={760} height={1516} preload quality={85} sizes="(max-width: 699px) 230px, 300px" />
              <DownloadQrCode />
            </div>
          </div>

          <section className="store-facts" aria-labelledby="store-facts-title">
            <h2 id="store-facts-title">اطلاعات ثبت‌شده در فروشگاه‌ها</h2>
            <p>آمار هر فروشگاه جداگانه نمایش داده می‌شود و با فروشگاه دیگر جمع نشده است.</p>
            <div>
              {storeListings.map((store) => (
                <article key={store.id}>
                  <h3>{store.name}</h3>
                  <dl>
                    <div><dt>نسخه</dt><dd>{store.version}</dd></div>
                    <div><dt>انتشار</dt><dd>{store.releaseDate}</dd></div>
                    <div><dt>حجم</dt><dd>{store.size}</dd></div>
                    <div><dt>{store.metricLabel}</dt><dd>{store.metricValue}</dd></div>
                    <div><dt>امتیاز</dt><dd>{store.rating}؛ {store.ratingCount}</dd></div>
                  </dl>
                  <a className="text-link" href={store.url} target="_blank" rel="noopener noreferrer">مشاهده منبع<Icon name="external" /></a>
                </article>
              ))}
            </div>
          </section>

          <section className="release-notes" aria-labelledby="release-notes-title">
            <div><p className="eyebrow">تغییرات اخیر</p><h2 id="release-notes-title">نسخه {latestVerifiedRelease.version}</h2><p>{latestVerifiedRelease.date}، طبق توضیحات انتشار {latestVerifiedRelease.store}</p></div>
            <ul>{latestVerifiedRelease.changes.map((change) => <li key={change}><Icon name="check" />{change}</li>)}</ul>
          </section>

          <section className="install-help" aria-labelledby="install-help-title">
            <h2 id="install-help-title">راهنمای نصب و پرسش‌های متداول</h2>
            <div className="faq-list">
              {downloadFaqs.map((item) => (
                <details className="faq-item" key={item.question} data-analytics-event="open_faq" data-analytics-source="download_faq">
                  <summary><span>{item.question}</span><i aria-hidden="true"><Icon name="add" /></i></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <aside className="download-legal-note">
            <Icon name="shield" />
            <div><h2>پیش از نصب</h2><p>درباره داده‌های وب‌سایت و حدود استفاده از محتوای تغذیه‌ای، <Link href="/privacy">حریم خصوصی</Link> و <Link href="/terms">شرایط استفاده</Link> را بخوانید.</p></div>
          </aside>
        </div>
      </article>
    </>
  );
}
