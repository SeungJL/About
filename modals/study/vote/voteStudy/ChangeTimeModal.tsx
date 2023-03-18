import styled from "styled-components";
import { ModalLg } from "../../../../styles/LayoutStyles";
import { ITimeStartToEnd } from "../../../../types/utils";
import TimeSelector from "./vote/timeSelector";
import { useState, Dispatch, SetStateAction } from "react";
import { voteDateState } from "../../../../recoil/studyAtoms";
import { useRecoilValue } from "recoil";
import { useAttendMutation } from "../../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../../libs/queryKeys";
import { QueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

export default function ChangeTimeModal({
  setIsChangeTimeModal,
}: {
  setIsChangeTimeModal: Dispatch<SetStateAction<boolean>>;
}) {
  const voteDate = useRecoilValue(voteDateState);
  const toast = useToast();
  const { data: session } = useSession();

  const [time, setTime] = useState<ITimeStartToEnd>({
    start: { hour: 14, minutes: 0 },
    end: { hour: 18, minutes: 0 },
  });
  const { mutate: patchAttend } = useAttendMutation(voteDate);

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
      <div>시간변경</div>
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
  > div {
    margin-bottom: 9px;
  }
`;

const BtnNav = styled.nav`
  text-align: end;
  > button {
    margin-left: 2px;
    margin-right: 3px;
    background-color: lightpink;
    width: 40px;
    border-radius: 10px;
  }
`;
