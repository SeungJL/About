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
      {studyDateStatus === "not passed" && (
        <AboutCalendarMonth
          isCalendarWeek={isCalendarWeek}
          setIsCalendarWeek={setIsCalendarWeek}
        />
      )}
      <Content>
        <AboutCalendarDays />
        <AboutCalendarDate isCalendarWeek={isCalendarWeek} />
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  border-bottom: var(--border-main-light);
`;

const Content = styled.div`
  /* min-height: 70px; */
`;

export default AboutCalendar;
