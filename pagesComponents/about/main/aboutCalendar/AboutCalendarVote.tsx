import { Button } from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";
import StudyVoteMap from "../../../../components/features/studyVote/StudyVoteMap";
import ModalPortal from "../../../../components/modals/ModalPortal";

function AboutCalendarVote() {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Layout>
        <Button
          position="relative"
          borderRadius="50%"
          zIndex="2"
          w="72px"
          size="lg"
          h="72px"
          onClick={() => setIsModal(true)}
          colorScheme="mintTheme"
          boxShadow="0px 0px 12px rgba(0, 194, 179, 0.4)"
        >
          투표
        </Button>
      </Layout>
      <Container></Container>
      {isModal && (
        <ModalPortal>
          <StudyVoteMap setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  border-radius: 50%;
  position: absolute;
  z-index: 4;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  border: 1.5px solid var(--font-h56);
  width: 96px;
  height: 96px;
  z-index: 0;
  border-radius: 50%;
  position: absolute;

  background-color: var(--font-h8);
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Pick = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--font-h3);

  margin-bottom: 4px;
  display: flex;
  justify-content: center;
`;

export default AboutCalendarVote;
