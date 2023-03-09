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
  const attendedUsersArr = [0, 0, 0, 0];

  if (vote.participations.some((p) => p.status === "pending")) {
    vote?.participations?.map((participation, index) => {
      let invalidAttendCnt = 0;
      participation.attendences.map((attendance) => {
        if (attendance.firstChoice) {
          const myStart = attendance.time.start;
          const myEnd = attendance.time.end;
          let overlapCnt = 0;
          participation.attendences.map((attendance) => {
            let isOverlap = false;
            const oneHourToMs = 3600000;
            if (attendance.firstChoice) {
              const otherStart = attendance.time.start;
              const otherEnd = attendance.time.end;
              //내 스터디 시간이 다른 사람 시작시간 보다 빠른 경우, 내 스터디 종료 시간이 다른 사람 시작시간보다 1시간 이상 늦어야 겹친다고 판단
              if (
                myStart <= otherStart &&
                myEnd.getTime() >= otherStart.getTime() + oneHourToMs
              )
                isOverlap = true;
              //내 스터디 시간보다 다른 사람 시작시간이 빠른 경우, 다른 사람 종료 시간이 내 시작시간보다 1시간 이상 늦어야 겹친다고 판단
              else if (
                myStart > otherStart &&
                otherEnd.getTime() >= myStart.getTime() + oneHourToMs
              )
                isOverlap = true;

              if (isOverlap) overlapCnt++;
            }
          });
          //겹치는 사람이 3명 이상(본인을 포함하여)인 경우 유효 카운트 +1
          if (overlapCnt >= 3) {
            invalidAttendCnt++;
          } else {
            failure.add(attendance.user.toString()); //1지망으로 투표를 했지만 시간매칭 실패한 사람
          }
        }
      });

      if (invalidAttendCnt >= 3) {
        attendedUsersArr[index] = invalidAttendCnt; // 스터디 장소 참여 확정 인원 숫자
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
            const myStart = attendance.time.start;
            const myEnd = attendance.time.end;
            let overlapCnt = 0;
            participation.attendences.map((attendance) => {
              let isOverlap = false;
              const oneHourToMs = 3600000;
              if (attendance.firstChoice) {
                const otherStart = attendance.time.start;
                const otherEnd = attendance.time.end;
                //참여 확정 인원과 비교
                if (
                  myStart <= otherStart &&
                  myEnd.getTime() >= otherStart.getTime() + oneHourToMs
                )
                  isOverlap = true;
                else if (
                  myStart > otherStart &&
                  otherEnd.getTime() >= myStart.getTime() + oneHourToMs
                )
                  isOverlap = true;

                if (isOverlap) overlapCnt++;
              }
            });
            if (overlapCnt >= 3) {
              attendance.firstChoice = true;
              failure.delete(attendance.user);
            }
          }
          //겹치는 사람이 3명 이상(본인을 포함하여)인 경우 유효 카운트 +1
        });
      }
    });

    //1지망 투표도 실패하고, 참여 확정된 1지망으로의 2지망 변경도 실패한 경우(예를 들어 그 날 1지망만으로 스터디가 열린곳이 없으면 모두 failure에 들어가 있을 것임)
    vote?.participations?.map((participation) => {
      if (participation.status === "dismissed") {
        participation.attendences.map((attendance) => {
          if (failure.has(attendance.user.toString())) {
            const myStart = attendance.time.start;
            const myEnd = attendance.time.end;
            let overlapCnt = 0;
            participation.attendences.map((attendance) => {
              let isOverlap = false;
              const oneHourToMs = 3600000;
              if (failure.has(attendance.user.toString())) {
                const otherStart = attendance.time.start;
                const otherEnd = attendance.time.end;
                if (
                  myStart <= otherStart &&
                  myEnd.getTime() >= otherStart.getTime() + oneHourToMs
                )
                  isOverlap = true;
                else if (
                  myStart > otherStart &&
                  otherEnd.getTime() >= myStart.getTime() + oneHourToMs
                )
                  isOverlap = true;

                if (isOverlap) overlapCnt++;
              }
            });
            if (overlapCnt >= 3) {
              attendance.firstChoice = true;
              failure.delete(attendance.user);
            }
          }
        });
      }
    });
  }
};
