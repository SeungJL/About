import { useRecoilValue } from "recoil";
import NotCompletedModal from "../modals/pop-up/NotCompletedModal";
import VoteSuccessModal from "../pagesComponents/About/studySpace/VoteSuccessModal";
import {
  isShowNotCompletedState,
  isVoteCompleteState,
} from "../recoil/utilityAtoms";

function Modals() {
  const notCompleted = useRecoilValue(isShowNotCompletedState);
  const voteComplete = useRecoilValue(isVoteCompleteState);

  return <>{voteComplete && <VoteSuccessModal />}</>;
}
export default Modals;
