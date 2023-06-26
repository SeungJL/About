import { Button, useToast } from "@chakra-ui/react";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

import ModalPortal from "../../../../components/ModalPortal";
import VoteStudyMainModal from "../../../../modals/Study/VoteStudyMainModal";

import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import {
  mySpaceFixedState,
  studyDateState,
} from "../../../../recoil/studyAtoms";

import { userLocationState } from "../../../../recoil/userAtoms";
import { IParticipation } from "../../../../types/studyDetails";

function AboutVoteNav({
  participations,
}: {
  participations: IParticipation[];
}) {
  const { data: session } = useSession();
  const toast = useToast();
  const isGuest = session?.user.name === "guest";

  const studyDate = useRecoilValue(studyDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const location = useRecoilValue(userLocationState);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isAttendModal, setIsAttendModal] = useState(false);

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
  };

  return (
    <>
      <Layout>
        <div>
          {studyDate === "not passed" ? (
            <Button
              leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
              onClick={() => onClickBtn("vote")}
              background="mint"
              color="white"
              size="md"
              marginLeft="12px"
            >
              투표하기
            </Button>
          ) : (
            !mySpaceFixed &&
            studyDate === "today" && (
              <Button
                leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
                onClick={() => onClickBtn("attend")}
                background="mint"
                color="white"
                size="md"
                marginLeft="12px"
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
      {isShowModal && (
        <ModalPortal setIsModal={setIsShowModal}>
          <VoteStudyMainModal
            setIsShowModal={setIsShowModal}
            isBig={location === "수원"}
          />
        </ModalPortal>
      )}
      {isAttendModal && (
        <ModalPortal setIsModal={setIsAttendModal}>
          <VoteStudyMainModal
            setIsShowModal={setIsAttendModal}
            isBig={location === "수원"}
          />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const VoterCnt = styled.div`
  color: var(--font-h3);
  font-size: 15px;
  margin-left: 12px;
  margin-top: 12px;
  > b {
    color: var(--font-h1);
  }
`;
export default AboutVoteNav;
