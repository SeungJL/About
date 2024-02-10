import { Select, Switch } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMonth } from "../../helpers/dateHelpers";
import { locationState } from "../../recoil/userAtoms";
import { RankingCategory } from "../../types/page/ranking";
import { DispatchType } from "../../types/reactTypes";

interface IRankingCategoryBar {
  category: RankingCategory;
  setCategory: DispatchType<RankingCategory>;
  isLocationFilter: boolean;
  setIsLocationFilter: DispatchType<boolean>;
}

function RankingCategoryBar({
  category,
  setCategory,
  isLocationFilter,
  setIsLocationFilter,
}: IRankingCategoryBar) {
  const location = useRecoilValue(locationState);

  const onChange = (e) => {
    setCategory(e.target.value as RankingCategory);
  };
  return (
    <Layout>
      <Select
        size="sm"
        border="none"
        width="max-content"
        _focus={{ border: "none" }}
        value={category}
        onChange={onChange}
        color="var(--font-h1)"
      >
        <Option value="월간">{getMonth() + 1}월 랭킹</Option>
        <Option value="지난">{getMonth()}월 랭킹</Option>
        <Option value="누적">누적 랭킹</Option>
      </Select>
      <SwitchWrapper>
        <SwitchLabel isSelected={!isLocationFilter}>전체</SwitchLabel>
        <Switch
          isChecked={isLocationFilter}
          colorScheme="mintTheme"
          mx="var(--margin-md)"
          onChange={(e) => setIsLocationFilter(e.target.checked)}
        />
        <SwitchLabel isSelected={isLocationFilter}>{location}</SwitchLabel>
      </SwitchWrapper>
    </Layout>
  );
}

const Layout = styled.div`
  margin-left: 5.5px;
  margin-right: var(--margin-main);
  padding: var(--padding-sub) 0;
  display: flex;
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

const Option = styled.option``;

const SwitchWrapper = styled.div`
  margin-left: auto;
`;

const SwitchLabel = styled.span<{ isSelected: boolean }>`
  font-size: 11px;
  color: ${(props) => (props.isSelected ? "var(--font-h1)" : "var(--font-h3)")};
`;

export default RankingCategoryBar;
