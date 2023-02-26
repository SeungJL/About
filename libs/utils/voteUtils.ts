import { VOTE_START_HOUR } from "../../constants/system";
import { getToday, now } from "./dateUtils";

export const getDefaultVoteDate = (isUserAttend: boolean) => {
  const current = now();
  const today = getToday();
  const startHour = today.hour(VOTE_START_HOUR);
  console.log("current :", current);
  console.log("today :", today);
  console.log(3);
  console.log(startHour);
  console.log(isUserAttend);
  if (isUserAttend && current < now().hour(18)) {
    console.log(4);
    return today;
  }
  if (current < startHour) {
    console.log(2);
    return today;
  }

  return today.add(1, "day");
};
