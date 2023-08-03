import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function AboutWinRecord() {
  return (
    <Layout>
      <Title>이벤트 당첨 기록</Title>
      <Content>
        <Header>
          <Date>날짜</Date>
          <Name>이름</Name>
          <Reason>내용</Reason>
          <Present>상품</Present>
        </Header>
        {[1, 2, 3].map((item, idx) => (
          <Item key={idx}>
            <Date>1/2</Date>
            <Name>이승주</Name>
            <Reason>건의하기</Reason>
            <Present>황금 올리브 치킨</Present>
          </Item>
        ))}
      </Content>
      <MoreInfoNav>
        <span>더보기</span>
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </MoreInfoNav>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const Content = styled.div`
  margin-top: var(--margin-main);
  height: 200px;
  background-color: var(--font-h56);
  border-radius: var(--border-radius-main);
  padding: var(--padding-sub);
`;

const Item = styled.div`
  margin-top: var(--margin-min);
  border-bottom: 1px solid var(--font-h5);
  font-size: 12px;
  color: var(--font-h2);
  display: flex;
  padding: var(--padding-min) 0;

  > span {
    text-align: center;
  }
`;

const Header = styled.header`
  display: flex;
  font-size: 13px;
  > span {
    text-align: center;
  }
`;

const Name = styled.span`
  flex: 0.15;
`;

const Date = styled.span`
  flex: 0.15;
`;

const Reason = styled.span`
  flex: 0.35;
`;

const Present = styled.span`
  flex: 0.35;
`;
const MoreInfoNav = styled.div`
  height: 44px;
  box-shadow: var(--box-shadow-sub);
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  margin-top: var(--margin-max);
  margin-bottom: var(--margin-max);
  border-radius: var(--border-radius-main);
  color: var(--font-h3);
  font-weight: 600;
  > span:first-child {
    margin-right: var(--margin-md);
  }
`;
export default AboutWinRecord;
