import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { getSession, useSession } from "next-auth/react";
import safeJsonStringify from "safe-json-stringify";
import dbConnect from "../../libs/dbConnect";
import { isMember } from "../../libs/utils/authUtils";
import { User } from "../../models/user";
import { ColorRing } from "react-loader-spinner";
import { useToast } from "@chakra-ui/react";

import Seo from "../../components/Seo";
import AboutMain from "../../pagesComponents/About/main/AboutMain";
import EventBanner from "../../pagesComponents/About/main/EventBanner";
import Header from "../../pagesComponents/About/main/Header";
import Calendar from "../../pagesComponents/About/main/Calendar";
import UserOverview from "../../pagesComponents/About/main/UserOverview";
import AboutMainHeader from "../../pagesComponents/About/main/AboutMain/AboutMainHeader";
import AboutTitle from "../../pagesComponents/About/main/AboutMain/AboutMainTitle";
import UserSetting from "../../pagesComponents/UserSetting";

import { useArrivedDataQuery, useVoteQuery } from "../../hooks/vote/queries";
import { voteDateState } from "../../recoil/studyAtoms";
import { arrangeSpace } from "../../libs/utils/studyUtils";

import { IParticipation } from "../../types/studyDetails";
import { IUser } from "../../types/user";
import { isMainLoadingState, locationState } from "../../recoil/systemAtoms";
import dayjs from "dayjs";
import { getInterestingDate } from "../../libs/utils/dateUtils";
import { VOTER_DATE_END, VOTE_START_HOUR } from "../../constants/study";
import { useScoreAllQuery } from "../../hooks/user/queries";

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
      if (current >= VOTE_START_HOUR && current < VOTER_DATE_END)
        setIsDefaultPrev(true);
      else setVoteDate(getInterestingDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest]);

  useVoteQuery(getInterestingDate().subtract(1, "day"), location, {
    enabled: isDefaultPrev,
    onSuccess(data) {
      if (isDefaultPrev) {
        if (
          data?.participations.some((space) =>
            space?.attendences?.some(
              (who) =>
                who.firstChoice &&
                (who.user as IUser).uid === session?.uid &&
                !who?.arrived
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
  console.log(participations);
  return (
    <>
      <Seo title="About" />
      <UserSetting />
      {!voteDate || isLoading ? (
        <Loader>
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#ff6b6b", "#fd7b5b", "#ffa500", "#ffeae5", "#00c2b3"]}
          />
        </Loader>
      ) : (
        <>
          <Layout>
            <Header />
            <UserOverview />
            <HrDiv />

            <AboutTitle />
            <Calendar />
            {location === "수원" ? (
              <>
                <AboutMainHeader voteCnt={voteCnt} />
                <AboutMain participations={participations} />
              </>
            ) : (
              <>
                <AboutMainHeader voteCnt={voteCnt} />
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

const Loader = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
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
