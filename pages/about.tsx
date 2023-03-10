import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import Seo from "../components/common/Seo";
import VoteBtn from "../components/About/VoteBtn";
import ResultBlock from "../components/About/ResultBlock";
import AnotherDaysNav from "../components/About/AnotherDaysNav";
import MainNavigation from "../components/About/MainNavigation";
import safeJsonStringify from "safe-json-stringify";
import {
  faAngleLeft,
  faAngleRight,
  faBell,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IParticipation } from "../models/vote";
import { getToday, now, getDefaultVoteDate } from "../libs/utils/dateUtils";
import { useColorMode, useToast } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { GetServerSideProps } from "next";
import { useVoteQuery } from "../hooks/vote/queries";
import { getSession, useSession } from "next-auth/react";
import dbConnect from "../libs/dbConnect";
import { IUser, User } from "../models/user";
import { isMember } from "../libs/utils/authUtils";
import axios from "axios";
import { VOTE_END_HOUR } from "../constants/system";
import CircleAlert from "../components/block/CircleAlert";

import {
  isShowRegisterFormState,
  isStudyOpenState,
  isUserAttendState,
  isVotingState,
  studyDateState,
  voteDateState,
} from "../recoil/voteAtoms";

import UserInfoCheck from "../components/About/UserInfoCheck";
import AboutFooter from "../components/About/AboutFooter";
import dayjs from "dayjs";

function About({ user }) {
  const toast = useToast();
  const { data: session } = useSession();
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [isSliderFirst, setSilderFirst] = useState(true);
  const { colorMode, setColorMode } = useColorMode();
  const [studyDate, setStudyDate] = useRecoilState(studyDateState);
  const [isVoting, setisVoting] = useRecoilState(isVotingState);
  const today = getToday();
  const setStudyOpen = useSetRecoilState(isStudyOpenState);
  const [isUserAttend, setIsUserAttend] = useRecoilState(isUserAttendState);
  const [isShowRegisterForm, setIsShowRegisterForm] = useRecoilState(
    isShowRegisterFormState
  );
  const { data: vote, isLoading } = useVoteQuery(voteDate, {
    enabled: true,
    onError: (err) => {
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

  useEffect(() => {
    setColorMode("light");
  }, [setColorMode]);

  useEffect(() => {
    if (user?.isActive === false) setIsShowRegisterForm(true);
  }, []);

  useEffect(() => {
    const defaultVoteDate = getDefaultVoteDate(isUserAttend);
    setVoteDate(defaultVoteDate);
    if (now().hour() >= VOTE_END_HOUR) {
      const targetDate = now().add(1, "day").format("YYYY-MM-DD");
      axios.patch(`/api/admin/vote/${targetDate}/status/confirm`);
    }
  }, []);
  useEffect(() => {
    vote?.participations.flatMap((participant) => {
      const studyStatus = participant.status === "open" ? true : false;
      if (
        participant.attendences.find(
          (att) => (att.user as IUser)?.uid === session?.uid
        )
      ) {
        setisVoting(true);
        studyStatus && setIsUserAttend(true);
      }
      studyStatus && setStudyOpen(true);
    });
  });
  if (now().hour() > 16 && now().hour() < 22) {
    setIsUserAttend(false);
  }
  useEffect(() => {
    const defaultVoteDate = getDefaultVoteDate(isUserAttend);
    setisVoting(false);
    setStudyOpen(false);
    const voteDateKr = voteDate.format("MMDDHH");
    const defaultVoteDateKr = defaultVoteDate.format("MMDDHH");
    if (voteDateKr === defaultVoteDateKr) setStudyDate("default");
    else if (voteDateKr < defaultVoteDateKr) setStudyDate("passed");
    else if (voteDateKr > defaultVoteDateKr) setStudyDate("not passed");
  }, [voteDate]);

  return (
    <>
      <Seo title="About" />
      <UserInfoCheck />
      <AboutLayout>
        <UpScreen>
          <TopNav>
            <Link href="/notice">
              {isLoading ? (
                ""
              ) : (
                <div>
                  <FontAwesomeIcon icon={faBell} size="xl" />
                  <CircleAlert right="-20" bottom="20" />{" "}
                </div>
              )}
            </Link>
            <Title>About</Title>
            <Link href="/user">
              {isLoading ? (
                ""
              ) : (
                <div>
                  <FontAwesomeIcon icon={faUserGear} size="xl" />
                </div>
              )}
            </Link>
          </TopNav>
          <InfoSection>
            <div>
              <span>Members</span>
              <span>91</span>
            </div>
            <div>
              <span>Today</span>
              <span> {today.format("MMM DD")}</span>
            </div>
          </InfoSection>
          <AnotherDaysNav />
        </UpScreen>
        <VoteBtn
          participations={vote?.participations}
          mainLoading={isLoading}
        />
        <TodayDate>{!isLoading && voteDate.format("M월 D일")}</TodayDate>
        <DownScreen>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={() => setSilderFirst((cur) => !cur)}
          >
            <SwiperSlide>
              {isLoading ? (
                <Loading>Loading . . .</Loading>
              ) : (
                <MainContents>
                  {vote &&
                    vote.participations.map((item: IParticipation, idx) => (
                      <ResultBlock {...item} index={idx} key={idx} />
                    ))}
                </MainContents>
              )}
            </SwiperSlide>
            <SwiperSlide>{isLoading ? "" : <MainNavigation />}</SwiperSlide>
            <br />
          </Swiper>
          <LeftArrow isSliderFirst={isSliderFirst}>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" />
          </LeftArrow>
          <RightArrow isSliderFirst={isSliderFirst}>
            <FontAwesomeIcon icon={faAngleRight} size="lg" />
          </RightArrow>
        </DownScreen>
      </AboutLayout>
      <AboutFooter />
    </>
  );
}

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
  return { props: { user } };
};

const AboutLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const UpScreen = styled.div`
  height: 34vh;
  background: var(--main-bg-color);
  color: white;
  padding: 25px;
  padding-bottom: 0px;
  display: grid;
  grid-template-rows: 2.2fr 1.2fr 1.2fr;
  text-align: center;
  border-bottom-left-radius: 2vh;
  border-bottom-right-radius: 2vh;
  > div,
  section,
  nav {
    display: flex;
  }
`;
const TopNav = styled.nav`
  justify-content: space-between;
  > div {
    width: 20px;
    height: 20px;
    position: relative;
  }
`;
const Title = styled.span`
  height: 88%;
  font-size: 3.5em;
  align-self: flex-end;
  font-family: "Nanum";
`;
const InfoSection = styled.section`
  padding: 0 13px;
  justify-content: space-between;
  font-size: 0.7em;
  line-height: 1.75;
  > div {
    width: 32%;
    background-color: rgb(255, 255, 255, 0.05);
    border-radius: 2.2vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > span:last-child {
      font-size: 1.3em;
    }
  }
`;
const TodayDate = styled.div`
  font-size: 1.2em;
  font-family: "NanumEx";
  display: flex;
  align-items: center;
  color: var(--font-black);
  height: 55px;
  margin-top: 5px;
  padding: 0 25px;
`;
const DownScreen = styled.div`
  margin: 0 25px;

  position: relative;
`;
const MainContents = styled.main`
  display: flex;
  flex-direction: column;
`;
const LeftArrow = styled.aside<{ isSliderFirst: boolean }>`
  position: absolute;
  display: ${(props) => (props.isSliderFirst ? "none" : "block")};
  color: var(--main-color);
  top: 38%;
  left: -18px;
`;
const RightArrow = styled.aside<{ isSliderFirst: boolean }>`
  position: absolute;
  top: 38%;
  right: -18px;
  display: ${(props) => (!props.isSliderFirst ? "none" : "block")};
  color: var(--main-color);
`;

const Loading = styled.span`
  font-size: 18px;
`;
