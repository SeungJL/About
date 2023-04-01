import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import AboutMainHeader from "./AboutMainHeader";
import AboutMainItem from "./AboutMainItem";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import NoMyStudy from "./NoMyStudy";
import { IParticipation } from "../../../../types/studyDetails";
import {
  attendCheckState,
  isVotingState,
  mySpaceFixedState,
  studyDateState,
  voteDateState,
} from "../../../../recoil/studyAtoms";
import { IUser } from "../../../../types/user";
import { getInterestingDate } from "../../../../libs/utils/dateUtils";
import { VOTE_END_HOUR } from "../../../../constants/system";
import ResultHeader from "./ResultHeader";
import { useStudyStartQuery } from "../../../../hooks/vote/queries";
import { useDecideSpaceMutation } from "../../../../hooks/vote/mutations";

function AboutMain({ participations }: { participations: IParticipation[] }) {
  const { data: session } = useSession();

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [isVoting, setIsVoting] = useRecoilState(isVotingState);
  const [mySpaceFixed, setMySpaceFixed] = useRecoilState(mySpaceFixedState);
  const [studyDate, setStudyDate] = useRecoilState(studyDateState);
  const setIsCheck = useSetRecoilState(attendCheckState);
  const [myVoteList, setMyVoteList] = useState<string[]>([""]);

  const { mutateAsync: decideSpace } = useDecideSpaceMutation(
    dayjs().add(1, "day")
  );
  /**스터디 알고리즘 적용 */
  useEffect(() => {
    if (dayjs().hour() >= VOTE_END_HOUR) decideSpace();
  }, [decideSpace]);

  /**날짜마다 달라지는 정보들 초기화 */
  useEffect(() => {
    setMyVoteList([]);
    setMySpaceFixed(null);
    setIsVoting(false);
    setIsCheck(false);

    participations?.map((space) => {
      const spaceStatus = space.status === "open" ? true : false;
      if (
        space?.attendences?.find(
          (att) => (att.user as IUser)?.uid === session?.uid
        )
      ) {
        setMyVoteList((old) => [...old, space.place._id]);
        setIsVoting(true);

        if (spaceStatus) setMySpaceFixed(space);
      }
    });

    const voteDateNum = +voteDate.format("MDD");
    const defaultDate = +getInterestingDate().format("MDD");
    if (
      dayjs().hour() >= 14 && dayjs().hour() < 23
        ? voteDateNum < +getInterestingDate().subtract(1, "day").format("MDD")
        : voteDateNum < defaultDate
    ) {
      setStudyDate("passed");
    } else if (
      dayjs().hour() >= 23
        ? voteDateNum <= defaultDate
        : dayjs().hour() >= 14
        ? +voteDate.add(1, "day").format("MDD") <= defaultDate
        : voteDateNum === defaultDate
    )
      setStudyDate("today");
    else setStudyDate("not passed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate, participations, isVoting]);

  const otherStudySpaces = participations?.filter(
    (space) => space !== mySpaceFixed
  );

  return (
    <AnimatePresence initial={false}>
      <Layout
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30, duration: 1 },
          opacity: { duration: 1 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);
          if (swipe < -swipeConfidenceThreshold) {
            setVoteDate((old) => old.add(1, "day"));
          } else if (swipe > swipeConfidenceThreshold) {
            setVoteDate((old) => old.subtract(1, "day"));
          }
        }}
      >
        {studyDate !== "not passed" && (
          <Result>
            <ResultHeader mySpaceFixed={mySpaceFixed} studyDate={studyDate} />
            {mySpaceFixed !== null ? (
              <AboutMainItem studySpaceInfo={mySpaceFixed} voted={true} />
            ) : (
              <NoMyStudy />
            )}
            <HrDiv />
          </Result>
        )}
        <AboutMainHeader />
        <Main>
          {otherStudySpaces?.map((info, idx) => (
            <Block key={idx}>
              <AboutMainItem
                studySpaceInfo={info}
                voted={Boolean(
                  myVoteList.find((space) => space === info?.place?._id)
                )}
              />
            </Block>
          ))}
        </Main>
      </Layout>
      )
    </AnimatePresence>
  );
}

const Layout = styled(motion.div)`
  padding: 12px 16px;
  min-height: 486px;
`;

const Main = styled.main``;

const Block = styled.div``;

const Result = styled.div`
  > span {
    display: inline-block;
    margin-bottom: 12px;
    color: var(--font-h1);
    font-weight: 600;
    font-size: 18px;
  }
  margin-bottom: 12px;
`;
const HrDiv = styled.div`
  height: 8px;
  background-color: #f0f2f5;
`;

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default AboutMain;
