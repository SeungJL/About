import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../../components/modals/ModalPortal";
import StudyAbsentModal from "../../../../modals/study/StudyAbsentModal";
import StudyChangeTimeModal from "../../../../modals/study/StudyChangeTimeModal";
import StudyCheckImageModal from "../../../../modals/study/StudyCheckImageModal";
import StudyCheckModal from "../../../../modals/study/StudyCheckModal";
import StudyFreeOpenModal from "../../../../modals/study/StudyFreeOpenModal";
import StudyVoteSubModal from "../../../../modals/study/studyVoteSubModal/StudyVoteSubModal";
import { DispatchType } from "../../../../types/reactTypes";
import { IAttendance, IPlace } from "../../../../types/study/studyDetail";
import { StudySpaceModalType } from "../StudySpaceNavigation";
import VoteSuccessScreen from "../VoteSuccessScreen";

interface IStudySpaceNavModal {
  type: StudySpaceModalType;
  setType: DispatchType<StudySpaceModalType>;
  myVote: IAttendance;
  place: IPlace;
}

function StudySpaceNavModal({
  type,
  setType,
  myVote,
  place,
}: IStudySpaceNavModal) {
  const [isVoteComplete, setIsVoteComplete] = useState(false);

  const closeModal = () => {
    setType(null);
  };

  return (
    <Layout>
      {["vote", "private"].includes(type) && (
        <ModalPortal setIsModal={closeModal}>
          <StudyVoteSubModal
            setIsModal={closeModal}
            place={place}
            isPrivate={type === "private"}
          />
        </ModalPortal>
      )}
      {type === "freeOpen" && (
        <ModalPortal setIsModal={closeModal}>
          <StudyFreeOpenModal setIsModal={closeModal} />
        </ModalPortal>
      )}
      {type === "attendCheck" && (
        <ModalPortal setIsModal={closeModal}>
          <StudyCheckModal setIsModal={closeModal} />
        </ModalPortal>
      )}
      {type === "attendCheckImage" && (
        <ModalPortal setIsModal={closeModal}>
          <StudyCheckImageModal setIsModal={closeModal} />
        </ModalPortal>
      )}
      {type === "change" && (
        <ModalPortal setIsModal={closeModal}>
          <StudyChangeTimeModal
            setIsModal={closeModal}
            myVoteTime={myVote?.time}
          />
        </ModalPortal>
      )}
      {type === "absent" && (
        <ModalPortal setIsModal={closeModal}>
          <StudyAbsentModal setIsModal={closeModal} />
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
