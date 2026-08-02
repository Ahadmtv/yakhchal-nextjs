"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "@/components/smart-fridge-story/smartFridgeStory.module.css";

const SmartFridgeStoryRuntime = dynamic(
  () => import("@/components/smart-fridge-story/SmartFridgeStoryRuntime"),
  {
    ssr: false,
    loading: () => <StoryScenePlaceholder />,
  },
);

function StoryScenePlaceholder() {
  return (
    <div
      className={styles.scene}
      role="img"
      aria-label="نمای داستان یخچال هوشمند؛ تصویر تعاملی هنگام نزدیک‌شدن به این بخش بارگذاری می‌شود"
    />
  );
}

export default function SmartFridgeStoryClient({
  sectionId,
}: Readonly<{ sectionId: string }>) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return shouldLoad ? (
    <SmartFridgeStoryRuntime sectionId={sectionId} />
  ) : (
    <StoryScenePlaceholder />
  );
}
