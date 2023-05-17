export interface IGatherContent {
  category?: GatherCategory;
  title?: string;
  content?: string;
}

export type GatherCategory = { title: string; subtitle?: string };
