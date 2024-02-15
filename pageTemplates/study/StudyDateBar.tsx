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
          color="var(--gray-3)"
          rightIcon={<FontAwesomeIcon icon={faPlus} size="xs" />}
          padding="0 var(--gap-2)"
          borderColor="var(--gray-5)"
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
            color="var(--gray-3)"
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
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background-color: white;
`;

const DateText = styled.span`
  font-size: 18px; /* text-lg */
  font-weight: 700; /* font-semibold */
`;

export default StudyDateBar;
