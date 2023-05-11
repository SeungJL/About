import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { getSession, useSession } from "next-auth/react";
import safeJsonStringify from "safe-json-stringify";
import dbConnect from "../../libs/dbConnect";
import { isMember } from "../../libs/utils/authUtils";
import { User } from "../../models/user";

import { useToast } from "@chakra-ui/react";

import Seo from "../../components/Seo";
import AboutMain from "../../pagesComponents/About/main/AboutMain";

import Header from "../../pagesComponents/About/main/AboutHeader";
import Calendar from "../../pagesComponents/About/main/Calendar";
import UserOverview from "../../pagesComponents/About/main/UserOverview";
import AboutVoteNav from "../../pagesComponents/About/main/AboutMain/AboutVoteNav";

import UserSetting from "../../pagesComponents/UserSetting";

import { useVoteQuery } from "../../hooks/vote/queries";
import { voteDateState } from "../../recoil/studyAtoms";
import { arrangeSpace } from "../../libs/utils/studyUtils";

import { IParticipation } from "../../types/studyDetails";
import { IUser } from "../../types/user";
import { locationState } from "../../recoil/systemAtoms";
import dayjs from "dayjs";
import { getInterestingDate } from "../../libs/utils/dateUtils";
import { VOTER_DATE_END, VOTE_START_HOUR } from "../../constants/study";

import { MainLoading } from "../../components/ui/Loading";
import AboutUpperBar from "../../pagesComponents/About/main/AboutMain/AboutUpperBar";

function About() {
  const toast = useToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [participations, setParticipations] = useState<IParticipation[]>([]);
  const location = useRecoilValue(locationState);
  const [isDefaultPrev, setIsDefaultPrev] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const current = dayjs().hour();

  useEffect(() => {
    if (isGuest) {
      if (dayjs().hour() >= 20) {
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
          data?.participations.some((space) =>
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
  useVoteQuery(voteDate, location, {
    enabled: voteDate !== null,
    onSuccess(data) {
      console.log(data);
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

            <UserOverview />
            <HrDiv />

            <AboutUpperBar />
            <Calendar />
            {location === "수원" ? (
              <>
                <AboutVoteNav voteCnt={voteCnt} />
                <AboutMain participations={participations} />
              </>
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

const HrDiv = styled.div`
  height: 4px;
  background-color: var(--font-h6);
`;

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

  const userData = await User.findOne({ uid: session.uid });
  const user = JSON.parse(safeJsonStringify(userData));

  if (!isMember(user?.role)) {
    if (session.role !== user?.role) {
      context.res.setHeader("Set-Cookie", "next-auth.session-token=deleted");

      return {
        redirect: {
          permanent: false,
          destination: "/login?force_signout=true",
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/forbidden",
        },
      };
    }
  }

  return { props: {} };
};
