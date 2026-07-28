# Yakhchal — Next.js Application

نسخه‌ی بهینه‌سازی‌شده‌ی وب‌سایت اپلیکیشن «یخچال» با استفاده از Next.js App Router، React، TypeScript و معماری مبتنی بر Server Components.

این پروژه از نسخه‌ی React/Create React App منتقل شده و با تمرکز بر Performance، Core Web Vitals، SEO فنی، حداقل JavaScript سمت کاربر و نگهداری ساده‌تر بازطراحی شده است.

## تکنولوژی‌ها

- Next.js 16
- React 19
- TypeScript
- App Router
- React Server Components
- Recharts
- React Compiler
- ESLint
- Next.js Image Optimization
- Vazirmatn

## نیازمندی‌ها

برای اجرای پروژه به موارد زیر نیاز دارید:

- Node.js نسخه `20.9.0` یا جدیدتر
- npm نسخه سازگار با Node.js
- دسترسی به npm registry برای نصب وابستگی‌ها

بررسی نسخه Node.js:

```bash
node --version
```

## نصب پروژه

ابتدا repository را دریافت کنید:

```bash
git clone https://github.com/Ahadmtv/yakhchal-nextjs.git
cd yakhchal-nextjs
```

سپس وابستگی‌ها را با استفاده از lockfile نصب کنید:

```bash
npm ci
```

برای توسعه‌ی معمولی نیز می‌توانید از دستور زیر استفاده کنید:

```bash
npm install
```

برای محیط CI و Production استفاده از `npm ci` توصیه می‌شود.

## اجرای حالت Development

```bash
npm run dev
```

سپس آدرس زیر را در مرورگر باز کنید:

```text
http://localhost:3000
```

برای پاک‌کردن کش Next.js در PowerShell:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

در Linux یا macOS:

```bash
rm -rf .next
npm run dev
```

## متغیرهای محیطی

یک فایل با نام `.env.local` در ریشه پروژه ایجاد کنید:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

در محیط Production مقدار آن باید دامنه‌ی نهایی سایت باشد:

```env
NEXT_PUBLIC_SITE_URL=https://yakhchalapp.ir
```

این مقدار برای موارد زیر استفاده می‌شود:

- Canonical URLs
- Open Graph URLs
- Sitemap
- Robots
- JSON-LD
- Breadcrumb schema
- لینک صفحات مقالات و امکانات

فایل `.env.example` نیز نمونه‌ی تنظیمات موردنیاز پروژه را در اختیار قرار می‌دهد.

## دستورات پروژه

### اجرای Development Server

```bash
npm run dev
```

### بررسی TypeScript

```bash
npm run typecheck
```

### اجرای ESLint

```bash
npm run lint
```

### بررسی معماری پروژه

```bash
npm run check:architecture
```

این دستور موارد زیر را بررسی می‌کند:

- جلوگیری از بازگشت MUI و Emotion
- جلوگیری از استفاده از `<img>` خام
- کنترل تعداد Client Components
- بررسی مرز Server و Client
- اطمینان از server-safe بودن داده‌های FAQ
- جلوگیری از Client Component شدن غیرضروری بخش‌های استاتیک

### ساخت نسخه Production

```bash
npm run build
```

### اجرای نسخه Production

```bash
npm start
```

### اجرای تمام بررسی‌ها

```bash
npm run check
```

دستور `npm run check` به‌ترتیب موارد زیر را اجرا می‌کند:

```text
check:architecture
typecheck
lint
build
```

### تحلیل حجم Bundle

```bash
npm run analyze
```

این دستور گزارش Bundle Analyzer را برای بررسی حجم JavaScript و وابستگی‌های صفحات ایجاد می‌کند.

## معماری Performance

پروژه با هدف کاهش JavaScript سمت مرورگر و استفاده‌ی حداکثری از Server Components پیاده‌سازی شده است.

### Server Components

بخش‌های زیر به‌صورت Server Component رندر می‌شوند:

- صفحات اصلی
- Hero
- امکانات
- روند کار
- بخش دانلود
- مقالات
- اطلاعات تماس
- FAQ
- حریم خصوصی
- Footer
- صفحه جزئیات مقاله
- صفحه جزئیات امکانات
- Metadata
- JSON-LD

این بخش‌ها بدون ارسال JavaScript غیرضروری به مرورگر رندر می‌شوند.

### Client Components

فقط بخش‌هایی که به state، event handler یا APIهای مرورگر نیاز دارند Client Component هستند:

- Navbar
- Lazy BMI Loader
- BMI Calculator
- Calorie Calculator
- Calorie Charts

فهرست Client Components مجاز در فایل زیر کنترل می‌شود:

```text
scripts/verify-architecture.mjs
```

## Lazy Loading

ماشین‌حساب BMI با استفاده از `IntersectionObserver` و `next/dynamic` نزدیک viewport بارگذاری می‌شود.

تا زمانی که کاربر به بخش BMI نزدیک نشده باشد، JavaScript مربوط به ماشین‌حساب دانلود نمی‌شود.

نمودارهای Recharts نیز در یک chunk جدا قرار دارند و فقط زمانی بارگذاری می‌شوند که کاربر حداقل یک غذا به ماشین‌حساب کالری اضافه کند.

## Memoization

در بخش‌های محاسباتی از ابزارهای زیر به‌صورت هدفمند استفاده شده است:

- `React.memo`
- `useMemo`
- `useCallback`
- React Compiler

اطلاعات غذاها از طریق `Map` خوانده می‌شوند تا جست‌وجوی خطی تکراری در آرایه انجام نشود.

React Compiler نیز در `next.config.mjs` فعال است:

```js
reactCompiler: true;
```

## تصاویر

تمام تصاویر پروژه در repository و داخل مسیر `public` نگهداری می‌شوند.

ساختار کلی فایل‌های تصویری:

```text
public/
├── assets/
│   ├── app/
│   ├── articles/
│   ├── brand/
│   ├── features/
│   ├── seo/
│   └── stores/
└── icons/
```

مسیر تصاویر در فایل زیر تعریف شده است:

```text
src/lib/assets.ts
```

تمام مسیرها محلی هستند:

```ts
export const assets = {
  logo: "/assets/brand/logo-80.webp",
  appPreview760: "/assets/app/app-preview-760.webp",
  og: "/assets/seo/og-image-1200x630.png",
  icon192: "/icons/android-chrome-192x192.png",
} as const;
```

پروژه برای نمایش تصاویر به GitHub، CDN خارجی یا repository قبلی وابسته نیست.

## Image Optimization

تصاویر محتوایی با `next/image` رندر می‌شوند.

قابلیت‌های فعال:

- تولید AVIF
- تولید WebP
- Responsive image sizes
- Lazy loading پیش‌فرض
- جلوگیری از Layout Shift
- بهینه‌سازی LCP
- Cache طولانی تصاویر
- Preload محدود به تصاویر اصلی بالای صفحه

تنظیمات تصاویر در فایل زیر قرار دارند:

```text
next.config.mjs
```

## فونت

فونت Vazirmatn از پکیج npm زیر استفاده می‌شود:

```json
"vazirmatn": "33.0.3"
```

در Layout اصلی:

```tsx
import "vazirmatn/Vazirmatn-Variable-font-face.css";
```

پس از اجرای `npm ci`، فونت از فایل‌های نصب‌شده‌ی خود پروژه استفاده می‌شود و درخواست runtime به CDN یا GitHub ارسال نمی‌کند.

## رابط کاربری

برای کاهش Client Bundle، وابستگی‌های سنگین UI از پروژه حذف شده‌اند:

- Material UI
- Emotion
- MUI Icons
- Stylis RTL Plugin

رابط کاربری با موارد زیر ساخته شده است:

- HTML semantic
- CSS
- CSS Variables
- SVGهای inline
- Next.js Image
- Server Components

این ساختار باعث کاهش JavaScript، کاهش hydration و بهبود زمان Interactive شدن صفحه می‌شود.

## حالت روشن و تیره

حالت روشن و تیره با CSS Variables پیاده‌سازی شده است.

Theme Provider کلاینت وجود ندارد.

یک اسکریپت کوچک پیش از paint مقدار theme ذخیره‌شده را از `localStorage` می‌خواند تا از نمایش موقت تم اشتباه جلوگیری شود.

کلید ذخیره‌شده:

```text
yakhchal:theme
```

در صورت نبود مقدار ذخیره‌شده، تنظیم سیستم‌عامل کاربر بررسی می‌شود.

## رفع خطای FAQ

داده‌های FAQ در فایل مستقل زیر نگهداری می‌شوند:

```text
src/data/faqs.ts
```

این فایل با دستور زیر فقط برای Server قابل استفاده است:

```ts
import "server-only";
```

صفحه اصلی و کامپوننت FAQ هر دو داده‌ها را از همین فایل دریافت می‌کنند.

این معماری خطای زیر را برطرف می‌کند:

```text
faqs.map is not a function
```

داده‌های JSON-LD دیگر از یک Client Component import نمی‌شوند.

## SEO

SEO پروژه با Metadata API و قابلیت‌های App Router پیاده‌سازی شده است.

موارد موجود:

- Metadata مستقل برای صفحات
- `generateMetadata`
- Canonical URL
- Language alternate
- Open Graph
- Twitter Card
- Sitemap
- Robots
- Web App Manifest
- Static route generation
- Semantic headings
- Crawlable internal links
- Breadcrumb
- JSON-LD

## Structured Data

Schemaهای زیر در HTML اولیه رندر می‌شوند:

- `Organization`
- `SoftwareApplication`
- `FAQPage`
- `BlogPosting`
- `WebPage`
- `BreadcrumbList`

JSON-LD قبل از قرارگرفتن در HTML sanitize می‌شود:

```text
src/lib/jsonld.ts
```

این کار از تزریق مستقیم کاراکترهای خطرناک داخل script جلوگیری می‌کند.

## مسیرهای پروژه

```text
/
├── صفحه اصلی
├── /features
├── /features/[slug]
├── /articles
├── /articles/[slug]
└── /calories
```

برای صفحات داینامیک امکانات و مقالات از موارد زیر استفاده شده است:

- `generateStaticParams`
- `generateMetadata`
- `dynamicParams = false`

در نتیجه slugهای شناخته‌شده در زمان build به‌صورت استاتیک تولید می‌شوند.

## PWA و آیکون‌ها

فایل‌های مربوط به PWA و مرورگر داخل پروژه قرار دارند:

```text
public/icons/
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── apple-touch-icon.png
└── favicon-32x32.png
```

Manifest از مسیرهای محلی همین فایل‌ها استفاده می‌کند.

## Open Graph Image

تصویر پیش‌فرض اشتراک‌گذاری شبکه‌های اجتماعی در مسیر زیر قرار دارد:

```text
public/assets/seo/og-image-1200x630.png
```

این تصویر برای Open Graph و Twitter Card استفاده می‌شود و از دامنه‌ی خود سایت ارائه خواهد شد.

## ساختار اصلی پروژه

```text
yakhchal-nextjs/
├── public/
│   ├── assets/
│   └── icons/
├── scripts/
│   └── verify-architecture.mjs
├── src/
│   ├── app/
│   ├── components/
│   ├── data/
│   └── lib/
├── eslint.config.mjs
├── next.config.mjs
├── package.json
├── package-lock.json
└── tsconfig.json
```

## بررسی قبل از Deployment

قبل از انتشار نسخه Production اجرا کنید:

```bash
npm ci
npm run check
```

در صورت موفق بودن build:

```bash
npm start
```

همچنین در DevTools مرورگر تب Network را بررسی کنید و عبارت زیر را جست‌وجو کنید:

```text
githubusercontent
```

نتیجه باید صفر درخواست باشد.

موارد دیگری که باید بررسی شوند:

- عدم وجود خطای Console
- عدم وجود Hydration Warning
- صحت تصاویر در تمام صفحات
- صحت حالت روشن و تیره
- عملکرد منوی موبایل
- عملکرد BMI Calculator
- عملکرد Calorie Calculator
- نمایش نمودارها پس از اضافه‌کردن غذا
- صحت canonical URLs
- صحت sitemap
- صحت robots
- صحت Open Graph image

## Deployment

پروژه روی سرویس‌های سازگار با Next.js قابل انتشار است، از جمله:

- Vercel
- سرور Node.js
- Docker
- سرویس‌های دارای پشتیبانی از Next.js Image Optimization

در محیط Production متغیر زیر را تنظیم کنید:

```env
NEXT_PUBLIC_SITE_URL=https://yakhchalapp.ir
```

سپس اجرا کنید:

```bash
npm ci
npm run build
npm start
```

## وضعیت اعتبارسنجی

موارد زیر در ساختار پروژه کنترل شده‌اند:

- حل‌شدن خطای FAQ
- محلی‌بودن تمام تصاویر
- محلی‌بودن آیکون‌های PWA
- حذف URLهای تصویری GitHub
- استفاده‌نشدن از `<img>` خام
- حذف MUI و Emotion
- محدودبودن Client Components
- وجود lockfile
- هماهنگی نسخه‌های مستقیم `package.json` و `package-lock.json`
- بررسی syntax فایل‌های TypeScript و TSX
- بررسی importهای محلی
- وجود Metadata، Sitemap، Robots و Manifest

تأیید نهایی سلامت Production به موفق‌شدن دستور زیر در محیط توسعه یا CI وابسته است:

```bash
npm run check
```

## مجوز

حقوق محتوای برند، تصاویر و نام تجاری «یخچال» متعلق به مالک پروژه است.

مجوز وابستگی‌های متن‌باز استفاده‌شده در فایل‌های package و lockfile قابل بررسی است.
