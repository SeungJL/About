import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useToast } from "@chakra-ui/react";
import { faCircleXmark, faClock } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";

import ModalPortal from "../../../components/ModalPortal";
import AbsentStudyModal from "../../../modals/study/AbsentStudyModal";
import ChangeStudyTimeModal from "../../../modals/study/ChangeStudyTimeModal";
import VoteStudySubModal from "../../../modals/study/VoteStudySubModal";

import { useQueryClient } from "react-query";
import { useScoreMutation } from "../../../hooks/user/mutations";
import { useAbsentMutation } from "../../../hooks/vote/mutations";
import { useRecoilValue } from "recoil";
import {
  isVotingState,
  mySpaceFixedState,
  studyDateState,
} from "../../../recoil/studyAtoms";

import { VOTE_GET } from "../../../libs/queryKeys";
import { IPlaceStatusType } from "../../../types/statistics";
import { IAttendence, IPlace } from "../../../types/studyDetails";
import CheckStudyModal from "../../../modals/study/CheckStudyModal";
import { useSession } from "next-auth/react";
import VoteSuccessModal from "./VoteSuccessModal";

function StudySpaceNavigation({
  myVote,
  place,
  status,
}: {
  myVote: IAttendence;
  place: IPlace;
  status: IPlaceStatusType;
}) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const voteDate = dayjs(router.query.date as string);
  const isVoting = useRecoilValue(isVotingState);
  const studyDate = useRecoilValue(studyDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);

  const [isChangeModal, setIsChangeModal] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isVoteModal, setIsVoteModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);
  const [isVoteComplete, setIsVoteComplete] = useState(false);

  const { mutate: getScore } = useScoreMutation();

  const { mutate: handleAbsent } = useAbsentMutation(voteDate, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([VOTE_GET, voteDate]);
      isVoting && getScore(-5);
      router.push(`/about`);
    },
    onError() {
      toast({
        title: "오류",
        description: "참여 취소 신청 중 문제가 발생했어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  const onBtnClicked = (type = "string") => {
    console.log(4);
    if (isGuest) {
      toast({
        title: "버튼 동작 실패",
        description: "게스트에게는 허용되지 않는 기능입니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (type === "cancel") {
      if (mySpaceFixed) {
        toast({
          title: "오류",
          description: "참여 확정 이후에는 당일 불참 버튼을 이용해주세요!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        handleAbsent();
      }
    }
    if (type === "change") {
      setIsChangeModal(true);
    }
    if (type === "absent") {
      setIsCancelModal(true);
    }
    if (type === "main") {
      console.log(10);
      myVote?.firstChoice ? setIsCheckModal(true) : setIsVoteModal(true);
    }
  };

  return (
    <>
      {studyDate === "passed" || status === "dismissed" ? (
        <Layout>
          <MainButton disabled={true} func={false}>
            <span>
              {studyDate === "passed"
                ? "기간 만료"
                : "스터디가 열리지 않았어요!"}
            </span>
          </MainButton>
        </Layout>
      ) : studyDate === "today" ? (
        <Layout>
          <SubNav>
            <Button onClick={() => onBtnClicked("cancel")}>
              <FontAwesomeIcon icon={faCircleXmark} size="xl" />
              <span>투표 취소</span>
            </Button>
            <Button onClick={() => onBtnClicked("change")}>
              <FontAwesomeIcon icon={faClock} size="xl" />
              <span>시간 변경</span>
            </Button>
            <Button onClick={() => onBtnClicked("absent")}>
              <FontAwesomeIcon icon={faBan} size="xl" />
              <span>당일 불참</span>
            </Button>
          </SubNav>
          <MainButton
            disabled={Boolean(myVote?.arrived)}
            func={!myVote?.arrived}
            onClick={() => {
              onBtnClicked("main");
            }}
          >
            <span>
              {myVote?.arrived
                ? "출석 완료"
                : myVote?.firstChoice
                ? "출석 체크"
                : "당일 참여"}
            </span>
          </MainButton>
        </Layout>
      ) : (
        <Layout>
          <SubNav>
            <Button onClick={() => onBtnClicked("cancel")}>
              <FontAwesomeIcon icon={faCircleXmark} size="xl" />
              <span>투표 취소</span>
            </Button>
            <Button onClick={() => onBtnClicked("change")}>
              <FontAwesomeIcon icon={faClock} size="xl" />
              <span>시간 변경</span>
            </Button>
            <Button onClick={() => onBtnClicked("absent")}>
              <FontAwesomeIcon icon={faBan} size="xl" />
              <span>당일 불참</span>
            </Button>
          </SubNav>
          <MainButton
            disabled={isVoting && true}
            func={!isVoting}
            onClick={() => onBtnClicked("main")}
          >
            <span>{isVoting ? "투표 완료" : "스터디 투표"}</span>
          </MainButton>
        </Layout>
      )}
      {isChangeModal && (
        <ModalPortal setIsModal={setIsChangeModal}>
          <ChangeStudyTimeModal
            setIsChangeStudyTimeModal={setIsChangeModal}
            myVoteTime={myVote?.time}
          />
        </ModalPortal>
      )}
      {isCancelModal && (
        <ModalPortal setIsModal={setIsCancelModal}>
          <AbsentStudyModal setIsModal={setIsCancelModal} />
        </ModalPortal>
      )}
      {isVoteModal && (
        <ModalPortal setIsModal={setIsVoteModal}>
          <VoteStudySubModal
            isModal={isVoteModal}
            setIsModal={setIsVoteModal}
            voteDate={voteDate}
            place={place}
            setIsVoteComplete={setIsVoteComplete}
          />
        </ModalPortal>
      )}
      {isCheckModal && (
        <ModalPortal setIsModal={setIsCheckModal}>
          <CheckStudyModal setIsModal={setIsCheckModal} />
        </ModalPortal>
      )}
      {isVoteComplete && (
        <ModalPortal setIsModal={setIsVoteComplete}>
          <VoteSuccessModal />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  padding: 12px 0;
  margin-top: 16px;
  border-radius: 13px;
`;

const SubNav = styled.nav`
  display: flex;
  margin-bottom: 24px;
  justify-content: space-around;
`;

const Button = styled.button`
  align-items: center;
  color: var(--font-h2);
  width: 60px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > span {
    font-size: 13px;
  }
`;

const MainButton = styled.button<{ func?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.func ? "var(--color-mint)" : "var(--font-h4)"};
  color: white;
  height: 48px;
  border-radius: 13px;
  padding: 14px 2px 14px 2px;
  font-weight: 700;
  font-size: 15px;
`;

export default StudySpaceNavigation;
