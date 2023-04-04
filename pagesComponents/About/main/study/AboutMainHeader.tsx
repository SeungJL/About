import {
  faCheck,
  faCheckToSlot,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useState } from "react";
import VoteStudyModal from "../../../../modals/study/vote/VoteStudyModal";
import { useRecoilValue } from "recoil";
import {
  attendCheckState,
  mySpaceFixedState,
  studyDateState,
  voteDateState,
} from "../../../../recoil/studyAtoms";
import SpaceLocalSelector from "../../../../components/SpaceLocalSelector";
import ModalPortal from "../../../../components/ModalPortal";
import { Button } from "@chakra-ui/react";
import CheckVoteModal from "../../../../modals/study/vote/CheckVoteModal";
import { useStudyStartQuery } from "../../../../hooks/vote/queries";
import dayjs from "dayjs";

function AboutMainHeader() {
  const studyDate = useRecoilValue(studyDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isAttendModal, setIsAttendModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);
  const isCheck = useRecoilValue(attendCheckState);
  const voteDate = useRecoilValue(voteDateState);
  console.log(isCheck);
  return (
    <>
      <Layout>
        <div>
          <span>
            {studyDate === "not passed" ? "카공 스터디" : "내 스터디 결과"}
          </span>
          {studyDate === "not passed" ? (
            <Button
              leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
              onClick={() => setIsShowModal(true)}
              background="mint"
              color="white"
              size="xs"
              fontSize="12px"
              marginLeft="12px"
            >
              투표하기
            </Button>
          ) : isCheck ? (
            <Check>
              <FontAwesomeIcon icon={faCheck} size="lg" />
            </Check>
          ) : studyDate === "today" && mySpaceFixed === null ? (
            <Button
              leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
              onClick={() => setIsAttendModal(true)}
              background="mint"
              color="white"
              size="xs"
              fontSize="12px"
              marginLeft="12px"
            >
              당일참여
            </Button>
          ) : (
            <Button
              leftIcon={<FontAwesomeIcon icon={faSquareCheck} />}
              onClick={() => setIsCheckModal(true)}
              background="mint"
              color="white"
              size="xs"
              fontSize="12px"
              marginLeft="12px"
            >
              출석체크
            </Button>
          )}
        </div>

        {studyDate === "not passed" && <SpaceLocalSelector />}
      </Layout>
      {(isShowModal || isAttendModal) && (
        <ModalPortal setIsModal={setIsShowModal}>
          <VoteStudyModal setIsShowModal={setIsShowModal} />
        </ModalPortal>
      )}

      {isCheckModal && (
        <ModalPortal setIsModal={setIsCheckModal}>
          <CheckVoteModal setIsModal={setIsCheckModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  margin: 0px 14px 12px 14px;
  display: flex;
  justify-content: space-between;
  > div {
    margin-top: 16px;
    display: flex;
    align-items: center;
    color: var(--font-h1);
    font-weight: 600;
    font-size: 18px;
  }
`;

const Check = styled.span`
  color: var(--color-red);
  margin-left: 12px;
`;

export default AboutMainHeader;
