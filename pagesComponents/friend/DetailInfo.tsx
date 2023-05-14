import styled from "styled-components";
import AttendChart from "../../components/utils/AttendChart";
import { birthToAge } from "../../libs/utils/membersUtil";
import { IUser } from "../../types/user";

function DetailInfo({ user }: { user: IUser }) {
  return (
    <Layout>
      <Profile>
        <ProfileItem>
          <span>나이</span>
          <span> {birthToAge(user?.birth)}</span>
        </ProfileItem>
        <ProfileItem>
          <span>성별</span>
          <span> {user?.gender}</span>
        </ProfileItem>
        <ProfileItem>
          <span>MBTI</span>
          <span> {user?.mbti}</span>
        </ProfileItem>
        <ProfileItem>
          <span>지역</span>
          <span> {user?.location}</span>
        </ProfileItem>
        <ProfileItem>
          <span>전공</span>
          <span>컴퓨터/통신</span>
        </ProfileItem>
        <ProfileItem>
          <span>관심사</span>
          <div>
            <span>1. 코딩</span>
            <span>2. 독서</span>
          </div>
        </ProfileItem>
      </Profile>
      <AttendChart type="modal" user={user} />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = styled.div`
  padding: 0 6px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  line-height: 2.4;
`;

const ProfileItem = styled.div`
  display: flex;

  > span:first-child {
    display: inline-block;
    width: 64px;
    color: var(--font-h3);
  }
  > span:last-child {
    color: var(--font-h1);
    font-weight: 600;
  }
  > div {
    color: var(--font-h1);
    font-weight: 600;
    > span {
      display: inline-block;
      width: 52px;
    }
  }
`;

export default DetailInfo;
