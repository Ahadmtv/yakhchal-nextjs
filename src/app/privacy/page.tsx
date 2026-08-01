import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";

export const metadata: Metadata = { title: "حریم خصوصی", description: "اطلاعات موجود درباره حریم خصوصی و راه ارتباطی یخچال.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() { return <TrustPage eyebrow="حریم خصوصی" title="حریم خصوصی یخچال" intro="اطلاعات شما فقط برای ارائه تجربه بهتر استفاده می‌شود و اطلاعات شخصی به اشخاص ثالث فروخته نمی‌شود." sections={[{ heading: "مدیریت داده", body: "برای مدیریت یا درخواست حذف داده‌ها با ایمیل yakhchal.app@gmail.com تماس بگیرید." }, { heading: "تکمیل سیاست", body: "جزئیات گردآوری، نگهداری و اشتراک‌گذاری داده‌ها باید توسط مالک سایت پیش از اتکا به این صفحه به‌عنوان سیاست کامل حریم خصوصی تکمیل شود." }]} />; }
