import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

import AboutMainItem from "./AboutMain/AboutMainItem";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useDecideSpaceMutation } from "../../../hooks/vote/mutations";
import {
  mySpaceFixedState,
  studyStartTimeState,
  voteDateState,
} from "../../../recoil/studyAtoms";

import { VOTE_END_HOUR } from "../../../constants/study";
import { useStudyStartQuery } from "../../../hooks/vote/queries";
import { isMainLoadingState } from "../../../recoil/systemAtoms";
import { IParticipation } from "../../../types/studyDetails";
import AboutMainSkeletonItem from "./AboutMain/AboutMainSkeletonItem";

function AboutMain({
  otherStudySpaces,
  myVoteList,
}: {
  otherStudySpaces: IParticipation[];
  myVoteList: any;
}) {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  const setStudyStartTime = useSetRecoilState(studyStartTimeState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const isMainLoading = useRecoilValue(isMainLoadingState);

  const [isLoading, setIsLoading] = useState(true);

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
 
  return (
    <>
      <AnimatePresence initial={false}>
        {!isMainLoading ? (
          <Layout
            key={voteDate.format("MMDDdd")}
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
        ) : (
          <Layout>
            <Main>
              {[1, 2, 3, 4]?.map((item) => (
                <Block key={item}>
                  <AboutMainSkeletonItem />
                </Block>
              ))}
            </Main>
          </Layout>
        )}
      </AnimatePresence>
    </>
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
