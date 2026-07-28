import type { StoryStage } from "@/components/smart-fridge-story/types";
import styles from "@/components/smart-fridge-story/smartFridgeStory.module.css";

const stages: ReadonlyArray<StoryStage> = [
  {
    number: "۰۱",
    title: "مواد موجود را آماده کنید",
    description: "مواد ساده‌ای که همین حالا در خانه دارید، نقطه شروع یک وعده بهترند.",
  },
  {
    number: "۰۲",
    title: "یخچال آن‌ها را می‌شناسد",
    description: "هر ماده در جای خودش قرار می‌گیرد و موجودی شما یک‌جا ثبت می‌شود.",
  },
  {
    number: "۰۳",
    title: "پیشنهاد مناسب شکل می‌گیرد",
    description: "یک دستور سریع و متعادل، براساس همان مواد موجود پیشنهاد می‌شود.",
  },
  {
    number: "۰۴",
    title: "هفته و خریدتان کامل می‌شود",
    description: "وعده به برنامه می‌رود و فقط مواد کمبود به فهرست خرید اضافه می‌شوند.",
  },
  {
    number: "۰۵",
    title: "کمتر تصمیم، دورریز کمتر",
    description: "یک مسیر ساده از یخچال خانه تا برنامه‌ای که واقعاً قابل اجراست.",
  },
];

export default function SmartFridgeCopy() {
  return (
    <div className={styles.copy}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>از مواد موجود تا برنامه هفته</p>
        <h2 id="smart-fridge-title">هر چیزی در یخچال، شروع یک وعده بهتر است</h2>
        <p>
          یخچال مواد موجود را می‌شناسد، غذای مناسب را پیشنهاد می‌دهد و برنامه و
          خرید هفته را بی‌دردسر کنار هم می‌چیند.
        </p>
      </div>

      <ol className={styles.stageList} aria-label="مراحل تجربه هوشمند یخچال">
        {stages.map((stage, index) => (
          <li className={styles.stage} data-stage-index={index} key={stage.number}>
            <span className={styles.stageNumber}>{stage.number}</span>
            <span>
              <strong>{stage.title}</strong>
              <small>{stage.description}</small>
            </span>
          </li>
        ))}
      </ol>

      <div className={styles.progressRail} aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
