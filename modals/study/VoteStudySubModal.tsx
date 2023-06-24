import { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";

import TimeRullet from "../../components/utils/TimeRullet";

import { useRecoilValue } from "recoil";
import { useVoteQuery } from "../../hooks/vote/queries";
import { isVotingState, studyDateState } from "../../recoil/studyAtoms";

import { useAttendMutation } from "../../hooks/vote/mutations";

import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import SpaceSelector from "../../components/utils/SpaceSelector";
import SpaceSelectorLg from "../../components/utils/SpaceSelectorLg";
import { POINT_SYSTEM_PLUS } from "../../constants/pointSystem";
import { START_HOUR } from "../../constants/study";
import {
  useAdminPointMutation,
  useAdminScoremMutation,
} from "../../hooks/admin/mutation";
import {
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";
import { VOTE_GET } from "../../libs/queryKeys";
import { SPACE_LOCATION } from "../../storage/study";
import { IPlace, IVoteInfo } from "../../types/studyDetails";
import { ITimeStartToEnd } from "../../types/utils";

interface IVoteStudySubModal {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  voteDate: Dayjs;
  place: IPlace;
  setIsVoteComplete: Dispatch<SetStateAction<boolean>>;
}

function VoteStudySubModal({
  isModal,
  setIsModal,
  voteDate,
  place,
  setIsVoteComplete,
}: IVoteStudySubModal) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();
  const spaceID = router.query.studySpace;
  const location = SPACE_LOCATION[spaceID as string];
  const studyDate = useRecoilValue(studyDateState);

  const isVoting = useRecoilValue(isVotingState);
  const [isFirst, setIsFirst] = useState(true);
  const [secondPlace, setSecondPlace] = useState([]);
  const [selectTime, setSelectTime] = useState<ITimeStartToEnd>({
    start: null,
    end: null,
  });

  const [otherPlaceArr, setOtherPlaceArr] = useState<IPlace[]>();
  const inviteUid = router.query?.uid;

  useVoteQuery(voteDate, location, {
    onSuccess(data) {
      setOtherPlaceArr(
        data?.participations
          .filter((par) => par.place != place)
          .map((par) => par.place)
      );
    },
  });

  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { mutate: getInviteScore } = useAdminScoremMutation(
    inviteUid as string,
    {
      onSuccess() {},
    }
  );
  const { mutate: getInvitePoint } = useAdminPointMutation(inviteUid as string);
  const { mutate: patchAttend } = useAttendMutation(voteDate, {
    onSuccess: () => {
      queryClient.invalidateQueries(VOTE_GET);
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
      // setIsVoteComplete(true);
    },
  });

  const startTimeArr = [];
  const endTimeArr = [];
  for (let i = START_HOUR; i <= START_HOUR + 10; i++) {
    startTimeArr.push({ hour: i, minutes: "00" });
    endTimeArr.push({ hour: i + 2, minutes: "00" });
    if (i !== START_HOUR + 10) {
      startTimeArr.push({ hour: i, minutes: 30 });
      endTimeArr.push({ hour: i + 2, minutes: 30 });
    }
  }

  const onSubmit = async () => {
    const voteInfo: IVoteInfo = {
      place,
      subPlace: secondPlace,
      start: selectTime.start,
      end: selectTime.end,
    };
    await patchAttend(voteInfo);
    setIsModal(false);
  };

  const onNextClicked = () => {
    if (selectTime.start > selectTime.end) {
      toast({
        title: "잘못된 입력",
        description: "시작 시간은 종료 시간 이전이어야 합니다",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (studyDate === "not passed") setIsFirst(false);
    else onSubmit();
  };
  return (
    <>
      {isFirst ? (
        <Layout
          initial={{ y: "90vh" }}
          animate={isModal ? { y: 0 } : { y: "100vh" }}
          transition={{ duration: 0.5 }}
        >
          <TopNav />
          <Header>
            <span>{voteDate.locale("ko").format("M월 DD일 ddd요일")}</span>
            <span>스터디 참여시간을 선택해주세요!</span>
          </Header>
          <TimeChoiceLayout>
            <TimeWrapper>
              <span>시작 시간</span>
              <TimeRullet
                timeArr={startTimeArr}
                setTime={(time: Dayjs) =>
                  setSelectTime((old) => ({ ...old, start: time }))
                }
              />
            </TimeWrapper>
            <TimeWrapper>
              <span>종료 시간</span>
              <TimeRullet
                timeArr={endTimeArr}
                setTime={(time) =>
                  setSelectTime((old) => ({ ...old, end: time }))
                }
              />
            </TimeWrapper>
          </TimeChoiceLayout>{" "}
          <MainButton onClick={onNextClicked}>
            <span>{studyDate === "not passed" ? "선택" : "완료"}</span>
          </MainButton>
        </Layout>
      ) : (
        <Layout
          initial={{ y: "90vh" }}
          animate={isModal ? { y: 0 } : { y: "100vh" }}
          transition={{ duration: 0.5 }}
        >
          <TopNav />
          <Header>
            <span>{voteDate.locale("ko").format("M월 DD일 ddd요일")}</span>
            <span>추가 2지망 장소를 선택해주세요</span>
          </Header>
          <SpaceWrapper>
            {location === "수원" ? (
              <SpaceSelectorLg
                spaceArr={otherPlaceArr}
                selectSpace={secondPlace}
                setSelectSpace={setSecondPlace}
              />
            ) : (
              <SpaceSelector
                spaceArr={otherPlaceArr}
                selectSpace={secondPlace}
                setSelectSpace={setSecondPlace}
              />
            )}
          </SpaceWrapper>
          {location !== "수원" && <Comment>Study with us</Comment>}
          <MainButton onClick={onSubmit}>
            <span>투표 완료</span>
          </MainButton>
        </Layout>
      )}
    </>
  );
}
const Layout = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 424px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
  z-index: 20;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TopNav = styled.nav`
  width: 56px;
  height: 4px;
  border-radius: 4px;
  background-color: var(--font-h5);
  margin-bottom: 24px;
`;
const Header = styled.header`
  align-self: start;
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  > span:first-child {
    font-weight: 600;
    font-size: 15px;
    color: var(--font-h2);
    display: inline-block;
    margin-bottom: 4px;
  }
  > span:last-child {
    font-size: 20px;
    font-weight: 600;
    color: var(--font-h1);
  }
`;

const TimeWrapper = styled.div`
  > span {
    font-weight: 600;
    color: var(--font-h3);
    font-size: 13px;
  }
`;

const TimeChoiceLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 5px;
`;

const MainButton = styled.button<{ func?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-mint);
  color: white;
  height: 48px;
  border-radius: 13px;
  padding: 14px 2px 14px 2px;
  font-weight: 700;
  font-size: 15px;
  margin-top: auto;
`;

const SpaceWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-top: 16px;
  width: 100%;
`;
const Comment = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--font-h2);
`;
export default VoteStudySubModal;
