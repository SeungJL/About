import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../recoil/studyAtoms";
import CalendarDate from "./calendar2/CalendarDate";
import CalendarDay from "./calendar2/CalendarDay";
import CalendarMonth from "./calendar2/CalendarMonth";

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
  margin: 20px 0;
`;

const Wrapper = styled.div`
  min-height: 70px;
  margin: 14px;
  border-top: 1px solid var(--font-h6);
  border-bottom: 1px solid var(--font-h6);
`;

export default Calendar;
