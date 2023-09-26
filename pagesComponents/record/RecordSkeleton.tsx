import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import styled from "styled-components";
import Skeleton from "../../components/common/masks/skeleton/Skeleton";

function RecordSkeleton() {
  const blankDate = Array.from(
    {
      length: dayjs().date(1).day(),
    },
    (_, i) => i + 1
  );

  const totalDate = Array.from(
    {
      length: dayjs().daysInMonth(),
    },
    (_, i) => i + 1
  );
  return (
    <Layout>
      <RecordOverview>
        <MyRecord>
          <MyRecordItem>
            <div>
              <ContentName>스터디 오픈</ContentName>
              <ContentValue>
                <Skeleton>temp</Skeleton>
              </ContentValue>
            </div>
            <div>
              <ContentName>참여한 인원</ContentName>
              <ContentValue>
                <Skeleton>temp</Skeleton>
              </ContentValue>
            </div>
          </MyRecordItem>
          <MyRecordItem>
            <div>
              <ContentName>내 참여 횟수</ContentName>
              <ContentValue>
                <Skeleton>temp</Skeleton>
              </ContentValue>
            </div>
            <div>
              <ContentName>내 최근 참여</ContentName>
              <ContentValue>
                <Skeleton>temp</Skeleton>
              </ContentValue>
            </div>
          </MyRecordItem>
        </MyRecord>
        <Button>분석</Button>
      </RecordOverview>
      <Calendar>
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
      </Calendar>
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

/** overview */
const RecordOverview = styled.div`
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const MyRecord = styled.div`
  display: flex;
  height: 100%;
  > div:first-child {
    width: 125px;
  }
  > div:last-child {
    width: 140px;
  }
`;

const MyRecordItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  margin-bottom: 6px;

  > div {
    display: flex;
    align-items: center;
  }
`;
const ContentName = styled.span`
  margin-right: 6px;
  color: var(--font-h3);
  font-size: 13px;
`;

const ContentValue = styled.span`
  display: inline-block;
  width: 40px;
  font-weight: 700;
  font-size: 14px;
  color: var(--font-h2);
`;

/** calendar */

const Calendar = styled.div``;

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
export default RecordSkeleton;
