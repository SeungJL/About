import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  studyDateStatusState,
  voteDateState,
} from "../../../../recoil/studyAtoms";
import AboutCalendarDate from "./AboutCalendarDate";
import AboutCalendarDays from "./AboutCalendarDays";
import AboutCalendarMonth from "./AboutCalendarMonth";
import AboutCalendarVote from "./AboutCalendarVote";

function AboutCalendar() {
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const voteDate = useRecoilValue(voteDateState);
  const [isCalendarWeek, setIsCalendarWeek] = useState(true);
  return (
    <Layout>
      <AboutCalendarMonth
        isCalendarWeek={isCalendarWeek}
        setIsCalendarWeek={setIsCalendarWeek}
      />
      <Content>
        <AboutCalendarDays voteDate={voteDate} />
        <AboutCalendarDate isCalendarWeek={isCalendarWeek} />
        <AboutCalendarVote />
      </Content>
      <ViewCover />
    </Layout>
  );
}

const Layout = styled.div`
  min-height: 107px;
`;

const Content = styled.div`
  border-bottom: var(--border-main-light);
  position: relative;
  margin: 0 var(--margin-min);
`;
const ViewCover = styled.div`
  height: 48px;

  width: 100%;

  position: relative;
  z-index: 3;
  background-color: var(--font-h8);
`;

export default AboutCalendar;
