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

import Seo from "../../components/common/Seo";
import AboutMain from "../../pagesComponents/About/main/study/AboutMain";
import EventBanner from "../../pagesComponents/About/main/EventBanner";
import Header from "../../pagesComponents/About/main/Header";
import Calendar from "../../pagesComponents/About/main/Calendar";
import UserOverview from "../../pagesComponents/About/main/UserOverview";
import AboutMainHeader from "../../pagesComponents/About/main/study/AboutMainHeader";
import AboutTitle from "../../pagesComponents/About/main/study/AboutTitle";
import UserSetting from "../../components/UserSetting";

import { useVoteQuery } from "../../hooks/vote/queries";
import { voteDateState } from "../../recoil/studyAtoms";
import { arrangeSpace } from "../../libs/utils/studyUtils";

import { IParticipation } from "../../types/studyDetails";
import { IUser } from "../../types/user";
import { locationState } from "../../recoil/systemAtoms";
import dayjs from "dayjs";
import { getInterestingDate } from "../../libs/utils/dateUtils";
import { VOTER_DATE_END, VOTE_START_HOUR } from "../../constants/study";

function About({ UserList }: { UserList: IUser[] }) {
  const toast = useToast();
  const { data: session } = useSession();

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [participations, setParticipations] = useState<IParticipation[]>([]);
  const location = useRecoilValue(locationState);

  const current = dayjs().hour();

  useEffect(() => {
    if ((!voteDate && current < VOTE_START_HOUR) || current > VOTER_DATE_END)
      setVoteDate(getInterestingDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading } = useVoteQuery(voteDate, location, {
    enabled: voteDate !== null,
    onSuccess(data) {
      const temp: IParticipation[] = arrangeSpace(data.participations);

      setParticipations(temp);
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

  const { isLoading: isLoading2 } = useVoteQuery(
    getInterestingDate().subtract(1, "day"),
    location,
    {
      enabled:
        !voteDate && current >= VOTE_START_HOUR && current <= VOTER_DATE_END,
      onSuccess(data) {
        if (!voteDate)
          data?.participations.some((study) =>
            study.attendences.find(
              (who) =>
                (who.firstChoice && (who.user as IUser)).uid === session?.uid
            )
              ? setVoteDate(dayjs())
              : setVoteDate(getInterestingDate())
          );
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
    }
  );

  const voteCnt = participations.reduce((acc, par) => {
    return (
      acc +
      par.attendences.reduce((a, b) => {
        return a + (b.firstChoice ? 1 : 0);
      }, 0)
    );
  }, 0);

  return (
    <>
      <Seo title="About" />
      <UserSetting UserList={UserList} />
      {!voteDate || isLoading || isLoading2 ? (
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
            <EventBanner />
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
  const users = await User.find();
  const UserList = JSON.parse(safeJsonStringify(users));
  return { props: { UserList } };
};
