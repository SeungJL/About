import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ShadowCircleButton, {
  IShadowCircleProps,
} from "../../../components2/atoms/buttons/ShadowCircleButton";
import StudyVoteMap from "../../../components2/services/studyVote/StudyVoteMap";
import StudyCheckImageModal from "../../../modals/study/StudyCheckImageModal";
import StudyCheckModal from "../../../modals/study/StudyCheckModal";

import {
  myStudyState,
  studyDateStatusState,
} from "../../../recoils/studyRecoils";
import { StudyDateStatus } from "../../../types2/studyTypes/studySubTypes";
import { IParticipation } from "../../../types2/studyTypes/studyVoteTypes";

export type StudyVoteActionType =
  | "참여 신청"
  | "출석 체크"
  | "출석 완료"
  | "당일 불참"
  | "기간 만료";

function StudyVoteControllerVote() {
  const router = useRouter();
  const { data } = useSession();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudy = useRecoilValue(myStudyState);

  const [modalType, setModalType] = useState(null);

  const buttonProps = getStudyVoteButtonProps(
    studyDateStatus,
    myStudy,
    data?.user?.uid
  );

  const handleButton = () => {
    const type = buttonProps.text;
    switch (type) {
      case "참여 신청":
        setModalType("vote");
        return;
    }
  };

  const setIsModal = () => {
    setModalType(null);
  };

  return (
    <>
      <ButtonWrapper className="main_vote_btn">
        <ShadowCircleButton buttonProps={buttonProps} onClick={handleButton} />
      </ButtonWrapper>

      {modalType === "vote" && <StudyVoteMap setIsModal={setIsModal} />}
      {modalType === "attend" && <StudyCheckModal setIsModal={setIsModal} />}
      {modalType === "attendPrivate" && (
        <StudyCheckImageModal setIsModal={setIsModal} />
      )}
    </>
  );
}

interface IReturn extends IShadowCircleProps {
  text: StudyVoteActionType;
}

export const getStudyVoteButtonProps = (
  studyDateStatus: StudyDateStatus,
  myStudy: IParticipation | null,
  myUid?: string
): IReturn => {
  const isAttend = myStudy?.attendences.find(
    (who) => who.user.uid === myUid
  )?.arrived;

  switch (studyDateStatus) {
    case "not passed":
      return {
        text: "참여 신청",
        color: "var(--color-mint)",
        shadow: "rgba(0, 194, 179, 0.1)",
      };
    case "today":
      if (isAttend)
        return {
          text: "출석 완료",
          color: "amber-400",
          shadow: "amber-100",
        };
      else if (false || myStudy)
        return {
          text: "출석 체크",
          color: "#00c2b3",
          shadow: "rgba(0, 194, 179, 0.1)",
        };
      return {
        text: "참여 신청",
        color: "var(--color-mint)",
        shadow: "rgba(0, 194, 179, 0.1)",
      };
    case "passed":
      if (myStudy && isAttend)
        return {
          text: "출석 완료",
          color: "#FEBC5A",
          shadow: "rgba(254, 188, 90, 0.2)",
        };
      else if (myStudy && myStudy.status !== "free")
        return {
          text: "당일 불참",
          color: "var(--color-red)",
          shadow: "rgba(255, 107, 107, 0.1)",
        };
      return {
        text: "기간 만료",
        color: "var(--font-h5)",
        shadow: "rgba(209, 214, 221, 0.2)",
      };
  }
};

const ButtonWrapper = styled.div`
  background-color: white;
  border-radius: 9999px; /* rounded-full */
  position: absolute;
  z-index: 4;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 108px;
  height: 108px;

  /* Custom after pseudo-element */
  &::after {
    content: "";
    /* Define your custom styles for the after pseudo-element here */
  }
`;

export default StudyVoteControllerVote;
