import { useParams } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

import AlertModal, { IAlertModalOptions } from "../../../components/AlertModal";
import StudyVoteDrawer from "../../../components/services/studyVote/StudyVoteDrawer";
import { useToast } from "../../../hooks/custom/CustomToast";
import ModalPortal from "../../../modals/ModalPortal";
import StudyAbsentModal from "../../../modals/study/StudyAbsentModal";
import StudyAttendCheckModal from "../../../modals/study/StudyAttendCheckModal";
import StudyChangeTimeModal from "../../../modals/study/StudyChangeTimeModal";
import StudyFreeOpenModal from "../../../modals/study/StudyFreeOpenModal";
import { DispatchType } from "../../../types/hooks/reactTypes";
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
      {type === "vote" && <StudyVoteDrawer setIsModal={closeModal} />}
      {type === "cancelVote" && (
        <AlertModal setIsModal={closeModal} options={modalOptions} />
      )}
      {type === "changeTime" && (
        <StudyChangeTimeModal setIsModal={closeModal} />
      )}
      {type === "freeOpen" && <StudyFreeOpenModal setIsModal={closeModal} />}
      {type === "attendCheck" && (
        <StudyAttendCheckModal setIsModal={closeModal} />
      )}

      {type === "absent" && <StudyAbsentModal setIsModal={closeModal} />}
      {/* {type === "lightAbsent" && (
        <StudyLightAbsentModal setIsModal={closeModal} />
      )} */}
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
