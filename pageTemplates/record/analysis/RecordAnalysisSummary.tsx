import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getWeekNumber } from "../../../helpers/dateHelpers";
import { useUserAttendRateQueries } from "../../../hooks/user/sub/studyRecord/queries";
import { isRecordDetailLoadingState } from "../../../recoil/loadingAtoms";
import { IDayjsStartToEnd } from "../../../types/timeAndDate";

const WEEKS_CNT = 4;

function RecordAnalysisSummary() {
  const [weeksDate, setWeeksDate] = useState<IDayjsStartToEnd[]>([]);

  const [myAttend, setMyAttend] = useState([]);

  const [isRecordDetailLoading, setIsRecordDetailLoading] = useRecoilState(
    isRecordDetailLoadingState
  );

  useEffect(() => {
    const weeksArr = [];
    for (let i = 0; i < WEEKS_CNT; i++) {
      weeksArr.push({
        start: dayjs().subtract(i, "week").day(0),
        end: dayjs().subtract(i, "week").day(6),
      });
    }
    if (weeksArr?.length === WEEKS_CNT) setWeeksDate(weeksArr);
  }, []);

  const { data } = useUserAttendRateQueries(weeksDate, true, {
    enabled: weeksDate.length !== 0,
  });

  useEffect(() => {
    if (data && weeksDate.length) {
      setMyAttend(data);
      setIsRecordDetailLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, weeksDate]);

  return (
    <Box
      bgColor="white"
      m="16px"
      mb="8px"
      rounded="lg"
      p="8px 16px"
      border="var(--border-mint)"
    >
      {myAttend?.map((item, idx) => {
        const date = weeksDate[idx];
        return (
          <SummaryItem key={idx}>
            <WeekText>
              <span>
                {date.start.format("M월")} {getWeekNumber(date.start)}주
              </span>
              <span>
                ({date.start.format("MM.DD")} - {date.end.format("MM.DD")})
              </span>
            </WeekText>
            <WeekAttend>{item || 0}회</WeekAttend>
          </SummaryItem>
        );
      })}
    </Box>
  );
}

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;

const WeekText = styled.span`
  > span:last-child {
    margin-left: var(--gap-1);
    color: var(--gray-3);
  }
`;

const WeekAttend = styled.span`
  font-weight: 600;
`;

export default RecordAnalysisSummary;
