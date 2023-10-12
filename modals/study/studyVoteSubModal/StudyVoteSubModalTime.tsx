import { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TimeRullet from "../../../components/features/picker/TimeRullet";
import { STUDY_START_VOTETIME_HOUR } from "../../../constants/settingValue/study";
import { DispatchType } from "../../../types/reactTypes";
import { IStudyParticipate } from "../../../types/study/study";
import { IDayjsStartToEnd } from "../../../types/timeAndDate";

interface IStudyVoteSubModalTime {
  setVoteInfo: DispatchType<IStudyParticipate>;
}

function StudyVoteSubModalTime({ setVoteInfo }: IStudyVoteSubModalTime) {
  const [selectTime, setSelectTime] = useState<IDayjsStartToEnd>({
    start: null,
    end: null,
  });

  useEffect(() => {
    const start = selectTime?.start;
    const end = selectTime?.end;
    setVoteInfo((old) => ({ ...old, start, end }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTime]);

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
    <Layout>
      <TimeChoiceLayout>
        <TimeWrapper>
          <span>시작 시간</span>
          <TimeRullet
            timeArr={startTimeArr}
            setTime={(time: Dayjs) =>
              setSelectTime((old) => ({ ...old, start: time }))
            }
          />
        </TimeWrapper>
        <TimeWrapper>
          <span>종료 시간</span>
          <TimeRullet
            timeArr={endTimeArr}
            setTime={(time) => setSelectTime((old) => ({ ...old, end: time }))}
          />
        </TimeWrapper>
      </TimeChoiceLayout>{" "}
    </Layout>
  );
}

const Layout = styled.div``;
const TimeChoiceLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: var(--margin-sub);
`;

const TimeWrapper = styled.div`
  > span {
    font-weight: 600;
    color: var(--font-h3);
    font-size: 13px;
  }
`;

export default StudyVoteSubModalTime;
