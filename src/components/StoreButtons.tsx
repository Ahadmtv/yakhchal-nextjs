import Image from "next/image";
import { storeListings } from "@/data/appStats";

type StoreButtonsProps = Readonly<{
  source: string;
  className?: string;
}>;

export default function StoreButtons({ source, className = "" }: StoreButtonsProps) {
  return (
    <div className={`store-buttons ${className}`.trim()}>
      {storeListings.map((store) => (
        <a
          className={`store-button store-button-${store.id}`}
          data-analytics-event={`click_download_${store.id}`}
          data-analytics-source={source}
          data-analytics-store={store.id}
          href={store.trackedUrl}
          key={store.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="store-button-logo" aria-hidden="true">
            <Image src={store.logo} alt="" width={96} height={38} sizes="96px" />
          </span>
          <span><small>دریافت از</small><strong>{store.name}</strong><span className="sr-only"> (در پنجره جدید)</span></span>
        </a>
      ))}
    </div>
  );
}
