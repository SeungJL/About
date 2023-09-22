import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../../components/modal/ModalPortal";
import StudyAbsentModal from "../../../../modals/study/StudyAbsentModal";
import StudyChangeTimeModal from "../../../../modals/study/StudyChangeTimeModal";
import StudyCheckModal from "../../../../modals/study/StudyCheckModal";
import StudyFreeOpenModal from "../../../../modals/study/StudyFreeOpenModal";
import StudyVoteSubModal from "../../../../modals/study/studyVoteSubModal/StudyVoteSubModal";
import { IAttendance, IPlace } from "../../../../types/study/study";
import VoteSuccessScreen from "../VoteSuccessScreen";

interface IStudySpaceNavModal {
  type: string;
  setType: React.Dispatch<SetStateAction<string>>;
  myVote: IAttendance;
  place: IPlace;
}

function StudySpaceNavModal({
  type,
  setType,
  myVote,
  place,
}: IStudySpaceNavModal) {
  const [isChangeModal, setIsChangeModal] = useState(false);
  const [isAbsentmodal, setIsAbsentmodal] = useState(false);
  const [isVoteModal, setIsVoteModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);
  const [isVoteComplete, setIsVoteComplete] = useState(false);
  const [isFreeModal, setIsFreeModal] = useState(false);

  useEffect(() => {
    if (type === "free") setIsFreeModal(true);
    if (type === "change") setIsChangeModal(true);
    if (type === "absent") setIsAbsentmodal(true);
    if (type === "main")
      myVote?.firstChoice ? setIsCheckModal(true) : setIsVoteModal(true);
    setType("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myVote?.firstChoice, type]);
  return (
    <Layout>
      {isFreeModal && (
        <ModalPortal setIsModal={setIsFreeModal}>
          <StudyFreeOpenModal setIsModal={setIsFreeModal} />
        </ModalPortal>
      )}
      {isChangeModal && (
        <ModalPortal setIsModal={setIsChangeModal}>
          <StudyChangeTimeModal
            setIsModal={setIsChangeModal}
            myVoteTime={myVote?.time}
          />
        </ModalPortal>
      )}
      {isAbsentmodal && (
        <ModalPortal setIsModal={setIsAbsentmodal}>
          <StudyAbsentModal setIsModal={setIsAbsentmodal} />
        </ModalPortal>
      )}
      {isVoteModal && (
        <ModalPortal setIsModal={setIsVoteModal}>
          <StudyVoteSubModal setIsModal={setIsVoteModal} place={place} />
        </ModalPortal>
      )}
      {isCheckModal && (
        <ModalPortal setIsModal={setIsCheckModal}>
          <StudyCheckModal setIsModal={setIsCheckModal} />
        </ModalPortal>
      )}
      {isVoteComplete && (
        <ModalPortal setIsModal={setIsVoteComplete}>
          <VoteSuccessScreen />
        </ModalPortal>
      )}
    </Layout>
  );
}

const Layout = styled.div``;

export default StudySpaceNavModal;
