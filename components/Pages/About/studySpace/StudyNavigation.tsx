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
import { useAbsentMutation } from "../../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../../libs/queryKeys";
import AbsentVoteModal from "../../../../modals/study/confirm/AbsentVoteModal";
import ChangeTimeModal from "../../../../modals/study/vote/ChangeTimeModal";
import VoteStudySpaceModal from "../../../../modals/study/vote/VoteStudySpaceModal";
import { IPlace } from "../../../../models/place";
import { IAttendence } from "../../../../models/vote";
import { isVotingState, studyDateState } from "../../../../recoil/atoms";

import ModalPortal from "../../../ModalPortal";

function StudyNavigation({
  myVote,
  place,
}: {
  myVote: IAttendence;
  place: IPlace;
}) {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const voteDate = dayjs(router.query.date as string);
  const [isVoting, setIsVoting] = useRecoilState(isVotingState);
  const studyDate = useRecoilValue(studyDateState);

  const [isChangeModal, setIsChangeModal] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isVoteModal, setIsVoteModal] = useState(false);

  const { mutate: handleAbsent } = useAbsentMutation(voteDate, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([VOTE_GET, voteDate]);
      setIsVoting(false);
      router.push(`/about`);
    },
    onError: (err) => {
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
      {studyDate === "passed" ? (
        <Layout>
          <MainButton disabled={true} isVoting={isVoting}>
            <span>기간 만료</span>
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
            isVoting={isVoting}
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

const MainButton = styled.button<{ isVoting: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isVoting ? "var(--font-h4)" : "var(--color-mint)"};
  color: white;
  height: 48px;
  border-radius: 13px;
  padding: 14px 100px 14px 100px;
  font-weight: 700;
  font-size: 15px;
`;

export default StudyNavigation;
