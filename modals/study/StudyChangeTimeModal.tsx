import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";

import TimeSelector from "../../components/utils/TimeSelector";
import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMain,
} from "../../styles/layout/modal";

import { useRecoilValue } from "recoil";
import { useStudyTimeChangeMutation } from "../../hooks/study/mutations";
import { studyStartTimeState, voteDateState } from "../../recoil/studyAtoms";

import { ModalLayout } from "../../components/common/modal/Modals";
import { usePointMutation } from "../../hooks/user/pointSystem/mutation";
import { IModal } from "../../types/common";
import { ITimeStartToEnd, ITimeStartToEndHM } from "../../types/utils";

interface IStudyChangeTimeModal extends IModal {
  myVoteTime?: ITimeStartToEnd;
}

function StudyChangeTimeModal({
  setIsModal,
  myVoteTime,
}: IStudyChangeTimeModal) {
  const toast = useToast();
  const voteDate = useRecoilValue(voteDateState);
  const studyStartTime = useRecoilValue(studyStartTimeState);

  const { mutate: getPoint } = usePointMutation();

  const startTime = dayjs(myVoteTime?.start);
  const endTime = dayjs(myVoteTime?.end);

  const [time, setTime] = useState<ITimeStartToEndHM>({
    start: {
      hours: startTime.hour(),
      minutes: startTime.minute(),
    },
    end: { hours: endTime.hour(), minutes: endTime.minute() },
  });

  const { mutate: patchAttend } = useStudyTimeChangeMutation(voteDate, {
    onSuccess() {
      if (
        dayjs().hour() * 60 + dayjs().minute() >=
        time.start.hours * 60 + time.start.minutes
      )
        getPoint({ value: -5, message: "늦은 시간 변경" });
      else if (dayjs() > studyStartTime)
        getPoint({ value: -2, message: "늦은 시간 변경" });
      window.location.reload();
    },
    onError(err) {
      console.error(err);
    },
  });

  const onSubmit = () => {
    const start = time.start;
    const end = time.end;
    const timeInfo = {
      start: dayjs(voteDate?.hour(start.hours).minute(start.minutes)),
      end: dayjs(voteDate?.hour(end.hours).minute(end.minutes)),
    };

    if (start.hours * 60 + start.minutes >= end.hours * 60 + end.minutes) {
      toast({
        title: "잘못된 입력",
        description: "시작시간은 끝시간 이전이여야 합니다",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(timeInfo);
    setIsModal(false);
    patchAttend(timeInfo);
  };

  return (
    <ModalLayout size="md">
      <ModalHeaderLine>시간변경</ModalHeaderLine>
      <ModalMain>
        <Wrapper>
          <TimeSelector
            setTimes={({ start, end }: ITimeStartToEndHM) => {
              if (start) setTime({ ...time, start });
              if (end) setTime({ ...time, end });
            }}
            times={time}
          />
        </Wrapper>
        {studyStartTime && dayjs() > studyStartTime && (
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
