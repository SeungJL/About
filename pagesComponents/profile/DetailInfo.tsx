import styled from "styled-components";
import Chart from "../../components/features/lib/chart/Chart";
import { birthToAge } from "../../helpers/converterHelpers";
import { IUser } from "../../types/user/user";

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
          {user?.mbti ? <span>{user?.mbti}</span> : <span>--</span>}
        </ProfileItem>
        <ProfileItem>
          <span>지역</span>
          <span> {user?.location}</span>
        </ProfileItem>
        <ProfileItem>
          <span>전공</span>
          {user?.majors?.length ? (
            <span>{user?.majors[0]?.detail}</span>
          ) : (
            <span>--</span>
          )}
        </ProfileItem>
        <ProfileItem>
          <span>관심사</span>
          <div>
            {user?.interests?.first ? (
              <Interests>
                <span>1. {user?.interests.first}</span>
                <span>
                  {user?.interests.second && "2."} {user?.interests.second}
                </span>
              </Interests>
            ) : (
              <span>--</span>
            )}
          </div>
        </ProfileItem>
      </Profile>
      <Chart type="study" user={user} />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
`;

const Profile = styled.div`
  padding: 0 var(--padding-min);
  margin-bottom: var(--margin-min);
  display: flex;
  flex-direction: column;
  line-height: 2.4;
`;

const Interests = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--font-h1);
  font-weight: 600;
  > span {
    display: inline-block;
  }
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
`;

export default DetailInfo;
