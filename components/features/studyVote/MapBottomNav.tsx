import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { POINT_SYSTEM_PLUS } from "../../../constants/contentsValue/pointSystem";
import { STUDY_VOTE } from "../../../constants/keys/queryKeys";
import { dayjsToStr } from "../../../helpers/dateHelpers";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
} from "../../../hooks/custom/CustomToast";
import { useStudyParticipationMutation } from "../../../hooks/study/mutations";
import { useAboutPointMutation } from "../../../hooks/user/mutations";
import StudyVoteSubModalTime from "../../../modals/study/studyVoteSubModal/StudyVoteSubModalTime";
import {
  studyDateStatusState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import { locationState } from "../../../recoil/userAtoms";
import { DispatchType, IModal } from "../../../types/reactTypes";
import { IStudyParticipate } from "../../../types/study/study";
import ModalPortal from "../../modals/ModalPortal";

interface IMapBottomNav extends IModal {
  voteInfo: IStudyParticipate;
  setVoteInfo: DispatchType<IStudyParticipate>;
}

function MapBottomNav({ setIsModal, setVoteInfo, voteInfo }: IMapBottomNav) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const [isTimeModal, setIsTimeModal] = useState(false);
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);

  const resetQueryData = useResetQueryData();
  const { mutate: getAboutPoint } = useAboutPointMutation();

  const { mutate: patchAttend } = useStudyParticipationMutation(
    voteDate,
    "post",
    {
      onSuccess() {
        setIsModal(false);
        resetQueryData([STUDY_VOTE, dayjsToStr(voteDate), location]);
        completeToast("studyVote");
        if (studyDateStatus === "today") {
          getAboutPoint(POINT_SYSTEM_PLUS.STUDY_VOTE_DAILY);
        }
        if (studyDateStatus === "not passed") {
          getAboutPoint(POINT_SYSTEM_PLUS.STUDY_VOTE);
        }
      },
      onError: errorToast,
    }
  );

  const onSubmit = () => {
    patchAttend(voteInfo);
  };

  return (
    <>
      <Layout>
        <Button
          colorScheme="mintTheme"
          size="lg"
          onClick={() => setIsTimeModal(true)}
        >
          시간 선택
        </Button>
        <Button size="lg" onClick={() => setIsModal(false)}>
          닫기
        </Button>
      </Layout>
      {isTimeModal && (
        <ModalPortal setIsModal={setIsTimeModal}>
          <TimeModalLayout
            initial={{ y: "90vh" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TopNav />
            <Header>
              <span>{voteDate.locale("ko").format("M월 DD일 ddd요일")}</span>
              <span>스터디 참여시간을 선택해주세요!</span>
            </Header>
            <StudyVoteSubModalTime setVoteInfo={setVoteInfo} />
            <Button
              w="100%"
              colorScheme="mintTheme"
              size="lg"
              borderRadius="var(--border-radius-sub)"
              mt="auto"
              onClick={onSubmit}
            >
              완료
            </Button>
          </TimeModalLayout>
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    margin-top: var(--margin-sub);
    width: var(--view-max-width);
  }
`;

const TimeModalLayout = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 420px;
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
  margin-bottom: var(--margin-sub);
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
