import {
  MIN_USER_FOR_STUDY,
  MAX_USER_PER_PLACE,
  VOTE_END_HOUR,
  VOTE_START_HOUR,
} from "../constants/system";
import { dateToDayjs, getToday, now, strToDate } from "../libs/utils/dateUtils";
import { Attendence } from "../models/attendence";

import { IParticipation, Vote } from "../models/vote";

export const findOneVote = (date: Date) =>
  Vote.findOne({ date }).populate([
    "participations.place",
    "participations.attendences.user",
    "participations.absences.user",
  ]);

//투표 결과가 나온 이후에는 최종적으로 선택된 장소를 firstChoice true로 하고, 나머지는 false로 함.

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

            if (attendance.firstChoice) {
              const otherStart = attendance.time.start;
              const otherEnd = attendance.time.end;
              //내 스터디 시간이 다른 사람 시작시간 보다 빠른 경우, 내 스터디 종료 시간이 다른 사람 시작시간보다 1시간 이상 늦어야 겹친다고 판단
              if (myStart <= otherStart && myEnd >= otherStart.add(1, "hour"))
                isOverlap = true;
              //내 스터디 시간보다 다른 사람 시작시간이 빠른 경우, 다른 사람 종료 시간이 내 시작시간보다 1시간 이상 늦어야 겹친다고 판단
              else if (
                myStart > otherStart &&
                otherEnd >= myStart.add(1, "hour")
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
            attendance.firstChoice = false; // 1지망 false로 변경(결과가 나온뒤니까)
          }
        }
      });

      if (invalidAttendCnt >= 3) {
        attendedUsersArr[index] = invalidAttendCnt; // 스터디 장소 참여 확정 인원 숫자
        participation.status = "open";
      } else {
        vote.participations?.map((par) => {
          par.attendences.map((att) => {
            att.firstChoice = false;
            failure.add(att.user.toString());
          });
        });
        //1지망 false로 변경. 전원 매칭 실패로 failure에 추가
        participation.status = "dismissed";
      }
    });
    vote?.save();

    //open된 장소에 본인이 2지망으로 투표한 경우 추가해주는 알고리즘
    vote?.participations?.map((participation) => {
      if (participation.status === "open") {
        participation.attendences.map((attendance) => {
          // 해당 attendences는 투표했던 모든 인원일 것임
          if (failure.has(attendance.user.toString())) {
            // 투표했던 인원중에 아직 선택되지 못한 인원들에도 포함되는 경우
            const myStart = attendance.time.start;
            const myEnd = attendance.time.end;
            let overlapCnt = 0; //시간이 겹치는 유효 인원
            participation.attendences.map((attendance) => {
              let isOverlap = false;
              if (attendance.firstChoice) {
                const otherStart = attendance.time.start;
                const otherEnd = attendance.time.end;
                //참여 확정 인원과 비교
                if (myStart <= otherStart && myEnd >= otherStart.add(1, "hour"))
                  isOverlap = true;
                else if (
                  myStart > otherStart &&
                  otherEnd >= myStart.add(1, "hour")
                )
                  isOverlap = true;

                if (isOverlap) overlapCnt++;
              }
            });
            if (overlapCnt >= 3) {
              attendance.firstChoice = true; // 확정 장소를 이 곳으로 변경
              failure.delete(attendance.user);
            }
          }
          //겹치는 사람이 3명 이상(본인을 포함하여)인 경우 유효 카운트 +1
        });
      }
    });
    vote?.save();
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

              if (failure.has(attendance.user.toString())) {
                const otherStart = attendance.time.start;
                const otherEnd = attendance.time.end;
                if (myStart <= otherStart && myEnd >= otherStart.add(1, "hour"))
                  isOverlap = true;
                else if (
                  myStart > otherStart &&
                  otherEnd >= myStart.add(1, "hour")
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
  vote?.save();
};
