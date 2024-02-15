import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { LocationFilterType } from "../../types/system";

interface IGatherCategoryBar {
  category: LocationFilterType;
  setCategory: Dispatch<SetStateAction<string>>;
}

function GatherCategoryBar({ category, setCategory }: IGatherCategoryBar) {
  return (
    <Layout>
      <Button
        isSelected={category === "전체"}
        onClick={() => setCategory("all")}
      >
        전체
      </Button>
      <Button
        isSelected={category === "수원"}
        onClick={() => setCategory("수원")}
      >
        수원
      </Button>
      <Button
        isSelected={category === "양천"}
        onClick={() => setCategory("양천")}
      >
        양천
      </Button>
      <Button
        isSelected={category === "안양"}
        onClick={() => setCategory("안양")}
      >
        안양
      </Button>
    </Layout>
  );
}

const Layout = styled.nav`
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--gray-6);
  margin: 0 var(--gap-4);
  padding: var(--gap-1) 0;
`;

const Button = styled.button<{ isSelected: boolean }>`
  padding: var(--gap-1) var(--gap-3);
  border: var(--border-light);
  border-radius: var(--rounded-lg);
  margin-right: var(--gap-3);
  color: ${(props) => (props.isSelected ? "white" : "var(--gray-2)")};
  font-size: 13px;
  background-color: ${(props) => props.isSelected && "var(--color-mint)"};
`;

export default GatherCategoryBar;
