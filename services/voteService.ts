import dayjs, { Dayjs } from "dayjs";
import { strToDate } from "../libs/utils/dateUtils";
import { Vote } from "../models/vote";

export const findOneVote = (date: Date) =>
  Vote.findOne({ date }).populate([
    "participations.place",
    "participations.attendences.user",
    "participations.absences.user",
  ]);

type voteTimeArr = { start: Dayjs | Date; end: Dayjs | Date }[];

const checkTimeOverlap = (timeArr: voteTimeArr) => {
  timeArr.sort((a, b) => (a.end.toString() > b.end.toString() ? -1 : 1));
  let endTime = timeArr[0].end;
  timeArr.sort((a, b) => (a.start.toString() > b.start.toString() ? 1 : -1));
  let startTime = timeArr[0].start;

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

      if (overlapCnt >= 3) return timeArr[1];
    }

    startTime = dayjs(startTime).add(30, "minutes").toDate();
  }

  return false;
};

export const confirm = async (dateStr: string) => {
  const date = strToDate(dateStr).toDate();
  const vote = await Vote.findOne({ date });
  const failure = new Set();

  if (vote.participations.some((p) => p.status === "pending")) {
    vote?.participations?.map((participation) => {
      const timeObj: voteTimeArr = [];

      participation.attendences.map((attendance) => {
        if (attendance.firstChoice) {
          if (attendance.time.end !== null) {
            timeObj.push({
              start: attendance.time.start,
              end: attendance.time.end,
            });
          } else {
            timeObj.push({
              start: attendance.time.start,
              end: dayjs(attendance.time.start).add(3, "hours").toDate(),
            });
          }
        }
      });

      let result;
      if (timeObj.length) result = checkTimeOverlap(timeObj);
      if (result) {
        participation.status = "open";
        participation.startTime = result.start;
        participation.endTime = result.end;
      } else {
        participation.status = "dismissed";
      }
    });
    await vote?.save();

    //매칭 실패한 사람들 전부 failure에 추가
    vote?.participations?.map((participation) => {
      if (participation.status === "dismissed") {
        participation.attendences.map((attendance) => {
          if (attendance.firstChoice) failure.add(attendance.user.toString());
        });
      }
    });
    await vote?.save();

    //open장소에 failure에 있는 사람이 2지망 투표 했으면 1지망으로 바꿔줌
    vote?.participations?.map((participation) => {
      if (participation.status === "open") {
        participation.attendences.map((attendance) => {
          if (
            !attendance.firstChoice &&
            failure.has(attendance.user.toString())
          ) {
            attendance.firstChoice = true;
            failure.delete(attendance.user.toString());
          }
        });
      }
    });
    await vote?.save();

    //실패한 장소에서 2지망 투표한 사람들끼리 오픈할 수 있는지 확인
    vote?.participations?.map((participation) => {
      if (participation.status === "dismissed") {
        participation.attendences = participation.attendences.filter(
          (attendance) => failure.has(attendance.user.toString())
        );

        const timeObj: voteTimeArr = [];

        participation.attendences.map((attendance) => {
          if (attendance.time.end !== null) {
            timeObj.push({
              start: attendance.time.start,
              end: attendance.time.end,
            });
          } else {
            timeObj.push({
              start: attendance.time.start,
              end: dayjs(attendance.time.start).add(3, "hours").toDate(),
            });
          }
        });

        let result;
        if (timeObj.length) result = checkTimeOverlap(timeObj);
        if (timeObj.length && result) {
          participation.status = "open";
          participation.startTime = result.start as Date;
          participation.endTime = result.end as Date;
          participation.attendences.forEach(
            (attendance) => (attendance.firstChoice = true)
          );
        }
      }
    });
    await vote?.save();
  }
};
