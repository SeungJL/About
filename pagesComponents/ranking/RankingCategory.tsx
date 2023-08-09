import { Select, Switch } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { useUserLocationQuery } from "../../hooks/user/queries";
import { RankingCategory as RankingCategoryType } from "../../types/page/ranking";
import { DispatchBoolean, DispatchNumber } from "../../types/reactTypes";
import { IVoteRate } from "../../types/study/studyRecord";
import { IUser } from "../../types/user/user";
interface IRankingCategory {
  initialUserScoreList: IUser[];
  initialMonthAttendArr: IVoteRate[];
  setUserScoreList: React.Dispatch<SetStateAction<IUser[] | IVoteRate[]>>;
  category: RankingCategoryType;
  setCategory: React.Dispatch<SetStateAction<RankingCategoryType>>;
  setIsLoading: DispatchBoolean;
  setMonth: DispatchNumber;
}

function RankingCategory({
  initialUserScoreList,
  initialMonthAttendArr,
  setUserScoreList,
  category,
  setCategory,
  setIsLoading,
  setMonth,
}: IRankingCategory) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const { data: location } = useUserLocationQuery();

  const [isFilter, setIsFilter] = useState(true);

  useEffect(() => {
    let userDataArr = [];
    if (!initialMonthAttendArr || !initialMonthAttendArr) return;
    if (category !== "누적") {
      const userArr = initialMonthAttendArr?.map((who) => {
        const userInfo = initialUserScoreList.find(
          (user) => user.uid === who.uid
        );
        return { ...who, ...userInfo };
      });
      userDataArr = userArr;
    }
    if (category === "누적") userDataArr = initialUserScoreList;
    if (isFilter) {
      const filterData = userDataArr.filter(
        (who) => who.location === (isGuest ? "수원" : location)
      );

      setUserScoreList(filterData);
      return;
    }
    setUserScoreList(userDataArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    category,
    initialMonthAttendArr,
    initialUserScoreList,
    isFilter,
    isGuest,
    location,
  ]);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    setUserScoreList(null);
    const value = e.target.value as RankingCategoryType;
    if (value === "지난") setMonth(dayjs().month() - 1);
    if (value === "월간") setMonth(dayjs().month());
    setCategory(e.target.value as RankingCategoryType);
  };

  const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setUserScoreList(null);
    setIsFilter(e.target.checked);
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
        <Option value="월간">{dayjs().month() + 1}월 랭킹</Option>
        <Option value="지난">{dayjs().month()}월 랭킹</Option>
        <Option value="누적">누적 랭킹</Option>
      </Select>
      <SwitchWrapper>
        <SwitchLabel isSelected={!isFilter}>전체</SwitchLabel>
        <Switch
          isChecked={isFilter}
          colorScheme="mintTheme"
          mx="var(--margin-md)"
          onChange={onChangeFilter}
        />
        <SwitchLabel isSelected={isFilter}>수원</SwitchLabel>
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

export default RankingCategory;
