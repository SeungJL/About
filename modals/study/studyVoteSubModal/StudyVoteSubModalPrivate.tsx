import styled from "styled-components";
import { InputLg } from "../../../styles/layout/input";

function StudyVoteSubModalPrivate() {
  return (
    <Layout>
      <Overview>장소를 특정할 수 있도록 적어주세요!</Overview>
      <InputLg placeholder="예시: 아주대 앞 탐앤탐스" />
      <Rule>
        <li>혼자서라도 카공 개인이 공부하고 인증하는 컨텐츠</li>
        <li>출석체크시 사진을 통해 인증</li>
        <li>출석완료시 +5 point를 받습니다.</li>
        <li>미 인증시 -100원이 부과됩니다.</li>
      </Rule>
    </Layout>
  );
}

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: var(--margin-max);
`;

const Overview = styled.div`
  color: var(--font-h2);
  font-size: 15px;
  margin-bottom: var(--margin-sub);
`;

const Rule = styled.div`
  color: var(--font-h2);
  margin-top: var(--margin-max);
  font-size: 13px;
  line-height: var(--line-height);
`;

export default StudyVoteSubModalPrivate;
