import styled from "styled-components";

function Ranking() {
  return (
    <Layout>
      <Header>
        <span>랭킹</span>
      </Header>

      <Main>
        <div>
          <Profile></Profile>
          <Rank>
            <div>이번 달 참여</div>
            <div>내 랭킹</div>
            <div>내 점수</div>
            <div>전체 인원</div>
          </Rank>
        </div>
        <Chart></Chart>
      </Main>
    </Layout>
  );
}

const Layout = styled.div`
  background-color: skyblue;
  height: 280px;
  margin-bottom: 30px;
`;

const Header = styled.header``;

const Profile = styled.div``;

const Main = styled.main`
  display: flex;
  background-color: pink;
  height: 100%;
`;
const Rank = styled.div``;

const Chart = styled.div``;

export default Ranking;
