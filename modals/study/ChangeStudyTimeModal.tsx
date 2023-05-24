import styled from "styled-components";
import { useState, Dispatch, SetStateAction } from "react";
import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";

import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMd,
  ModalMain,
  ModalXs,
} from "../../styles/layout/modal";
import TimeSelector from "../../components/utils/TimeSelector";

import { useRecoilValue } from "recoil";
import { studyStartTimeState, voteDateState } from "../../recoil/studyAtoms";
import { useChangeTimeMutation } from "../../hooks/vote/mutations";

import { ITimeStartToEnd, ITimeStartToEndHM } from "../../types/utils";
import { usePointMutation } from "../../hooks/user/pointSystem/mutation";

function ChangeStudyTimeModal({
  setIsChangeStudyTimeModal,
  myVoteTime,
}: {
  setIsChangeStudyTimeModal: Dispatch<SetStateAction<boolean>>;
  myVoteTime?: ITimeStartToEnd;
}) {
  const toast = useToast();

  const voteDate = useRecoilValue(voteDateState);
  const studyStartTime = useRecoilValue(studyStartTimeState);

  const { mutate: getPoint } = usePointMutation();

  const startTime = dayjs(myVoteTime?.start);
  const endTime = dayjs(myVoteTime?.end);

  const [time, setTime] = useState<ITimeStartToEndHM>({
    start: {
      hour: startTime.hour(),
      minutes: startTime.minute(),
    },
    end: { hour: endTime.hour(), minutes: endTime.minute() },
  });

  const { mutate: patchAttend } = useChangeTimeMutation(voteDate, {
    onSuccess() {
      if (
        dayjs().hour() * 60 + dayjs().minute() >=
        time.start.hour * 60 + time.start.minutes
      )
        getPoint({ value: -5, text: "늦은 시간 변경" });
      else if (dayjs() > studyStartTime)
        getPoint({ value: -2, text: "늦은 시간 변경" });
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
      start: dayjs(voteDate?.hour(start.hour).minute(start.minutes)),
      end: dayjs(voteDate?.hour(end.hour).minute(end.minutes)),
    };

    if (start.hour * 60 + start.minutes >= end.hour * 60 + end.minutes) {
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
    setIsChangeStudyTimeModal(false);
    patchAttend(timeInfo);
  };

  return (
    <Layout>
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
        <button onClick={() => setIsChangeStudyTimeModal(false)}>취소</button>
        <button onClick={onSubmit}>변경</button>
      </ModalFooterNav>
    </Layout>
  );
}

const Layout = styled(ModalXs)``;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const WaringMsg = styled.span`
  font-size: 12px;

  color: var(--color-red);
`;

export default ChangeStudyTimeModal;
