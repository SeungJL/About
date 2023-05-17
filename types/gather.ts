export type GatherCategory = "전체" | "모집중" | "완료";

export interface IGatherContent {
  type?: GatherType;
  title?: string;
  content?: string;
}

export type GatherType = { title: string; subtitle?: string };
