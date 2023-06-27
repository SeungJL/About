import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../../components/ModalPortal";
import StudyAbsentModal from "../../../../modals/study/StudyAbsentModal";
import StudyChangeTimeModal from "../../../../modals/study/StudyChangeTimeModal";
import StudyCheckModal from "../../../../modals/study/StudyCheckModal";
import StudyVoteSubModal from "../../../../modals/study/StudyVoteSubModal";
import { IAttendance, IPlace } from "../../../../types/studyDetails";
import VoteSuccessScreen from "../VoteSuccessScreen";

interface IStudySpaceNavModal {
  type: string;
  myVote: IAttendance;
  place: IPlace;
}

function StudySpaceNavModal({ type, myVote, place }: IStudySpaceNavModal) {
  const router = useRouter();
  const voteDate = dayjs(router.query.date as string);
  const [isChangeModal, setIsChangeModal] = useState(false);
  const [isAbsentmodal, setIsAbsentmodal] = useState(false);
  const [isVoteModal, setIsVoteModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);
  const [isVoteComplete, setIsVoteComplete] = useState(false);

  useEffect(() => {
    if (type === "change") setIsChangeModal(true);
    if (type === "absent") setIsAbsentmodal(true);
    if (type === "main")
      myVote?.firstChoice ? setIsCheckModal(true) : setIsVoteModal(true);
  }, [myVote?.firstChoice, type]);
  return (
    <Layout>
      {isChangeModal && (
        <ModalPortal setIsModal={setIsChangeModal}>
          <StudyChangeTimeModal
            setIsStudyChangeTimeModal={setIsChangeModal}
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
          <StudyVoteSubModal
            isModal={isVoteModal}
            setIsModal={setIsVoteModal}
            voteDate={voteDate}
            place={place}
            setIsVoteComplete={setIsVoteComplete}
          />
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
