import styled from "styled-components";
import { VOTE_TABLE_COLOR } from "../../constants/design";

function RecordLineBar() {
  return (
    <Layout>
      <SpaceBadge>
        <span>수원</span>
        <span>양천구</span>
      </SpaceBadge>
      <FilterBtn>필터</FilterBtn>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 0 14px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--font-h7);
`;

const SpaceBadge = styled.section`
  display: flex;
  align-items: center;
  > span {
    margin-right: 12px;
    font-weight: 600;
    font-size: 12px;
  }
  > span:first-child {
    color: ${VOTE_TABLE_COLOR[0]};
  }
  > span:nth-child(2) {
    color: ${VOTE_TABLE_COLOR[3]};
  }
`;

const FilterBtn = styled.button`
  margin-left: auto;

  height: 24px;
  font-weight: 600;
  padding: 0 6px;
  font-size: 12px;
`;

export default RecordLineBar;
