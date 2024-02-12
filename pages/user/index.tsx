import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageSlide from "../../components/layout/PageSlide";
import { useUserInfoQuery } from "../../hooks/user/queries";
import UserNavigation from "../../pageTemplates/user/userNavigation/UserNavigation";
import UserOverview from "../../pageTemplates/user/userOverview/UserOverView";
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
    <PageSlide>
      <Header title="마이페이지" />
      {(userInfo || isGuest) && (
        <UserLayout>
          <UserOverview userInfo={userInfo} />
          <UserNavigation />
        </UserLayout>
      )}
    </PageSlide>
  );
}

const UserLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export default UserInfo;
