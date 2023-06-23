import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";

import { useUserInfoQuery } from "../../hooks/user/queries";

function ReviewItemHeader({ temp, date }: { temp: any; date: string }) {
  const { data } = useUserInfoQuery();

  return (
    <Layout>
      <Profile>
        <ProfileIcon user={temp} size="sm" />
        <div>
          <span>{temp?.name}</span>
          <span>{date}</span>
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
  align-items: center;
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
