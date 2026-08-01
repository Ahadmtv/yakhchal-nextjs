import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";

export const metadata: Metadata = { title: "روش‌شناسی داده‌های کالری", description: "چارچوب و محدودیت‌های داده‌های کالری یخچال.", robots: { index: false, follow: false }, alternates: { canonical: "/calorie-data-methodology" } };

export default function CalorieDataMethodologyPage() { return <TrustPage eyebrow="داده‌های کالری" title="روش‌شناسی داده‌های کالری" intro="داده‌های کالری به روش پخت، مواد افزوده، برند و اندازه سرو حساس‌اند؛ این صفحه باید منبع و تاریخ بررسی هر داده را شفاف کند." sections={[{ heading: "منابع و روش محاسبه", body: "TODO: منبع هر داده، روش تبدیل واحد و تاریخ آخرین بررسی را به‌صورت قابل‌ممیزی درج کنید." }, { heading: "روش پخت و برندها", body: "سرخ‌کردن، روغن، سس و تفاوت برندها می‌تواند نتیجه را تغییر دهد؛ اعداد این سایت برآورد عمومی‌اند." }, { heading: "محدودیت و گزارش خطا", body: "برای گزارش مغایرت داده، با yakhchal.app@gmail.com تماس بگیرید. TODO: فرایند رسیدگی و زمان بروزرسانی را مشخص کنید." }]} />; }
