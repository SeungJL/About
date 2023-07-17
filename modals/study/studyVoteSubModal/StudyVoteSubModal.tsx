import "dayjs/locale/ko";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

import { useRecoilValue } from "recoil";
import { studyDateState, voteDateState } from "../../../recoil/studyAtoms";

import { useStudyParticipateMutation } from "../../../hooks/study/mutations";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { POINT_SYSTEM_PLUS } from "../../../constants/pointSystem";

import {
  useAdminPointMutation,
  useAdminScoremMutation,
} from "../../../hooks/admin/mutation";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/ui/CustomToast";
import {
  usePointMutation,
  useScoreMutation,
} from "../../../hooks/user/pointSystem/mutation";
import { IModal } from "../../../types/reactTypes";
import { IPlace, IVoteInfo } from "../../../types/studyDetails";
import StudyVoteSubModalPlace from "./StudyVoteSubModalPlace";
import StudyVoteSubModalTime from "./StudyVoteSubModalTime";

interface IStudyVoteSubModal extends IModal {
  place: IPlace;
}

function StudyVoteSubModal({ setIsModal, place }: IStudyVoteSubModal) {
  const router = useRouter();
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const inviteUid = router.query?.uid;

  const studyDate = useRecoilValue(studyDateState);
  const voteDate = useRecoilValue(voteDateState);

  const [isFirst, setIsFirst] = useState(true);
  const [voteInfo, setVoteInfo] = useState<IVoteInfo>();

  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { mutate: getInviteScore } = useAdminScoremMutation(
    inviteUid as string
  );
  const { mutate: getInvitePoint } = useAdminPointMutation(inviteUid as string);

  const { mutate: patchAttend } = useStudyParticipateMutation(voteDate, {
    onSuccess: () => {
      if (studyDate === "today") {
        getScore(POINT_SYSTEM_PLUS.voteStudyDaily.score);
        getPoint(POINT_SYSTEM_PLUS.voteStudyDaily.point);
      }
      if (studyDate === "not passed") {
        getScore(POINT_SYSTEM_PLUS.voteStudy.score);
        getPoint(POINT_SYSTEM_PLUS.voteStudy.point);
      }
      if (inviteUid) {
        getScore(POINT_SYSTEM_PLUS.voteStudy.invitePoint);
        getPoint(POINT_SYSTEM_PLUS.voteStudy.inviteScore);
        getInviteScore({
          value: POINT_SYSTEM_PLUS.voteStudy.inviteScore.value,
          message: `${session?.user.name}님의 스터디 참여 보너스`,
        });
        getInvitePoint({
          value: POINT_SYSTEM_PLUS.voteStudy.invitePoint.value,
          message: `${session?.user.name}님의 스터디 참여 보너스`,
        });
      }
      completeToast("studyVote");
    },
    onError: errorToast,
  });

  const onSubmit = () => {
    const data: IVoteInfo = { ...voteInfo, place };
    patchAttend(data);
    setIsModal(false);
  };

  const handleNext = () => {
    if (voteInfo?.start >= voteInfo?.end) {
      failToast("free", "시작 시간은 종료 시간 이전이어야 합니다.");
      return;
    }
    if (studyDate === "not passed") setIsFirst(false);
    if (studyDate === "today") onSubmit();
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
        {isFirst ? (
          <span>스터디 참여시간을 선택해주세요!</span>
        ) : (
          <span>추가 2지망 장소를 선택해주세요</span>
        )}
      </Header>
      {isFirst && <StudyVoteSubModalTime setVoteInfo={setVoteInfo} />}
      <Wrapper isFirst={isFirst}>
        <StudyVoteSubModalPlace setVoteInfo={setVoteInfo} />
      </Wrapper>
      <MainButton onClick={isFirst ? handleNext : onSubmit}>
        {isFirst ? (
          <span>{studyDate === "not passed" ? "선택" : "완료"}</span>
        ) : (
          <span>투표 완료</span>
        )}
      </MainButton>
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
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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
