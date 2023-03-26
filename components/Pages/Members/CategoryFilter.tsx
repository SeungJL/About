import {
  faArrowDown,
  faArrowUp,
  faUpDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nameToKr, setCategoryStatus } from "../../../libs/utils/membersUtil";

import { ICategory } from "../../../pages/members";
import { categoryState } from "../../../recoil/membersAtoms";
import CategoryStatus from "./CategoryStatus";
import { useEffect } from "react";

const Layout = styled.div`
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
const Item = styled.button<{ isSelected: boolean }>`
  text-align: center;
  background-color: ${(props) => (props.isSelected ? "brown" : "lightGray")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  border-radius: 10px;
  > span {
    margin-right: 4px;
  }
`;

const ItemBox = ({ name }: any) => {
  const [category, setCategory] = useRecoilState(categoryState);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (name !== category.name) setIsSelected(false);
    else setIsSelected(true);
  }, [category]);
  const onCategoryClicked = () => {
    const status = name === category.name ? category.status : "";
    const newCategory = setCategoryStatus(name, status);
    setCategory(newCategory);
  };

  return (
    <Item onClick={onCategoryClicked} isSelected={isSelected}>
      <CategoryStatus name={name} />
    </Item>
  );
};

export default function CategoryFilter() {
  return (
    <Layout>
      {categoryList.map((item, idx) => (
        <ItemBox key={idx} name={item.name} />
      ))}
    </Layout>
  );
}

const categoryList = [
  { name: "registerDate" },
  { name: "birth" },
  { name: "gender" },
  { name: "mbti" },
  { name: "참여율" },
  { name: "role" },
  { name: "경고" },
];
