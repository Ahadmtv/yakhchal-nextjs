import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import { assets } from "@/lib/assets";

const stats = [
  { value: "۷٬۰۰۰+", label: "نصب فعال" },
  { value: "۱۰۰٪", label: "فارسی" },
  { value: "رایگان", label: "شروع استفاده" },
] as const;

export default function Hero() {
  return (
    <section className="hero" id="product" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="hero-dot" />
            تغذیه هوشمند، به زبان فارسی
          </p>
          <h1 id="hero-title">
            از «چی بپزم؟» تا <span>برنامه سالم هفته</span>
          </h1>
          <p className="hero-lead">
            یخچال برنامه‌ریزی وعده‌ها، کالری‌شماری، انتخاب دستورغذا و خرید
            روزانه را در یک تجربه ساده کنار هم می‌آورد؛ تا سالم‌تر بخورید و کمتر
            دور بریزید.
          </p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href="#download">
              <Icon name="download" />
              دریافت رایگان یخچال
            </a>
            <a className="button button-outline button-large" href="#features">
              دیدن امکانات
              <Icon name="arrow" />
            </a>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="نمایی از اپلیکیشن یخچال">
          <div className="hero-panel" aria-hidden="true" />
          <InfoCard
            className="info-card-top"
            icon="calendar"
            small="برنامه امروز"
            strong="۴ وعده متعادل"
          />
          <InfoCard
            className="info-card-bottom"
            icon="restaurant"
            small="پیشنهاد هوشمند"
            strong="براساس مواد موجود"
            secondary
          />
          <div className="hero-phone">
            <Image
              src={assets.appPreview760}
              alt="نمای اپلیکیشن یخچال روی گوشی اندرویدی"
              width={760}
              height={1516}
              sizes="(max-width: 600px) 205px, (max-width: 900px) 240px, 250px"
              quality={85}
              preload
              className="responsive-image"
            />
          </div>
          <div className="hero-security" aria-hidden="true">
            <Icon name="shield" />
            <span>امن و بدون تبلیغ مزاحم</span>
            <Icon name="check" />
          </div>
          <div className="hero-sparkle" aria-hidden="true">
            <Icon name="sparkle" />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  className,
  icon,
  small,
  strong,
  secondary = false,
}: Readonly<{
  className: string;
  icon: IconName;
  small: string;
  strong: string;
  secondary?: boolean;
}>) {
  return (
    <div
      className={`hero-info-card ${className}${secondary ? " secondary" : ""}`}
      aria-hidden="true"
    >
      <span className="hero-info-icon">
        <Icon name={icon} />
      </span>
      <span>
        <small>{small}</small>
        <strong>{strong}</strong>
      </span>
    </div>
  );
}
