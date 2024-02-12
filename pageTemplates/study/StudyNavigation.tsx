import { Button } from "@chakra-ui/react";
import {
  faBan,
  faCircleXmark,
  faClock,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IAlertModalOptions } from "../../components2/AlertModal";

import { IIconLinkTile } from "../../components2/atoms/IconLinkTile";
import IconTileRowLayout from "../../components2/organisms/IconTileRowLayout";
import { MAX_USER_PER_PLACE } from "../../constants/settingValue/study/study";
import { useToast, useTypeToast } from "../../hooks/custom/CustomToast";
import { useStudyParticipationMutation } from "../../hooks/study/mutations";
import { usePointSystemMutation } from "../../hooks/user/mutations";
import { usePointSystemLogQuery } from "../../hooks/user/queries";
import { myStudyState, studyDateStatusState } from "../../recoils/studyRecoils";
import { PLACE_TO_LOCATION } from "../../storage/study";
import { IPointLog } from "../../types/user/pointSystem";
import { StudyDateStatus } from "../../types2/studyTypes/studySubTypes";
import {
  IParticipation,
  StudyStatus,
} from "../../types2/studyTypes/studyVoteTypes";
import StudyNavModal from "./studyNavModal";

interface IStudyNavigation {
  voteCnt: number;
  studyStatus: StudyStatus;
}

type MainBtnType =
  | "vote"
  | "freeOpen"
  | "attendCheck"
  | "attendCheckImage"
  | "private";

type SubNavBtn = "changeTime" | "absent" | "cancelVote" | "lightAbsent";
export type studyModalType = MainBtnType | SubNavBtn;

function StudyNavigation({ voteCnt, studyStatus }: IStudyNavigation) {
  const toast = useToast();
  const typeToast = useTypeToast();
  const { data: session } = useSession();
  const { id, date } = useParams<{ id: string; date: string }>() || {};

  const location = PLACE_TO_LOCATION[id];
  const isGuest = session?.user.name === "guest";

  const isPrivate = false;
  const attendences = [];
  const uid = session?.user.uid;

  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudy = useRecoilValue(myStudyState);
  const votingType = getVotingType(myStudy, id);

  const [modalType, setModalType] = useState<studyModalType>();
  const [modalOptions, setModalOptions] = useState<IAlertModalOptions>();

  const isAttend = checkMyAttend(studyDateStatus, myStudy, uid);
  const isSubNav = checkSubNavExists(studyDateStatus, votingType, isAttend);
  const { text, func } = getMainButtonStatus(
    voteCnt >= MAX_USER_PER_PLACE,
    studyDateStatus,
    votingType,
    isAttend,
    studyStatus
  );

  const { mutate: getPoint } = usePointSystemMutation("point");

  /** cancel */
  const { data: pointLog } = usePointSystemLogQuery("point", true, {
    enabled: !!isSubNav,
  });
  const myPrevVotePoint = getMyPrevVotePoint(pointLog, date);
  const { mutate: handleAbsent } = useStudyParticipationMutation(
    dayjs(date),
    "delete",
    {
      onSuccess() {
        if (myPrevVotePoint) {
          getPoint({
            message: "스터디 투표 취소",
            value: -myPrevVotePoint,
          });
        }
        toast("success", "취소되었습니다.");
      },
      onError: () => typeToast("error"),
    }
  );

  const handleSubNav = (type: SubNavBtn) => {
    if (isGuest) {
      typeToast("guest");
      return;
    }
    if (type === "cancelVote") {
      if (studyDateStatus !== "not passed") {
        toast("error", "스터디 확정 이후에는 당일 불참만 가능합니다.");
      } else {
        setModalOptions({
          title: "참여 취소",
          subTitle: "스터디 신청을 취소하시겠습니까?",
          func: () => handleAbsent(),
        });
      }
    }
    if (type === "absent" && studyDateStatus === "not passed") {
      toast("error", "스터디 확정 이후부터 사용이 가능합니다.");
    }
    setModalType(type);
  };

  // const onClickMainBtn = (type: MainBtnType) => {
  //   if (isGuest) {
  //     failToast("guest");
  //     return;
  //   }
  //   setModalType(type);
  // };

  const tileDataArr: IIconLinkTile[] = [
    {
      icon: <FontAwesomeIcon icon={faCircleXmark} size="xl" />,
      text: "참여 취소",
      func: () => handleSubNav("cancelVote"),
    },
    {
      icon: <FontAwesomeIcon icon={faClock} size="xl" />,
      text: "시간 변경",
      func: () => handleSubNav("changeTime"),
    },
    {
      icon: <FontAwesomeIcon icon={faBan} size="xl" />,
      text: "당일 불참",
      func: () => handleSubNav("absent"),
    },
  ];

  return (
    <>
      <Layout>
        {isSubNav && (
          <Wrapper>
            <IconTileRowLayout tileDataArr={tileDataArr} size="lg" />
          </Wrapper>
        )}
        <Button colorScheme={func ? "mintTheme" : "blackAlpha"} size="lg">
          {text}
        </Button>
      </Layout>
      <StudyNavModal
        type={modalType}
        setType={setModalType}
        modalOptions={modalOptions}
      />
    </>
  );
  // <Wrapper isShowSubNav={!!isShowSubNav}>
  //   <Layout>
  //     {isShowSubNav && (
  //       <SubNav>
  //         <Button onClick={() => onClickSubBtn("cancel")}>
  //           <FontAwesomeIcon icon={faCircleXmark} size="xl" />
  //           <span>투표 취소</span>
  //         </Button>
  //         <Button onClick={() => onClickSubBtn("changeTime")}>
  //           <FontAwesomeIcon icon={faClock} size="xl" />
  //           <span>시간 변경</span>
  //         </Button>
  //         <Button
  //           onClick={() =>
  //             onClickSubBtn(
  //               !isPrivate && status !== "free" ? "absent" : "lightAbsent"
  //             )
  //           }
  //         >
  //           <FontAwesomeIcon icon={faBan} size="xl" />
  //           <span>당일 불참</span>
  //         </Button>
  //       </SubNav>
  //     )}
  //     <MainButton func={!!func} onClick={() => onClickMainBtn(func)}>
  //       {text}
  //     </MainButton>
  //   </Layout>
  //   {/* <studyNavModal
  //     type={modalType}
  //     setType={setModalType}
  //     myVote={myVote}
  //     place={place}
  //     attCnt={attCnt}
  //   /> */}
  // </Wrapper>
}

const Layout = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  z-index: 50;
  box-shadow: var(--box-shadow-top-b);
`;

const Wrapper = styled.div`
  padding: 0 20px;

  padding-bottom: 12px;
`;

// const Wrapper = styled.div<{ isShowSubNav: boolean }>`
//   margin-top: auto;
//   padding-top: var(--padding-sub);

//   background-color: ${(props) =>
//     props.isShowSubNav ? "var(--font-h8)" : "white"};
// `;

const SubNav = styled.nav`
  display: flex;
  padding-top: var(--padding-main);
  padding-bottom: var(--padding-min);
  justify-content: space-around;
`;

// const Button = styled.button`
//   align-items: center;
//   color: var(--font-h2);
//   width: 60px;

//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   font-size: 16px;
//   > span {
//     font-size: 14px;
//   }
//   > span:last-child {
//     margin-top: var(--margin-sub);
//   }
// `;

const MainButton = styled.button<{ func?: boolean }>`
  margin: var(--margin-main);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.func ? "var(--color-mint)" : "var(--font-h4)"};
  color: white;
  height: 48px;
  border-radius: var(--border-radius2);
  padding: var(--padding-sub) 2px;
  font-weight: 600;
  font-size: 16px;
`;

const getVotingType = (myStudy: IParticipation, placeId: string) => {
  return !myStudy ? null : myStudy?.place._id === placeId ? "same" : "other";
};

const getMyPrevVotePoint = (pointLogs: IPointLog[], date: string) => {
  return pointLogs?.find(
    (item) => item.message === "스터디 투표" && item.meta.sub === date
  )?.meta.value;
};

const checkMyAttend = (
  studyDateStatus: StudyDateStatus,
  myStudy: IParticipation,
  uid: string
) => {
  return !!(
    studyDateStatus !== "not passed" &&
    myStudy?.attendences.find((who) => who.user.uid === uid)?.arrived
  );
};

const checkSubNavExists = (
  studyDateStatus: StudyDateStatus,
  votingType: "same" | "other" | null,
  isAttend: boolean
): boolean => {
  if (isAttend) return false;
  switch (studyDateStatus) {
    case "passed":
      return false;
    case "not passed":
      if (votingType) return true;
    case "today":
      if (votingType === "same") return true;
      return false;
  }
};

const getMainButtonStatus = (
  isMax: boolean,
  studyDateStatus: StudyDateStatus,
  votingType: "same" | "other" | null,
  isAttend: boolean,
  studyStatus: StudyStatus
): {
  text: string;
  func?: MainBtnType;
} => {
  if (isAttend) return { text: "출석 완료" };
  switch (studyDateStatus) {
    case "passed":
      return { text: "기간 만료" };
    case "not passed":
      if (votingType) return { text: "투표 완료" };
      if (isMax) return { text: "인원 마감" };
      return { text: "스터디 투표", func: "vote" };
    case "today":
      if (votingType === "same")
        return { text: "출석 체크", func: "attendCheck" };
      if (votingType === "other")
        return { text: "다른 스터디에 참여중입니다." };
      if (isMax) return { text: "인원 마감" };
      if (studyStatus === "dismissed")
        return { text: "FREE 오픈 신청", func: "freeOpen" };
      return { text: "스터디 투표", func: "vote" };
  }
};

export default StudyNavigation;
