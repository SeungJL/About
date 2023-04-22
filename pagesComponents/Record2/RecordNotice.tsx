import React from "react";
import styled from "styled-components";

export default function RecordNotice() {
  return (
    <Layout>
      <Header>중요내용 기록</Header>
      <Main></Main>
    </Layout>
  );
}
const Layout = styled.div`
  flex-basis: 200px;
  background-color: pink;
`;

const Header = styled.header``;

const Main = styled.main``;
