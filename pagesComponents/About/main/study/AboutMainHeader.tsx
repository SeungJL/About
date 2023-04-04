import {
  faCheck,
  faCheckToSlot,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useState } from "react";
import VoteStudyModal from "../../../../modals/study/vote/VoteStudyModal";
import { useRecoilValue } from "recoil";
import {
  attendCheckState,
  mySpaceFixedState,
  studyDateState,
  voteDateState,
} from "../../../../recoil/studyAtoms";
import SpaceLocalSelector from "../../../../components/SpaceLocalSelector";
import ModalPortal from "../../../../components/ModalPortal";
import { Button } from "@chakra-ui/react";
import CheckVoteModal from "../../../../modals/study/vote/CheckVoteModal";
import { useStudyStartQuery } from "../../../../hooks/vote/queries";
import dayjs from "dayjs";

function AboutMainHeader({ voteCnt }: { voteCnt: number }) {
  const studyDate = useRecoilValue(studyDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isAttendModal, setIsAttendModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);

  const voteDate = useRecoilValue(voteDateState);

  return (
    <>
      <Layout>
        <div>
          {studyDate === "not passed" ? (
            <Button
              leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
              onClick={() => setIsShowModal(true)}
              background="mint"
              color="white"
              size="md"
              marginLeft="12px"
            >
              투표하기
            </Button>
          ) : (
            !mySpaceFixed && (
              <Button
                leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
                onClick={() => setIsAttendModal(true)}
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
          <VoteStudyModal setIsShowModal={setIsShowModal} />
        </ModalPortal>
      )}
      {isAttendModal && (
        <ModalPortal setIsModal={setIsAttendModal}>
          <VoteStudyModal setIsShowModal={setIsShowModal} />
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
  font-size: 14px;
  margin-left: 12px;
  margin-top: 12px;
`;
export default AboutMainHeader;
