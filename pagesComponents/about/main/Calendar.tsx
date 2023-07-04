import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../recoil/studyAtoms";
import CalendarDate from "./calendar/CalendarDate";
import CalendarDay from "./calendar/CalendarDay";
import CalendarMonth from "./calendar/CalendarMonth";

function Calendar() {
  const [calendarType, setCalendarType] = useState<"week" | "month">("week");

  const voteDate = useRecoilValue(voteDateState);

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
  margin: 16px 0;
  border-bottom: 1px solid var(--font-h6);
`;

const Wrapper = styled.div`
  min-height: 70px;
  margin: 14px;
  margin-bottom: 0px;
  /* border-top: 1px solid var(--font-h6);
  border-bottom: 1px solid var(--font-h6); */
`;

export default Calendar;
