import Icon, { type IconName } from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

const items: ReadonlyArray<{ title: string; label: string; href: string; icon: IconName; external?: boolean }> = [
  { title: "ایمیل", label: "yakhchal.app@gmail.com", href: "mailto:yakhchal.app@gmail.com", icon: "email" },
  { title: "اینستاگرام", label: "@yakhchal.app", href: "https://instagram.com/yakhchal.app", icon: "instagram", external: true },
  { title: "لینکدین", label: "Yakhchal", href: "https://www.linkedin.com/company/yakhchal", icon: "linkedin", external: true },
];

export default function ContactSection() {
  return (
    <section className="contact-section deferred-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <SectionHeading
          eyebrow="ارتباط مستقیم"
          title={<span id="contact-title">پیشنهاد یا سؤالی دارید؟</span>}
          description="پیام شما مستقیم به تیم یخچال می‌رسد. برای پشتیبانی، همکاری یا پیشنهاد بهبود محصول از یکی از راه‌های روبه‌رو استفاده کنید."
        />
        <div className="contact-list">
          {items.map((item) => (
            <a className="contact-item" key={item.title} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} data-analytics-event="click_support" data-analytics-source={item.title}>
              <span className="contact-icon"><Icon name={item.icon} /></span>
              <span><small>{item.title}</small><strong>{item.label}</strong>{item.external ? <span className="sr-only"> (در پنجره جدید)</span> : null}</span>
              <Icon className="contact-arrow" name={item.external ? "external" : "arrow"} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
