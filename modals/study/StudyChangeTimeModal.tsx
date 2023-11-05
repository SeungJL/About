import dayjs from "dayjs";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import TimeSelector from "../../components/features/picker/TimeSelector";
import { useStudyParticipationMutation } from "../../hooks/study/mutations";
import { myStudyFixedState, voteDateState } from "../../recoil/studyAtoms";

import { useRouter } from "next/router";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import {
  POINT_SYSTEM_Deposit,
  POINT_SYSTEM_MINUS,
} from "../../constants/contentsValue/pointSystem";
import { STUDY_VOTE } from "../../constants/keys/queryKeys";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { useResetQueryData } from "../../hooks/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import { useStudyStartTimeQuery } from "../../hooks/study/queries";
import {
  useDepositMutation,
  usePointMutation,
} from "../../hooks/user/pointSystem/mutation";
import { locationState } from "../../recoil/userAtoms";
import { IModal } from "../../types/reactTypes";
import { IDayjsStartToEnd, ITimeStartToEnd } from "../../types/timeAndDate";

interface IStudyChangeTimeModal extends IModal {
  myVoteTime: IDayjsStartToEnd;
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
  const myStudyFixed = useRecoilValue(myStudyFixedState);

  const isFree = myStudyFixed?.status === "free";
  const startTime = dayjs(myVoteTime.start);
  const endTime = dayjs(myVoteTime.end);

  const [time, setTime] = useState<ITimeStartToEnd>({
    start: {
      hours: startTime.hour(),
      minutes: startTime.minute(),
    },
    end: { hours: endTime.hour(), minutes: endTime.minute() },
  });

  const resetQueryData = useResetQueryData();

  const { data: studyStartTime } = useStudyStartTimeQuery(
    voteDate,
    placeId as string
  );

  const { mutate: getPoint } = usePointMutation();
  const { mutate: getDeposit } = useDepositMutation();
  const { mutate: patchAttend } = useStudyParticipationMutation(
    voteDate,
    "patch",
    {
      onSuccess() {
        completeToast("success");
        resetQueryData([STUDY_VOTE, dayjsToStr(voteDate), location]);
        if (isFree) return;
        if (
          dayjs() >= dayjs().hour(time.start.hours).minute(time.start.minutes)
        ) {
          getPoint(POINT_SYSTEM_MINUS.STUDY_TIME_CHANGE);
        } else if (studyStartTime && dayjs() > studyStartTime) {
          getDeposit(POINT_SYSTEM_Deposit.STUDY_TIME_CHANGE);
        }
      },
      onError: errorToast,
    }
  );

  const onSubmit = () => {
    const start = time.start;
    const end = time.end;
    const timeInfo = {
      start: dayjs(voteDate.hour(start.hours).minute(start.minutes)),
      end: dayjs(voteDate.hour(end.hours).minute(end.minutes)),
    };

    if (
      start.hours * HOUR_TO_MINUTE + start.minutes >=
      end.hours * HOUR_TO_MINUTE + end.minutes
    ) {
      failToast("time");
      return;
    }
    patchAttend(timeInfo);
    setIsModal(false);
  };

  return (
    <ModalLayout size="md" onClose={() => setIsModal(false)}>
      <ModalHeader text="시간 변경" />
      <ModalBody>
        <Wrapper>
          <TimeSelector
            setTimes={({ start, end }: ITimeStartToEnd) => {
              if (start) setTime({ ...time, start });
              if (end) setTime({ ...time, end });
            }}
            times={time}
          />
        </Wrapper>
        {studyStartTime && dayjs() > studyStartTime && (
          <WaringMsg>스터디 시작 이후의 시간 변경은 -5점을 받습니다.</WaringMsg>
        )}
      </ModalBody>
      <ModalFooterTwo
        onClickLeft={() => setIsModal(false)}
        onClickRight={onSubmit}
        leftText="취소"
        rightText="변경"
      />
    </ModalLayout>
  );
}

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
