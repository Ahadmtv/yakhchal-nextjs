import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import DownloadQrCode from "@/components/DownloadQrCode";
import StoreButtons from "@/components/StoreButtons";
import { latestVerifiedRelease } from "@/data/appStats";
import { assets } from "@/lib/assets";

export default function DownloadSection() {
  return (
    <section className="download-section deferred-section" id="download" aria-labelledby="download-title">
      <div className="container">
        <div className="download-card">
          <div className="download-copy">
            <p className="download-badge"><Icon name="android" />ویژه گوشی‌های اندرویدی</p>
            <h2 id="download-title">یخچال را همین حالا همراه خودتان ببرید</h2>
            <p>برای مدیریت موجودی، پیشنهاد غذا، برنامه هفتگی و فهرست خرید، فروشگاه موردنظر خود را انتخاب کنید.</p>
            <ul className="download-benefits">
              {["رابط فارسی", `آخرین نسخه تأییدشده ${latestVerifiedRelease.versionLabel}`, "انتشار رسمی برای اندروید"].map((item) => <li key={item}><Icon name="check" />{item}</li>)}
            </ul>
            <StoreButtons source="home_download_section" />
            <Link className="text-link download-details-link" href="/download">جزئیات نسخه و راهنمای نصب<Icon name="arrow" /></Link>
          </div>
          <div className="download-visual">
            <div className="download-phone">
              <Image src={assets.appPreview760} alt="نمای اپلیکیشن یخچال" fill quality={75} sizes="(max-width: 599px) 190px, (max-width: 899px) 220px, 230px" />
            </div>
            <DownloadQrCode />
          </div>
        </div>
      </div>
    </section>
  );
}
