import styled from "styled-components";
import Skeleton from "../../../components/common/Skeleton";

function ProfileOverviewSkeleton() {
  return (
    <Layout>
      <Top>
        <Profile>
          <ProfileIcon>
            <Skeleton>temp</Skeleton>
          </ProfileIcon>
          <ProfileInfo>
            <div>
              <span>
                <Skeleton>temp</Skeleton>
              </span>
              <Badge>
                <Skeleton>temp</Skeleton>
              </Badge>
            </div>
            <Status>
              <Skeleton>temp</Skeleton>
            </Status>
          </ProfileInfo>
        </Profile>
        <Comment>
          <Skeleton>temp</Skeleton>
        </Comment>
      </Top>
      <Bottom>
        <div>
          <RelationItem>
            <span>친구</span>
            <span>
              <Skeleton>0</Skeleton>
            </span>
          </RelationItem>
          <RelationItem>
            <span>좋아요</span>
            <span>
              <Skeleton>0</Skeleton>
            </span>
          </RelationItem>
          <RelationItem>
            <span>활동</span>
            <span>
              <Skeleton>0</Skeleton>
            </span>
          </RelationItem>
        </div>
        <Button>
          <Skeleton>temp</Skeleton>
        </Button>
      </Bottom>
    </Layout>
  );
}

const Status = styled.span`
  margin-top: 2px;
  width: 34px;
`;

const Layout = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div``;

const Button = styled.div`
  width: 80px;
  height: 26px;
`;
const Bottom = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
  > div:first-child {
    display: flex;
  }
`;

const RelationItem = styled.div`
  width: max-content;
  padding: 0 10px;

  display: flex;
  flex-direction: column;
  line-height: 2;
  align-items: center;
  > span:first-child {
    font-size: 11px;
  }
  > span:last-child {
    display: inline-block;

    text-align: center;
    width: 20px;
    font-size: 11px;
    font-weight: 600;
  }
`;
const ProfileIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
`;
const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.div`
  width: 64px;
  height: 18px;
`;

const ProfileInfo = styled.div`
  margin-left: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div:first-child {
    display: flex;
    align-items: center;
    > span:first-child {
      font-size: 16px;
      font-weight: 600;
      margin-right: 8px;
    }
  }
  > span:last-child {
    font-size: 12px;
    color: var(--font-h3);
  }
`;
const HeartWrapper = styled.div`
  margin-right: 14px;
`;

const Comment = styled.div`
  margin-left: 2px;
  margin-top: 14px;
  color: var(--font-h1);
  font-size: 12px;
  font-weight: 600;
  width: 160px;
`;

export default ProfileOverviewSkeleton;
