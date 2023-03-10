import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useContext } from "react";
import CancelModal from "../modals/study/vote/CancelVoteModal";
import NotCompletedModal from "../modals/pop-up/NotCompletedModal";
import UserInfoForm from "../modals/user/RegisterFormModal";

import ModalPortal from "./ModalPortal";
import VoterModal from "../modals/study/confirm/StudyVoterModal";
import StudyVoteModal from "../modals/study/vote/VoteStudyModal";
import RegisterFormModal from "../modals/user/RegisterFormModal";
import { PrivacyPolicy } from "../storage/PrivacyPolicy";
import { useSession } from "next-auth/react";
import UserInfoSm from "../modals/user/UserInfoSmModal";
import { FullScreen } from "../styles/LayoutStyles";
import { isShowMemberInfoState } from "../recoil/membersAtoms";
import MemberInfoModal from "../modals/user/UserInfoBgModal";
import MemberInfoBgModal from "../modals/user/UserInfoBgModal";
import {
  isShowNotCompletedState,
  isShowStudyVoteModalState,
  isShowUserInfoSmState,
  isShowVoteCancleState,
  modalContextState,
} from "../recoil/modalAtoms";
import {
  isShowOpenResultState,
  isShowPrivacyPolicyState,
  isShowRegisterFormState,
  isShowVoterState,
} from "../recoil/voteAtoms";
import { VoteResultModal } from "../modals/study/confirm/VoteResultModal";

function Modals() {
  const { data: session } = useSession();
  const voteCancel = useRecoilValue(isShowVoteCancleState);
  const notCompleted = useRecoilValue(isShowNotCompletedState);
  const registerForm = useRecoilValue(isShowRegisterFormState);
  const [voter, setVoter] = useRecoilState(isShowVoterState);
  const openResult = useRecoilValue(isShowOpenResultState);
  const studyVote = useRecoilValue(isShowStudyVoteModalState);
  const privacyPolicy = useRecoilValue(isShowPrivacyPolicyState);
  const userInfoSm = useRecoilValue(isShowUserInfoSmState);
  const setModalContext = useSetRecoilState(modalContextState);

  /*member*/
  const memberInfo = useRecoilValue(isShowMemberInfoState);
  return (
    <>
      {privacyPolicy && <PrivacyPolicy closeModal={null} />}
      {voteCancel && <CancelModal />}
      {notCompleted && <NotCompletedModal />}

      {studyVote && <StudyVoteModal />}
      {voter && (
        <ModalPortal closePortal={setVoter}>
          <VoterModal />
        </ModalPortal>
      )}
      {openResult && <VoteResultModal />}
      {registerForm && <RegisterFormModal />}
      {memberInfo && <MemberInfoBgModal />}
    </>
  );
}
export default Modals;
