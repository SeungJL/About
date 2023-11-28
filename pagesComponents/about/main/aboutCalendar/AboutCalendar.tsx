import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../../recoil/studyAtoms";
import AboutCalendarDate from "./AboutCalendarDate";
import AboutCalendarDays from "./AboutCalendarDays";
import AboutCalendarMonth from "./AboutCalendarMonth";
import AboutCalendarVote from "./AboutCalendarVote";

function AboutCalendar() {
  const voteDate = useRecoilValue(voteDateState);

  return (
    <Layout>
      <Container>
        <AboutCalendarMonth />
        <Content>
          <AboutCalendarDays voteDate={voteDate} />
          <AboutCalendarDate />
          <AboutCalendarVote />
        </Content>
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-main);
`;

const Container = styled.div`
  background-color: white;
  height: 192px;
  border-radius: var(--border-radius2);
  box-shadow: var(--box-shadow-b);
`;

const Content = styled.div`
  border-bottom: var(--border-main-light);
  position: relative;
  margin: 0 var(--margin-min);
  margin-top: 36px;
`;

export default AboutCalendar;
