import styled from "styled-components";

function ReadyToOpen() {
  return (
    <Layout>
      <span>COMING SOON</span>
    </Layout>
  );
}

const Layout = styled.div`
  background-color: rgba(234, 236, 240, 0.6);
  position: absolute;
  top: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-weight: 700;
  border-radius: var(--border-radius-sub);
  color: var(--font-h1);
  > span {
    opacity: 1;
  }
`;

export default ReadyToOpen;
