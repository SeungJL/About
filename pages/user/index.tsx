import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import { useUserInfoQuery } from "../../hooks/user/queries";
import UserNavigation from "../../pagesComponents/user/UserNavigation";
import UserOverview from "../../pagesComponents/user/UserOverView";
import UserScoreBar from "../../pagesComponents/user/UserScoreBar";
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
    <PageLayout>
      <Header title="마이페이지" />
      {(userInfo || isGuest) && (
        <UserLayout>
          <UserOverview userInfo={userInfo} />
          <UserScoreBar
            myPoint={userInfo?.point}
            myDeposit={userInfo?.deposit}
          />
          <UserNavigation role={userInfo?.role} />
        </UserLayout>
      )}
    </PageLayout>
  );
}

const UserLayout = styled.div`
  margin-top: var(--margin-min);
  margin: 0 var(--margin-main);
  display: flex;
  flex-direction: column;
`;

export default UserInfo;
