import styled from "styled-components";

function Ranking() {
  return (
    <Layout>
      <Header>
        <span>스터디 랭킹</span>
      </Header>
      <Quote>집 밖으로 나오셔야죠</Quote>
      <Main>
        <Rank>
          <div>이번 달 참여</div>
          <div>내 랭킹</div>
          <div>내 랭킹</div>
          <div>전체 인원</div>
        </Rank>
        <Chart></Chart>
      </Main>
    </Layout>
  );
}

const Layout = styled.div`
  background-color: skyblue;
  height: 280px;
`;

const Header = styled.header``;

const Quote = styled.div``;

const Main = styled.main``;
const Rank = styled.div``;

const Chart = styled.div``;

export default Ranking;
