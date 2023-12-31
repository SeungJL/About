import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import StudyVoteMap from "../../../../components/features/studyVote/StudyVoteMap";
import ModalPortal from "../../../../components/modals/ModalPortal";
import { useFailToast } from "../../../../hooks/custom/CustomToast";
import StudyCheckImageModal from "../../../../modals/study/StudyCheckImageModal";
import StudyCheckModal from "../../../../modals/study/StudyCheckModal";
import { isMainLoadingState } from "../../../../recoil/loadingAtoms";
import {
  myStudyState,
  studyDateStatusState,
} from "../../../../recoil/studyAtoms";
import { isGuestState, userAccessUidState } from "../../../../recoil/userAtoms";

type BtnType =
  | "vote"
  | "voteComplete"
  | "attend"
  | "attendPrivate"
  | "attendComplete"
  | "absence"
  | "passed";

function AboutCalendarVote() {
  const failToast = useFailToast();
  const isGuest = useRecoilValue(isGuestState);
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
    if (isGuest) {
      failToast("guest");
      return;
    }
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
      if (myStudy) {
        if (isAttend) return "attendComplete";
        if (myStudy?.status !== "free") return "absence";
      }
      return "passed";
    }
  };

  const getBtnTextAndColorAndShadow = (
    type: BtnType
  ): { text: string; color: string; shadow: string } => {
    if (type === "vote")
      return {
        text: "참여 신청",
        color: "#00c2b3",
        shadow: "rgba(0, 194, 179, 0.1)",
      };
    if (type === "voteComplete")
      return {
        text: "투표 완료",
        color: "#FEBC5A",
        shadow: "rgba(254, 188, 90, 0.2)",
      };
    if (type === "attend" || type === "attendPrivate")
      return {
        text: "출석 체크",
        color: "#00c2b3",
        shadow: "rgba(0, 194, 179, 0.1)",
      };
    if (type === "attendComplete")
      return {
        text: "출석 완료",
        color: "#FEBC5A",
        shadow: "rgba(254, 188, 90, 0.2)",
      };
    if (type === "absence")
      return {
        text: "당일 불참",
        color: "var(--color-red)",
        shadow: "rgba(255, 107, 107, 0.1)",
      };
    if (type === "passed")
      return {
        text: "기간 만료",
        color: "var(--font-h5)",
        shadow: "rgba(209, 214, 221, 0.2)",
      };
  };

  const setIsModal = () => {
    setModalType(null);
  };

  const btnType = getBtnType();
  const btnStyle = getBtnTextAndColorAndShadow(btnType);

  return (
    <>
      <Layout className="main_vote_btn">
        <VoteOutCircle>
          <VoteCircle shadow={btnStyle.shadow}>
            <VoteBtn
              bg={btnStyle.color}
              textColor={btnStyle.color !== "gray" ? "white" : "var(--font-h3)"}
              onClick={() => onClickBtn(btnType)}
            >
              {!isMainLoading && btnStyle.text}
            </VoteBtn>
          </VoteCircle>
        </VoteOutCircle>
      </Layout>
      <Container />
      {modalType === "vote" && (
        <ModalPortal opacity={0.7}>
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

const VoteOutCircle = styled.div`
  position: relative;
  z-index: 2;
  background-color: white;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  ::after {
    content: "";
    position: absolute;
    z-index: 3;
    background-color: white;
    border: 1.5px solid var(--font-h7);
    border-bottom: none;
    top: 0px;
    left: 0;
    width: 100%;
    height: 50%;
    border-radius: 100px 100px 0 0;
  }
`;

const VoteCircle = styled.div<{ shadow: string }>`
  position: relative;
  z-index: 4;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: ${(props) => props.shadow};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VoteBtn = styled.button<{
  bg: string;
  textColor: string;
}>`
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.textColor};
  font-size: 14px;
  font-weight: 700;
  line-height: 27px;
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
