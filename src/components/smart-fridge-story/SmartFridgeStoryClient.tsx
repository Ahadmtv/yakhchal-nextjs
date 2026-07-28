"use client";

import { useEffect } from "react";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

const rangeProgress = (progress: number, start: number, end: number) =>
  clamp((progress - start) / (end - start));

const smoothstep = (value: number) => value * value * (3 - 2 * value);

const lerp = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

type IngredientNode = HTMLElement & {
  dataset: DOMStringMap & {
    startX: string;
    startY: string;
    endX: string;
    endY: string;
    mobileStartX: string;
    mobileStartY: string;
    mobileEndX: string;
    mobileEndY: string;
    enterStart: string;
    enterEnd: string;
    startScale: string;
    endScale: string;
    startRotation: string;
    endRotation: string;
    arc: string;
    delay: string;
  };
};

type IngredientMotion = Readonly<{
  node: IngredientNode;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  mobileStartX: number;
  mobileStartY: number;
  mobileEndX: number;
  mobileEndY: number;
  enterStart: number;
  enterEnd: number;
  startScale: number;
  endScale: number;
  startRotation: number;
  endRotation: number;
  arc: number;
  delay: number;
}>;

function readNumber(value: string | undefined, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function stageForProgress(progress: number) {
  if (progress < 0.18) return 0;
  if (progress < 0.42) return 1;
  if (progress < 0.6) return 2;
  if (progress < 0.79) return 3;
  return 4;
}

export default function SmartFridgeStoryClient({
  sectionId,
}: Readonly<{ sectionId: string }>) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    const canvas = section?.querySelector<HTMLElement>("[data-story-canvas]");

    if (!section || !canvas) return;

    const ingredientMotions: IngredientMotion[] = Array.from(
      section.querySelectorAll<IngredientNode>("[data-ingredient]"),
      (node) => ({
        node,
        startX: readNumber(node.dataset.startX),
        startY: readNumber(node.dataset.startY),
        endX: readNumber(node.dataset.endX),
        endY: readNumber(node.dataset.endY),
        mobileStartX: readNumber(node.dataset.mobileStartX),
        mobileStartY: readNumber(node.dataset.mobileStartY),
        mobileEndX: readNumber(node.dataset.mobileEndX),
        mobileEndY: readNumber(node.dataset.mobileEndY),
        enterStart: readNumber(node.dataset.enterStart, 0.18),
        enterEnd: readNumber(node.dataset.enterEnd, 0.46),
        startScale: readNumber(node.dataset.startScale, 1),
        endScale: readNumber(node.dataset.endScale, 0.62),
        startRotation: readNumber(node.dataset.startRotation),
        endRotation: readNumber(node.dataset.endRotation),
        arc: readNumber(node.dataset.arc, 0.08),
        delay: readNumber(node.dataset.delay),
      }),
    );

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frame = 0;
    let isNearSection = false;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    let sectionHeight = section.offsetHeight;
    let viewportHeight = window.innerHeight;
    let compact = window.innerWidth < 900;
    let previousProgress = -1;
    let previousStage = -1;

    section.dataset.enhanced = "true";

    const setStoryVariables = (progress: number) => {
      const recognized = smoothstep(rangeProgress(progress, 0.37, 0.5));
      const recipeReveal = smoothstep(rangeProgress(progress, 0.41, 0.55));
      const planReveal = smoothstep(rangeProgress(progress, 0.57, 0.7));
      const shoppingReveal = smoothstep(rangeProgress(progress, 0.63, 0.78));
      const recipeTransfer = smoothstep(rangeProgress(progress, 0.58, 0.75));
      const cardsExit = smoothstep(rangeProgress(progress, 0.77, 0.9));
      const doorClose = smoothstep(rangeProgress(progress, 0.78, 0.96));
      const finalReveal = smoothstep(rangeProgress(progress, 0.87, 0.98));
      const ingredientAppear = smoothstep(rangeProgress(progress, 0.01, 0.14));

      section.style.setProperty("--story-progress", progress.toFixed(4));
      section.style.setProperty(
        "--recognized",
        (recognized * (1 - cardsExit)).toFixed(4),
      );
      section.style.setProperty(
        "--recipe-opacity",
        (recipeReveal * (1 - cardsExit)).toFixed(4),
      );
      section.style.setProperty("--plan-opacity", planReveal.toFixed(4));
      section.style.setProperty(
        "--support-opacity",
        ((Math.max(planReveal, shoppingReveal) || 0) * (1 - cardsExit)).toFixed(
          4,
        ),
      );
      section.style.setProperty(
        "--shopping-opacity",
        shoppingReveal.toFixed(4),
      );
      section.style.setProperty(
        "--recipe-shift-x",
        `${lerp(0, compact ? -6 : -4, recipeTransfer).toFixed(2)}px`,
      );
      section.style.setProperty(
        "--recipe-shift-y",
        `${lerp(0, compact ? 78 : 170, recipeTransfer).toFixed(2)}px`,
      );
      section.style.setProperty(
        "--recipe-scale",
        lerp(1, compact ? 0.91 : 0.84, recipeTransfer).toFixed(4),
      );
      section.style.setProperty(
        "--cards-shift",
        `${lerp(24, 0, planReveal).toFixed(2)}px`,
      );
      section.style.setProperty(
        "--shopping-row-shift",
        `${lerp(14, 0, shoppingReveal).toFixed(2)}px`,
      );
      section.style.setProperty("--door-close", doorClose.toFixed(4));
      section.style.setProperty(
        "--door-angle",
        `${lerp(compact ? -96 : -108, 0, doorClose).toFixed(2)}deg`,
      );
      section.style.setProperty(
        "--interior-opacity",
        lerp(1, 0.14, doorClose).toFixed(4),
      );
      section.style.setProperty("--final-opacity", finalReveal.toFixed(4));
      section.style.setProperty(
        "--final-shift",
        `${lerp(22, 0, finalReveal).toFixed(2)}px`,
      );
      section.style.setProperty(
        "--hint-opacity",
        (1 - smoothstep(rangeProgress(progress, 0.035, 0.14))).toFixed(4),
      );

      for (const motion of ingredientMotions) {
        const entering = smoothstep(
          rangeProgress(progress, motion.enterStart, motion.enterEnd),
        );
        const startX = compact ? motion.mobileStartX : motion.startX;
        const startY = compact ? motion.mobileStartY : motion.startY;
        const endX = compact ? motion.mobileEndX : motion.endX;
        const endY = compact ? motion.mobileEndY : motion.endY;
        const arc =
          Math.sin(Math.PI * entering) *
          motion.arc *
          canvasHeight *
          (compact ? 0.72 : 1);
        const x = lerp(startX, endX, entering) * canvasWidth;
        const y = lerp(startY, endY, entering) * canvasHeight - arc;
        const scale = lerp(
          motion.startScale,
          motion.endScale,
          entering,
        );
        const rotation = lerp(
          motion.startRotation,
          motion.endRotation,
          entering,
        );
        const appeared = smoothstep(
          rangeProgress(progress, 0.015 + motion.delay, 0.105 + motion.delay),
        );
        const opacity =
          Math.max(ingredientAppear * 0.55, appeared) * (1 - doorClose);

        motion.node.style.setProperty("--item-x", `${x.toFixed(2)}px`);
        motion.node.style.setProperty("--item-y", `${y.toFixed(2)}px`);
        motion.node.style.setProperty("--item-scale", scale.toFixed(4));
        motion.node.style.setProperty(
          "--item-rotation",
          `${rotation.toFixed(2)}deg`,
        );
        motion.node.style.setProperty("--item-opacity", opacity.toFixed(4));
      }

      const nextStage = stageForProgress(progress);
      if (nextStage !== previousStage) {
        section.dataset.activeStage = String(nextStage);
        previousStage = nextStage;
      }
    };

    const showReducedMotionComposition = () => {
      previousProgress = 1;
      setStoryVariables(1);
      section.dataset.activeStage = "4";
      section.dataset.reducedMotion = "true";
    };

    const update = () => {
      frame = 0;

      if (reducedMotionQuery.matches) {
        showReducedMotionComposition();
        return;
      }

      section.dataset.reducedMotion = "false";
      const rect = section.getBoundingClientRect();
      const headerOffset = compact ? 74 : 88;
      const scrollableDistance = Math.max(
        1,
        sectionHeight - viewportHeight + headerOffset,
      );
      const progress = clamp(
        (headerOffset - rect.top) / scrollableDistance,
      );

      if (Math.abs(progress - previousProgress) < 0.0001) return;
      previousProgress = progress;
      setStoryVariables(progress);
    };

    const scheduleUpdate = () => {
      if ((!isNearSection && previousProgress >= 0 && previousProgress <= 1) || frame) {
        return;
      }
      frame = window.requestAnimationFrame(update);
    };

    const measure = () => {
      canvasWidth = canvas.clientWidth;
      canvasHeight = canvas.clientHeight;
      sectionHeight = section.offsetHeight;
      viewportHeight = window.innerHeight;
      compact = window.innerWidth < 900;
      previousProgress = -1;
      scheduleUpdate();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isNearSection = entry.isIntersecting;
        if (isNearSection) scheduleUpdate();
      },
      { rootMargin: "120px 0px" },
    );

    intersectionObserver.observe(section);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    reducedMotionQuery.addEventListener("change", measure);
    measure();

    return () => {
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      reducedMotionQuery.removeEventListener("change", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sectionId]);

  return null;
}
