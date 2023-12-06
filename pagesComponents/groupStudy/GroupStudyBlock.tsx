import styled from "styled-components";

function GroupStudyBlock() {
  const infoArrText = ["개설자", "인원", "목표", "출석", "시작일", "방식"];

  return (
    <Layout>
      <Header>
        <span>열공러들</span>
      </Header>
      <Title>공부 열심히 하실 분들 구함</Title>
      <Info>
        {infoArrText.map((item) => (
          <InfoItem key={item}>
            <span>{item}</span>
            <span>이승주</span>
          </InfoItem>
        ))}
      </Info>
      <Content>
        서로 열심히 공부하는 방. <br />
        나도 목적은 모르겠음.
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: var(--border-radius2);
  box-shadow: var(--box-shadow-b);
  padding: var(--padding-sub);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-mint);
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 15px;
`;
const Info = styled.div`
  padding: var(--padding-md) 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: var(--border-sub);
`;

const InfoItem = styled.div`
  font-size: 12px;
  > span:first-child {
    font-weight: 500;
    color: var(--font-h2);
    margin-right: var(--margin-md);
  }
  > span:last-child {
    color: var(--font-h3);
  }
`;

const Content = styled.div`
  font-size: 12px;
  color: var(--font-h2);
  padding-top: var(--padding-sub);
`;

export default GroupStudyBlock;
