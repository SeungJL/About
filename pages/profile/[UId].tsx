import {
  faAddressBook,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import DetailInfo from "../../pagesComponents/friend/DetailInfo";
import ProfileOverview from "../../pagesComponents/friend/ProfileOverview";
import { beforePageState, userDataState } from "../../recoil/interactionAtoms";

function ProfilePage() {
  const router = useRouter();
  const userData = useRecoilValue(userDataState);
  const beforePage = useRecoilValue(beforePageState);

  return (
    <Container>
      <Header title="" url={beforePage}>
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
      </Header>
      <Layout>
        <ProfileOverview user={userData} />
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
