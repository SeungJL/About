import { Button, useToast } from "@chakra-ui/react";
import { faCheckToSlot, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../../components/ModalPortal";
import { useStudyPreferenceQuery } from "../../../../hooks/study/queries";
import StudyQuickVoteModal from "../../../../modals/study/StudyQuickVoteModal";
import StudyVoteMainModal from "../../../../modals/study/StudyVoteMainModal";
import {
  mySpaceFixedState,
  studyDateState,
} from "../../../../recoil/studyAtoms";
import { userLocationState } from "../../../../recoil/userAtoms";
import { IParticipation } from "../../../../types/studyDetails";

interface IAboutVoteNav {
  participations: IParticipation[];
}

function AboutVoteNav({ participations }: IAboutVoteNav) {
  const { data: session } = useSession();
  const toast = useToast();
  const isGuest = session?.user.name === "guest";

  const studyDate = useRecoilValue(studyDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const location = useRecoilValue(userLocationState);

  const [isShowModal, setIsShowModal] = useState(false);
  const [isAttendModal, setIsAttendModal] = useState(false);
  const [isQuickVoteModal, setIsQuickVoteModal] = useState(false);

  const { data: studyPreference } = useStudyPreferenceQuery();

  const voteCnt = participations.reduce(
    (acc, par) =>
      acc + par.attendences.reduce((a, b) => a + (b.firstChoice ? 1 : 0), 0),
    0
  );

  const onClickBtn = (type: string) => {
    if (isGuest) {
      toast({
        title: "버튼 동작 실패",
        description: "게스트에게는 허용되지 않는 기능입니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (type === "vote") setIsShowModal(true);
    if (type === "attend") setIsAttendModal(true);
    if (type === "quick") setIsQuickVoteModal(true);
  };

  return (
    <>
      {studyDate === "not passed" && (
        <Layout>
          <div>
            {studyDate === "not passed" ? (
              <Navigation>
                <Button
                  leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
                  onClick={() => onClickBtn("quick")}
                  background="mint"
                  color="white"
                  size="md"
                  width="50%"
                  mr="8px"
                >
                  빠른 투표
                </Button>{" "}
                <Button
                  width="50%"
                  leftIcon={<FontAwesomeIcon icon={faCrosshairs} />}
                  onClick={() => onClickBtn("vote")}
                  size="md"
                  colorScheme="blackAlpha"
                >
                  직접 투표
                </Button>
              </Navigation>
            ) : (
              !mySpaceFixed &&
              studyDate === "today" && (
                <Button
                  leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
                  onClick={() => onClickBtn("attend")}
                  background="mint"
                  color="white"
                  size="md"
                  marginLeft="var(--margin-sub)"
                >
                  당일참여
                </Button>
              )
            )}
          </div>
          {studyDate === "not passed" && (
            <VoterCnt>
              현재 <b>{voteCnt}명</b>의 멤버가 스터디에 투표중이에요!
            </VoterCnt>
          )}
        </Layout>
      )}

      {isShowModal && (
        <ModalPortal setIsModal={setIsShowModal}>
          <StudyVoteMainModal
            setIsShowModal={setIsShowModal}
            isBig={location === "수원"}
          />
        </ModalPortal>
      )}
      {isAttendModal && (
        <ModalPortal setIsModal={setIsAttendModal}>
          <StudyVoteMainModal
            setIsShowModal={setIsAttendModal}
            isBig={location === "수원"}
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
  margin-left: 2px;
  margin-top: var(--margin-max);
  > b {
    color: var(--font-h1);
  }
`;

const Navigation = styled.div`
  display: flex;
`;
export default AboutVoteNav;
