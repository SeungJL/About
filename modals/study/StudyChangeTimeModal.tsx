import dayjs from "dayjs";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import TimeSelector from "../../components/features/picker/TimeSelector";
import { useStudyTimeChangeMutation } from "../../hooks/study/mutations";
import {
  myStudyFixedState,
  studyStartTimeState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";

import { useRouter } from "next/router";
import { ModalHeaderX } from "../../components/modal/ModalComponents";
import { ModalLayout } from "../../components/modal/Modals";
import { POINT_SYSTEM_MINUS } from "../../constants/pointSystem";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import {
  useDepositMutation,
  usePointMutation,
} from "../../hooks/user/pointSystem/mutation";
import { isRefetchStudySpaceState } from "../../recoil/refetchingAtoms";
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
  const studyStartTime = useRecoilValue(studyStartTimeState);
  const setIsRefetch = useSetRecoilState(isRefetchStudySpaceState);
  const myStudyFixed = useRecoilValue(myStudyFixedState);

  const isFree = myStudyFixed?.status === "free";
  const startTime = dayjs(myVoteTime.start);
  const endTime = dayjs(myVoteTime.end);
  const myStudyStartTime = studyStartTime?.find((item) => {
    item.placeId === placeId;
  })?.startTime;

  const [time, setTime] = useState<ITimeStartToEnd>({
    start: {
      hours: startTime.hour(),
      minutes: startTime.minute(),
    },
    end: { hours: endTime.hour(), minutes: endTime.minute() },
  });

  const { mutate: getPoint } = usePointMutation();
  const { mutate: getDeposit } = useDepositMutation();
  const { mutate: patchAttend } = useStudyTimeChangeMutation(voteDate, {
    onSuccess() {
      completeToast("success");
      setIsRefetch(true);
      if (isFree) return;
      if (dayjs() >= dayjs().hour(time.start.hours).minute(time.start.minutes))
        getPoint({ value: -5, message: "늦은 시간 변경" });
      else if (studyStartTime && dayjs() > myStudyStartTime) {
        getDeposit(POINT_SYSTEM_MINUS.timeChange.deposit);
      }
    },
    onError: errorToast,
  });

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
    <ModalLayout size="md">
      <ModalHeaderX title="시간 변경" setIsModal={setIsModal} />
      <ModalMain>
        <Wrapper>
          <TimeSelector
            setTimes={({ start, end }: ITimeStartToEnd) => {
              if (start) setTime({ ...time, start });
              if (end) setTime({ ...time, end });
            }}
            times={time}
          />
        </Wrapper>
        {studyStartTime && dayjs() > myStudyStartTime && (
          <WaringMsg>스터디 시작 이후의 시간 변경은 -5점을 받습니다.</WaringMsg>
        )}
      </ModalMain>
      <ModalFooterNav>
        <button onClick={() => setIsModal(false)}>취소</button>
        <button onClick={onSubmit}>변경</button>
      </ModalFooterNav>
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
