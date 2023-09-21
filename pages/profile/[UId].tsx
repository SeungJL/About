import { faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import BottomDrawer from "../../pagesComponents/profile/BottomDrawer";
import DeclareDrawer from "../../pagesComponents/profile/DeclareDrawer";
import DetailInfo from "../../pagesComponents/profile/DetailInfo";
import ProfileOverview from "../../pagesComponents/profile/ProfileOverview";
import { prevPageUrlState } from "../../recoil/previousAtoms";
import { transferUserDataState } from "../../recoil/transferDataAtoms";
import { DeclareRequest } from "../../types/user/userRequest";

function ProfilePage() {
  const userData = useRecoilValue(transferUserDataState);
  const beforePage = useRecoilValue(prevPageUrlState);

  const [isModal, setIsModal] = useState(false);
  const [declareModal, setDeclareModal] = useState<DeclareRequest>();


  return (
    <>
      <Container>
        <Header title="" url={beforePage}>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            size="lg"
            onClick={() => setIsModal(true)}
          />
        </Header>
        <Layout>
          <ProfileOverview user={userData} />
          <HrDiv />
          <DetailInfo user={userData} />
        </Layout>
      </Container>
      <BottomDrawer
        isModal={isModal}
        setIsModal={setIsModal}
        setDeclareModal={setDeclareModal}
      />
      <DeclareDrawer
        userData={userData}
        declareModal={declareModal}
        setDeclareModal={setDeclareModal}
      />
    </>
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
