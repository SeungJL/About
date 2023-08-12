import { faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import DetailInfo from "../../pagesComponents/profile/DetailInfo";
import ProfileOverview from "../../pagesComponents/profile/ProfileOverview";
import { prevPageUrlState } from "../../recoil/previousAtoms";
import { transferUserDataState } from "../../recoil/transferDataAtoms";

function ProfilePage() {
  const userData = useRecoilValue(transferUserDataState);
  const beforePage = useRecoilValue(prevPageUrlState);

  console.log(userData);

  return (
    <Container>
      <Header title="" url={beforePage}>
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
      </Header>
      <Layout>
        <ProfileOverview user={userData} />
        <HrDiv />
        <DetailInfo user={userData} />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
`;

const Layout = styled.div``;

const HrDiv = styled.div`
  background-color: var(--font-h7);
  height: 10px;
`;
export default ProfilePage;
