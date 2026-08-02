import Icon from "@/components/Icon";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <section className="privacy-section deferred-section" id="privacy" aria-labelledby="privacy-title">
      <div className="container">
        <div className="privacy-card">
          <span className="privacy-icon" aria-hidden="true"><Icon name="shield" /></span>
          <div><p className="eyebrow">اعتماد، بخشی از محصول است</p><h2 id="privacy-title">داده‌های وب‌سایت شفاف و محدودند</h2><p>وب‌سایت حساب کاربری یا ردیاب تبلیغاتی ندارد. ورودی BMI موقت است و فهرست کالری فقط در مرورگر شما می‌ماند؛ جزئیات و دامنه نسخه اندرویدی را جداگانه توضیح داده‌ایم.</p></div>
          <Link className="button button-outline" href="/privacy"><Icon name="shield" />مطالعه حریم خصوصی</Link>
        </div>
      </div>
    </section>
  );
}
