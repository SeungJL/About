import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IconCircle } from "../../../../public/icons/IconOutline";
import { voteDateState } from "../../../../recoil/studyAtoms";

function CalendarDate({ calendarType }: { calendarType: "week" | "month" }) {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [calendarBox, setCalendarBox] = useState<
    {
      date: number;
      isAttend: boolean;
    }[]
  >([]);

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
        else {
          temp.push({ date: i - startDayInMonth });
        }
      }
    }
    setCalendarBox(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarType, voteDate]);
  const onClickDate = (d: { date: number; isAttend: boolean }) => {
    setVoteDate(voteDate.date(d.date));
  };
  return (
    <Layout col={calendarType === "week" ? "true" : "false"}>
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

const Layout = styled.div<{ col: string }>`
  color: var(--font-h2);
  font-size: 14px;
  margin-left: -9px;
  margin-right: -9px;
  height: 36px;
  padding: 0;
  display: ${(props) => (props.col === "true" ? "flex" : "grid")};
  justify-content: ${(props) => (props.col === "true" ? "spaceBetween" : null)};
  grid-template-columns: ${(props) =>
    props.col === "true" ? null : "repeat(7,1fr)"};
  grid-auto-rows: ${(props) => (props.col = "true" ? null : "36px")};
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
