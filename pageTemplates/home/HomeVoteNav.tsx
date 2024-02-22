import { Button } from "@chakra-ui/react";
import {
  faBullseyePointer,
  faCheckToSlot,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import { useStudyPreferenceQuery } from "../../../hooks/study/queries";
import StudyQuickVoteModal from "../../../modals/study/studyQuickVoteModal/StudyQuickVoteModal";
import StudyQuickVoteRegisterModal from "../../../modals/study/studyQuickVoteModal/StudyQuickVoteRegisterModal";
import StudyVoteMainModal from "../../../modals/study/studyVoteMainModal/StudyVoteMainModal";
import { participationsState } from "../../../recoil/studyAtoms";

function AboutVoteNav() {
  const failToast = useFailToast();

  const isGuest = session?.user.name === "guest";
  const participations = useRecoilValue(participationsState);

  const [isVoteModal, setIsVoteModal] = useState(false);
  const [isQuickVoteModal, setIsQuickVoteModal] = useState(false);

  const { data: studyPreference } = useStudyPreferenceQuery({
    enabled: !isGuest,
  });

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
            mr="var(--gap-2)"
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
      {isVoteModal && <StudyVoteMainModal setIsModal={setIsVoteModal} />}
      {isQuickVoteModal &&
        (studyPreference ? (
          <StudyQuickVoteModal setIsModal={setIsQuickVoteModal} />
        ) : (
          <StudyQuickVoteRegisterModal setIsModal={setIsQuickVoteModal} />
        ))}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--gap-4);
`;

const VoterCnt = styled.div`
  color: var(--gray-3);
  font-size: 15px;
  margin-left: var(--gap-1);
  margin-top: var(--gap-4);
  display: flex;

  > b {
    margin-left: var(--gap-1);
    display: inline-block;
    text-align: end;
    width: 24px;
    color: var(--gray-1);
  }
`;

const Navigation = styled.div`
  display: flex;
`;
export default AboutVoteNav;
