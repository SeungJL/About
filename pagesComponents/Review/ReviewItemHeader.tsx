import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ProfileIconSm from "../../components/common/Profile/ProfileIconSm";

import ProfileIconLg from "../../components/common/Profile/ProfileIconXl";
import ProfileIconXsOverwrap from "../../components/common/Profile/ProfileIconXs";
import ProfileIconXs from "../../components/common/Profile/ProfileIconXsOverwrap";
import { useUserInfoQuery } from "../../hooks/user/queries";

function ReviewItemHeader() {
  const { data } = useUserInfoQuery();

  return (
    <Layout>
      <Profile>
        <ProfileIconSm user={data} />
        <div>
          <span>{data?.name}</span>
          <span>5월 27일</span>
        </div>
      </Profile>
      <FontAwesomeIcon icon={faEllipsis} size="lg" />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  margin-bottom: 12px;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  > div:last-child {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    > span:first-child {
      font-weight: 600;
      font-size: 12px;
    }
    > span:last-child {
      color: var(--font-h3);
      font-size: 10px;
    }
  }
`;

export default ReviewItemHeader;
