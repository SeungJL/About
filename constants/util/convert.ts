import { GatherStatus } from "../../types/models/gatherTypes/gather";

export const STATUS_TO_TEXT: Record<GatherStatus, string> = {
  open: "오픈",
  pending: "모집중",
  close: "취소",
  end: "마감",
};
