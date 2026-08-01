import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";

export const metadata: Metadata = { title: "شرایط استفاده", description: "صفحه شرایط استفاده یخچال در انتظار تکمیل اطلاعات رسمی.", robots: { index: false, follow: false }, alternates: { canonical: "/terms" } };

export default function TermsPage() { return <TrustPage eyebrow="اطلاعات حقوقی" title="شرایط استفاده" intro="این صفحه برای درج شرایط رسمی استفاده از خدمات یخچال آماده شده است." sections={[{ heading: "وضعیت فعلی", body: "TODO: مالک سایت باید متن حقوقی تأییدشده شامل شرایط استفاده، مسئولیت‌ها، محدودیت‌ها و راه حل اختلاف را ارائه و جایگزین کند." }]} />; }
