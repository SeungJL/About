import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useContext } from "react";
import CancelModal from "../modals/CancelModal";
import NotCompletedModal from "../modals/NotCompletedModal";
import UserInfoForm from "../modals/RegisterFormModal";

import OpenResultModal from "../modals/OpenResultModal";
import ModalPortal from "../libs/utils/ModalPortal";
import VoterModal from "../modals/VoterModal";
import StudyVoteModal from "../modals/StudyVoteModal";
import RegisterFormModal from "../modals/RegisterFormModal";
import { PrivacyPolicy } from "../storage/PrivacyPolicy";
import { useSession } from "next-auth/react";
import UserInfoSm from "../modals/UserInfoSm";
import { FullScreen } from "../styles/LayoutStyles";
import { isShowMemberInfoState } from "../recoil/membersAtoms";
import MemberInfoModal from "../modals/members/MemberInfoBgModal";
import MemberInfoBgModal from "../modals/members/MemberInfoBgModal";
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
      {privacyPolicy && <PrivacyPolicy />}
      {voteCancel && <CancelModal />}
      {notCompleted && <NotCompletedModal />}

      {openResult && <OpenResultModal />}
      {studyVote && <StudyVoteModal />}
      {voter && (
        <ModalPortal closePortal={setVoter} setModalContext={setModalContext}>
          <VoterModal />
        </ModalPortal>
      )}
      {registerForm && <RegisterFormModal />}
      {userInfoSm && <UserInfoSm />}
      {memberInfo && <MemberInfoBgModal />}
    </>
  );
}
export default Modals;
