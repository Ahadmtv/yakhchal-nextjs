# Yakhchal - production-focused Next.js migration

مهاجرت کامل رابط پروژه `Ahadmtv/ui-generator` از Create React App به Next.js App Router با تمرکز بر Server Components، حداقل JavaScript کلاینت، Core Web Vitals و SEO فنی.

## اجرا

نیازمندی: Node.js 20.9 یا جدیدتر.

```bash
npm install
npm run dev
```

بررسی نسخه Production:

```bash
npm run check
npm start
```

تحلیل bundle:

```bash
npm run analyze
```

## معماری Performance

- تمام صفحات، Hero، سکشن‌های محتوایی، FAQ، Footer و جزئیات مقاله/ویژگی Server Component خالص هستند.
- MUI، Emotion و icon package از پروژه حذف شده‌اند؛ رابط با HTML semantic، CSS و SVGهای inline سبک رندر می‌شود.
- فقط Navbar، BMI، ماشین‌حساب کالری و نمودارها Client Component هستند.
- BMI با Intersection Observer و `next/dynamic` نزدیک viewport بارگذاری می‌شود؛ تا قبل از آن کد ماشین‌حساب دانلود نمی‌شود.
- Recharts در chunk مستقل است و فقط بعد از اضافه‌شدن غذا دانلود می‌شود.
- داده‌های FAQ در `src/data/faqs.ts` server-safe هستند؛ خطای `faqs.map is not a function` رفع شده است.
- lookup غذاها با `Map` انجام می‌شود و محاسبات مشتق، callbackها، ردیف‌ها و نمودارها memoize شده‌اند.
- React Compiler و bundle analyzer فعال هستند. اسکریپت `check:architecture` نیز از بزرگ‌شدن تصادفی Client boundary و بازگشت MUI/`<img>` خام جلوگیری می‌کند.
- theme روشن/تیره با CSS variables و یک اسکریپت کوچک پیش از paint اعمال می‌شود؛ Theme Provider کلاینت وجود ندارد.
- تصاویر با `next/image`، AVIF/WebP، `sizes`، lazy loading پیش‌فرض و preload محدود به LCP رندر می‌شوند.
- Vazirmatn از پکیج npm داخل bundle سرو می‌شود و درخواست فونت ثالث ندارد.
- سکشن‌های پایین صفحه از `content-visibility: auto` استفاده می‌کنند.

## SEO

- Metadata API و `generateMetadata` برای routeهای ثابت و داینامیک
- canonical و language alternate
- Open Graph و Twitter cards
- JSON-LD امن برای Organization، SoftwareApplication، FAQPage، BlogPosting، WebPage و BreadcrumbList
- `generateStaticParams` و `dynamicParams = false` برای slugهای محدود
- `robots.ts`، `sitemap.ts` و `manifest.ts`
- HTML اولیه crawlable، headingهای semantic، breadcrumb و لینک‌های داخلی واقعی

## Assets

تصاویر اصلی برای حفظ ظاهر پروژه از مسیر public ریپوی اصلی خوانده می‌شوند، اما مرورگر آن‌ها را مستقیماً از GitHub دریافت نمی‌کند؛ Next Image Optimization آن‌ها را resize، تبدیل و cache می‌کند. برای deployment کاملاً self-contained، فایل‌ها را در `public/assets` قرار دهید و مسیرهای `src/lib/assets.ts` را محلی کنید.

## Validation

در محیط تولید این خروجی، registry پکیج‌ها HTTP 503 برگرداند؛ بنابراین نصب dependency، تولید `package-lock.json` و اجرای dependency-aware `next build` ممکن نبود. نسخه‌های مستقیم پکیج‌ها دقیق pin شده‌اند و اجرای `npm install` در محیط شبکه‌دار lockfile را تولید می‌کند. Syntax، import resolution، semantic TypeScript داخلی با declaration stub، unused imports، configها و ساختار App Router بررسی شده‌اند. قبل از deployment، `npm run check` را در محیط دارای دسترسی registry اجرا کنید.
