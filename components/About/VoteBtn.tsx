import { Center, useDisclosure, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  useAbsentMutation,
  useArrivedMutation,
} from "../../hooks/vote/mutations";
import { useVoteQuery } from "../../hooks/vote/queries";
import { VOTE_GET } from "../../libs/queryKeys";
import {
  getInterestingDate,
  getNextDate,
  getPreviousDate,
  strToDate,
} from "../../libs/utils/dateUtils";
import { IUser } from "../../models/user";
import { attendingState, dateState } from "../../recoil/atoms";
import { CenterDiv } from "../../styles/LayoutStyles";
import VoteModal from "../voteModal";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      ? "linear-gradient(45deg,RGB(143, 80, 23),RGB(83, 46, 13))"
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
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [date, setDate] = useRecoilState(dateState);
  const yesterday = dayjs(date).subtract(1, "day");
  const tomorrow = dayjs(date).add(1, "day");
  const today = strToDate(router.query.date as string);
  const attended = useRecoilValue(attendingState);
  const dateDay = dayjs(date).format("MDD");
  const todayDay = dayjs(today).format("MDD");

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
      onSuccess: async () => queryClient.invalidateQueries([VOTE_GET, date]),
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

  const isAttending = vote?.participations?.flatMap((participant) => {
    if (participant.status === "open") {
      return participant.attendences.map((a) => (a.user as IUser).uid);
    }
  });

  const realAttend =
    isAttending?.some((userId) => userId === session?.uid?.toString()) || false;

  const CheckClosed = vote?.participations.every((p) => p.status !== "pending");
  const { mutate: handleArrived } = useArrivedMutation(today, {
    onSuccess: (data) => queryClient.invalidateQueries(VOTE_GET),
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

  return (
    <>
      <OutlineCircle>
        <VoteCircle
          onClick={
            dateDay < todayDay
              ? null
              : dateDay === todayDay && realAttend
              ? () => handleArrived()
              : dateDay === todayDay
              ? null
              : attended !== -1
              ? () => handleAbsent()
              : () => onVoteModalOpen()
          }
          state={
            dateDay < todayDay
              ? "Closed"
              : dateDay === todayDay && realAttend
              ? "Check"
              : dateDay === todayDay
              ? "Join ?"
              : attended !== -1
              ? "Voted"
              : "Vote"
          }
          disabled={CheckClosed}
        >
          {dateDay < todayDay
            ? "Closed"
            : dateDay === todayDay && realAttend
            ? "Check"
            : dateDay === todayDay
            ? "Join ?"
            : attended !== -1
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
        />
      )}
    </>
  );
}
export default VoteBtn;
