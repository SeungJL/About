import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { arrangeMainSpace } from "../../helpers/studyHelpers";
import AboutHeader from "../../pagesComponents/about/main/AboutHeader";
import AboutMain from "../../pagesComponents/about/main/AboutMain";
import AboutUpperBar from "../../pagesComponents/about/main/aboutMain/aboutUpperBar/AboutUpperBar";
import AboutVoteNav from "../../pagesComponents/about/main/aboutMain/AboutVoteNav";
import AboutNavigation from "../../pagesComponents/about/main/AboutNavigation";
import Calendar from "../../pagesComponents/about/main/Calendar";
import EventBanner from "../../pagesComponents/about/main/EventBanner";
import AboutGather from "../../pagesComponents/about/main/gather/AboutGather";
import ReadyToOpen from "../../pagesComponents/about/main/ReadyToOpen";
import AboutWinRecord from "../../pagesComponents/about/main/winRecord/AboutWinRecord";
import AboutReview from "../../pagesComponents/AboutReview";
import DateSetting from "../../pagesComponents/setting/DateSetting";
import StudySetting from "../../pagesComponents/setting/StudySetting";
import UserSetting from "../../pagesComponents/setting/UserSetting";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { myStudyFixedState, voteDateState } from "../../recoil/studyAtoms";
import { userLocationState } from "../../recoil/userAtoms";
import { IStudy } from "../../types/study/study";
function About() {
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(userLocationState);
  const mySpaceFixed = useRecoilValue(myStudyFixedState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const [participations, setParticipations] = useState<IStudy[]>([]);
  const [studySpaces, setStudySpaces] = useState<IStudy[]>([]);

  useEffect(() => {
    if (!participations?.length) return;
    const arrangedSpace = arrangeMainSpace(
      participations?.filter((space) => space !== mySpaceFixed)
    );
    setStudySpaces(arrangedSpace);
    setIsMainLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySpaceFixed, participations]);

  return (
    <>
      <Setting>
        <UserSetting />
        <DateSetting />
        {voteDate && (
          <StudySetting
            participations={participations}
            setParticipations={setParticipations}
          />
        )}
      </Setting>
      <Layout>
        <AboutHeader />
        <AboutNavigation />
        <AboutUpperBar />
        <Calendar />

        {location !== "강남" ? (
          <>
            <AboutVoteNav participations={participations} />
            <AboutMain participations={studySpaces} />
          </>
        ) : (
          <ReadyToOpen />
        )}
        <HrDiv />
        <AboutGather />
        <EventBanner />
        <AboutReview />
        <AboutWinRecord />
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
