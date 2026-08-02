import { latestStoreVerification, storeListings } from "@/data/appStats";

export default function HeroTrustBar() {
  return (
    <div className="hero-trust" aria-label="اطلاعات تأییدشده فروشگاه‌ها">
      {storeListings.map((store) => (
        <a href={store.url} key={store.id} target="_blank" rel="noopener noreferrer">
          <span>{store.name}</span>
          <strong>{store.rating}</strong>
          <span className="sr-only"> (در پنجره جدید)</span>
        </a>
      ))}
      <p>بررسی آمار: <time dateTime={latestStoreVerification.date}>{latestStoreVerification.label}</time></p>
    </div>
  );
}
