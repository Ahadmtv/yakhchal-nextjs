import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import { faqs } from "@/data/faqs";

export default function FaqSection() {
  return (
    <section className="faq-section deferred-section" id="faq" aria-labelledby="faq-title">
      <div className="container container-narrow">
        <SectionHeading
          eyebrow="پاسخ کوتاه و شفاف"
          title={<span id="faq-title">سؤال‌هایی که شاید برای شما هم پیش آمده</span>}
          description="اگر پاسخ پرسش‌تان اینجا نیست، از بخش تماس با ما پیام بدهید."
          align="center"
        />
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details className="faq-item" key={item.q} open={index === 0} data-analytics-event="open_faq" data-analytics-source="home_faq">
              <summary><span><b>۰{index + 1}</b>{item.q}</span><i aria-hidden="true"><Icon name="add" /></i></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
