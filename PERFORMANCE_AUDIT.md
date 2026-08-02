# ممیزی عملکرد

تاریخ اجرا: `2026-08-02`، build محلی production، Lighthouse CLI `12.8.2` روی localhost. نتایج mobile و desktop مستقل اجرا شده‌اند.

## نتیجه ثبت‌شده

| معیار | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 92 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 1.1s | 0.3s |
| LCP شبیه‌سازی‌شده | 3.3s | 0.7s |
| CLS | 0 | 0 |
| TBT | 120ms | 10ms |
| Speed Index | 1.3s | 0.7s |

داده‌ها lab data یک اجرای محلی‌اند و ادعای بهبود قطعی نسبت به production قدیمی یا داده میدانی نیستند. LCP موبایل با وجود پاس‌شدن بودجه Performance هنوز بالاتر از بودجه ترجیحی ۲.۵ ثانیه است و باید پس از deploy با cold cache و داده‌های میدانی پایش شود.

## اصلاحات مؤثر

- Vazirmatn محلی preload می‌شود؛ variable face بازه وزن `100 900` را پوشش می‌دهد و CLS آخرین اجرا صفر است.
- تصویر اصلی Hero در desktop با `imageSrcSet`، `sizes` و media query فقط برای عرض `min-width: 700px` preload می‌شود؛ visual مخفی موبایل preload نمی‌شود.
- Smart Fridge Story حفظ شده، اما scene و runtime سنگین آن فقط نزدیک viewport بار می‌شوند. متن، عنوان و مراحل در HTML سرور باقی مانده‌اند.
- `content-visibility` برای بخش‌های پایین fold در mobile فعال است و Story اندازه ذاتی صریح دارد.
- BMI و chartها همچنان lazy هستند و dependency سنگین UI اضافه نشده است.
- `AppShell` Server Component باقی مانده و فقط route check نوار دانلود در یک Client Component کوچک است.

## بودجه انتشار

- Performance موبایل و دسکتاپ حداقل 90: پاس در اجرای ثبت‌شده
- Accessibility حداقل 95: پاس
- CLS کمتر از 0.1: پاس با مقدار صفر
- نبود preload تصویر Hero موبایل و وجود preload responsive دسکتاپ: پاس در HTML build

فایل‌های خام در `.codex-qa/lighthouse-mobile.json` و `.codex-qa/lighthouse-desktop.json` تولید می‌شوند و عمداً track نمی‌شوند.
