export type StoryStage = Readonly<{
  number: string;
  title: string;
  description: string;
}>;

export type IngredientSpec = Readonly<{
  id: string;
  src: string;
  label: string;

  start: Readonly<[x: number, y: number]>;
  end: Readonly<[x: number, y: number]>;
  mobileStart: Readonly<[x: number, y: number]>;
  mobileEnd: Readonly<[x: number, y: number]>;
  range: Readonly<[start: number, end: number]>;
  startScale: number;
  endScale: number;
  startRotation: number;
  endRotation: number;
  arc: number;
  delay: number;
}>;
