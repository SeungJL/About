import "dayjs/locale/ko";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

import { useRecoilValue } from "recoil";
import {
  studyDateStatusState,
  voteDateState,
} from "../../../recoil/studyAtoms";

import { useStudyParticipateMutation } from "../../../hooks/study/mutations";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { POINT_SYSTEM_PLUS } from "../../../constants/contentsValue/pointSystem";
import { useAdminAboutPointMutation } from "../../../hooks/admin/mutation";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/CustomToast";
import { useAboutPointMutation } from "../../../hooks/user/pointSystem/mutation";
import { IModal } from "../../../types/reactTypes";
import { IPlace } from "../../../types/study/studyDetail";

import { Button } from "@chakra-ui/react";
import { STUDY_VOTE_INFO } from "../../../constants/keys/queryKeys";
import { useResetQueryData } from "../../../hooks/CustomHooks";
import { IStudyParticipate } from "../../../types/study/study";
import StudyVoteSubModalPlace from "./StudyVoteSubModalPlace";
import StudyVoteSubModalPrivate from "./StudyVoteSubModalPrivate";
import StudyVoteSubModalTime from "./StudyVoteSubModalTime";

interface IStudyVoteSubModal extends IModal {
  place: IPlace;
  isPrivate: boolean;
}

function StudyVoteSubModal({
  setIsModal,
  place,
  isPrivate,
}: IStudyVoteSubModal) {
  const router = useRouter();
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const errorToast = useErrorToast();

  const inviteUid = router.query?.uid;

  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const voteDate = useRecoilValue(voteDateState);

  const [isFirst, setIsFirst] = useState(true);
  const [voteInfo, setVoteInfo] = useState<IStudyParticipate>();

  const resetQueryData = useResetQueryData();
  const { mutate: getAboutPoint } = useAboutPointMutation();
  const { mutate: getInviteAboutPoint } = useAdminAboutPointMutation(
    inviteUid as string
  );

  const { mutate: patchAttend } = useStudyParticipateMutation(voteDate, {
    onSuccess: () => {
      if (studyDateStatus === "today" && !isPrivate) {
        getAboutPoint(POINT_SYSTEM_PLUS.STUDY_VOTE_DAILY);
      }
      if (studyDateStatus === "not passed") {
        getAboutPoint(POINT_SYSTEM_PLUS.STUDY_VOTE);
      }
      if (inviteUid) {
        getAboutPoint(POINT_SYSTEM_PLUS.STUDY_INVITE);
        getInviteAboutPoint({
          value: POINT_SYSTEM_PLUS.STUDY_INVITE.value,
          message: `${session?.user.name}님의 스터디 참여 보너스`,
        });
      }
      resetQueryData(STUDY_VOTE_INFO);
      completeToast("studyVote");
    },
    onError: errorToast,
  });

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
      {/* <MainButton onClick={isFirst ? handleFirst : onSubmit}>
        {isFirst && (studyDateStatus === "not passed" || isPrivate)
          ? "다음"
          : isPrivate
          ? "신청 완료"
          : "투표 완료"}
      </MainButton> */}
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
  margin-bottom: var(--margin-main);
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
  width: 375px;
  height: 424px;
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

const MainButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-mint);
  color: white;
  height: 48px;
  border-radius: var(--border-radius-main);
  font-weight: 600;
  font-size: 16px;
  margin-top: var(--margin-main);
`;

export default StudyVoteSubModal;
