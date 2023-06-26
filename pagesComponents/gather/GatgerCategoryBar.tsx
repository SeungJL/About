import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface IGatherCategoryBar {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

function GatherCategoryBar({ category, setCategory }: IGatherCategoryBar) {
  return (
    <Layout>
      <Button
        isSelected={category === "전체"}
        onClick={() => setCategory("전체")}
      >
        전체
      </Button>
      <Button
        isSelected={category === "모집중"}
        onClick={() => setCategory("모집중")}
      >
        모집중
      </Button>
      <Button
        isSelected={category === "완료"}
        onClick={() => setCategory("완료")}
      >
        완료
      </Button>
    </Layout>
  );
}

const Layout = styled.nav`
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--font-h6);
  padding: 4px 14px;
`;

const Button = styled.button<{ isSelected: boolean }>`
  padding: 3px 10px;
  border: 1.5px solid var(--font-h6);
  border-radius: 12px;
  margin-right: 12px;
  color: ${(props) => (props.isSelected ? "white" : "var(--font-h2)")};
  font-size: 13px;
  background-color: ${(props) =>
    props.isSelected ? "var(--color-mint)" : null};
`;

export default GatherCategoryBar;
