import { SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import TimeSelector from "../../../components/features/picker/TimeSelector";
import TimeSelectorBoard from "../../../components/features/picker/TimeSelectorBoard";
import { voteDateState } from "../../../recoil/studyAtoms";
import { IStudyParticipate } from "../../../types/study/study";
import { ITimeStartToEnd } from "../../../types/timeAndDate";

interface IStudyVoteMainModalTime {
  isTimeBoard: boolean;
  setVoteInfo: React.Dispatch<SetStateAction<IStudyParticipate>>;
}

function StudyVoteMainModalTime({
  isTimeBoard,
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
    <Layout>
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
  );
}

const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  > span {
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: var(--gap-2);
  }
`;

export default StudyVoteMainModalTime;
