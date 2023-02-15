import styled from "styled-components";
import { useQueryClient } from "react-query";
import { useDisclosure, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { CenterDiv } from "../../styles/LayoutStyles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isAttendingState,
  isLateSelector,
  isShowStudyVoteModalState,
  voteDateState,
} from "../../recoil/atoms";
import VoteModal from "../voteModal";
import {
  useAbsentMutation,
  useArrivedMutation,
} from "../../hooks/vote/mutations";
import { useVoteQuery } from "../../hooks/vote/queries";
import { VOTE_GET } from "../../libs/queryKeys";
import { convertToKr, getToday } from "../../libs/utils/dateUtils";
import { IUser } from "../../models/user";
import { useState } from "react";
import VoteStudyModal from "../../modals/StudyVoteModal";
import { ISession } from "../../types/DateTitleMode";
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

function VoteBtn({ session, vote }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const voteDate = useRecoilValue(voteDateState);
  const [isAttending, setIsAttending] = useRecoilState(isAttendingState);
  const voteDateKr = convertToKr(voteDate, "MDD");
  const todayKr = convertToKr(getToday(), "MDD");
  const a = useRecoilValue(isLateSelector);
  console.log(54, a);
  const setIsShowStudyVote = useSetRecoilState(isShowStudyVoteModalState);

  const { mutate: handleAbsent, isLoading: absentLoading } = useAbsentMutation(
    voteDate,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([VOTE_GET, voteDate]);
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

  const {
    isOpen: isVoteModalOpen,
    onOpen: onVoteModalOpen,
    onClose: onVoteModalClose,
  } = useDisclosure();

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

  const lateVote = () => {
    if (false) {
      handleAbsent();
    } else {
      onVoteModalOpen();
    }
  };

  const cancleVote = () => {
    handleAbsent();
    setIsAttending(false);
  };

  return (
    <>
      <OutlineCircle>
        <VoteCircle
          onClick={
            voteDateKr < todayKr
              ? null
              : true
              ? null
              : voteDateKr === todayKr //&& realAttend
              ? () => handleArrived()
              : voteDateKr === todayKr
              ? () => lateVote()
              : isAttending
              ? cancleVote
              : () => setIsShowStudyVote(true)
          }
          state={
            voteDateKr < todayKr
              ? "Closed"
              : voteDateKr === todayKr // && realAttend
              ? "Check"
              : voteDateKr === todayKr
              ? "Join ?"
              : isAttending
              ? "Voted"
              : "Vote"
          }
        >
          {voteDateKr < todayKr
            ? "Closed"
            : true
            ? "출석완료"
            : voteDateKr === todayKr //&& realAttend
            ? "Check"
            : voteDateKr === todayKr
            ? "Join ?"
            : isAttending
            ? "Voted"
            : "Vote"}
        </VoteCircle>
      </OutlineCircle>
    </>
  );
}
export default VoteBtn;
