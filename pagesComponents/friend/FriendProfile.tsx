import { useSession } from "next-auth/react";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { IUser } from "../../types/user";
import ProfileOverview from "./FriendMyProfile/ProfileOverview";
import ProfileRelation from "./FriendMyProfile/ProfileRelation";

interface IFriendProfile {
  user?: IUser;
  setIsLoading?: React.Dispatch<SetStateAction<boolean>>;
}

function FriendProfile({ user, setIsLoading }: IFriendProfile) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const [userData, setUserData] = useState<IUser>(user);
  useUserInfoQuery({
    enabled: !isGuest,
    onSuccess(data) {
      if (!userData) setUserData(data);
      setIsLoading && setIsLoading(false);
    },
  });

  return (
    <>
      <Layout>
        <ProfileOverview user={userData} />
        <ProfileRelation />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

export default FriendProfile;
