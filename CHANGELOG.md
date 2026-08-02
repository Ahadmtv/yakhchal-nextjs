# Changelog

## Unreleased — website

### Added

- اسکرین‌شات‌های مستقل و واقعی برای meal planner، shopping list، fridge inventory، expiry reminder، recipes by ingredients، quick cook و world cuisine؛ metadata، Open Graph و JSON-LD هر صفحه از asset همان feature استفاده می‌کند.
- هفت testimonial عمومی و قابل استناد: شش مورد از کافه‌بازار و یک مورد از مایکت، با نام نمایشی، فروشگاه، منبع، امتیاز/تاریخ موجود و تاریخ تأیید `2026-08-02`.
- GitHub Actions برای `main` و `main-issues` و workflow دستی Lighthouse موبایل/دسکتاپ.
- production checks برای فونت، Story، route-aware sticky CTA، taxonomy analytics، نسخه JSON-LD و feature assets.

### Changed

- فونت Vazirmatn نسخه `33.0.3` به‌عنوان dependency محلی و font stack اصلی بازگردانده شد و فایل variable font برای جلوگیری از جابه‌جایی تایپوگرافی preload می‌شود.
- Smart Fridge Story به صفحه اصلی برگشت و Workflow چهارمرحله‌ای حذف شد. متن Story server-rendered و صحنه تعاملی آن نزدیک viewport lazy-load می‌شود.
- آمار رسمی فروشگاه‌ها در `2026-08-02` به‌روزرسانی شد: مایکت ۲ هزار دانلود، امتیاز ۴.۹ از ۵ با ۱۵ نظر، نسخه ۱.۴.۱ و ۲۶ مگابایت؛ کافه‌بازار ۶.۸ هزار نصب، امتیاز ۴.۹ از ۵ با ۷۵ رأی، نسخه ۱.۴.۱ و ۲۴ مگابایت.
- نسخه machine-readable و نمایشی، latest release و تاریخ verification همگی از `src/data/appStats.ts` مشتق می‌شوند؛ وابستگی معنایی به index آرایه حذف شد.
- CTAهای Navbar، drawer و mobile sticky event مستقل دارند؛ لینک feature مقاله دیگر install محسوب نمی‌شود و start/complete محاسبه کالری معنا و deduplication مشخص دارند.
- Mobile Download Bar در `/download` رندر نمی‌شود.
- preload تصویر Hero فقط برای عرض دسکتاپ فعال است؛ تصویر مخفی موبایل preload نمی‌شود.
- تمام لینک‌های `target="_blank"` در مسیرهای ممیزی‌شده، بازشدن در پنجره جدید را برای screen reader اعلام می‌کنند.
- مدل منبع کالری به discriminated union قابل توسعه تبدیل شد؛ رکورد verified بدون URL و تاریخ بازبینی از typecheck عبور نمی‌کند.

### Removed

- Workflow چهارمرحله‌ای و فایل بدون‌مصرف آن.
- eventهای اشتباه Navbar، drawer، لینک feature مقاله و completion زودهنگام کالری.
- overrideهای Tahoma روی بخش‌های فارسی.
- ادعای تصویر اختصاصی برای featureهایی که asset مرتبط ندارند.

## 1.4.1 — Android

نسخه فعلی هر دو فروشگاه `1.4.1` است. آخرین release تأییدشده بر اساس تاریخ صریح داده تعیین می‌شود و در وضعیت فعلی مربوط به مایکت در `2026-06-28` است؛ ترتیب آرایه نقشی ندارد.
