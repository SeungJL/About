import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Slide from "../../components/layout/PageSlide";

import { useUserInfoQuery } from "../../hooks/user/queries";
import UserCollection from "../../pageTemplates/user/userCollection";
import UserHeader from "../../pageTemplates/user/userHeader";
import UserOverview from "../../pageTemplates/user/userOverview/UserOverView";
import UserProfile from "../../pageTemplates/user/userProfile";
import { isGuestState } from "../../recoil/userAtoms";

function UserInfo() {
  const isGuest = useRecoilValue(isGuestState);
  const { data: userInfo, refetch } = useUserInfoQuery({
    enabled: !isGuest,
  });

  return (
    <>
      <UserHeader />
      <Slide>
        {(userInfo || isGuest) && (
          <UserLayout>
            <UserOverview />
            <UserProfile />
            <UserCollection />
          </UserLayout>
        )}
      </Slide>
    </>
  );
}

const UserLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export default UserInfo;
