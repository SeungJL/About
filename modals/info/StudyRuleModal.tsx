import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ModalXXL } from "../../styles/LayoutStyles";

function StudyRuleModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Layout>
      <Header>
        <div>
          <div />
          <Title>About 규칙</Title>
          <Page>1 / 2</Page>
        </div>
        <OverView>대학생들의 카공 및 친목 동아리 About !</OverView>
      </Header>
      <hr color="767d8a" />
      <Main>
        <RuleTitle>경고 기준</RuleTitle>
        <Content>
          <ol>
            <li>
              한 달에 2회 미만 참여 <Bold> 횟수 당 -1점</Bold>
            </li>
            <li>
              스터디 지각 <Bold> -0.5점</Bold>
            </li>
            <li>
              당일 불참(스터디,번개) <Bold> -1점</Bold>
            </li>
            <li>상황에 따라 운영진의 판단하에 경고를 받을 수 있음</li>
          </ol>
        </Content>
        <RuleTitle>삭감 기준</RuleTitle>
        <Content>
          <ol>
            <li>
              한 달에 3회 이상 참여(최대 2점) <Bold> 횟수 당 +1점</Bold>
            </li>
            <li>
              오프라인 모임 개최 <Bold> +1점</Bold>
            </li>
            <li>
              오프라인 모임 참여 <Bold> +0.5점</Bold>
            </li>
          </ol>
        </Content>

        <RuleTitle>휴식</RuleTitle>
        <Content>
          <ol>
            <li>일반 휴식(6개월 기준): 2달</li>
            <li>장기 휴식: 별도 연락</li>
          </ol>
        </Content>
        <RuleTitle>벌금</RuleTitle>
        <Content>
          <ol>
            <li>
              <Bold>-3점</Bold> 누적 시 <Bold> 벌금 3000원</Bold>
            </li>
          </ol>
        </Content>
      </Main>
      <Footer>
        <button onClick={() => setIsModal(false)}>확인</button>
      </Footer>
    </Layout>
  );
}

const Layout = styled(ModalXXL)`
  padding-top: 14px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  color: #565b67;
`;

const Header = styled.header`
  padding: 0 12px;
  > div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }
`;
const Title = styled.span`
  padding-left: 13px;
  font-size: 18px;
  font-weight: 600;
  color: #343943;
`;
const Page = styled.span`
  color: #767d8a;
`;

const OverView = styled.div`
  text-align: center;
  margin-bottom: 12px;
  color: #565b67;
`;

const RuleTitle = styled.span`
  color: #343943;
  font-size: 15px;
`;

const Main = styled.main`
  font-size: 13px;
  margin-top: 7px;
`;
const Content = styled.div`
  padding-left: 16px;
  margin-top: 3px;
  margin-bottom: 10px;
`;

const Bold = styled.span`
  color: #343943;
  font-weight: 600;
`;

const Footer = styled.footer`
  flex: 1;
  display: flex;
  align-items: end;
  justify-content: end;
  > button {
    margin-right: 12px;
    margin-bottom: 3px;
    color: #343943;
    font-size: 16px;
  }
`;

export default StudyRuleModal;
