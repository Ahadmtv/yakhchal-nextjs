import Image from "next/image";
import Link from "next/link";
import type { Feature } from "@/data/features";

const questions = [
  ["آیا برنامه‌ریز با هدف کالری کار می‌کند؟", "بله. این قابلیت برای چیدن وعده‌ها در کنار هدف کالری طراحی شده است؛ مقدار و ترکیب هر وعده را پیش از خرید مرور کنید."],
  ["چطور مواد برنامه را به لیست خرید اضافه کنم؟", "مواد لازم برنامه را در اپ به لیست خرید اضافه کنید تا خرید هفته از برنامه جدا نماند."],
  ["آیا می‌توان برنامه را تغییر داد؟", "بله. وعده‌ها را در تقویم جابه‌جا کنید یا برای روزهای دیگر دوباره بچینید."],
] as const;

export default function WeeklyMealPlannerLanding({ feature }: Readonly<{ feature: Feature }>) {
  return (
    <article className="detail-page planner-landing">
      <div className="container container-article">
        <nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/features">امکانات</Link><span>/</span><span aria-current="page">برنامه‌ریز هفتگی غذا</span></nav>
        <p className="eyebrow">برنامه‌ریزی وعده‌ها</p>
        <h1>اپلیکیشن برنامه غذایی هفتگی یخچال</h1>
        <p className="detail-lead">وعده‌های هفته را یک‌جا ببینید، آن‌ها را با هدف کالری خود هماهنگ کنید و مواد لازم را برای خرید آماده نگه دارید.</p>
        <div className="planner-actions"><Link className="button button-primary" href="/#download">دریافت برنامه</Link><Link className="button button-outline" href="/features/smart-shopping-list">مشاهده لیست خرید هوشمند</Link></div>
        <div className="feature-detail-grid">
          <div className="feature-detail-copy"><p>{feature.longDescription}</p><ul>{feature.highlights?.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>
          {feature.mockupImage && feature.imageAlt ? <div className="feature-mockup-wrap"><div className="feature-mockup"><Image src={feature.mockupImage} alt={feature.imageAlt} fill preload quality={85} sizes="(max-width: 599px) 230px, (max-width: 899px) 280px, 320px" /></div></div> : null}
        </div>
        <div className="planner-content">
          <section id="weekly-plan"><h2>برنامه غذایی هفتگی چیست؟</h2><p><strong>برنامه غذایی هفتگی، نمایی از وعده‌های چند روز آینده است.</strong> به‌جای تصمیم‌گیری لحظه‌ای، صبحانه، ناهار و شام را پیش از شروع هفته کنار هم می‌چینید تا انتخاب و خرید ساده‌تر شود.</p><p>این روش کمک می‌کند بدانید چه مواد اولیه‌ای لازم است و برای هر روز چه گزینه‌ای در نظر دارید؛ بدون آن‌که لازم باشد همه‌چیز را روی کاغذ یادداشت کنید.</p></section>
          <section id="how-it-works"><h2>برنامه‌ریز یخچال چگونه کار می‌کند؟</h2><p><strong>وعده‌ها را روی تقویم هفتگی می‌چینید و در صورت نیاز جابه‌جا می‌کنید.</strong> برنامه‌ریز برای دیدن ترتیب وعده‌ها، مرور برنامه و آماده‌کردن خرید در یک جریان واحد طراحی شده است.</p></section>
          <section id="calorie-goal"><h2>تنظیم وعده‌ها بر اساس هدف کالری</h2><p><strong>هدف کالری، یک مرجع برای مرور انتخاب‌های هفته است.</strong> هنگام برنامه‌ریزی می‌توانید وعده‌ها را در کنار هدف خود بررسی کنید و برای محاسبه وزن غذا از <Link href="/calories">محاسبه‌گر کالری غذاهای ایرانی</Link> کمک بگیرید.</p></section>
          <section id="shopping-link"><h2>اتصال برنامه غذایی به لیست خرید</h2><p><strong>مواد لازم برنامه را مستقیماً به لیست خرید اضافه کنید.</strong> این اتصال، فاصله میان تصمیم‌گیری و خرید را کوتاه می‌کند. جزئیات <Link href="/features/smart-shopping-list">لیست خرید هوشمند یخچال</Link> را هم ببینید.</p></section>
          <section id="weekly-example"><h2>نمونه نمایشی یک برنامه هفتگی</h2><p><strong>یک نمونه ساده می‌تواند شامل وعده‌های آشنا در روزهای مختلف باشد.</strong> برای مثال، شنبه یک غذای آماده‌شدنی سریع، یک‌شنبه وعده‌ای با مواد باقی‌مانده و روز دیگر غذایی که مواد آن از قبل در لیست خرید آمده است. برنامه را مطابق سلیقه و شرایط خودتان تنظیم کنید.</p></section>
          <section><h2>مزایای برنامه‌ریزی غذایی</h2><ul><li>تصمیم‌گیری درباره وعده‌ها پیش از زمان گرسنگی</li><li>مرور مواد لازم پیش از خرید</li><li>هماهنگی بهتر میان برنامه غذا و هدف کالری</li></ul></section>
          <section><h2>مناسب چه افرادی است؟</h2><p><strong>این قابلیت برای هر کسی که می‌خواهد وعده‌های هفته را منظم‌تر ببیند مناسب است.</strong> خانواده‌ها، افراد پرمشغله و کسانی که می‌خواهند خریدشان با برنامه غذا هماهنگ باشد، می‌توانند از آن استفاده کنند.</p></section>
          <section><h2>برنامه‌ریزی داخل اپ یا روش دستی؟</h2><div className="content-table-wrap"><table><thead><tr><th>موضوع</th><th>داخل اپ</th><th>روش دستی</th></tr></thead><tbody><tr><td>مرور وعده‌ها</td><td>تقویم هفتگی</td><td>یادداشت پراکنده</td></tr><tr><td>خرید مواد</td><td>متصل به لیست خرید</td><td>نیاز به انتقال دستی</td></tr><tr><td>تغییر برنامه</td><td>جابه‌جایی وعده‌ها</td><td>بازنویسی یادداشت</td></tr></tbody></table></div></section>
          <section><h2>سؤالات متداول</h2>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
        </div>
      </div>
    </article>
  );
}
