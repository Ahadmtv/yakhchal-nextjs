import Image, { getImageProps } from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import HeroTrustBar from "@/components/HeroTrustBar";
import { assets } from "@/lib/assets";

const heroPhoneSizes = "(max-width: 699px) 1px, (max-width: 900px) 210px, 230px";
const { props: heroPhoneImageProps } = getImageProps({
  src: assets.appPreview760,
  alt: "",
  width: 760,
  height: 1516,
  sizes: heroPhoneSizes,
  quality: 72,
});

export default function Hero() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={heroPhoneImageProps.srcSet}
        imageSizes={heroPhoneImageProps.sizes}
        media="(min-width: 700px)"
      />
      <section className="hero" id="product" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="hero-dot" />
            دستیار فارسی آشپزخانه برای اندروید
          </p>
          <h1 id="hero-title">
            با مواد داخل یخچالت، <span>برنامه غذای هفته را بساز</span>
          </h1>
          <p className="hero-lead">
            مواد موجود را ثبت کن؛ یخچال غذای مناسب پیشنهاد می‌دهد، کمبودها را
            به لیست خرید اضافه می‌کند و تاریخ انقضای مواد را به یادت می‌آورد.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary button-large" href="/download" prefetch={false} data-analytics-event="click_hero_primary_cta" data-analytics-source="hero">
              <Icon name="download" />
              نصب رایگان یخچال
            </Link>
            <a className="button button-outline button-large" href="#workflow">
              ببینید چطور کار می‌کند
              <Icon name="arrow" />
            </a>
          </div>
          <HeroTrustBar />
        </div>

        <div className="hero-visual" aria-label="نمایی از اپلیکیشن یخچال">
          <div className="hero-poster-ring" aria-hidden="true" />
          <div className="hero-poster-ring-inner" aria-hidden="true" />
          <div className="hero-ingredient ingredient-tomato" aria-hidden="true">
            <Image
              src={assets.smartFridgeTomato}
              alt=""
              width={180}
              height={180}
              sizes="(max-width: 699px) 76px, 104px"
            />
          </div>
          <div className="hero-ingredient ingredient-herbs" aria-hidden="true">
            <Image
              src={assets.smartFridgeHerbs}
              alt=""
              width={180}
              height={180}
              sizes="(max-width: 699px) 62px, 82px"
            />
          </div>
          <div
            className="hero-ingredient ingredient-peppers"
            aria-hidden="true"
          >
            <Image
              src={assets.smartFridgePeppers}
              alt=""
              width={180}
              height={180}
              sizes="(max-width: 699px) 82px, 116px"
            />
          </div>
          <div className="hero-phone">
            <Image
              src={assets.appPreview760}
              alt="نمای اپلیکیشن یخچال روی گوشی اندرویدی"
              width={760}
              height={1516}
              sizes={heroPhoneSizes}
              quality={72}
              fetchPriority="high"
              className="responsive-image"
            />
          </div>
          <div className="hero-security" aria-hidden="true">
            <Icon name="android" />
            <span>رابط فارسی • انتشار رسمی در دو فروشگاه</span>
            <Icon name="check" />
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
