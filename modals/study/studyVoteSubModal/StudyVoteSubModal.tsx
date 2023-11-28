import "dayjs/locale/ko";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  studyDateStatusState,
  voteDateState,
} from "../../../recoil/studyAtoms";

import { useStudyParticipationMutation } from "../../../hooks/study/mutations";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { POINT_SYSTEM_PLUS } from "../../../constants/settingValue/pointSystem";
import { useAdminAboutPointMutation } from "../../../hooks/admin/mutation";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";

import { IModal } from "../../../types/reactTypes";
import { IPlace } from "../../../types/study/studyDetail";

import { Button } from "@chakra-ui/react";
import { ChoiceRank } from "../../../components/features/studyVote/StudyVoteMap";
import { STUDY_VOTE } from "../../../constants/keys/queryKeys";
import { dayjsToStr } from "../../../helpers/dateHelpers";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import { usePointSystemMutation } from "../../../hooks/user/mutations";
import { isRefetchStudySpaceState } from "../../../recoil/refetchingAtoms";
import { locationState } from "../../../recoil/userAtoms";
import { IStudyParticipate } from "../../../types/study/study";
import StudyVoteSubModalPlace from "./StudyVoteSubModalPlace";
import StudyVoteSubModalPrivate from "./StudyVoteSubModalPrivate";
import StudyVoteSubModalTime from "./StudyVoteSubModalTime";

interface IStudyVoteSubModal extends IModal {
  place: IPlace;
  isPrivate: boolean;
  attCnt: number;
}

function StudyVoteSubModal({
  setIsModal,
  place,
  isPrivate,
  attCnt,
}: IStudyVoteSubModal) {
  const router = useRouter();
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const errorToast = useErrorToast();

  const inviteUid = router.query?.uid;

  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);
  const setIsRefetchStudySpace = useSetRecoilState(isRefetchStudySpaceState);

  const [isFirst, setIsFirst] = useState(true);
  const [voteInfo, setVoteInfo] = useState<IStudyParticipate>();

  const resetQueryData = useResetQueryData();
  const { mutate: getPoint } = usePointSystemMutation("point");
  const { mutate: getInviteAboutPoint } = useAdminAboutPointMutation(
    inviteUid as string
  );

  const { mutate: patchAttend } = useStudyParticipationMutation(
    voteDate,
    "post",
    {
      onSuccess() {
        resetQueryData([STUDY_VOTE, dayjsToStr(voteDate), location]);
        const choices: ChoiceRank[] = ["first", "second", "third"];
        const choice = choices[attCnt];
        if (studyDateStatus === "not passed" && choice) {
          const point = POINT_SYSTEM_PLUS.STUDY_VOTE[choice];
          const subCnt = voteInfo.subPlace.length;
          getPoint({
            value: point.value || 0 + subCnt,
            message: point.message,
            sub: dayjsToStr(voteDate),
          });
          completeToast("studyVote", point.value);
        } else completeToast("studyVote");
        if (inviteUid) {
          getPoint(POINT_SYSTEM_PLUS.STUDY_INVITE);
          getInviteAboutPoint({
            value: POINT_SYSTEM_PLUS.STUDY_INVITE.value,
            message: `${session?.user.name}님의 스터디 참여 보너스`,
          });
        }
      },
      onError: errorToast,
    }
  );

  const onSubmit = () => {
    const data: IStudyParticipate = {
      ...voteInfo,
      place,
    };
    patchAttend(data);
    setIsModal(false);
  };

  const handleFirst = () => {
    if (voteInfo?.start >= voteInfo?.end) {
      failToast("free", "시작 시간은 종료 시간 이전이어야 합니다.");
      return;
    }
    if (studyDateStatus === "not passed" || isPrivate) {
      setIsFirst(false);
      return;
    }
    if (studyDateStatus === "today") onSubmit();
  };

  return (
    <Layout
      initial={{ y: "90vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TopNav />
      <Header>
        <span>{voteDate.locale("ko").format("M월 DD일 ddd요일")}</span>
        <span>
          {isFirst
            ? "스터디 참여시간을 선택해주세요!"
            : !isPrivate
            ? "추가 2지망 장소를 선택해주세요!"
            : "스터디 신청 장소를 입력해주세요!"}
        </span>
      </Header>
      {isFirst && <StudyVoteSubModalTime setVoteInfo={setVoteInfo} />}
      <Wrapper isFirst={isFirst}>
        {!isPrivate ? (
          <StudyVoteSubModalPlace setVoteInfo={setVoteInfo} />
        ) : (
          <StudyVoteSubModalPrivate setVoteInfo={setVoteInfo} />
        )}
      </Wrapper>
      <Button
        w="100%"
        colorScheme="mintTheme"
        size="lg"
        borderRadius="var(--border-radius-sub)"
        onClick={isFirst ? handleFirst : onSubmit}
        mt="auto"
      >
        {isFirst && (studyDateStatus === "not passed" || isPrivate)
          ? "다음"
          : isPrivate
          ? "신청 완료"
          : "투표 완료"}
      </Button>
    </Layout>
  );
}

const Wrapper = styled.div<{ isFirst: boolean }>`
  width: 100%;
  flex: 1;
  display: ${(props) => (props.isFirst ? "none" : "block")};
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

const Layout = styled(motion.div)`
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

export default StudyVoteSubModal;
