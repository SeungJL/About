import { Switch } from "@chakra-ui/react";
import { SetStateAction } from "react";
import styled from "styled-components";

interface IRankingCategory {
  isFilter: boolean;
  setIsFilter: React.Dispatch<SetStateAction<boolean>>;
}

function RankingCategory({ isFilter, setIsFilter }: IRankingCategory) {
  return (
    <Layout>
      <span>랭킹</span>
      <span>이름</span>
      <SwitchWrapper>
        <span>우리 지역</span>
        <Switch
          isChecked={isFilter}
          colorScheme="mintTheme"
          onChange={(e) => setIsFilter(e.target.checked)}
        />
      </SwitchWrapper>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  margin-bottom: var(--margin-sub);
  align-items: center;
  > span {
    font-weight: 600;
    width: 60px;
    text-align: center;
  }
  > span:first-child {
    margin-right: var(--margin-sub);
  }
`;
const SwitchWrapper = styled.div`
  margin-left: auto;

  > span:first-child {
    font-size: 11px;
    margin-right: var(--margin-md);
    color: var(--font-h3);
  }
`;
export default RankingCategory;
