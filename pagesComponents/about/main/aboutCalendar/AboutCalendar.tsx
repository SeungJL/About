import { useState } from "react";
import styled from "styled-components";
import AboutCalendarDate from "./AboutCalendarDate";
import AboutCalendarDays from "./AboutCalendarDays";
import AboutCalendarMonth from "./AboutCalendarMonth";

function AboutCalendar() {
  const [isCalendarWeek, setIsCalendarWeek] = useState(true);

  return (
    <Layout>
      <AboutCalendarMonth
        isCalendarWeek={isCalendarWeek}
        setIsCalendarWeek={setIsCalendarWeek}
      />
      <Content>
        <AboutCalendarDays />
        <AboutCalendarDate isCalendarWeek={isCalendarWeek} />
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
