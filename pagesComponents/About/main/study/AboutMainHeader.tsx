import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useState } from "react";
import VoteStudyModal from "../../../../modals/study/vote/VoteStudyModal";
import { useRecoilValue } from "recoil";
import { studyDateState } from "../../../../recoil/studyAtoms";
import SpaceLocalSelector from "../../../../components/SpaceLocalSelector";
import ModalPortal from "../../../../components/ModalPortal";
import { Button } from "@chakra-ui/react";

function AboutMainHeader() {
  const studyDate = useRecoilValue(studyDateState);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <Layout>
        <div>
          <span>카공 스터디</span>

          {studyDate === "not passed" ? (
            <Button
              leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
              onClick={() => setIsShowModal(true)}
              background="mint"
              color="white"
              height="24px"
              width="80px"
              fontSize="14px"
              marginLeft="12px"
            >
              투표하기
            </Button>
          ) : null}
        </div>
        {studyDate === "not passed" && <SpaceLocalSelector />}
      </Layout>
      {isShowModal && (
        <ModalPortal setIsModal={setIsShowModal}>
          <VoteStudyModal setIsShowModal={setIsShowModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  height: 46px;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    color: var(--font-h1);
    font-weight: 600;
    font-size: 20px;
  }
`;

const Vote = styled.div`
  margin-left: 15px;

  display: flex;
  > span {
    margin-left: 6px;
    font-size: 12px;
    font-weight: 400;
    min-width: 80px;
  }
`;

export default AboutMainHeader;
