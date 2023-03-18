import { useToast } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useVoteQuery } from "../../../hooks/vote/queries";
import {
  isStudyOpenState,
  isUserAttendState,
  isVotingState,
  studyChoiceState,
  studyDateState,
  studySpaceFixedState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import AboutMainHeader from "./main/AboutMainHeader";
import AboutMainItem from "./main/AboutMainItem";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { VOTE_END_HOUR } from "../../../constants/system";
import axios from "axios";
import { getInterestingDate } from "../../../libs/utils/dateUtils";
import { IUser, User } from "../../../models/user";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import dbConnect from "../../../libs/dbConnect";
import safeJsonStringify from "safe-json-stringify";
import { isMember } from "../../../libs/utils/authUtils";
import { AnimatePresence, motion } from "framer-motion";

function AboutMain() {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const { data: session } = useSession();
  const toast = useToast();
  const [spaceVoted, setSpaceVoted] = useState<string[]>(["23"]);
  const setIsVoting = useSetRecoilState(isVotingState);
  const setStudyChoice = useSetRecoilState(studyChoiceState);
  const setStudySpaceFixed = useSetRecoilState(studySpaceFixedState);

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

  const participations = vote?.participations;

  useEffect(() => {
    if (dayjs().hour() >= VOTE_END_HOUR) {
      const targetDate = dayjs().add(1, "day").format("YYYY-MM-DD");
      axios.patch(`/api/admin/vote/${targetDate}/status/confirm`);
    }
  }, []);

  useEffect(() => {
    setSpaceVoted([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  useEffect(() => {
    participations?.map((space) => {
      const spaceStatus = space.status === "open" ? true : false;
      // space.attendences.map((att) => {
      //   if ((att.user as IUser).uid === session?.uid) {
      //     if (space.status === "open") {
      //     }

      //     const spaceId = space.place._id;
      //     if (att.firstChoice) {
      //       setSpaceVoted({
      //         firstChoice: spaceId,
      //         secondChoices: spaceVoted.secondChoices,
      //       });
      //     } else {
      //       const secondArr = spaceVoted.secondChoices;
      //       secondArr?.push(spaceId);
      //       setSpaceVoted({
      //         firstChoice: spaceVoted.firstChoice,
      //         secondChoices: secondArr,
      //       });
      //     }
      //   }
      // });

      if (
        space.attendences.find(
          (att) => (att.user as IUser)?.uid === session?.uid
        )
      ) {
        setSpaceVoted((old) => [...old, space.place._id]);
        setIsVoting(true);
        spaceStatus && setStudySpaceFixed(space.place._id);
      }
      // studyStatus && setStudyOpen(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate, vote, isLoading]);

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
        <AboutMainHeader />
        <Main>
          {participations?.map((info, idx) => (
            <Block key={idx}>
              <AboutMainItem
                studySpaceInfo={info}
                voted={Boolean(
                  spaceVoted.find((space) => space === info.place._id)
                )}
              />
            </Block>
          ))}
        </Main>
      </Layout>
    </AnimatePresence>
  );
}

const Layout = styled(motion.div)`
  padding: 24px 16px;
`;

const Main = styled.main``;

const Block = styled.div``;

export default AboutMain;
