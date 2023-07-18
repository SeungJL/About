import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { VOTE_TABLE_COLOR } from "../../constants/system";
import { isRecordLoadingState } from "../../recoil/loadingAtoms";
import { SPACE_LOCATION } from "../../storage/study";
import { IArrivedData } from "../../types/study/studyRecord";
import { Location } from "../../types/system";
import RecordCalendarSkeleton from "./skeleton/RecordCalendarSkeleton";

const 수원 = VOTE_TABLE_COLOR[0];
const 양천 = VOTE_TABLE_COLOR[3];
const 안양 = VOTE_TABLE_COLOR[2];

interface IRecordCalendar {
  month: number;
  monthData: IArrivedData[];
}
function RecordCalendar({ month, monthData }: IRecordCalendar) {
  const dayjsMonth = dayjs().month(month);
  const isRecordLoading = useRecoilValue(isRecordLoadingState);

  return (
    <>
      {!isRecordLoading ? (
        <Layout>
          <DayOfWeek />
          <CallenderDays>
            {monthData.map((item, idx) => {
              return (
                <DayItem key={idx}>
                  {item?.date === dayjsMonth?.date() ? (
                    <Today>{item?.date}</Today>
                  ) : month === 3 && item?.date === 7 ? (
                    <OpenDate location="수원">{item?.date}</OpenDate>
                  ) : month === 3 && item?.date === 19 ? (
                    <OpenDate location="양천">{item?.date}</OpenDate>
                  ) : month === 6 && item?.date === 9 ? (
                    <OpenDate location="안양">{item?.date}</OpenDate>
                  ) : (
                    <div>{item?.date}</div>
                  )}
                  {item?.arrivedInfoList.length !== 0 && (
                    <>
                      {item?.arrivedInfoList.some(
                        (place) => SPACE_LOCATION[place.placeId] === "수원"
                      ) && <Open location="수원">Open</Open>}
                      {item?.arrivedInfoList.some(
                        (place) => SPACE_LOCATION[place.placeId] === "양천"
                      ) && <Open location="양천">Open</Open>}
                      {item?.arrivedInfoList.some(
                        (place) => SPACE_LOCATION[place.placeId] === "안양"
                      ) && <Open location="안양">Open</Open>}
                    </>
                  )}
                </DayItem>
              );
            })}
          </CallenderDays>
        </Layout>
      ) : (
        <RecordCalendarSkeleton month={month} />
      )}
    </>
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

const Layout = styled.div``;

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
`;

const Today = styled.div`
  color: var(--color-mint);
  font-weight: 600;
  font-size: 15px;
`;

const OpenDate = styled.div<{ location: Location }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.location === "수원"
      ? `2px solid ${수원}`
      : props.location === "양천"
      ? `2px solid ${양천}`
      : `2px solid ${안양}`};
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Open = styled.div<{ location: Location }>`
  font-size: 10px;
  color: ${(props) =>
    props.location === "수원" ? 수원 : props.location === "양천" ? 양천 : 안양};
`;

export default RecordCalendar;
