import {
  faAddressBook,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import ProfileOverview from "../../pagesComponents/friend/MyProfile";
import { userDataState } from "../../recoil/interactionAtoms";

function ProfilePage() {
  const router = useRouter();
  const userData = useRecoilValue(userDataState);

  console.log(userData);
  return (
    <>
      <Header title="">
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
      </Header>
      <Layout>
        <ProfileOverview user={userData} />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

export default ProfilePage;
