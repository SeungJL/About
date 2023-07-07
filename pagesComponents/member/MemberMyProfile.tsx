import styled from "styled-components";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import ScoreBadge from "../../components/common/ScoreBadge";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { getRole } from "../../libs/contentConverter";
import { birthToAge } from "../../libs/utils/membersUtil";
function MemberMyProfile() {
  const { data: userInfo } = useUserInfoQuery();

  return (
    <Layout>
      {userInfo && (
        <>
          <Title>내 프로필 카드</Title>
          <Wrapper>
            <Profile>
              <ProfileIcon user={userInfo} size="lg" />
              <Name>{userInfo?.name}</Name>
            </Profile>
            <Info>
              <div>
                <span>나이</span>
                <span>: {birthToAge(userInfo?.birth)}세</span>
              </div>
              <div>
                <span>등급</span>
                &nbsp;: <ScoreBadge score={userInfo?.score} />
              </div>
              <div>
                <span>구성</span>
                <span>: {getRole(userInfo?.role)}</span>
              </div>
              <div>
                <span>전공</span>
                <span>
                  : {userInfo?.majors?.length && userInfo?.majors[0].detail}
                </span>
              </div>
              <div>
                <span>MBTI</span>
                <span>: {userInfo?.mbti}</span>
              </div>
              <div>
                <span>관심사</span>
                <span>: {userInfo?.interests?.first}</span>
              </div>
            </Info>
          </Wrapper>
        </>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding-top: var(--padding-sub);
  padding-bottom: var(--padding-main);
  margin: 0 var(--margin-main);
  min-height: 181px;
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
    }
  }
`;

export default MemberMyProfile;
