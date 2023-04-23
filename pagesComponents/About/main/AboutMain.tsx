import styled from "styled-components";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

import AboutMainItem from "./AboutMain/AboutMainItem";

import { useRecoilState, useSetRecoilState } from "recoil";
import {
  attendCheckState,
  isVotingState,
  mySpaceFixedState,
  studyDateState,
  studyStartTimeState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import { useDecideSpaceMutation } from "../../../hooks/vote/mutations";

import { getInterestingDate } from "../../../libs/utils/dateUtils";
import { arrangeMainSpace } from "../../../libs/utils/studyUtils";

import { VOTE_END_HOUR } from "../../../constants/study";
import { IParticipation } from "../../../types/studyDetails";
import { IUser } from "../../../types/user";
import { useStudyStartQuery } from "../../../hooks/vote/queries";
import { isMainLoadingState } from "../../../recoil/systemAtoms";

function AboutMain({ participations }: { participations: IParticipation[] }) {
  const { data: session } = useSession();

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [isVoting, setIsVoting] = useRecoilState(isVotingState);
  const [mySpaceFixed, setMySpaceFixed] = useRecoilState(mySpaceFixedState);
  const setStudyDate = useSetRecoilState(studyDateState);
  const setIsCheck = useSetRecoilState(attendCheckState);
  const setStudyStartTime = useSetRecoilState(studyStartTimeState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);
  const [isLoading, setIsLoading] = useState(true);

  const [myVoteList, setMyVoteList] = useState<string[]>([""]);

  const { data } = useStudyStartQuery(voteDate);
  const { mutateAsync: decideSpace } = useDecideSpaceMutation(
    dayjs().add(1, "day")
  );

  /**스터디 알고리즘 적용 */
  useEffect(() => {
    if (dayjs().hour() >= VOTE_END_HOUR) decideSpace();
  }, [decideSpace]);

  useEffect(() => {
    if (data && data[0]?.startTime)
      setStudyStartTime(dayjs(data[0]?.startTime));
  }, [data, setStudyStartTime]);

  /**날짜마다 달라지는 정보들*/
  useEffect(() => {
    setMyVoteList([]);
    setMySpaceFixed(null);
    setIsVoting(false);
    setIsCheck(false);

    participations?.map((space) => {
      const spaceStatus = space.status === "open" ? true : false;
      space?.attendences.forEach((att) => att.firstChoice);
      const participant = space?.attendences?.find(
        (att) => (att.user as IUser)?.uid === session?.uid
      );
      if (participant) {
        setMyVoteList((old) => [...old, space.place._id]);
        setIsVoting(true);
        if (spaceStatus) {
          setMySpaceFixed(space);
        }
        if (participant.arrived) setIsCheck(true);
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
      dayjs().hour() >= VOTE_END_HOUR
        ? voteDateNum <= defaultDate
        : dayjs().hour() >= 14
        ? +voteDate.add(1, "day").format("MDD") <= defaultDate
        : voteDateNum === defaultDate
    )
      setStudyDate("today");
    else setStudyDate("not passed");
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate, participations, isVoting]);

  const otherStudySpaces = arrangeMainSpace(
    participations?.filter((space) => space !== mySpaceFixed)
  );
  useEffect(() => {
    if (!isLoading) setIsMainLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <AnimatePresence initial={false}>
      <Layout
        key={voteDate.format("MMDDdd")}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30, duration: 0.5 },
          opacity: { duration: 0.5 },
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
  min-height: 452px;
  margin-top: 12px;
`;

const Main = styled.main`
  margin: 0 14px;
`;

const Block = styled.div``;

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
