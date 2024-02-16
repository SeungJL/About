import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Slide from "../../components/layout/PageSlide";
import Divider from "../../components2/atoms/Divider";

import { useUserInfoQuery } from "../../hooks/user/queries";
import UserCollection from "../../pageTemplates/user/userCollection";
import UserHeader from "../../pageTemplates/user/userHeader";
import UserOverview from "../../pageTemplates/user/userOverview/UserOverView";
import UserProfile from "../../pageTemplates/user/userProfile";
import { isRefetchUserInfoState } from "../../recoil/refetchingAtoms";
import { isGuestState } from "../../recoil/userAtoms";

function UserInfo() {
  const isGuest = useRecoilValue(isGuestState);
  const [isRefetchUserInfo, setIsRefetchUserInfo] = useRecoilState(
    isRefetchUserInfoState
  );

  const { data: userInfo, refetch } = useUserInfoQuery({
    enabled: !isGuest,
  });

  useEffect(() => {
    if (isRefetchUserInfo) {
      setIsRefetchUserInfo(false);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchUserInfo]);

  return (
    <>
      <Slide isFixed={true}>
        <UserHeader />
      </Slide>
      <Slide>
        {(userInfo || isGuest) && (
          <UserLayout>
            <UserOverview userInfo={userInfo} />
            <Divider />
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
