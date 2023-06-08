import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useVoteRateQuery } from "../../../hooks/user/queries";
import { numOfUserState } from "../../../recoil/userAtoms";

function Ranking() {
  const { data: session } = useSession();
  const numOfUser = useRecoilValue(numOfUserState);
  const { data } = useVoteRateQuery(dayjs().date(1), dayjs());
  const myCnt = data?.find((item) => item.uid === session?.uid).cnt;

  return (
    <Layout>
      <Header>
        <span>랭킹</span>
      </Header>
      <UserCollection>아직 수집한 배지가 없어요!</UserCollection>
      <Main>
        <Info>
          <Item>
            <span>내 랭킹</span>
            <span> -</span>
          </Item>
          <Item>
            <span>내 점수</span>
            <span>0 점</span>
          </Item>
          <Item>
            <span>이번 달 참여</span>
            <span>{myCnt} 회</span>
          </Item>
          <Item>
            <span>전체 인원</span>
            <span>{numOfUser} 명</span>
          </Item>
        </Info>

        <Chart></Chart>
      </Main>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 16px;
  height: 280px;

  margin-bottom: 30px;
`;

const UserCollection = styled.div`
  margin: 12px 0;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-red);
  border-radius: 8px;
`;

const Header = styled.header`
  font-size: 18px;
`;

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`;
const Info = styled.div`
  padding: 0px 6px;
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 160px;
  width: 45%;
  border-radius: 8px;
  background: var(--font-h7);
  font-size: 11px;
  > div:last-child {
    border: none;
  }
`;
const Item = styled.div`
  border-bottom: 1px solid var(--font-h5);
  display: flex;
  align-items: center;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Chart = styled.div``;

export default Ranking;
