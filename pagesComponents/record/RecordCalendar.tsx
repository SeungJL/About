import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { VOTE_TABLE_COLOR } from "../../constants/design";
import { SPACE_LOCATION } from "../../storage/study";
import { IArrivedData } from "../../types/studyRecord";
import { Location } from "../../types/system";

const 수원 = VOTE_TABLE_COLOR[0];
const 양천 = VOTE_TABLE_COLOR[3];

interface IRecordCalendar {
  month: number;
  totalData: IArrivedData[];
}
function RecordCalendar({ month, totalData }: IRecordCalendar) {
  const [monthData, setMonthData] = useState<IArrivedData[]>([]);
  const dayjsMonth = dayjs().month(month);

  useEffect(() => {
    const daysInMonth = dayjsMonth.daysInMonth();
    const startDayInMonth = dayjsMonth.date(1).day();
    const rowsInMonth = startDayInMonth + daysInMonth < 35 ? 5 : 6;

    const temp: IArrivedData[] = Array.from(
      { length: 7 * rowsInMonth },
      (_, i) =>
        i < startDayInMonth || i >= startDayInMonth + daysInMonth
          ? null
          : { date: i - startDayInMonth + 1, arrivedInfoList: [] }
    );

    totalData?.forEach((element) => {
      const infoDate = dayjs(element.date).date();
      if (temp[startDayInMonth + infoDate - 1]) {
        temp[startDayInMonth + infoDate - 1].arrivedInfoList =
          element.arrivedInfoList;
      }
    });
    setMonthData(temp);
  }, [dayjsMonth, month, totalData]);

  return (
    <Layout>
      <DayOfWeek />
      <CallenderDays>
        {monthData.map((item, idx) => {
          return (
            <DayItem key={idx}>
              {item?.date === dayjsMonth?.date() ? (
                <Today>{item?.date}</Today>
              ) : month === 3 && item?.date === 7 ? (
                <Circle location="수원">{item?.date}</Circle>
              ) : month === 3 && item?.date === 19 ? (
                <Circle location="양천">{item?.date}</Circle>
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
                </>
              )}
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

const Layout = styled.div``;
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
  color: var(--color-mint);
  font-weight: 600;
  font-size: 15px;
`;

const Circle = styled.div<{ location: Location }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.location === "수원" ? `2px solid ${수원}` : `2px solid ${양천}`};
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Open = styled.div<{ location: Location }>`
  font-size: 10px;
  color: ${(props) => (props.location === "수원" ? 수원 : 양천)};
`;

export default RecordCalendar;
