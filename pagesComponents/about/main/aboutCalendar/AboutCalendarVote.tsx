import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import StudyVoteMap from "../../../../components/features/studyVote/StudyVoteMap";
import ModalPortal from "../../../../components/modals/ModalPortal";
import StudyCheckImageModal from "../../../../modals/study/StudyCheckImageModal";
import StudyCheckModal from "../../../../modals/study/StudyCheckModal";
import { isMainLoadingState } from "../../../../recoil/loadingAtoms";
import {
  myStudyState,
  studyDateStatusState,
} from "../../../../recoil/studyAtoms";
import { userAccessUidState } from "../../../../recoil/userAtoms";

type BtnType =
  | "vote"
  | "voteComplete"
  | "attend"
  | "attendPrivate"
  | "attendComplete"
  | "absence"
  | "passed";

function AboutCalendarVote() {
  const isMainLoading = useRecoilValue(isMainLoadingState);
  const userAccessUid = useRecoilValue(userAccessUidState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudy = useRecoilValue(myStudyState);
  const isAttend = !!myStudy?.attendences?.find(
    (att) => att.user.uid === userAccessUid
  )?.arrived;
  const isPrivate = myStudy?.place.brand === "자유 신청";

  const [modalType, setModalType] = useState<BtnType>();

  const onClickBtn = (type: BtnType) => {
    const modalTypeArr: BtnType[] = ["vote", "attend", "attendPrivate"];
    if (modalTypeArr.includes(type)) {
      setModalType(type);
    }
  };

  const getBtnType = (): BtnType => {
    if (studyDateStatus === "not passed") return "vote";
    if (studyDateStatus === "today") {
      if (isAttend) return "attendComplete";
      else if (isPrivate) return "attendPrivate";
      else if (myStudy) return "attend";
      else return "vote";
    }
    if (studyDateStatus === "passed") {
      if (isAttend) return "attendComplete";
      if (myStudy?.status !== "free") return "absence";
      return "passed";
    }
  };

  const getBtnTextAndColorAndShadow = (
    type: BtnType
  ): { text: string; color: string; shadow: string } => {
    if (type === "vote")
      return {
        text: "참여 신청",
        color: "mintTheme",
        shadow: "rgba(0, 194, 179, 0.4)",
      };
    if (type === "voteComplete")
      return {
        text: "투표 완료",
        color: "yellowTheme",
        shadow: "rgba(254, 188, 90, 0.4)",
      };
    if (type === "attend" || type === "attendPrivate")
      return {
        text: "출석 체크",
        color: "mintTheme",
        shadow: "rgba(0, 194, 179, 0.4)",
      };
    if (type === "attendComplete")
      return {
        text: "출석 완료",
        color: "yellowTheme",
        shadow: "rgba(254, 188, 90, 0.4)",
      };
    if (type === "absence")
      return {
        text: "불참",
        color: "redTheme",
        shadow: "rgba(255, 107, 107, 0.4)",
      };
    if (type === "passed")
      return {
        text: "기간 만료",
        color: "gray",
        shadow: "var(--font-h5)",
      };
  };

  const setIsModal = () => {
    setModalType(null);
  };

  const btnType = getBtnType();
  const btnStyle = getBtnTextAndColorAndShadow(btnType);

  return (
    <>
      <Layout>
        <Button
          position="relative"
          borderRadius="50%"
          zIndex="2"
          w="76px"
          h="76px"
          size="lg"
          onClick={() => onClickBtn(btnType)}
          colorScheme={btnStyle.color}
          color={btnStyle.color !== "gray" ? "white" : "var(--font-h3)"}
          boxShadow={`0 0 12px ${btnStyle.shadow}`}
        >
          {!isMainLoading && btnStyle.text}
        </Button>
      </Layout>
      <Container />
      {modalType === "vote" && (
        <ModalPortal opacity={0.6}>
          <StudyVoteMap setIsModal={setIsModal} />
        </ModalPortal>
      )}
      {modalType === "attend" && <StudyCheckModal setIsModal={setIsModal} />}
      {modalType === "attendPrivate" && (
        <StudyCheckImageModal setIsModal={setIsModal} />
      )}
    </>
  );
}

const Layout = styled.div`
  border-radius: 50%;
  position: absolute;
  z-index: 20;
  z-index: 4;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  border: 1.5px solid var(--font-h56);
  width: 96px;
  height: 96px;
  z-index: 0;
  border-radius: 50%;
  position: absolute;

  background-color: var(--font-h8);
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Pick = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--font-h3);

  margin-bottom: 4px;
  display: flex;
  justify-content: center;
`;

export default AboutCalendarVote;
