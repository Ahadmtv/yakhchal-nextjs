import SmartFridgeStoryClient from "@/components/smart-fridge-story/SmartFridgeStoryClient";
import SmartFridgeCopy from "@/components/smart-fridge-story/SmartFridgeCopy";
import styles from "@/components/smart-fridge-story/smartFridgeStory.module.css";

export default function SmartFridgeStory() {
  return (
    <section
      className={styles.story}
      id="workflow"
      aria-labelledby="smart-fridge-title"
      data-active-stage="4"
    >
      <div className={styles.sticky}>
        <div className={`container ${styles.layout}`}>
          <SmartFridgeCopy />
          <SmartFridgeStoryClient sectionId="workflow" />
        </div>
      </div>
    </section>
  );
}
