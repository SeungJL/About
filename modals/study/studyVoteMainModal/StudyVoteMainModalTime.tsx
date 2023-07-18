import { SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import TimeSelector from "../../../components/features/selector/TimeSelector";
import TimeSelectorBoard from "../../../components/features/selector/TimeSelectorBoard";
import { voteDateState } from "../../../recoil/studyAtoms";
import { ModalFooterNav, ModalMain } from "../../../styles/layout/modal";
import { DispatchNumber } from "../../../types/reactTypes";
import { IStudyParticipate } from "../../../types/study/studyUserAction";
import { ITimeStartToEnd } from "../../../types/timeAndDate";

interface IStudyVoteMainModalTime {
  onSubmit: () => void;
  isTimeBoard: boolean;
  setPage: DispatchNumber;
  setVoteInfo: React.Dispatch<SetStateAction<IStudyParticipate>>;
}

function StudyVoteMainModalTime({
  onSubmit,
  isTimeBoard,
  setPage,
  setVoteInfo,
}: IStudyVoteMainModalTime) {
  const voteDate = useRecoilValue(voteDateState);
  const [time, setTime] = useState<ITimeStartToEnd>({
    start: isTimeBoard ? null : { hours: 14, minutes: 0 },
    end: isTimeBoard ? null : { hours: 18, minutes: 0 },
  });

  useEffect(() => {
    const startTime = time.start;
    const endTime = time.end;

    const start = startTime
      ? voteDate.hour(startTime.hours).minute(startTime.minutes)
      : null;
    const end = endTime
      ? voteDate.hour(endTime.hours).minute(endTime.minutes)
      : null;
    setVoteInfo((old) => ({ ...old, start, end }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, voteDate]);

  return (
    <>
      <Layout>
        <Subtitle>참여시간 선택</Subtitle>
        {isTimeBoard ? (
          <TimeSelectorBoard
            setTimes={({ start, end }: ITimeStartToEnd) => {
              setTime({ start, end });
            }}
            times={time}
          />
        ) : (
          <TimeSelector
            setTimes={({ start, end }: ITimeStartToEnd) => {
              if (start) {
                setTime({ end: time.end, start });
              }
              if (end) {
                setTime({ start: time.start, end });
              }
            }}
            times={time}
          />
        )}
      </Layout>
      <ModalFooterNav>
        <button onClick={() => setPage(1)}>뒤로가기</button>
        <button onClick={onSubmit}>완료</button>
      </ModalFooterNav>
    </>
  );
}

const Layout = styled(ModalMain)`
  flex: 1;
  display: flex;
  flex-direction: column;
  > span {
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 8px;
  }
`;
const Subtitle = styled.div`
  color: var(--font-h3);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: var(--margin-md);
`;
export default StudyVoteMainModalTime;
