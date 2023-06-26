import { Button } from "@chakra-ui/react";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../components/ModalPortal";
import InviteStudyModal from "../../../modals/Study/InviteStudyModal";
import { IPlace } from "../../../types/studyDetails";
interface IStudySpaceVoteOverview {
  voteCnt: number;
  place: IPlace;
}
function StudySpaceVoteOverview({ voteCnt, place }: IStudySpaceVoteOverview) {
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();
  const date = dayjs(router.query.date as string);

  return (
    <>
      <Layout>
        <span>{date.format("M월 DD일 참여 멤버")}</span>
        <div />
        <Container>
          <FontAwesomeIcon icon={faUserGroup} size="sm" />
          <span>
            현재 <b> {voteCnt}명</b>이 투표했어요
          </span>
          <Button
            size="xs"
            ml="8px"
            colorScheme="mintTheme"
            onClick={() => setIsModal(true)}
          >
            친구초대
          </Button>
        </Container>
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <InviteStudyModal setIsModal={setIsModal} place={place} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  padding-top: 24px;
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
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  margin-left: 3px;
  color: var(--font-h2);
  > span {
    margin-left: 5px;
  }
`;

export default StudySpaceVoteOverview;
