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
  versionLabel: string;
  releaseDate: string;
  releaseDateLabel: string;
  size: string;
  verifiedAt: string;
  verifiedAtLabel: string;
}>;

export type VerifiedTestimonial = Readonly<{
  quote: string;
  author: string;
  store: "مایکت" | "کافه‌بازار";
  sourceUrl: string;
  rating?: string;
  publishedAt?: string;
  verifiedAt: string;
}>;

// Public store metadata was checked against both official listings on 2026-08-02.
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
    version: "1.4.1",
    versionLabel: "۱.۴.۱",
    releaseDate: "2026-06-28",
    releaseDateLabel: "۷ تیر ۱۴۰۵",
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
    metricValue: "۶.۸ هزار",
    rating: "۴.۹ از ۵",
    ratingCount: "۷۵ رأی",
    version: "1.4.1",
    versionLabel: "۱.۴.۱",
    releaseDate: "2026-06-27",
    releaseDateLabel: "۶ تیر ۱۴۰۵",
    size: "۲۴ مگابایت",
    verifiedAt: "2026-08-02",
    verifiedAtLabel: "۱۱ مرداد ۱۴۰۵",
  },
] as const;

export function getStore(id: StoreId): StoreListing {
  const store = storeListings.find((item) => item.id === id);
  if (!store) throw new Error(`Unknown store: ${id}`);
  return store;
}

const latestReleaseDate = storeListings.reduce(
  (latest, store) => store.releaseDate > latest ? store.releaseDate : latest,
  "",
);
const latestReleaseStore = storeListings.find((store) => store.releaseDate === latestReleaseDate);
if (!latestReleaseStore) throw new Error("No verified store release is available");

const latestVerificationDate = storeListings.reduce(
  (latest, store) => store.verifiedAt > latest ? store.verifiedAt : latest,
  "",
);
const latestVerificationStore = storeListings.find((store) => store.verifiedAt === latestVerificationDate);
if (!latestVerificationStore) throw new Error("No store verification date is available");

export const latestStoreVerification = {
  date: latestVerificationStore.verifiedAt,
  label: latestVerificationStore.verifiedAtLabel,
} as const;

const releaseChanges: Readonly<Record<string, readonly string[]>> = {
  "1.4.1": [
    "انتقال مواد خریداری‌شده میان لیست خرید و موجودی یخچال",
    "افزوده‌شدن قابلیت «سریع‌پز» برای پیشنهاد غذا از مواد انتخابی",
    "بهبود رابط کاربری لیست خرید",
  ],
};

export const latestVerifiedRelease = {
  version: latestReleaseStore.version,
  versionLabel: latestReleaseStore.versionLabel,
  date: latestReleaseStore.releaseDate,
  dateLabel: latestReleaseStore.releaseDateLabel,
  store: latestReleaseStore.name,
  storeId: latestReleaseStore.id,
  sourceUrl: latestReleaseStore.url,
  changes: releaseChanges[latestReleaseStore.version] ?? [],
} as const;

const myket = getStore("myket");
const bazaar = getStore("bazaar");

export const verifiedTestimonials = [
  {
    quote: "من چند وقته نصبش کردم خیلی عالیه، اون قابلیت که تاریخ انقضای مواد داخل یخچال و فریزر رو یادآوری می کنه خیلی به درد بخوره. دیگه کمتر چیزی دور ریخته میشه، خدا قوت به سازنده اش",
    author: "میجان سعدآبادی",
    store: "کافه‌بازار",
    sourceUrl: bazaar.url,
    rating: "۵ از ۵",
    publishedAt: "۱۴۰۵/۰۵/۰۳",
    verifiedAt: "2026-08-02",
  },
  {
    quote: "کار باهاش راحته و محیط برنامه مرتب و زیباست، فقط کاش قسمت جدیدترین دستور پخت ها هم اضافه بشه که اخرین اپدیتها رو داشته باشم. و اینکه قسمت برنامه هفتگی، بتونه تقویمی و ماهیانه باشه که مجبور نباشم هر هفته پاک کنم از اول بنویسم",
    author: "پارمیس",
    store: "کافه‌بازار",
    sourceUrl: bazaar.url,
    rating: "۵ از ۵",
    publishedAt: "۱۴۰۴/۱۱/۱۷",
    verifiedAt: "2026-08-02",
  },
  {
    quote: "بهترین برنامه است واقعا، گرافیک عالی، کاربری آسان، تنوع غذاها و مهمترین نکته با اینترنت ملی خوب بالا میاد، امیدوارم همینطور پر قدرت ادامه داشته باشه، موفق باشید💐",
    author: "مختار عبودی",
    store: "کافه‌بازار",
    sourceUrl: bazaar.url,
    rating: "۵ از ۵",
    publishedAt: "۱۴۰۵/۰۱/۱۷",
    verifiedAt: "2026-08-02",
  },
  {
    quote: "انصافا آفرین، واقعا جالبه و مورد نیاز بود، پیشنهادغذا براساس مواد در یخچال فوق العاده هست",
    author: "alla1",
    store: "کافه‌بازار",
    sourceUrl: bazaar.url,
    rating: "۵ از ۵",
    publishedAt: "۱۴۰۵/۰۱/۲۴",
    verifiedAt: "2026-08-02",
  },
  {
    quote: "از بخش برنامه غذایی هفتگی برنامه یک هفته رو تنظیم کردم و لیست خرید برام تهیه کرد که جالب بود. 😍 ممنون از ناشر این برنامه⭐️⭐️⭐️⭐️⭐️",
    author: "mary",
    store: "کافه‌بازار",
    sourceUrl: bazaar.url,
    rating: "۵ از ۵",
    publishedAt: "۱۴۰۴/۰۷/۰۴",
    verifiedAt: "2026-08-02",
  },
  {
    quote: "چقدر خوب که میشه تنظیم کرد برا چند نفر غذا درست کنم ممنون🙏",
    author: "Heydarabadi",
    store: "کافه‌بازار",
    sourceUrl: bazaar.url,
    rating: "۵ از ۵",
    publishedAt: "۱۴۰۴/۰۷/۱۷",
    verifiedAt: "2026-08-02",
  },
  {
    quote: "بسیار عالی و کاربردی به ویژه برای خانم های شاغل.",
    author: "sahebe",
    store: "مایکت",
    sourceUrl: myket.url,
    rating: "۵ از ۵",
    publishedAt: "۱۳ مهر ۱۴۰۴",
    verifiedAt: "2026-08-02",
  },
] as const satisfies readonly VerifiedTestimonial[];
