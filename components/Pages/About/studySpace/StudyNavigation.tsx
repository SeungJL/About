import { useToast } from "@chakra-ui/react";
import { faCircleXmark, faClock } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useAbsentMutation } from "../../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../../libs/queryKeys";
import CancelVoteModal from "../../../../modals/study/vote/voteStudy/CancelVoteModal";
import ChangeTimeModal from "../../../../modals/study/vote/voteStudy/ChangeTimeModal";
import VoteStudySpaceModal from "../../../../modals/study/vote/voteStudy/vote/VoteStudySpaceModal";
import { IAttendence } from "../../../../models/vote";
import { isVotingState } from "../../../../recoil/studyAtoms";
import ModalPortal from "../../../ModalPortal";

function StudyNavigation({ myVote }: { myVote: IAttendence }) {
  const router = useRouter();
  const toast = useToast();
  const voteDate = dayjs(router.query.date as string);
  const queryClient = useQueryClient();
  const [isChangeModal, setIsChangeModal] = useState(false);
  const [isVoting, setIsVoting] = useRecoilState(isVotingState);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isVoteModal, setIsVoteModal] = useState(false);
  console.log(isVoting);
  const { mutate: handleAbsent, isLoading: absentLoading } = useAbsentMutation(
    voteDate,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([VOTE_GET, voteDate]);
        setIsVoting(false);
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
    }
  );
  const onAbsentToday = () => {
    setIsCancelModal(true);
  };

  return (
    <>
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
        <MainButton onClick={() => setIsVoteModal(true)}>
          <button>스터디 투표하기</button>
        </MainButton>
      </Layout>
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
          <CancelVoteModal setIsModal={setIsCancelModal} />
        </ModalPortal>
      )}
      {isVoteModal && (
        <ModalPortal closePortal={setIsVoteModal}>
          <VoteStudySpaceModal setIsModal={setIsVoteModal} voteDate={voteDate}/>
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

const MainButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-mint);
  color: white;
  height: 48px;
  border-radius: 13px;
  padding: 14px 100px 14px 100px;
  font-weight: 700;
  font-size: 15px;
`;

export default StudyNavigation;
