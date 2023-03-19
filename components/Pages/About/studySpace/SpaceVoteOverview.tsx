import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function SpaceVoteOverView({ date }) {
  return (
    <Layout>
      <span>{date && date?.format("M월 DD일 참여 멤버")}</span>
      <div />
      <span>
        <FontAwesomeIcon icon={faUserGroup} size="sm" />
        <span>
          <b>5명</b>이 투표했어요
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

export default SpaceVoteOverView;
