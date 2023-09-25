import { Button } from "@chakra-ui/react";
import {
  faBullseyePointer,
  faCheckToSlot,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../components/modals/ModalPortal";
import { useFailToast } from "../../../hooks/CustomToast";
import { useStudyPreferenceQuery } from "../../../hooks/study/queries";
import StudyQuickVoteModal from "../../../modals/study/studyQuickVoteModal/StudyQuickVoteModal";
import StudyQuickVoteRegisterModal from "../../../modals/study/studyQuickVoteModal/StudyQuickVoteRegisterModal";
import StudyVoteMainModal from "../../../modals/study/studyVoteMainModal/StudyVoteMainModal";
import { participationsState } from "../../../recoil/studyAtoms";
import { isGuestState } from "../../../recoil/userAtoms";

function AboutVoteNav() {
  const failToast = useFailToast();

  const isGuest = useRecoilValue(isGuestState);
  const participations = useRecoilValue(participationsState);

  const [isVoteModal, setIsVoteModal] = useState(false);
  const [isQuickVoteModal, setIsQuickVoteModal] = useState(false);

  const voteCnt = participations?.reduce(
    (acc, par) =>
      acc + par.attendences.reduce((a, b) => a + (b.firstChoice ? 1 : 0), 0),
    0
  );

  const onClickBtn = (type: "vote" | "quickVote") => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    if (type === "vote") setIsVoteModal(true);
    if (type === "quickVote") setIsQuickVoteModal(true);
  };

  const { data: studyPreference } = useStudyPreferenceQuery({
    enabled: !isGuest,
  });

  return (
    <>
      <Layout>
        <Navigation>
          <Button
            leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
            onClick={() => onClickBtn("quickVote")}
            background="mint"
            color="white"
            size="md"
            width="50%"
            mr="var(--margin-md)"
            _hover={{ bg: "var(--color-mint)" }}
          >
            빠른 투표
          </Button>
          <Button
            width="50%"
            leftIcon={<FontAwesomeIcon icon={faBullseyePointer} />}
            onClick={() => onClickBtn("vote")}
            size="md"
            colorScheme="blackAlpha"
          >
            직접 투표
          </Button>
        </Navigation>
        <VoterCnt>
          현재 <b>{voteCnt !== undefined ? voteCnt : ""}명</b>의 멤버가 스터디에
          투표중이에요!
        </VoterCnt>
      </Layout>
      {isVoteModal && (
        <ModalPortal setIsModal={setIsVoteModal}>
          <StudyVoteMainModal setIsModal={setIsVoteModal} />
        </ModalPortal>
      )}
      {isQuickVoteModal &&
        (studyPreference ? (
          <ModalPortal setIsModal={setIsQuickVoteModal}>
            <StudyQuickVoteModal setIsModal={setIsQuickVoteModal} />
          </ModalPortal>
        ) : (
          <ModalPortal setIsModal={setIsQuickVoteModal}>
            <StudyQuickVoteRegisterModal setIsModal={setIsQuickVoteModal} />
          </ModalPortal>
        ))}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--padding-main);
`;

const VoterCnt = styled.div`
  color: var(--font-h3);
  font-size: 14px;
  margin-left: var(--margin-min);
  margin-top: var(--margin-max);
  display: flex;
  > b {
    margin-left: var(--margin-min);
    display: inline-block;
    text-align: end;
    width: 24px;
    color: var(--font-h1);
  }
`;

const Navigation = styled.div`
  display: flex;
`;
export default AboutVoteNav;
