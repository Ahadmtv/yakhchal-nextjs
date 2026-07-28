# Migration and optimization notes

## React to Next.js

- مسیرهای React Router به App Router منتقل شدند.
- routeهای مقاله و ویژگی با `generateStaticParams` از قبل تولید می‌شوند و slug ناشناخته با `dynamicParams = false` رد می‌شود.
- تغییر DOM سمت کلاینت برای SEO حذف و با Metadata API جایگزین شد.
- داده، schema و محتوای قابل crawl در Server Component باقی می‌ماند؛ state و browser API فقط در Client Componentهاست.

## Server / Client boundaries

### Server Components

AppShell، Hero، SectionHeading، Features، Workflow، Download، Articles، Contact، FAQ، Privacy، Footer، Calorie Help، جزئیات مقاله و جزئیات ویژگی.

### Client Components

- `Navbar`: منوی موبایل، scroll state و theme toggle
- `LazyBMICalculator` و `BMICalculator`
- `CalorieCalculator`
- `CalorieCharts`: chunk مستقل Recharts

## Performance fixes

- حذف کامل MUI/Emotion از client graph و جایگزینی با semantic HTML، CSS variables و inline SVG
- حذف Client AppShell و Theme Provider سراسری
- حذف event handler از Hero و استفاده از anchor استاندارد
- جداکردن FAQ data از Client Component و رفع `faqs.map is not a function`
- `next/image` به‌جای `<img>` و فعال‌بودن optimizer
- preload فقط برای LCP؛ سایر تصاویر lazy
- AVIF/WebP و responsive `sizes`
- Vazirmatn self-hosted از package
- defer کردن BMI و lazy-load نمودارها
- Map lookup برای غذاها به‌جای `Array.find` در render
- memoization هدفمند برای داده‌های نمودار و ردیف‌های کالری
- جلوگیری از overwrite شدن localStorage پیش از hydration
- passive scroll listener و `requestAnimationFrame` در Navbar
- theme script پیش از paint برای جلوگیری از flash
- React Compiler و bundle analyzer
- `content-visibility` برای سکشن‌های پایین صفحه
- native details/summary برای FAQ بدون hydration

## SEO fixes

- metadata مستقل همه routeها
- canonical، locale، Open Graph و Twitter
- structured data با serializer مقاوم در برابر تزریق `<`
- breadcrumb schema برای صفحات داخلی
- FAQ schema از داده server-safe
- sitemap، robots، manifest و Googlebot directives
