# SEO audit

تاریخ بررسی: `2026-08-02`.

## وضعیت اجراشده

- title، description، canonical، Open Graph و Twitter Card برای Home، Download، فهرست‌ها و detail pageها تعریف شده‌اند.
- sitemap فقط URLهای canonical را دارد و مسیرهای قدیمی feature با redirect دائمی به slug معیار می‌روند.
- article و feature با `generateStaticParams` ساخته می‌شوند و slug ناشناخته 404 است.
- schemaهای فعال شامل `WebSite`، `Organization`، `MobileApplication`، `FAQPage`، `BlogPosting`، `WebPage` و `BreadcrumbList` هستند.
- `softwareVersion` در Home و Download از `src/data/appStats.ts` تولید می‌شود؛ مقدار hardcoded مستقل در page source وجود ندارد.
- `MobileApplication` ادعای Offer یا امتیاز تجمیعی ساختگی ندارد و آمار مایکت/بازار را با هم جمع نمی‌کند.
- Smart Fridge Story با عنوان و متن server-rendered به Home برگشته است؛ Workflow کوتاه قدیمی حذف شده است.
- صفحات روش‌شناسی و سیاست تحریریه برای شفافیت در دسترس اما فعلاً `noindex` هستند. صفحات غذای مستقل تا منبع‌گذاری داده منتشر نمی‌شوند.

## تصاویر feature

metadata، Open Graph و JSON-LD برای slugهای دارای asset از تصویر همان قابلیت استفاده می‌کنند:

- `meal-planner`
- `smart-shopping-list`
- `fridge-inventory`
- `expiry-reminder`
- `recipes-by-ingredients`
- `quick-cook`
- `world-cuisine-library`

دو feature `calorie-counter` و `guided-recipes` هنوز screenshot مرتبط ندارند؛ metadata آن‌ها تصویر عمومی را به‌عنوان تصویر واقعی قابلیت جا نمی‌زند و UI fallback صادقانه دارد.

## کنترل پس از انتشار

1. ثبت sitemap و بررسی canonical/redirect در Search Console.
2. بررسی index coverage و structured data روی دامنه واقعی.
3. تأیید دوباره آمار، testimonialها و لینک فروشگاه‌ها در روز انتشار.
4. افزودن فقط screenshot واقعی و مرتبط برای دو feature باقی‌مانده.
5. پایش Core Web Vitals و LCP روی production؛ از نتیجه localhost ادعای مقایسه قطعی ساخته نشود.
