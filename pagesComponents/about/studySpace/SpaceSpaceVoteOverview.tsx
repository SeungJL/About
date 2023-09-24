import { Button } from "@chakra-ui/react";
import { faUserGroup } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../components/modals/ModalPortal";
import StudyInviteModal from "../../../modals/study/StudyInviteModal";
import { IPlace } from "../../../types/study/studyDetail";
interface IStudySpaceVoteOverview {
  voteCnt: number;
  place: IPlace;
}
function StudySpaceVoteOverview({ voteCnt, place }: IStudySpaceVoteOverview) {
  const router = useRouter();
  const date = dayjs(router.query.date as string);

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Layout>
        <span>{date.format("M월 D일 참여 멤버")}</span>
        <div />
        <Container>
          <FontAwesomeIcon icon={faUserGroup} size="sm" />
          <span>
            현재 <b> {voteCnt}명</b>이 투표했어요
          </span>
          <Button
            size="xs"
            ml="var(--margin-min)"
            colorScheme="mintTheme"
            onClick={() => setIsModal(true)}
          >
            친구초대
          </Button>
        </Container>
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <StudyInviteModal setIsModal={setIsModal} place={place} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  padding-top: var(--padding-max);
  display: flex;
  flex-direction: column;
  > span:first-child {
    font-weight: 600;
    font-size: 18px;
  }
  > div {
    height: 12px;
  }
`;

const Container = styled.div`
  margin: var(--margin-min) 0;
  display: flex;
  align-items: center;
  color: var(--font-h2);
  > span {
    margin-left: var(--margin-min);
  }
`;

export default StudySpaceVoteOverview;
