import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { LOCATION_RECRUITING } from "../../../../constants/location";
import { useFailToast } from "../../../../hooks/custom/CustomToast";
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
  const failToast = useFailToast();
  const router = useRouter();

  const isMainLoading = useRecoilValue(isMainLoadingState);
  const location = useRecoilValue(locationState);

  const setVoteDate = useSetRecoilState(voteDateState);
  const setTransferStudyData = useSetRecoilState(transferStudyDataState);

  const onClickMoreInfo = () => {
    if (LOCATION_RECRUITING.includes(location)) {
      failToast("free", "오픈 준비중!");
      return;
    }
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

  const privateStudy = participations?.find(
    (par) => par?.place?.brand === "자유 신청"
  );

  const studies = participations?.filter((par) => par !== privateStudy);

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
              {studies
                .slice(0, privateStudy ? VISIBLE_CNT - 1 : VISIBLE_CNT)
                .map((participation, idx) => (
                  <AboutMainItem
                    participation={participation}
                    key={idx}
                    isImagePriority={idx < 2}
                  />
                ))}
              {privateStudy && (
                <AboutMainItem
                  participation={privateStudy}
                  isImagePriority={true}
                />
              )}
              {LOCATION_RECRUITING.includes(location) && <ReadyToOpen />}
            </Container>
            <MoreInfoBtn onClick={onClickMoreInfo}>더보기</MoreInfoBtn>
          </Main>
        </Layout>
      ) : (
        <AboutMainSkeleton />
      )}
    </AnimatePresence>
  );
}

const Layout = styled(motion.div)`
  position: relative;
  padding-bottom: var(--padding-main);
  margin-bottom: var(--margin-sub);
  min-height: 422px;
`;

const Main = styled.main`
  margin: 0 var(--margin-main);
`;

const Container = styled.div``;

const MoreInfoBtn = styled.button`
  width: 100%;
  box-shadow: var(--box-shadow-b);
  height: 44px;
  display: flex;

  justify-content: center;
  background-color: white;
  align-items: center;
  border-radius: var(--border-radius2);
  color: var(--color-mint);
  font-weight: 600;
`;

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default AboutMain;
