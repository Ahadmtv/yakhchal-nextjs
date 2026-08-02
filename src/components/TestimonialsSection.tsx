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
          description="متن‌ها از صفحه عمومی یخچال در مایکت نقل شده‌اند و تصویر یا هویت تکمیلی برای کاربران ساخته نشده است."
          align="center"
        />
        <div className="testimonials-grid">
          {verifiedTestimonials.map((item) => (
            <figure className="testimonial-card" key={item.author}>
              <Icon name="sparkle" />
              <blockquote>{item.quote}</blockquote>
              <figcaption><strong>{item.author}</strong><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">مشاهده در {item.store}</a></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
