import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { studyDateStatusState } from "../../../../recoil/studyAtoms";
import AboutCalendarDate from "./AboutCalendarDate";
import AboutCalendarDays from "./AboutCalendarDays";
import AboutCalendarMonth from "./AboutCalendarMonth";

function AboutCalendar() {
  const studyDateStatus = useRecoilValue(studyDateStatusState);
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
  min-height: 107px;
  border-bottom: var(--border-main-light);
`;

const Content = styled.div`
  margin: 0 var(--margin-min);
`;

export default AboutCalendar;
