import styled from "styled-components";
import { useQueryClient } from "react-query";
import { useToast } from "@chakra-ui/react";
import { CenterDiv } from "../../styles/LayoutStyles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  useAbsentMutation,
  useArrivedMutation,
} from "../../hooks/vote/mutations";
import { VOTE_GET } from "../../libs/queryKeys";
import { getToday } from "../../libs/utils/dateUtils";
import { IParticipation } from "../../models/vote";
import {
  isAttendCheckModalState,
  isShowStudyVoteModalState,
  modalContextState,
} from "../../recoil/modalAtoms";
import {
  isVotingState,
  voteDateState,
  voteStatusState,
} from "../../recoil/voteAtoms";
import ModalPortal from "../../libs/utils/ModalPortal";
import AttendCheckModal from "../../modals/study/AttendCheckModal";
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
    props.state === ""
      ? "linear-gradient(45deg,RGB(108, 66, 28),rgb(78, 42, 11))"
      : props.state === "Closed"
      ? "linear-gradient(45deg,#F1F2F6,#C9C6C6)"
      : props.state === "Check" || props.state === "Completed"
      ? "linear-gradient(45deg,#FFDD00,#FBB034)"
      : props.state === "Join ?"
      ? "linear-gradient(45deg,RGB(108, 66, 28),rgb(78, 42, 11))"
      : props.state === "Voted"
      ? "linear-gradient(45deg,#FFD700,#FEBE10)"
      : "linear-gradient(45deg,RGB(143, 80, 23),RGB(83, 46, 13))"};
  color: ${(props) =>
    props.state === ""
      ? "white"
      : props.state === "Closed"
      ? "rgb(0,0,0,0.7)"
      : props.state === "Check" || props.state === "Completed"
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
  mainLoading: boolean;
}

function VoteBtn({ participations, mainLoading }: IVoteBtn) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const voteDate = useRecoilValue(voteDateState);
  const setIsShowStudyVote = useSetRecoilState(isShowStudyVoteModalState);
  const voteStatus = useRecoilValue(voteStatusState);
  const setisVoting = useSetRecoilState(isVotingState);
  const setModalContext = useSetRecoilState(modalContextState);
  const [isAttendCheckModal, setIsAttendCheckModal] = useRecoilState(
    isAttendCheckModalState
  );

  const { mutate: handleAbsent, isLoading: absentLoading } = useAbsentMutation(
    voteDate,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([VOTE_GET, voteDate]);
        setisVoting(false);
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
  const onCheckClicked = () => {
    setIsAttendCheckModal(true);
  };
  console.log(voteStatus);
  return (
    <>
      <OutlineCircle>
        <VoteCircle
          onClick={
            voteStatus === "Check"
              ? onCheckClicked
              : voteStatus === "Completed"
              ? null
              : ["Join", "Vote"].includes(voteStatus)
              ? onClickVote
              : voteStatus === "Voted"
              ? onClickVoted
              : null
          }
          state={mainLoading ? "" : voteStatus}
        >
          {mainLoading ? "" : voteStatus}
        </VoteCircle>
      </OutlineCircle>
      {isAttendCheckModal && (
        <ModalPortal closePortal={setIsAttendCheckModal}>
          <AttendCheckModal />
        </ModalPortal>
      )}
    </>
  );
}
export default VoteBtn;
