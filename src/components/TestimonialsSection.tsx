import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import { verifiedTestimonials } from "@/data/appStats";

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section deferred-section" aria-labelledby="testimonials-title">
      <div className="container container-narrow">
        <SectionHeading
          eyebrow="نظر کاربران فروشگاه"
          title={<span id="testimonials-title">تجربه‌هایی که واقعاً منتشر شده‌اند</span>}
          description="این‌ها گزیده‌ای از نظرات عمومی صفحه رسمی یخچال در کافه‌بازار و مایکت هستند؛ متن، نام و امتیاز بدون بازنویسی معنایی نقل شده‌اند."
          align="center"
        />
        <div className="testimonials-grid">
          {verifiedTestimonials.map((item) => (
            <figure className="testimonial-card" key={`${item.store}-${item.author}-${item.publishedAt ?? ""}`}>
              <Icon name="sparkle" />
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <span><strong>{item.author}</strong>{item.rating ? <small>{item.rating}</small> : null}{item.publishedAt ? <time>{item.publishedAt}</time> : null}</span>
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">مشاهده در {item.store}<span className="sr-only"> (در پنجره جدید)</span></a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
