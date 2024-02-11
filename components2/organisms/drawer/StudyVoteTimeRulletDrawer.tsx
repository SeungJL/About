import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { STUDY_VOTE } from "../../../constants/keys/queryKeys";
import { STUDY_VOTE_HOUR_ARR } from "../../../constants2/serviceConstants/studyConstants/studyTimeConstant";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import { useCompleteToast } from "../../../hooks/custom/CustomToast";
import { useStudyParticipationMutation } from "../../../hooks/study/mutations";
import { usePointSystemMutation } from "../../../hooks/user/mutations";
import { usePointSystemLogQuery } from "../../../hooks/user/queries";
import {
  myStudyState,
  studyDateStatusState,
} from "../../../recoils/studyRecoils";
import { IModal } from "../../../types/reactTypes";
import { IStudyVote } from "../../../types2/studyTypes/studyVoteTypes";
import { createTimeArr, dayjsToStr } from "../../../utils/dateTimeUtils";
import ScreenOverlay from "../../atoms/ScreenOverlay";
import RulletPickerTwo from "../../molecules/picker/RulletPickerTwo";
interface IStudyVoteTimeRulletDrawer extends IModal {
  myVote: IStudyVote;
  voteScore: number;
}
export default function StudyVoteTimeRulletDrawer({
  myVote,
  setIsModal,
  voteScore,
}: IStudyVoteTimeRulletDrawer) {
  const completeToast = useCompleteToast();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const date = searchParams.get("date");

  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudy = useRecoilValue(myStudyState);

  const leftDefaultIdx = 8;
  const rightDefaultIdx = 10;

  const startItemArr = createTimeArr(
    STUDY_VOTE_HOUR_ARR[0],
    STUDY_VOTE_HOUR_ARR[11]
  );

  const endTimeArr = createTimeArr(
    STUDY_VOTE_HOUR_ARR[3],
    STUDY_VOTE_HOUR_ARR[STUDY_VOTE_HOUR_ARR.length - 1]
  );

  const [rulletValue, setRulletValue] = useState<{
    left: string;
    right: string;
  }>({
    left: startItemArr[leftDefaultIdx],
    right: endTimeArr[rightDefaultIdx],
  });

  const { data: pointLog } = usePointSystemLogQuery("point", true, {
    enabled: !!myStudy,
  });

  //오늘 날짜 투표 포인트 받은거 찾기
  const myPrevVotePoint = pointLog?.find(
    (item) =>
      item.message === "스터디 투표" &&
      item.meta.sub === dayjsToStr(dayjs(date))
  )?.meta.value;

  const resetQueryData = useResetQueryData();

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
    resetQueryData([STUDY_VOTE, date, location]);
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
      completeToast(
        "free",
        `투표완료! ${!myStudy && "포인트가 적립되었습니다."}`
      );
    } else completeToast("studyVote");
    setIsModal(false);
  };

  const onSubmit = () => {
    patchAttend({
      ...myVote,
      start: dayjs(rulletValue.left),
      end: dayjs(rulletValue.right),
    });
  };

  return (
    <>
      <ScreenOverlay onClick={() => setIsModal(false)} />
      <TimeModalLayout
        initial={{ y: "90vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TopNav />
        <Header>
          <span>{dayjs().locale("ko").format("M월 DD일 ddd요일")}</span>
          <span>스터디 참여시간을 선택해주세요!</span>
        </Header>
        <RulletPickerTwo
          leftDefaultIdx={leftDefaultIdx}
          rightDefaultIdx={rightDefaultIdx}
          leftRulletArr={startItemArr}
          rightRulletArr={endTimeArr}
          setRulletValue={setRulletValue}
        />
        <Button
          w="100%"
          colorScheme="mintTheme"
          size="lg"
          borderRadius="var(--border-radius-sub)"
          mt="20px"
          onClick={onSubmit}
        >
          선택 완료
        </Button>
      </TimeModalLayout>
    </>
  );
}

const TimeModalLayout = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: var(--max-width);

  border-top-left-radius: var(--border-radius-main);
  border-top-right-radius: var(--border-radius-main);
  background-color: white;
  z-index: 5000;
  padding: 20px;
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
