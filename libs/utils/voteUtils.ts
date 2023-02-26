import { VOTE_START_HOUR } from "../../constants/system";
import { getToday, now } from "./dateUtils";

export const getDefaultVoteDate = (isUserAttend: boolean) => {
  const current = now();
  const today = getToday();
  const startHour = today.hour(VOTE_START_HOUR);
  if (isUserAttend && current < now().hour(18)) {
    return today;
  }
  if (current < startHour) {
    return today;
  }

  return today.add(1, "day");
};
