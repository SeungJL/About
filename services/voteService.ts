import { Dayjs } from "dayjs";
import {
  MIN_USER_FOR_STUDY,
  MAX_USER_PER_PLACE,
  VOTE_END_HOUR,
} from "../constants/system";
import { dateToDayjs, now, strToDate } from "../libs/utils/dateUtils";
import { IParticipation, Vote } from "../models/vote";

export const findOneVote = (date: Date) =>
  Vote.findOne({ date }).populate([
    "participations.place",
    "participations.attendences.user",
    "participations.absences.user",
  ]);

type voteTimeArr = { start: Dayjs; end: Dayjs }[];

const checkTimeOverlap = (timeArr: voteTimeArr) => {
  timeArr.sort((a, b) => (a.start.toString() > b.start.toString() ? 1 : -1));
  const startTime = timeArr[0].start;
  timeArr.sort((a, b) => (a.end.toString() < b.end.toString() ? -1 : 1));
  const endTime = timeArr[0].end;

  const arr = [];
  while (startTime <= endTime) {
    arr.push(0);
    timeArr.forEach((time) => {
      if (time.start <= startTime && startTime <= endTime) {
        arr[arr.length - 1]++;
      }
    });

    let overlapCnt = 0;
    for (let i = 0; i < arr.length; i++) {
      //3명 이상 겹치는 시간  1시간 이상인지 확인
      if (arr[i] >= 3) overlapCnt++;
      else overlapCnt = 0;

      if (overlapCnt >= 3) return true;
    }

    startTime.add(30, "minute");
  }

  return false;
};

export const confirm = async (dateStr: string) => {
  const date = strToDate(dateStr).toDate();
  const vote = await Vote.findOne({ date });
  const failure = new Set();

  if (vote.participations.some((p) => p.status === "pending")) {
    vote?.participations?.map((participation) => {
      let firstChoiceNum = 0;
      const timeObj: voteTimeArr = [];

      participation.attendences.map((attendance) => {
        if (attendance.firstChoice) {
          timeObj.push({
            start: attendance.time.start,
            end: attendance.time.end,
          });
        }
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
