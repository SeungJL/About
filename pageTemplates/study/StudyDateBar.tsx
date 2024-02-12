import { Button } from "@chakra-ui/react";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { dayjsToFormat } from "../../utils/dateTimeUtils";

interface IStudyDateBar {}
function StudyDateBar({}: IStudyDateBar) {
  const { date } = useParams<{ date: string }>();

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <StudyDateBarContainer>
        <DateText>{dayjsToFormat(dayjs(date), "M월 D일 참여 멤버")}</DateText>
        <Button
          size="sm"
          variant="outline"
          color="var(--font-h3)"
          rightIcon={<FontAwesomeIcon icon={faPlus} size="xs" />}
          padding="0 var(--padding-md)"
          borderColor="var(--font-h5)"
          onClick={() => setIsModal(true)}
        >
          친구초대
        </Button>
      </StudyDateBarContainer>
      {/* {isModal && <StudyInviteModal setIsModal={setIsModal} place={place} />} */}
      {/* <Layout isPrivate={isPrivate}>
      
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
      </Layout> */}
    </>
  );
}

const StudyDateBarContainer = styled.div`
  padding: 1rem; /* px-3 py-4 */
  display: flex;
  justify-content: space-between;
  background-color: white;
`;

const DateText = styled.span`
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
`;

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

export default StudyDateBar;
