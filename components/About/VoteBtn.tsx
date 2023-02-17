import styled from "styled-components";
import { useQueryClient } from "react-query";
import { useDisclosure, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { CenterDiv } from "../../styles/LayoutStyles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isAttendingState,
  isShowStudyVoteModalState,
  modalContextState,
  studyDateState,
  voteDateState,
  voteStatusState,
} from "../../recoil/atoms";
import VoteModal from "../voteModal";
import {
  useAbsentMutation,
  useArrivedMutation,
} from "../../hooks/vote/mutations";
import { useVoteQuery } from "../../hooks/vote/queries";
import { VOTE_GET } from "../../libs/queryKeys";
import {
  convertToKr,
  getInterestingDate,
  getToday,
  now,
} from "../../libs/utils/dateUtils";
import { IUser } from "../../models/user";
import { useState } from "react";
import VoteStudyModal from "../../modals/StudyVoteModal";
import { ISession } from "../../types/DateTitleMode";
import { IParticipation, IVote } from "../../models/vote";
const OutlineCircle = styled(CenterDiv)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: absolute;
  top: calc(34vh - 47px);
  left: calc(50% - 47px);
  width: 95px;
  height: 95px;
  border-radius: 50%;
`;

interface IVoteCircle {
  state: String;
}
const VoteCircle = styled.button<IVoteCircle>`
  font-family: "NanumEx";
  border-radius: 50%;
  width: 82%;
  height: 82%;
  background: ${(props) =>
    props.state === "Closed"
      ? "linear-gradient(45deg,#F1F2F6,#C9C6C6)"
      : props.state === "Check"
      ? "linear-gradient(45deg,#FFDD00,#FBB034)"
      : props.state === "Join ?"
      ? "linear-gradient(45deg,RGB(108, 66, 28),rgb(78, 42, 11))"
      : props.state === "Voted"
      ? "linear-gradient(45deg,#FFD700,#FEBE10)"
      : "linear-gradient(45deg,RGB(143, 80, 23),RGB(83, 46, 13))"};
  color: ${(props) =>
    props.state === "Closed"
      ? "rgb(0,0,0,0.7)"
      : props.state === "Check"
      ? "black"
      : props.state === "Join ?"
      ? "white"
      : props.state === "Voted"
      ? "#2c3e50"
      : "white"};
  box-shadow: 0px 0px 12px RGB(83, 46, 13);
  font-size: 1.3em;
  padding-top: 3px;
  pointer-events: disabled;
  ${(props) => (props.state === "Closed" ? "disabled" : null)}
`;

interface IVoteBtn {
  participations: IParticipation[];
}

function VoteBtn({ participations }: IVoteBtn) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const voteDate = useRecoilValue(voteDateState);
  const setIsShowStudyVote = useSetRecoilState(isShowStudyVoteModalState);
  const voteStatus = useRecoilValue(voteStatusState);
  const setIsAttending = useSetRecoilState(isAttendingState);
  const setModalContext = useSetRecoilState(modalContextState);

  const { mutate: handleArrived } = useArrivedMutation(getToday(), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(VOTE_GET);
    },
    onError: (err) => {
      toast({
        title: "오류",
        description: "출석체크 중 문제가 발생했어요. 다시 시도해보세요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  const { mutate: handleAbsent, isLoading: absentLoading } = useAbsentMutation(
    voteDate,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([VOTE_GET, voteDate]);
        setIsAttending(false);
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
  const onClickVoted = () => {
    handleAbsent();
  };
  const onClickVote = () => {
    () => setIsShowStudyVote(true);
    setIsShowStudyVote(true);
    setModalContext((old) =>
      Object.assign(
        {
          StudyVote: {
            participations: participations,
          },
        },
        old
      )
    );
  };
  return (
    <>
      <OutlineCircle>
        <VoteCircle
          onClick={
            voteStatus === "Check"
              ? () => handleArrived()
              : ["Join", "Vote"].includes(voteStatus)
              ? onClickVote
              : onClickVoted
          }
          state={voteStatus}
        >
          {voteStatus}
        </VoteCircle>
      </OutlineCircle>
    </>
  );
}
export default VoteBtn;
