import styled from "styled-components";
import { IUser } from "../../types/user/user";
import ProfileInfo from "./profileOverview/ProfileInfo";

import ProfileRelation from "./profileOverview/ProfileRelation";
import ProfileOverviewSkeleton from "./skeleton/ProfileOverviewSkeleton";

interface IProfileOverview {
  user?: IUser;
}

function ProfileOverview({ user }: IProfileOverview) {
  return (
    <Layout>
      {user ? (
        <>
          <ProfileInfo user={user} />
          <ProfileRelation user={user} />
        </>
      ) : (
        <ProfileOverviewSkeleton />
      )}
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
  display: flex;
  flex-direction: column;
`;

export default ProfileOverview;
