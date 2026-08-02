# Accessibility audit

هدف پروژه WCAG 2.2 AA برای مسیرهای اصلی است. این سند نتیجه بررسی کد و آزمون خودکار build محلی در `2026-08-02` است؛ آزمون انسانی با کاربران فناوری کمکی همچنان لازم است.

## وضعیت برقرار در کد

- ریشه سند `lang="fa"` و `dir="rtl"` دارد؛ skip link و `main` قابل فوکوس موجود است.
- منوی موبایل با Escape بسته می‌شود، focus trap دارد و focus را به کنترل بازکننده برمی‌گرداند.
- کنترل‌های تعاملی حداقل هدف ۴۴×۴۴، حالت `:focus-visible` و نام دسترس‌پذیر دارند.
- FAQها با `details/summary` کار می‌کنند و به JavaScript وابسته نیستند.
- تصاویر محتوایی alt توصیفی و تصاویر تزئینی alt خالی دارند. scene و placeholder Story از role تصویری معتبر استفاده می‌کنند.
- Smart Fridge Story در `prefers-reduced-motion` حالت ثابت نشان می‌دهد و animationهای داخلی غیرفعال می‌شوند.
- تمام لینک‌های `target="_blank"` در Hero Trust Bar، testimonialها، صفحه دانلود، store facts، منابع و اشتراک مقاله، صفحات About/Contact و شبکه‌های اجتماعی عبارت «در پنجره جدید» را در نام یا متن screen-reader دارند.
- Mobile Download Bar در `/download` وجود ندارد و footer موبایل padding لازم برای جلوگیری از پوشاندن کنترل پایانی را دارد.
- آزمون production لینک‌های پنجره جدید را روی هشت مسیر اصلی بررسی می‌کند.

## نتیجه خودکار

اجرای نهایی Lighthouse روی build محلی production، Accessibility برابر 100 را در هر دو پروفایل mobile و desktop ثبت کرد. خطای میانی `aria-label` روی placeholder بدون role با افزودن role تصویری معتبر رفع شد.

## کنترل انسانی باقی‌مانده

1. گردش کامل Tab و Shift+Tab در عرض‌های ۳۶۰، ۷۶۸ و ۱۴۴۰ پیکسل.
2. NVDA + Firefox و TalkBack + Chrome برای منو، Story، محاسبه کالری و FAQ.
3. بزرگ‌نمایی ۲۰۰٪ و ۴۰۰٪ و بررسی نبود اسکرول افقی صفحه.
4. بررسی contrast پس از هر تغییر رنگ یا تصویر.
5. بررسی sticky CTA و safe-area روی دستگاه‌های واقعی iOS/Android.

Lighthouse مدرک انطباق کامل WCAG نیست؛ بازبینی صفحه‌کلید، screen reader و دستگاه واقعی باید در چرخه انتشار باقی بماند.
