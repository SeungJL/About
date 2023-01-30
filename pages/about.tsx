import {
  faAngleLeft,
  faAngleRight,
  faBell,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";
import Seo from "../components/Seo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect } from "react";

import { useState } from "react";
import VoteBtn from "../components/About/VoteBtn";
import { IParticipation } from "../models/vote";
import { useToast } from "@chakra-ui/react";
import { getInterestingDate, strToDate } from "../libs/utils/dateUtils";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import VoterModal from "../models/VoterModal";
import ResultBlock from "../components/About/ResultBlock";
import {
  attendingState,
  dateState,
  isNotCompletedState,
  isShowOpenResultState,
  isShowVoteCancleState,
  isShowVoterState,
  openBtnIdxState,
  voterBtnIdxState,
} from "../recoil/atoms";
import AnotherDaysNav from "../components/About/AnotherDaysNav";
import MainNavigation from "../components/About/MainNavigation";
import { useVoteQuery } from "../hooks/vote/queries";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../libs/dbConnect";
import { User } from "../models/user";
import { isMember } from "../libs/utils/authUtils";
import OpenResultModal from "../models/OpenResultModal";
import { FullScreen } from "../styles/LayoutStyles";
import CancelModal from "../models/CancelModal";
import NotCompletedModal from "../models/NotCompletedModal";
import Cover from "../components/Cover";

const AboutLayout = styled.div`
  position: relative;
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
  }
`;
const Title = styled.span`
  height: 88%;
  font-size: 4.5em;
  align-self: flex-end;
  font-family: "Marck Script", cursive;
`;
const InfoSection = styled.section`
  padding: 0 13px;
  justify-content: space-between;
  font-size: 0.7em;
  line-height: 1.75;
  > div {
    width: 28vw;
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
const TodayDate = styled.time`
  position: absolute;
  top: 37%;
  left: 6%;
  font-size: 1.2em;
  font-family: "NanumEx";
  color: var(--font-black);
`;
const DownScreen = styled.div`
  margin: 0 25px;
  margin-top: 60px;
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

function About() {
  const toast = useToast();
  const [date, setDate] = useRecoilState(dateState);
  const [isSliderFirst, setSilderFirst] = useState(true);
  const isShowVoter = useRecoilValue(isShowVoterState);
  const isVoterBtnIdx = useRecoilValue(voterBtnIdxState);
  const interestingDate = getInterestingDate();
  const isShowOpenResult = useRecoilValue(isShowOpenResultState);
  const isOpenBtnIdx = useRecoilValue(openBtnIdxState);
  const isAttending = useRecoilValue(attendingState);
  const setIsShowCancle = useSetRecoilState(isShowVoteCancleState);
  const [isNotCompleted, setIsNotCompleted] =
    useRecoilState(isNotCompletedState);
  const isShowVoteCancel = useRecoilValue(isShowVoteCancleState);
  let dayjs = require("dayjs");
  const [isLoadingStart, setIsLoadingStart] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingStart(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setDate(interestingDate);
  }, []);

  const {
    data: vote,
    isLoading,
    isFetching,
  } = useVoteQuery(date, {
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

  return (
    <>
      <Seo title="About" />
      <AboutLayout>
        <UpScreen>
          <TopNav>
            <div onClick={() => setIsNotCompleted(true)}>
              <FontAwesomeIcon icon={faBell} size="xl" />
            </div>
            <Title>About</Title>
            <div onClick={() => setIsNotCompleted(true)}>
              <FontAwesomeIcon icon={faUserGear} size="xl" />
            </div>
          </TopNav>
          <InfoSection>
            <div>
              <span>Members</span>
              <span>72</span>
            </div>
            <div>
              <span>Today</span>
              <span>{dayjs().format("MMM DD")}</span>
            </div>
          </InfoSection>
          <AnotherDaysNav date={date} />
        </UpScreen>
        <VoteBtn />
        <TodayDate>{dayjs(date).format("M월 D일")}</TodayDate>
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
              <MainContents>
                {vote &&
                  vote.participations.map((item: IParticipation, idx) => (
                    <ResultBlock
                      {...item}
                      index={idx}
                      key={idx}
                      vote={vote}
                      isLoading={isLoading}
                    />
                  ))}
              </MainContents>
            </SwiperSlide>
            <SwiperSlide>
              <MainNavigation />
            </SwiperSlide>
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
      {isShowVoter && (
        <VoterModal {...vote?.participations[isVoterBtnIdx as any]} />
      )}
      {isShowOpenResult && (
        <OpenResultModal {...vote?.participations[isOpenBtnIdx as any]} />
      )}
      {isShowVoteCancel && <CancelModal />}
      {isNotCompleted && <NotCompletedModal />}
      {isLoadingStart && <Cover />}
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

  const user = await User.findOne({ uid: session.uid });

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
