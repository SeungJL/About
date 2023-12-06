import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getWeekNumber } from "../../../helpers/dateHelpers";
import { useUserAttendRateQueries } from "../../../hooks/user/sub/studyRecord/queries";
import { isRecordDetailLoadingState } from "../../../recoil/loadingAtoms";
import { IDayjsStartToEnd } from "../../../types/timeAndDate";

const WEEKS_CNT = 5;

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
    <>
      {!isRecordDetailLoading && (
        <Layout>
          <Title>요약</Title>
          <Summary>
            {myAttend?.map((item, idx) => {
              const date = weeksDate[idx];
              return (
                <SummaryItem key={idx}>
                  <WeekText>
                    <span>
                      {date.start.format("M월")} {getWeekNumber(date.start)}주
                    </span>
                    <span>
                      ({date.start.format("MM.DD")} - {date.end.format("MM.DD")}
                      )
                    </span>
                  </WeekText>
                  <WeekAttend>{item || 0}회</WeekAttend>
                </SummaryItem>
              );
            })}
          </Summary>
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-main) 0;
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const Summary = styled.div`
  margin-top: var(--margin-sub);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--padding-md) var(--padding-min);
`;

const WeekText = styled.span`
  > span:last-child {
    margin-left: var(--margin-min);
    color: var(--font-h4);
  }
`;

const WeekAttend = styled.span`
  font-weight: 600;
`;

export default RecordAnalysisSummary;
