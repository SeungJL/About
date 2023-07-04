import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { IUser } from "../../types/user";
import ProfileOverview from "./friendMyProfile/ProfileOverview";
import ProfileRelation from "./friendMyProfile/ProfileRelation";
import FriendProfileSkeleton from "./skeleton/FriendProfileSkeleton";

interface IFriendProfile {
  user?: IUser;
}

function FriendProfile({ user }: IFriendProfile) {
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
          <ProfileOverview user={userData} />
          <ProfileRelation />
        </Layout>
      ) : (
        <FriendProfileSkeleton />
      )}
    </>
  );
}

const Layout = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

export default FriendProfile;
