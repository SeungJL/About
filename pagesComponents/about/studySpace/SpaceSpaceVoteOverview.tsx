import { Button } from "@chakra-ui/react";
import { faUserGroup } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styled from "styled-components";
import StudyInviteModal from "../../../modals/study/StudyInviteModal";
import { IPlace, StudyStatus } from "../../../types/study/studyDetail";
interface IStudySpaceVoteOverview {
  voteCnt: number;
  place: IPlace;
  status: StudyStatus;
  isPrivate: boolean;
}
function StudySpaceVoteOverview({
  voteCnt,
  place,
  status,
  isPrivate,
}: IStudySpaceVoteOverview) {
  const router = useRouter();
  const date = dayjs(router.query.date as string);

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Layout isPrivate={isPrivate}>
        <span>{date.format("M월 D일 참여 멤버")}</span>
        <div />
        <Container>
          <FontAwesomeIcon icon={faUserGroup} size="sm" />
          {status === "dismissed" ? (
            <span>오픈되지 않은 스터디입니다.</span>
          ) : (
            <span>
              현재 <b> {voteCnt}명</b>의 멤버가{" "}
              {status === "pending" ? "투표중" : "참여중"}이에요!
            </span>
          )}
          {status !== "dismissed" && !isPrivate && (
            <Button
              size="xs"
              ml="var(--margin-md)"
              colorScheme="mintTheme"
              onClick={() => setIsModal(true)}
            >
              친구초대
            </Button>
          )}
        </Container>
        {isPrivate && (
          <Message>다른 인원의 인증사진 확인 기능도 개발중에 있습니다.</Message>
        )}
      </Layout>
      {isModal && <StudyInviteModal setIsModal={setIsModal} place={place} />}
    </>
  );
}

const Layout = styled.div<{ isPrivate: boolean }>`
  margin: 0 var(--margin-main);
  margin-top: ${(props) => props.isPrivate && "var(--margin-sub)"};
  padding-top: var(--margin-main);
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
  color: var(--font-h3);
  > span {
    font-size: 14px;
    margin-left: var(--margin-min);
  }
`;

const Message = styled.div`
  margin-top: var(--margin-min);
  font-size: 12px;
  color: var(--color-mint);
`;

export default StudySpaceVoteOverview;
