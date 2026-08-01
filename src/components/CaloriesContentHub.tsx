import type { Route } from "next";
import Link from "next/link";
import { iranianFoods } from "@/data/foods";

const categories = ["غلات", "خورش", "خوراک", "نان", "صبحانه"] as const;

export default function CaloriesContentHub() {
  return <section className="calorie-content-hub" aria-labelledby="calorie-hub-title"><div className="container container-article">
    <h2 id="calorie-hub-title">راهنمای کالری غذاهای ایرانی</h2>
    <p>اعداد ابزار بر اساس وزن غذا محاسبه می‌شوند. روش پخت، روغن، مواد افزوده و اندازه پرس می‌توانند نتیجه را تغییر دهند؛ این اعداد جایگزین ارزیابی تخصصی یا برچسب محصول نیستند.</p>
    <section><h3>روش محاسبه کالری</h3><p>کالری هر مورد برای ۱۰۰ گرم ثبت شده و ماشین‌حساب آن را متناسب با وزن واردشده محاسبه می‌کند. برای مقایسه وعده‌ها، وزن را تا حد ممکن با ترازو یا واحد مرسوم تخمین بزنید.</p></section>
    <section><h3>محبوب‌ترین غذاهای ایرانی</h3><ul className="food-reference-list">{iranianFoods.slice(0, 12).map((food) => <li key={food.id}><strong>{food.name}</strong><span>{food.caloriesPer100g} کالری در ۱۰۰ گرم</span></li>)}</ul></section>
    <section><h3>دسته‌بندی غذاها</h3><div className="food-category-grid">{categories.map((category) => <div key={category}><h4>{category}</h4><ul>{iranianFoods.filter((food) => food.category === category).slice(0, 6).map((food) => <li key={food.id}>{food.name}: {food.caloriesPer100g} کالری</li>)}</ul></div>)}</div></section>
    <section><h3>راهنمای وزن واحدهای مرسوم</h3><p>واحدهایی مانند کفگیر، قاشق یا سیخ اندازه ثابت ندارند. برای برآورد اولیه، وزن را وارد کنید و اگر دقت بیشتری لازم دارید، از ترازو استفاده کنید.</p></section>
    <section><h3>محدودیت دقت داده‌ها</h3><p>دستور پخت، مقدار روغن، برند مواد اولیه و اندازه سرو می‌تواند کالری نهایی را تغییر دهد. درباره روش گردآوری و محدودیت داده‌ها در <Link href={"/calorie-data-methodology" as Route}>روش‌شناسی داده‌های کالری</Link> بخوانید.</p></section>
    <section><h3>مطالب مرتبط</h3><p><Link href="/articles/healthy-eating-fundamentals">اصول تغذیه سالم</Link> و <Link href="/articles/macros-explained-in-depth">راهنمای درشت‌مغذی‌ها</Link>، زمینه بیشتری برای بررسی برنامه غذایی در اختیار می‌گذارند.</p></section>
  </div></section>;
}
