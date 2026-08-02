import Link from "next/link";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import { latestVerifiedRelease } from "@/data/appStats";

export default function ProductUpdateSection() {
  return (
    <section className="product-update-section deferred-section" aria-labelledby="product-update-title">
      <div className="container container-narrow">
        <SectionHeading
          eyebrow="آخرین نسخه تأییدشده"
          title={<span id="product-update-title">یخچال همچنان در حال بهترشدن است</span>}
          description={`نسخه ${latestVerifiedRelease.versionLabel} در ${latestVerifiedRelease.dateLabel} در ${latestVerifiedRelease.store} ثبت شده است.`}
          align="center"
        />
        <div className="release-card">
          <div className="release-version"><span>نسخه</span><strong>{latestVerifiedRelease.versionLabel}</strong><time dateTime={latestVerifiedRelease.date}>{latestVerifiedRelease.dateLabel}</time></div>
          <ul>{latestVerifiedRelease.changes.map((change) => <li key={change}><Icon name="check" />{change}</li>)}</ul>
          <div className="release-actions">
            <a className="text-link" href={latestVerifiedRelease.sourceUrl} target="_blank" rel="noopener noreferrer">مشاهده منبع انتشار<span className="sr-only"> (در پنجره جدید)</span><Icon name="external" /></a>
            <Link className="button button-primary" href="/download">نصب نسخه جدید</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
