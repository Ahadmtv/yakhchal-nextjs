import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import { assets } from "@/lib/assets";

const stores = [
  { name: "مایکت", href: "https://myket.ir/app/me.jfrpr.yakhchal", logo: assets.myket, platform: "myket" },
  { name: "کافه‌بازار", href: "https://cafebazaar.ir/app/me.jfrpr.yakhchal", logo: assets.bazaar, platform: "bazaar" },
] as const;

export default function DownloadSection() {
  return (
    <section className="download-section deferred-section" id="download" aria-labelledby="download-title">
      <div className="container">
        <div className="download-card">
          <div className="download-copy">
            <p className="download-badge"><Icon name="android" />ویژه گوشی‌های اندرویدی</p>
            <h2 id="download-title">یخچال را همین حالا همراه خودتان ببرید</h2>
            <p>نصب رایگان، راه‌اندازی سریع و همه ابزارهای لازم برای برنامه غذایی، خرید هوشمند و انتخاب بهترِ هر وعده.</p>
            <ul className="download-benefits">
              {['نصب رایگان','کم‌حجم','رابط کاملاً فارسی'].map((item) => <li key={item}><Icon name="check" />{item}</li>)}
            </ul>
            <div className="store-grid">
              {stores.map((store) => (
                <a className={`store-download-button ${store.platform}`} key={store.name} href={store.href} target="_blank" rel="noopener noreferrer" aria-label={`دریافت یخچال از ${store.name}`}>
                  <span className="store-download-logo">
                    <Image src={store.logo} alt="" width={154} height={46} quality={75} sizes="80px" />
                  </span>
                  <span className="store-download-copy">
                    <small>دانلود رایگان از</small>
                    <strong>{store.name}</strong>
                  </span>
                  <span className="store-download-arrow"><Icon name="arrow" /></span>
                </a>
              ))}
            </div>
          </div>
          <div className="download-visual">
            <div className="download-phone">
              <Image src={assets.appPreview760} alt="نمای اپلیکیشن یخچال" fill quality={75} sizes="(max-width: 599px) 190px, (max-width: 899px) 220px, 230px" />
            </div>
            <FloatCard className="download-float-start" icon="download" small="آماده نصب" strong="سریع و سبک" />
            <FloatCard className="download-float-end" icon="shield" small="حریم خصوصی" strong="داده‌های امن" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatCard({ className, icon, small, strong }: Readonly<{ className: string; icon: IconName; small: string; strong: string }>) {
  return <div className={`download-float ${className}`} aria-hidden="true"><Icon name={icon} /><span><small>{small}</small><strong>{strong}</strong></span></div>;
}
