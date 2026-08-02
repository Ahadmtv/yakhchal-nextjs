import { storeListings } from "@/data/appStats";

export default function HeroTrustBar() {
  return (
    <div className="hero-trust" aria-label="اطلاعات تأییدشده فروشگاه‌ها">
      {storeListings.map((store) => (
        <a href={store.url} key={store.id} target="_blank" rel="noopener noreferrer">
          <span>{store.name}</span>
          <strong>{store.rating}</strong>
          <small>{store.ratingCount}</small>
        </a>
      ))}
      <p>بررسی آمار: <time dateTime={storeListings[0].verifiedAt}>{storeListings[0].verifiedAtLabel}</time></p>
    </div>
  );
}
