import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function GroupStudySummary() {
  return (
    <Layout>
      <Header>
        <span>관심사 소모임</span>
        <span>모두 보기</span>
      </Header>
      <Main></Main>
    </Layout>
  );
}

const Layout = styled.div`
  height: 208px;
  margin: 20px 16px;
  margin-bottom: 0;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  > span:first-child {
    color: var(--font-h1);
    font-family: "PretendSemiBold";
    font-size: 18px;
  }
  > span:last-child {
    font-size: 14px;
    font-weight: 500;
    color: #a0a4af;
  }
`;

const Main = styled.main`
  height: 110px;
  background-color: white;
`;

export default GroupStudySummary;
