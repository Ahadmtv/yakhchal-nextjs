import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";

export const metadata: Metadata = { title: "سیاست تحریریه", description: "چارچوب موردنیاز برای نگارش، منبع‌یابی و اصلاح محتوای یخچال.", robots: { index: false, follow: false }, alternates: { canonical: "/editorial-policy" } };

export default function EditorialPolicyPage() { return <TrustPage eyebrow="شفافیت محتوا" title="سیاست تحریریه" intro="این صفحه، ساختار شفافیت محتوایی را فراهم می‌کند و برای انتشار نهایی به جزئیات واقعی تیم نیاز دارد." sections={[{ heading: "انتخاب موضوع و نگارش", body: "TODO: معیارهای واقعی انتخاب موضوع، نویسنده مسئول و فرایند نگارش را درج کنید." }, { heading: "بررسی منابع", body: "TODO: منابع قابل‌اتکا، شیوه ارزیابی آن‌ها و نقش بازبین علمی را مشخص کنید." }, { heading: "اصلاح خطا و بروزرسانی", body: "TODO: مسیر گزارش خطا، زمان‌بندی پاسخ و سیاست ثبت تاریخ بروزرسانی را مشخص کنید." }, { heading: "استفاده از هوش مصنوعی", body: "TODO: در صورت استفاده، نقش ابزارهای هوش مصنوعی و فرایند بازبینی انسانی را شفاف بیان کنید." }]} />; }
