import { useToast } from "@chakra-ui/react";
import { faCircleXmark, faClock } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../components/ModalPortal";
import {
  useAbsentMutation,
  useArrivedMutation,
} from "../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../libs/queryKeys";
import AbsentVoteModal from "../../../modals/study/confirm/AbsentVoteModal";
import CheckAttendanceModal from "../../../modals/study/confirm/AttendingPeopleModal";
import ChangeTimeModal from "../../../modals/study/vote/ChangeTimeModal";
import CheckVoteModal from "../../../modals/study/vote/CheckVoteModal";
import VoteStudySpaceModal from "../../../modals/study/vote/VoteStudySpaceModal";

import {
  isVotingState,
  mySpaceFixedState,
  studyDateState,
} from "../../../recoil/studyAtoms";
import { IPlaceStatus, IPlaceStatusType } from "../../../types/statistics";
import { IAttendence, IPlace } from "../../../types/studyDetails";

function StudyNavigation({
  myVote,
  place,
  status,
}: {
  myVote: IAttendence;
  place: IPlace;
  status: IPlaceStatusType;
}) {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const voteDate = dayjs(router.query.date as string);
  const [isVoting, setIsVoting] = useRecoilState(isVotingState);
  const studyDate = useRecoilValue(studyDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);

  const [isChangeModal, setIsChangeModal] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isVoteModal, setIsVoteModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);

  const { mutate: handleAbsent } = useAbsentMutation(voteDate, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([VOTE_GET, voteDate]);
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

  const onAbsentToday = () => {
    setIsCancelModal(true);
  };

  return (
    <>
      {studyDate === "passed" || status === "dismissed" ? (
        <Layout>
          <MainButton disabled={true} func={false}>
            <span>
              {studyDate !== "passed"
                ? "기간 만료"
                : "스터디가 열리지 않았어요!"}
            </span>
          </MainButton>
        </Layout>
      ) : studyDate === "today" ? (
        <Layout>
          <SubNav>
            <Button onClick={() => handleAbsent()}>
              <FontAwesomeIcon icon={faCircleXmark} size="xl" />
              <span>투표 취소</span>
            </Button>
            <Button onClick={() => setIsChangeModal(true)}>
              <FontAwesomeIcon icon={faClock} size="xl" />
              <span>시간 변경</span>
            </Button>
            <Button onClick={onAbsentToday}>
              <FontAwesomeIcon icon={faBan} size="xl" />
              <span>당일 불참</span>
            </Button>
          </SubNav>
          <MainButton
            disabled={Boolean(myVote?.arrived)}
            func={!myVote?.arrived}
            onClick={
              myVote?.firstChoice
                ? () => setIsCheckModal(true)
                : () => setIsVoteModal(true)
            }
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
            <Button onClick={() => handleAbsent()}>
              <FontAwesomeIcon icon={faCircleXmark} size="xl" />
              <span>투표 취소</span>
            </Button>
            <Button onClick={() => setIsChangeModal(true)}>
              <FontAwesomeIcon icon={faClock} size="xl" />
              <span>시간 변경</span>
            </Button>
            <Button onClick={onAbsentToday}>
              <FontAwesomeIcon icon={faBan} size="xl" />
              <span>당일 불참</span>
            </Button>
          </SubNav>
          <MainButton
            disabled={isVoting && true}
            func={!isVoting}
            onClick={() => setIsVoteModal(true)}
          >
            <span>{isVoting ? "투표 완료" : "스터디 투표하기"}</span>
        </MainButton>
        </Layout>
      )}
      {isChangeModal && (
        <ModalPortal closePortal={setIsChangeModal}>
          <ChangeTimeModal
            setIsChangeTimeModal={setIsChangeModal}
            myVoteTime={myVote?.time}
          />
        </ModalPortal>
      )}
      {isCancelModal && (
        <ModalPortal closePortal={setIsCancelModal}>
          <AbsentVoteModal setIsModal={setIsCancelModal} />
        </ModalPortal>
      )}
      {isVoteModal && (
        <ModalPortal closePortal={setIsVoteModal}>
          <VoteStudySpaceModal
            isModal={isVoteModal}
            setIsModal={setIsVoteModal}
            voteDate={voteDate}
            place={place}
          />
        </ModalPortal>
      )}
      {isCheckModal && (
        <ModalPortal closePortal={setIsCheckModal}>
          <CheckVoteModal setIsModal={setIsCheckModal} myPlace={place} />
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

export default StudyNavigation;
