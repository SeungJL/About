import { Button } from "@chakra-ui/react";
import { faPlus, faUserGroup } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styled from "styled-components";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import StudyInviteModal from "../../../modals/study/StudyInviteModal";
import { IPlace, StudyStatus } from "../../../types/study/studyDetail";
interface IstudyVoteOverview {
  voteCnt: number;
  place: IPlace;
  status: StudyStatus;
  isPrivate: boolean;
}
function studyVoteOverview({
  voteCnt,
  place,
  status,
  isPrivate,
}: IstudyVoteOverview) {
  const router = useRouter();
  const date = dayjs(router.query.date as string);

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Layout isPrivate={isPrivate}>
        <Header>
          <span>{dayjsToFormat(date, "M월 D일 참여 멤버")}</span>
          {status !== "dismissed" && !isPrivate && (
            <Button
              variant="outline"
              fontSize="13px"
              color="var(--font-h3)"
              rightIcon={<FontAwesomeIcon icon={faPlus} size="xs" />}
              size="sm"
              padding="0 var(--padding-md)"
              border="1px solid var(--font-h3)"
              onClick={() => setIsModal(true)}
            >
              친구초대
            </Button>
          )}
        </Header>
        <div />
        <Container>
          <FontAwesomeIcon
            icon={faUserGroup}
            size="sm"
            color="var(--font-h3)"
          />
          {status === "dismissed" ? (
            <span>오픈되지 않은 스터디입니다.</span>
          ) : (
            <span>
              현재 <b> {voteCnt}명의 멤버</b>가{" "}
              {status === "pending" ? "투표중" : "참여중"}이에요!
            </span>
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
  margin-top: ${(props) => props.isPrivate && "var(--margin-sub)"};

  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.header`
  padding: var(--padding-sub) var(--margin-main);
  display: flex;
  justify-content: space-between;
  > span:first-child {
    font-weight: 600;
    font-size: 18px;
  }
`;

const Container = styled.div`
  padding: 0 var(--margin-main);
  padding-top: var(--padding-main);
  padding-bottom: var(--padding-sub);
  display: flex;
  align-items: center;
  color: var(--font-h1);
  background-color: var(--font-h8);

  > span {
    margin-left: var(--margin-min);
  }
`;

const Message = styled.div`
  padding: 0 var(--padding-main);
  font-size: 12px;
  color: var(--color-mint);
  background-color: var(--font-h8);
`;

export default studyVoteOverview;
