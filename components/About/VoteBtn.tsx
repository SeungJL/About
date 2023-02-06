import styled from "styled-components";
import { useQueryClient } from "react-query";
import { useDisclosure, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { CenterDiv } from "../../styles/LayoutStyles";
import { useRecoilState, useRecoilValue } from "recoil";
import { attendingState, dateState } from "../../recoil/atoms";
import VoteModal from "../voteModal";
import {
  useAbsentMutation,
  useArrivedMutation,
} from "../../hooks/vote/mutations";
import { useVoteQuery } from "../../hooks/vote/queries";
import { VOTE_GET } from "../../libs/queryKeys";
import { getToday } from "../../libs/utils/dateUtils";
import { IUser } from "../../models/user";
import { useState } from "react";

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

function VoteBtn() {
  const { data: session } = useSession();
  const toast = useToast();
  const queryClient = useQueryClient();
  const date = useRecoilValue(dateState);
  const today = getToday();
  const [attended, setAttended] = useRecoilState(attendingState);
  const dateFormat = dayjs(date).format("MDD");
  const todayFormat = dayjs(today).format("MDD");
  const [isLate, setIsLate] = useState(false);

  const {
    data: vote,
    isLoading,
    isFetching,
  } = useVoteQuery(date, {
    enabled: true,
    onError: (err) => {
      toast({
        title: "불러오기 실패",
        description: "투표 정보를 불러오지 못 했어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  const { mutate: handleAbsent, isLoading: absentLoading } = useAbsentMutation(
    date,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([VOTE_GET, date]);
        setAttended(null);
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

  let isCheck = false;
  vote?.participations?.flatMap((participant) => {
    if (participant.status === "open") {
      participant.attendences.map((a) => {
        if (a.arrived && (a.user as IUser).uid === session?.uid?.toString()) {
          isCheck = true;
        }
      });
    }
  });

  const isAttending = vote?.participations?.flatMap((participant) => {
    if (participant.status === "open") {
      return participant.attendences.map((a) => (a.user as IUser).uid);
    }
  });

  const realAttend =
    isAttending?.some((userId) => userId === session?.uid?.toString()) || false;

  const CheckClosed = vote?.participations.every((p) => p.status !== "pending");

  const { mutate: handleArrived } = useArrivedMutation(dayjs(today), {
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
    if (attended !== null) {
      handleAbsent();
    } else {
      setIsLate(true);
      onVoteModalOpen();
    }
  };

  return (
    <>
      <OutlineCircle>
        <VoteCircle
          onClick={
            dateFormat < todayFormat
              ? null
              : isCheck
              ? null
              : dateFormat === todayFormat && realAttend
              ? () => handleArrived()
              : dateFormat === todayFormat
              ? () => lateVote()
              : attended !== null
              ? () => handleAbsent()
              : () => onVoteModalOpen()
          }
          state={
            dateFormat < todayFormat
              ? "Closed"
              : dateFormat === todayFormat && realAttend
              ? "Check"
              : dateFormat === todayFormat
              ? "Join ?"
              : attended !== null
              ? "Voted"
              : "Vote"
          }
        >
          {dateFormat < todayFormat
            ? "Closed"
            : isCheck
            ? "출석완료"
            : dateFormat === todayFormat && realAttend
            ? "Check"
            : dateFormat === todayFormat
            ? "Join ?"
            : attended !== null
            ? "Voted"
            : "Vote"}
        </VoteCircle>
      </OutlineCircle>
      {isVoteModalOpen && (
        <VoteModal
          isOpen={isVoteModalOpen}
          onClose={onVoteModalClose}
          participations={vote.participations}
          date={date}
          isLate={isLate}
        />
      )}
    </>
  );
}
export default VoteBtn;
