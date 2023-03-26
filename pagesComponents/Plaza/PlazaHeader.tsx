import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../components/ModalPortal";

import CreatePlazaContentModal from "../../modals/write/plaza/WritePlazaContentModal";
import { plazaCategoryState } from "../../recoil/plazaAtoms";

export default function PlazaHeader() {
  const [plazaCategory, setPlazaCategory] = useRecoilState(plazaCategoryState);
  const [isShowModal, setIsShowModal] = useState(false);
  useState(false);
  return (
    <>
      <Layout>
        <Category>
          <Button
            onClick={() => setPlazaCategory("all")}
            isSelected={Boolean(plazaCategory === "all")}
          >
            전체
          </Button>
          <Button
            onClick={() => setPlazaCategory("voteContents")}
            isSelected={Boolean(plazaCategory === "voteContents")}
          >
            커뮤니티
          </Button>
          <Button
            onClick={() => setPlazaCategory("suggestionContents")}
            isSelected={Boolean(plazaCategory === "suggestionContents")}
          >
            건의사항
          </Button>
        </Category>
        <BtnNav>
          <button onClick={() => setIsShowModal(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </BtnNav>
      </Layout>
      {isShowModal && (
        <ModalPortal closePortal={setIsShowModal}>
          <CreatePlazaContentModal setIsShowModal={setIsShowModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 15px;
`;
const Category = styled.div`
  border-radius: 10px;
  overflow: hidden;

  > button {
    width: 60px;
    height: 30px;
  }
`;

const BtnNav = styled.nav``;
const Button = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "brown" : "lightGray")};
`;
