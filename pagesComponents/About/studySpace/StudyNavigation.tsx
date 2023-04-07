import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useToast } from "@chakra-ui/react";
import { faCircleXmark, faClock } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";

import ModalPortal from "../../../components/ModalPortal";
import AbsentVoteModal from "../../../modals/study/confirm/AbsentVoteModal";
import ChangeTimeModal from "../../../modals/study/vote/ChangeTimeModal";
import CheckVoteModal from "../../../modals/study/vote/AttendCheckModal";
import VoteStudySpaceModal from "../../../modals/study/vote/VoteStudySpaceModal";

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
  const isVoting = useRecoilValue(isVotingState);
  const studyDate = useRecoilValue(studyDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);

  const [isChangeModal, setIsChangeModal] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isVoteModal, setIsVoteModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);

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

  const onAbsentToday = () => {
    setIsCancelModal(true);
  };

  const onCancelCliked = () => {
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
            <Button onClick={onCancelCliked}>
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
            func={false}
            // onClick={() => setIsVoteModal(true)}
          >
            <span>{isVoting ? "투표 완료" : "임시 비활성화"}</span>
          </MainButton>
        </Layout>
      )}
      {isChangeModal && (
        <ModalPortal setIsModal={setIsChangeModal}>
          <ChangeTimeModal
            setIsChangeTimeModal={setIsChangeModal}
            myVoteTime={myVote?.time}
          />
        </ModalPortal>
      )}
      {isCancelModal && (
        <ModalPortal setIsModal={setIsCancelModal}>
          <AbsentVoteModal setIsModal={setIsCancelModal} />
        </ModalPortal>
      )}
      {isVoteModal && (
        <ModalPortal setIsModal={setIsVoteModal}>
          <VoteStudySpaceModal
            isModal={isVoteModal}
            setIsModal={setIsVoteModal}
            voteDate={voteDate}
            place={place}
          />
        </ModalPortal>
      )}
      {isCheckModal && (
        <ModalPortal setIsModal={setIsCheckModal}>
          <CheckVoteModal setIsModal={setIsCheckModal} />
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
