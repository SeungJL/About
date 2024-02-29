import { Box, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import AlertNotCompletedModal from "../../components2/AlertNotCompletedModal";
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
  const [isModal, setIsModal] = useState(false);
  console.log(2, participants);
  const userCardArr: IProfileCommentCard[] = participants.map((par) => {
    const obj = composeUserCardArr(par, absences);

    const rightComponentProps = obj.rightComponentProps;
    console.log(244, par?.imageUrl, rightComponentProps);
    return {
      ...obj,
      rightComponent: rightComponentProps ? (
        <>
          <Flex align="center">
            {par?.imageUrl && (
              <Box
                mr="12px"
                bg="pink"
                rounded="md"
                overflow="hidden"
                onClick={() => setIsModal(true)}
              >
                <Image src={par.imageUrl} width={46} height={46} alt="" />
              </Box>
            )}
            <AttendanceBadge
              type={rightComponentProps.type}
              time={rightComponentProps.time}
            />
          </Flex>
        </>
      ) : null,
    };
  });

  return (
    <>
      {userCardArr.length ? (
        <ProfileCardColumn userCardArr={userCardArr} />
      ) : (
        <Flex
          align="center"
          justify="center"
          h="200"
          color="var(--gray-3)"
          fontSize="16px"
          textAlign="center"
        >
          <Box as="p" lineHeight="1.8">
            현재 참여중인 멤버가 없습니다.
            <br />
            지금 신청하면{" "}
            <Box as="b" color="var(--color-mint)">
              10 POINT
            </Box>{" "}
            추가 획득!
          </Box>
        </Flex>
      )}
      {isModal && <AlertNotCompletedModal setIsModal={setIsModal} />}
    </>
  );
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
    ? dayjsToFormat(dayjs(participant.arrived).subtract(9, "hour"), "HH:mm")
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
