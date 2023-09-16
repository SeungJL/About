import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { arrangeMainSpace } from "../../helpers/studyHelpers";
import AboutCalendar from "../../pagesComponents/about/main/aboutCalendar/AboutCalendar";
import AboutCategoryNav from "../../pagesComponents/about/main/AboutCategoryNav";
import AboutGather from "../../pagesComponents/about/main/aboutGather/AboutGather";
import AboutHeader from "../../pagesComponents/about/main/aboutHeader/AboutHeader";
import AboutMain from "../../pagesComponents/about/main/aboutMain/AboutMain";
import AboutReview from "../../pagesComponents/about/main/AboutReview";
import AboutStudyHeader from "../../pagesComponents/about/main/AboutStudyHeader";
import AboutStudyResult from "../../pagesComponents/about/main/aboutStudyResult/AboutStudyResult";
import AboutVoteNav from "../../pagesComponents/about/main/AboutVoteNav";
import EventBanner from "../../pagesComponents/about/main/EventBanner";
import WinRecord from "../../pagesComponents/about/main/WinRecord";
import DateSetting from "../../pagesComponents/setting/DateSetting";
import StudySetting from "../../pagesComponents/setting/StudySetting";
import UserSetting from "../../pagesComponents/setting/UserSetting";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import {
  myStudyFixedState,
  participationsState,
  studyDateStatusState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { locationState } from "../../recoil/userAtoms";
import { NOT_OPEN_LOCATION } from "../../storage/study";
import { IStudy } from "../../types/study/study";

function About() {
  const location = useRecoilValue(locationState);
  const mySpaceFixed = useRecoilValue(myStudyFixedState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const participations = useRecoilValue(participationsState);
  const voteDate = useRecoilValue(voteDateState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const [otherStudies, setOtherStudies] = useState<IStudy[]>([]);

  //스터디 정렬
  useEffect(() => {
    if (NOT_OPEN_LOCATION.includes(location)) setIsMainLoading(false);
    if (!participations) return;
    const arrangedOtherStudies = arrangeMainSpace(
      participations?.filter((space) => space !== mySpaceFixed),
      studyDateStatus !== "not passed"
    );
    setOtherStudies(arrangedOtherStudies);
    setIsMainLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySpaceFixed, participations]);

  return (
    <>
      <Setting>
        <UserSetting />
        <DateSetting />
        <StudySetting />
      </Setting>
      <Layout>
        <AboutHeader />
        <AboutCategoryNav />
        <AboutStudyHeader />
        {studyDateStatus !== "not passed" && <AboutStudyResult />}
        {voteDate && <AboutCalendar />}
        {studyDateStatus === "not passed" && <AboutVoteNav />}
        <AboutMain participations={otherStudies} />
        <HrDiv />
        <AboutGather />
        <EventBanner />
        <AboutReview />
        <WinRecord />
        {/* <AboutRanking /> */}
      </Layout>
    </>
  );
}

const Setting = styled.div``;
const Layout = styled.div`
  min-height: 100vh;
  padding-bottom: 40px;
`;
const HrDiv = styled.div`
  height: 8px;
  margin-bottom: var(--margin-main);
  background-color: var(--font-h56);
`;

export default About;
