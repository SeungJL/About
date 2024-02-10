import styled from "styled-components";
import Skeleton from "../../components/common/masks/skeleton/Skeleton";

function GroupStudySkeletonMain() {
  const temp = [1, 2, 3, 4, 5];
  return (
    <Layout>
      {temp.map((item) => (
        <ItemBlock key={item} />
      ))}
    </Layout>
  );
}

const ItemBlock = () => (
  <ItemBlockLayout>
    <Header>
      <div>
        <Skeleton>temp</Skeleton>
      </div>
      <Badge>
        <Skeleton>temp</Skeleton>
      </Badge>
    </Header>
    <Title>
      <Skeleton>temp</Skeleton>
    </Title>
    <Info>
      {[1, 2, 3, 4].map((item) => (
        <InfoItem key={item}>
          <Skeleton>temp</Skeleton>
        </InfoItem>
      ))}
    </Info>
    <Content>
      <Skeleton>temp</Skeleton>
    </Content>
  </ItemBlockLayout>
);

const Layout = styled.div`
  margin: var(--margin-main);
`;

const Badge = styled.div`
  width: 39px;
`;

const ItemBlockLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: var(--border-radius2);
  box-shadow: var(--box-shadow-b);
  padding: var(--padding-sub);
  margin-bottom: var(--margin-main);
  box-shadow: var(--box-shadow-b);
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-mint);
  margin-bottom: var(--margin-min);
  > div:first-child {
    display: flex;
    align-items: center;
    width: 44px;
  }
`;
const Title = styled.div`
  width: 150px;
  font-weight: 600;
  font-size: 16px;
`;
const Info = styled.div`
  width: 100%;

  padding: var(--padding-md) 0;
  display: grid;
  grid-template-columns: 1.1fr 1.1fr 1.4fr;
  gap: var(--margin-min);
  border-bottom: var(--border-sub);
`;

const InfoItem = styled.div`
  text-align: start;
  font-size: 13px;
  height: 20px;
  width: 90px;
  > span:first-child {
    display: inline-block;
    margin-right: var(--margin-md);
    font-weight: 600;
    color: var(--font-h3);
  }
  > span:last-child {
    color: var(--font-h3);
  }
`;

const Content = styled.pre`
  height: 36px;
  text-align: start;
  font-size: 12px;
  color: var(--font-h2);
  margin-top: var(--padding-sub);
  white-space: pre-wrap;
  /* display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden; */
`;

export default GroupStudySkeletonMain;
