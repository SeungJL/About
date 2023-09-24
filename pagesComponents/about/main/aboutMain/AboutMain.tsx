import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isMainLoadingState } from "../../../../recoil/loadingAtoms";
import { voteDateState } from "../../../../recoil/studyAtoms";
import { transferStudyDataState } from "../../../../recoil/transferDataAtoms";
import { locationState } from "../../../../recoil/userAtoms";
import { IParticipation } from "../../../../types/study/studyDetail";
import AboutMainItem from "./AboutMainItem";
import AboutMainSkeleton from "./AboutMainSkeleton";
import ReadyToOpen from "./ReadyToOpen";
interface IAboutMain {
  participations: IParticipation[];
}

const VISIBLE_CNT = 3;

function AboutMain({ participations }: IAboutMain) {
  const router = useRouter();

  const isMainLoading = useRecoilValue(isMainLoadingState);
  const location = useRecoilValue(locationState);
  const setVoteDate = useSetRecoilState(voteDateState);
  const setTransferStudyData = useSetRecoilState(transferStudyDataState);

  const onClickMoreInfo = () => {
    setTransferStudyData(participations);
    router.push("/about/studyPlace");
  };

  //스와이프 함수
  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold)
      setVoteDate((old) => old.add(1, "day"));
    else if (swipe > swipeConfidenceThreshold)
      setVoteDate((old) => old.subtract(1, "day"));
  };

  return (
    <AnimatePresence initial={false}>
      {!isMainLoading ? (
        <Layout
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={onDragEnd}
        >
          <Main>
            <Container>
              {participations
                .slice(0, VISIBLE_CNT)
                .map((participation, idx) => (
                  <AboutMainItem participation={participation} key={idx} />
                ))}
              {location === "동대문" && <ReadyToOpen />}
            </Container>
            <MoreInfoNav onClick={onClickMoreInfo}>
              <span>더보기</span>
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </MoreInfoNav>
          </Main>
        </Layout>
      ) : (
        <AboutMainSkeleton />
      )}
    </AnimatePresence>
  );
}

const Layout = styled(motion.div)`
  min-height: 422px;
  margin-top: var(--margin-main);
`;

const Main = styled.main`
  padding: 0 var(--padding-main);
`;

const Container = styled.div`
  position: relative;
`;

const MoreInfoNav = styled.div`
  box-shadow: var(--box-shadow-sub);
  height: 44px;
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  margin-bottom: var(--margin-max);
  border-radius: var(--border-radius-main);
  color: var(--font-h3);
  font-weight: 600;
  > span:first-child {
    margin-right: var(--margin-md);
  }
`;

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default AboutMain;
