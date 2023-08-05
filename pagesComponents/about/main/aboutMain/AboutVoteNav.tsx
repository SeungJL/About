import { Button } from "@chakra-ui/react";
import {
  faBullseyePointer,
  faCheckToSlot,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../../components/common/ModalPortal";
import { useFailToast } from "../../../../hooks/CustomToast";
import { useStudyPreferenceQuery } from "../../../../hooks/study/queries";
import StudyQuickVoteModal from "../../../../modals/study/studyQuickVoteModal/StudyQuickVoteModal";
import StudyVoteMainModal from "../../../../modals/study/studyVoteMainModal/StudyVoteMainModal";
import { studyDateState } from "../../../../recoil/studyAtoms";
import { userLocationState } from "../../../../recoil/userAtoms";
import { IStudy } from "../../../../types/study/study";

interface IAboutVoteNav {
  participations: IStudy[];
}

function AboutVoteNav({ participations }: IAboutVoteNav) {
  const { data: session } = useSession();
  const failToast = useFailToast();
  const isGuest = session?.user.name === "guest";

  const studyDate = useRecoilValue(studyDateState);
  const location = useRecoilValue(userLocationState);

  const [isVoteModal, setIsVoteModal] = useState(false);
  const [isQuickVoteModal, setIsQuickVoteModal] = useState(false);

  const { data: studyPreference } = useStudyPreferenceQuery();

  const voteCnt = participations.reduce(
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
      {studyDate === "not passed" && (
        <Layout>
          <div>
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
              </Button>{" "}
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
          </div>
          <VoterCnt>
            현재 <b>{voteCnt}명</b>의 멤버가 스터디에 투표중이에요!
          </VoterCnt>
        </Layout>
      )}
      {isVoteModal && (
        <ModalPortal setIsModal={setIsVoteModal}>
          <StudyVoteMainModal
            setIsModal={setIsVoteModal}
            isBig={location === "수원" || location === "양천"}
            location={location}
            participations={participations}
          />
        </ModalPortal>
      )}
      {isQuickVoteModal && (
        <ModalPortal setIsModal={setIsQuickVoteModal}>
          <StudyQuickVoteModal
            setIsModal={setIsQuickVoteModal}
            data={studyPreference}
          />
        </ModalPortal>
      )}
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
  font-size: 15px;
  margin-left: var(--margin-min);
  margin-top: var(--margin-max);
  > b {
    color: var(--font-h1);
  }
`;

const Navigation = styled.div`
  display: flex;
`;
export default AboutVoteNav;
