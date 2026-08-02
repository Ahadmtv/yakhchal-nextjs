# Yakhchal website

وب‌سایت فارسی «یخچال» با Next.js App Router، React Server Components و TypeScript. سایت محصول اندرویدی را معرفی می‌کند، لینک فروشگاه‌های رسمی را در اختیار کاربر می‌گذارد و محتوای عمومی تغذیه را با مرزهای روشن اعتماد و سلامت منتشر می‌کند.

## اجرای محلی

نیازمندی‌ها: Node.js `20.9.0+` و npm.

```bash
npm ci
npm run dev
```

برای build تولیدی:

```bash
npm run build
npm start
```

در `.env.local` می‌توان `NEXT_PUBLIC_SITE_URL=http://localhost:3000` را تنظیم کرد. مقدار production باید `https://yakhchalapp.ir` باشد؛ canonical، sitemap، robots و JSON-LD از آن استفاده می‌کنند.

## معماری فعلی

- `AppShell`، محتوای بازاریابی و صفحات جزئیات Server Component باقی مانده‌اند.
- صفحه اصلی به‌ترتیب Hero، Smart Fridge Story، Features، Use Cases، Download، Testimonials، Product Update، BMI، Articles، Contact، FAQ و Privacy را نمایش می‌دهد.
- صحنه تصویری Smart Fridge Story یک Client Island تنبل است؛ متن و مراحل Story در HTML سرور می‌مانند و runtime تصویری نزدیک viewport بار می‌شود.
- فونت اصلی، dependency محلی و self-hosted `vazirmatn@33.0.3` است. هیچ Google Font یا CDN فونت استفاده نمی‌شود.
- `src/data/appStats.ts` منبع واحد نسخه، تاریخ release، آمار تفکیک‌شده فروشگاه‌ها و testimonialهای تأییدشده است.
- مدل `FoodItem` یک discriminated union برای منبع `verified` یا `unverified` است؛ همه داده‌های فعلی همچنان `unverified` هستند.
- analytics فعلاً vendor-neutral و درون‌حافظه‌ای است و هیچ tracker، cookie یا درخواست شبکه ندارد.

## تصاویر ویژگی‌ها

اسکرین‌شات‌های واقعی در `public/assets/features/` نگهداری می‌شوند. صفحات meal planner، shopping list، fridge inventory، expiry reminder، recipes by ingredients، quick cook و world cuisine تصویر اختصاصی دارند. برای `calorie-counter` و `guided-recipes` هنوز asset مرتبط ارائه نشده و UI به‌صراحت fallback بدون تصویر نشان می‌دهد.

## کنترل کیفیت

```bash
npm run check
npm audit
npm run audit:lighthouse
```

`npm run check` به‌ترتیب معماری، typecheck، lint، build و آزمون production را اجرا می‌کند. آزمون production علاوه بر route، canonical، sitemap و redirect، وجود Vazirmatn در build، Story در Home، نبود Workflow قدیمی، نبود sticky CTA در `/download`، taxonomy CTAها، نسخه JSON-LD و assetهای feature را بررسی می‌کند.

GitHub Actions روی push و pull request برنچ‌های `main` و `main-issues`، `npm ci`، `npm run check` و `npm audit --audit-level=high` را اجرا می‌کند. Lighthouse به‌صورت workflow دستی و جدا اجرا می‌شود. گزارش‌های محلی Lighthouse در `.codex-qa/` نوشته می‌شوند و وارد Git نمی‌شوند.

## مسیرهای اصلی

- `/download`: لینک رسمی مایکت و کافه‌بازار، اطلاعات نسخه و راهنمای نصب
- `/features` و `/features/[slug]`: فهرست و جزئیات قابلیت‌ها
- `/calories`: ابزار تخمینی کالری با هشدار منبع
- `/articles` و `/articles/[slug]`: محتوای منبع‌دار
- `/privacy`، `/terms` و `/about`: صفحات اعتماد
- `/editorial-policy` و `/calorie-data-methodology`: صفحات شفافیت با `noindex`

صفحات حقوقی پیش‌نویس عملیاتی محصول‌اند و جایگزین بازبینی وکیل نیستند. پیش از اضافه‌کردن analytics provider، حساب کاربری یا شریک ثالث باید Privacy و Terms دوباره بررسی شوند.
