import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import Seo from "../../components/Seo";
import dbConnect from "../../libs/dbConnect";
import { arrangeMainSpace } from "../../libs/utils/studyUtils";
import AboutHeader from "../../pagesComponents/About/main/AboutHeader";
import AboutMain from "../../pagesComponents/About/main/AboutMain";
import AboutUpperBar from "../../pagesComponents/About/main/AboutMain/AboutUpperBar";
import AboutVoteNav from "../../pagesComponents/About/main/AboutMain/AboutVoteNav";
import AboutNavigation from "../../pagesComponents/About/main/AboutOverview";
import Calendar from "../../pagesComponents/About/main/Calendar";
import ReadyToOpen from "../../pagesComponents/About/main/ReadyToOpen";
import DateSetting from "../../pagesComponents/setting/DateSetting";
import StudySetting from "../../pagesComponents/setting/StudySetting";
import UserSetting from "../../pagesComponents/setting/UserSetting";
import { mySpaceFixedState, voteDateState } from "../../recoil/studyAtoms";
import { locationState } from "../../recoil/systemAtoms";
import { IParticipation } from "../../types/studyDetails";

function About() {
  const [participations, setParticipations] = useState<IParticipation[]>([]);
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);
  const [myVoteList, setMyVoteList] = useState<string[]>([""]);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);

  const otherStudySpaces = arrangeMainSpace(
    participations?.filter((space) => space !== mySpaceFixed)
  );
  console.log(otherStudySpaces);
  return (
    <>
      <Seo title="About" />
      <Setting>
        <UserSetting />
        <DateSetting setParticipations={setParticipations} />
        {voteDate && (
          <StudySetting
            participations={participations}
            setMyVoteList={setMyVoteList}
          />
        )}
      </Setting>
      <Layout>
        <AboutHeader />
        <AboutNavigation />
        <AboutUpperBar />
        <Calendar />
        {location !== "안양" ? (
          <>
            <AboutVoteNav participations={participations} />
            <AboutMain
              otherStudySpaces={otherStudySpaces}
              myVoteList={myVoteList}
            />
          </>
        ) : (
          <ReadyToOpen />
        )}
        {/* <EventBanner /> */}
      </Layout>
      {/* <AboutFooter />*/}
    </>
  );
}

const Setting = styled.div``;
const Layout = styled.div``;

export default About;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  await dbConnect();

  return { props: {} };
};
