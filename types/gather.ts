export interface IGatherContent {
  category?: GatherCategory;
}

export type GatherCategory = { title: string; subtitle?: string };
