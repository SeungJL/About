import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { useRecoilState, useRecoilValue } from "recoil";
import { voteDateState } from "../../../recoil/studyAtoms";

import { isMainLoadingState } from "../../../recoil/loadingAtoms";
import { IParticipation, IPlace } from "../../../types/studyDetails";
import AboutMainInitialItem from "./aboutMain/AboutMainInitialItem";
import AboutMainItem from "./aboutMain/AboutMainItem";

interface IAboutMain {
  studySpaces: IPlace[] | IParticipation[];
  myVoteList: string[];
}

function AboutMain({ studySpaces, myVoteList }: IAboutMain) {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  const isMainLoading = useRecoilValue(isMainLoadingState);

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
              {studySpaces?.map((info, idx) => (
                <div key={idx}>
                  {info?.status === "pending" ||
                  info?.attendences.filter((who) => who.firstChoice).length ? (
                    <Block>
                      <AboutMainItem
                        studySpaceInfo={info}
                        voted={Boolean(
                          myVoteList.find((space) => space === info?.place?._id)
                        )}
                      />
                    </Block>
                  ) : null}
                </div>
              ))}
            </Main>
          </Layout>
        ) : (
          <Layout>
            <Main>
              {[1, 2, 3, 4]?.map((item) => (
                <Block key={item}>
                  <AboutMainInitialItem />
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
  margin-top: var(--margin-main);
`;

const Main = styled.main`
  padding: 0 var(--padding-main);
`;

const Block = styled.div``;

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default AboutMain;
