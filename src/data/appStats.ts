export type StoreId = "myket" | "bazaar";

export type StoreListing = Readonly<{
  id: StoreId;
  name: string;
  url: string;
  trackedUrl: string;
  logo: string;
  metricLabel: string;
  metricValue: string;
  rating: string;
  ratingCount: string;
  version: string;
  releaseDate: string;
  size: string;
  verifiedAt: string;
  verifiedAtLabel: string;
}>;

// Store metadata was checked against the public listings on 2026-08-02.
// Keep downloads and installs separate: the stores use different metric definitions.
export const storeListings: readonly StoreListing[] = [
  {
    id: "myket",
    name: "مایکت",
    url: "https://myket.ir/app/me.jfrpr.yakhchal",
    trackedUrl: "https://myket.ir/app/me.jfrpr.yakhchal?utm_source=yakhchalapp.ir&utm_medium=referral&utm_campaign=app_download&utm_content=myket",
    logo: "/assets/stores/myket-logo.svg",
    metricLabel: "دانلود",
    metricValue: "۲ هزار",
    rating: "۴.۹ از ۵",
    ratingCount: "۱۵ نظر",
    version: "۱.۴.۱",
    releaseDate: "۷ تیر ۱۴۰۵",
    size: "۲۶ مگابایت",
    verifiedAt: "2026-08-02",
    verifiedAtLabel: "۱۱ مرداد ۱۴۰۵",
  },
  {
    id: "bazaar",
    name: "کافه‌بازار",
    url: "https://cafebazaar.ir/app/me.jfrpr.yakhchal",
    trackedUrl: "https://cafebazaar.ir/app/me.jfrpr.yakhchal?utm_source=yakhchalapp.ir&utm_medium=referral&utm_campaign=app_download&utm_content=bazaar",
    logo: "/assets/stores/cafebazaar-logo.png",
    metricLabel: "نصب",
    metricValue: "۳.۲ هزار",
    rating: "۵ از ۵",
    ratingCount: "۶۱ رأی",
    version: "۱.۲.۰",
    releaseDate: "۸ آذر ۱۴۰۴",
    size: "۲۲ مگابایت",
    verifiedAt: "2026-08-02",
    verifiedAtLabel: "۱۱ مرداد ۱۴۰۵",
  },
] as const;

export const latestVerifiedRelease = {
  version: "۱.۴.۱",
  date: "۷ تیر ۱۴۰۵",
  store: "مایکت",
  sourceUrl: storeListings[0].url,
  changes: [
    "انتقال مواد خریداری‌شده میان لیست خرید و موجودی یخچال",
    "افزوده‌شدن قابلیت «سریع‌پز» برای پیشنهاد غذا از مواد انتخابی",
    "بهبود رابط کاربری لیست خرید",
  ],
} as const;

export const verifiedTestimonials = [
  {
    quote: "بسیار عالی و کاربردی، به‌ویژه برای خانم‌های شاغل.",
    author: "sahebe",
    store: "مایکت",
    sourceUrl: storeListings[0].url,
  },
  {
    quote: "مفید و کاربردی",
    author: "حسین",
    store: "مایکت",
    sourceUrl: storeListings[0].url,
  },
] as const;

export function getStore(id: StoreId): StoreListing {
  const store = storeListings.find((item) => item.id === id);
  if (!store) throw new Error(`Unknown store: ${id}`);
  return store;
}
