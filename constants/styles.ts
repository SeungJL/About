import { GatherStatus } from "../types/page/gather";

export const TABLE_COLORS = [
  "#FF8896",
  "#FEBC5A",
  "#6AC2A3",
  "#71C3FF",
  "#9E7CFF",
  "#FFC1CC",
  "#A6ABBF",
  "#ADD8E6",
  "#D7BCE8",
  "#8ED081",
  "#B0C4DE",
  "#FF8896",
  "#FEBC5A",
  "#B5BDEB",
  "#9E7CFF",
  "#FFC1CC",
  "#A6ABBF",
  "#ADD8E6",
  "#D7BCE8",
  "#B0C4DE",
];

export const TABLE_STRONG_COLORS = [
  "#ff6b6b",
  "#FFA500",
  "#007BFF",
  "#20B2AA",
  "#BA55D3",
];

export const SCHEME_TO_COLOR = {
  facebook: "#223B67",
  badgePink: "#FF69B4",
};

export const ICON_SIZE = {
  xl: 75,
  lg: 60,
  md: 50,
  sm: 40,
  xs: 30,
};

export const STATUS_TP_COLOR: Record<GatherStatus, string> = {
  open: "var(--color-mint)",
  pending: "var(--color-red)",
  close: "var(--font-h4)",
  end: "var(--font-h4)",
};
