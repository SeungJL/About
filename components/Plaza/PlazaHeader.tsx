import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { plazaCategoryState } from "../../recoil/plazaAtoms";

export default function PlazaHeader() {
  const setPlazaCategory = useSetRecoilState(plazaCategoryState);
  return (
    <Layout>
      <Category>
        <button onClick={() => setPlazaCategory("all")}>전체</button>
        <button onClick={() => setPlazaCategory("voteContents")}>
          커뮤니티
        </button>
        <button onClick={() => setPlazaCategory("suggestionContents")}>
          건의사항
        </button>
      </Category>
      <BtnNav>
        <button>글</button>
        <button>건의</button>
      </BtnNav>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 15px;
  background-color: lightpink;
`;
const Category = styled.div`
  border-radius: 10px;
  overflow: hidden;

  > button {
    width: 60px;
    height: 30px;
    background-color: lightgray;
  }
`;

const BtnNav = styled.nav`
  border-radius: 10px;
  overflow: hidden;
  > button {
    width: 40px;
    background-color: lightgray;
  }
`;
