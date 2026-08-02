# گزارش اعتبارسنجی

تاریخ اعتبارسنجی: `2026-08-02`.

## زنجیره خودکار

```bash
npm ci
npm run check
npm audit
npm run audit:lighthouse
```

`npm run check` شامل architecture، typecheck، lint، build و production verification است. production verification هشت صفحه اصلی و لینک‌های داخلی را روی سرور واقعی Next.js کنترل می‌کند و موارد زیر را نیز پوشش می‌دهد:

- Vazirmatn و asset متغیر با بازه وزن `100 900`
- Smart Fridge Story در Home و نبود Workflow قدیمی
- نبود Mobile Download Bar در `/download`
- event مستقل Navbar و drawer و نبود mappingهای قدیمی
- نسخه JSON-LD تولیدشده از source of truth
- redirect، sitemap، canonical، 404 و image optimizer
- قابل fetch بودن هشت asset feature ارائه‌شده
- اعلام screen-reader برای لینک‌های پنجره جدید

type test مدل کالری ثابت می‌کند رکورد `verified` بدون `sourceUrl` و `reviewedAt` معتبر ساخته نمی‌شود. داده‌های فعلی عمداً `unverified` باقی مانده‌اند.

اجرای نهایی `npm ci` و سپس `npm run check` پاس شد: architecture، typecheck، lint، build و production verification بدون خطا؛ ۸ صفحه و ۲۸ لینک داخلی بررسی شدند. `npm audit` نیز صفر آسیب‌پذیری گزارش کرد.

Lighthouse نهایی: mobile برابر Performance 92، Accessibility 100، Best Practices 100 و SEO 100؛ desktop برابر Performance 100، Accessibility 100، Best Practices 100 و SEO 100. CLS هر دو صفر بود؛ LCP شبیه‌سازی‌شده mobile برابر 3.3s و desktop برابر 0.7s ثبت شد.

## داده‌های بیرونی تأییدشده

- مایکت: ۲ هزار دانلود، امتیاز ۴.۹ از ۵، ۱۵ نظر، نسخه ۱.۴.۱، تاریخ ۷ تیر ۱۴۰۵ و حجم ۲۶ مگابایت.
- کافه‌بازار: ۶.۸ هزار نصب، امتیاز ۴.۹ از ۵، ۷۵ رأی، نسخه ۱.۴.۱، آخرین به‌روزرسانی ۶ تیر ۱۴۰۵ و حجم ۲۴ مگابایت.
- testimonialها: هفت مورد واقعی؛ شش کافه‌بازار و یک مایکت. تاریخ بررسی همه `2026-08-02` است.

## کنترل انسانی باقی‌مانده

- تأیید نهایی mapping دو asset خرید (`shopping-list.webp` و `shopping-list-create.webp`) با نام‌گذاری محصول.
- ارائه screenshot مرتبط برای `calorie-counter` و `guided-recipes`.
- بازبینی حقوقی Privacy و Terms در برابر رفتار آخرین نسخه اپ.
- آزمون screen reader و Story روی دستگاه واقعی.
- تأیید مجدد آمار و reviewها در روز انتشار، چون داده فروشگاه‌ها تغییرپذیر است.
- پایش LCP و Core Web Vitals روی دامنه production؛ نتایج localhost معادل داده میدانی نیستند.
