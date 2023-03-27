import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useState } from "react";
import VoteStudyModal from "../../../modals/study/vote/VoteStudyModal";
import { useRecoilValue } from "recoil";
import { studyDateState } from "../../../recoil/studyAtoms";
import SpaceLocalSelector from "../../../components/SpaceLocalSelector";
import ModalPortal from "../../../components/ModalPortal";

function AboutMainHeader() {
  const studyDate = useRecoilValue(studyDateState);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <Layout>
        <Header>
          <div>
            <span>카공 스터디</span>
            <Vote onClick={() => setIsShowModal(true)}>
              {studyDate !== "passed" && (
                <FontAwesomeIcon icon={faCheckToSlot} />
              )}
              <span>
                {studyDate === "not passed"
                  ? "빠른투표"
                  : studyDate === "today"
                  ? "당일참여"
                  : ""}
              </span>
            </Vote>
          </div>
          {studyDate === "not passed" && <SpaceLocalSelector />}
        </Header>
      </Layout>
      {isShowModal && (
        <ModalPortal closePortal={setIsShowModal}>
          <VoteStudyModal setIsShowModal={setIsShowModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  height: 46px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    color: var(--font-h1);
    font-weight: 600;
    font-size: 18px;
  }
`;
const Vote = styled.div`
  margin-left: 15px;
  display: flex;
  > span {
    margin-left: 5px;
    font-size: 12px;
    font-weight: 400;
    min-width: 80px;
  }
`;

export default AboutMainHeader;
