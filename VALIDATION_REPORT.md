# گزارش اعتبارسنجی

آخرین اعتبارسنجی در ۱۱ مرداد ۱۴۰۵ روی build محلی production انجام شده است.

## کنترل‌های خودکار

- `next typegen` و TypeScript بدون خطا
- ESLint بدون خطا
- Next.js production build موفق
- ممیزی معماری موفق: بدون `<img>` خام و بدون Client Component خارج از allowlist
- راه‌اندازی سرور production و پاسخ موفق مسیرهای اصلی
- بررسی ۸ صفحه اصلی و ۲۵ لینک داخلی
- بررسی canonical، sitemap، redirectها، صفحه 404 و image optimizer
- بررسی خودکار نبود متن عمومی `TODO` و placeholder حقوقی
- بررسی JSON-LD، رویدادهای funnel و متن‌های حقوقی کلیدی
- `npm audit`: صفر آسیب‌پذیری شناخته‌شده
- Lighthouse موبایل: Performance 92، Accessibility 100، Best Practices 100 و SEO 100

## دستور کنترل کامل

```bash
npm ci
npm run check
npm audit
npm run audit:lighthouse
```

`npm run check` به‌ترتیب معماری، typecheck، lint، build و آزمون production را اجرا می‌کند. نتایج Lighthouse داده آزمایشگاهی localhost هستند و باید بعد از deploy روی دامنه واقعی دوباره اجرا شوند.

## کنترل‌های انسانی باقی‌مانده

- بازبینی حقوقی متن حریم خصوصی و شرایط استفاده با توجه به رفتار واقعی آخرین نسخه اپ
- جایگزینی ایمیل عمومی با ایمیل رسمی دامنه پس از ساخت mailbox
- تأیید منبع و بازبینی تخصصی داده‌های کالری پیش از انتشار صفحه مستقل هر ماده غذایی
- آزمون دستی صفحه‌خوان روی Android و iOS و آزمون دستگاه‌های واقعی
- تأیید نهایی آمار فروشگاه‌ها در روز انتشار
