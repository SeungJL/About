import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../components/common/user/Profile/ProfileIcon";
import ScoreBadge from "../../components/common/user/ScoreBadge";
import { USER_ROLE } from "../../constants/contentsValue/role";
import { birthToAge } from "../../helpers/converterHelpers";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { isGuestState } from "../../recoil/userAtoms";
function MemberMyProfile() {
  const isGuest = useRecoilValue(isGuestState);
  const { data: userInfo } = useUserInfoQuery();
  return (
    <Layout>
      {userInfo ? (
        <>
          <Title>내 프로필 카드</Title>
          <Wrapper>
            <Profile>
              <ProfileIcon user={userInfo} size="lg" />
              <Name>{userInfo?.name}</Name>
            </Profile>
            <Info>
              <InfoItem>
                <span>나이</span>
                <span>{birthToAge(userInfo?.birth)}세</span>
              </InfoItem>
              <InfoItem>
                <span>배지</span>
                <ScoreBadge score={userInfo.score} uid={userInfo.uid} />
              </InfoItem>
              <InfoItem>
                <span>구성</span>
                <span> {USER_ROLE[userInfo?.role]}</span>
              </InfoItem>
              <InfoItem>
                <span>전공</span>
                <span>
                  {userInfo?.majors?.length && userInfo?.majors[0].detail}
                </span>
              </InfoItem>
              <InfoItem>
                <span>MBTI</span>
                <span> {userInfo?.mbti}</span>
              </InfoItem>
              <InfoItem>
                <span>관심</span>
                <span> {userInfo?.interests?.first}</span>
              </InfoItem>
            </Info>
          </Wrapper>
        </>
      ) : (
        isGuest && <GuestMessage>게스트 로그인 이용중</GuestMessage>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-sub) 0;
  margin: 0 var(--margin-main);
  min-height: 167px;
`;

const Title = styled.span`
  font-weight: 600;
  margin-bottom: var(--margin-sub);
`;

const Wrapper = styled.div`
  border-radius: var(--border-radius-main);
  border: var(--border-mint);
  padding: var(--padding-md) var(--padding-main);
  padding-right: 0;
  display: flex;
  align-items: center;
  height: 110px;
  margin-top: var(--margin-sub);
  font-size: 12px;
`;

const Profile = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Name = styled.span`
  display: inline-block;
  font-weight: 600;
`;

const Info = styled.div`
  flex: 1;
  height: 100%;
  padding: var(--padding-min) 0;
  font-size: 12px;
  color: var(--font-h2);
  margin-left: var(--margin-main);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  > span:first-child {
    display: inline-block;
    width: 36px;
    font-weight: 600;
  }
`;

const GuestMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: var(--font-h3);
  min-height: 181px;
`;

export default MemberMyProfile;
