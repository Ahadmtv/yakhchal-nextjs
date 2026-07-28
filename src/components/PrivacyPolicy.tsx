import Icon from "@/components/Icon";

export default function PrivacyPolicy() {
  return (
    <section className="privacy-section deferred-section" id="privacy" aria-labelledby="privacy-title">
      <div className="container">
        <div className="privacy-card">
          <span className="privacy-icon" aria-hidden="true"><Icon name="shield" /></span>
          <div><p className="eyebrow">اعتماد، بخشی از محصول است</p><h2 id="privacy-title">حریم خصوصی شما را جدی می‌گیریم</h2><p>اطلاعات شما فقط برای ارائه تجربه بهتر استفاده می‌شود. مدیریت یا درخواست حذف داده‌ها در اختیار شماست و اطلاعات شخصی به اشخاص ثالث فروخته نمی‌شود.</p></div>
          <a className="button button-outline" href="mailto:yakhchal.app@gmail.com?subject=درخواست درباره حریم خصوصی"><Icon name="email" />تماس درباره حریم خصوصی</a>
        </div>
      </div>
    </section>
  );
}
