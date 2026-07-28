import Image from "next/image";
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
              aria-label={`مشاهده جزئیات ${feature.title}`}
              className={`feature-card feature-card-${index + 1}`}
            >
              <Image
                src={feature.mainImage}
                alt={feature.title}
                fill
                preload={standalone && index === 0}
                quality={75}
                sizes={index === 0 ? "(max-width: 899px) calc(100vw - 32px), 650px" : "(max-width: 599px) calc(100vw - 32px), (max-width: 899px) 50vw, 390px"}
              />
              <span className="feature-overlay" aria-hidden="true" />
              <span className="feature-card-head"><em>{feature.tags?.[0] || "امکانات یخچال"}</em><small>۰{index + 1}</small></span>
              <span className="feature-card-body">
                <strong>{feature.title}</strong>
                <span className="feature-card-bottom"><span>{feature.description}</span><i aria-hidden="true"><Icon name="arrow" /></i></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
