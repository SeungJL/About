import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

function Category({
  category,
  setCategory,
}: {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <Layout>
        <Nav>
          <Button
            isSelected={category === "전체"}
            onClick={() => setCategory("전체")}
          >
            전체
          </Button>
          <Button
            isSelected={category === "일상"}
            onClick={() => setCategory("일상")}
          >
            일상
          </Button>
          <Button
            isSelected={category === "고민"}
            onClick={() => setCategory("고민")}
          >
            고민
          </Button>
          <Button
            isSelected={category === "정보"}
            onClick={() => setCategory("정보")}
          >
            정보
          </Button>
          <Button
            isSelected={category === "같이해요"}
            onClick={() => setCategory("같이해요")}
          >
            같이해요
          </Button>
        </Nav>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  border: 1px solid var(--font-h6);
  justify-content: space-between;
  padding: 4px 18px;
`;

const Nav = styled.nav``;

const Button = styled.button<{ isSelected: boolean }>`
  padding: 3px 10px;
  border: 1.5px solid var(--font-h6);
  border-radius: 12px;
  margin-right: 12px;
  color: ${(props) => (props.isSelected ? "white" : "var(--font-h2)")};
  font-size: 13px;
  background-color: ${(props) =>
    props.isSelected ? "var(--color-red)" : null};
`;

export default Category;
