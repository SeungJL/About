import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import StudyVoteTimeRulletDrawer from "../../../components2/organisms/drawer/StudyVoteTimeRulletDrawer";
import { STUDY_VOTE } from "../../../constants/keys/queryKeys";
import { POINT_SYSTEM_PLUS } from "../../../constants/settingValue/pointSystem";
import { dayjsToStr } from "../../../helpers/dateHelpers";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";
import { useStudyParticipationMutation } from "../../../hooks/study/mutations";
import { usePointSystemMutation } from "../../../hooks/user/mutations";
import { usePointSystemLogQuery } from "../../../hooks/user/queries";
import {
  myVotingState,
  studyDateStatusState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import { locationState } from "../../../recoil/userAtoms";
import { DispatchType, IModal } from "../../../types/reactTypes";
import { IStudyVote } from "../../../types2/studyTypes/studyVoteTypes";

interface IMapBottomNav extends IModal {
  myVote: IStudyVote;
  setMyVote: DispatchType<IStudyVote>;
  voteScore: number;
}

function MapBottomNav({
  setIsModal,
  setMyVote,
  myVote,
  voteScore,
}: IMapBottomNav) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const [isTimeModal, setIsTimeModal] = useState(false);
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myVoting = useRecoilValue(myVotingState);

  const { data: pointLog } = usePointSystemLogQuery("point", true, {
    enabled: !!myVoting,
  });

  //오늘 날짜 투표 포인트 받은거 찾기
  const myPrevVotePoint = pointLog?.find(
    (item) =>
      item.message === "스터디 투표" && item.meta.sub === dayjsToStr(voteDate)
  )?.meta.value;

  const resetQueryData = useResetQueryData();

  const { mutate: getPoint } = usePointSystemMutation("point");

  const { mutate: patchAttend } = useStudyParticipationMutation(
    voteDate,
    "post",
    {
      onSuccess() {
        handleSuccess();
      },
      onError: errorToast,
    }
  );

  const handleSuccess = async () => {
    resetQueryData([STUDY_VOTE, dayjsToStr(voteDate), location]);
    if (myPrevVotePoint) {
      await getPoint({ message: "스터디 투표 취소", value: -myPrevVotePoint });
    }
    let point = POINT_SYSTEM_PLUS.STUDY_VOTE[voteScore];
    if (studyDateStatus === "not passed" && voteScore) {
      await getPoint({
        value: voteScore,
        message: "스터디 투표",
        sub: dayjsToStr(voteDate),
      });
      completeToast("studyVote", point.value);
    } else completeToast("studyVote");
    setIsModal(false);
  };

  const onSubmit = () => {
    patchAttend(myVote);
  };

  const onClickTimeSelect = () => {
    if (!myVote?.place) {
      failToast("free", "장소를 먼저 선택해주세요!");
      return;
    }
    setIsTimeModal(true);
  };

  return (
    <>
      <Layout>
        <Button
          colorScheme="mintTheme"
          size="lg"
          h="48px"
          onClick={onClickTimeSelect}
          fontSize="16px"
        >
          시간 선택
        </Button>
        <Button
          fontSize="16px"
          h="48px"
          size="lg"
          onClick={() => setIsModal(false)}
        >
          닫기
        </Button>
      </Layout>
      {isTimeModal && (
        <StudyVoteTimeRulletDrawer
          setMyVote={setMyVote}
          setIsModal={setIsModal}
        />
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    margin-top: var(--margin-main);
    width: var(--view-width);
    max-width: var(--view-max-width);
  }
  > button:last-child {
    margin-top: var(--margin-sub);
  }
`;

const TimeModalLayout = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100vw;
  max-width: var(--max-width);
  height: 411.5px;
  border-top-left-radius: var(--border-radius-main);
  border-top-right-radius: var(--border-radius-main);

  background-color: white;
  z-index: 20;
  padding: var(--padding-main);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TopNav = styled.nav`
  width: 56px;
  height: 4px;
  border-radius: 4px;
  background-color: var(--font-h5);
  margin-bottom: var(--margin-max);
`;
const Header = styled.header`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--margin-max);
  > span:first-child {
    font-weight: 600;
    font-size: 15px;
    color: var(--font-h2);
    margin-bottom: var(--margin-min);
  }
  > span:last-child {
    font-size: 20px;
    font-weight: 600;
    color: var(--font-h1);
  }
`;
export default MapBottomNav;
