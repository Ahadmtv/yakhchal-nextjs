# Analytics funnel

## وضعیت فعلی

هیچ ارائه‌دهنده Analytics، cookie یا درخواست شبکه‌ای نصب نشده است. `AnalyticsBridge` فقط payload را در `window.dataLayer` همان نشست حافظه و رویداد `yakhchal:analytics` منتشر می‌کند. با refresh داده از بین می‌رود.

هیچ نام غذا، وزن، BMI، مقدار کالری، ایمیل یا شناسه شخصی در eventها ارسال نمی‌شود.

## قیف اصلی

| مرحله | رویداد | ویژگی‌های مجاز |
| --- | --- | --- |
| ورود | `view_home` | `page_path`, `device_type` |
| مشاهده دانلود | `view_download_page` | `page_path`, `device_type` |
| بررسی قابلیت | `view_feature_page` | `feature_name` |
| مطالعه محتوا | `view_article` | `article_slug` |
| اقدام Hero | `click_hero_primary_cta` | `source` |
| اقدام ویژگی | `click_feature_install_cta` | `feature_name` |
| اقدام مقاله | `click_article_install_cta` | `article_slug` |
| اقدام کالری | `click_calorie_install_cta` | `source` |
| فروشگاه | `click_download_myket` / `click_download_bazaar` | `source`, `store` |
| نوار موبایل | `click_download_mobile_sticky` | `source` |
| QR | `scan_download_qr` | `source` |

رویدادهای پشتیبان: `open_faq`، `click_support`، `use_calorie_calculator` و `complete_calorie_calculation`. تکمیل محاسبه فقط تعداد ردیف‌ها را ثبت می‌کند.

## تعریف تبدیل

تبدیل وب‌سایت در وضعیت فعلی «کلیک خروجی به فروشگاه» است، نه نصب واقعی. نصب فقط زمانی قابل انتساب است که فروشگاه یا زیرساخت اندازه‌گیری معتبر آن را گزارش کند. اعداد مایکت و بازار نباید با یک تعریف واحد ترکیب شوند.

## شرایط افزودن سرویس واقعی

1. انتخاب ارائه‌دهنده و تعیین محل پردازش و نگهداری داده.
2. قرارداد پردازش داده و فهرست دقیق event/parameter.
3. تصمیم حقوقی درباره consent و cookie banner بر اساس بازار هدف.
4. به‌روزرسانی Privacy قبل از فعال‌سازی شبکه.
5. فیلتر قطعی داده‌های غذا و سلامت در لایه ارسال.
6. آزمون DebugView و تطبیق eventها با این سند.
