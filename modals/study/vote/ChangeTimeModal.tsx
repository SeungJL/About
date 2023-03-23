import styled from "styled-components";
import {
  ModalFooterNav,
  ModalHeaderTitle,
  ModalLg,
} from "../../../styles/LayoutStyles";
import { ITimeStartToEnd } from "../../../types/utils";
import TimeSelector from "../../../components/utils/timeSelector";
import { useState, Dispatch, SetStateAction } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useAttendMutation } from "../../../hooks/vote/mutations";

import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { isTimeChangeState, voteDateState } from "../../../recoil/atoms";

import { IParticipantTime } from "../../../models/vote";
import dayjs from "dayjs";

export default function ChangeTimeModal({
  setIsChangeTimeModal,
  myVoteTime,
}: {
  setIsChangeTimeModal: Dispatch<SetStateAction<boolean>>;
  myVoteTime?: IParticipantTime;
}) {
  const voteDate = useRecoilValue(voteDateState);

  const setIsTimeChange = useSetRecoilState(isTimeChangeState);
  const toast = useToast();
  const { data: session } = useSession();

  const startTime = dayjs(myVoteTime?.start);
  const endTime = dayjs(myVoteTime?.end);

  const [time, setTime] = useState<ITimeStartToEnd>({
    start: {
      hour: startTime.hour(),
      minutes: startTime.minute(),
    },
    end: { hour: endTime.hour(), minutes: endTime.minute() },
  });
  const { mutate: patchAttend } = useAttendMutation(voteDate, {
    onSuccess: async () => {
      setIsTimeChange(true);
    },
  });

  const onSubmit = () => {
    const start = time.start;
    const end = time.end;
    const timeInfo = {
      start: voteDate.hour(start.hour).minute(start.minutes),
      end: voteDate.hour(end.hour).minute(end.minutes),
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

    setIsChangeTimeModal(false);
    patchAttend(timeInfo);
  };
  return (
    <Layout>
      <ModalHeaderTitle>시간변경</ModalHeaderTitle>
      <TimeSelector
        setTimes={({ start, end }: ITimeStartToEnd) => {
          if (start) setTime({ ...time, start });
          if (end) setTime({ ...time, end });
        }}
        times={time}
      />
      <BtnNav>
        <button onClick={() => setIsChangeTimeModal(false)}>취소</button>
        <button onClick={onSubmit}>변경</button>
      </BtnNav>
    </Layout>
  );
}

const Layout = styled(ModalLg)`
  display: flex;
  flex-direction: column;
  > header {
    margin-bottom: 32px;
  }
`;

const BtnNav = styled(ModalFooterNav)`
  margin-top: auto;
  text-align: end;
  > button:last-child {
    background-color: var(--color-red);
  }
`;
