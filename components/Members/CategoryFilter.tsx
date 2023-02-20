import {
  faArrowDown,
  faArrowUp,
  faUpDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ICategory } from "../../pages/members";

const Layout = styled.div`
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
const Item = styled.button<{ isSelected: boolean }>`
  text-align: center;
  background-color: ${(props) => (props.isSelected ? "brown" : "lightGray")};
  border-radius: 10px;
  > span {
    margin-right: 4px;
  }
`;

interface IItemBox extends ICategory {
  setCategory: Dispatch<SetStateAction<ICategory>>;
  setCategoryList: Dispatch<SetStateAction<ICategory[]>>;
  idx: number;
  isSelected: boolean;
}

const ItemBox = ({
  name,
  isSortUp,
  setCategory,
  setCategoryList,
  idx,
  isSelected,
}: IItemBox) => {
  const isUpDownCategory = Boolean(["가입일", "참여율"].includes(name));

  const onCategoryClicked = () => {
    if (isUpDownCategory) {
      let isSortChanged = isSortUp;
      if (isSortUp === null || !isSortUp) isSortChanged = true;
      else if (isSortUp === true) isSortChanged = false;
      setCategoryList(() => {
        let New = [...categoryArr];
        New.splice(idx, 1, { name, isSortUp: isSortChanged });
        return New;
      });
    }
    setCategory({ name, isSortUp });
  };

  return (
    <Item onClick={onCategoryClicked} isSelected={isSelected}>
      <span>{name}</span>
      {isUpDownCategory &&
        (isSortUp ? (
          <FontAwesomeIcon icon={faArrowDown} size="xs" />
        ) : (
          <FontAwesomeIcon icon={faArrowUp} size="xs" />
        ))}
    </Item>
  );
};

const categoryArr = [
  { name: "가입일", isSortUp: null },
  { name: "참여율", isSortUp: null },
  { name: "성별", isSortUp: null },
  { name: "역할", isSortUp: null },
  { name: "뱃지", isSortUp: null },
  { name: "MBTI", isSortUp: null },
  { name: "경고", isSortUp: null },
];

export default function CategoryFilter({
  category,
  setCategory,
}: {
  category: ICategory;
  setCategory: Dispatch<SetStateAction<ICategory>>;
}) {
  const [categoryList, setCategoryList] = useState<ICategory[]>(categoryArr);

  return (
    <Layout>
      {categoryList.map((item, idx) => (
        <ItemBox
          key={idx}
          idx={idx}
          name={item.name}
          isSortUp={item.isSortUp}
          setCategory={setCategory}
          setCategoryList={setCategoryList}
          isSelected={Boolean(category.name === item.name)}
        />
      ))}
    </Layout>
  );
}
