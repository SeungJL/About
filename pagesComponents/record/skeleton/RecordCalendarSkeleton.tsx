import dayjs from "dayjs";
import styled from "styled-components";
import Skeleton from "../../../components/common/skeleton/Skeleton";

interface IRecordCalendarSkeleton {
  month: number;
}

function RecordCalendarSkeleton({ month }) {
  const blankDate = Array.from(
    {
      length: dayjs().month(month).date(1).day(),
    },
    (_, i) => i + 1
  );

  const totalDate = Array.from(
    {
      length: dayjs().month(month).daysInMonth(),
    },
    (_, i) => i + 1
  );

  return (
    <Layout>
      <DayOfWeek />
      <CallenderDays>
        {blankDate?.map((item) => (
          <DayItem key={item + "temp"}></DayItem>
        ))}
        {totalDate?.map((item) => {
          return (
            <DayItem key={item}>
              <Today>{item}</Today>
              <OpenStatus>
                <Skeleton>temp</Skeleton>
              </OpenStatus>
            </DayItem>
          );
        })}
      </CallenderDays>
    </Layout>
  );
}
const DayOfWeek = () => (
  <DayLine>
    <span>일</span>
    <span>월</span>
    <span>화</span>
    <span>수</span>
    <span>목</span>
    <span>금</span>
    <span>토</span>
  </DayLine>
);
const Layout = styled.div``;
const DayLine = styled.div`
  margin: 8px 22px;
  display: flex;
  justify-content: space-between;
  color: var(--font-h3);
  font-size: 12px;
  padding: 2px;
  padding-top: var(--padding-sub);
  margin-bottom: var(--margin-sub);
`;

const CallenderDays = styled.div`
  color: var(--font-h2);
  margin: 0px var(--margin-min);
  font-size: 14px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 56px;
`;
const DayItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 28px;
`;

const Today = styled.div`
  font-size: 15px;
`;

const OpenStatus = styled.div`
  font-size: 10px;
`;

export default RecordCalendarSkeleton;
