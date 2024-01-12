import { useRecoilValue } from "recoil";
import styled from "styled-components";

import AboutCalendar from "../../pagesComponents/about/main/aboutCalendar/AboutCalendar";
import AboutCategoryNav from "../../pagesComponents/about/main/AboutCategoryNav";
import AboutGather from "../../pagesComponents/about/main/aboutGather/AboutGather";
import AboutHeader from "../../pagesComponents/about/main/aboutHeader/AboutHeader";
import AboutMain from "../../pagesComponents/about/main/aboutMain/AboutMain";
import AboutReview from "../../pagesComponents/about/main/AboutReview";
import AboutStudyHeader from "../../pagesComponents/about/main/AboutStudyHeader";
import EventBanner from "../../pagesComponents/about/main/EventBanner";
import AboutWinRecord from "../../pagesComponents/about/main/WinRecord";
import Setting from "../../pagesComponents/about/Setting";
import { participationsState, voteDateState } from "../../recoil/studyAtoms";

function About() {
  const voteDate = useRecoilValue(voteDateState);
  const participations = useRecoilValue(participationsState);

  return (
    <>
      <Setting />
      <Layout>
        <AboutHeader />
        <AboutCategoryNav />
        {voteDate && (
          <>
            <AboutStudyHeader />
            <AboutCalendar />
            <AboutMain participations={participations} />
            <EventBanner />
            <AboutGather />
            <AboutReview />
            <AboutWinRecord />
          </>
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  min-height: 100vh;
  padding-bottom: 40px;
  background-color: var(--font-h8);
`;

export default About;
