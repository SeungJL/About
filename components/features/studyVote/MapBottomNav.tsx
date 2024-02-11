import { Button } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import StudyVoteTimeRulletDrawer from "../../../components2/organisms/drawer/StudyVoteTimeRulletDrawer";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import { DispatchType, IModal } from "../../../types/reactTypes";
import { IStudyVote } from "../../../types2/studyTypes/studyVoteTypes";

interface IMapBottomNav extends IModal {
  myVote: IStudyVote;
  setMyVote: DispatchType<IStudyVote>;
  voteScore: number;
}

function MapBottomNav({
  setIsModal,
  setMyVote,
  myVote,
  voteScore,
}: IMapBottomNav) {
  const failToast = useFailToast();

  const [isTimeModal, setIsTimeModal] = useState(false);

  const onClickTimeSelect = () => {
    if (!myVote?.place) {
      failToast("free", "장소를 먼저 선택해주세요!");
      return;
    }
    setIsTimeModal(true);
  };

  return (
    <>
      <Layout>
        <Button
          colorScheme="mintTheme"
          size="lg"
          h="48px"
          onClick={onClickTimeSelect}
          fontSize="16px"
        >
          시간 선택
        </Button>
        <Button
          fontSize="16px"
          h="48px"
          size="lg"
          onClick={() => setIsModal(false)}
        >
          닫기
        </Button>
      </Layout>
      <AnimatePresence>
        {isTimeModal && (
          <StudyVoteTimeRulletDrawer
            setIsTimeModal={setIsTimeModal}
            myVote={myVote}
            setIsModal={setIsModal}
            voteScore={voteScore}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    margin-top: var(--margin-main);
    width: var(--view-width);
    max-width: var(--view-max-width);
  }
  > button:last-child {
    margin-top: var(--margin-sub);
  }
`;

const TimeModalLayout = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100vw;
  max-width: var(--max-width);
  height: 411.5px;
  border-top-left-radius: var(--border-radius-main);
  border-top-right-radius: var(--border-radius-main);

  background-color: white;
  z-index: 20;
  padding: var(--padding-main);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TopNav = styled.nav`
  width: 56px;
  height: 4px;
  border-radius: 4px;
  background-color: var(--font-h5);
  margin-bottom: var(--margin-max);
`;
const Header = styled.header`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--margin-max);
  > span:first-child {
    font-weight: 600;
    font-size: 15px;
    color: var(--font-h2);
    margin-bottom: var(--margin-min);
  }
  > span:last-child {
    font-size: 20px;
    font-weight: 600;
    color: var(--font-h1);
  }
`;
export default MapBottomNav;
