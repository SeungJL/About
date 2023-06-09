import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Seo from "../../components/Seo";
import { MainLoading } from "../../components/ui/MainLoading";
import { VOTER_DATE_END, VOTE_START_HOUR } from "../../constants/study";
import { useVoteQuery } from "../../hooks/vote/queries";
import dbConnect from "../../libs/dbConnect";
import { getInterestingDate } from "../../libs/utils/dateUtils";
import { arrangeSpace } from "../../libs/utils/studyUtils";
import Header from "../../pagesComponents/About/main/AboutHeader";
import AboutMain from "../../pagesComponents/About/main/AboutMain";
import AboutUpperBar from "../../pagesComponents/About/main/AboutMain/AboutUpperBar";
import AboutVoteNav from "../../pagesComponents/About/main/AboutMain/AboutVoteNav";
import AboutNavigation from "../../pagesComponents/About/main/AboutOverview";
import Calendar from "../../pagesComponents/About/main/Calendar";
import ReadyToOpen from "../../pagesComponents/About/main/ReadyToOpen";
import UserSetting from "../../pagesComponents/UserSetting";
import { voteDateState } from "../../recoil/studyAtoms";
import { isMainLoadingState, locationState } from "../../recoil/systemAtoms";
import { updateStudyState } from "../../recoil/updateAtoms";
import { IParticipation } from "../../types/studyDetails";
import { IUser } from "../../types/user";

function About() {
  const toast = useToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);
  const [participations, setParticipations] = useState<IParticipation[]>([]);
  const location = useRecoilValue(locationState);
  const [isDefaultPrev, setIsDefaultPrev] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [updateStudy, setUpdateStudy] = useRecoilState(updateStudyState);

  const current = dayjs().hour();

  useEffect(() => {
    if (isGuest) {
      if (dayjs().hour() >= 18) {
        setVoteDate(getInterestingDate());
      } else setVoteDate(dayjs());
      return;
    }
    if (voteDate === null) {
      if (current >= VOTE_START_HOUR && current < VOTER_DATE_END) {
        setIsDefaultPrev(true);
      } else setVoteDate(getInterestingDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest]);

  useVoteQuery(getInterestingDate().subtract(1, "day"), location, {
    enabled: isDefaultPrev && voteDate === null,
    onSuccess(data) {
      if (
        isDefaultPrev &&
        voteDate === null &&
        data?.participations.length !== 0
      ) {
        if (
          data?.participations.some(
            (space) =>
              space?.status === "open" &&
              space?.attendences?.some(
                (who) =>
                  who.firstChoice && (who.user as IUser).uid === session?.uid
              )
          )
        )
          setVoteDate(dayjs());
        else setVoteDate(getInterestingDate());
      }
    },
  });

  const { refetch } = useVoteQuery(voteDate, location, {
    enabled: voteDate !== null,
    onSuccess(data) {
    
      const temp: IParticipation[] = arrangeSpace(data.participations);
      setParticipations(temp);
      setIsLoading(false);
    },
    onError() {
      toast({
        title: "불러오기 실패",
        description: "투표 정보를 불러오지 못 했어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  const voteCnt = participations.reduce(
    (acc, par) =>
      acc + par.attendences.reduce((a, b) => a + (b.firstChoice ? 1 : 0), 0),
    0
  );

  useEffect(() => {
    if (updateStudy) {
      setTimeout(() => {
        refetch();
      }, 1000);
      // setUpdateStudy(false);
    }
  }, [refetch, setUpdateStudy, updateStudy]);

  useEffect(() => {
    if (!isLoading) {
      setIsMainLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Seo title="About" />
      <UserSetting />
      {!voteDate || isLoading ? (
        <MainLoading />
      ) : (
        <>
          <Layout>
            <Header />
            <AboutNavigation />
            <AboutUpperBar />
            <Calendar />
            {location === "수원" ? (
              <>
                <AboutVoteNav voteCnt={voteCnt} />
                <AboutMain participations={participations} />
              </>
            ) : location === "안양" ? (
              <ReadyToOpen />
            ) : (
              <>
                <AboutVoteNav voteCnt={voteCnt} />
                <AboutMain participations={participations} />
              </>
            )}
            {/* <EventBanner /> */}
          </Layout>
          {/* <AboutFooter />*/}
        </>
      )}
    </>
  );
}

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
