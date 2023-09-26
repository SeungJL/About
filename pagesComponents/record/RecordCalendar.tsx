import dayjs, { Dayjs } from "dayjs";
import styled from "styled-components";
import { LOCATION_OPEN_DATE } from "../../constants/location";
import { TABLE_COLORS } from "../../constants/styles";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { SPACE_LOCATION } from "../../storage/study";
import { IArrivedData } from "../../types/study/study";
import { Location } from "../../types/system";
const 수원 = TABLE_COLORS[0];
const 양천 = TABLE_COLORS[3];
const 안양 = TABLE_COLORS[2];
const 강남 = TABLE_COLORS[1];

interface IRecordCalendar {
  filterData: IArrivedData[];
  navMonth: Dayjs;
}
function RecordCalendar({ filterData, navMonth }: IRecordCalendar) {
  console.log(filterData, navMonth);
  return (
    <>
      <Layout>
        <DayOfWeek />
        <CallenderDays>
          {filterData?.map((item, idx) => {
            const arrivedInfo = item?.arrivedInfoList;
            const date = item?.date;
            const dayjsDate = date && dayjsToStr(navMonth.date(date));
            let openLocation = null;
            for (let key in LOCATION_OPEN_DATE)
              if (LOCATION_OPEN_DATE[key] === dayjsDate) openLocation = key;
            const openStudyLocation = new Set();
            arrivedInfo?.forEach((place) => {
              openStudyLocation.add(SPACE_LOCATION[place.placeId]);
            });

            return (
              <DayItem key={idx}>
                {!openLocation ? (
                  <DayItemDate isToday={date === dayjs().date()}>
                    {date}
                  </DayItemDate>
                ) : (
                  <LocationOpen location={openLocation}>{date}</LocationOpen>
                )}
                {Array.from(openStudyLocation).map((location, idx) => (
                  <Open key={idx} location={location as Location}>
                    Open
                  </Open>
                ))}
              </DayItem>
            );
          })}
        </CallenderDays>
      </Layout>
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

const Layout = styled.div``;

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
`;

const DayItemDate = styled.span<{ isToday: boolean }>`
  color: ${(props) => (props.isToday ? "var(--color-mint)" : null)};
  font-weight: ${(props) => (props.isToday ? "600" : null)};
  font-size: ${(props) => (props.isToday ? "15px" : null)};
`;

const LocationOpen = styled.div<{ location: Location }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.location === "수원"
      ? `2px solid ${수원}`
      : props.location === "양천"
      ? `2px solid ${양천}`
      : props.location === "안양"
      ? `2px solid ${안양}`
      : `2px solid ${강남}`};
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Open = styled.div<{ location: Location }>`
  font-size: 10px;
  color: ${(props) =>
    props.location === "수원"
      ? 수원
      : props.location === "양천"
      ? 양천
      : props.location === "안양"
      ? 안양
      : 강남};
`;

const DayLine = styled.div`
  margin: var(--margin-sub) 24px;
  display: flex;
  justify-content: space-between;
  color: var(--font-h3);
  font-size: 12px;
`;

export default RecordCalendar;
