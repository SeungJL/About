import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../recoil/studyAtoms";
import CalendarDate from "./calendar/CalendarDate";
import CalendarDay from "./calendar/CalendarDay";
import CalendarMonth from "./calendar/CalendarMonth";

function Calendar() {
  const voteDate = useRecoilValue(voteDateState);
  const [calendarType, setCalendarType] = useState<"week" | "month">("week");

  return (
    <Layout>
      <CalendarMonth
        calendarType={calendarType}
        setCalendarType={setCalendarType}
      />
      <Wrapper>
        {voteDate && (
          <>
            <CalendarDay />
            <CalendarDate calendarType={calendarType} />
          </>
        )}
      </Wrapper>
    </Layout>
  );
}

const Layout = styled.div`
  border-bottom: 1px solid var(--font-h6);
  padding: 0 var(--padding-main);
`;

const Wrapper = styled.div`
  min-height: 70px;
`;

export default Calendar;
