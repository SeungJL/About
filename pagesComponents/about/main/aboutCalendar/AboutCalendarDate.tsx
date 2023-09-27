import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../../recoil/studyAtoms";

interface IAboutCalendarDate {
  isCalendarWeek: boolean;
}

interface ICalendarBox {
  date: number;
}

function AboutCalendarDate({ isCalendarWeek }: IAboutCalendarDate) {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [calendarBox, setCalendarBox] = useState<ICalendarBox[]>([]);

  useEffect(() => {
    const daysInMonth = voteDate.daysInMonth();
    const startDayInMonth = voteDate.date(1).day();
    const rowsInMonth = startDayInMonth + daysInMonth <= 35 ? 5 : 6;

    const date = voteDate.date();
    const dayInWeek = voteDate.day();
    const temp = [];
    if (isCalendarWeek) {
      const start = date - dayInWeek;
      for (let i = start; i < start + 7; i++) {
        const validDate = i >= 1 && i <= daysInMonth ? i : null;
        temp.push({ date: validDate });
      }
    } else {
   
      for (let i = 1; i <= 7 * rowsInMonth; i++) {
        if (i <= startDayInMonth) temp.push(null);
        else if (i > daysInMonth + startDayInMonth) temp.push(null);
        else temp.push({ date: i - startDayInMonth });
      }
    }
    setCalendarBox(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalendarWeek, voteDate]);

  const onClickDate = (d: ICalendarBox) => {
    setVoteDate(voteDate.date(d.date));
  };

  const IconCircle = ({ children }) => <CircleLayout>{children}</CircleLayout>;

  return (
    <Layout isSmall={isCalendarWeek}>
      {calendarBox.map((d, idx) => (
        <DayItem key={idx} onClick={() => onClickDate(d)}>
          {d?.date === voteDate.date() ? (
            <IconCircle>{d?.date}</IconCircle>
          ) : (
            <div>{d?.date}</div>
          )}
        </DayItem>
      ))}
    </Layout>
  );
}

const Layout = styled.div<{ isSmall: boolean }>`
  color: var(--font-h3);
  font-size: 15px;
  font-weight: 600;
  display: ${(props) => (props.isSmall ? "flex" : "grid")};
  justify-content: ${(props) => props.isSmall && "spaceBetween"};
  grid-template-columns: ${(props) => !props.isSmall && "repeat(7,1fr)"};
`;

const DayItem = styled.div`
  padding: var(--padding-sub) var(--padding-min);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleLayout = styled.div`
  width: 25px;
  text-align: center;
  border-radius: 50%;
  color: white;
  background-color: var(--color-mint);
`;

export default AboutCalendarDate;
