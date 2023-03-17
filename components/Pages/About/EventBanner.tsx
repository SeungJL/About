import styled from "styled-components";

function EventBanner() {
  return (
    <Layout>
      <span>이벤트 배너</span>
    </Layout>
  );
}

const Layout = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  margin: 0 16px 16px 16px;
  background-color: white;

  > span {
    font-size: 16px;
  }
`;

export default EventBanner;
