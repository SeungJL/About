import { faCamera } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import RequestChangeProfileImageModal from "../../../modals/userRequest/RequestChangeProfileImageModal/RequestChangeProfileImageModal";
import { isGuestState } from "../../../recoil/userAtoms";
import UserOverviewBadge from "./UserOverviewBadge";
import UserOverviewComment from "./UserOverviewComment";
import UserOverviewPointNav from "./UserOverviewPointNav";

export default function UserOverview() {
  const isGuest = useRecoilValue(isGuestState);

  const [isProfileModal, setIsProfileModal] = useState(false);

  const { data: userInfo } = useUserInfoQuery();

  return (
    <>
      <Layout>
        <UserImg>
          <ProfileIcon user={userInfo || "guest"} size="xl" />
          <IconWrapper onClick={() => setIsProfileModal(true)}>
            <FontAwesomeIcon icon={faCamera} color="var(--font-h2)" size="lg" />
          </IconWrapper>
        </UserImg>
        <UserInfo>
          <UserProfile>
            <UserName>{isGuest ? "게스트" : userInfo?.name}</UserName>
            <UserOverviewBadge />
          </UserProfile>
          <UserOverviewComment />
        </UserInfo>
      </Layout>
      <UserOverviewPointNav
        myPoint={userInfo?.point}
        myDeposit={userInfo?.deposit}
      />
      {isProfileModal && (
        <RequestChangeProfileImageModal setIsModal={setIsProfileModal} />
      )}
    </>
  );
}

const Layout = styled.div`
  height: 90px;
  padding: var(--padding-md) 0px;
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-sub);
`;

const UserImg = styled.div`
  position: relative;
`;

const UserInfo = styled.div`
  margin-left: var(--margin-main);
  display: flex;
  flex-direction: column;
  flex: 1;
  > div:first-child {
    display: flex;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-md);
`;

const IconWrapper = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -4px;
  bottom: -4px;
  background-color: white;
  border: var(--border-main);
  border-radius: 50%;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-right: var(--margin-md);
`;
