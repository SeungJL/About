import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { IUser } from "../../types/user";
import ProfileInfo from "./profileOverview/ProfileInfo";

import ProfileRelation from "./profileOverview/ProfileRelation";
import ProfileOverviewSkeleton from "./skeleton/ProfileOverviewSkeleton";

interface IProfileOverview {
  user?: IUser;
}

function ProfileOverview({ user }: IProfileOverview) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const [userData, setUserData] = useState<IUser>(user);

  const [isLoading, setIsLoading] = useState(true);

  useUserInfoQuery({
    enabled: !isGuest,
    onSuccess(data) {
      if (!userData) setUserData(data);
      setIsLoading(false);
    },
  });

  return (
    <>
      {!isLoading ? (
        <Layout>
          <ProfileInfo user={userData} />
          <ProfileRelation user={user} />
        </Layout>
      ) : (
        <ProfileOverviewSkeleton />
      )}
    </>
  );
}

const Layout = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

export default ProfileOverview;
