import Image from "next/image";
import Icon from "@/components/Icon";
import type { IngredientSpec } from "@/components/smart-fridge-story/types";
import styles from "@/components/smart-fridge-story/smartFridgeStory.module.css";

const ingredients: ReadonlyArray<IngredientSpec> = [
  {
    id: "tomato",
    src: "/assets/smart-fridge/tomato-cluster.webp",
    label: "گوجه‌فرنگی",
    start: [-0.41, -0.3],
    end: [0.105, -0.175],
    mobileStart: [-0.39, -0.29],
    mobileEnd: [-0.055, -0.165],
    range: [0.1, 0.19],
    startScale: 1.08,
    endScale: 0.64,
    startRotation: -12,
    endRotation: 2,
    arc: 0.08,
    delay: 0,
  },
  {
    id: "herbs",
    src: "/assets/smart-fridge/fresh-herb-bunch.webp",
    label: "سبزی تازه",
    start: [-0.38, 0.045],
    end: [0.205, -0.17],
    mobileStart: [-0.4, 0.03],
    mobileEnd: [0.055, -0.16],
    range: [0.12, 0.22],
    startScale: 0.96,
    endScale: 0.59,
    startRotation: 18,
    endRotation: -7,
    arc: 0.105,
    delay: 0.016,
  },
  {
    id: "eggs",
    src: "/assets/smart-fridge/brown-eggs.webp",
    label: "تخم‌مرغ",
    start: [-0.25, 0.335],
    end: [0.105, 0.005],
    mobileStart: [-0.28, 0.33],
    mobileEnd: [-0.055, 0.005],
    range: [0.14, 0.25],
    startScale: 1.02,
    endScale: 0.58,
    startRotation: 11,
    endRotation: -3,
    arc: 0.12,
    delay: 0.032,
  },
  {
    id: "chicken",
    src: "/assets/smart-fridge/raw-chicken-breast-plate.webp",
    label: "سینه مرغ",
    start: [0.43, -0.31],
    end: [0.215, 0.015],
    mobileStart: [0.38, -0.3],
    mobileEnd: [0.055, 0.015],
    range: [0.16, 0.27],
    startScale: 1.02,
    endScale: 0.58,
    startRotation: -14,
    endRotation: 0,
    arc: 0.09,
    delay: 0.048,
  },
  {
    id: "rice",
    src: "/assets/smart-fridge/rice-bowl.webp",
    label: "برنج",
    start: [0.43, 0.075],
    end: [0.105, 0.195],
    mobileStart: [0.4, 0.08],
    mobileEnd: [-0.055, 0.19],
    range: [0.18, 0.295],
    startScale: 0.98,
    endScale: 0.55,
    startRotation: 9,
    endRotation: -2,
    arc: 0.095,
    delay: 0.064,
  },
  {
    id: "peppers",
    src: "/assets/smart-fridge/yellow-red-bell-peppers.webp",
    label: "فلفل دلمه‌ای",
    start: [0.35, 0.34],
    end: [0.215, 0.195],
    mobileStart: [0.34, 0.34],
    mobileEnd: [0.055, 0.19],
    range: [0.2, 0.32],
    startScale: 1.06,
    endScale: 0.56,
    startRotation: -10,
    endRotation: 4,
    arc: 0.115,
    delay: 0.08,
  },
];

const weeklyMeals = [
  ["شنبه", "مرغ و سبزیجات"],
  ["یکشنبه", "عدس‌پلو سبک"],
  ["دوشنبه", "سالاد مدیترانه"],
] as const;

const shoppingItems = ["ماست یونانی", "لیموی تازه", "نان سبوس‌دار"] as const;

export default function SmartFridgeScene() {
  return (
    <div
      className={styles.scene}
      data-story-canvas
      role="img"
      aria-label="نمای تصویری تبدیل مواد موجود به پیشنهاد غذا، برنامه هفتگی و فهرست خرید"
    >
      <div className={styles.sceneGlow} aria-hidden="true" />
      <div className={styles.gridTexture} aria-hidden="true" />

      <div className={styles.recognitionStatus}>
        <span />
        <Icon name="sparkle" />
        <span>
          <small>موجودی به‌روز شد</small>
          <strong>۶ ماده شناسایی شد</strong>
        </span>
        <Icon name="check" />
      </div>

      <div className={styles.fridge} aria-hidden="true">
        <div className={styles.fridgeShadow} />
        <div className={styles.fridgeShell}>
          <span className={styles.fridgeTop} />
          <div className={styles.interior}>
            <span className={styles.interiorLight} />
            <span className={styles.coolingVent} />
            <span className={`${styles.shelf} ${styles.shelfTop}`} />
            <span className={`${styles.shelf} ${styles.shelfMiddle}`} />
            <span className={`${styles.shelf} ${styles.shelfBottom}`} />
            <span className={styles.drawer}>
              <small>تازه‌خوری</small>
            </span>
          </div>
          <span className={styles.frameTop} />
          <span className={styles.frameSideStart} />
          <span className={styles.frameSideEnd} />
          <span className={styles.frameBottom} />
          <span className={styles.fridgeFootStart} />
          <span className={styles.fridgeFootEnd} />
        </div>

        <div className={styles.door}>
          <div className={styles.doorFront}>
            <span className={styles.doorSheen} />
            <span className={styles.doorBrand}>
              <Image
                src="/assets/brand/logo-80.webp"
                alt=""
                width={80}
                height={80}
                quality={75}
              />
              <strong>یخچال</strong>
              <small>زندگی سالم، ساده‌تر</small>
            </span>
            <span className={styles.doorHandle} />
            <span className={styles.doorDisplay}>
              <small>امروز</small>
              <strong>۳°</strong>
            </span>
          </div>
          <div className={styles.doorInner}>
            <span className={styles.doorBin} />
            <span className={`${styles.doorBin} ${styles.doorBinMiddle}`} />
            <span className={`${styles.doorBin} ${styles.doorBinBottom}`} />
          </div>
        </div>
      </div>

      <div className={styles.ingredients} aria-hidden="true">
        {ingredients.map((ingredient) => (
          <span
            className={styles.ingredient}
            data-ingredient
            data-ingredient-id={ingredient.id}
            data-start-x={ingredient.start[0]}
            data-start-y={ingredient.start[1]}
            data-end-x={ingredient.end[0]}
            data-end-y={ingredient.end[1]}
            data-mobile-start-x={ingredient.mobileStart[0]}
            data-mobile-start-y={ingredient.mobileStart[1]}
            data-mobile-end-x={ingredient.mobileEnd[0]}
            data-mobile-end-y={ingredient.mobileEnd[1]}
            data-enter-start={ingredient.range[0]}
            data-enter-end={ingredient.range[1]}
            data-start-scale={ingredient.startScale}
            data-end-scale={ingredient.endScale}
            data-start-rotation={ingredient.startRotation}
            data-end-rotation={ingredient.endRotation}
            data-arc={ingredient.arc}
            data-delay={ingredient.delay}
            key={ingredient.id}
          >
            <Image
              src={ingredient.src}
              alt=""
              fill
              quality={75}
              sizes="(max-width: 899px) 72px, 110px"
            />
            <small>{ingredient.label}</small>
          </span>
        ))}
      </div>

      <article className={styles.recipeCard}>
        <div className={styles.cardHeading}>
          <span className={styles.cardIcon}><Icon name="sparkle" /></span>
          <span>
            <small>پیشنهاد امروز</small>
            <strong>خوراک مرغ و سبزیجات</strong>
          </span>
        </div>
        <p>براساس مواد موجود در یخچال شما</p>
        <div className={styles.recipeMeta}>
          <span><Icon name="clock" /> آماده در ۳۰ دقیقه</span>
          <span>۵۴۰ کالری</span>
        </div>
        <div className={styles.recipeAction}>
          <Icon name="add" />
          <span>افزودن به برنامه هفته</span>
          <Icon name="arrow" />
        </div>
      </article>

      <article className={styles.weeklyCard}>
        <div className={styles.supportHeading}>
          <span><Icon name="calendar" /></span>
          <div><small>برنامه من</small><strong>این هفته</strong></div>
          <em><Icon name="check" /> ثبت شد</em>
        </div>
        <div className={styles.weeklyRows}>
          {weeklyMeals.map(([day, meal], index) => (
            <div className={styles.weeklyRow} key={day}>
              <span>{index + 1}</span>
              <p><small>{day}</small><strong>{meal}</strong></p>
            </div>
          ))}
        </div>
      </article>

      <article className={styles.shoppingCard}>
        <div className={styles.supportHeading}>
          <span><Icon name="shopping" /></span>
          <div><small>فقط کمبودها</small><strong>فهرست خرید</strong></div>
          <em>۳ قلم</em>
        </div>
        <ul>
          {shoppingItems.map((item) => (
            <li key={item}>
              <span><Icon name="check" /></span>
              {item}
            </li>
          ))}
        </ul>
      </article>

      <div className={styles.finalMessage}>
        <span className={styles.finalMark}><Icon name="sparkle" /></span>
        <p>کمتر تصمیم بگیرید</p>
        <h3>بهتر بخورید، کمتر دور بریزید</h3>
        <span className={styles.englishLine}>Eat better. Waste less.</span>
        <a className="button button-primary" href="#download">
          برنامه این هفته‌ام را بساز
          <Icon name="arrow" />
        </a>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span />
        <small>برای دیدن مسیر، اسکرول کنید</small>
      </div>
    </div>
  );
}
