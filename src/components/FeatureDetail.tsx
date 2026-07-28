import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { Feature } from "@/data/features";

export default function FeatureDetail({ feature }: Readonly<{ feature: Feature }>) {
  return (
    <article className="detail-page feature-detail">
      <div className="container">
        <div className="detail-topline"><Link className="text-link" href="/features"><Icon name="arrow" />بازگشت به ویژگی‌ها</Link><span className="tag">ویژگی‌ها</span></div>
        <h1>{feature.title}</h1>
        <p className="detail-lead">{feature.description}</p>
        <div className="detail-tags">{feature.tags?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <div className="feature-detail-grid">
          <div className="feature-detail-copy">
            <p>{feature.longDescription}</p>
            <ul>{feature.highlights?.map((highlight) => <li key={highlight}><Icon name="check" />{highlight}</li>)}</ul>
          </div>
          <div className="feature-mockup-wrap">
            <div className="feature-mockup"><Image src={feature.mockupImage} alt={`نمای موبایل ${feature.title}`} fill preload quality={85} sizes="(max-width: 599px) 230px, (max-width: 899px) 280px, 320px" /></div>
          </div>
        </div>
      </div>
    </article>
  );
}
