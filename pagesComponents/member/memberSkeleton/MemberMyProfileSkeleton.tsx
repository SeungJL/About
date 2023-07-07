import styled from "styled-components";
import Skeleton from "../../../components/common/Skeleton";

function MemberMyProfileSkeleton() {
  return (
    <Layout>
      <Title>내 프로필 카드</Title>
      <Wrapper>
        <Profile>
          <ProfileIcon>
            <Skeleton>temp</Skeleton>
          </ProfileIcon>
          <Name>
            <Skeleton>temp</Skeleton>
          </Name>
        </Profile>
        <Info>
          <div>
            <span>나이</span>
            <span>
              <Skeleton>temp</Skeleton>
            </span>
          </div>
          <div>
            <span>등급</span>
            <Badge>
              <Skeleton>temp</Skeleton>
            </Badge>
          </div>
          <div>
            <span>구성</span>
            <span>
              <Skeleton>temp</Skeleton>
            </span>
          </div>
          <div>
            <span>전공</span>
            <span>
              <Skeleton>temp</Skeleton>
            </span>
          </div>
          <div>
            <span>MBTI</span>
            <span>
              <Skeleton>temp</Skeleton>
            </span>
          </div>
          <div>
            <span>관심사</span>
            <span>
              <Skeleton>temp</Skeleton>
            </span>
          </div>
        </Info>
      </Wrapper>
    </Layout>
  );
}

const Layout = styled.div`
  padding-top: var(--padding-sub);
  padding-bottom: var(--padding-main);
  margin: 0 var(--margin-main);
`;
const Badge = styled.div`
  width: 54px;
  margin-left: var(--margin-min);
`;

const ProfileIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.span`
  display: inline-block;
  margin-top: var(--margin-min);
  font-weight: 600;
  width: 50px;
`;

const Wrapper = styled.div`
  border-radius: var(--border-radius-main);
  border: var(--border-main);
  border-color: var(--color-mint);
  padding: var(--padding-sub) var(--padding-main);
  display: flex;
  align-items: center;
  height: 120px;
  margin-top: var(--margin-sub);
`;

const Title = styled.span`
  font-weight: 600;
  margin-bottom: var(--margin-sub);
`;

const Info = styled.div`
  flex: 1;
  height: 90%;
  font-size: 12px;
  color: var(--font-h2);
  margin-left: var(--margin-main);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  > div {
    display: flex;
    align-items: center;

    > span:first-child {
      display: inline-block;
      width: 36px;
      font-weight: 600;
    }
    > span:last-child {
      margin-left: var(--margin-min);
      display: inline-block;
      width: 54px;
    }
  }
`;

export default MemberMyProfileSkeleton;
