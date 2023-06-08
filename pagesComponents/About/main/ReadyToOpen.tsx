import styled from "styled-components";

function ReadyToOpen() {
  return <Layout>오픈 준비중 . . . !</Layout>;
}

const Layout = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--font-h2);
`;

export default ReadyToOpen;
