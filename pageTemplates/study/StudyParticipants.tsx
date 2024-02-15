import dayjs from "dayjs";
import AttendanceBadge from "../../components2/molecules/badge/AttendanceBadge";
import { IProfileCommentCard } from "../../components2/molecules/cards/ProfileCommentCard";
import ProfileCardColumn from "../../components2/organisms/ProfileCardColumn";
import { IAbsence, IAttendance } from "../../types2/studyTypes/studyVoteTypes";
import { dayjsToFormat } from "../../utils/dateTimeUtils";

interface IStudyParticipants {
  participants: IAttendance[];
  absences: IAbsence[];
}
export default function StudyParticipants({
  participants,
  absences,
}: IStudyParticipants) {
  const userCardArr: IProfileCommentCard[] = participants.map((par) => {
    const obj = composeUserCardArr(par, absences);
    const rightComponentProps = obj.rightComponentProps;
    return {
      ...obj,
      rightComponent: rightComponentProps ? (
        <AttendanceBadge
          type={rightComponentProps.type}
          time={rightComponentProps.time}
        />
      ) : null,
    };
  });

  return <ProfileCardColumn userCardArr={userCardArr} />;
}

interface IReturnProps extends Omit<IProfileCommentCard, "rightComponent"> {
  rightComponentProps?: {
    type: "attend" | "dismissed";
    time: string;
  };
}

const composeUserCardArr = (
  participant: IAttendance,
  absences: IAbsence[]
): IReturnProps => {
  const arrived = participant?.arrived
    ? dayjsToFormat(dayjs(participant.arrived), "HH:mm")
    : null;
  const absent = absences.find(
    (absence) => absence.user.uid === participant.user.uid
  );
  return {
    user: participant.user,
    comment: participant.memo || "",
    rightComponentProps:
      arrived || absent
        ? {
            type: arrived ? "attend" : "dismissed",
            time: arrived || dayjsToFormat(dayjs(absent?.updatedAt), "HH:mm"),
          }
        : undefined,
  };
};
