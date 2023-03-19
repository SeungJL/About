import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { IconMapMark } from "../../../../public/icons/Icons";
import { useState } from "react";
import ModalPortal from "../../../ModalPortal";
import VoteStudyModal from "../../../../modals/study/vote/voteStudy/VoteStudyModal";

function AboutMainHeader() {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      <Layout>
        <Header>
          <div>
            <span>카공 스터디</span>
            <Vote onClick={() => setIsShowModal(true)}>
              <FontAwesomeIcon icon={faCheckToSlot} />
              <span>빠른투표</span>
            </Vote>
          </div>
          <Local>
            <IconMapMark />
            <select>
              <option value="수원">수원</option>
              <option value="강서">강서</option>
            </select>
          </Local>
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
  }
`;

const Local = styled.div`
  display: flex;
  align-items: center;
  > select {
    width: 50px;
    color: #767d8a;
    font-size: 14px;
  }
`;
const BtnNav = styled.nav`
  > button {
    background-color: #e3e6eb;
    font-family: "PretendSemiBold";
    border-radius: 5px;
    font-size: 13px;
    padding: 3px;
    margin-right: 10px;
    width: 100px;
    height: 30px;
  }
`;

export default AboutMainHeader;
