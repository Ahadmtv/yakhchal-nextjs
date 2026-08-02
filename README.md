# Yakhchal website

وب‌سایت فارسی «یخچال» با Next.js App Router، React Server Components و TypeScript. هدف اصلی سایت توضیح محصول، هدایت کاربر به نسخه رسمی اندروید و ارائه محتوای عمومی با مرزهای روشن اعتماد و سلامت است.

## اجرای محلی

نیازمندی‌ها: Node.js `20.9.0+` و npm.

```bash
npm ci
npm run dev
```

سایت توسعه روی `http://localhost:3000` اجرا می‌شود. برای تولید:

```bash
npm run build
npm start
```

## متغیر محیطی

فایل `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

در Production مقدار باید `https://yakhchalapp.ir` باشد. این متغیر مبنای canonical، sitemap، robots و JSON-LD است.

## کنترل کیفیت

```bash
npm run typecheck
npm run lint
npm run check:architecture
npm run build
npm run test:production
npm run check
npm run audit:lighthouse
npm run capture:production
```

`test:production` پس از build، سرور واقعی Next.js را بالا می‌آورد و مسیرهای اصلی، redirectها، canonical، sitemap، لینک‌های داخلی، متن‌های حقوقی و hookهای تحلیل را بررسی می‌کند. دو دستور آخر به‌ترتیب گزارش Lighthouse و تصاویر کنترل بصری را در `.codex-qa` تولید می‌کنند.

## مسیرهای اصلی

- `/` معرفی محصول و مسیر اصلی تبدیل
- `/download` لینک‌های رسمی مایکت و کافه‌بازار، QR و اطلاعات نسخه
- `/features` و `/features/[slug]` صفحات مستقل امکانات
- `/calories` ابزار تخمینی کالری با هشدار منبع
- `/articles` و `/articles/[slug]` مقالات منبع‌دار
- `/privacy`، `/terms` و `/about` صفحات اعتماد
- `/editorial-policy` و `/calorie-data-methodology` صفحات شفافیت با `noindex`

## معماری و داده

محتوای بازاریابی و صفحات جزئیات Server Component هستند. JavaScript مرورگر فقط برای منو/تم، BMI، محاسبه کالری، نمودار و پل رویدادهای تحلیلی استفاده می‌شود. فهرست Client Islandهای مجاز در `scripts/verify-architecture.mjs` کنترل می‌شود.

اطلاعات نسخه و شاخص‌های فروشگاه‌ها در `src/data/appStats.ts` متمرکز است. مقدار مایکت و کافه‌بازار به دلیل تفاوت تعریف «دانلود» و «نصب» با هم جمع نمی‌شوند. داده‌های `src/data/foods.ts` فعلاً همگی `unverified` هستند و نباید مرجع درمانی تلقی شوند.

هیچ سرویس Analytics نصب نشده است. `src/lib/analytics.ts` فقط رویدادها را در حافظه همان صفحه منتشر می‌کند و درخواست شبکه یا ذخیره پایدار ندارد. جزئیات در `ANALYTICS_FUNNEL.md` است.

## مستندات تحویل

- `CHANGELOG.md`
- `SEO_AUDIT.md`
- `ACCESSIBILITY_AUDIT.md`
- `PERFORMANCE_AUDIT.md`
- `ANALYTICS_FUNNEL.md`
- `NUTRITION_DATA_AUDIT.md`
- `DOMAIN_EMAIL_SETUP.md`

صفحات حقوقی پیش‌نویس عملیاتی محصول هستند، نه جایگزین بازبینی وکیل. پیش از تغییر مدل داده، حساب کاربری، Analytics یا شریک ثالث، متن حریم خصوصی و شرایط استفاده باید دوباره بررسی شود.
