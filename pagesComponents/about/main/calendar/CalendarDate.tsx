import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../../recoil/studyAtoms";

interface ICalendarDate {
  calendarType: "week" | "month";
}

interface ICalendarBox {
  date: number;
  isAttend: boolean;
}

function CalendarDate({ calendarType }: ICalendarDate) {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [calendarBox, setCalendarBox] = useState<ICalendarBox[]>([]);

  useEffect(() => {
    const daysInMonth = voteDate.daysInMonth();
    const startDayInMonth = voteDate.date(1).day();
    const rowsInMonth = startDayInMonth + daysInMonth < 35 ? 5 : 6;
    const date = voteDate.date();
    const dayInWeek = voteDate.day();
    const temp = [];
    if (calendarType === "week") {
      const start = date - dayInWeek;
      for (let i = start; i < start + 7; i++) {
        const validDate = i >= 1 && i <= daysInMonth ? i : null;
        temp.push({ date: validDate });
      }
    }
    if (calendarType === "month") {
      for (let i = 1; i <= 7 * rowsInMonth; i++) {
        if (i <= startDayInMonth) temp.push(null);
        else if (i > daysInMonth + startDayInMonth) temp.push(null);
        else temp.push({ date: i - startDayInMonth });
      }
    }
    setCalendarBox(temp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarType, voteDate]);

  const onClickDate = (d: { date: number; isAttend: boolean }) => {
    setVoteDate(voteDate.date(d.date));
  };

  const IconCircle = ({ children }) => <CircleLayout>{children}</CircleLayout>;

  return (
    <Layout isSmall={calendarType === "week"}>
      {calendarBox.map((d, idx) => (
        <DayItem key={idx} onClick={() => onClickDate(d)}>
          {d?.date === voteDate?.date() ? (
            <IconCircle>{d?.date}</IconCircle>
          ) : (
            <div>{d?.date}</div>
          )}

          {d?.isAttend && <AttendCircle />}
        </DayItem>
      ))}
    </Layout>
  );
}

const CircleLayout = styled.div`
  width: 25px;
  text-align: center;
  height: 25px;
  border-radius: 50%;
  padding-top: 2px;
  color: white;
  background-color: var(--color-mint);
`;

const Layout = styled.div<{ isSmall: boolean }>`
  color: var(--font-h3);
  font-size: 15px;
  margin: ${(props) => !props.isSmall && "var(--margin-min)"};
  margin-left: -9px;
  margin-right: -9px;
  font-weight: 600;
  padding: 0;
  display: ${(props) => (props.isSmall ? "flex" : "grid")};
  justify-content: ${(props) => props.isSmall && "spaceBetween"};
  grid-template-columns: ${(props) => !props.isSmall && "repeat(7,1fr)"};
  grid-auto-rows: ${(props) => !props.isSmall && "36px"};
`;

const DayItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 32px;
  align-items: center;
  > div {
    margin: 4px auto 0px auto;
  }
`;
const AttendCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-mint);
`;
export default CalendarDate;
