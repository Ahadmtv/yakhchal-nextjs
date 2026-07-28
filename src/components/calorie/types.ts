import type { FoodItem } from "@/data/foods";

export type CalorieRowState = Readonly<{
  id: string;
  grams: number;
}>;

export type CalculatedCalorieRow = CalorieRowState &
  Readonly<{
    food: FoodItem;
    calories: number;
  }>;

export type BarDatum = Readonly<{
  name: string;
  calories: number;
}>;

export type CategoryDatum = Readonly<{
  name: string;
  calories: number;
}>;
