import styled from "styled-components";

interface IRankingBar {
  isScore: boolean;
}

function RankingBar({ isScore }: IRankingBar) {
  return (
    <Layout>
      <span>랭킹</span>
      <span>이름</span>
      <span>{isScore ? "점수" : "횟수"}</span>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  margin-bottom: var(--margin-sub);
  align-items: center;
  padding: 0 var(--padding-md);
  > span {
    font-weight: 600;
  }
  > span:first-child {
    flex: 0.2;
    text-align: start;
  }
  > span:nth-child(2) {
    flex: 1;
    margin-left: var(--margin-sub);
  }
  > span:last-child {
    margin-right: var(--margin-min);
  }
`;

export default RankingBar;
