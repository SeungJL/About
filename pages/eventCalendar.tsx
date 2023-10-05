import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import MonthNav from "../components/features/atoms/MonthNav";
import Header from "../components/layout/Header";
import PageLayout from "../components/layout/PageLayout";
import { EVENT_CONTENT_2023 } from "../constants/contents/eventContents";
import { DAYS_OF_WEEK } from "../constants/util/util";

const DAYS_TITLE = ["점수 X 2", null, null, null, "이벤트", null, "포인트 X 2"];

function EventCalendar() {
  const [navMonth, setNavMonth] = useState(dayjs().startOf("month"));

  const daysInMonth = navMonth.daysInMonth();
  const frontBlankDate = navMonth.day();
  const totalDate = daysInMonth + frontBlankDate;
  const rowsInMonth = totalDate <= 35 ? 5 : 6;

  const filledDates = Array.from({ length: 7 * rowsInMonth }, (_, idx) =>
    idx < frontBlankDate || idx >= totalDate ? null : idx - frontBlankDate + 1
  );
  console.log(filledDates);
  return (
    <PageLayout>
      <Header title="이벤트 캘린더" url="/about" />
      <Title>
        <MonthNav month={navMonth.month()} setNavMonth={setNavMonth} />
      </Title>
      <Calendar>
        <WeekTitleHeader>
          {DAYS_TITLE.map((day, idx) => (
            <div key={idx}>{day}</div>
          ))}
        </WeekTitleHeader>
        <DayOfWeek>
          {DAYS_OF_WEEK.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </DayOfWeek>
        <CalendarDates>
          {filledDates?.map((item, idx) => {
            const day = idx % 7 === 0 ? "sun" : idx % 7 === 6 ? "sat" : null;
            const isToday =
              navMonth.month() === dayjs().month() && item === dayjs().date();
            const contentArr = [];
            if (navMonth.year() === 2023) {
              const A = EVENT_CONTENT_2023[navMonth.month() + 1];
              console.log(A);
            }
            return (
              <DateBlock key={idx} isToday={isToday}>
                <Date day={day}>{item}</Date>
                <DateContent></DateContent>
              </DateBlock>
            );
          })}
        </CalendarDates>
      </Calendar>
    </PageLayout>
  );
}

const Title = styled.div`
  margin-bottom: var(--margin-main);
`;

const Calendar = styled.div`
  display: flex;
  flex-direction: column;
`;

const WeekTitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--color-mint);
  margin: 0 var(--margin-min);
  margin-bottom: 2px;
  > div {
    flex: 1;
    text-align: center;
  }
`;

const DayOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--font-h56);
  padding: 2px var(--padding-min);

  font-size: 12px;
  > div {
    flex: 1;
    text-align: center;
  }
  > div:first-child {
    color: var(--color-red);
  }
  > div:last-child {
    color: #6bafff;
  }
`;

const CalendarDates = styled.div`
  margin: 0 var(--margin-min);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  > div:first-child {
    color: var(--color-red);
  }
`;

const DateBlock = styled.div<{ isToday: boolean }>`
  height: 80px;
  padding: var(--padding-min) 0;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  flex: 1;
  border-top: var(--border-main-light);
  background-color: ${(props) => (props.isToday ? "var(--font-h56)" : null)};
`;

const Date = styled.div<{ day: "sun" | "sat" }>`
  color: ${(props) =>
    props.day === "sun"
      ? "var(--color-red)"
      : props.day === "sat"
      ? "var(--color-blue)"
      : null};
`;

const DateContent = styled.div``;

export default EventCalendar;
