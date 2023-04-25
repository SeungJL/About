import styled from "styled-components";
import Header from "../../components/layouts/Header";

function Store() {
  return (
    <>
      <Header title="기프티콘" />
      <Layout>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const Item = styled.div`
  height: 200px;
`;

export default Store;
