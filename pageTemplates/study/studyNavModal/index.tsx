import { useParams } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../components/modals/ModalPortal";
import AlertModal, {
  IAlertModalOptions,
} from "../../../components2/AlertModal";
import { useToast } from "../../../hooks/custom/CustomToast";
import StudyAbsentModal from "../../../modals/study/StudyAbsentModal";
import StudyChangeTimeModal from "../../../modals/study/StudyChangeTimeModal";
import StudyCheckImageModal from "../../../modals/study/StudyCheckImageModal";
import StudyCheckModal from "../../../modals/study/StudyCheckModal";
import StudyFreeOpenModal from "../../../modals/study/StudyFreeOpenModal";
import StudyLightAbsentModal from "../../../modals/study/StudyLightAbsentModal";
import { DispatchType } from "../../../types/reactTypes";
import { studyModalType } from "../StudyNavigation";
import VoteSuccessScreen from "../VoteSuccessScreen";

interface IStudyNavModal {
  type: studyModalType;
  setType: DispatchType<studyModalType>;
  modalOptions: IAlertModalOptions;
}

function StudyNavModal({ type, setType, modalOptions }: IStudyNavModal) {
  const toast = useToast();
  const { id, date } = useParams<{ id: string; date: string }>() || {};

  const [isVoteComplete, setIsVoteComplete] = useState(false);

  const closeModal = () => {
    setType(null);
  };

  return (
    <Layout>
      {/* {["vote", "private"].includes(type) && (
        <ModalPortal setIsModal={closeModal}>
          <StudyVoteSubModal
            setIsModal={closeModal}
            place={place}
            isPrivate={type === "private"}
            attCnt={attCnt}
          />
        </ModalPortal>
      )} */}
      {type === "cancelVote" && (
        <AlertModal setIsModal={closeModal} alertModalOptions={modalOptions} />
      )}
      {type === "freeOpen" && <StudyFreeOpenModal setIsModal={closeModal} />}
      {type === "attendCheck" && <StudyCheckModal setIsModal={closeModal} />}
      {type === "attendCheckImage" && (
        <StudyCheckImageModal setIsModal={closeModal} />
      )}
      {type === "changeTime" && (
        <StudyChangeTimeModal setIsModal={closeModal} />
      )}
      {type === "absent" && <StudyAbsentModal setIsModal={closeModal} />}
      {type === "lightAbsent" && (
        <StudyLightAbsentModal setIsModal={closeModal} />
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

export default StudyNavModal;
