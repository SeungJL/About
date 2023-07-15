import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Seo from "../../components/Seo";
import { arrangeMainSpace } from "../../libs/utils/studyUtils";
import AboutHeader from "../../pagesComponents/about/main/AboutHeader";
import AboutMain from "../../pagesComponents/about/main/AboutMain";
import AboutUpperBar from "../../pagesComponents/about/main/aboutMain/aboutUpperBar/AboutUpperBar";
import AboutVoteNav from "../../pagesComponents/about/main/aboutMain/AboutVoteNav";
import AboutNavigation from "../../pagesComponents/about/main/AboutNavigation";
import Calendar from "../../pagesComponents/about/main/Calendar";
import ReadyToOpen from "../../pagesComponents/about/main/ReadyToOpen";
import DateSetting from "../../pagesComponents/setting/DateSetting";
import StudySetting from "../../pagesComponents/setting/StudySetting";
import UserSetting from "../../pagesComponents/setting/UserSetting";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { mySpaceFixedState, voteDateState } from "../../recoil/studyAtoms";
import { userLocationState } from "../../recoil/userAtoms";
import { IParticipation } from "../../types/studyDetails";

function About() {
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(userLocationState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const [participations, setParticipations] = useState<IParticipation[]>([]);
  const [studySpaces, setStudySpaces] = useState<IParticipation[]>([]);

  useEffect(() => {
    if (!participations?.length) return;
    const arrangedSpace = arrangeMainSpace(
      participations?.filter((space) => space !== mySpaceFixed)
    );
    setStudySpaces(arrangedSpace);
    setIsMainLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySpaceFixed, participations]);
  console.log(studySpaces);
  return (
    <>
      <Seo title="About" />
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
      </Layout>
    </>
  );
}

const Setting = styled.div``;
const Layout = styled.div``;

export default About;
