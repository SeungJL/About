import styled from "styled-components";

function NoMyStudy() {
  return <Layout>오늘은 스터디가 없어요 !</Layout>;
}

const Layout = styled.div`
  height: 100px;
  background-color: var(--font-h7);
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 15px;
  color: var(--font-h1);
`;

export default NoMyStudy;
