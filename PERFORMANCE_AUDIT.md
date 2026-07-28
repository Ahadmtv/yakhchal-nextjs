# Performance audit - implemented changes

## Critical fixes

1. **FAQ runtime failure:** داده‌های FAQ از فایل مستقل server-safe وارد می‌شوند؛ هیچ Server Component از فایل `use client` داده import نمی‌کند.
2. **Initial client bundle:** MUI، Emotion، Stylis و مجموعه آیکون‌ها حذف شدند؛ محتوای بازاریابی و layout فقط HTML/CSS/SVG سروری هستند.
3. **Theme flash:** یک اسکریپت inline کوچک، theme ذخیره‌شده یا system preference را پیش از paint روی `<html>` اعمال می‌کند.
4. **Image pipeline:** حالت `unoptimized` حذف شده و همه تصاویر با `next/image`، responsive sizes و فرمت‌های AVIF/WebP رندر می‌شوند.
5. **Heavy libraries:** Recharts فقط در زمان وجود داده و BMI فقط نزدیک viewport دانلود می‌شوند.

## Server / Client boundaries

### Server only

- Layout و AppShell
- Hero، Features، Workflow، Download، Articles، Contact
- FAQ، Privacy، Footer و Calorie Help
- صفحات فهرست و جزئیات مقاله/ویژگی
- metadata، sitemap، robots، manifest و JSON-LD

### Client islands

- Navbar: منوی موبایل، scroll state و theme toggle
- Lazy BMI loader و BMI calculator
- Calorie calculator
- Recharts chart chunk

## Runtime work reduction

- food lookup: `Map` با دسترسی O(1)
- derived rows، total و chart data: `useMemo`
- update handlers و row actions: `useCallback`
- rows و charts: `memo`
- React Compiler: فعال
- dependency versions: exact/pinned; architecture regression check: فعال
- persisted state: validate و clamp پیش از استفاده
- scroll listener: passive و throttle با `requestAnimationFrame`
- FAQ و help: native `details/summary` و بدون JavaScript

## Loading strategy

- Hero/article/feature LCP: حداکثر یک preload در هر صفحه
- تصاویر دیگر: lazy loading داخلی Next Image
- BMI: Intersection Observer با root margin پیش از dynamic import
- Recharts: dynamic import با `ssr: false` فقط بعد از وجود داده
- below-fold sections: `content-visibility`
- فونت: self-hosted از dependency محلی

## Remaining deployment action

انتقال تصاویر اصلی به `public/assets` اولین fetch سرور از GitHub را نیز حذف می‌کند و deployment را کاملاً مستقل می‌سازد. در وضعیت فعلی، تحویل به browser همچنان از optimizer و cache خود Next.js انجام می‌شود.
