import { Button } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useToast } from "../../../hooks/custom/CustomToast";
import { useStudyParticipationMutation } from "../../../hooks/study/mutations";
import { usePointSystemMutation } from "../../../hooks/user/mutations";
import { usePointSystemLogQuery } from "../../../hooks/user/queries";
import {
  myStudyState,
  studyDateStatusState
} from "../../../recoils/studyRecoils";
import { IModal } from "../../../types/reactTypes";
import { IStudyVote } from "../../../types2/studyTypes/studyVoteTypes";
import { dayjsToStr } from "../../../utils/dateTimeUtils";
import { IBottomDrawerLgOptions } from "../../organisms/drawer/BottomDrawerLg";
import StudyVoteTimeRulletDrawer from "./StudyVoteTimeRulletDrawer";

interface IMapBottomNav extends IModal {
  myVote: IStudyVote;
  voteScore: number;
}

function MapBottomNav({ setIsModal, myVote, voteScore }: IMapBottomNav) {
  const toast = useToast();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const date = searchParams.get("date");

  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudy = useRecoilValue(myStudyState);

  const [voteTime, setVoteTime] = useState<{ start: Dayjs; end: Dayjs }>();
  const [isTimeModal, setIsTimeModal] = useState(false);

  const onClickTimeSelect = () => {
    if (!myVote?.place) {
      toast("error", "장소를 먼저 선택해주세요!");
      return;
    }
    setIsTimeModal(true);
  };

  const { data: pointLog } = usePointSystemLogQuery("point", true, {
    enabled: !!myStudy,
  });

  //오늘 날짜 투표 포인트 받은거 찾기
  const myPrevVotePoint = pointLog?.find(
    (item) =>
      item.message === "스터디 투표" &&
      item.meta.sub === dayjsToStr(dayjs(date))
  )?.meta.value;

  const { mutate: getPoint } = usePointSystemMutation("point");
  const { mutate: patchAttend } = useStudyParticipationMutation(
    dayjs(date),
    "post",
    {
      onSuccess() {
        handleSuccess();
      },
    }
  );

  const handleSuccess = async () => {
    if (myPrevVotePoint) {
      await getPoint({
        message: "스터디 투표 취소",
        value: -myPrevVotePoint,
      });
    }
    if (studyDateStatus === "not passed" && voteScore) {
      await getPoint({
        value: voteScore,
        message: "스터디 투표",
        sub: date,
      });
      toast("success", `투표 완료! ${!myStudy && "포인트가 적립되었습니다."}`);
    } else toast("success", "투표 완료!");
    setIsModal(false);
  };

  const onSubmit = () => {
    patchAttend({
      ...myVote,
      ...voteTime,
    });
  };

  const drawerOptions: IBottomDrawerLgOptions = {
    header: {
      title: dayjs().format("M월 DD일 ddd요일"),
      subTitle: "스터디 참여시간을 선택해주세요!",
    },
    footer: {
      buttonText: "선택 완료",
      onClick: onSubmit,
    },
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
      <AnimatePresence>
        {isTimeModal && (
          <StudyVoteTimeRulletDrawer
            drawerOptions={drawerOptions}
            setIsModal={setIsTimeModal}
            setVoteTime={setVoteTime}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  > button {
    width: 100%;
    max-width: var(--view-max-width);
  }
  > button:last-child {
    margin-top: var(--gap-3);
  }
`;

const TimeModalLayout = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100vw;
  max-width: var(--max-width);
  height: 411.5px;
  border-top-left-radius: var(--rounded-lg);
  border-top-right-radius: var(--rounded-lg);

  background-color: white;
  z-index: 20;
  padding: var(--gap-4);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TopNav = styled.nav`
  width: 56px;
  height: 4px;
  border-radius: 4px;
  background-color: var(--gray-5);
  margin-bottom: var(--gap-5);
`;
const Header = styled.header`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--gap-5);
  > span:first-child {
    font-weight: 600;
    font-size: 15px;
    color: var(--gray-2);
    margin-bottom: var(--gap-1);
  }
  > span:last-child {
    font-size: 20px;
    font-weight: 600;
    color: var(--gray-1);
  }
`;
export default MapBottomNav;
