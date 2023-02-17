import { useRecoilState, useRecoilValue } from "recoil";
import { useContext } from "react";
import CancelModal from "../modals/CancelModal";
import NotCompletedModal from "../modals/NotCompletedModal";
import UserInfoForm from "../models/UserInfoForm";
import {
  isShowNotCompletedState,
  isShowOpenResultState,
  isShowStudyVoteModalState,
  isShowUserInfoFormState,
  isShowVoteCancleState,
  isShowVoterState,
} from "../recoil/atoms";
import OpenResultModal from "../modals/OpenResultModal";
import ModalPortal from "../libs/utils/ModalPortal";
import VoterModal from "../modals/VoterModal";
import StudyVoteModal from "../modals/StudyVoteModal";

function Modals() {
  const isShowVoteCancel = useRecoilValue(isShowVoteCancleState);
  const isShowNotCompleted = useRecoilValue(isShowNotCompletedState);
  const isShowUserInfoForm = useRecoilValue(isShowUserInfoFormState);
  const [isShowVoter, setIsShowVoter] = useRecoilState(isShowVoterState);
  const isShowOpenResult = useRecoilValue(isShowOpenResultState);
  const isShowStudyVote = useRecoilValue(isShowStudyVoteModalState);

  return (
    <>
      {isShowVoteCancel && <CancelModal />}
      {isShowNotCompleted && <NotCompletedModal />}
      {isShowUserInfoForm && <UserInfoForm />}
      {isShowOpenResult && <OpenResultModal />}
      {isShowStudyVote && <StudyVoteModal />}
      {isShowVoter && (
        <ModalPortal closePortal={setIsShowVoter}>
          <VoterModal />
        </ModalPortal>
      )}
    </>
  );
}
export default Modals;
