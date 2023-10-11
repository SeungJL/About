import styled from "styled-components";
import { InputLg } from "../../../styles/layout/input";

function StudyVoteSubModalPrivate() {
  return (
    <Layout>
      <Overview>장소를 특정할 수 있도록 적어주세요!</Overview>
      <InputLg placeholder="예시: 아주대 앞 탐앤탐스" />
      <Rule>
        
      </Rule>
    </Layout>
  );
}

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const Overview = styled.div`
  color: var(--font-h2);
  font-size: 15px;
  margin-bottom: var(--margin-main);
`;

const Rule = styled.div``;

export default StudyVoteSubModalPrivate;
