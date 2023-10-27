import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import { useCollectionAlphabetQuery } from "../../hooks/collection/queries";
import { useUserInfoQuery } from "../../hooks/user/queries";
import UserNavigation from "../../pagesComponents/user/userNavigation/UserNavigation";
import UserOverview from "../../pagesComponents/user/userOverview/UserOverView";
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

  const { data: alphabets, isLoading } = useCollectionAlphabetQuery({
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
      {((userInfo && !isLoading) || isGuest) && (
        <UserLayout>
          <UserOverview userInfo={userInfo} alphabets={alphabets} />
          <UserNavigation />
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
