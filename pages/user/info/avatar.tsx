import styled from "styled-components";

import Header from "../../../components/layouts/Header";

function Avatar() {
  return (
    <>
      <Header title="아바타 아이콘 저작권" url="/user" />
      <Layout>
        사용하고 있는 아바타 아이콘의 저작권은 flaticon에 있음을 밝힙니다.
        <br />
        <br />
        https://www.flaticon.com/kr/
      </Layout>
    </>
  );
}

const Layout = styled.div`
  padding: 14px;
`;

export default Avatar;
