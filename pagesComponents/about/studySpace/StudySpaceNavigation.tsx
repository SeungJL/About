import { faCircleXmark, faClock } from "@fortawesome/pro-regular-svg-icons";
import { faBan } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { STUDY_VOTE } from "../../../constants/keys/queryKeys";
import { MAX_USER_PER_PLACE } from "../../../constants/settingValue/study";
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
  myStudyState,
  myVotingState,
  studyDateStatusState,
} from "../../../recoil/studyAtoms";
import { locationState, userAccessUidState } from "../../../recoil/userAtoms";

import {
  IAttendance,
  IPlace,
  StudyStatus,
} from "../../../types/study/studyDetail";
import { IUser } from "../../../types/user/user";
import StudySpaceNavModal from "./studySpaceNavModal";

interface IStudySpaceNavigation {
  attendences: IAttendance[];
  place: IPlace;
  status: StudyStatus;
  isPrivate?: boolean;
}

type MainBtnType =
  | "vote"
  | "freeOpen"
  | "attendCheck"
  | "attendCheckImage"
  | "private";
type SubBtnType = "change" | "absent" | "cancel" | "lightAbsent";
export type StudySpaceModalType = MainBtnType | SubBtnType;

function StudySpaceNavigation({
  place,
  attendences,
  status,
  isPrivate,
}: IStudySpaceNavigation) {
  const router = useRouter();
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const voteDate = dayjs(router.query.date as string);

  const uid = useRecoilValue(userAccessUidState);
  const myVoting = useRecoilValue(myVotingState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudyFixed = useRecoilValue(myStudyState);
  const location = useRecoilValue(locationState);

  const resetQueryData = useResetQueryData();

  const [modalType, setModalType] = useState<StudySpaceModalType>();

  const myVote = attendences?.find(
    (props) => (props.user as IUser).uid === session?.uid
  );

  const { data: pointLog } = usePointSystemLogQuery("point", true, {
    enabled: !!myVote,
  });
  const myPrevVotePoint = pointLog?.find(
    (item) =>
      item.message === "스터디 투표" && item.meta.sub === dayjsToStr(voteDate)
  )?.meta.value;

  const { mutate: getPoint } = usePointSystemMutation("point");
  const { mutate: handleAbsent } = useStudyParticipationMutation(
    voteDate,
    "delete",
    {
      onSuccess() {
        resetQueryData([STUDY_VOTE, dayjsToStr(voteDate), location]);
        if (myPrevVotePoint) {
          getPoint({
            message: "스터디 투표 취소",
            value: -myPrevVotePoint,
          });
        }
        completeToast("free", "신청이 취소되었습니다.");
      },
      onError: errorToast,
    }
  );

  const onClickSubBtn = (type: SubBtnType) => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    if (!myVote) {
      failToast("free", "스터디에 투표하지 않은 인원입니다.");
      return;
    }
    if (type === "cancel") {
      if (studyDateStatus !== "not passed") {
        failToast("free", "참여 확정 이후에는 당일 불참 버튼을 이용해주세요!");
      } else handleAbsent();
      return;
    }
    if (type === "absent" && studyDateStatus === "not passed") {
      failToast("free", "스터디 확정 이후에 사용이 가능합니다.");
      return;
    }
    setModalType(type);
  };

  const onClickMainBtn = (type: MainBtnType) => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    setModalType(type);
  };

  const getStudyButtonText = (): {
    text: string;
    func?: MainBtnType;
  } => {
    const isMax = attendences.length >= MAX_USER_PER_PLACE;

    if (studyDateStatus === "passed") return { text: "기간만료" };
    if (isPrivate && !myVote)
      return { text: "개인 스터디 신청", func: "private" };
    if (studyDateStatus === "not passed") {
      if (myVoting) return { text: "투표 완료" };
      if (isMax) return { text: "정원 마감 (2지망 투표로만 가능)" };
      return { text: "스터디 투표", func: "vote" };
    }
    if (myStudyFixed && !myVote) return { text: "다른 스터디에 참여중입니다." };
    if (status === "dismissed")
      return { text: "Free 오픈 신청", func: "freeOpen" };
    if (myVote?.arrived) return { text: "출석 완료" };
    if (isPrivate) return { text: "출석 체크", func: "attendCheckImage" };
    if (myVote?.firstChoice) return { text: "출석 체크", func: "attendCheck" };
    return { text: "당일 참여", func: "vote" };
  };
  const { text, func } = getStudyButtonText();

  const isShowSubNav =
    text !== "출석 완료" &&
    ((myVoting && studyDateStatus === "not passed") ||
      (studyDateStatus === "today" && myVote));

  const attCnt = attendences?.filter((att) => att.user.uid !== uid)?.length;

  return (
    <Wrapper>
      <Layout>
        {isShowSubNav && (
          <SubNav>
            <Button onClick={() => onClickSubBtn("cancel")}>
              <FontAwesomeIcon icon={faCircleXmark} size="xl" />
              <span>투표 취소</span>
            </Button>
            <Button onClick={() => onClickSubBtn("change")}>
              <FontAwesomeIcon icon={faClock} size="xl" />
              <span>시간 변경</span>
            </Button>
            <Button
              onClick={() =>
                onClickSubBtn(
                  !isPrivate && status !== "free" ? "absent" : "lightAbsent"
                )
              }
            >
              <FontAwesomeIcon icon={faBan} size="xl" />
              <span>당일 불참</span>
            </Button>
          </SubNav>
        )}
        <MainButton func={!!func} onClick={() => onClickMainBtn(func)}>
          {text}
        </MainButton>
      </Layout>
      <StudySpaceNavModal
        type={modalType}
        setType={setModalType}
        myVote={myVote}
        place={place}
        attCnt={attCnt}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: auto;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
  padding-top: var(--padding-max);
  border-radius: var(--border-radius-main);
`;

const SubNav = styled.nav`
  display: flex;
  margin-bottom: var(--margin-main);
  justify-content: space-around;
`;

const Button = styled.button`
  align-items: center;
  color: var(--font-h2);
  width: 60px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > span {
    font-size: 13px;
  }
`;

const MainButton = styled.button<{ func?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.func ? "var(--color-mint)" : "var(--font-h4)"};
  color: white;
  height: 48px;
  border-radius: 13px;
  padding: var(--padding-sub) 2px;
  font-weight: 700;
  font-size: 15px;
`;

export default StudySpaceNavigation;
