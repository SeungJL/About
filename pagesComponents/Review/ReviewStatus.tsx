import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ProfileIconXsOverwrap from "../../components/common/Profile/ProfileIconXsOverwrap";

import { useUserInfoQuery } from "../../hooks/user/queries";
import { IUser } from "../../types/user";
const VOTER_SHOW_MAX = 7;
function ReviewStatus() {
  const data = useUserInfoQuery();

  const test = [data, data, data, data, data];
  return (
    <Layout>
      <Item>
        <FontAwesomeIcon icon={faHeart} size="xl" />
        <span>10</span>
      </Item>
      <Item>
        <FontAwesomeIcon icon={faMessage} size="xl" />
        <span>10</span>
      </Item>
      <Profile>
        {test?.map((user, idx) => (
          <ProfileContainer key={idx} zIndex={idx}>
            <ProfileIconXsOverwrap
              user={user?.data as IUser}
              isOverlap={idx === VOTER_SHOW_MAX}
            />
          </ProfileContainer>
        ))}
      </Profile>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  padding: 0 14px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  > span {
    margin-left: 5px;
    font-weight: 600;
    font-size: 15px;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div<{ zIndex: number }>`
  width: 23px;
  display: flex;
  z-index: ${(props) => props.zIndex};
  position: relative;
  padding-top: 28px;
`;

export default ReviewStatus;