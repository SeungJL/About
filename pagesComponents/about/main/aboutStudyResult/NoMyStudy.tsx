import { Button } from "@chakra-ui/react";
import { faSparkles } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../../components/common/ModalPortal";
import StudyVoteMainModal from "../../../../modals/study/studyVoteMainModal/StudyVoteMainModal";

function NoMyStudy() {
  const [isFreeOpenModal, setIsFreeOpenModal] = useState(false);
  return (
    <>
      <Layout>
        <Text>오늘은 스터디가 없어요 !</Text>
        <SubText>
          직접 스터디를 오픈 할 수 있습니다.
          <Button
            leftIcon={<FontAwesomeIcon icon={faSparkles} size="sm" />}
            rightIcon={<FontAwesomeIcon icon={faSparkles} size="sm" />}
            onClick={() => setIsFreeOpenModal(true)}
            colorScheme="mintTheme"
            size="xs"
            color="mint"
            variant="ghost"
          >
            오픈 신청
          </Button>
        </SubText>
      </Layout>
      {isFreeOpenModal && (
        <ModalPortal setIsModal={setIsFreeOpenModal}>
          <StudyVoteMainModal
            setIsModal={setIsFreeOpenModal}
            isFreeOpen={true}
          />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div``;

const Text = styled.div`
  height: 110px;
  background-color: var(--font-h7);
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  border-radius: var(--border-radius-main);
  font-size: 15px;
  color: var(--font-h1);
`;

const SubText = styled.div`
  margin: var(--margin-min) 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 11px;
  color: var(--font-h4);
`;

export default NoMyStudy;
