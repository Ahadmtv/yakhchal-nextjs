import type { BaseFoodItem, FoodItem } from "@/data/foods";

declare const baseFood: BaseFoodItem;

const validVerifiedFood: FoodItem = {
  ...baseFood,
  sourceStatus: "verified",
  sourceUrl: "https://example.org/food-source",
  reviewedAt: "2026-08-02",
};

// @ts-expect-error A verified record must include a source URL and review date.
const invalidVerifiedFood: FoodItem = {
  ...baseFood,
  sourceStatus: "verified",
  sourceUrl: null,
  reviewedAt: null,
};

void validVerifiedFood;
void invalidVerifiedFood;
