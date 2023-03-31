import {
  faCheckToSlot,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../../components/ModalPortal";
import { useVoteQuery } from "../../../../hooks/vote/queries";
import CheckVoteModal from "../../../../modals/study/vote/CheckVoteModal";
import VoteStudyModal from "../../../../modals/study/vote/VoteStudyModal";
import { voteDateState } from "../../../../recoil/studyAtoms";
import { IParticipation } from "../../../../types/studyDetails";

function ResultHeader({
  mySpaceFixed,
  studyDate,
}: {
  mySpaceFixed: IParticipation;
  studyDate: string;
}) {
  const [isAttendModal, setIsAttendModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);
  const voteDate = useRecoilValue(voteDateState);
  const { data } = useVoteQuery(voteDate);

  const myPlace = data?.participations.find(
    (par) => par === mySpaceFixed
  )?.place;

  return (
    <>
      <Layout>
        <span>내 스터디 결과</span>
        {studyDate === "today" && mySpaceFixed === null ? (
          <Button onClick={() => setIsAttendModal(true)}>
            <FontAwesomeIcon icon={faCheckToSlot} size="xl" />
            <span>당일참여</span>
          </Button>
        ) : studyDate === "today" ? (
          <Button onClick={() => setIsCheckModal(true)}>
            <FontAwesomeIcon icon={faSquareCheck} size="xl" />
            <span>출석체크</span>
          </Button>
        ) : null}
      </Layout>
      {isAttendModal && (
        <ModalPortal closePortal={setIsAttendModal}>
          <VoteStudyModal setIsShowModal={setIsAttendModal} />
        </ModalPortal>
      )}
      {isCheckModal && (
        <ModalPortal closePortal={setIsCheckModal}>
          <CheckVoteModal setIsModal={setIsCheckModal} myPlace={myPlace} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  height: 46px;
  display: flex;
  color: var(--font-h1);
  font-weight: 600;
  font-size: 18px;
  align-items: center;
  margin-bottom: 6px;
`;

const Button = styled.button`
  margin-left: 12px;
  font-size: 12px;
  min-width: 80px;
  display: flex;
  align-items: center;
  > span {
    margin-left: 4px;
  }
`;

export default ResultHeader;
