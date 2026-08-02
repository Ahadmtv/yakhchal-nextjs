# Analytics funnel

## وضعیت فعلی

هیچ analytics provider، cookie، شناسه پایدار یا درخواست شبکه‌ای نصب نشده است. `AnalyticsBridge` payload را فقط در `window.dataLayer` همان نشست قرار می‌دهد و رویداد `yakhchal:analytics` منتشر می‌کند.

propertyهای مجاز فقط `source`، `store`، `feature_name`، `article_slug` و `item_count` هستند. `page_path` و `device_type` در خود bridge افزوده می‌شوند. نام غذا، وزن، BMI، مقدار کالری، ایمیل و سایر داده‌های سلامت یا شخصی اجازه ورود به payload ندارند.

## taxonomy

| حوزه | event | زمان ثبت |
| --- | --- | --- |
| مشاهده | `view_home` | ورود به Home |
| مشاهده | `view_download_page` | ورود به `/download` |
| مشاهده | `view_feature_page` | ورود به feature detail |
| مشاهده | `view_article` | ورود به article detail |
| CTA | `click_hero_primary_cta` | CTA اصلی Hero |
| CTA | `click_download_navbar` | CTA دسکتاپ Navbar |
| CTA | `click_download_drawer` | CTA منوی موبایل |
| CTA | `click_download_mobile_sticky` | نوار ثابت موبایل |
| فروشگاه | `click_download_myket` | خروج به مایکت |
| فروشگاه | `click_download_bazaar` | خروج به کافه‌بازار |
| مقاله | `click_article_install_cta` | CTA مقاله که به نصب می‌رود |
| مقاله | `click_article_feature_cta` | لینک مقاله که فقط به feature می‌رود |
| feature | `click_feature_install_cta` | CTA نصب در feature detail |
| کالری | `click_calorie_install_cta` | CTA نصب در ابزار کالری |
| کالری | `start_calorie_calculation` | اولین بار که یک غذا اضافه می‌شود |
| کالری | `complete_calorie_calculation` | اولین نمایش نتیجه با حداقل یک آیتم و وزن معتبر |
| تعامل | `open_faq` | بازشدن FAQ |
| تعامل | `click_support` | کلیک مسیر پشتیبانی |
| QR | `scan_download_qr` | ورود به download با `source=qr` |

`start_calorie_calculation` و `complete_calorie_calculation` در هر mount بی‌دلیل تکرار نمی‌شوند. completion فقط `item_count` را می‌فرستد و مقدار وزن/کالری را ارسال نمی‌کند.

## تعریف conversion

conversion فعلی فقط کلیک خروجی به فروشگاه است، نه نصب واقعی. نصب فقط با داده معتبر فروشگاه یا زیرساخت attribution قابل اندازه‌گیری است. عدد «دانلود» مایکت و «نصب» کافه‌بازار تعریف یکسان ندارند و نباید جمع شوند.

پیش از افزودن provider باید محل پردازش/نگهداری، consent، Privacy، فهرست نهایی eventها و فیلتر قطعی داده سلامت بررسی شوند.
