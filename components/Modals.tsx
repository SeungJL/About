import { useRecoilValue } from "recoil";
import NotCompletedModal from "../modals/pop-up/NotCompletedModal";
import {
  isShowNotCompletedState,
  isVoteCompleteState,
} from "../recoil/utilityAtoms";
import VoteSuccessModal from "./Pages/About/studySpace/VoteSuccessModal";

function Modals() {
  const notCompleted = useRecoilValue(isShowNotCompletedState);
  const voteComplete = useRecoilValue(isVoteCompleteState);

  return (
    <>
      {notCompleted && <NotCompletedModal />}
      {voteComplete && <VoteSuccessModal />}
    </>
  );
}
export default Modals;
