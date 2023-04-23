import dayjs from "dayjs";
import { motion } from "framer-motion";
import styled from "styled-components";
import { VOTE_TABLE_COLOR } from "../../constants/design";
import { IconCircle } from "../../public/icons/IconOutline";
import { IArrivedData } from "../../types/studyRecord";
import { Location } from "../../types/system";
import { useState, useEffect } from "react";

function RecordCalendar({
  month,
  totalData,
}: {
  month: number;
  totalData: IArrivedData[];
}) {
  const dayjsMonth = dayjs().month(month);
  const daysInMonth = dayjsMonth.daysInMonth();
  const startDayInMonth = dayjsMonth.date(1).day();
  const rowsInMonth = startDayInMonth + daysInMonth < 35 ? 5 : 6;
  const [monthData, setMonthData] = useState([]);
  useEffect(() => {
    const temp = [];
    for (let i = 1; i <= 7 * rowsInMonth; i++) {
      if (i <= startDayInMonth) temp.push(null);
      else if (i > daysInMonth + startDayInMonth) temp.push(null);
      else {
        const dateNum = i - startDayInMonth;

        const dateInfo =
          dateNum - 1 >= 0 &&
          dateNum - 1 < totalData?.length - 1 &&
          dayjs(totalData[dateNum - 1].date).date();
        console.log(44, dateInfo);
        const date = 0;

        temp.push({ dateNum });
      }
    }
  }, []);

  return (
    <Layout>
      <DayOfWeek />

      <CallenderDays>
        {monthData.map((d, idx) => (
          <DayItem key={idx}>
            {d?.date === dayjsMonth?.date() ? (
              <Today>{d?.date}</Today>
            ) : (
              <div>{d?.date}</div>
            )}

            <Open location="수원">Open</Open>
            <Open location="양천">Open</Open>
          </DayItem>
        ))}
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
const AttendCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-mint);
`;
const HrDivSm = styled.div`
  height: 12px;
  background-color: var(--font-h7);
  margin-bottom: 6px;
`;
const HrDiv = styled.div`
  height: 20px;
  background-color: var(--font-h7);
`;

const Today = styled.div`
  color: var(--color-mint);
  font-weight: 600;
  font-size: 15px;
`;

const Open = styled.div<{ location: Location }>`
  font-size: 10px;
  color: ${(props) =>
    props.location === "수원" ? VOTE_TABLE_COLOR[0] : VOTE_TABLE_COLOR[3]};
`;

export default RecordCalendar;
