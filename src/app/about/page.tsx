import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";

export const metadata: Metadata = { title: "درباره یخچال", description: "آشنایی با هدف یخچال برای برنامه‌ریزی غذا، کالری‌شماری و خرید آگاهانه.", alternates: { canonical: "/about" } };

export default function AboutPage() { return <TrustPage eyebrow="درباره محصول" title="درباره یخچال" intro="یخچال یک اپلیکیشن فارسی برای برنامه‌ریزی وعده‌ها، محاسبه کالری غذا و آماده‌کردن لیست خرید است." sections={[{ heading: "هدف یخچال", body: "هدف محصول، ساده‌ترکردن تصمیم‌های روزانه درباره غذا با ابزارهای برنامه‌ریزی، اطلاعات کالری و لیست خرید است." }, { heading: "شفافیت اطلاعات", body: "اطلاعات هویت حقوقی، تیم و راه‌های رسمی تکمیلی باید توسط مالک سایت در این صفحه اضافه و به‌روز نگه‌داری شوند." }]} />; }
