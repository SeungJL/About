import { useState } from "react";
import styled from "styled-components";
import AboutCalendarDate from "./AboutCalendarDate";
import AboutCalendarDays from "./AboutCalendarDays";
import AboutCalendarMonth from "./AboutCalendarMonth";

function AboutCalendar() {
  const [calendarType, setCalendarType] = useState<"week" | "month">("week");

  return (
    <Layout>
      <AboutCalendarMonth
        calendarType={calendarType}
        setCalendarType={setCalendarType}
      />
      <Content>
        <AboutCalendarDays />
        <AboutCalendarDate calendarType={calendarType} />
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  border-bottom: var(--border-main-light);
  padding: 0 var(--padding-main);
`;

const Content = styled.div`
  min-height: 70px;
`;

export default AboutCalendar;
