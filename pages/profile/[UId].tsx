import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import DetailInfo from "../../pagesComponents/friend/DetailInfo";
import FriendMyProfile from "../../pagesComponents/friend/FriendProfile";
import { prevPageUrlState } from "../../recoil/previousAtoms";
import { transferUserDataState } from "../../recoil/transferDataAtoms";

function ProfilePage() {
  const router = useRouter();
  const userData = useRecoilValue(transferUserDataState);
  const beforePage = useRecoilValue(prevPageUrlState);

  return (
    <Container>
      <Header title="" url={beforePage}>
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
      </Header>
      <Layout>
        <FriendMyProfile user={userData} />
        <HrDiv />
        {!userData ? (
          <Friend>
            <span>내 친구</span>
          </Friend>
        ) : (
          <DetailInfo user={userData} />
        )}
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
`;

const Layout = styled.div``;
const Friend = styled.div`
  height: 120px;
  background-color: var(--font-h7);
  padding: 4px 8px;
  border-radius: var(--border-radius);
  border: 1px solid var(--font-h6);
  > span:first-child {
    color: var(--font-h3);
  }
`;

const HrDiv = styled.div`
  background-color: var(--font-h7);
  height: 10px;
`;
export default ProfilePage;
