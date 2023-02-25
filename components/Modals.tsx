import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useContext } from "react";
import CancelModal from "../modals/study/CancelModal";
import NotCompletedModal from "../modals/NotCompletedModal";
import UserInfoForm from "../modals/user/RegisterFormModal";

import OpenResultModal from "../modals/study/OpenResultModal";
import ModalPortal from "../libs/utils/ModalPortal";
import VoterModal from "../modals/study/VoterModal";
import StudyVoteModal from "../modals/study/StudyVoteModal";
import RegisterFormModal from "../modals/user/RegisterFormModal";
import { PrivacyPolicy } from "../storage/PrivacyPolicy";
import { useSession } from "next-auth/react";
import UserInfoSm from "../modals/user/UserInfoSm";
import { FullScreen } from "../styles/LayoutStyles";
import { isShowMemberInfoState } from "../recoil/membersAtoms";
import MemberInfoModal from "../modals/user/MemberInfoBgModal";
import MemberInfoBgModal from "../modals/user/MemberInfoBgModal";
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
        <ModalPortal closePortal={setVoter}>
          <VoterModal />
        </ModalPortal>
      )}
      {registerForm && <RegisterFormModal />}

      {memberInfo && <MemberInfoBgModal />}
    </>
  );
}
export default Modals;
