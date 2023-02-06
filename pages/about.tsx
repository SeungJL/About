/* Basic */
import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

/* Component */
import Seo from "../components/Seo";
import VoteBtn from "../components/About/VoteBtn";
import ResultBlock from "../components/About/ResultBlock";
import AnotherDaysNav from "../components/About/AnotherDaysNav";
import MainNavigation from "../components/About/MainNavigation";
import Cover from "../components/Cover";

/*State*/
import {
  attendingState,
  dateState,
  isNotCompletedState,
  isShowVoteCancleState,
  showOpenResultState,
  showVoterState,
} from "../recoil/atoms";

/* Icon */
import {
  faAngleLeft,
  faAngleRight,
  faBell,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* Modal */
import OpenResultModal from "../models/OpenResultModal";
import NotCompletedModal from "../models/NotCompletedModal";
import CancelModal from "../models/CancelModal";

/* Interface */
import { IParticipation } from "../models/vote";
import {
  getInterestingDate,
  getToday,
  now,
  strToDate,
} from "../libs/utils/dateUtils";
import { useColorMode, useToast } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import VoterModal from "../models/VoterModal";

/* Backend */
import { GetServerSideProps } from "next";
import { useVoteQuery } from "../hooks/vote/queries";
import { getSession } from "next-auth/react";
import dbConnect from "../libs/dbConnect";
import { User } from "../models/user";
import { isMember } from "../libs/utils/authUtils";
import { useRouter } from "next/router";
import { confirm, confirmWithValidating } from "../services/voteService";
import Confirm from "../components/voteModal/confirm";
import { VOTE_END_HOUR } from "../constants/system";

let dayjs = require("dayjs");

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
  const today = getToday();
  const interestingDate = getInterestingDate();
  const [date, setDate] = useRecoilState(dateState);
  const [isSliderFirst, setSilderFirst] = useState(true);
  const showOpenResult = useRecoilValue(showOpenResultState);
  const showVoter = useRecoilValue(showVoterState);
  const isNotCompleted = useRecoilValue(isNotCompletedState);
  const isShowVoteCancel = useRecoilValue(isShowVoteCancleState);
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    setDate(interestingDate);
    setColorMode("light");
  }, []);

  const { data: vote, isLoading } = useVoteQuery(date, {
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

  //이후 알고리즘 수정 예정
  const voteEndTime = dayjs(date).subtract(1, "day").add(VOTE_END_HOUR, "hour");

  if (now() > voteEndTime) {
    vote?.participations?.map((participant) => {
      if (participant.attendences.length >= 3) {
        participant.status = "open";
      } else participant.status = "dismissed";
    });
  }

  return (
    <>
      <Seo title="About" />
      <AboutLayout>
        <UpScreen>
          <TopNav>
            <Link href="/notice">
              <div>
                <FontAwesomeIcon icon={faBell} size="xl" />
              </div>
            </Link>
            <Title>About</Title>
            <Link href="/user/info">
              <div>
                <FontAwesomeIcon icon={faUserGear} size="xl" />
              </div>
            </Link>
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
      {showVoter !== null && (
        <VoterModal {...vote?.participations[showVoter as any]} />
      )}
      {showOpenResult && (
        <OpenResultModal {...vote?.participations[showOpenResult as any]} />
      )}
      {isShowVoteCancel && <CancelModal />}
      {isNotCompleted && <NotCompletedModal />}
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
