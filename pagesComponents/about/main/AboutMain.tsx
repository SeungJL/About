import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { isMainLoadingState } from "../../../recoil/loadingAtoms";
import { voteDateState } from "../../../recoil/studyAtoms";
import { transferStudyDataState } from "../../../recoil/transferDataAtoms";
import { userLocationState } from "../../../recoil/userAtoms";
import { SUWAN_탐앤탐스 } from "../../../storage/study";
import { IStudy } from "../../../types/study/study";
import AboutMainItem from "./aboutMain/AboutMainItem";
import AboutMainItemSkeleton from "./aboutMain/AboutMainItemSkeleton";
interface IAboutMain {
  participations: IStudy[];
}

function AboutMain({ participations }: IAboutMain) {
  const router = useRouter();

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [interSectionStudy, setInterSectionStudy] = useState<IStudy>();
  const isMainLoading = useRecoilValue(isMainLoadingState);
  const location = useRecoilValue(userLocationState);
  const setTransferStudyData = useSetRecoilState(transferStudyDataState);

  useStudyVoteQuery(voteDate, "수원", {
    enabled: location === "안양",
    onSuccess(data) {
      if (location !== "안양") return;
      setInterSectionStudy(
        data.participations.find((study) => study.place._id === SUWAN_탐앤탐스)
      );
    },
  });

  useEffect(() => {
    setInterSectionStudy(null);
  }, [location]);

  const onClickMoreInfo = () => {
    const studyData = [...participations];
    if (interSectionStudy) studyData.push(interSectionStudy);
    setTransferStudyData(studyData);
    router.push("/about/studyPlace");
  };

  const participationsVisibleCnt = location !== "안양" ? 3 : 2;

  return (
    <AnimatePresence initial={false}>
      {!isMainLoading ? (
        <Layout
          key={voteDate.format("MMDDdd")}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold)
              setVoteDate((old) => old.add(1, "day"));
            else if (swipe > swipeConfidenceThreshold)
              setVoteDate((old) => old.subtract(1, "day"));
          }}
        >
          <Main>
            {participations
              .slice(0, participationsVisibleCnt)
              .map((participation, idx) => (
                <AboutMainItem participation={participation} key={idx} />
              ))}
            {location === "안양" &&
            (interSectionStudy?.status === "pending" ||
              interSectionStudy?.attendences.filter((who) => who.firstChoice)
                .length) ? (
              <AboutMainItem participation={interSectionStudy} />
            ) : null}
            <MoreInfoNav onClick={onClickMoreInfo}>
              <span>더보기</span>
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </MoreInfoNav>
          </Main>
        </Layout>
      ) : (
        <Layout>
          <Main>
            {[1, 2, 3]?.map((item) => (
              <AboutMainItemSkeleton key={item} />
            ))}
          </Main>
        </Layout>
      )}
    </AnimatePresence>
  );
}

const Layout = styled(motion.div)`
  margin-top: var(--margin-main);
`;

const Main = styled.main`
  padding: 0 var(--padding-main);
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
