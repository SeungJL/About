import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dayjs } from "dayjs";
import styled from "styled-components";

function StudySpaceVoteOverview({ date, voteCnt }: IStudySpaceVoteOverview) {
  return (
    <Layout>
      <span>{date && date?.format("M월 DD일 참여 멤버")}</span>
      <div />
      <span>
        <FontAwesomeIcon icon={faUserGroup} size="sm" />
        <span>
          현재 <b> {voteCnt}명</b>이 투표했어요
        </span>
      </span>
    </Layout>
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
  > span:last-child {
    margin-left: 3px;
    color: var(--font-h2);
    > span {
      margin-left: 5px;
    }
  }
`;

interface IStudySpaceVoteOverview {
  date: Dayjs;
  voteCnt: number;
}

export default StudySpaceVoteOverview;
