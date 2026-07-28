import type { CSSProperties } from "react";
import SmartFridgeStoryClient from "@/components/smart-fridge-story/SmartFridgeStoryClient";
import SmartFridgeCopy from "@/components/smart-fridge-story/SmartFridgeCopy";
import SmartFridgeScene from "@/components/smart-fridge-story/SmartFridgeScene";
import styles from "@/components/smart-fridge-story/smartFridgeStory.module.css";

const staticFinalVariables = {
  "--story-progress": "1",
  "--recognized": "1",
  "--recipe-opacity": "1",
  "--plan-opacity": "1",
  "--support-opacity": "1",
  "--shopping-opacity": "1",
  "--recipe-shift-x": "0px",
  "--recipe-shift-y": "0px",
  "--recipe-scale": "1",
  "--door-close": "1",
  "--door-angle": "0deg",
  "--door-front-opacity": "1",
  "--door-inner-opacity": "0",
  "--interior-opacity": ".14",
  "--final-opacity": "1",
  "--final-shift": "0px",
} as CSSProperties;

export default function SmartFridgeStory() {
  return (
    <section
      className={styles.story}
      id="workflow"
      aria-labelledby="smart-fridge-title"
      data-active-stage="4"
      style={staticFinalVariables}
    >
      <SmartFridgeStoryClient sectionId="workflow" />
      <div className={styles.sticky}>
        <div className={`container ${styles.layout}`}>
          <SmartFridgeCopy />
          <SmartFridgeScene />
        </div>
      </div>
    </section>
  );
}
