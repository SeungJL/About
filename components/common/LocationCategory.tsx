import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Location } from "../../types/system";

interface ILocationCategory {
  category: Location;
  setCategory: Dispatch<SetStateAction<string>>;
}

function LocationCategory({ category, setCategory }: ILocationCategory) {
  return (
    <Layout>
      <Button
        isSelected={category === "all"}
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
  border-bottom: 1px solid var(--font-h6);
  margin: 0 var(--margin-main);
  padding: var(--padding-min) 0;
`;

const Button = styled.button<{ isSelected: boolean }>`
  padding: var(--padding-min) var(--padding-sub);
  border: var(--border-sub);
  border-radius: var(--border-radius-main);
  margin-right: var(--margin-sub);
  color: ${(props) => (props.isSelected ? "white" : "var(--font-h2)")};
  font-size: 13px;
  background-color: ${(props) => props.isSelected && "var(--color-mint)"};
`;

export default LocationCategory;
