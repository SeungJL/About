import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import styled from "styled-components";
import Skeleton from "../../components/common/masks/skeleton/Skeleton";
import {
  LOCATION_CONVERT,
  LOCATION_OPEN,
  LOCATION_TABLE_COLOR,
} from "../../constants/location";
import { Location } from "../../types/system";

interface IRecordSkeleton {
  isCalendar: boolean;
}

function RecordSkeleton({ isCalendar }: IRecordSkeleton) {
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
        <Button w="60px" h="40px" color="var(--font-h2)">
          분석
        </Button>
      </RecordOverview>
      <Category>
        <SpaceBadge>
          {LOCATION_OPEN.map((location) => (
            <Button2 key={location} location={location}>
              {LOCATION_CONVERT[location]}
            </Button2>
          ))}
        </SpaceBadge>
      </Category>
      {isCalendar ? (
        <Calendar>
          <DayOfWeek />
          <CallenderDays>
            {blankDate?.map((item) => (
              <DayItem key={item + "temp"} />
            ))}

            {totalDate?.map((item, idx) => (
              <DayItem key={idx}>
                <DayItemDate isToday={item === dayjs().date()}>
                  {item}
                </DayItemDate>
                <Open key={idx}>
                  <Skeleton>Open</Skeleton>
                </Open>
              </DayItem>
            ))}
          </CallenderDays>
        </Calendar>
      ) : (
        <Detail>
          {new Array(6).fill(0).map((_, idx) => (
            <Block key={idx}>
              <Date>
                <Skeleton>temp</Skeleton>
              </Date>
              <StudyInfo>
                {new Array(2).fill(0).map((_, idx2) => (
                  <PlaceInfo key={idx2}>
                    <PlaceName>
                      <span>
                        <Skeleton>tempte</Skeleton>
                      </span>
                      <OpenLocation>
                        <Skeleton>temp</Skeleton>
                      </OpenLocation>
                    </PlaceName>
                    <MemberWrapper>
                      {new Array(3).fill(0).map((who, idx3) => (
                        <Member key={idx3}>
                          <Skeleton>temp</Skeleton>
                        </Member>
                      ))}
                    </MemberWrapper>
                  </PlaceInfo>
                ))}
              </StudyInfo>
            </Block>
          ))}
        </Detail>
      )}
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
  padding: var(--padding-sub) var(--padding-main);
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

  > div {
    display: flex;
    align-items: center;
  }
`;
const ContentName = styled.span`
  margin-right: var(--margin-md);
  color: var(--font-h3);
  font-size: 13px;
`;

const ContentValue = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: var(--font-h2);
`;
const SpaceBadge = styled.section`
  display: flex;
  align-items: center;
`;

const Button2 = styled.button<{
  location: Location;
}>`
  margin-right: var(--margin-sub);
  font-weight: 600;
  color: ${(props) => LOCATION_TABLE_COLOR[props.location]};
  font-size: 12px;
`;

/** category */
const Category = styled.div`
  padding: 0 var(--padding-main);
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--font-h7);
  border-top: 1px solid var(--font-h6);
  border-bottom: 1px solid var(--font-h6);
  > div {
    display: flex;
    align-items: center;
  }
  > span:last-child {
    font-size: 10px;
    color: var(--font-h3);
  }
`;

/** calendar */

const Calendar = styled.div``;

const CallenderDays = styled.div`
  display: grid;
  grid-auto-rows: 68px;
  grid-template-columns: repeat(7, 1fr);
  margin: 0 var(--margin-min);
  font-size: 14px;
`;
const DayItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--font-h56);
`;

const DayItemDate = styled.span<{ isToday: boolean }>`
  color: ${(props) => (props.isToday ? "var(--color-mint)" : null)};
  font-weight: ${(props) => (props.isToday ? "600" : null)};
  font-size: ${(props) => (props.isToday ? "15px" : null)};
`;

const Open = styled.div`
  font-size: 10px;
`;

const DayLine = styled.div`
  margin: var(--margin-md) 24px;
  display: flex;
  justify-content: space-between;
  color: var(--font-h3);
  font-size: 12px;
`;

/** detail */

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;
const Block = styled.div`
  border-top: 4px solid var(--font-h56);
  padding: var(--padding-sub) var(--padding-main);
  padding-bottom: 0;
`;
const Date = styled.div`
  margin-bottom: var(--margin-sub);
  font-size: 13px;
  color: var(--font-h2);
`;
const StudyInfo = styled.div`
  font-size: 12px;
  color: var(--font-h2);
`;
const PlaceInfo = styled.div`
  margin-bottom: var(--margin-sub);
`;

const PlaceName = styled.div`
  display: flex;
  align-items: center;
  color: var(--font-h2);
  font-size: 14px;
  > span:first-child {
    font-weight: 600;
    margin-right: var(--margin-min);
  }
`;
const OpenLocation = styled.span`
  font-size: 11px;
`;

const MemberWrapper = styled.div`
  margin-top: var(--margin-sub);

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  align-items: center;
  line-height: 2;
`;

const Member = styled.span`
  margin-right: var(--margin-min);
  color: var(--font-h3);
`;
export default RecordSkeleton;
