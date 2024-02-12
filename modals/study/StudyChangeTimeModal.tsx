import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useStudyParticipationMutation } from "../../hooks/study/mutations";
import {
  myStudyState,
  studyStartTimeState,
  voteDateState,
} from "../../recoil/studyAtoms";

import { useRouter } from "next/router";
import TimeRullet from "../../components/features/picker/TimeRullet";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { STUDY_VOTE } from "../../constants/keys/queryKeys";
import { POINT_SYSTEM_Deposit } from "../../constants/settingValue/pointSystem";
import { STUDY_START_VOTETIME_HOUR } from "../../constants/settingValue/study/study";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/custom/CustomToast";
import { usePointSystemMutation } from "../../hooks/user/mutations";
import { usePointSystemLogQuery } from "../../hooks/user/queries";
import { locationState } from "../../recoil/userAtoms";
import { IModal } from "../../types/reactTypes";
import { IDayjsStartToEnd } from "../../types/timeAndDate";

interface IStudyChangeTimeModal extends IModal {
  myVoteTime?: IDayjsStartToEnd;
}

const HOUR_TO_MINUTE = 60;

function StudyChangeTimeModal({
  setIsModal,
  myVoteTime,
}: IStudyChangeTimeModal) {
  const router = useRouter();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const placeId = router.query.placeId;

  const voteDate = useRecoilValue(voteDateState);

  const location = useRecoilValue(locationState);
  const myStudyFixed = useRecoilValue(myStudyState);

  const isFree = myStudyFixed?.status === "free";
  const startTime = dayjs(myVoteTime.start);
  const endTime = dayjs(myVoteTime.end);

  const [time, setTime] = useState<IDayjsStartToEnd>({
    start: startTime,
    end: endTime,
  });

  const resetQueryData = useResetQueryData();

  const studyStartTime = useRecoilValue(studyStartTimeState);

  const { data } = usePointSystemLogQuery("deposit");

  const prevFee = data?.find(
    (item) =>
      item?.meta?.sub === dayjsToStr(voteDate) &&
      item.message === POINT_SYSTEM_Deposit.STUDY_TIME_CHANGE.message
  );

  const { mutate: getDeposit } = usePointSystemMutation("deposit");
  const { mutate: patchAttend } = useStudyParticipationMutation(
    voteDate,
    "patch",
    {
      onSuccess() {
        resetQueryData([STUDY_VOTE, dayjsToStr(voteDate), location]);
        if (isFree) return;

        if (studyStartTime && dayjs() > studyStartTime.startTime && !prevFee) {
          getDeposit({
            ...POINT_SYSTEM_Deposit.STUDY_TIME_CHANGE,
            sub: dayjsToStr(voteDate),
          });
        }
        completeToast("change");
      },
      onError: errorToast,
    }
  );

  const onSubmit = () => {
    const start = time.start;
    const end = time.end;
    const timeInfo = {
      start,
      end,
    };

    if (startTime >= endTime) {
      failToast("time");
      return;
    }
    patchAttend(timeInfo);
    setIsModal(false);
  };
  const createTimeArr = (startHour: number, endHour: number, offset = 0) => {
    const timeArr = [];
    for (let i = startHour; i <= endHour; i++) {
      timeArr.push({ hour: i + offset, minutes: "00" });
      if (i !== endHour) timeArr.push({ hour: i + offset, minutes: "30" });
    }
    return timeArr;
  };

  const startTimeArr = createTimeArr(
    STUDY_START_VOTETIME_HOUR,
    STUDY_START_VOTETIME_HOUR + 10
  );
  const endTimeArr = createTimeArr(
    STUDY_START_VOTETIME_HOUR,
    STUDY_START_VOTETIME_HOUR + 10,
    2
  );

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader text="시간 변경" isLine={true} />
      <ModalBody>
        <TimeChoiceLayout>
          <TimeWrapper>
            <span>시작 시간</span>
            <TimeRullet
              timeArr={startTimeArr}
              setTime={(time: Dayjs) =>
                setTime((old) => ({ ...old, start: time }))
              }
            />
          </TimeWrapper>
          <Spacer />
          <TimeWrapper>
            <span>종료 시간</span>
            <TimeRullet
              startTime={time.start}
              startTimeArr={startTimeArr}
              timeArr={endTimeArr}
              setTime={(time) => setTime((old) => ({ ...old, end: time }))}
              isEndTime={true}
            />
          </TimeWrapper>
        </TimeChoiceLayout>
      </ModalBody>
      <ModalFooterTwo
        onClickLeft={() => setIsModal(false)}
        onClickRight={onSubmit}
        leftText="취소"
        rightText="변경"
        isFull={true}
      />
    </ModalLayout>
  );
}

const TimeChoiceLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Spacer = styled.div`
  width: var(--margin-sub);
`;
const TimeWrapper = styled.div`
  flex: 1;

  > span {
    color: var(--font-h3);
    font-weight: 600;
  }
`;
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const WaringMsg = styled.span`
  font-size: 12px;
  color: var(--color-red);
`;

export default StudyChangeTimeModal;
