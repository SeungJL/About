import styled from "styled-components";
import Skeleton from "../../../components/common/Skeleton";
import { DEFAULT_LONG_ARRAY } from "../../../constants/default";

function RecordCalendarSkeleton() {
  return (
    <Layout>
      <DayOfWeek />
      <CallenderDays>
        {DEFAULT_LONG_ARRAY.map((item) => {
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
  padding: 2px 2px;
  padding-top: 12px;
  margin-bottom: 7px;
`;

const CallenderDays = styled.div`
  color: var(--font-h2);
  margin: 0px 4px;
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
