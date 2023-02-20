import {
  MIN_USER_FOR_STUDY,
  MAX_USER_PER_PLACE,
  VOTE_END_HOUR,
  VOTE_START_HOUR,
} from "../constants/system";
import { dateToDayjs, getToday, now, strToDate } from "../libs/utils/dateUtils";
import { openable, getOptimalTime2 } from "../libs/utils/timeUtils";
import { IParticipation, Vote } from "../models/vote";

export const findOneVote = (date: Date) =>
  Vote.findOne({ date }).populate([
    "participations.place",
    "participations.attendences.user",
    "participations.invitations.user",
    "participations.absences.user",
  ]);

export const confirm = async (dateStr: string) => {
  const date = strToDate(dateStr).toDate();
  const vote = await Vote.findOne({ date });
  const failure = new Set();

  if (vote.participations.some((p) => p.status === "pending")) {
    vote?.participations?.map((participation) => {
      let firstChoiceNum = 0;
      participation.attendences.map((attendance) => {
        if (attendance.firstChoice) firstChoiceNum++;
      });

      if (firstChoiceNum >= 3) {
        participation.status = "open";
      } else {
        participation.status = "dismissed";
      }
    });
    vote?.save();

    vote?.participations?.map((participation) => {
      if (participation.status === "dismissed") {
        participation.attendences.map((attendance) => {
          if (attendance.firstChoice) failure.add(attendance.user.toString());
        });
      }
    });

    vote?.participations?.map((participation) => {
      if (participation.status === "open") {
        participation.attendences.map((attendance) => {
          if (failure.has(attendance.user.toString())) {
            attendance.firstChoice = true;
            failure.delete(attendance.user);
          }
        });
      }
    });
  }
};
