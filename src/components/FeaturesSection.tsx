import Link from "next/link";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import { features } from "@/data/features";

export default function FeaturesSection({ standalone = false }: Readonly<{ standalone?: boolean }>) {
  return (
    <section className="features-section deferred-section" id="features" aria-labelledby="features-title">
      <div className="container">
        <SectionHeading
          eyebrow="همه‌چیز در یک اپ"
          title={<span id="features-title">هر تصمیم غذایی، ساده‌تر و هوشمندتر</span>}
          description="از انتخاب وعده تا خرید مواد اولیه، ابزارهای یخچال کنار هم طراحی شده‌اند تا زمان کمتری صرف تصمیم‌گیری و زمان بیشتری صرف زندگی کنید."
          align="center"
          level={standalone ? 1 : 2}
        />
        <div className="features-grid">
          {features.map((feature, index) => (
            <Link
              key={feature.slug}
              href={`/features/${feature.slug}`}
              className="feature-card-simple"
            >
              <span className="feature-simple-icon"><Icon name={feature.icon} /></span>
              <span className="feature-simple-number">{new Intl.NumberFormat("fa-IR").format(index + 1)}</span>
              <strong>{feature.shortTitle}</strong>
              <span>{feature.description}</span>
              <i aria-hidden="true">جزئیات ویژگی<Icon name="arrow" /></i>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
